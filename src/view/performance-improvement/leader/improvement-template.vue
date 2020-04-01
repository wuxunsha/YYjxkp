
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
      <Header :titles="titles" />
    </Col>
    <Col style="padding: 20px" span="24">
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
            <Row style="margin-top: 30px">
              <Col span="4" class="col">
                <span class="span">编号</span>
                <Input v-model="params.perCode" size="large" placeholder="请输入编号" clearable />
              </Col>
              <Col span="4" class="col">
                <span class="span span-max">改进单位/人</span>
                <Input v-model="params.improOrgName" size="large" placeholder="请输入改进单位/人" clearable />
              </Col>
              <Col span="4" class="col">
                <span class="span">状态</span>
                <Select v-model="params.statusList" size="large">
                  <Option v-for="item in statusList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                </Select>
              </Col>
              <Col offset="1" span="8">
                <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
                <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
              </Col>
              <Col span="24">
                <Table :row-class-name="rowClassName" class="disqualified-unit" :columns="columns" :data="data" :border="false"></Table>
              </Col>
            </Row>
          </TabPane>
        </template>
      </Tabs>
    </Col>
    <Col class="page">
      <Page
        :total="total"
        :page-size="pageOpts.pageSize"
        :current="pageOpts.pageIndex"
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
import {
  imfoManPageTab,
  getTaskInfo,
  forPostList
} from '@/api/improvement'
import mixin_table from '@/common/mixin/table'
import Header from '../../quota/summary/components/header'
export default {
  mixins: [mixin_table],
  name: '',
  components: {
    Header
  },
  data () {
    return {
      params: {
        improOrgName: '',
        perCode: '',
        statusList: '',
        orgType: ''
      },
      statusList: [],
      currentTab: '',
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
          title: '编号',
          key: 'perCode',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '改进单位/人',
          key: 'improOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '采集人',
          key: 'dataCollectionOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '待改进指标数',
          key: 'choseRuleProveNum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '反馈与批示',
          key: 'instructionCount',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '当前流程',
          key: 'status',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let status = params.row.status
            let span = ''
            switch (status) {
              case 0:
                span = '创建改进方案'
                break
              case 1:
                span = '改进指标确定'
                break
              case 3:
                span = '已验收'
                break
              case 5:
                span = '回复改进方案'
                break
              default:
                console.log('该状态无配置:', status)
                break
            }
            return h('span', span)
          }
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
            // 查看详情
            let detailIcon = h('Icon', {
              props: {
                type: 'md-book',
                ...prop
              },
              on: {
                click: () => {
                  this.detailTemp(params.row)
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
        }
      ],
      data: [],
      total: 0,
      pageOpts: {
        pageSize: 10,
        pageIndex: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      titles: {
        title: ''
      }
    }
  },
  created () {
    this.imfoManPageTab()
    this.getTaskInfo()
  },
  methods: {
    // 获取状态列表
    getTaskInfo () {
      let params = {
        types: 20
      }
      getTaskInfo(params).then(res => {
        if (res.data.code === 10000) {
          let _selectList = res.data.data
          _selectList.forEach(item => {
            item.value = item.nameValue
            item.label = item.name
          })
          this.statusList = _selectList
        }
      })
    },
    onPageSizeChange (pageSize) {
      this.pageOpts.pageSize = pageSize
      this.queryList()
    },
    // 翻页（指标单位）
    pageChange (pageIndex) {
      console.log('current page num:', current)
      this.pageOpts.pageIndex = pageIndex
      this.queryList()
    },
    // 获取状态列表
    imfoManPageTab () {
      imfoManPageTab().then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data.list
          this.titles.title = res.data.data.orgName
          this.currentTab = this.tabs[0].orgType.toString()
          this.params.orgType = this.currentTab
          this.queryList()
        }
      })
    },
    // 查看详情
    detailTemp (row) {
      let _query = {
        id: row.id
      }
      this.$router.push({ path: 'leader/template_detail', query: _query })
    },
    tabClick (name) {
      // tab切换后重置页码
      this.params.orgType = name
      this.queryList()
    },
    // 查询数据（标签）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.statusList = !params.statusList ? [] : params.statusList.split()
      // params.types = this.types
      forPostList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
      console.log('领导查看', params)
    },
    clearParams () {
      this.params.improOrgName = ''
      this.params.perCode = ''
      this.params.statusList = ''
      this.queryList()
    }
  }
}
</script>
