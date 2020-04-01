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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-reply {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:26px;
      color:rgba(9,114,231,1);
      cursor: pointer;
    }
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
  .replay {
    padding: 20px 40px;
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
  padding: 20px;
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
      <Col>
        <div class="notice-content" v-html="content"></div>
      </Col>
      <Col>
        <Button type="primary" class="btn-view-detial" @click="viewImproveDetail" v-if="isAttachFile === 1">查看待改进明细</Button>
        <div class="split-line"></div>
      </Col>
    </Row>
    <!-- 反馈批示 -->
    <Row style="padding: 20px 15px; margin-top: 20px" class="area-container">
      <Col>
        <Input type="textarea" class="textarea" v-model="feedbackContent" placeholder="请输入整改方案" />
      </Col>
      <Col style="margin: 20px auto">
        <Button type="primary" @click="indexinstruction(1, '')">提交批示</Button>
      </Col>
      <Col class="feedback-content" v-for="(item, index) in feedbackList" :key="'反馈与批示' + index">
        <div class="plan">
          <div class="info">
            <div>{{ item.content }}</div>
            <div class="btn-reply" @click="indexinstruction(2, item.id)">回复</div>
          </div>
          <div class="desc">
            <span class="form">{{ item.instruOrgName }}</span>
            <span class="time">{{ item.createTime }}</span>
          </div>
        </div>
        <div class="replay" v-if="item.childList && item.childList.length > 0">
          <div v-for="(replayItem, replayIndex) in item.childList" :key="'回复方案' + replayIndex">
            <div class="info">
              <div>{{ replayItem.content }}</div>
            </div>
            <div class="desc">
              <span class="form">{{ replayItem.instruOrgName }}</span>
              <span class="time">{{ replayItem.createTime }}</span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { perfprovement, saveInstruc } from '@/api/improvement'
export default {
  name: '',
  data () {
    return {
      title: '',
      perCode: '',
      infoTitle: '',
      improOrgName: '',
      content: '',
      feedbackContent: '',
      feedbackList: [],
      isAttachFile: 0
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    // 上级指定或内部改进
    typeName () {
      // superior，上级；internal，内部
      return this.$route.query.typename
    },
    types () {
      // 1，上级评价；2，内部评价
      return this.typeName === 'internal' ? 2 : 1
    }
  },
  created () {
    this.queryList()
    console.log(this.$router)
  },
  methods: {
    // 待改进明细
    viewImproveDetail () {
      let _query = {
        id: this.id
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement/detail', query: _query })
    },
    // 提交反馈
    indexinstruction (replyType, replyId) {
      let params = {
        content: this.feedbackContent,
        replyId: replyId,
        replyType: replyType,
        themeId: this.id,
        types: this.types
      }
      if (params.content === '') {
        let _lable = replyType === 1 ? '整改方案' : '回复'
        this.$Message.warning(`请输入${_lable}内容`)
        return
      }
      saveInstruc(params).then(res => {
        if (res.data.code === 10000) {
          this.feedbackContent = ''
          this.$Message.success(res.data.msg)
          this.queryList()
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
          this.infoTitle = res.data.data.infoTitle
          this.improOrgName = res.data.data.improOrgName
          this.isAttachFile = res.data.data.isAttachFile
          this.feedbackList = res.data.data.instrucList
        }
      })
    },
    clearParams () {
      this.queryList()
    }
  }
}
</script>
