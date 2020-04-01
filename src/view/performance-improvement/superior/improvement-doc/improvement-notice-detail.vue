
<style lang="less" scoped>
.feedback-content {
  border-bottom:1px solid rgba(243,243,243,1);
  margin: 10px 30px 5px;
  .info {
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    line-height:30px;
    color:rgba(51,51,51,1);
  }
  .desc {
    display: flex;
    justify-content: space-between;
    >span {
      font-size:20px;
      font-family:PingFang SC;
      line-height:54px;
      color:rgba(204,204,204,1);
    }
  }
}
/deep/textarea.ivu-input {
  min-height: 200px;
}
.remark {
  margin-top: 20px;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:26px;
  color:rgba(51,51,51,1);
  >p:first-child {
    color: #0972E7;
  }
}
.area-container {
   background-color: #fff;
   padding: 20px;
}
.title {
  text-align: center;
  font-size:32px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:22px;
  color:rgba(51,51,51,1);
  margin-top: 40px;
}
.title-line {
  height:1px;
  background-color: rgba(243,243,243,1);
  margin-top: 30px;
}
.perCode {
  font-size:22px;
  font-family:PingFang SC;
  font-weight:500;
  line-height:22px;
  color:rgba(102,102,102,1);
  text-align: right;
  margin-top: 10px;
}
.notice-title {
  font-size:28px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:22px;
  color:rgba(51,51,51,1);
  text-align: center;
  margin-top: 30px;
}
.improvement-org {
  font-size:22px;
  font-family:PingFang SC;
  font-weight:500;
  line-height:22px;
  color:rgba(51,51,51,1);
  margin-top: 30px;
  text-decoration: underline;
}
.notice-content {
  padding: auto 40px;
}
.btn-view-detial {
  margin-top: 30px;
}
.split-line {
margin-top: 15 ;
}
</style>

<template>
  <div>
    <!-- 通知详情 -->
    <Row class="area-container">
      <Col>
        <h1 class="title">{{ title }}</h1>
        <div class="title-line"></div>
      </Col>
      <Col>
        <div class="perCode">编号：{{ perCode }}</div>
      </Col>
      <Col>
        <div class="notice-title">{{ infoTitle }}</div>
      </Col>
      <Col>
        <div class="improvement-org">{{ improOrgName }}：</div>
      </Col>
      <Col style="margin-top: 20px">
        <Editor @on-change="htmlContentChange" :value="content" />
      </Col>
      <Col style="text-align: center" v-if="btnShow(113101102102)">
        <Button type="primary" class="btn-view-detial" @click="done">完成</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { perfprovement, updatePostProve } from '@/api/improvement'
import Editor from '../components/editor'
export default {
  name: '',
  components: {
    Editor
  },
  data () {
    return {
      title: '',
      perCode: '',
      infoTitle: '',
      improOrgName: '',
      content: ``,
      temId: ''
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  created () {
    this.queryList()
  },
  methods: {
    htmlContentChange (html, text) {
      this.content = html
    },
    // 待改进明细
    done () {
      this.$Modal.confirm({
        title: '编辑通知模板',
        content: '确定编辑该通知模板吗？',
        onOk: () => {
          let params = {
            content: this.content,
            perCode: this.perCode,
            title: this.title,
            temId: this.temId
          }
          updatePostProve(params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
    },
    // 查询数据（标签）
    queryList () {
      let id = this.id
      perfprovement(id).then(res => {
        if (res.data.code === 10000) {
          console.log(res.data.data)
          this.title = res.data.data.template.title
          this.perCode = res.data.data.template.perCode
          this.content = res.data.data.template.content
          this.temId = res.data.data.template.id
          this.infoTitle = res.data.data.infoTitle
          this.improOrgName = res.data.data.improOrgName
        }
      })
    },
    clearParams () {
      this.queryList()
    }
  }
}
</script>
