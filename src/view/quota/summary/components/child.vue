<style lang="less" scope>
// setps
.ivu-steps .ivu-steps-custom .ivu-steps-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}
.ivu-steps-item.ivu-steps-custom .ivu-steps-head-inner>.ivu-steps-icon {
  top: 4px;
}
.ivu-steps-horizontal .ivu-steps-item:not(:first-child) .ivu-steps-head {
  padding-left: 1px;
}
.custom-large-btn {
  width: 85%;
  height: 50px;
  border-radius: 10px;
}
.desc {
  width: 85%;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
</style>
<template>
  <Row style="margin-top: 20px; height: 100%;">
    <Col span="16">
      <Steps :current="5">
        <Step title="指标模板" icon="md"></Step>
        <Step title="内容填写" icon="md-arrow-dropright"></Step>
        <Step title="分值确定" icon="md-arrow-dropright"></Step>
        <Step title="复核与修改" icon="md-arrow-dropright"></Step>
        <Step title="复核与修改" icon="md-arrow-dropright"></Step>
      </Steps>
    </Col>
    <Col span="14" style="left: 20px; top: 57%">
      <Row>
        <Col v-for="item in btns" :key="item.name" span="8" style="padding: 10px 0">
          <Button size="large" class="custom-large-btn" @click="jumpPage(item)">{{ item.name }}</Button>
          <div class="desc">{{ item.desc }}</div>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    queryList () {
      console.log('指标汇总')
    },
    jumpPage (item) {
      console.log(item.path)
      this.$router.push({ path: item.path })
    }
  }
}
</script>
