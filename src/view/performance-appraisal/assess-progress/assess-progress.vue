<style lang="less" scoped>
@tab-height: 50px;
li {
  list-style: none;
}
/deep/textarea.ivu-input {
  min-height: 200px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
/deep/.ivu-tabs-bar {
  background-color: #fff;
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
  background-color: #fff;
}
.header {
  margin-top: 20px;
  background: #fff;
  .this-year {
    padding: 20px 20px 0;
    text-align: center;
  }
  .steps {
    padding: 0 20px;
  }
  .quota-table {
    background-color: #fff;
    padding: 10px 20px;
  }
  // tabs切换栏
  .tabs {
    padding: 10px 0;
    .tabs1 {
      .table {
        margin-top: 10px;
      }
    }
    .tabs2 {
      padding-top: 10px;
      /deep/.ivu-input {
        min-height: 200px;
      }
      .add-feedback {
        width: 166px;
        height: 44px;
        margin-top: 14px;
        background-color: #0972E7;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
      }
      /* 已反馈内容 */
      .footer {
        margin-top: 40px;
        .already-feedback {
          font-size: 20px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .already-feedback-content {
          margin-left: 34px;
          li {
            margin-top: 10px;
            border-bottom: 1px solid #F3F3F3;
            p:nth-child(2) {
              font-size: 16px;
              height: 30px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              .revert {
                float: right;
                font-size: 16px;
                height: 30px;
                font-weight: 500;
                color: rgba(9, 114, 231, 1);
                cursor: pointer;
              }
            }
            p:nth-child(1) {
              font-size: 14px;
              height: 30px;
              font-weight:500;
              color: rgba(204, 204, 204, 1);
              span:nth-child(1) {
                span {
                  margin-right: 10px;
                }
              }
              .feedback-time {
                float: right;
                font-size: 14px;
                height: 30px;
                font-weight:500;
                color: rgba(204, 204, 204, 1);
              }
            }
            >div {
              width: 100%;
              margin-top: 10px;
              div {
                margin-top: 6px;
                margin-left: 40px;
                span {
                  font-size: 14px;
                  height: 30px;
                  font-weight:500;
                }
                span:nth-child(1) {
                  margin-right: 6px;
                  color: rgba(204, 204, 204, 1);
                }
              }
            }
          }
        }
      }
    }
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
</style>
<template>
  <div>
    <Tabs :name="tabsName" @on-click="tabBar" ref="tabs" :value="currentTab">
      <template v-for="(item, index) in indexType">
        <TabPane icon="ios-trending-up" :label="item.indexTypeName" :name="JSON.stringify(item)" :key="index" v-if="item.indexTypeStatue === 0" :tab="tabsName">
          <Row class="header">
            <Col class="this-year">
              <h4>考核时间段：{{assessTime}}</h4>
            </Col>
            <Col class="steps">
              <article-steps :currentId="current" :stepsList="stepsList"></article-steps>
            </Col>
            <Col class="quota-table">
              <Tabs :animated="false" class="tabs" name="tab-1">
                <TabPane label="考核指标" tab="tab-1" class="tabs1">
                  <!-- 表格数据 -->
                  <Row>
                    <Col class="table">
                      <dynamicTable :option="tableOptions"></dynamicTable>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane label="反馈与评论" tab="tab-1" class="tabs2">
                  <!-- 反馈内容 -->
                  <Row>
                    <Input v-model="feedbackContent" show-word-limit type="textarea" :maxlength="1000"/>
                  </Row>
                  <Row>
                    <Button class="add-feedback" @click="submitFeedback" v-if="btnShow(112101101)">提交批示</Button>
                  </Row>
                  <!-- 已反馈内容 -->
                  <Row class="footer">
                    <Row class="already-feedback">
                      <Icon type="ios-checkmark" />已反馈内容
                    </Row>
                    <ul class="already-feedback-content">
                      <li v-for="item in feedbackList" :key="item.id">
                        <p>
                          <span>
                            <span>{{item.instruOrgName}}</span>
                            <span>{{item.createName}}</span>
                          </span>
                          <span class="feedback-time">
                            <Icon type="ios-checkmark" />{{item.createTime | dateFormat}}
                          </span>
                        </p>
                        <p>
                          <span>{{item.content}}</span>
                          <span class="revert" @click="showModal(item.id)" v-if="btnShow(112101101)">回复</span>
                        </p>
                        <div>
                          <div v-for="item1 in item.children" :key="item1.id">
                            <span>{{item1.instruOrgName}}:</span>
                            <span>{{item1.content}}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </TabPane>
      </template>
    </Tabs>
    <!-- 回复弹窗 -->
    <Modal v-model="modal" style="text-align: center;" class="modal" @on-visible-change="modaChange">
      <div class="modal-content" style="text-align:center">
        <Input v-model="revert" show-word-limit type="textarea" class="feedback-input" :maxlength="200" placeholder="请输入回复内容"/>
      </div>
      <div slot="footer" style="text-align: center;" class="modal-footer">
        <Button type="primary" class="add-botton" @click="submitRevert">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  theinspectionschedule,
  submitComments
} from '@/api/performance-appraisal'
import dynamicTable from '../../quota/component/dynamic-table'
import { getStandardDate } from '@/libs/tools'
export default {
  components: {
    dynamicTable
  },
  data () {
    return {
      currentTab: '',
      tabsName: 'tab',
      // 切换数据
      tabsData: '',
      // 指标类型
      indexType: [],
      // 指标所属单位ID
      indexCreateOrgId: null,
      // 绩效考核机构能涉及的绩效指标类型Id
      indexTypeId: null,
      // 指标主表id
      sheetId: null,
      // 考核时间段
      assessTime: '',
      // 进入到第几个节点
      current: 0,
      themeId: null,
      // 步骤条参数
      stepsList: [
        {
          explain: '发起',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '数据采集',
          icon: 'ivu-icon ivu-icon-ios-desktop'
        },
        {
          explain: '考核单位确认',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '汇总与修改',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '结果发布',
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
          perDesc: '考核要点',
          assessmentOrgName: '被考核单位',
          targetValue: '目标任务',
          busiValueStrAndbusiValue: '完成情况',
          // targetType: '计分方式',
          dataCollectionOrgName: '采集单位'
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
              // let _status = params.row.targetType
              let _lalbel = ''
              // switch (_status) {
              //   case 1:
              //     _lalbel = '量化'
              //     break
              //   case 2:
              //     _lalbel = '非量化'
              //     break
              //   default:
              //     _lalbel = '-'
              //     break
              // }
              return h('span', _lalbel)
            }
          },
          {
            key: 'busiValueStrAndbusiValue',
            render: (h, params) => {
              let _status = params.row.busiValueStrAndbusiValue
              let _lalbel = ''
              switch (_status) {
                case 'null':
                  _lalbel = '未采集'
                  break
                case '':
                  _lalbel = '未采集'
                  break
                default:
                  _lalbel = _status
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
      },
      // 反馈数据
      feedbackList: [],
      // 反馈内容
      feedbackContent: '',
      // 反馈id
      feedbackId: null,
      // 回复评论弹窗开关
      modal: false,
      // 回复评论内容
      revert: ''
    }
  },
  computed: {
  },
  created () {
    // 获取当前登录用户指标详情
    this.getTheinspectionschedule()
  },
  methods: {
    // 获取当前登录用户指标详情
    getTheinspectionschedule () {
      theinspectionschedule().then(res => {
        if (res.data.code === 10000) {
          let tabList = []
          let startTime = ''
          let endTime = ''
          this.indexType = res.data.data
          this.indexType.forEach(item => {
            if (item.indexTypeStatue === 0) {
              this.currentTab = JSON.stringify(item)
              tabList = item.batchTableVoList
              startTime = getStandardDate(item.perStartTime, 'yearDate')
              endTime = getStandardDate(item.perEndTime, 'monthDate')
              this.feedbackList = item.indexBatchInstructionListVOList
              this.current = item.flowStstus
              this.themeId = item.id
              this.assessTime = startTime + '~' + endTime
              this.$store.state.quota.list = tabList
              this.$store.commit('setQuota', tabList)
              this.$store.commit('createColumn', this.tableOptions)
            }
          })
        }
      })
    },
    // 提交反馈
    submitFeedback () {
      if (this.feedbackContent === '') {
        this.$Message.error('请输入反馈内容')
        return
      }
      if (this.themeId) {
        const data = {
          content: this.feedbackContent,
          themeId: this.themeId,
          replyType: 1
        }
        submitComments(data).then(res => {
          if (res.data.code === 10000) {
            this.$Message.success('提交反馈成功')
            this.feedbackContent = ''
            this.getTheinspectionschedule()
            this.$refs.tabs.activeKey = this.currentTab
          }
        })
      } else {
        this.$Message.error('该机构没有创建指标')
      }
    },
    // 提交评论
    submitRevert () {
      if (this.revert === '') {
        this.$Message.error('请输入评论内容')
        return
      }
      if (this.themeId || this.feedbackId) {
        const data = {
          content: this.revert,
          themeId: this.themeId,
          replyType: 2,
          replyId: this.feedbackId
        }
        submitComments(data).then(res => {
          if (res.data.code === 10000) {
            this.modal = false
            this.revert = ''
            this.$Message.success('提交评论成功')
            this.getTheinspectionschedule()
            this.$refs.tabs.activeKey = this.currentTab
          }
        })
      } else {
        this.$Message.error('该机构没有创建指标')
      }
    },
    // 显示回复弹窗
    showModal (id) {
      this.feedbackId = id
      this.modal = true
    },
    // 监听回复弹窗关闭
    modaChange (e) {
      if (e === false) {
        this.revert = ''
      }
    },
    // 指标类型切换
    tabBar (item) {
      this.currentTab = item
      let tab = typeof item === 'string' ? JSON.parse(item) : item
      let tabList = []
      let startTime = ''
      let endTime = ''
      if (tab.indexTypeStatue === 0) {
        this.feedbackList = tab.indexBatchInstructionListVOList
        tabList = tab.batchTableVoList
        startTime = getStandardDate(tab.perStartTime, 'yearDate')
        endTime = getStandardDate(tab.perEndTime, 'monthDate')
        this.current = tab.flowStstus
        this.assessTime = startTime + '~' + endTime
        this.$store.state.quota.list = tabList
        this.$store.commit('setQuota', tabList)
        this.$store.commit('createColumn', this.tableOptions)
      } else {
        this.feedbackList = []
        this.assessTime = ''
        this.current = 0
        this.$store.state.quota.list = []
        this.$store.commit('setQuota', [])
        this.$store.commit('createColumn', {})
        this.$Message.error('该机构没有创建指标')
      }
    }
  }
}
</script>
