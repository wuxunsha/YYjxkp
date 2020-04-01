<style lang="less" scoped>
li {
  list-style: none;
}
/deep/.ivu-tabs-nav-scroll {
  background: #EFF7FF;
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
/deep/.ivu-badge-count-alone {
  top: -10px;
  left: 10px;
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
/* 反馈内容 */
.content {
  background: #fff;
  padding-bottom: 40px;
  .title {
    margin-top: 25px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 18px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .total {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(102, 102, 102, 1);
    text-align: center;
  }
  .tabs {
    margin: 20px 36px;
    .tabs1 {
      .survey-type {
        margin-top: 10px;
        padding-left: 38px;
        font-size: 16px;
        line-height: 18px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
      .list {
        padding: 0 50px;
        .issue {
          font-size:13px;
          font-weight:400;
          line-height:18px;
          color:rgba(102,102,102,1);
          >span:nth-child(1) {
            margin-right: 20px;
          }
        }
        .option {
          padding: 6px 0 0 60px;
          span {
            font-size:13px;
            font-weight:400;
            line-height:18px;
            color:rgba(102,102,102,1);
          }
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
              min-height: 30px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              .revert {
                float: right;
                font-size: 16px;
                min-height: 30px;
                font-weight: 500;
                color: rgba(9, 114, 231, 1);
                cursor: pointer;
              }
            }
            p:nth-child(1) {
              font-size: 14px;
              min-height: 30px;
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
                min-height: 30px;
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
      <!-- 反馈内容 -->
      <Content class="content">
        <Row class="title">
          <h4>{{surveyViewObj.title}}</h4>
        </Row>
        <Row class="total">
          <p>共计：{{surveyViewObj.score ? surveyViewObj.score : '0'}}分</p>
        </Row>
        <Tabs class="tabs" value="name1">
          <TabPane label="调查方向" name="name1" class="tabs1">
            <div v-for="(item, index) in surveyViewObj.surveySubtitleEntityList" v-bind:key="item.id">
              <Row class="survey-type">
                <span>{{mapSequence[index]}}、</span>
                <span>{{item.title}}</span>
                <span>({{item.score}}分)</span>
              </Row>
              <List :split="false" class="list">
                <ListItem v-for="(item1, index1) in item.questtionEntities" v-bind:key="item1.id">
                  <Row>
                    <Row class="issue">
                      <span>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</span>
                      <span>{{index1 + 1}}、</span>
                      <span>{{item1.title}}</span>
                      <span>（{{item1.totalScore ? item1.totalScore : '0'}}分）</span>
                    </Row>
                    <Row class="option" v-for="(item2, index2) in item1.quesList" v-bind:key="item2.id">
                      <span>{{mapRealtionshipAnswerName[index2]}}.{{item2}}</span>
                    </Row>
                  </Row>
                </ListItem>
              </List>
            </div>
          </TabPane>
          <TabPane :label="label" name="name2" class="tabs2">
            <!-- 反馈内容 -->
            <Row>
              <Input v-model="feedbackContent" show-word-limit type="textarea" class="feedback-input" :maxlength="1000"/>
            </Row>
            <Row>
              <Button class="add-feedback" @click="addFeedback" v-if="btnShow(116102101108)">提交反馈</Button>
            </Row>

            <!-- 已反馈内容 -->
            <Row class="footer">
              <Row class="already-feedback">
                <Icon class="icon-font iconfankuixinxi" />已反馈内容
              </Row>
              <ul class="already-feedback-content">
                <li v-for="item in feedbackList" v-bind:key="item.id">
                  <p>
                    <span>
                      <span>{{item.userName}}</span>
                      <span>{{item.position}}</span>
                      <span>{{item.mobPhone}}</span>
                    </span>
                    <span class="feedback-time">
                      <Icon class="icon-font iconshijian1" />{{item.createTime | dateFormat}}
                    </span>
                  </p>
                  <p>
                    <span>{{item.content}}</span>
                    <span class="revert" @click="showModal(item.id)" v-if="btnShow(116102101108)">回复</span>
                  </p>
                  <div>
                    <div v-for="item1 in item.childList" v-bind:key="item1.id">
                      <span>{{item1.createName}}:</span>
                      <span>{{item1.content}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </Row>
          </TabPane>
        </Tabs>
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
  getSurveyView,
  submitSurveyfeedbackSub,
  getSurveyfeedback
} from '@/api/estimate'
export default {
  data () {
    return {
      label: h => {
        return h('div', [
          h('span', '反馈与批示'),
          h('Badge', {
            props: {
              count: this.unreadNum
            }
          })
        ])
      },
      // 未读消息数量
      unreadNum: null,
      // 反馈内容
      feedbackContent: '',
      // 调查问卷详情
      surveyViewObj: {},
      // 反馈列表
      feedbackList: [],
      // 回复弹窗开关
      modal: false,
      // 回复反馈
      revert: '',
      // 反馈列表id
      replyId: null,
      // 序号
      mapRealtionshipAnswerName: {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E'
      },
      // 方向映射
      mapSequence: {
        0: '一',
        1: '二',
        2: '三',
        3: '四',
        4: '五',
        5: '六',
        6: '七',
        7: '八',
        8: '九',
        9: '十',
        10: '十一',
        11: '十二',
        12: '十三',
        13: '十四',
        14: '十五',
        15: '十六',
        16: '十七',
        17: '十八',
        18: '十九',
        19: '二十'
      }
    }
  },

  created () {
    // 查看详情
    this.surveyView()
    // 获取反馈列表
    this.getFeedbackList()
  },

  computed: {},

  methods: {
    // 查看详情
    surveyView () {
      getSurveyView(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.surveyViewObj = res.data.data
        } else {
          this.$Message.error('查询失败')
        }
      })
    },
    // 提交反馈
    addFeedback () {
      const data = {
        content: this.feedbackContent,
        replyType: 1,
        themeId: this.$route.query.id,
        types: 1
      }
      submitSurveyfeedbackSub(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交反馈成功')
          this.feedbackContent = ''
          this.getFeedbackList()
        }
      })
    },
    // 获取反馈列表
    getFeedbackList () {
      getSurveyfeedback(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.feedbackList = res.data.data.list
          if (res.data.data.noReadNum > 0) {
            this.unreadNum = res.data.data.noReadNum
          }
        }
      })
    },
    // 显示回复弹窗
    showModal (id) {
      this.modal = true
      this.replyId = id
    },
    // 提交回复
    submitRevert () {
      const data = {
        content: this.revert,
        replyType: 2,
        themeId: this.$route.query.id,
        replyId: this.replyId,
        types: 1
      }
      submitSurveyfeedbackSub(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交回复成功')
          this.replyId = null
          this.modal = false
          this.revert = ''
          this.getFeedbackList()
        }
      })
    },
    // 监听回复弹窗关闭
    modaChange (e) {
      if (e === false) {
        this.revert = ''
      }
    }
  }
}
</script>
