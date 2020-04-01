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
      font-size: 14px;
      font-weight: bold;
      line-height: 28px;
      color: rgba(51,51,51,1);
      input {
        margin-left: 6px;
        width: 94%;
        border: none;
        border-bottom: 1px solid rgba(102,102,102,1);
        outline: none;
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
          button {
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
      margin: 20px  0 0 36px;
      button {
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
      input {
        margin-left: 10px;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(102,102,102,1);
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
      <Content class="content">
        <!-- 问卷调查内容 -->
        <Row class="peoples">
          <div class="achievements">
            <!-- 主题 -->
            <Row>
              <Col span="24" class="peoples-title">
                <span>主题：{{surveyViewObj.title}}</span>
              </Col>
            </Row>
            <!-- 内容 -->
            <div class="peoples-question" v-for="(item, index) in surveyViewObj.list" :key="index">
              <!-- 问题 -->
              <Row class="question" :gutter="8" type="flex" justify="center">
                <Col span="23" class="question-text">
                  <span>{{index + 1}}、{{item.title}}</span>
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
                      <span>{{item.str[index1]}}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
import {
  findPortalSurvey
} from '@/api/portal-management'
export default {
  data () {
    return {
      // 问卷内容
      surveyViewObj: {},
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
    // 查询问卷
    this.getFindPortalSurvey()
  },

  computed: {},

  methods: {
    // 查询问卷
    getFindPortalSurvey () {
      findPortalSurvey(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.surveyViewObj = res.data.data
        }
      })
    }
  }
}
</script>
