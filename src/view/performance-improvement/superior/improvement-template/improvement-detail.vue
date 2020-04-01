<style lang="less" scoped>
.quota-table {
  background-color: #fff;
  padding: 20px;
}
/deep/ .ivu-radio-default {
  display: flex;
  align-items: center;
}
</style>
<template>
  <div>
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col class="quota-table" v-if="btnShow(113101103104)">
        <Button type="primary" @click="createNotice">添加到通知附件中</Button>
      </Col>
      <Col class="quota-table">
        <DynamicTable
          :option="tableOptions"
          @on-selection-change="onSelectionChage"
          >
        </DynamicTable>
      </Col>
    </Row>
  </div>
</template>

<script>
import { chosepointview, chosepointsub } from '@/api/improvement'
import DynamicTable from '../../../quota/component/dynamic-table'
import Header from '../../../quota/summary/components/header'
export default {
  components: {
    DynamicTable,
    Header
  },
  data () {
    return {
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          perDesc: '考核要点',
          targetValue: '目标任务',
          busiDesc: '实际完成情况',
          resultScore: '实际得分'
        },
        checkbox: {
          status: true,
          colIndex: 6
        },
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 3, 4, 7]
        },
        // 数据
        data: []
      },
      titles: {
        title: '',
        subtitle: ''
      },
      infoIds: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  created () {
    this.chosepointview()
  },
  methods: {
    onSelectionChage (row) {
      console.log(row)
      let _arr = []
      row.forEach(item => {
        _arr.push(item.infoId)
      })
      this.infoIds = _arr
    },
    // 添加到通知附件中
    createNotice () {
      if (this.infoIds.length === 0) {
        this.$Message.warning('请选择要添加的内容')
        return
      }
      this.$Modal.confirm({
        title: '添加通知附件',
        content: '确定添加到通知附件中吗？',
        onOk: () => {
          let params = {
            infoIds: this.infoIds,
            perimprovementId: this.id
          }
          chosepointsub(params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.infoIds = []
            }
          })
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    // 机构待改进详情
    chosepointview (row) {
      let id = this.id
      chosepointview(id).then(res => {
        if (res.data.code === 10000) {
          console.log('改进详情', res.data.data.data)
          this.titles.title = '整改单位/人：' + res.data.data.orgName
          this.titles.subtitle = '考核时间：' + res.data.data.perBatchTime
          this.$store.state.quota.list = res.data.data.data
          this.$store.commit('setQuota', res.data.data.data)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
