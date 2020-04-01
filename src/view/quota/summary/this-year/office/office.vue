<style lang="less" scoped>
.header {
  text-align: center;
  background-color: #fff;
  padding: 15px 0;
  .title {
    font-size:24px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-top: 20px;
  }
  .subtitle {
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 5px;
  }
}
.quota-table {
  background-color: #fff;
  padding: 20px;
}
</style>
<template>
  <div>
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col class="quota-table">
        <Row type="flex" justify="space-between">
          <Col span="4">
            <Select v-model="unit">
              <Option v-for="item in unitList" :value="item.label" :key="item.label+item.value"></Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary">发起考核</Button>
          </Col>
        </Row>
      </Col>
      <Col class="quota-table">
        <DynamicTable
          :option="tableOptions"
          >
        </DynamicTable>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getQuotaList
} from '@/api/quota'
import DynamicTable from '../../../component/dynamic-table'
import Header from '../../components/header'
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
          level1: '一级指标',
          level2: '二级指标',
          level3: '三级指标',
          score: '分值',
          // number: '要点编号',
          checkPoint: '考核要点',
          // area: '地区',
          task: '目标任务',
          pointType: '积分方式',
          unit: '数据采集'
        },
        // 是否会操作行
        editRow: {
          status: true,
          cols: ['score', 'number']
        },
        // 是否需要操作功能
        colOperation: {
          // 启用状态
          status: true,
          // 自定义功能逻辑，同iview的render逻辑
          render: this.operation()
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['task']
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 5, 9]
        },
        editIndex: -1,
        // 数据
        data: []
      },
      unitList: [
        {
          value: 1,
          label: '区县市指标'
        },
        {
          value: 2,
          label: '区县市指标1'
        }
      ],
      unit: '',
      titles: {
        title: '2019年赫山区属政务中心扶贫办绩效任务池',
        subtitle: ''
      }
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 编辑
        let detailIcon = h('Icon', {
          props: {
            type: 'ios-paper-outline',
            ...prop
          },
          on: {
            click: () => {
              this.detailData(params)
            }
          }
        })
        let detailTooltip = h('Tooltip', {
          props: {
            content: '查看详情',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [detailTooltip])
      }
    },
    queryList () {
      getQuotaList().then(res => {
        if (res.data.status === 200) {
          this.$store.state.quota.list = res.data.data
          this.$store.commit('setQuota', res.data.data)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
