<style lang="less" scoped>
@tab-height: 50px;
/deep/.ivu-tabs-bar {
  background-color: #fff;
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
  background-color: #fff;
}
.header {
  background: #fff;
  .year {
    padding: 20px;
  }
  .steps {
    padding: 0 20px;
  }
  .quota-table {
    background-color: #fff;
    padding: 10px 20px;
  }
}
</style>
<template>
  <Tabs @on-click="tabBar">
    <template v-for="(item, index) in indexType">
      <TabPane icon="ios-trending-up" tab="OrgTabs" :label="item.indexTypeName" :name="JSON.stringify(item)" :key="index">
        <Row class="header">
          <Row class="year">
            <Col span="3">
              <Select v-model="sheetId" placeholder="请选择年份" @on-change="yearsChange" label-in-value>
                <Option v-for="item in yearsList" :value="item.id" :key="item.id">{{ item.years }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="steps">
            <article-steps :currentId="1" :stepsList="stepsList"></article-steps>
          </Row>
          <Row class="quota-table">
            <Row>
              <Col span="24">
                <Button type="primary" @click="initiateAssess" v-if="btnShow(112101102101)">发起考核</Button>
              </Col>
            </Row>
          </Row>
          <Row class="quota-table">
            <DynamicTable :option="tableOptions"></DynamicTable>
          </Row>
        </Row>
      </TabPane>
    </template>
  </Tabs>
</template>

<script>
import {
  getloginperfomancebatchindextypeup,
  getindexlist,
  getindexinfobysheetid
} from '@/api/performance-appraisal'
import DynamicTable from '../../../quota/component/dynamic-table'
export default {
  components: {
    DynamicTable
  },
  data () {
    return {
      // 指标类型
      indexType: [],
      // 当前年度
      currentYear: 0,
      // 历年年度
      yearsList: [],
      // 指标所属单位ID
      indexCreateOrgId: null,
      // 绩效考核机构能涉及的绩效指标类型Id
      indexTypeId: null,
      // 指标主表id
      sheetId: null,
      // 标题
      title: '',
      // 步骤条参数
      stepsList: [
        {
          explain: '发起',
          icon: 'icon-font iconfaqikaohe'
        },
        {
          explain: '数据采集',
          icon: 'icon-font iconshujucaiji'
        },
        {
          explain: '考核单位确认',
          icon: 'icon-font iconqueren'
        },
        {
          explain: '汇总与修改',
          icon: 'icon-font iconxiugai1'
        },
        {
          explain: '结果发布',
          icon: 'icon-font iconfabu1'
        }
      ],
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
          assessmentOrgName: '被考核单位',
          targetValue: '目标任务',
          // targetType: '计分方式',
          dataCollectionOrgName: '数据采集单位'
        },
        // 判断指标是否有内容显示
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 自定义插槽内容
        // colSlot: [
        //   {
        //     key: 'targetType',
        //     render: (h, params) => {
        //       // let _status = params.row.targetType
        //       let _lalbel = ''
        //       // switch (_status) {
        //       //   case 1:
        //       //     _lalbel = '量化'
        //       //     break
        //       //   case 2:
        //       //     _lalbel = '非量化'
        //       //     break
        //       //   default:
        //       //     _lalbel = '-'
        //       //     break
        //       // }
        //       return h('span', _lalbel)
        //     }
        //   }
        // ],
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
          cols: ['targetValue', 'perDesc']
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          // colIndex: [0, 1, 2, 3, 4, 5],
          noMergeCellName: ['score', 'perDesc', 'targetValue']
        },
        editIndex: -1,
        // 数据
        data: []
      },
      // 发起考核按钮显示隐藏开关
      initiateAssessFlag: false
    }
  },
  computed: {
  },
  created () {
    this.getloginperfomancebatchindextype()
    // 获取当前年度
    this.isYear()
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
            custom: 'icon-font iconchakanyanjingshishifenxi',
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
    // 获取当前年度
    isYear () {
      const dt = new Date()
      const y = dt.getFullYear()
      this.currentYear = y
    },
    // 获取上级待办指标类型
    getloginperfomancebatchindextype () {
      getloginperfomancebatchindextypeup().then(res => {
        if (res.data.code === 10000) {
          this.indexType = res.data.data
          this.indexCreateOrgId = res.data.data[0].indexCreateOrgId
          this.indexTypeId = res.data.data[0].indexTypeId
          this.getindexlistData()
        }
      })
    },
    // 根据机构id和类型获取历年指标主表
    getindexlistData () {
      const data = {
        indexCreateOrgId: this.indexCreateOrgId,
        indexTypeId: this.indexTypeId
      }
      getindexlist(data).then(res => {
        if (res.data.code === 10000) {
          if (res.data.data.length < 1) {
            this.initiateAssessFlag = false
            this.$store.state.quota.list = []
            this.$store.commit('setQuota', [])
            this.$store.commit('createColumn', {})
            this.$Message.error('该机构没有创建指标')
          } else {
            this.initiateAssessFlag = true
            this.yearsList = res.data.data
            this.sheetId = res.data.data[0].id
            this.getindexinfobysheetidList()
          }
        }
      })
    },
    // 根据指标主表id获取对应的指标详情
    getindexinfobysheetidList () {
      getindexinfobysheetid(this.sheetId).then(res => {
        if (res.data.code === 10000) {
          this.title = res.data.data.title
          this.$store.state.quota.list = res.data.data.batchTableVoList
          this.$store.commit('setQuota', res.data.data.batchTableVoList)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    },
    // 指标年度下拉框改变
    yearsChange (e) {
      if (Number(e.label) === this.currentYear) {
        this.initiateAssessFlag = false
      } else {
        this.initiateAssessFlag = true
      }
      this.sheetId = e.value
      this.getindexinfobysheetidList()
    },
    // 查看详情
    detailData (params) {
      this.$router.push({
        path: './superior_examine_index_page',
        query: {
          ruleTemplateId: params.row.ruleTemplateId
        }
      })
    },
    // 发起年度考核
    initiateAssess () {
      this.$router.push({
        path: './superior_initiate_year_assessment_page',
        query: {
          sheetId: this.sheetId
        }
      })
    },
    // 指标类型切换
    tabBar (item) {
      let tab = typeof item === 'string' ? JSON.parse(item) : item
      let indexCreateOrgId = tab.indexCreateOrgId
      let indexTypeId = tab.indexTypeId
      this.indexCreateOrgId = indexCreateOrgId
      this.indexTypeId = indexTypeId
      this.getindexlistData()
    }
  }
}
</script>
