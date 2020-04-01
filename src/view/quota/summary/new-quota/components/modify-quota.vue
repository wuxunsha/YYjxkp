<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  /deep/.zk-table__header-row .zk-table__cell-inner {
    padding: inherit;
    text-align: center;
    font-size: 16px;
  }
  /deep/.zk-table__body-row .zk-table__cell-inner {
    text-align: center;
    padding: inherit;
  }
  /deep/.zk-table__header-row {
    background-color: rgba(239,247,255,1);
    font-weight: bold;
    font-size: 15px;
    height: 3.75rem;
  }
  /deep/ .zk-table__body-row {
    color: #333333;
    font-size: 15px;
    height: 3.75rem;
  }
  .container {
    padding: 15px;
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .check-point {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      border-bottom: 1px solid #e9eaec;
    }
  }
</style>
<template>
  <div style="height: 100%; overflow-y: auto">
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col>
        <article-steps :currentId="currentId" :stepsList="stepsList"></article-steps>
      </Col>
    </Row>
    <div class="container">
      <Row>
        <Col span="4" v-if="isControlCreateQuota">
          <Button type="primary" @click="goToNewQuotaPage">新增一级指标</Button>
        </Col>
        <Col span="4" v-if="isControlConfirmDataCollectDep">
          <Button type="primary" @click="addModalShow=true">提交到数据采集单位</Button>
        </Col>
      </Row>
      <!-- 搜索结果 -->
      <Row style="margin-top: 30px">
        <Col>
          <Table row-key="id" :columns="columns" :data="treeData" border>
            <!-- 考核要点 -->
            <template slot="childRule" slot-scope="{ row, index }">
              <div v-if="row.childRule && row.childRule.length > 0">
                <p class="check-point" v-for="(item, index1) in row.childRule" :key="'考核要点' + index1 + index">{{ item.perDesc }}</p>
              </div>
            </template>
            <!-- 预设分值 -->
            <template slot="score" slot-scope="{ row, index }">
              <div v-if="row.childRule && row.childRule.length > 0">
                <p class="check-point" v-for="(item, index1) in row.childRule" :key="'预设分值' + index + index1">{{ item.score }}</p>
              </div>
            </template>
            <!-- 数据采集单位 -->
            <template slot="dataCollectionOrgName" slot-scope="{ row, index }">
              <div v-if="row.childRule && row.childRule.length > 0">
                <p class="check-point" v-for="(item, index1) in row.childRule" :key="'显示数据采集单位' + index + index1">{{ item.dataCollectionOrgName }}</p>
              </div>
            </template>
            <template slot="operation" slot-scope="{ row, index }">
              <div v-if="row.childRule && row.childRule.length > 0">
                <p class="check-point" v-for="(item, index1) in row.childRule" :key="'操作' + index + index1">
                  <!-- 添加 -->
                  <Tooltip content="新增考核要点" theme="light" placement="top" v-if="isControlCreateRule">
                    <Icon type="md-add" size="24" color="#0972E7" @click="openAddModal(row, item)" />
                  </Tooltip>
                  <!-- 编辑指标 -->
                  <Tooltip content="编辑指标" theme="light" placement="top" v-if="isControlUpdateQuota">
                    <Icon type="ios-create-outline" size="24" color="#0972E7" @click="editData({ row, item, name: 'quota'})" />
                  </Tooltip>
                  <!-- 编辑要点 -->
                  <Tooltip content="编辑要点" theme="light" placement="top" v-if="isControlUpdateRule">
                    <Icon type="ios-create" size="24" color="#0972E7" @click="editData({ row, item, name: 'childrenRule'})" />
                  </Tooltip>
                  <!-- 删除指标 -->
                  <Tooltip content="删除指标" theme="light" placement="top" v-if="isControlDeleteQuota">
                    <Icon type="ios-trash-outline" size="24" color="red" @click="deleteData({ row, item, name: 'quota'})" />
                  </Tooltip>
                  <!-- 删除要点 -->
                  <Tooltip content="删除要点" theme="light" placement="top" v-if="isControlDeleteRule">
                    <Icon type="ios-trash-outline" size="24" color="red" @click="deleteData({ row, item, name: 'childrenRule'})" />
                  </Tooltip>
                </p>
              </div>
              <div v-else>
                <!-- 添加 -->
                <Tooltip
                  :content="levelMax === row.indexLevel ? '新增考核要点' : '新增指标'"
                  theme="light"
                  placement="top"
                  v-if="(levelMax != row.indexLevel && isControlCreateQuota) || (levelMax === row.indexLevel && isControlCreateRule)"
                  >
                  <Icon type="md-add" size="24" color="#0972E7" @click="openAddModal(row)" />
                </Tooltip>
                <!-- 编辑指标 -->
                <Tooltip content="编辑指标" theme="light" placement="top" v-if="isControlUpdateQuota">
                  <Icon type="ios-create-outline" size="24" color="#0972E7" @click="editData({ row })" />
                </Tooltip>
                <!-- 删除 -->
                <Tooltip content="删除指标" theme="light" placement="top" v-if="isControlDeleteQuota">
                  <Icon type="ios-trash-outline" size="24" color="red" @click="deleteData({ row, name: 'quota'})" />
                </Tooltip>
              </div>
            </template>
          </Table>
        </Col>
      </Row>
    </div>
    <!-- 提交草稿到数据采集单位 -->
    <Modal
      v-model="addModalShow"
       @on-visible-change="visibleChange"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">正在提交绩效指标草稿到数据采集单位</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="120" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="20">
            <FormItem prop="timeOut" label="选择时间">
              <DatePicker type="datetime" placeholder="指标内容收集截止时间" v-model="addFromLine.timeOut"></DatePicker>
            </FormItem>
            <FormItem prop="" label="超时是否扣分">
              <RadioGroup v-model="addFromLine.deductPoint">
                  <Radio label="0">是</Radio>
                  <Radio label="1">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem prop="" label="扣除分值">
              <Input v-model="addFromLine.points" :disabled="addFromLine.deductPoint==='1'">
                <span slot="append">分</span>
              </Input>
            </FormItem>
            <FormItem prop="timeRemind" label="超时提醒时间">
              <DatePicker type="datetime" placeholder="请选择超时提醒时间" v-model="addFromLine.timeRemind"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="sendData">确定</Button>
      </div>
    </Modal>
    <!-- 新增修改指标模板 -->
    <Modal
      v-model="addModalShow1"
      @on-visible-change="visibleChange1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ isEdit ? '编辑' : '新增' }}{{ childrenOrRlueTitle }}</div>
      <Form ref="addForm1" :model="addFromLine1" :rules="addFromRule1" :label-width="120" style="margin-top: 20px">
        <Row>
          <Col span="24" v-if="isRule">
            <Row>
              <Col span="19">
                <FormItem label="考核要点" :label-width="90">
                  <Input v-model="addFromLine1.childrenRule.perDesc" placeholder="请输入考核要点" />
                </FormItem>
              </Col>
              <Col span="3" offset="1" style="text-align: center">
                <Select v-model="addFromLine1.childrenRule.lableType" placeholder="所属标签" @on-change="selectLabelType" label-in-value>
                  <Option v-for="(item, ruleIndex) in labelList" :value="item.value" :key="'要点标签' + ruleIndex">{{ item.label }}</Option>
                </Select>
                <div style="font-size: 13px;text-align: center;color: #CCCCCC">（ 非必填 ）</div>
              </Col>
              <Col span="8">
                <FormItem label="预设分值" :label-width="90">
                  <Input v-model="addFromLine1.childrenRule.score" placeholder="请输入预设分值" />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="数据采集单位" :label-width="120">
                  <Select v-model="addFromLine1.childrenRule.dataCollectionOrgId1" multiple placeholder="请选择指标数据采集单位" @on-change="selectCollectionOrg" label-in-value>
                    <Option v-for="(item, collectIndex) in collectList" :value="item.value" :key="'选择数据采集单位' + collectIndex">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="24" v-if="!isRule">
            <Row>
              <!-- 非编辑状态，新增末级节点是需要选择指标类型；编辑状态，末级节点编辑指标类型 -->
              <Col span="24" v-if="(indexLevel === levelMax - 1 && !isEdit) || (indexLevel === levelMax && isEdit)">
                <FormItem label="指标类型">
                  <Select v-model="addFromLine1.children.indexType" placeholder="指标类型" @on-change="selectIndexType" label-in-value>
                    <Option v-for="(item, typeIndex) in quotaIndexTypeList" :value="item.value" :key="'指标类型' + typeIndex">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem :label="childrenOrRlueTitle + '名称'" :prop="childrenOrRlueTitle">
                  <Input v-model="addFromLine1.children.indexName" :placeholder="'请输入'+ childrenOrRlueTitle" />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="saveLevelOrRule">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Header from '../../components/header'
import {
  getorgorpersonlistbyorgandtypes,
  indexlabellist,
  saveoneindexlist,
  saveoneperfomanceruletemplate,
  indextypelist,
  deoneindexlist,
  deloneperfomanceruletemplate,
  updateoneindexlist,
  updateoneperfomanceruletemplate,
  submitthenewtemplate
} from '@/api/quota'
export default {
  mixins: [mixin_table],
  components: {
    Header
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data () {
    const validateScore = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入预设分值'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('必须是数值'))
      } else {
        callback()
      }
    }
    return {
      // 提交数据到考核单位
      addFromLine: {
        deductPoint: '1',
        points: '0',
        sheetId: '',
        timeOut: '',
        timeRemind: ''
      },
      addFromRule: {
        timeOut: [
          { required: true, type: 'date', message: '请选择指标内容收集截止时间', trigger: 'change' }
        ],
        timeRemind: [
          { required: true, type: 'date', message: '请选择超时提醒时间', trigger: 'change' }
        ]
      },
      addModalShow: false,
      columns: [
        {
          title: '指标名称',
          key: 'title',
          className: 'tb-header',
          align: 'center',
          headerAlign: 'center',
          tree: true
        },
        {
          title: '考核要点',
          slot: 'childRule',
          className: 'tb-header',
          align: 'center',
          headerAlign: 'center',
          minWidth: 200
        },
        {
          title: '预设分值',
          slot: 'score',
          className: 'tb-header',
          align: 'center',
          width: 100
        },
        {
          title: '数据采集单位',
          slot: 'dataCollectionOrgName',
          className: 'tb-header',
          align: 'center',
          headerAlign: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      titles: {
        title: ''
      },
      addModalShow1: false,
      // 指标类型
      quotaIndexTypeList: [],
      // 所属标签（考核要点）
      labelList: [],
      // 数据采集单位
      collectList: [],
      // 考核要点
      addFromLine1: {
        childrenRule: {
          id: '',
          // 当前关联指标id
          indexId: '',
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
        },
        children: {
          id: '',
          // 父节点id
          parentId: '',
          // 指标id
          sheetId: '',
          // 要点名称
          indexName: '',
          // 指标类型（末级节点需要）
          indexType: '',
          // 指标类型名称（末级节点需要）
          indexTypeName: '',
          // 排序号
          orderNum: 0
        }
      },
      addFromRule1: {
        dataCollectionOrgId: [
          { required: true, message: '请选择数据采集单位', trigger: 'blur' },
          { type: 'string', message: '请选择数据采集单位', trigger: 'blur' }
        ],
        perDesc: [
          { required: true, message: '请输入要点描述', trigger: 'blur' },
          { type: 'string', message: '请输入要点描述', trigger: 'blur' }
        ],
        score: [
          { validator: validateScore, trigger: 'blur' }
        ]
      },
      // 当前节点层级
      indexLevel: -1,
      // 新增指标或考核要点
      childrenOrRlueTitle: '',
      // 是否为考核要点
      isRule: '',
      // 是否为编辑
      isEdit: false,
      // 步骤条参数
      stepsList: [
        {
          explain: '初稿',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '填写指标内容',
          icon: 'ivu-icon ivu-icon-ios-desktop'
        },
        {
          explain: '分值维护',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '被考核单位确认',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '确认并发布',
          icon: 'ivu-icon ivu-icon-ios-grid'
        }
      ]
    }
  },
  computed: {
    treeData () {
      return this.data.childVOList || []
    },
    levelMax () {
      return this.data.levelMax
    },
    sheetId () {
      return this.data.id
    },
    sheetType () {
      return this.$route.query.type
    },
    title () {
      return this.data.title
    },
    // 当前流程节点
    currentId () {
      return this.data.status
    },
    orgId () {
      return this.data.indexCreateOrgId
    },
    types () {
      return this.data.indexTypeId
    },
    // 新增单个指标控制
    isControlCreateQuota () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101102)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101102)) {
        _control = true
      }

      return _control
    },
    // 修改单个指标控制
    isControlUpdateQuota () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101103)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101103)) {
        _control = true
      }

      return _control
    },
    // 删除单个指标控制
    isControlDeleteQuota () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101104)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101104)) {
        _control = true
      }

      return _control
    },
    // 新增要点控制
    isControlCreateRule () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101105)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101105)) {
        _control = true
      }

      return _control
    },
    // 修改要点控制
    isControlUpdateRule () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101106)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101106)) {
        _control = true
      }

      return _control
    },
    // 删除要点控制
    isControlDeleteRule () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101107)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101107)) {
        _control = true
      }

      return _control
    },
    // 提交到数据采集单位控制
    isControlConfirmDataCollectDep () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101108)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101108)) {
        _control = true
      }

      return _control
    }
  },
  mounted () {
    this.titles.title = this.title
    console.log('modify:===============', this.data)
  },
  methods: {
    // 保存要点或指标
    saveLevelOrRule () {
      let _params = this.isRule ? { ...this.addFromLine1.childrenRule } : { ...this.addFromLine1.children }
      console.log('params:', _params)
      if (!this.isEdit) {
        if (this.isRule) {
          this.saveoneperfomanceruletemplate(_params)
        } else {
          this.saveoneindexlist(_params)
        }
      } else {
        if (this.isRule) {
          this.updateoneperfomanceruletemplate(_params)
        } else {
          this.updateoneindexlist(_params)
        }
      }
    },
    // 修改单个指标
    updateoneindexlist (params) {
      updateoneindexlist(params).then(res => {
        if (res.data.code === 10000) {
          this.addModalShow1 = false
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 修改单个要点
    updateoneperfomanceruletemplate (params) {
      updateoneperfomanceruletemplate(params).then(res => {
        if (res.data.code === 10000) {
          this.addModalShow1 = false
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 删除单个指标
    deoneindexlist (id) {
      deoneindexlist(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 删除单个要点
    deloneperfomanceruletemplate (id) {
      deloneperfomanceruletemplate(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 保存单个指标
    saveoneindexlist (params) {
      saveoneindexlist(params).then(res => {
        if (res.data.code === 10000) {
          this.addModalShow1 = false
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 保存单个要点
    saveoneperfomanceruletemplate (params) {
      saveoneperfomanceruletemplate(params).then(res => {
        if (res.data.code === 10000) {
          this.addModalShow1 = false
          this.$Message.success(res.data.msg)
          // 查询指标
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 选择指标类型
    selectIndexType (value) {
      if (!value) return
      this.addFromLine1.children.indexTypeName = value.label
    },
    // 数据采集单位
    getorgorpersonlistbyorgandtypes () {
      // 请求类型 1 数据采集 2被考核单位
      let params = {
        getTypes: 1,
        orgId: this.orgId,
        types: this.types
      }
      getorgorpersonlistbyorgandtypes(params).then(res => {
        if (res.data.code === 10000) {
          this.collectList = res.data.data
          // this.collectList.forEach(item => {
          //   item.value = item.id
          //   item.label = item.orgName
          // })
        }
      })
    },
    // 指标类型
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
    // 获取指标标签列表
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
    // 要点所属标签（非必填）
    selectLabelType (value) {
      this.addFromLine1.childrenRule.lableTypeName = value.label
    },
    // 数据采集单位
    selectCollectionOrg (value) {
      // 接口要求id格式为,id,
      this.addFromLine1.childrenRule.dataCollectionOrgId = this.addFromLine1.childrenRule.dataCollectionOrgId1.join(',')
      this.addFromLine1.childrenRule.dataCollectionOrgId = `,${this.addFromLine1.childrenRule.dataCollectionOrgId},`
      // 机构名称
      let _dataCollectionOrgName = []
      value.forEach(obj => {
        _dataCollectionOrgName.push(obj.label)
      })
      this.addFromLine1.childrenRule.dataCollectionOrgName = _dataCollectionOrgName.join(',')
    },
    // 判断是新增指标还是考核要点
    isChildrenRule (indexLevel) {
      let _status = ''
      if (this.levelMax === indexLevel) {
        _status = true
      } else {
        _status = false
      }
      return _status
    },
    getItemTitle (level) {
      // 不同级节点中文字映射
      let chineseNumbers = ['一', '二', '三', '四', '五']
      let title = this.levelMax === level ? `考核要点` : (`${chineseNumbers[level]}级指标` || '无节点数据')
      return title
    },
    // 打开新增页面
    openAddModal (row, item) {
      let childrenRule = {
        id: '',
        // 当前关联指标id
        indexId: '',
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
      }
      let children = {
        id: '',
        // 父节点id
        parentId: '',
        // 指标id
        sheetId: '',
        // 要点名称
        indexName: '',
        // 指标类型（末级节点需要）
        indexType: '',
        // 指标类型名称（末级节点需要）
        indexTypeName: '',
        // 排序号
        orderNum: 0
      }
      this.$set(this.addFromLine1, 'childrenRule', childrenRule)
      this.$set(this.addFromLine1, 'children', children)
      this.isEdit = false
      this.addModalShow1 = true
      let _indexLevel = row.indexLevel
      // 当前节点下钻级别
      this.indexLevel = _indexLevel
      // 要下钻的指标级别
      this.childrenOrRlueTitle = this.getItemTitle(_indexLevel)
      // 是否为考核要点
      this.isRule = this.isChildrenRule(_indexLevel)
      // 如果是考核要点需要获取要点的所属标签数据和数据采集单位
      console.log('是否为考核要点：', this.isChildrenRule(_indexLevel), row)
      if (this.isRule) {
        this.addFromLine1.childrenRule.indexId = row.id
        // 获取所属标签
        this.indexlabellist()
        // 数据采集单位
        this.getorgorpersonlistbyorgandtypes()
      } else {
        this.addFromLine1.children.sheetId = this.sheetId
        this.addFromLine1.children.parentId = row.id
        // 如果是末级节点需要添加指标类型
        if (this.indexLevel === this.levelMax - 1) {
          // 获取指标类型
          this.indextypelist()
        }
      }
    },
    // 提交模板初稿
    sendData () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          let _params = Object.assign({}, this.addFromLine)
          _params.sheetId = this.sheetId
          _params.timeOut = new Date(_params.timeOut).getTime()
          _params.timeRemind = new Date(_params.timeRemind).getTime()
          console.log('提交数据到被考核单位', _params, this.treeData)
          submitthenewtemplate(_params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              // 提交初稿后刷新页面
              this.$emit('refresh-quota-type')
              this.addModalShow = false
            }
          })
        } else {
          this.$Message.warning('请选择截止时间和提醒时间')
        }
      })
    },
    // 编辑
    editData ({ row, item, name }) {
      console.log(row, item, name, this.levelMax)
      this.isEdit = true
      this.addModalShow1 = true
      let _indexLevel = row.indexLevel
      // 当前节点下钻级别
      this.indexLevel = _indexLevel
      // 是否为考核要点
      // 要点
      if (name && name === 'childrenRule') {
        this.isRule = true
        this.childrenOrRlueTitle = '要点'
        // 获取所属标签
        this.indexlabellist()
        // 数据采集单位
        this.getorgorpersonlistbyorgandtypes()
        // 标签
        this.addFromLine1.childrenRule.id = item.id
        this.addFromLine1.childrenRule.score = item.score
        this.addFromLine1.childrenRule.perDesc = item.perDesc
        this.addFromLine1.childrenRule.lableType = item.lableType
        this.addFromLine1.childrenRule.lableTypeName = item.lableTypeName
        let _ids = item.dataCollectionOrgId.split(',')
        _ids.pop()
        _ids.shift()
        _ids.forEach((id, index) => {
          _ids[index] = parseInt(id)
        })
        this.addFromLine1.childrenRule.dataCollectionOrgId1 = [].concat(_ids)
      } else {
        let data = row
        this.childrenOrRlueTitle = this.getItemTitle(_indexLevel - 1)
        this.isRule = false
        // 状态回显
        this.addFromLine1.children.id = data.id
        this.addFromLine1.children.indexName = data.indexName
        // 末级指标
        if (data.indexLevel === this.levelMax) {
          // 获取指标类型
          this.indextypelist()
          this.addFromLine1.children.indexType = data.indexType
          this.addFromLine1.children.indexTypeName = data.indexTypeName
        }
      }
    },
    // 新增一级指标
    goToNewQuotaPage () {
      this.openAddModal({
        row: {
          id: 0,
          indexLevel: 0
        }
      })
    },
    // 删除数据
    deleteData ({ row, item, name }) {
      console.log(row, item)
      // 判断是指标还是要点
      let slef = this
      let title = ''
      let content = ''
      let id = ''
      // if (slef.isChildrenRule(params.row.indexLevel)) {
      if (name && name === 'childrenRule') {
        title = '删除要点'
        content = '确定删除该要点吗？'
        id = item.id
      } else {
        title = '删除指标'
        content = `你正在删除“${row.indexName}”，删除后，从属指标也会一同删除！`
        id = row.id
      }
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          if (name && name === 'childrenRule') {
            slef.deloneperfomanceruletemplate(id)
          } else {
            slef.deoneindexlist(id)
          }
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.$refs.addForm.resetFields()
      }
    },
    visibleChange1 (visible) {
      if (!visible) {
        this.$refs.addForm1.resetFields()
      }
    }
  },
  watch: {
    'addFromLine.deductPoint' (newVal) {
      if (newVal === '1') {
        this.addFromLine.points = 0
      }
    }
  }
}
</script>
