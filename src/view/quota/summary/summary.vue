<style lang="less" scoped>
.pool-container {
  height: 100%;
  background-color: #fff;
  background-image: url('~@/assets/images/quota/new_quota_bg.png');
  background-position: center 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 30px 20px 0;

  .quota-item {
    // border-bottom: 1px solid #e9eaec;
    padding-bottom: 20px;
    .title {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    .cus-btn {
      margin-left: 20px;
    }
  }
}
</style>
<template>
  <div class="pool-container">
    <Row class="quota-item">
      <Col class="title"><h3>今年指标</h3></Col>
      <Col>
        <Button type="primary" class="cus-btn" @click="goToRouter(thisYearQuota[0])" v-if="btnShow(111102101)">内部指标</Button>
        <Button type="primary" class="cus-btn" @click="goToRouter(thisYearQuota[1])" v-if="btnShow(111102105)">上级分配指标</Button>
      </Col>
    </Row>
    <Row class="quota-item">
      <Col class="title"><h3>创建指标</h3></Col>
      <Col>
        <Button type="primary" class="cus-btn" @click="goToRouter(newQuota[0])" v-if="btnShow(111102104)">内部指标</Button>
        <Button type="primary" class="cus-btn" @click="goToRouter(newQuota[1])" v-if="btnShow(111102106)">上级代办指标</Button>
      </Col>
    </Row>
    <Row class="quota-item">
      <Col class="title"><h3>历史指标</h3></Col>
      <Col>
        <Button type="primary" class="cus-btn" @click="goToRouter(historyQuota[0])" v-if="btnShow(111102107)">内部历年指标</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import Btns from './components/child'
export default {
  components: {
    Btns
  },
  data () {
    return {
      thisYearQuota: [
        {
          path: 'this_year/organization',
          query: {
            type: 'peers'
          }
        },
        {
          path: 'this_year/pool',
          query: {
            type: 'up'
          }
        }
      ],
      newQuota: [
        {
          path: 'new-quota/organization/new_quota_organization',
          query: {
            type: 'peers'
          }
        },
        {
          path: 'new-quota/organization/new_quota_organization',
          query: {
            type: 'up'
          }
        }
      ],
      historyQuota: [
        {
          path: 'history/organization',
          query: {
            type: 'peers'
          }
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    goToRouter (item) {
      this.$router.push({ path: item.path, query: item.query })
    }
  }
}
</script>
