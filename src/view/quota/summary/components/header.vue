<style lang="less" scoped>
.custome-header {
  text-align: center;
  background-color: #fff;
  padding: 15px 0;
  .title {
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-top: 20px;
  }
  .subtitle {
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 5px;
  }
}
</style>
<template>
  <div class="custome-header">
    <div class="title">{{ titles.title }}</div>
    <div class="subtitle">{{ titles.subtitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Object,
      default: () => {
        return {
          title: '',
          subtitle: ''
        }
      }
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {
  },
  methods: {
  }
}
</script>
