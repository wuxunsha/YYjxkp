<style lang='less' scoped>
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
        .describe,
        .issue-message {
            font-size:18px;
            font-weight:500;
            margin-top: 8px;
            text-align: center;
            color:rgba(102,102,102,1);
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
                            <h4>{{activityData.title}}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" class="describe">
                            <p>{{activityData.theme}}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" class="issue-message">
                            <p>
                                <span>发布时间：{{activityData.createTime}}</span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" v-html="activityData.content"></Col>
                    </Row>
                </Row>
            </Content>
        </Layout>
    </div>
</template>

<script>
import {
  findOneActivity
} from '@/api/portal-management'
import { getStandardDate } from '@/libs/tools'
export default {
  data () {
    return {
      // 内容详情数据
      activityData: {}
    }
  },
  created () {
    // 获取详情信息
    this.getFindOneActivity()
  },
  computed: {},
  methods: {
    // 获取详情信息
    getFindOneActivity () {
      findOneActivity(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          let issueTime = getStandardDate(res.data.data.createTime, 'yearDate')
          res.data.data.createTime = issueTime
          this.activityData = res.data.data
        }
      })
    }
  }
}
</script>
