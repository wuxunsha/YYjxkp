@modify date 2020-03-11 15:40:02
//  考核要点
.final-node {
  padding: 0 60px;
  margin-top: 20px;
}
.check-point {
  background:rgba(239,247,255,1);
  border-radius: 10px;
  padding: 20px 0;
  margin-bottom: 70px;
}
.ivu-form-item {
  margin-bottom: inherit;
}
.quota-title {
  margin-bottom: 40px;
}
</style>
<template>
  <div>
    <slot></slot>
    <Form ref="addQuotaForm" :model="templateTree" :hide-required-mark="true" :label-width="120">
      <template v-for="(item, index) in templateTree.treeList">
        <Row class="quota-title" :key="'根节点' + index">
          <Col :span="getColSpan(item.levelMax)" :offset="getColOffset(item.levelMax)">
            <Col :span="quotaTypeWidth" v-if="!item.children">
            <!-- :prop="'treeList.'+ index +'.indexType'"
            :rules="{
              required: false,
              message: '请选择指标类型',
              trigger: 'blur'
              }" -->
              <FormItem
                :label-width="0"
                style="text-align: center"
                >
                <Select v-model="item.indexType" placeholder="指标类型" @on-change="selectIndexType($event, item)" label-in-value>
                  <Option v-for="(item, typeIndex) in quotaIndexTypeList" :value="item.value" :key="'指标类型' + typeIndex">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="getLevelWidth(item)">
              <FormItem
                :label="getItemTitle(item.levelMax) + '名称'"
                :prop="'treeList.'+ index + '.indexName'"
                :rules="{ required: true, type: 'string', message: '请填写' + getItemTitle(item.levelMax), trigger: 'blur' }"
                >
                <Input v-model="item.indexName" :placeholder="'请输入'+ getItemTitle(item.levelMax)" show-word-limit maxlength="50"/>
              </FormItem>
            </Col>
          </Col>
          <Col span="2" offset="1">
            <Button type="primary" @click="addChildNode(item, templateTree.treeList)">新增{{ getItemTitle(item.levelMax) }}</Button>
          </Col>
        </Row>
        <!-- 子节点 -->
        <template v-if="item.children && item.children.length > 0">
          <TemplateTree :treeData="templateTree.treeList[index].children" :key="'子节点' + index" :levelMax="levelMax"></TemplateTree>
        </template>
        <!-- 末级节点需要增加考核要点 -->
        <template v-else>
          <div class="final-node" v-for="(childRuleItem, lastNodeIndex) in templateTree.treeList[index].childRule" :key="'末级节点' + lastNodeIndex + index">
            <Row type="flex" align="middle">
              <Col class="check-point final-node-col" :span="getColSpan(item.levelMax)" :offset="getColOffset(item.levelMax)">
                <Col span="19">
                  <FormItem
                    label="考核要点"
                    :label-width="90"
                    :prop="'treeList.'+ index +'.childRule.'+ lastNodeIndex + '.perDesc'"
                    :rules="{ required: true, type: 'string', message: '请填写考核要点', trigger: 'blur' }"
                    >
                    <Input v-model="childRuleItem.perDesc" placeholder="请输入考核要点"  show-word-limit maxlength="150"/>
                  </FormItem>
                </Col>
                <Col span="3" offset="1" style="text-align: center">
                  <Select v-model="childRuleItem.lableType" placeholder="所属标签" @on-change="selectLabelType($event, childRuleItem)" label-in-value clearable>
                    <Option v-for="(item, ruleIndex) in labelList" :value="item.value" :key="'要点标签' + ruleIndex">{{ item.label }}</Option>
                  </Select>
                  <div style="font-size: 13px;text-align: center;color: #CCCCCC">（ 非必填 ）</div>
                </Col>
                <Col span="8">
                  <FormItem
                    label="预设分值"
                    :label-width="90"
                    :prop="'treeList.'+ index +'.childRule.'+ lastNodeIndex + '.score'"
                    :rules="scoreRule"
                  >
                    <Input
                      v-model="childRuleItem.score"
                      placeholder="请输入预设分值"
                      type="number"
                      :rules="scoreRule"
                      />
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem
                    label="数据采集单位"
                    :label-width="120"
                    :prop="'treeList.'+ index +'.childRule.'+ lastNodeIndex + '.dataCollectionOrgId1'"
                    :rules="{ required: true, type: 'array', message: '请选择指标数据采集单位', trigger: 'blur' }"
                    >
                    <Select v-model="childRuleItem.dataCollectionOrgId1" multiple placeholder="请选择指标数据采集单位" @on-change="selectCollectionOrg($event, childRuleItem)" label-in-value>
                      <Option v-for="(item, collectIndex) in collectList" :value="item.value" :key="'数据采集单位' + collectIndex">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Col>
              <Col span="2" offset="1">
                <Button type="primary" @click="addChildNode(childRuleItem, item.childRule)">新增要点</Button>
              </Col>
            </Row>
          </div>
        </template>
        <Row type="flex" justify="center" style="margin-top: 30px" v-if="item.levelMax === 1 && templateTree.treeList.length - 1 === index" :key="'提交' + index">
          <Col>
            <Button type="primary" @click="saveNewTemplate">确定</Button>
          </Col>
        </Row>
      </template>
    </Form>
  </div>
</template>

<script>
import {
  indextypelist,
  indexlabellist,
  getorgorpersonlistbyorgandtypes
} from '@/api/quota'
export default {
  name: 'TemplateTree',
  props: {
    treeData: {
      type: Array
    },
    levelMax: {
      type: Number
    },
    formValidate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ruleValidate: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    templateTree () {
      let obj = {}
      this.$set(obj, 'treeList', this.treeData)
      return obj
    },
    orgId () {
      return this.$route.query.indexCreateOrgId
    },
    types () {
      return this.$route.query.indexTypeId
    }
  },
  data () {
    const validateScore = (rule, value, callback) => {
      if (value !== 0 && !value) {
        return callback(new Error('请填写预设分值'))
      }
      // 0 <= value <= 1000
      if (value >= 0 && value <= 1000) {
        // 判断小数点后3位
        let num = value.toString()
        if (num.indexOf('.') > -1) {
          let _value = num.split('.')[1]
          if (_value.length > 2) {
            return callback(new Error('小数点后最多为2位数值'))
          }
          if (_value.length === 0) {
            return callback(new Error('小数点后不能为空'))
          }
          callback()
        } else {
          callback()
        }
      } else {
        // 负数
        if (value < 0) {
          return callback(new Error('预设分值不能为负数'))
        }
        if (value > 1000) {
          return callback(new Error('预设分值不能超过1000'))
        }
      }
    }
    return {
      quotaTypeWidth: 3,
      quotaType: '',
      // 指标类型列表
      quotaIndexTypeList: [],
      // 所属标签
      labelList: [],
      // 数据采集单位
      collectList: [],
      scoreRule: { validator: validateScore, trigger: 'blur' }
    }
  },
  created () {
    // 获取指标类型
    this.indextypelist()
    // 获取所属标签
    this.indexlabellist()
    // 数据采集单位
    this.getorgorpersonlistbyorgandtypes()
  },
  methods: {
    // 选择指标类型
    selectIndexType (event, item) {
      item.indexTypeName = event.label
    },
    // 选择要点所属标签
    selectLabelType (event, item) {
      item.lableTypeName = event.label
    },
    // 选择数据采集单位（可多选）
    selectCollectionOrg (event, item) {
      // 机构id
      // 接口要求id格式为,id,
      item.dataCollectionOrgId = item.dataCollectionOrgId1.join(',')
      item.dataCollectionOrgId = `,${item.dataCollectionOrgId},`
      // 机构名称
      item.dataCollectionOrgName = []
      event.forEach(obj => {
        item.dataCollectionOrgName.push(obj.label)
      })
      item.dataCollectionOrgName = item.dataCollectionOrgName.join(',')
    },
    // 数据采集单位
    getorgorpersonlistbyorgandtypes () {
      let params = {
        getTypes: 1,
        orgId: this.orgId,
        types: this.types
      }
      getorgorpersonlistbyorgandtypes(params).then(res => {
        if (res.data.code === 10000) {
          this.collectList = res.data.data
        }
      })
    },
    // 获取指标类型
    indexlabellist () {
      indexlabellist().then(res => {
        if (res.data.code === 10000) {
          this.labelList = res.data.data
          this.labelList.forEach(item => {
            item.value = item.id
            item.label = item.lableName
          })
        }
      })
    },
    // 获取指标类型
    indextypelist () {
      indextypelist().then(res => {
        if (res.data.code === 10000) {
          this.quotaIndexTypeList = res.data.data
          this.quotaIndexTypeList.forEach(item => {
            item.value = item.id
            item.label = item.name
          })
        }
      })
    },
    saveNewTemplate () {
      console.log(this.$refs.addQuotaForm)
      this.$refs.addQuotaForm.validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.$emit('save-new-template', this.templateTree.treeList)
        } else {
          this.$Message.warning('表单中缺少必填项')
        }
      })
      console.log(this.templateTree.treeList)
    },
    createTree (level) {
      let node = []
      let self = this
      let _levels = self.levelMax - level + 1
      let _level = this.levelMax
      for (let i = _levels; i > 0; i--) {
        // 将各级节点展开在node中
        node[i - 1] = (function (num) {
          return (function (num) {
            // 子节点
            let children = [{
              // 指标名称
              indexName: '',
              indexDesc: '',
              orderNum: 0,
              // 下钻chhildren节点，在页面生成书组件
              levelMax: _level--,
              indexType: '',
              indexTypeName: ''
            }]
            // 末级节点增加考核要点
            if (i === _levels) {
              // 考核要点
              let _childRule = [{
                // 数据收集组织ID
                dataCollectionOrgId: '',
                // 数据收集组织ID（缓冲字段）
                dataCollectionOrgId1: '',
                // 数据收集组织名称
                dataCollectionOrgName: '',
                // 标签类型
                lableType: '',
                // 标签名称
                lableTypeName: '',
                // 要点描述
                perDesc: '',
                // 分数
                score: '',
                // 分数方法
                scoreMethod: ''
              }]
              children[0] = { ...children[0], childRule: _childRule }
              // console.log('last node:', children)
            }
            return children[0]
          }(i))
        }(i))
        // 排除i等于level的情况，node中不存在这个位置
        if (i > 0 && i <= _levels - 1) {
          // 从node末尾开始向前合并子节点
          node[i - 1]['children'] = [{ ...node[i - 1][0], ...node[i] }]
        }
      }
      // 保留树形结构node[0]
      node.splice(1)
      // console.log('node>>>>>>>>>>>>>>>>>: ', ...node, this.levelMax, level)
      return node[0]
    },
    addChildNode (node, parent) {
      let _obj = {}
      // 增加树节点
      if (node.levelMax) {
        _obj = this.createTree(node.levelMax)
      } else {
        let keys = Object.keys(node)
        keys.forEach(item => {
          _obj[item] = ''
        })
      }
      let newNode = _obj
      parent.push(newNode)
    },
    getItemTitle (level) {
      // 不同级节点中文字映射
      let chineseNumbers = ['一', '二', '三', '四', '五']
      return `${chineseNumbers[level - 1]}级指标` || '一级指标'
    },
    getColSpan (level) {
      // 不同级子节点对应的col宽度映射。level >= 1
      let spans = [20, 19, 18, 17, 16]
      return spans[level - 1] || 20
    },
    getColOffset (level) {
      // 不同级子节点对应的offset值映射。level >= 1
      let offsets = [0, 1, 2, 3, 4]
      return offsets[level - 1] || 0
    },
    getLevelWidth (item) {
      let span = 0
      if (item.children && item.children.length > 0) {
        span = 24
      } else {
        span = 24 - this.quotaTypeWidth
      }
      return span
    }
  }
}
</script>
