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
.select-org {
  background-color: #fff;
  padding: 20px;
}
</style>
<template>
  <div>
    <Row class="select-org" type="flex" align="middle" justify="center">
      <Col span="5" style="text-align: right;">查看历年指标：</Col>
      <Col span="6">
         <DatePicker type="year" placeholder="请选择年份" @on-change="selectOrg" :options="dateOptions"></DatePicker>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Tabs @on-click="tabClick" :value="currentTab">
          <template
              v-for="(item, index) in tabs"
            >
            <TabPane
              icon="ios-trending-up"
              :label="item.indexTypeName"
              :name="index.toString()"
              :key="'今年指标' + index"
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
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  // 历史指标-根据当前登录机构和年份获取对应的历史指标
  getindexinfooveryearbyyear
} from '@/api/quota'
import DynamicTable from '../../../component/dynamic-table'
import Header from '../../components/header'
export default {
  name: 'app',
  components: {
    DynamicTable,
    Header
  },
  data () {
    return {
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000 - 365 * 24 * 60 * 60 * 1000
        }
      },
      currentTab: '',
      tabs: [],
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
      titles: {
        title: '',
        subtitle: ''
      }
    }
  },
  computed: {
    year () {
      return new Date().getFullYear() - 1
    }
  },
  created () {
    this.getindexinfooveryearbyyear(this.year)
  },
  methods: {
    selectOrg (value) {
      if (!value) return
      this.getindexinfooveryearbyyear(value)
    },
    // 获取机构下的指标
    getindexinfooveryearbyyear (year) {
      getindexinfooveryearbyyear(year).then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          this.tabClick(0)
          this.currentTab = 0
        }
      })
    },
    tabClick (index) {
      this.titles.title = this.tabs[index].title || ''
      this.titles.subtitle = this.tabs[index].indexCreateOrgName
      this.getQuota(this.tabs[index].indexTableVoList || [])
      /*
        * 流程状态：indexTypeStatue
        * 0, "正常
        * 1, "没有流程在运行(不能创建)"
        * 2, "有流程在运行但不是正确节点"
        * 3, "有流程在运行是正确节点但是登录用户不是参与者"
        * 4, "没有流程在运行(你可创建)"
      */
      /*
        * 指标状态：status
        * 1，"初稿"
        * 2，"维护指标内容中"
        * 3，"分值维护中"
        * 4，"被考核单位确认"
        * 5，"发布中"
        * 6，"已发布"
      */
    },
    getQuota (data) {
      this.$store.state.quota.list = data
      this.$store.commit('setQuota', data)
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
