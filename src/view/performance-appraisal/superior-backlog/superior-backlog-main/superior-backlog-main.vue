<style lang="less" scoped>
.content-box {
  height: 100%;
  background-image: url('~@/assets/images/performance-appraisal/performance-appraisal.png');
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
        <h4>绩效考核流程</h4>
      </Col>
    </Row>
    <Row class="region">
      <Col span="24">
        <p>{{determineData.indexCreateOrgName}}</p>
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
                <i class="icon-font iconfaqikaohe"></i>
                <span>发起</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="everydayIndexParticulars" :disabled="determineData.oneNodeStatue ? false : true">日常考核</Button>
              </div>
               <div class="bottom">
                <Button type="primary" @click="yearIndexParticulars" :disabled="determineData.oneNodeStatue ? false : true">年度考核</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconshujucaiji"></i>
                <span>数据采集</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="collection" :disabled="determineData.twoNodeStatue ? false : true">录入数据</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconqueren"></i>
                <span>考核单位确认</span>
              </div>
              <div class="bottom">
                <Button type="primary" :disabled="determineData.threeNodeStatue ? false : true" @click="goDataCheckFeedback">绩效结果确认</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconxiugai1"></i>
                <span>意见汇总</span>
              </div>
              <div class="bottom">
                <Button type="primary" :disabled="determineData.fourNodeStatue ? false : true" @click="goSummaryComments">汇总与修改</Button>
              </div>
            </div>
            <div class="steps-content">
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="icon-font iconfabu1"></i>
                <span>结果发布</span>
              </div>
              <div class="bottom">
                <Button type="primary" :disabled="determineData.fiveNodeStatue ? false : true" @click="goReultRelease">发布最终结果</Button>
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
  getloginperfomancebatchnodesstatueup
} from '@/api/performance-appraisal'
export default {
  data () {
    return {
      // 按钮权限判断数据
      determineData: {}
    }
  },
  created () {
    // 获取当前登录用户上级绩效考核每一个节点是否有操作权限
    this.getloginperfomancebatchnodesstatueupData()
  },
  mounted () {
  },
  methods: {
    // 获取当前登录用户上级绩效考核每一个节点是否有操作权限
    getloginperfomancebatchnodesstatueupData () {
      getloginperfomancebatchnodesstatueup().then(res => {
        if (res.data.code === 10000) {
          this.determineData = res.data.data
        }
      })
    },
    // 跳转日常指标详情页
    everydayIndexParticulars () {
      this.$router.push({
        path: 'superior_everyday_index_page'
      })
    },
    // 跳转年度指标详情页
    yearIndexParticulars () {
      this.$router.push({
        path: 'superior_year_index_page'
      })
    },
    // 跳转数据采集页
    collection () {
      this.$router.push({
        path: 'superior_data_collection_page'
      })
    },
    // 跳转到数据采集与反馈
    goDataCheckFeedback () {
      this.$router.push({
        path: 'city_evelopment'
      })
    },
    //  跳转到意见汇总
    goSummaryComments () {
      this.$router.push({
        path: 'summary_comments'
      })
    },
    // 跳转到结果发布
    goReultRelease () {
      this.$router.push({
        path: 'results_release'
      })
    }
  }
}
</script>
