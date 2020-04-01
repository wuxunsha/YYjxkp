<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  .content {
    padding: 2.25rem 3.125rem 1.25rem .8rem;
    .plate-item {
      min-height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background:rgba(202,228,255,1);
      border-radius:17px;
      text-align: center;
      padding: 10px 15px;
      max-width: 300px;
      min-width: 200px;
      .icon {
        // flex: 1;
      }
      .text {
        // flex: 1;
        margin-left: 30px;
        .title {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:bold;
          line-height:22px;
          color:rgba(9,114,231,1);
        }
        .desc {
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:22px;
          color:rgba(9,114,231,1);
          margin-top: 5px;
        }
      }
    }
  }
</style>
<template>
  <div class="content">
    <!-- 字典维护 -->
    <Row>
      <Col
        span="5"
        offset="1"
        style="margin-bottom: 30px"
        v-for="(item, index) in data"
        :key="index"
        >
        <div class="plate-item">
          <div class="icon">
            <img :src="icons[index]">
          </div>
          <div class="text">
            <p class="title">{{ item.MODULENAME}}</p>
            <p class="desc">登录{{ item.MODULECOUNT }}次</p>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
// import { getStandardDate } from '@/libs/tools'
import { loginblockdata } from '@/api/security-audit'
export default {
  data () {
    return {
      data: [],
      icons: [
        require('../../assets/images/security-audit/01.png'),
        require('../../assets/images/security-audit/13.png'),
        require('../../assets/images/security-audit/02.png'),
        require('../../assets/images/security-audit/12.png'),
        require('../../assets/images/security-audit/10.png'),
        require('../../assets/images/security-audit/04.png'),
        require('../../assets/images/security-audit/03.png'),
        require('../../assets/images/security-audit/11.png'),
        require('../../assets/images/security-audit/14.png'),
        require('../../assets/images/security-audit/07.png')
      ],
      params: {
        currentPage: 0,
        pagesize: 0
      }
    }
  },
  created () {
    // 登录板块数据
    this.queryList()
  },
  mounted () {
  },
  methods: {
    // 查询数据（单位）
    queryList () {
      let params = {
        // ...this.params
      }
      loginblockdata(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data
        }
      })
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    }
  }
}
</script>
