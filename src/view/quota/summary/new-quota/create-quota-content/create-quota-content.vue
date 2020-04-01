<style lang="less" scoped>
@tab-height: 50px;
/deep/.ivu-tabs-bar {
  background-color: #fff;
  height: @tab-height;
  border-bottom: none;
  margin-bottom: 0;
  /deep/.ivu-tabs-nav .ivu-tabs-tab {
    font-family:PingFang SC;
    height: @tab-height;
    line-height: 36px;
    color: #0972E7;
    font-weight: 500;
    font-size: 16px;
    min-width: 150px;
    text-align: center;
  }
  /deep/.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #FF9B29;
  }
  /deep/.ivu-tabs-ink-bar {
    background-color: #FF9B29;
  }
}
/deep/.ivu-tabs-content {
  height: calc(~'100% - 56px');
  background-color: #fff;
}
/deep/.ivu-tabs-tabpane {
  height: 100%;
  background-color: #fff;
  background-position: center 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.feedback {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-left: 5px;
}
.feedback-content {
  border-bottom:1px solid rgba(243,243,243,1);
  margin: 10px 30px 5px;
  .info {
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    line-height:30px;
    color:rgba(51,51,51,1);
  }
  .desc {
    display: flex;
    justify-content: space-between;
    >span {
      font-size:20px;
      font-family:PingFang SC;
      line-height:54px;
      color:rgba(204,204,204,1);
    }
  }
}
/deep/textarea.ivu-input {
  min-height: 200px;
}
.remark {
  margin-top: 20px;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:26px;
  color:rgba(51,51,51,1);
  >p:first-child {
    color: #0972E7;
  }
}
.quota-info {
  background:rgba(202,228,255,1);
  padding: 20px;
  border-radius: 10px;
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
    <Tabs @on-click="quotaTabClick" value="quota_content" name="OrgTabs-2a">
      <TabPane label="指标内容" name="quota_content" icon="ios-trending-up" tab="OrgTabs-2a">
        <Row style="padding: 20px 15px">
          <Col class="quota-table" span="2" v-if="isControlScoreInput">
            <Button type="primary" @click="submitperfomanceruletoaudit">提交到绩效办汇总</Button>
          </Col>
          <Col class="quota-table" span="24" style="margin-top: 20px">
            <DynamicTable
              :editIndex.sync="tableOptions.editIndex"
              :option="tableOptions"
              @on-selection-change="onSelectionChage"
              >
            </DynamicTable>
          </Col>
          <Col span="24" class="remark">
            <p>备注</p>
            <p>1.对工作中出现重大失误、造成严重不良影响的;提请市绩效评估委员会研究,加大扣分力度。</p>
            <p>2.出现被考评单位未明确考核工作目标值时，该单位此项工作考核得分按该指标的全市平均分计分。</p>
            <p>3.标记“  ”为省定指标:标记“  "为市委经济工作会议、市政府工作报告内容。</p>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="反馈与批示" name="feedback" icon="ios-trending-up" tab="OrgTabs-2a" v-if="isControlFeedback">
        <Row style="padding: 20px 15px">
          <Col>
            <Input type="textarea" class="textarea" v-model="content" placeholder="请输入反馈内容" />
          </Col>
          <Col style="margin: 20px auto">
            <Button type="primary" @click="indexinstruction">提交反馈</Button>
          </Col>
          <Col>
            <Icon type="ios-book" size="24"/>
            <span class="feedback">已反馈内容</span>
          </Col>
          <Col class="feedback-content" v-for="(item, index) in feedbackList" :key="'反馈与批示' + index">
            <div class="info">{{ item.content }}</div>
            <div class="desc">
              <span class="form">{{ item.instruOrgName }}</span>
              <span class="time">{{ item.createTime | dateFormat }}</span>
            </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    <!-- 维护指标内容 -->
    <Modal
      v-model="addModalShow"
       @on-visible-change="visibleChange"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">维护指标内容</div>
      <div class="quota-info">
        <p v-if="rowInfo.indexOneName">一级指标：{{ rowInfo.indexOneName }}</p>
        <p v-if="rowInfo.indexTwoName">二级指标：{{ rowInfo.indexTwoName }}</p>
        <p v-if="rowInfo.indexThreeName">三级指标：{{ rowInfo.indexThreeName }}</p>
        <p v-if="rowInfo.indexFourName">四级指标：{{ rowInfo.indexFourName }}</p>
        <p v-if="rowInfo.indexFiveName">五级指标：{{ rowInfo.indexFiveName }}</p>
        <p v-if="rowInfo.perDesc">考核要点：{{ rowInfo.perDesc }}</p>
      </div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="100" style="margin-top: 20px">
          <Col>
            <FormItem label="被考核单位">
              <Select clearable placeholder="请选择被考核单位" v-model="addFromLine.assessmentOrgIdList" multiple @on-change="sendCheckUnit" :label-in-value="true">
                <Option v-for="item in unitList" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="指标类型">
              <Select clearable placeholder="请选择指标类型" v-model="addFromLine.targetType" @on-change="selectQuotaType">
                <Option v-for="item in quotaTypes" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="指标内容">
              <RadioGroup v-model="quotaContentType">
                <Radio label="0">独立内容</Radio>
                <Radio label="1" :disabled="isQuantification">统一内容</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col v-if="quotaContentType==='0'">
            <template v-for="(item, index) in selectUnit">
              <FormItem :label="item.label" :key="index+item.label">
                <Input placeholder="请输入指标内容" v-model="item.ipt" :type="inputType" />
              </FormItem>
            </template>
          </Col>
          <Col v-if="quotaContentType==='1'">
            <FormItem label="录入内容">
              <Input type="textarea" class="textarea" placeholder="请输入指标内容" v-model="equlContent" />
            </FormItem>
          </Col>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="saveData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from '../../components/header'
import DynamicTable from '../../../component/dynamic-table'
import {
  getorgorpersonlistbyorgandtypes,
  perfomanceruleset,
  indexinstruction,
  submitperfomanceruletoaudit
} from '@/api/quota'
export default {
  components: {
    Header,
    DynamicTable
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
    return {
      // 统一内容
      equlContent: '',
      inputType: 'text',
      // 指标类型
      quotaTypes: [
        {
          value: '1',
          label: '量化指标'
        },
        {
          value: '2',
          label: '非量化指标'
        }
      ],
      // 是否为量化指标
      isQuantification: false,
      quotaContentType: '0',
      // 被考核单位
      unitList: [],
      selectUnit: [],
      addFromRule: {},
      addFromLine: {
        assessmentOrgIdList: '',
        assessmentOrgNamesList: '',
        id: '',
        targetType: '',
        // 考核任务
        targetValueList: []
      },
      addModalShow: false,
      content: '',
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
      ],
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          // perCode: '要点编号',
          perDesc: '考核要点',
          assessmentOrgName: '被考核单位',
          // area: '地区',
          targetValue: '目标任务',
          dataCollectionOrgName: '数据采集',
          status: '状态'
        },
        // 自定义插槽内容
        colSlot: [
          {
            key: 'status',
            render: (h, params) => {
              let _status = params.row.status
              let _lalbel = ''
              switch (_status) {
                case 0:
                  _lalbel = '待维护'
                  break
                case 1:
                  _lalbel = '已维护'
                  break
                case 2:
                  _lalbel = '已驳回'
                  break
                default:
                  _lalbel = '-'
                  break
              }
              return h('span', _lalbel)
            }
          }
        ],
        // // 是否会操作行
        // editRow: {
        //   status: true,
        //   cols: ['score', 'perCode']
        // },
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 是否需要操作功能
        colOperation: {
          // 启用状态
          status: true,
          // 自定义功能逻辑，同iview的render逻辑
          render: this.operation()
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['targetValue']
        },
        // checkbox: {
        //   status: false,
        //   colIndex: 3
        // },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 3, 4, 7]
        },
        editIndex: -1,
        // 数据
        data: []
      },
      titles: {
        title: ''
      },
      rowInfo: ''
    }
  },
  computed: {
    indexTableVoList () {
      return this.data.indexTableVoList
    },
    // 当前流程节点
    currentId () {
      return this.data.status
    },
    // 反馈列表
    feedbackList () {
      return this.data.indexBatchInstructionListVOList
    },
    title () {
      return this.data.title
    },
    sheetType () {
      return this.$route.query.type
    },
    // 内容维护控制
    isControlCreateQuota () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104102101)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106102101)) {
        _control = true
      }

      return _control
    },
    // 提交到分值维护
    isControlScoreInput () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104102102)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106102102)) {
        _control = true
      }

      return _control
    },
    // 反馈批示控制
    isControlFeedback () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104106)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106105)) {
        _control = true
      }

      return _control
    }
  },
  created () {
    this.queryList()
    this.titles.title = this.title
    console.log('当前指标信息：', this.data)
  },
  methods: {
    // 根据选择的指标类型修改输入框输入类型
    selectQuotaType (value) {
      if (!value) return
      // 1.量化；2.非量化
      if (value === '1') {
        this.inputType = 'number'
        this.isQuantification = true
        this.quotaContentType = 0 + ''
      } else {
        this.inputType = 'text'
        this.isQuantification = false
      }
    },
    // 提交到绩效办汇总
    submitperfomanceruletoaudit () {
      this.$Modal.confirm({
        title: '提交数据',
        content: `确定提交内容到绩效办吗？`,
        onOk: () => {
          let id = this.data.id
          submitperfomanceruletoaudit(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.$emit('refresh-quota-type')
            }
          })
        }
      })
    },
    // 反馈与批示
    indexinstruction () {
      if (!this.content || this.content.length === 0) {
        this.$Message.warning('请输入反馈内容')
        return
      }
      let params = {
        content: this.content,
        // replyType: 回复类型，1，回复主题，2，回复评论
        replyType: 1,
        themeId: this.data.id
      }
      indexinstruction(params).then(res => {
        if (res.data.code === 10000) {
          this.content = ''
          this.$Message.success(res.data.msg)
          this.$emit('refresh-quota-type')
        }
      })
    },
    // 获取数据采集单位
    getorgorpersonlistbyorgandtypes () {
      let params = {
        // getTypes: 1，数据采集；2，被考核单位
        getTypes: 2,
        orgId: this.data.indexCreateOrgId,
        types: this.data.types
      }
      getorgorpersonlistbyorgandtypes(params).then(res => {
        if (res.data.code === 10000) {
          this.unitList = res.data.data
        }
      })
    },
    // 选择被考核单位
    sendCheckUnit (value) {
      console.log(value, '============================================')
      let names = []
      let _selectUnit = []
      value.forEach(item => {
        names.push(item.label)
        let ipt = ''
        if (this.selectUnit.length > 0) {
          this.selectUnit.forEach(sItem => {
            if (sItem.value === item.value) {
              ipt = sItem.ipt
            }
          })
        }
        _selectUnit.push({ ...item, ipt: ipt })
      })
      this.addFromLine.assessmentOrgNamesList = names
      this.selectUnit = [].concat(_selectUnit)
    },
    visibleChange (visible) {
      if (!visible) {
        this.equlContent = ''
        this.addFromLine.assessmentOrgIdList = ''
        this.addFromLine.assessmentOrgNamesList = ''
        this.addFromLine.targetValue = []
        this.addFromLine.targetType = ''
        this.quotaContentType = '0'
      }
    },
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    onSelectionChage (selection) {
      console.log(selection)
    },
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 编辑
        let detailIcon = h('Icon', {
          props: {
            type: 'ios-paper-outline',
            ...prop
          },
          on: {
            click: () => {
              this.detailData(params)
            }
          }
        })

        return h('div', [this.isControlCreateQuota && detailIcon])
      }
    },
    detailData (rowInfo) {
      this.addModalShow = true
      this.rowInfo = rowInfo.row
      this.addFromLine.id = this.rowInfo.id
      // 获取数据采集单位
      this.getorgorpersonlistbyorgandtypes()
      if (rowInfo.row.status === 1) {
        // 已维护状态
        let rowInforRule = rowInfo.row.perfomanceRuleEntityList
        let _selectUnit = []
        let _selectUnitIds = []
        let names = []
        // let _targeValue = []
        rowInforRule.forEach((item, index) => {
          _selectUnitIds.push(item.assessmentOrgId)
          names.push(item.assessmentOrgName)
          _selectUnit.push({
            value: item.assessmentOrgId,
            label: item.assessmentOrgName,
            ipt: item.targetValue
          })

          this.addFromLine.targetType = item.targetType + ''
        })
        // 1.量化；2.非量化
        if (this.addFromLine.targetType === '1') {
          this.isQuantification = true
          this.quotaContentType = 0 + ''
        } else {
          this.isQuantification = false
        }
        // this.isQuantification = true
        // this.quotaContentType = 0 + ''
        this.selectUnit = [].concat(_selectUnit)
        this.addFromLine.assessmentOrgNamesList = names
        this.addFromLine.assessmentOrgIdList = _selectUnitIds
        console.log('rule>>>>>>>', this.addFromLine, this.unitList)
      }
    },
    saveData () {
      let params = { ...this.addFromLine }
      let contents = []
      this.selectUnit.forEach(item => {
        if (this.quotaContentType === '0') {
          // 考核内容（独立）
          contents.push(item.ipt)
        } else {
          // 考核内容（统一）
          contents.push(this.equlContent)
        }
      })
      params.targetValueList = contents
      console.log('考核内容============', params)
      // return
      perfomanceruleset(params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.addModalShow = false
          this.$emit('refresh-quota-type')
        }
      })
    },
    quotaTabClick (name) {
      console.log(name)
    },
    queryList () {
      this.$store.state.quota.list = this.indexTableVoList || []
      this.$store.commit('setQuota', this.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  },
  watch: {
    data (newVal) {
      console.log('============', newVal.indexTableVoList)
      this.$store.state.quota.list = newVal.indexTableVoList || []
      this.$store.commit('setQuota', newVal.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
