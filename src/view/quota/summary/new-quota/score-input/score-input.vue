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
          <!-- <Col class="quota-table" span="2">
            <Button type="primary">维护分值</Button>
          </Col> -->
          <Col class="quota-table" span="2" v-if="isControlConfirmOrg">
            <Button type="primary" @click="addModalShow1=true">提交给被考核单位确认</Button>
          </Col>
          <Col span="20" style="text-align: right">
            总分：{{ totalScore }}
          </Col>
          <Col class="quota-table" span="24" style="margin-top: 20px">
            <DynamicTable
              :editIndex.sync="tableOptions.editIndex"
              :option="tableOptions"
              @on-selection-change="onSelectionChage"
              >
            </DynamicTable>
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
     <!-- 维护分值 -->
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
        <!-- <p v-if="rowInfo.indexOneName">一级指标：{{ rowInfo.indexOneName }}</p>
        <p v-if="rowInfo.indexTwoName">二级指标：{{ rowInfo.indexTwoName }}</p>
        <p v-if="rowInfo.indexThreeName">三级指标：{{ rowInfo.indexThreeName }}</p>
        <p v-if="rowInfo.indexFourName">四级指标：{{ rowInfo.indexFourName }}</p>
        <p v-if="rowInfo.indexFiveName">五级指标：{{ rowInfo.indexFiveName }}</p> -->
        <p v-if="rowInfo.perDesc">考核要点：{{ rowInfo.perDesc }}</p>
      </div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="100" style="margin-top: 20px">
          <Col>
            <FormItem prop="score" label="分值">
              <Input v-model="addFromLine.score" placeholder="请输入分值" />
            </FormItem>
          </Col>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="saveData">确定</Button>
      </div>
    </Modal>
    <!-- 提交数据到被考核单位确认 -->
    <Modal
      v-model="addModalShow1"
       @on-visible-change="visibleChange1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">正在提交数据到被考核单位</div>
      <Form ref="addForm1" :model="addFromLine1" :rules="addFromRule1" :label-width="120" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="20">
            <FormItem prop="" label="选择时间">
              <DatePicker type="datetime" placeholder="指标内容收集截止时间" v-model="addFromLine1.timeOut"></DatePicker>
            </FormItem>
            <FormItem prop="" label="超时是否扣分">
              <RadioGroup v-model="addFromLine1.deductPoint">
                  <Radio label="0">是</Radio>
                  <Radio label="1">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem prop="" label="扣除分值">
              <Input v-model="addFromLine1.points" :disabled="addFromLine1.deductPoint==='1'">
                <span slot="append">分</span>
              </Input>
            </FormItem>
            <FormItem prop="" label="超时提醒时间">
              <DatePicker type="datetime" placeholder="请选择超时提醒时间" v-model="addFromLine1.timeRemind"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="submittoassessment">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from '../../components/header'
import DynamicTable from '../../../component/dynamic-table'
import {
  indexinstruction,
  rulescoreset,
  submittoassessment
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
          // area: '地区',
          assessmentOrgName: '被考核单位',
          targetValue: '目标任务',
          dataCollectionOrgName: '数据采集'
        },
        // 是否会操作行
        // editRow: {
        //   status: true,
        //   cols: ['score', 'number']
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
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 5, 9],
          noMergeCellName: []
        },
        editIndex: -1,
        // 数据
        data: []
      },
      titles: {
        title: ''
      },
      addFromLine: {
        ruleTemplateId: '',
        score: ''
      },
      addFromRule: {
        score: { required: true, message: '请输入分值', trigger: 'blur' }
      },
      rowInfo: '',
      addModalShow1: false,
      // 提交数据到考核单位
      addFromLine1: {
        deductPoint: '1',
        points: '',
        sheetId: '',
        timeOut: '',
        timeRemind: ''
      },
      addFromRule1: {
        timeOut1: [
          { required: true, message: '请选择指标内容收集截止时间', trigger: 'blur' },
          { type: 'string', message: '请选择指标内容收集截止时间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    indexTableVoList () {
      return this.data.indexTableVoList
    },
    title () {
      return this.data.title
    },
    // 当前流程节点
    currentId () {
      return this.data.status
    },
    // 反馈列表
    feedbackList () {
      return this.data.indexBatchInstructionListVOList
    },
    totalScore () {
      return this.data.totalScore
    },
    sheetType () {
      return this.$route.query.type
    },
    // 提交到被考核单位确认
    isControlConfirmOrg () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104103104)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106103103)) {
        _control = true
      }

      return _control
    },
    // 分值维护
    isControlScore () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104103)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106103)) {
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
    this.titles.title = this.title
    this.queryList()
  },
  mounted () {
    console.log('分值维护：', this.data)
  },
  methods: {
    // 提交到被考核单位确认
    submittoassessment () {
      this.$Modal.confirm({
        title: '提交数据确认',
        content: `确定提交到被考核单位确认吗？`,
        onOk: () => {
          let params = { ...this.addFromLine1 }
          params.sheetId = this.data.id
          params.timeOut = new Date(params.timeOut).getTime()
          params.timeRemind = new Date(params.timeRemind).getTime()
          submittoassessment(params).then(res => {
            if (res.data.code === 10000) {
              this.addModalShow = false
              this.addModalShow1 = false
              this.$Message.success(res.data.msg)
              this.$emit('refresh-quota-type')
            }
          })
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm('addForm')
      }
    },
    visibleChange1 (visible) {
      if (!visible) {
        this.resetForm('addForm1')
      }
    },
    resetForm (name) {
      this.$refs[name].resetFields()
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
    onSelectionChage (selection) {
      console.log(selection)
    },
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 维护分值
        let detailIcon = h('Icon', {
          props: {
            type: 'ios-paper-outline',
            ...prop
          },
          on: {
            click: () => {
              this.showAddForm(params)
            }
          }
        })
        let scoreInputTooltip = h('Tooltip', {
          props: {
            content: '分值维护',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [this.isControlScore && scoreInputTooltip])
      }
    },
    // 维护分值
    showAddForm (rowInfo) {
      this.addModalShow = true
      this.rowInfo = rowInfo.row
      this.addFromLine.ruleTemplateId = this.rowInfo.ruleTemplateId
      this.addFromLine.score = rowInfo.row.score
    },
    saveData () {
      let params = { ...this.addFromLine }
      rulescoreset(params).then(res => {
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
      this.$store.state.quota.list = newVal.indexTableVoList || []
      this.$store.commit('setQuota', newVal.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
