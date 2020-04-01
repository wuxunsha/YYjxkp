
<style lang="less" scoped>
  @import url('~@/common/less/global.less');
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
  .disqualified-unit {
    margin-top: 30px;
  }
  .page {
    padding-bottom: 20px;
  }
</style>

<template>
  <Row style="background-color: #fff;" type="flex" justify="center">
    <Col style="padding: 20px" span="18">
      <article-steps :currentId="currentId" :stepsList="stepsList"></article-steps>
    </Col>
    <Col style="margin-top: 40px; padding: 20px" span="24">
      <Tabs @on-click="tabClick" :value="currentTab">
        <template
            v-for="(item, index) in tabs"
          >
          <TabPane
            icon="ios-trending-up"
            :label="item.orgtypeName"
            :name="item.orgType.toString()"
            :key="'机构' + index"
            >
            <Table :row-class-name="rowClassName" class="disqualified-unit" :columns="columns" :data="data" :border="false"></Table>
          </TabPane>
        </template>
      </Tabs>
    </Col>
    <Col class="page">
      <Page
        :total="total"
        :page-size="pageOpts.pagesize"
        :current="pageOpts.currentPage"
        prev-text="上一页"
        next-text="下一页"
        @on-change="pageChange"
        @on-page-size-change="onPageSizeChange"
        show-sizer
        show-total
        show-elevator
        :page-size-opts="pageSizeOpts"
      />
    </Col>
  </Row>
</template>

<script>
import { getPageTab, orgList } from '@/api/improvement'
import mixin_table from '@/common/mixin/table'
export default {
  mixins: [mixin_table],
  name: '',
  data () {
    return {
      currentTab: '',
      currentId: 1,
      stepsList: [
        {
          explain: '创建模板',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '发起',
          icon: 'ivu-icon ivu-icon-ios-desktop'
        },
        {
          explain: '改进指标确定',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '改进方案回复',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '验收',
          icon: 'ivu-icon ivu-icon-ios-grid'
        }
      ],
      tabs: [],
      columns: [
        {
          title: '序号',
          key: 'nubmer',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '机构名称/人',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '未达标指标数',
          key: 'nonum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '发起改进指标数',
          key: 'spoIndexNum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '完成改进指标数量',
          key: 'doneIndexNum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
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
                  this.editData(params.row)
                }
              }
            })
            return h('div', [this.btnShow(113101101102) && detailIcon])
          }
        }
      ],
      data: [],
      params: {
        orgType: ''
      },
      total: 0,
      pageOpts: {
        pageSize: 10,
        pageIndex: 1
      },
      pageSizeOpts: [10, 20, 50, 100]
    }
  },
  computed: {
    // 上级指定或内部改进
    typeName () {
      // superior，上级；internal，内部
      return this.$route.query.typename
    },
    types () {
      // 1，上级评价；2，内部评价
      return this.typeName === 'internal' ? 2 : 1
    }
  },
  created () {
    // 获取机构列表
    this.getPageTab()
  },
  methods: {
    editData (row) {
      let _query = {
        orgId: row.orgId,
        orgType: this.params.orgType,
        perBatchCode: row.perBatchCode
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement_org/disqualified_detail', query: _query })
    },
    tabClick (name) {
      this.params.orgType = name
      this.orgList()
    },
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      // this.queryList()
    },
    // 翻页（指标单位）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      // this.queryList()
    },
    // 获取待改进机构列表
    orgList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      orgList(params).then(res => {
        if (res.data.code === 10000) {
          this.total = res.data.data.total
          this.data = res.data.data.dataList
        }
      })
    },
    // 获取机构列表
    getPageTab () {
      console.log('待改进单位')
      let params = {
        types: this.types
      }
      getPageTab(params).then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          this.currentTab = this.tabs[0].orgType.toString()
          this.params.orgType = this.currentTab
          this.orgList()
        }
      })
    }
  }
}
</script>
