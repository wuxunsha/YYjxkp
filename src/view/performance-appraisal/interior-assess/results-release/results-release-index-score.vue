<style lang='less' scoped>
@import  "../../../../common/less/global.less";
/deep/ .ivu-table-wrapper,
/deep/ .ivu-table th,
/deep/ .ivu-table td {
  border: 0.5px solid #e8eaec;
}
/deep/.ivu-modal-footer{
    border-top: 0;
    display: none;
}
.modal-title{
  font-size: 20px;
  color: #333333;
  text-align: center;
}
.modal-content{
   margin-bottom: 10px;
   border-bottom: 1px dashed #000;
    .scoring-criteria{
        width: 75%;
        margin:0 auto;
        margin-top: 20px;
        p{
            font-size: 14px;
            color: #333333;
            margin-top: 10px;
        }
        .main-points{
            margin-top: 8px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }
    }
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
.download-release{
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
.region{
  display: flex;
  flex-wrap: wrap;
  .region-item{
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    span{
      width: 30%;
      margin-right: 15px;
      text-align: center;
      line-height: 40px;
    }
    /deep/.ivu-input{
      flex: 1;
      margin-top: 4px;
    }
  }
}
.confirm{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .ivu-btn{
    width: 50%;
    margin: 0 auto;
    border-radius: 4px;
  }
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
/deep/.ivu-input-word-count {
  display: none;
}
.resultSubmit {
  /deep/textarea.ivu-input {
  min-height: 150px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
}
.replyWindow {
  /deep/.modal-content {
    border-bottom: none;
  }
  /deep/.ivu-modal-body {
    padding-bottom: 0;
  }
  /deep/.ivu-modal-footer {
    display: block;
  }
}
.resultOk {
  display: flex;
  justify-content: center;
}
</style>

<template>
    <div class="container">
        <div class="content">
            <div class="header">
                <div class="header-title">
                    <p class="title">区县（市）绩效考核</p>
                    <p class="current-unit">考核时间段：{{assessTime}}</p>
                </div>
                <Countdown :startTime=1576636321000 :endTime="endTime"></Countdown>
                <div class="steps">
                    <article-steps :currentId="5" :stepsList="stepsList"></article-steps>
                </div>
                        <div class="tabs">
          <Tabs value="name1">
          <TabPane label="考核结果" name="name1">
            <Row class="download-release">
                <Button type="primary" icon="ios-search">下载报表</Button>
                <Button type="primary" icon="ios-search" @click="confirmRelease" v-if="btnShow(112102106102)">确认并发布</Button>
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
              <Button type="primary" @click="oksubmit" v-if="btnShow(112102101)" >提交反馈</Button>
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
                  <Button type="primary" @click="showModal(item.id)" v-if="btnShow(112102101)">回复</Button>
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
    <!-- 查看详情模板 -->
    <Modal v-model='scoreStatus' width='40%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>指标打分</span>
      </p>
      <div class='modal-content'>
          <div class="scoring-criteria">
              <p>一级指标：高质量发展</p>
              <p>二级指标：产业兴市</p>
              <p>三级指标：固定资产投资</p>
              <div class="main-points">
                  <span>考核要点：总量和增速</span>
                  <span>分值：{{scoreQuantity}}分</span>
              </div>
          </div>
      </div>
      <div class="region">
          <div class="region-item">
            <span>{{scoreMechanism}}</span>
            <!-- <Input  placeholder="得分 (支持小数点后两位)" v-model="resultScore" /> -->
            <Input v-model="resultScore" type="number"  maxlength="5" show-word-limit placeholder="得分 (支持小数点后两位)"/>
          </div>
      </div>
      <div class="confirm">
        <Button type="primary" @click="resultScoreHanderle">确认</Button>
      </div>
    </Modal>

    <!-- 结果发布的弹出层 -->
        <Modal
        v-model="modal"
        title="结果发布"
        @on-ok="ok" class="resultSubmit">
        <Input v-model="submitFeedBack.content" type="textarea" :rows="4" placeholder="请输入提交反馈内容" />
        <div class="resultOk">
          <Button size="large" type="primary" @click="ok">确认</Button>
        </div>
        </Modal>

      <!-- 回复弹窗 -->
    <Modal v-model="modalder" style="text-align: center;" class="modal replyWindow" @on-visible-change="modaChange">
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
import { getDataCheckLists, resultRelease, resultScore, processSubmission } from '@/api/performance-appraisals'
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
      // 结束时间
      endTime: 4577604403747,
      // 得分
      resultScore: '',
      // 控制显示隐藏
      modal: false,
      modalder: false,
      feedbackId: '',
      // 回复内容
      revert: '',
      // 时间段
      assessTime: '',
      // 反馈与评论数据
      feedbackList: [],
      // 提交反馈需要传的参数
      submitFeedBack: {
        content: '',
        replyType: 1,
        themeId: ''
      },
      //  打分需要传的参数
      scoreParams: {
        batchId: '',
        id: '',
        score: ''
      },
      //  要打分的分值
      scoreQuantity: '',
      //  要被打分的机构
      scoreMechanism: '',
      // 步骤条所需要的数据
      stepsList: [
        {
          explain: '发起',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '数据采集',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '考核单位确认',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '汇总与修改',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '结果发布',
          icon: 'ivu-icon ivu-icon-ios-albums'
        }
      ],
      //  控制查看详情模板的显示隐藏
      seeDetailsStatus: false,
      scoreStatus: false,
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          perDesc: '考核要点',
          score: '分值',
          assessmentOrgName: '被考核机构(人)',
          targetValue: '目标任务',
          busiValueStrAndbusiValue: '完成情况',
          // targetType: '计分方式',
          dataCollectionOrgName: '数据采集单位',
          busiScore: '打分'
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
          colIndex: [0, 1, 2, 3, 4, 7, 8]
        },
        editIndex: -1,
        // 数据
        data: []
      },
      // 数据
      data: []
    }
  },
  created () {
    // this.queryList()
    this.getQueryList()
  },

  computed: {},
  methods: {
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
    // 回复内容
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
        }
      })
      // this.$Message.error('该机构没有创建指标')
    },
    // 确认打分
    resultScoreHanderle () {
      // parseFloat()
      let a = this.resultScore.replace(/\s+/g, '')
      if (a.length === 0) {
        this.$Message.error('打分值不能为空值')
        return
      }
      let b = parseFloat(a)
      if (b > 99 || b < 0) {
        this.$Message.error('打分值最多为99分最少为0分')
        return
      }
      let c = Number(b.toString().match(/^\d+(?:\.\d{0,2})?/))
      this.scoreParams.score = c
      resultScore(this.scoreParams).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('打分成功')
          this.scoreStatus = false
          this.resultScore = ''
          this.getQueryList()
          this.$router.go(0)
        }
      })
    },
    scoreHandeler (params) {
      this.scoreStatus = true
      this.scoreMechanism = params.row.assessmentOrgName
      this.scoreParams.id = params.row.busiId
      this.scoreQuantity = params.row.score
      this.resultScore = params.row.busiScore
      this.scoreParams.batchId = this.submitFeedBack.themeId
    },
    modalChange () {
    },
    //  控制结果发布的模板
    confirmRelease () {
      this.modal = true
      this.submitFeedBack.content = ''
    },
    //  弹出层的确认取消按钮
    ok () {
      let data = this.submitFeedBack
      resultRelease(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('流程已完毕')
          this.modal = false
          this.$router.push({
            path: '/interior_assess_main_page'
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
    //  控制查看详情模板
    seeDetailsHandeler () {
      this.queryList()
      this.seeDetailsStatus = true
    },
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 打分
        let detailIcon = h('Icon', {
          props: {
            custom: 'icon-font iconjifenxiangqing',
            ...prop
          },
          on: {
            click: () => {
              this.scoreHandeler(params)
            }
          }
        })
        // 修改
        let modifyIcon = h('Icon', {
          props: {
            type: 'ios-create-outline',
            ...prop
          },
          on: {
            click: () => {
              this.modifyHandeler(params)
            }
          }
        })
        let detailTooltip = h('Tooltip', {
          props: {
            content: '打分',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        let modifyTooltip = h('Tooltip', {
          props: {
            content: '修改',
            theme: 'light',
            placement: 'top'
          }
        }, [modifyIcon])
        return h('div', [this.btnShow(112102106101) && detailTooltip, modifyTooltip])
      }
    },
    modifyHandeler (params) {
      this.$router.push({
        path: '/interior_data_entering_page',
        query: {
          data: params.row.busiValueStrAndbusiValue,
          oneIndex: params.row.indexOneName,
          twoIndex: params.row.indexTwoName,
          threeIndex: params.row.indexThreeName,
          fourIndex: params.row.indexFourName,
          fiveIndex: params.row.indexFiveName,
          perDesc: params.row.perDesc,
          orgName: params.row.assessmentOrgName,
          targetType: params.row.targetType,
          busiId: params.row.busiId,
          step: 5
        }
      })
    },
    // 获取表格数据
    getQueryList () {
      getDataCheckLists(5).then(res => {
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
