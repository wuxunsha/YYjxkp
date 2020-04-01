<style lang='less' scoped>
@import  "../../../../common/less/global.less";
/deep/ .ivu-table-wrapper,
/deep/ .ivu-table th,
/deep/ .ivu-table td {
  border: 0.5px solid #e8eaec;
}
.header {
  .header-title {
      text-align: center;
      margin-bottom: 30px;
      .title {
        font-size: 24px;
        color: #333333
      }
      .current-unit{
          font-size: 18px;
          color: #666666;
          margin-top: 10px;
      }
  }
    .steps {
    width: 100%;
    height: 50px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
.countdown {
      width: 100%;
      height: 50px;
      background-color: #FFEBD5;
      padding: 0 20px;
}
/deep/.ivu-tabs-nav-scroll{
    background-color: #EFF7FF;
    margin-bottom: 10px;
    border: 0;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 18px;
  font-weight: 500;
  line-height: 57px;
  color: rgba(9, 114, 231, 1);
  padding: 0 50px;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #FF9B29;
}
/deep/.ivu-tabs-ink-bar {
  background-color: #FF9B29;
}
.modify-submit{
    margin-bottom: 20px;
  /deep/.ivu-btn {
      border-radius: 4px;
      margin-right: 30px;
 }
}
/deep/textarea.ivu-input {
  min-height: 300px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
.feedback-content-item {
  margin: 0 45px 8px 50px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  p{
    font-size: 14px;
    color: #333333;
    margin-bottom: 8px;
  }
  .feedback-person{
    display: flex;
    justify-content: space-between;
    span{
      font-size: 12px;
     color: #CCCCCC;
    }
  }
  .reply{
      margin-top: 15px;
      .ivu-btn{
          height: 35px;
          border-radius: 4px;
      }
  }
}
.submit{
  margin-bottom: 15px;
  /deep/.ivu-btn-primary{
    border-radius: 4px;
    margin-left: 15px;
  }
}
.separate-line{
  width: 100%;
  height: 15px;
  background-color: #F3F3F3;
}
.already-feedback {
  font-size: 20px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin:15px 0 20px 15px;
}
/deep/.ivu-input-type-textarea{
  padding: 15px;
}
/deep/.ivu-btn{
  margin-bottom: 15px;
}

// 回复弹窗
.modal {
  .modal-content {
    margin-top: 40px;
    textarea {
      width: 100%;
      min-height: 200px;
      border: none;
      font-size: 16px;
      outline: 0;
      resize: none;
    }
  }
  .modal-footer {
    .add-botton {
      width: 100px;
    }
  }
}
</style>

<template>
    <div class="container">
        <div class="content">
            <div class="header">
                <div class="header-title">
                    <p class="title">区县（市）绩效考核</p>
                    <p class="current-unit">考核时间段：{{assessTime}}</p>
                    <p class="current-unit">当前单位：{{currentUnit.orgName}}</p>
                </div>
                <Countdown :startTime=1576636321000 :endTime="endTime"></Countdown>
                        <div class="tabs">
          <Tabs value="name1">
          <TabPane label="考核结果" name="name1">
            <Row class="submit-assessment">
              <Button type="primary" @click="submitDataFeedback" v-if="btnShow(112101104101)">提交反馈</Button>
            </Row>
            <Row>
              <Col class="quota-table">
                <DynamicTable :option="tableOptions" />
              </Col>
            </Row>
          </TabPane>

          <TabPane label="反馈与批示" name="name2">
            <!-- 反馈内容 -->
            <Row class="feedback-content">
              <Input  v-model="submitFeedBack.content" show-word-limit type="textarea" class="feedback-input" :maxlength="1000"/>
            </Row>
            <Row class="submit">
              <Button type="primary" @click="oksubmit" v-if="btnShow(112101101)">提交反馈</Button>
            </Row>
            <div class="separate-line">
            </div>
            <Row class="already-feedback">
                <Icon type="ios-checkmark" />已反馈内容
            </Row>
            <Row class="feedback-content-item" v-for="item in feedbackList" :key="item.id">
                <p>
                  {{item.content}}
                </p>
                <div class="feedback-person">
                  <span>{{item.instruOrgName}}  {{item.createName}}  13312345678 </span>
                  <span>{{item.createTime | dateFormat}}</span>
                </div>
                <div class="reply">
                  <Button type="primary" @click="showModal(item.id)" v-if="btnShow(112101101)">回复</Button>
                </div>
                <div v-for="item1 in item.children" :key="item1.id">
                  <span>{{item1.instruOrgName}}：</span>
                  <span>{{item1.content}}</span>
                </div>
            </Row>
          </TabPane>
          </Tabs>
        </div>
            </div>
        </div>
        <Modal
        v-model="modal"
        title="提交反馈"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="submitFeedBack.content" type="textarea" :rows="4" placeholder="请输入提交反馈内容" />
        </Modal>

      <!-- 回复弹窗 -->
    <Modal v-model="modalder" style="text-align: center;" class="modal" @on-visible-change="modaChange">
      <div class="modal-content" style="text-align:center">
        <Input v-model="getReply.content" show-word-limit type="textarea" class="feedback-input" :maxlength="200" placeholder="请输入回复内容"/>
      </div>
      <div slot="footer" style="text-align: center;" class="modal-footer">
        <Button type="primary" class="add-botton" @click="submitRevert">确定</Button>
      </div>
    </Modal>
    </div>
</template>

<script>
import { getDataCheckList, submitFeedback, processSubmission } from '@/api/performance-appraisals'
import DynamicTable from '../../../quota/component/dynamic-table'
import Countdown from '../../component/count-time/count-time'
import { getStandardDate } from '@/libs/tools'
export default {
  components: {
    DynamicTable,
    Countdown
  },
  data () {
    return {
      // 回复评论需要的参数
      getReply: {
        content: '',
        replyId: '',
        replyType: 2,
        themeId: ''
      },
      //  当前单位
      currentUnit: [],
      //  控制查看详情模板的显示隐藏
      seeDetailsStatus: false,
      //  控制显示隐藏
      modal: false,
      modalder: false,
      feedbackId: '',
      // 时间段
      assessTime: '',
      // 结束时间
      endTime: 4577604403747,
      // 回复内容
      revert: '',
      // 反馈与评论数据
      feedbackList: [],
      //  提交反馈需要传的参数
      submitFeedBack: {
        content: '',
        replyType: 1,
        themeId: ''
      },
      // 需要作为列显示的列名
      tableOptions: {
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          perDesc: '考核要点',
          targetValue: '目标任务',
          busiValueStrAndbusiValue: '完成情况',
          dataCollectionOrgName: '数据采集单位'
        },
        // 判断指标是否有内容显示
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 自定义插槽内容
        colSlot: [
          {
            key: 'targetType',
            render: (h, params) => {
              let _status = params.row.targetType
              let _lalbel = ''
              switch (_status) {
                case 1:
                  _lalbel = '量化'
                  break
                case 2:
                  _lalbel = '非量化'
                  break
                default:
                  _lalbel = '-'
                  break
              }
              return h('span', _lalbel)
            }
          }
        ],
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
          colIndex: [0, 1, 2, 3, 4]
        },
        editIndex: -1,
        // 数据
        data: []
      }
    }
  },
  created () {
    this.getQueryList()
    this.getCurrentUnit()
  },

  computed: {},
  methods: {
    // 获取当前单位
    getCurrentUnit () {
      let userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
      this.currentUnit = userInfo
    },
    // 显示回复弹窗
    showModal (id) {
      this.modalder = true
      this.getReply.replyId = id
      this.getReply.themeId = this.submitFeedBack.themeId
    },
    // 监听回复弹窗关闭
    modaChange (e) {
      if (e === false) {
        this.revert = ''
      }
    },
    // 提交评论
    submitRevert () {
      if (this.getReply.content === '') {
        this.$Message.error('请输入评论内容')
        return
      }
      processSubmission(this.getReply).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('回复成功')
          this.modalder = false
          this.getQueryList()
          this.getReply.content = ''
        }
      })
      // this.$Message.error('该机构没有创建指标')
    },
    //  点击弹出层
    submitDataFeedback () {
      this.modal = true
      this.submitFeedBack.content = ''
    },
    //  弹出层的确认取消按钮
    ok () {
      let data = this.submitFeedBack
      submitFeedback(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('提交成功')
          this.$router.push({
            path: '/superior_backlog_main_page'
          })
        }
      })
    },
    oksubmit () {
      let data = this.submitFeedBack
      processSubmission(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交评论成功')
          this.getQueryList()
          this.submitFeedBack.content = ''
        }
      })
    },
    cancel () {
      this.$Message.info('取消了提交反馈')
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
        let detailTooltip = h('Tooltip', {
          props: {
            content: '查看详情',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [detailTooltip])
      }
    },
    // 获取表格数据
    getQueryList () {
      getDataCheckList(3).then(res => {
        if (res.data.code === 10000) {
          let tableList = []
          let tabData = []
          let getStartTime = ''
          let getEndTime = ''
          tableList = res.data.data
          tableList.forEach(item => {
            if (item.indexTypeStatue === 0) {
              tabData = item.batchTableVoList
              this.endTime = item.dataCEndTime
              getStartTime = getStandardDate(item.perStartTime, 'yearDate')
              getEndTime = getStandardDate(item.perEndTime, 'monthDate')
              this.feedbackList = item.indexBatchInstructionListVOList
              this.$store.state.quota.list = tabData
              this.$store.commit('setQuota', tabData)
              this.$store.commit('createColumn', this.tableOptions)
              this.submitFeedBack.themeId = item.id
              this.assessTime = getStartTime + '~' + getEndTime
            }
          })
        }
      })
    }
  }
}
</script>
