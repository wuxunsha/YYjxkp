<style lang='less' scoped>
/deep/textarea.ivu-input {
  min-height: 100px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
/deep/.ivu-input {
  border: 1px solid #5EADFF;
  border-radius: 8px;
}
/deep/.my-number-input {
  width: 100%;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
  padding: 18px 0 18px 6px;
  outline: none;
}
.from-content {
  .content {
    background: #fff;
    margin-top: .625rem;
    padding: 1.25rem 0;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51,51,51,1);
      text-align: center;
    }
    .indicate {
      margin: 15px 0 20px;
      padding: 0 3.125rem;
      width: 100%;
      height: 58px;
      .indicate-box {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 0 14px;
        background: rgba(202,228,255,1);
        >span {
          flex: 1;
          line-height: 58px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(51,51,51,1);
          text-align: center;
        }
      }
    }
    // 数据录入内容
    .data-content {
      border-bottom: 1px solid #F1F2F7;
      .data-content-box {
        padding: 24px 3.125rem;
        .area {
          font-size: 18px;
          font-weight: bold;
          line-height: 16px;
          color: rgba(51,51,51,1);
        }
        .target-task {
          margin-top: 8px;
          .target-task-title {
            font-size: 14px;
            color: #0972E7;
          }
          .target-task-content {
            font-size: 14px;
            color: #666;
          }
        }
        .accomplish-case {
          margin-top: 8px;
          width: 100%;
          height: 60px;
          background: #F1F2F7;
          padding: 6px 18px;
          p {
            font-size: 14px;
            font-weight: 500;
            color: rgba(102,102,102,1);
          }
          .practical-accomplish-case {
            color:rgba(255,155,41,1);
          }
        }
        .btn-box {
          margin-top: 8px;
          .accomplish-btn {
            margin-right: 20px;
          }
          .edit-btn,
          .accomplish-btn {
            width: 20%;
            height: 34px;
            background: #0972E7;
            font-size: 16px;
            font-weight: 500;
            color: rgba(255,255,255,1);
          }
          .turnover-time {
            text-align: right;
            line-height: 34px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(204,204,204,1);
          }
        }
        .import-box {
          margin-top: 10px;
          .note {
            margin-top: 6px;
          }
        }
      }
    }
    // 保存按钮
    .save-box {
      margin-top: 30px;
      text-align: center;
      .save-btn {
        width: 40%;
        height: 56px;
        font-size: 18px;
        font-weight: 500;
        background: #0972E7;
        color: rgba(255,255,255,1);
      }
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
            <Col span="24" class="title">
              <h4>数据录入</h4>
            </Col>
          </Row>
          <div class="code-row-bg indicate">
            <div class="indicate-box">
              <span v-if="alreadyData.indexOneName">
                <span>一级指标：{{alreadyData.indexOneName}}</span>
              </span>
              <span v-if="alreadyData.indexTwoName">
                <span>二级指标：{{alreadyData.indexTwoName}}</span>
              </span>
              <span v-if="alreadyData.indexThreeName">
                <span>三级指标：{{alreadyData.indexThreeName}}</span>
              </span>
              <span v-if="alreadyData.indexFourName">
                <span>四级指标：{{alreadyData.indexFourName}}</span>
              </span>
              <span v-if="alreadyData.indexFiveName">
                <span>五级指标：{{alreadyData.indexFiveName}}</span>
              </span>
                <span>
                <span>考核要点：{{alreadyData.perDesc}}</span>
              </span>
            </div>
          </div>
          <!-- 数据录入内容 -->
          <div class="data-content">
            <Row class="data-content-box">
              <Col class="area">
                <div>{{alreadyData.assessmentOrgName}}</div>
              </Col>
              <Col class="target-task">
                <div>
                  <span class="target-task-title">目标任务：</span>
                  <span class="target-task-content">{{alreadyData.targetValue}}</span>
                </div>
              </Col>
              <Col class="import-box">
                <Row class="data-input" v-if="Number(alreadyData.targetType) === 2">
                  <Col>
                    <Input v-model="alreadyData.busiValueStrAndbusiValue" maxlength="500" show-word-limit type="textarea" placeholder="请填写采集到的数据......" />
                  </Col>
                </Row>
                <Row class="data-input" v-else>
                  <Col>
                    <NumberInput :max=9999999999999 :point="2" v-model="alreadyData.busiValueStrAndbusiValue" class="score-input" placeholder="请填写采集到的数据"></NumberInput>
                  </Col>
                </Row>
                <!-- <Row class="note">
                  <Col>
                    <Input v-model="busiDesc" placeholder="添加注解"/>
                  </Col>
                </Row> -->
              </Col>
            </Row>
          </div>
          <Row class="save-box">
            <Col span="24">
              <Button type="primary" class="save-btn" @click="saveData">保 存</Button>
            </Col>
          </Row>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
import NumberInput from '@/common/numberInput/numberInput.vue'
import {
  dataCollectiondataentry
} from '@/api/performance-appraisal'
export default {
  components: {
    NumberInput
  },
  data () {
    return {
      // 要点数据
      alreadyData: {
        busiValueStrAndbusiValue: null,
        indexOneName: '',
        indexTwoName: '',
        indexThreeName: '',
        indexFourName: '',
        indexFiveName: '',
        perDesc: '',
        assessmentOrgName: '',
        busiId: 0,
        targetType: 0
      },
      // 注解
      busiDesc: '',
      step: 0
    }
  },
  created () {
    // 获取考核已有数据
    this.getGatherData()
  },
  computed: {
  },
  methods: {
    // 获取考核已有数据
    getGatherData () {
      let data = this.$route.query.data
      let oneIndex = this.$route.query.oneIndex
      let twoIndex = this.$route.query.twoIndex
      let threeIndex = this.$route.query.threeIndex
      let fourIndex = this.$route.query.fourIndex
      let fiveIndex = this.$route.query.fiveIndex
      let perDesc = this.$route.query.perDesc
      let orgName = this.$route.query.orgName
      let targetType = this.$route.query.targetType
      let busiId = this.$route.query.busiId
      let step = this.$route.query.step
      this.step = step
      if (oneIndex) {
        this.alreadyData.indexOneName = oneIndex
      }
      if (twoIndex) {
        this.alreadyData.indexTwoName = twoIndex
      }
      if (threeIndex) {
        this.alreadyData.indexThreeName = threeIndex
      }
      if (fourIndex) {
        this.alreadyData.indexFourName = fourIndex
      }
      if (fiveIndex) {
        this.alreadyData.indexFiveName = fiveIndex
      }
      if (perDesc) {
        this.alreadyData.perDesc = perDesc
      }
      if (orgName) {
        this.alreadyData.assessmentOrgName = orgName
      }
      if (busiId) {
        this.alreadyData.busiId = busiId
      }
      if (targetType) {
        this.alreadyData.targetType = targetType
      }
      if (data && Number(targetType) === 1) {
        this.alreadyData.busiValueStrAndbusiValue = Number(data)
      } else if (data && Number(targetType) === 2) {
        this.alreadyData.busiValueStrAndbusiValue = data
      } else {
        this.alreadyData.busiValueStrAndbusiValue = ''
      }
    },
    // 点击保存按钮
    saveData () {
      // 判断指标类型
      if (this.alreadyData.targetType === 1) {
        const data = {
          id: this.alreadyData.busiId,
          busiValue: Number(this.alreadyData.busiValueStrAndbusiValue),
          busiDesc: this.busiDesc
        }
        this.saveDataCollect(data)
      } else if (this.alreadyData.targetType === 2) {
        const data = {
          id: this.alreadyData.busiId,
          busiValueStr: this.alreadyData.busiValueStrAndbusiValue,
          busiDesc: this.busiDesc
        }
        this.saveDataCollect(data)
      }
    },
    // 保存录入数据
    saveDataCollect (data) {
      dataCollectiondataentry(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('数据录入(修改)成功')
          setTimeout(() => {
            if (this.step === 2) {
              this.$router.push({
                path: '/superior_data_collection_page'
              })
            } else if (this.step === 4) {
              this.$router.push({
                path: '/summary_comments'
              })
            } else if (this.step === 5) {
              this.$router.push({
                path: '/results_release'
              })
            }
          }, 1000)
        }
      })
    }
  }
}
</script>
