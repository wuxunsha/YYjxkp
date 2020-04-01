<style lang='less' scoped>
/deep/.ivu-table-wrapper {
  border: none;
}
/deep/.ivu-table:after {
  width: 0;
}
/deep/.ivu-table:before {
  height: 0;
}
/deep/.ivu-table th {
  border-bottom: none;
  background-color: #EFF7FF;
  text-align: center;
}
/deep/.ivu-table td {
  border-bottom: none;
  text-align: center;
}
/deep/.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td {
  background-color: #EFF7FF;
}
.from-content {
  .content {
    background: #fff;
    margin-top: .625rem;
    padding: 1.25rem 0;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51,51,51,1);
      text-align: center;
    }
    .indicate {
      padding: 0 20px;
      width: 100%;
      span {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
        color: rgba(51,51,51,1);
      }
    }
    // 数据录入内容
    .data-content {
      padding: 10px 20px 0;
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
            <Col span="24" class="title">
              <h4>指标完成进展</h4>
            </Col>
          </Row>
          <Row class="code-row-bg indicate">
            <Col span="19">
              <Row type="flex" justify="space-between" class="code-row-bg">
                <Col v-for="(item, index) in indexNameList" :key="index">
                  <span>
                    <span>{{mapRealtion[index]}}级指标：{{item}}</span>
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span="4" offset="1">
              <span>
                <span>考核要点：{{perDesc}}</span>
              </span>
            </Col>
          </Row>
          <!-- 数据录入内容 -->
          <Row class="data-content">
            <Table stripe :columns='columns' :data='tableList' disabled-hover>
            </Table>
          </Row>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
import {
  getruleinfobyruletemplateid
} from '@/api/performance-appraisal'
export default {
  data () {
    return {
      // 指标类型
      indexNameList: [],
      // 要点
      perDesc: '',
      // 表格参数
      columns: [
        {
          title: '机构',
          key: 'assessmentOrgName'
        },
        {
          title: '目标任务',
          key: 'targetValue',
          tooltip: true
        },
        {
          title: '实际完成情况',
          key: 'busiValue'
        }
      ],
      // 表格数据
      tableList: [],
      // 指标对应数字
      mapRealtion: {
        0: '一',
        1: '二',
        2: '三',
        3: '四',
        4: '五'
      }
    }
  },
  created () {
    // 根据ruleTemplateId获取对应的要点详情
    this.getruleinfobyruletemplateidList()
  },
  computed: {
  },
  methods: {
    // 根据ruleTemplateId获取对应的要点详情
    getruleinfobyruletemplateidList () {
      getruleinfobyruletemplateid(this.$route.query.ruleTemplateId).then(res => {
        if (res.data.code === 10000) {
          this.indexNameList = res.data.data.indexNameList.reverse()
          this.perDesc = res.data.data.perDesc
          this.tableList = res.data.data.perfomancerRuleTemplateInfoVOList
        }
      })
    }
  }
}
</script>
