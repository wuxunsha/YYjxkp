<style lang="less" scope>
  .container {
    background-color: #fff;
    padding: 15px;
   }
   .quota-tree {
    padding: 15px 0;
    margin-top: 30px;
   }
</style>
<template>
  <div class="container">
    <!-- 指标条件 -->
    <Row type="flex" justify="space-between">
      <Col span="12" style="display: flex; justify-content: flex-start; align-item: center">
        <Col span="7">
          <RadioGroup v-model="templateType">
            <Radio label="1">创建全新指标</Radio>
            <Radio label="2">从历年指标中选择模板</Radio>
          </RadioGroup>
        </Col>
        <Col span="6">
          <Select v-model="templateId" v-if="templateType == 2" placeholder="请选择历年指标模板">
            <Option v-for="item in templateList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </Col>
      </Col>
      <Col span="4">
        <Select v-model="levelMax" placeholder="请选择指标名称级数" @on-change="selectLevelMax">
          <Option v-for="item in levels" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <!-- 指标树 -->
    <div class="quota-tree">
      <TemplateTree :treeData="templateTree"></TemplateTree>
    </div>
  </div>
</template>

<script>
import TemplateTree from '../components/tree'
export default {
  name: 'app',
  components: {
    TemplateTree
  },
  data () {
    return {
      templateId: '',
      // 指标模板类型
      templateType: '1',
      // 历年指标集合
      templateList: [
        {
          value: '2017',
          label: '2017年区县市指标'
        },
        {
          value: '2018',
          label: '2018年区县市指标'
        },
        {
          value: '2019',
          label: '2019年区县市指标'
        }
      ],
      // 指标级数
      levelMax: 1,
      levels: [
        {
          value: 1,
          label: '一级指标'
        },
        {
          value: 2,
          label: '二级指标'
        },
        {
          value: 3,
          label: '三级指标'
        },
        {
          value: 4,
          label: '四级指标'
        },
        {
          value: 5,
          label: '五级指标'
        }
      ],
      // 指标要点（末级指标才有）
      childRule: [
        {
          dataCollectionOrgId: '',
          dataCollectionOrgName: '',
          lableType: 0,
          lableTypeName: '',
          perDesc: '',
          score: 0,
          scoreMethod: 0
        }
      ],
      // 子级指标
      children: [
        {
          title: '',
          levelMax: 0
        }
      ],
      formValidate: {},
      ruleValidate: {
        title: [
          { required: true, message: '请输入指标名称', trigger: 'blur' }
        ]
      },
      templateTree: []
    }
  },
  created () {
    // 初始化一级指标模板
    this.selectLevelMax(this.levelMax)
  },
  mounted () {
  },
  methods: {
    selectLevelMax (index) {
      // 指标级数
      this.createTree(index)
    },
    // 根据选择的指标级数创建指标模板节点
    createTree (level) {
      let node = []
      for (let i = level; i > 0; i--) {
        // 将各级节点展开在node中
        node[i - 1] = (function (num) {
          return (function (num) {
            // 子节点
            let children = [{
              title: '',
              levelMax: i
            }]
            // 末级节点增加考核要点
            if (i === level) {
              // 考核要点
              let _childRule = [{
                dataCollectionOrgId: '',
                dataCollectionOrgName: '',
                lableType: 0,
                lableTypeName: '',
                perDesc: '',
                score: 0,
                scoreMethod: 0
              }]
              children[0] = { ...children[0], childRule: _childRule }
              console.log('last node:', children)
            }
            return children[0]
          }(i))
        }(i))
        // 排除i等于level的情况，node中不存在这个位置
        if (i > 0 && i <= level - 1) {
          // 从node末尾开始向前合并子节点
          node[i - 1]['children'] = [{ ...node[i - 1][0], ...node[i] }]
        }
      }
      // 保留树形结构node[0]
      node.splice(1)
      this.templateTree = []
      this.$set(this.templateTree, 0, node[0])
      console.log('templateTree: ', this.templateTree)
    }
  }
}
</script>
