
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
    <Col style="padding: 20px" span="24">
      <Row style="margin-top: 30px">
        <Col span="4" class="col">
          <span class="span">编号</span>
          <Input v-model="params.perCode" size="large" placeholder="请输入编号" clearable />
        </Col>
        <Col span="4" class="col">
          <span class="span">状态</span>
          <Select v-model="params.statusList" size="large">
            <Option v-for="item in statusList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col offset="1" span="10">
          <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
          <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
        </Col>
        <Col span="24">
          <Table :row-class-name="rowClassName" class="disqualified-unit" :columns="columns" :data="data" :border="false"></Table>
        </Col>
      </Row>
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
  getTaskInfo,
  proveDetailList
} from '@/api/improvement'
import mixin_table from '@/common/mixin/table'
export default {
  mixins: [mixin_table],
  name: '',
  data () {
    return {
      params: {
        perCode: '',
        statusList: ''
      },
      statusList: [],
      currentId: 4,
      stepsList: [
        {
          explain: '创建模板',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '选择指标',
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
          title: '采集单位',
          key: 'improOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '改进指标数',
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
          title: '状态',
          key: 'status',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let status = params.row.status
            let span = ''
            switch (status) {
              case 2:
                span = '待回复'
                break
              case 3:
                span = '已完成'
                break
              case 5:
                span = '已回复'
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
    this.getTaskInfo()
    this.queryList()
  },
  methods: {
    // 获取状态列表
    getTaskInfo () {
      let params = {
        types: 19
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
    // 查看详情
    detailTemp (row) {
      let _query = {
        id: row.id,
        typename: this.typeName
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement_template/detail', query: _query })
    },
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      this.queryList()
    },
    // 翻页（指标单位）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 查询数据（标签）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.statusList = !params.statusList ? [] : params.statusList.split()
      params.types = this.types
      proveDetailList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    clearParams () {
      this.params.perCode = ''
      this.params.statusList = ''
      this.queryList()
    }
  }
}
</script>
