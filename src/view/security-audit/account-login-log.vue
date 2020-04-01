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
        <span class="span span-max">机构</span>
        <Input v-model="params.orgName" placeholder="机构名称" clearable size="large" />
      </Col>
      <Col span="4" class="col">
        <span class="span span-max">用户端</span>
        <Select v-model="params.terminalType" clearable size="large" @click="selectStatus" placeholder="选择终端">
          <Option v-for="item in terminal" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
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
import { finduserloginloglist } from '@/api/security-audit'
export default {
  mixins: [mixin_table],
  data () {
    return {
      terminal: [
        {
          value: 0,
          label: '网页'
        },
        {
          value: 1,
          label: '微信'
        }
      ],
      params: {
        userName: '',
        mobPhone: '',
        orgName: '',
        terminalType: ''
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
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'mobPhone',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '登录IP',
          key: 'loginIp',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '机构',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '登录时间',
          key: 'loginTime',
          className: 'tb-header',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.loginTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '终端类型',
          key: 'terminalType',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            return h('span', [params.row.terminalType === 0 ? '网页' : '微信'])
          }
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
      this.params.orgName = ''
      this.params.mobPhone = ''
      this.params.terminalType = ''
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
        ...this.pageOpts,
        ...this.params
      }
      finduserloginloglist(params).then(res => {
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
