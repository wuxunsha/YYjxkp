<style lang="less" scoped>
.steps-box {
  background: #FFF;
  margin: 10px 0 46px;
  .main-box {
    background: #FFF;
    .Steps {
      position: relative;
      .steps-principal {
        width: 100%;
        height: 1px;
        background: linear-gradient(180deg,rgba(255,155,41,1) 0%,rgba(255,206,154,1) 100%);
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
          color:rgba(187,187,187,1);
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
  <div class="steps-box">
    <Layout>
      <div class="main-box">
        <Row>
          <Row class='Steps'>
            <Col span="24">
              <Row class="steps-principal"></Row>
              <Row class="steps-principal-box">
                <div v-for="(item, index) in stepsList" :key="index" :class="currentId === index + 1 ? 'steps-content round-active' : currentId > index + 1 ? 'steps-content stocks-active' : 'steps-content'">
                  <div class="steps-round"></div>
                  <div class="steps-explain">
                    <i :class="item.icon"></i>
                    <span>{{item.explain}}</span>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
export default {
  props: {
    currentId: Number,
    stepsList: Array
  },
  data () {
    return {

    }
  },

  created () {

  },

  computed: {

  },

  methods: {

  }
}

</script>
