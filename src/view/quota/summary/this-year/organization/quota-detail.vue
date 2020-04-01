<style lang="less" scoped>
@import url('~@/common/less/global.less');
.quota-table {
  background-color: #fff;
  padding: 20px;
}
.quota-detail {
  background-color: #fff;
  padding: 0 20px;
}
.quota-info {
  line-height: 36px;
  font-weight: bold;
  padding: 20px 0;
}
</style>
<template>
  <div>
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col class="quota-detail">
        <Row class="quota-info">
          <Col v-if="levels[0]">一级指标：{{ levels[0] }}</Col>
          <Col v-if="levels[1]">二级指标：{{ levels[1] }}</Col>
          <Col v-if="levels[2]">三级指标：{{ levels[2] }}</Col>
          <Col v-if="levels[3]">四级指标：{{ levels[3] }}</Col>
          <Col v-if="levels[4]">五级指标：{{ levels[4] }}</Col>
          <Col v-if="quotaDetail.perDesc">考核要点：{{ quotaDetail.perDesc }}</Col>
        </Row>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="data" :border="false"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import { getruleinfobyruletemplateid } from '@/api/quota'
import Header from '../../components/header'
export default {
  mixins: [mixin_table],
  components: {
    Header
  },
  data () {
    return {
      titles: {
        title: '指标完成进展'
      },
      columns: [
        {
          title: '机构',
          key: 'assessmentOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '目标任务',
          key: 'targetValue',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '实际完成情况',
          key: 'busiType',
          className: 'tb-header',
          align: 'center'
        }
      ],
      quotaDetail: ''
    }
  },
  computed: {
    data () {
      return this.quotaDetail.perfomancerRuleTemplateInfoVOList
    },
    levels () {
      return this.quotaDetail.indexNameList
    },
    templateId () {
      return this.$route.query.templateid
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    // 查询数据
    queryList () {
      let tepid = this.templateId
      getruleinfobyruletemplateid(tepid).then(res => {
        if (res.data.code === 10000) {
          this.quotaDetail = res.data.data
        }
      })
    }
  }
}
</script>
