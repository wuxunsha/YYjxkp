<style lang='less' scoped>
li {
  list-style: none;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 16px;
  font-weight: 500;
  line-height: 57px;
  color: rgba(9, 114, 231, 1);
  padding: 0 50px;
}
/deep/.ivu-tabs-nav-wrap {
  background: #EFF7FF;
}
/deep/.ivu-tabs-nav-container {
  background: #fff;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #FF9B29;
}
/deep/.ivu-tabs-ink-bar {
  background-color: #FF9B29;
}
/deep/textarea.ivu-input {
  min-height: 200px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
/deep/.ivu-input-word-count {
  background: none;
}
/deep/.ivu-modal-footer {
  border-top: none;
}
.from-content {
  .content {
    background: #fff;
    margin-top: .625rem;
    padding: 1.25rem 0;
    width: 100%;
    // 考核时间
    .assess-time {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      color:rgba(102,102,102,1);
    }
    // 当前单位
    .current-unit {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      color:rgba(187,187,187,1);
      margin-bottom: 10px;
    }
    // 步骤条
    .steps {
      padding: 0 2.125rem 10px;
    }
    // tabs切换栏
    .tabs {
      padding: 0 2.125rem;
      .tabs1 {
        .submit-box {
          margin: 18px 0;
          .submit-btn {
            background: #0972E7;
            padding: 0 30px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
      .tabs2 {
        .feedback-input {
          width: 100%;
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
            i {
              font-size: 26px;
              color: #0081FF;
            }
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
                  i {
                    vertical-align: initial;
                    margin-right: 4px;
                  }
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
      <Layout>
        <Content class='from-content'>
          <!-- 表名 -->
          <Row class="content">
            <Row>
              <Col span="24" class="assess-time">
                <h4>考核时间段：{{assessTime}}</h4>
              </Col>
            </Row>
            <!-- <Row>
              <Col span="24" class="current-unit">
                <p>当前单位：{{unit}}</p>
              </Col>
            </Row> -->
            <!-- 截止时间倒计时 -->
            <Countdown :startTime="startTime" :endTime="endTime"></Countdown>
              <!-- 步骤条 -->
            <Row class="steps">
              <article-steps :currentId="2" :stepsList="stepsList"></article-steps>
            </Row>
            <Tabs :animated="false" class="tabs">
              <TabPane label="考核指标" class="tabs1">
                <!-- 提交考核 -->
                <Row class="submit-box">
                  <Col span="24">
                    <Button type="primary" icon="ios-search" class="submit-btn" @click="submit" v-if="btnShow(112101103102)">提交给被考核单位</Button>
                  </Col>
                </Row>
                <!-- 表格数据 -->
                <Row>
                  <Col span="24">
                    <DynamicTable :option="tableOptions" />
                  </Col>
                </Row>
              </TabPane>
              <TabPane label="反馈与评论" class="tabs2">
                <!-- 反馈内容 -->
                <Row>
                  <Input v-model="feedbackContent" show-word-limit type="textarea" class="feedback-input" :maxlength="1000"/>
                </Row>
                <Row>
                  <Button class="add-feedback" @click="submitFeedback" v-if="btnShow(112101101)">提交反馈</Button>
                </Row>
                <!-- 已反馈内容 -->
                <Row class="footer">
                  <Row class="already-feedback">
                    <Icon class="icon-font iconfankuixinxi" />已反馈内容
                  </Row>
                  <ul class="already-feedback-content">
                    <li v-for="item in feedbackList" :key="item.id">
                      <p>
                        <span>
                          <span>{{item.instruOrgName}}</span>
                          <span>{{item.createName}}</span>
                          <span>请问父亲</span>
                        </span>
                        <span class="feedback-time">
                          <Icon class="icon-font iconshijian1" />{{item.createTime | dateFormat}}
                        </span>
                      </p>
                      <p>
                        <span>{{item.content}}</span>
                        <span class="revert" @click="showModal(item.id)" v-if="btnShow(112101101)">回复</span>
                      </p>
                      <div>
                        <div v-for="item1 in item.children" :key="item1.id">
                          <span>{{item1.instruOrgName}}</span>
                          <span>{{item1.content}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Row>
              </TabPane>
            </Tabs>
          </Row>
        </Content>
      </Layout>

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
  getloginperfomancebatchnodesinfoup,
  dataentryinstruction,
  submitComments
} from '@/api/performance-appraisal'
import DynamicTable from '../../../quota/component/dynamic-table'
import Countdown from '../../component/count-time/count-time'
import { getStandardDate, getTimeStamp } from '@/libs/tools'
export default {
  components: {
    DynamicTable,
    Countdown
  },
  data () {
    return {
      themeId: 0,
      // 数采集机构id
      gatherOrgId: '',
      // 采集截止倒计时开始时间
      startTime: 3577604403747,
      // 采集截止倒计时结束时间
      endTime: 4577604403747,
      // 步骤条所需要的数据
      stepsList: [
        {
          explain: '发起',
          icon: 'icon-font iconfaqikaohe'
        },
        {
          explain: '数据采集',
          icon: 'icon-font iconshujucaiji'
        },
        {
          explain: '考核单位确认',
          icon: 'icon-font iconqueren'
        },
        {
          explain: '汇总与修改',
          icon: 'icon-font iconxiugai1'
        },
        {
          explain: '结果发布',
          icon: 'icon-font iconfabu1'
        }
      ],
      // 表格配置
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
          busiValueStrAndbusiValue: '完成情况'
          // targetType: '计分方式'
        },
        // 判断指标是否有内容显示
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 自定义插槽内容
        colSlot: [
          // {
          //   key: 'targetType',
          //   render: (h, params) => {
          //     // let _status = params.row.targetType
          //     let _lalbel = ''
          //     // switch (_status) {
          //     //   case 1:
          //     //     _lalbel = '量化'
          //     //     break
          //     //   case 2:
          //     //     _lalbel = '非量化'
          //     //     break
          //     //   default:
          //     //     _lalbel = '-'
          //     //     break
          //     // }
          //     return h('span', _lalbel)
          //   }
          // },
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
          cols: ['targetValue', 'perDesc']
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          // colIndex: [0, 1, 2, 3, 4],
          noMergeCellName: ['score', 'perDesc', 'targetValue', 'busiValueStrAndbusiValue']
        },
        editIndex: -1,
        // 数据
        data: []
      },
      // 考核时间
      assessTime: '',
      // 当前单位
      // unit: '',
      perBatchCode: null,
      // 反馈与评论数据
      feedbackList: [],
      // 反馈内容
      feedbackContent: '',
      // 反馈id
      feedbackId: null,
      // 回复弹窗开关
      modal: false,
      // 回复内容
      revert: ''
    }
  },
  created () {
    // 获取当前登录用户上级节点详情
    this.getloginperfomancebatchnodesinfoupList()
    // 获取当前时间
    this.isYear()
  },
  methods: {
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 编辑
        let detailIcon = h('Icon', {
          props: {
            custom: 'icon-font iconziyuan',
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
            content: '数据录入',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [this.btnShow(112101103101) && detailTooltip])
      }
    },
    detailData (params) {
      this.$router.push({
        path: './superior_data_entering_page',
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
          step: 2
        }
      })
    },
    // 获取当前时间
    isYear () {
      const dt = new Date()
      this.startTime = getTimeStamp(dt)
    },
    // 获取当前登录用户上级节点详情
    getloginperfomancebatchnodesinfoupList () {
      getloginperfomancebatchnodesinfoup(2).then(res => {
        if (res.data.code === 10000) {
          let tableList = []
          let tabData = []
          let startTime = ''
          let endTime = ''
          tableList = res.data.data
          tableList.forEach(item => {
            if (item.indexTypeStatue === 0) {
              item.batchTableVoList.forEach(item => {
                if (item.targetType === 1) {
                  item.busiValueStrAndbusiValue = Number(item.busiValueStrAndbusiValue)
                }
              })
              tabData = item.batchTableVoList
              this.endTime = item.dataCEndTime
              this.themeId = item.id
              this.feedbackList = item.indexBatchInstructionListVOList
              startTime = getStandardDate(item.perStartTime, 'yearDate')
              endTime = getStandardDate(item.perEndTime, 'monthDate')
              this.assessTime = startTime + '~' + endTime
              // this.unit = tabData[0].assessmentOrgName
              this.$store.state.quota.list = tabData
              this.$store.commit('setQuota', tabData)
              this.$store.commit('createColumn', this.tableOptions)
            }
          })
        }
      })
    },
    // 点击提交给被考核单位按钮
    submit () {
      this.getDataCollectTask()
    },
    // 获取数据采集id
    getDataCollectTask () {
      const data = {
        themeId: this.themeId
      }
      dataentryinstruction(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交成功')
          this.$router.push({
            path: './superior_backlog_main_page'
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
            this.getloginperfomancebatchnodesinfoupList()
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
    // 提交评论
    submitRevert () {
      if (this.revert === '') {
        this.$Message.error('请输入评论内容')
        return
      }
      if (this.themeId || this.feedbackId) {
        const data = {
          themeId: this.themeId,
          replyType: 2,
          content: this.revert,
          replyId: this.feedbackId
        }
        submitComments(data).then(res => {
          if (res.data.code === 10000) {
            this.modal = false
            this.$Message.success('提交回复成功')
            this.getloginperfomancebatchnodesinfoupList()
          }
        })
      } else {
        this.$Message.error('该机构没有创建指标')
      }
    }
  }
}
</script>
