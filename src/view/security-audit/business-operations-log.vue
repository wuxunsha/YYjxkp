<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  .col .span-max {
    width: 80px;
  }
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="4" class="col">
        <span class="span span-max">账户名</span>
        <Input v-model="params.userName" placeholder="账户名" clearable size="large" />
      </Col>
      <Col span="4" class="col">
        <span class="span span-max">手机号</span>
        <Input v-model="params.mobPhone" placeholder="手机号" clearable size="large" />
      </Col>
      <Col span="4" class="col">
        <span class="span span-max">版块名称</span>
        <Input v-model="params.moduleName" placeholder="版块名称" clearable size="large" />
      </Col>
      <Col span="4" class="col">
        <span class="span span-max">操作类型</span>
        <Input v-model="params.optName" placeholder="操作类型" clearable size="large" />
      </Col>
      <Col offset="1" span="7">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 字典维护 -->
    <Row class="content">
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="data" :border="false"></Table>
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
  </div>
</template>

<script>
import { getStandardDate } from '@/libs/tools'
import mixin_table from '@/common/mixin/table'
import { findbusinessoperationsloglist } from '@/api/security-audit'
export default {
  mixins: [mixin_table],
  data () {
    return {
      params: {
        userName: '',
        mobPhone: '',
        moduleName: '',
        optName: ''
      },
      columns: [
        {
          title: '序号',
          key: 'order',
          className: 'tb-header',
          align: 'center',
          width: '100',
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '账户名',
          key: 'userName',
          className: 'tb-header',
          align: 'center',
          width: 200
        },
        {
          title: '手机号码',
          key: 'mobPhone',
          className: 'tb-header',
          align: 'center',
          width: 160
        },
        {
          title: '操作时间',
          key: 'optTime',
          className: 'tb-header',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.optTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '版块',
          key: 'moduleName',
          className: 'tb-header',
          align: 'center',
          width: 160
        },
        {
          title: '类型',
          key: 'optName',
          className: 'tb-header',
          align: 'center',
          width: 160
        },
        {
          title: '操作描述',
          key: 'optDesc',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 单位
      data: [],
      // 分页参数（单位）
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      },
      pageSizeOpts: [10, 20, 50, 100]
    }
  },
  created () {
    // 数据字典列表
    this.queryList()
  },
  mounted () {
  },
  methods: {
    selectStatus () {
      this.pageOpts.currentPage = 1
    },
    clearParams () {
      this.params.userName = ''
      this.params.mobPhone = ''
      this.params.moduleName = ''
      this.params.optName = ''
      this.queryList()
    },
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      this.queryList()
    },
    // 翻页（数据字典）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 查询数据（单位）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      findbusinessoperationsloglist(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    }
  }
}
</script>
