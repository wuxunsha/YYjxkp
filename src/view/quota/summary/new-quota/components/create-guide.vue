<style lang="less" scoped>
  .container {
    background-color: #fff;
    background-image: url('~@/assets/images/quota/new_quota_bg.png');
    background-position: center 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
  }
  .title {
    font-size:40px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:70px;
    color:rgba(9,114,231,1);
  }
  .btn-crete-quota {
    width:420px;
    height:88px;
    background:rgba(9,114,231,1);
    border-radius:27px;
  }
</style>
<template>
  <Row class="container">
    <Col>
      <h1 class="title">{{ title }}</h1>
    </Col>
    <Col style="margin-bottom: 4%">
      <Button type="primary" class="btn-create-quota" @click="goToNewQuotaPage" :disabled="disable">马上创建</Button>
    </Col>
  </Row>
</template>

<script>
export default {
  name: '',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      disable: false
    }
  },
  mounted () {
    // console.log('=========', this.data)
    if (this.isControl && this.data.indexTypeStatue === 4) {
      this.disable = true
    } else {
      this.disable = false
    }
  },
  computed: {
    title () {
      return `现在创建${this.data.indexTypeName}指标模板`
    },
    sheetType () {
      return this.$route.query.type
    },
    isControl () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104101101)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106101101)) {
        _control = true
      }

      return _control
    }
  },
  methods: {
    goToNewQuotaPage () {
      let _query = {
        indexCreateOrgName: this.data.indexCreateOrgName,
        indexCreateOrgId: this.data.indexCreateOrgId,
        indexTypeId: this.data.indexTypeId,
        isSuperior: this.data.isSuperior
      }
      this.$router.push({ path: '/quota/new_quota/organization/new_quota', query: _query })
    }
  }
}
</script>
