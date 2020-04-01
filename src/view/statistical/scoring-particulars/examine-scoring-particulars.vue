<style lang="less" scoped>
.table {
  background: #fff;
  .table-title {
     margin: 16px 0;
    h4 {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
  }
  .quota-table {
    padding: 20px;
  }
}
</style>
<template>
  <div class="table">
    <Row>
      <Col class="table-title">
        <h4>{{tableTitie}}</h4>
      </Col>
      <Col class="quota-table">
        <DynamicTable :option="tableOptions"></DynamicTable>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getSurveyView
} from '@/api/statistical'
import DynamicTable from '../../quota/component/dynamic-table'
export default {
  components: {
    DynamicTable
  },
  data () {
    return {
      // 表名
      tableTitie: '',
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          allScore: '分值',
          orgName: '地区',
          score: '得分',
          addScore: '加分',
          decScore: '扣分',
          sumScore: '总分',
          rankLev: '名次'
        },
        // 判断指标是否有内容显示
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: false
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          // colIndex: [ 0, 1, 2, 3 ],
          noMergeCellName: ['allScore', 'orgName', 'score', 'addScore', 'decScore', 'sumScore', 'rankLev']
        },
        editIndex: -1,
        // 数据
        data: []
      }
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    queryList () {
      getSurveyView(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.tableTitie = res.data.data.title
          this.$store.state.quota.list = res.data.data.statisInfoViewListVOs
          this.$store.commit('setQuota', res.data.data.statisInfoViewListVOs)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
