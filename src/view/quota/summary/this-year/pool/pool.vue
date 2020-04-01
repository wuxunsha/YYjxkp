<style lang="less" scoped>
@tab-height: 50px;
/deep/.ivu-tabs-bar {
  background-color: #fff;
  height: @tab-height;
  border-bottom: none;
  margin-bottom: 0;
  /deep/.ivu-tabs-nav .ivu-tabs-tab {
    font-family:PingFang SC;
    height: @tab-height;
    line-height: 36px;
    color: #0972E7;
    font-weight: 500;
    font-size: 16px;
    min-width: 150px;
    text-align: center;
  }
  /deep/.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #FF9B29;
  }
  /deep/.ivu-tabs-ink-bar {
    background-color: #FF9B29;
  }
}
/deep/.ivu-tabs-content {
  height: calc(~'100% - 56px');
  background-color: #fff;
}
/deep/.ivu-tabs-tabpane {
  height: 100%;
  background-color: #fff;
}
.quota-table {
  background-color: #fff;
  padding: 20px;
}
</style>
<template>
<Tabs @on-click="tabClick" :value="currentTab">
    <template
      v-for="(item, index) in tabs"
      >
      <TabPane
        icon="ios-trending-up"
        :label="item.indexTypeName"
        :name="index.toString()"
        :key="'指标池' + index"
        v-if="item.indexTypeStatue === 0"
        >
        <Row>
          <Col>
            <Header :titles="titles" />
          </Col>
          <Col class="quota-table">
            <Button type="primary">下载指标</Button>
          </Col>
          <Col class="quota-table">
            <DynamicTable
              :option="tableOptions"
              >
            </DynamicTable>
          </Col>
        </Row>
      </TabPane>
    </template>
  </Tabs>
</template>

<script>
import {
  getassessmentthisyearbyuporg
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
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          // perCode: '要点编号',
          perDesc: '考核要点',
          // area: '地区',
          targetValue: '目标任务',
          // pointType: '计分方式',
          dataCollectionOrgName: '数据采集单位'
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
      tabs: [],
      currentTab: '0',
      titles: {
        title: '',
        subtitle: ''
      }
    }
  },
  computed: {
    sheetType () {
      return this.$route.query.type
    }
  },
  created () {
    this.getassessmentthisyearbyuporg()
  },
  methods: {
    tabClick (index) {
      this.titles.title = this.tabs[index].title
      this.titles.subtitle = this.tabs[index].indexTypeName
      this.getQuota(this.tabs[index].indexTableVoList || [])
    },
    getassessmentthisyearbyuporg () {
      getassessmentthisyearbyuporg().then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          this.tabClick(0)
        }
      })
    },
    getQuota (data) {
      this.$store.state.quota.list = data
      this.$store.commit('setQuota', data)
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
