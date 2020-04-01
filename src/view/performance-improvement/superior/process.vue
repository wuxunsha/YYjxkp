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
    margin-top: 10%;
    display: inline-block;
    width: 100%;
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
        <h4>绩效改进</h4>
      </Col>
    </Row>
    <Row class="region">
      <Col span="24">
        <p>益阳市</p>
      </Col>
    </Row>
    <Row class="steps-box">
      <Row class='Steps'>
        <Col span="24">
          <Row class="steps-principal"></Row>
          <Row class="steps-principal-box">
            <div class="steps-content"
              v-for="(item, key) in flowList"
              :key="key"
              >
              <div class="steps-round"></div>
              <div class="steps-explain">
                <i class="ivu-icon ivu-icon-ios-albums"></i>
                <span>{{ item.point }}</span>
              </div>
              <div class="bottom">
                <Button type="primary" @click="routerTo(item)" :disabled="item.power ? false : true">{{ item.btnName }}</Button>
                <p v-if="!item.power">无操作权限</p>
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
} from '@/api/improvement'
export default {
  data () {
    return {
      flowList: [
        {
          point: '创建模板',
          btnName: '创建改进模板',
          power: false,
          path: '/performance_improvement/superior/improvement_org/disqualified'
        },
        {
          point: '发起',
          btnName: '提交模板',
          power: false,
          path: '/performance_improvement/superior/improvement_template/list',
          stepindex: 2
        },
        {
          point: '改进指标确定',
          btnName: '确定改进内容',
          power: false,
          path: '/performance_improvement/superior/improvement_doc/notice_list'
        },
        {
          point: '改进方案回复',
          btnName: '指标整改',
          power: false,
          path: '/performance_improvement/superior/improvement_details/notice_list'
        },
        {
          point: '验收',
          btnName: '结果验收',
          power: false,
          path: '/performance_improvement/superior/improvement_template/list',
          stepindex: 5
        }
      ],
      powerList: []
    }
  },
  created () {
    this.queryList()
  },
  watch: {
    $route (to, from) {
      console.log(to.name)
      this.setPower(to.name)
    }
  },
  methods: {
    setPower (name) {
      if (name === 'superior_internal_page') {
        this.flowList[0].power = this.powerList.menu_2.button_1
        this.flowList[1].power = this.powerList.menu_2.button_1
        this.flowList[2].power = this.powerList.menu_2.button_2
        this.flowList[3].power = this.powerList.menu_2.button_3
        this.flowList[4].power = this.powerList.menu_2.button_4
      } else {
        this.flowList[0].power = this.powerList.menu_1.button_1
        this.flowList[1].power = this.powerList.menu_1.button_1
        this.flowList[2].power = this.powerList.menu_1.button_2
        this.flowList[3].power = this.powerList.menu_1.button_3
        this.flowList[4].power = this.powerList.menu_1.button_4
      }
    },
    // 查询按钮操作权限
    queryList () {
      console.log('绩效改进-上级')
      getSupAndSubPerm().then(res => {
        if (res.data.code === 10000) {
          this.powerList = res.data.data
          this.setPower(this.$route.name)
          console.log('slkfskd', this.$route)
        }
      })
    },
    routerTo (item) {
      console.log('current point:', item)
      let stepindex = item.stepindex ? { stepindex: item.stepindex } : {}
      let _query = {
        typename: this.$route.name === 'superior_internal_page' ? 'internal' : 'superior',
        ...stepindex
      }
      this.$router.push({ path: item.path, query: _query })
    }
  }
}
</script>
