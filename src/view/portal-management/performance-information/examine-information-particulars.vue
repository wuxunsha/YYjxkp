<style lang='less' scoped>
/deep/li {
  list-style: none;
}
.from-content {
  padding: 24px 20px;
  background-color: #fff;
  .content {
    width: 100%;
    margin-bottom: 25px;
    .title-name {
      font-size:20px;
      font-weight:bold;
      text-align: center;
      color:rgba(51,51,51,1);
    }
    .describe {
      font-size:18px;
      font-weight:500;
      margin-top: 8px;
      text-align: center;
      color:rgba(102,102,102,1);
    }
    .issue-message {
      font-size:18px;
      font-weight:500;
      margin-top: 8px;
      text-align: center;
      color:rgba(102,102,102,1);
      .author {
        margin-left: 20px;
      }
      .source {
        margin-left: 20px;
      }
    }
    .information-content {
      /deep/p {
        text-indent: 2em!important;
      }
    }
  }
}
</style>

<template>
    <div>
        <Layout>
            <Content class='from-content'>
                <!-- 表名 -->
                <Row class="content">
                    <Row>
                        <Col span="24" class="title-name">
                            <h4>{{informationData.title}}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" class="describe">
                            <p>{{informationData.titleSmall}}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" class="issue-message">
                            <p>
                                <span>发布时间：</span>
                                <span>{{informationData.createTime | dateYMD}}</span>
                                <span class="author">作者：</span>
                                <span>{{informationData.author}}</span>
                                <span class="source">来源：</span>
                                <span>{{informationData.infosource}}</span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" v-html="informationData.content" class="information-content">
                        </Col>
                    </Row>
                </Row>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { editInformation } from '@/api/portal-management'
export default {
  data () {
    return {
      // 绩效资讯内容
      informationData: {}
    }
  },
  created () {
    // 获取资讯详情内容
    this.getInformationParticulars()
  },
  computed: {},
  methods: {
    // 获取资讯详情内容
    getInformationParticulars () {
      const data = {
        id: this.$route.query.id,
        infoType: this.$route.query.infoType
      }
      editInformation(data).then(res => {
        if (res.data.code === 10000) {
          this.informationData = res.data.data
        }
      })
    }
  }
}
</script>
