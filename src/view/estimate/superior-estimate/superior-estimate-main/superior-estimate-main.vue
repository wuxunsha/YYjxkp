<style lang="less" scoped>
.content-box {
  height: 100%;
  background-image: url('~@/assets/images/estimate/estimate.png');
  background-position: center 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 50px 130px 0;
  .title {
    text-align: center;
    margin-bottom: 10px;
    h4 {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
  }
  .region {
    text-align: center;
    p {
      font-size: 18px;
      font-weight: 500;
      color: rgba(102,102,102,1);
    }
  }
  .steps-box {
    margin: 10px 0 46px;
    .Steps {
      position: relative;
      .steps-principal {
        width: 100%;
        height: 1px;
        background: rgba(187,187,187,1);
        margin-top: 7px;
      }
      .steps-principal-box {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        .steps-content  {
          flex: 1;
          text-align: center;
          color:linear-gradient(180deg,rgba(232,232,232,1) 0%,rgba(102,102,102,1) 100%);
          .steps-round {
            width: 15px;
            height: 15px;
            background: linear-gradient(180deg,rgba(232,232,232,1) 0%,rgba(102,102,102,1) 100%);
            border-radius: 50%;
            margin: auto;
            margin-bottom: 6px;
          }
          .steps-explain {
            i {
              margin-right: 10px;
              font-size: 12px;
            }
          }
          .bottom {
            margin-top: 10px;
            p {
              margin-top: 6px;
              font-size: 12px;
              font-weight: 500;
              color: rgba(9,114,231,1);
            }
          }
        }
        .round-active {
          color: #FF9B29;
          .steps-round {
            background: linear-gradient(180deg,rgba(255,197,132,1) 0%,rgba(255,155,41,1) 100%);
          }
        }
        .stocks-active {
          color: #0972E7;
          .steps-round {
            background: linear-gradient(180deg,rgba(94,173,255,1) 0%,rgba(9,114,231,1) 100%);
          }
        }
        .steps-center {
          left: 50%;
        }
        .steps-right {
          left: 80%;
        }
      }
    }
  }
}
</style>
<template>
  <div class="content-box">
    <Row class="title">
      <Col span="24">
        <h4>社会评价</h4>
      </Col>
    </Row>
    <Row class="region">
      <Col span="24">
        <p>{{orgName}}</p>
      </Col>
    </Row>
    <Row class="steps-box">
      <Row class='Steps'>
        <Col span="24">
          <Row class="steps-principal"></Row>
          <Row class="steps-principal-box">
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconchuangjianpushu-xianxing"></i>
                <span>创建模板</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="societyEvaluate" :disabled="authorityData.button_1 ? false : true">创建社会评价模板</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font icontianxie"></i>
                <span>内容填写</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="questionnaire" :disabled="authorityData.button_2 ? false : true">填写评价问题</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconqichuluru"></i>
                <span>采集与录入</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="evaluation" :disabled="authorityData.button_3 ? false : true">录入评价结果</Button>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  </div>
</template>

<script>
import {
  getSupAndSubPerm
} from '@/api/estimate'
export default {
  data () {
    return {
      // 当前机构名称
      orgName: '',
      // 权限判断数据
      authorityData: {}
    }
  },
  created () {
  },
  mounted () {
    this.getBtnSupAndSubPerm()
  },
  methods: {
    // 查询按钮操作权限
    getBtnSupAndSubPerm () {
      getSupAndSubPerm().then(res => {
        if (res.data.code === 10000) {
          this.authorityData = res.data.data.menu_1
          this.orgName = res.data.data.orgName
        }
      })
    },
    // 跳转社会评价页面
    societyEvaluate () {
      this.$router.push({
        path: 'superior_society_estimate_main'
      })
    },
    // 跳转问卷内容填写
    questionnaire () {
      this.$router.push({
        path: 'superior_questionnaire_survey'
      })
    },
    // 跳转评价收集与计分
    evaluation () {
      this.$router.push({
        path: 'superior_evaluation_questionnaire'
      })
    }
  }
}
</script>
