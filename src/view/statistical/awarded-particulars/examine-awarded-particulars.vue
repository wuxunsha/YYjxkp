<style lang='less' scoped>
// 内容
.form-content {
  .table-title {
    margin-bottom: 16px;
    h4 {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
  }
}
</style>

<template>
  <div class='layout'>
    <Layout>
        <!-- 内容 -->
      <div class='form-content'>
        <!-- 表格内容 -->
        <Content class='from-content'>
            <Row class="table-title">
                <h4>{{tableTitle}}</h4>
            </Row>
            <Row class="table">
              <DynamicTable
              :option="tableOptions"
              >
            </DynamicTable>
            </Row>
        </Content>
      </div>
    </Layout>

  </div>
</template>

<script>
import {
  getInnoPointExamine
} from '@/api/statistical'
import DynamicTable from '../../quota/component/dynamic-table'
export default {
  components: {
    DynamicTable
  },
  data () {
    return {
      // 标题
      tableTitle: '',
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          orgName: '单位名称',
          pointGist: '加分理由及依据',
          pointType: '奖励类型',
          score: '预审加分',
          busiTypeName: '单位类别',
          mergeScore: '合计加分'
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: false
          // 需要启用提示的列名
          // cols: ['task']
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          // colIndex: [ 0, 1, 5 ],
          noMergeCellName: ['pointType', 'score', 'busiTypeName', 'mergeScore']
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

  computed: {},

  methods: {
    queryList () {
      getInnoPointExamine(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.tableTitle = res.data.data.title
          this.$store.state.quota.list = res.data.data.rowList
          this.$store.commit('setQuota', res.data.data.rowList)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
