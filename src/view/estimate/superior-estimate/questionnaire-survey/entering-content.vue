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
/deep/.ivu-form-item-error-tip {
  white-space: nowrap;
}
/* 反馈内容 */
.content {
  background: #fff;
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
      .peoples {
        margin-top: 20px;
        .achievements {
          margin-bottom: 10px;
          .peoples-title {
            font-size: 18px;
            font-weight: bold;
            line-height: 18px;
            color: rgba(51, 51, 51, 1);
          }
          .peoples-question {
            margin: 28px 0 0 36px;
            // 问题
            .question {
              .question-text {
                span {
                  font-size:14px;
                  font-weight:bold;
                  line-height:18px;
                  color:rgba(51,51,51,1);
                }
              }
              .question-content {
                input {
                  width: 100%;
                  border: 0;
                  height: 34px;
                  line-height: 34px;
                  border-bottom: 1px solid rgba(102,102,102,1);
                  outline: none;
                }
              }
              .question-total-text {
                font-size: 14px;
                font-weight: 400;
                line-height: 34px;
                color: rgba(51,51,51,1);
                padding-top: 4px;
              }
              .question-total {
                .score-input {
                  width: 100%;
                  height: 34px;
                  line-height: 34px;
                  border: none;
                  border-bottom:1px solid rgba(102,102,102,1);
                  outline: none;
                  text-align: center;
                }
              }
            }
            // 答案选项
            .answer-content {
              margin-top: 22px;
              .answer-title {
                font-size:14px;
                font-weight:bold;
                color:rgba(51,51,51,1);
                margin-top: 4px;
              }
              .answer-input {
                input {
                  width: 100%;
                  height: 34px;
                  line-height: 34px;
                  border: none;
                  outline: none;
                  border-bottom:1px solid rgba(102,102,102,1);
                }
              }
              .answer-total {
                margin-left: 4px;
                .score-input {
                  width: 100%;
                  height: 34px;
                  line-height: 34px;
                  background:rgba(255,255,255,1);
                  border:1px solid rgba(204,204,204,1);
                  border-radius:5px;
                  outline: none;
                  text-align: center;
                }
              }
              .answer-total-text {
                margin-left: 4px;
                font-size: 14px;
                font-weight: 400;
                line-height: 33px;
                color: rgba(51,51,51,1);
                padding-top: 4px;
              }
              .answer-option {
                margin-bottom: 20px;
              }
              .option {
                font-size:14px;
                font-weight:bold;
                color:rgba(51,51,51,1);
                margin-top: 4px;
              }
              // 新增按钮
              .newly-increased {
                margin-top: 10px;
                span {
                  border: none;
                  background: none;
                  outline:0 none;
                  font-size:14px;
                  font-weight:400;
                  line-height:18px;
                  color:rgba(9,114,231,1);
                  cursor: pointer;
                }
              }
            }
          }
          // 新增问题按钮
          .new-question {
            margin-left: 36px;
            span {
              border: none;
              background: none;
              outline:0 none;
              font-size:14px;
              font-weight:400;
              line-height:18px;
              color:rgba(9,114,231,1);
              cursor: pointer;
            }
          }
        }
        // 提交按钮
        .add-btn {
          margin-top: 44px;
          text-align: center;
          button {
            width:382px;
            height:56px;
            background:rgba(9,114,231,1);
            border: none;
            border-radius:6px;
            font-size:17px;
            font-weight:500;
            line-height:41px;
            color:rgba(255,255,255,1);
            cursor: pointer;
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
            <Form class="peoples" ref='formValidateRef' :model='surveyViewObj'>
              <Row v-for="(item, index) in surveyViewObj.surveySubtitleEntityList" v-bind:key="index" class="achievements">
                <FormItem>
                  <Col span="24" class="peoples-title">
                    {{mapSequence[index]}}、{{item.title}}({{item.score}}分)
                  </Col>
                </FormItem>
                <!-- 内容 -->
                <FormItem v-for="(item1, index1) in item.questtionEntities" v-bind:key="index1" class="peoples-question">
                  <!-- 问题 -->
                  <Row class="question" :gutter="8" type="flex" justify="center">
                    <Col span="2" class="question-text">
                      <span>问题{{index1 + 1}}：</span>
                    </Col>
                    <Col span="18" class="question-content">
                      <FormItem :prop="'surveySubtitleEntityList[' + index + '].questtionEntities[' + index1 + '].title'" :rules="{required: true, message: '请输入问题内容', trigger: 'blur'}">
                        <input v-model="item1.title" placeholder="请输入问题内容" :maxlength="50" />
                      </FormItem>
                    </Col>
                    <Col span="1" class="question-total-text">
                      <span>总分</span>
                    </Col>
                    <Col span="2" class="question-total">
                      <FormItem :prop="'surveySubtitleEntityList[' + index + '].questtionEntities[' + index1 + '].totalScore'" :rules="{type: 'number', required: true, message: '请输入问题总分', trigger: 'blur'}">
                        <NumberInput :max=100 :point="2" class="score-input" v-model.number="item1.totalScore"></NumberInput>
                      </FormItem>
                    </Col>
                    <Col span="1" class="question-total-text">
                      <span>分</span>
                    </Col>
                  </Row>
                  <!-- 答案选项 -->
                  <Row class="answer-content">
                    <Col span="2" class="answer-title">
                      <span>回 答：</span>
                    </Col>
                    <Col span="16">
                      <!-- 回答选项 -->
                      <Row v-for="(item2, index2) in item1.quesList" class="answer-option" :key="index2">
                        <Col span="1" class="option">
                          <span>{{mapRealtionshipAnswerName[index2]}}</span>
                        </Col>
                        <Col span="14" class="answer-input">
                          <FormItem :prop="'surveySubtitleEntityList[' + index + '].questtionEntities[' + index1 + '].quesList[' + index2 + ']'" :rules="{required: true, message: '请输入选项内容', trigger: 'blur'}">
                            <input v-model="item1.quesList[index2]" placeholder="请输入选项内容" :maxlength="25" />
                          </FormItem>
                        </Col>
                        <Col span="2" class="answer-total">
                          <FormItem :prop="'surveySubtitleEntityList[' + index + '].questtionEntities[' + index1 + '].quesScoreList[' + index2 + ']'" :rules="{type: 'number', required: true, message: '请输入选项分数', trigger: 'blur'}">
                            <NumberInput :max=100 :point="2" class="score-input" v-model.number="item1.quesScoreList[index2]"></NumberInput>
                          </FormItem>
                        </Col>
                        <Col span="1" class="answer-total-text">
                          <span>分</span>
                        </Col>
                      </Row>
                      <Row class="newly-increased">
                        <span @click="answerAdd(index, index1)" v-if="item1.quesList.length < 5">新增选项</span>
                      </Row>
                    </Col>
                  </Row>
                </FormItem>
                <!-- 新增问题 -->
                <FormItem class="new-question">
                  <span @click="addIssue(index)">新增问题</span>
                </FormItem>
              </Row>
              <!-- 提交按钮 -->
              <FormItem class="add-btn">
                <Button type="primary" @click="quesSubmit">确 定</Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane :label="label" name="name2" class="tabs2">
            <!-- 反馈内容 -->
            <Row>
              <Input v-model="feedbackContent" show-word-limit type="textarea" class="feedback-input" :maxlength="1000"/>
            </Row>
            <Row>
              <Button class="add-feedback" @click="addFeedback">提交反馈</Button>
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
                    <span class="revert" @click="showModal(item.id)">回复</span>
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
import NumberInput from '@/common/numberInput/numberInput.vue'
import {
  getSurveyView,
  submitSurveyfeedbackSub,
  submitQuesttionSave,
  getSurveyfeedback
} from '@/api/estimate'
export default {
  components: {
    NumberInput
  },
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
      // 问卷调查表内容
      surveyViewObj: {},
      // 反馈列表
      feedbackList: [],
      // 回复弹窗开关
      modal: false,
      // 回复反馈
      revert: '',
      // 反馈列表id
      replyId: null,
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
  methods: {
    // 查看详情
    surveyView () {
      getSurveyView(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.surveyViewObj = res.data.data
        }
      })
    },
    // 新增问题
    addIssue (index) {
      this.surveyViewObj.surveySubtitleEntityList[index].questtionEntities.push({
        title: '',
        quesList: ['', '', ''],
        totalScore: '',
        quesScoreList: []
      })
    },
    // 新增选项
    answerAdd (number, num) {
      this.surveyViewObj.surveySubtitleEntityList[number].questtionEntities[num].quesList.push('')
    },
    // 提交
    quesSubmit () {
      this.$refs.formValidateRef.validate((valid) => {
        if (valid) {
          try {
            this.surveyViewObj.surveySubtitleEntityList.forEach(item => {
              let scoreArr = []
              item.questtionEntities.forEach(item1 => {
                scoreArr.push(item1.totalScore)
                item1.quesScoreList.forEach(item2 => {
                  if (item1.totalScore > item.score) {
                    // 问题总分数大于评价方向总分数
                    throw new Error('errorOne')
                  } else if (item2 > item1.totalScore) {
                    // 每个选项分数不能大于问题总分
                    throw new Error('errorTwo')
                  }
                })
              })
              if (this.arrSum(scoreArr) !== item.score) {
                throw new Error('errorThree')
              }
            })
            const obj = {
              surveyVO: this.surveyViewObj,
              optType: 2,
              surveyId: this.$route.query.id,
              types: 1
            }
            submitQuesttionSave(obj).then(res => {
              if (res.data.code === 10000) {
                this.surveyViewObj = {}
                this.$router.push({
                  path: 'superior_questionnaire_survey'
                })
                this.$Message.success('编辑问卷成功')
              }
            })
          } catch (e) {
            if (e.message === 'errorOne') {
              this.$Message.error('问题总分数必须小于评价方向总分数')
            } else if (e.message === 'errorTwo') {
              this.$Message.error('每个选项分数不能大于问题总分')
            } else if (e.message === 'errorThree') {
              this.$Message.error('每个方向的问题总分数要等于方向总分数')
            }
          }
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
    },
    // 数组求和方法
    arrSum (arr) {
      var sum = 0
      // arr.forEach(function (val, idx, arr) {
      //   sum += val
      // }, 0)
      arr.forEach(val => {
        sum += val
      })
      return sum
    }
  }
}
</script>
