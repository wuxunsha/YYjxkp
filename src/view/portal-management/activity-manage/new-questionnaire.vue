<style lang="less">
.content {
  background: #fff;
  padding: 0 40px 40px;
  // 标题
  .title {
    margin-top: 25px;
    font-size:16px;
    font-weight:400;
    line-height:16px;
    color:rgba(51,51,51,1);
  }
  // 问卷调查内容
  .peoples {
    margin-top: 22px;
    // 主题
    .peoples-title {
      font-size: 16px;
      font-weight: bold;
      line-height: 34px;
      color: rgba(51,51,51,1);
      input {
        font-size: 16px;
        margin-left: 6px;
        width: 94%;
        height: 34px;
        line-height: 34px;
        border: none;
        border-bottom: 1px solid rgba(102,102,102,1);
        outline: none;
        color: #333;
      }
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
          input {
            margin-left: 6px;
            width: 96%;
            height: 34px;
            line-height: 34px;
            border: none;
            border-bottom: 1px solid rgba(102,102,102,1);
            outline: none;
          }
        }
      }
      // 答案选项
      .answer-content {
        margin: 22px 0 0 28px;
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
            font-size:14px;
            font-weight:400;
            line-height:18px;
            color:rgba(9,114,231,1);
            cursor: pointer;
          }
        }
        // 选择方式
        .select-type {
          margin-top: 10px;
          span {
            font-size: 16px;
            color: rgba(51,51,51,1);
          }
          .select-type-left {
            margin-right: 30px;
          }
        }
      }
    }
    // 新增问题按钮
    .new-question {
      margin: 20px  0 0 36px;
      span {
        font-size:14px;
        font-weight:400;
        line-height:18px;
        color:rgba(9,114,231,1);
        cursor: pointer;
      }
    }
  }
  // 问卷调查形式
  .survey-form {
    margin-top: 20px;
    .survey-title {
      span {
        font-size: 14px;
        font-weight: bold;
        line-height: 18px;
        color: rgba(51,51,51,1);
      }
    }
    .survey-radio {
      span {
        font-size:16px;
        color:rgba(51,51,51,1);
      }
      .survey-radio-left {
        margin-right: 30px;
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
</style>

<template>
  <div class="layout">
    <Layout>
      <Form class="content" ref='formValidateRef' :model='surveyViewObj'>
        <!-- 问卷调查内容 -->
        <FormItem>
          <Row class="title">
            <h4>正在创建问卷调查样卷，一次最多20题，包括选填内容与自定义内容；</h4>
          </Row>
        </FormItem>
        <FormItem>
          <Row class="peoples">
            <div class="achievements">
              <FormItem :prop="'title'" :rules="{required: true, message: '请输入问卷调查主题', trigger: 'blur'}">
                <!-- 主题 -->
                <Row>
                  <Col span="24" class="peoples-title">
                    <span>主题：</span>
                    <input placeholder="为此次问卷调查添加主题" :maxlength="50" v-model="surveyViewObj.title"/>
                  </Col>
                </Row>
              </FormItem>
              <!-- 内容 -->
              <FormItem class="peoples-question" v-for="(item, index) in surveyViewObj.list" :key="index">
                <!-- 问题 -->
                <Row class="question" :gutter="8" type="flex" justify="center">
                  <Col span="23" class="question-text">
                    <FormItem :prop="'list[' + index + '].title'" :rules="{required: true, message: '请输入计划调查的问题', trigger: 'blur'}">
                      <span>{{index + 1}}、</span>
                      <input placeholder="请输入计划调查的问题" :maxlength="50" v-model="item.title"/>
                    </FormItem>
                  </Col>
                  <Col span="1">
                    <i class="icon-font iconchacha" @click="delTitle(index)"></i>
                  </Col>
                </Row>
                <!-- 答案选项 -->
                <Row class="answer-content">
                  <Col span="16">
                    <!-- 回答选项 -->
                    <Row class="answer-option" v-for="(item1, index1) in item.str" :key="index1" >
                      <Col span="1" class="option">
                        <span>{{mapRealtionshipAnswerName[index1]}}</span>
                      </Col>
                      <Col span="18" class="answer-input">
                        <FormItem :prop="'list[' + index + '].str[' + index1 + ']'" :rules="{required: true, message: '请输入选项内容', trigger: 'blur'}">
                          <input placeholder="请输入选项内容" :maxlength="25" v-model="item.str[index1]"/>
                        </FormItem>
                      </Col>
                      <Col span="1">
                        <i class="icon-font iconchacha" @click="delAnswere(index, index1)"></i>
                      </Col>
                    </Row>
                    <Row class="newly-increased">
                      <span @click="answerAdd(index)" v-if="item.str.length < 5 && !item.customIssue">新增选项</span>
                    </Row>
                    <Row>
                      <RadioGroup v-model="item.flag" class="select-type">
                        <Radio :label='typeOne' class="select-type-left">
                          <span>单选</span>
                        </Radio>
                        <Radio :label='typeTwo'>
                          <span>多选</span>
                        </Radio>
                      </RadioGroup>
                    </Row>
                  </Col>
                </Row>
              </FormItem>
              <!-- 新增选题 -->
              <Row class="new-question">
                <Row>
                  <Col span="3">
                    <span @click="addIssue" v-if="surveyViewObj.list.length < 20">新增选题</span>
                  </Col>
                  <Col span="3">
                    <span @click="addCustomIssue" v-if="surveyViewObj.list.length < 20">新增自定义问题</span>
                  </Col>
                </Row>
              </Row>
            </div>
          </Row>
        </FormItem>
        <FormItem>
          <!-- 问卷调查形式 -->
          <Row class="survey-form">
            <Col span="3" class="survey-title">
              <span>问卷调查形式</span>
            </Col>
            <Col span="21" class="survey-radio">
              <RadioGroup v-model="surveyViewObj.realNameStatus">
                <Radio label="1" class="survey-radio-left">
                  <span>实名制</span>
                </Radio>
                <Radio label="0">
                  <span>非实名制</span>
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <!-- 提交按钮 -->
          <Row class="add-btn">
            <Button  type="primary" @click="quesSubmit">提 交</Button >
          </Row>
        </FormItem>
      </Form>
    </Layout>
  </div>
</template>

<script>
import {
  addPortalSurvey
} from '@/api/portal-management'
export default {
  data () {
    return {
      // 问卷内容
      surveyViewObj: {
        title: '',
        realNameStatus: '1',
        list: [
          {
            title: '',
            str: ['', '', ''],
            flag: 1,
            answerCode: '',
            arr: []
          }
        ]
      },
      // 选择类型
      typeOne: 1,
      typeTwo: 2,
      mapRealtionshipAnswerName: {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E'
      }
    }
  },

  created () {

  },

  computed: {},

  methods: {
    // 新增选题
    addIssue () {
      this.surveyViewObj.list.push({
        title: '',
        str: ['', '', ''],
        flag: 1,
        answerCode: '',
        arr: []
      })
    },
    // 删除选题
    delTitle (index) {
      this.surveyViewObj.list.splice(index, 1)
    },
    // 新增自定义问题
    addCustomIssue () {
      this.surveyViewObj.list.push({
        title: '',
        str: [''],
        customIssue: 1,
        flag: 1,
        answerCode: '',
        arr: []
      })
    },
    // 新增选项
    answerAdd (number, num) {
      this.surveyViewObj.list[number].str.push('')
    },
    // 删除选项
    delAnswere (index, index1) {
      this.surveyViewObj.list[index].str.splice(index1, 1)
    },
    // 提交新增问卷
    quesSubmit () {
      this.$refs.formValidateRef.validate((valid) => {
        if (valid) {
          addPortalSurvey(this.surveyViewObj).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success('新增问卷成功')
              this.$router.push({
                path: 'activity_manage', query: { name: 2 }
              })
            }
          })
        }
      })
    }
  }
}

</script>
