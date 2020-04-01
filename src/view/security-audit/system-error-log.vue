<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  .col .span-max {
    width: 80px;
  }
/deep/.ivu-tooltip-popper {
  /deep/.ivu-tooltip-content {
    /deep/.ivu-tooltip-inner {
      word-break: break-all;
      white-space: pre-wrap;
      max-width: 500px;
      max-height: 500px;
      overflow-y: auto
    }
  }
}
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="7" class="col">
        <span class="span span-max">时间段</span>
        <DatePicker
          type="datetimerange"
          placeholder="开始时间~结束时间"
          v-model="duration"
          style="width: 350px"
          @on-change="selectTime"
        ></DatePicker>
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
import { findworkerrorloglist } from '@/api/security-audit'
export default {
  mixins: [mixin_table],
  data () {
    return {
      duration: '',
      params: {
        endTime: '',
        startTime: ''
      },
      columns: [
        {
          title: '序号',
          key: 'order',
          className: 'tb-header',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '时间',
          className: 'tb-header',
          align: 'center',
          width: 180,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.errorTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '报错服务',
          key: 'serverName',
          className: 'tb-header',
          align: 'center',
          width: 200
        },
        {
          title: '报错内容',
          key: 'errorInfo',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let span = h('span', params.row.errorInfo.substr(0, 200))
            let tooltip = h('Tooltip', {
              props: {
                content: params.row.errorInfo,
                theme: 'light',
                placement: 'top'
              }
            }, [span])
            return h('div', [tooltip])
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
    // 选择查询时间
    selectTime (time) {
      this.params.startTime = new Date(time[0]).getTime()
      this.params.endTime = new Date(time[1]).getTime()
      this.pageOpts.currentPage = 1
    },
    selectStatus () {
      this.pageOpts.currentPage = 1
    },
    clearParams () {
      this.params.startTime = ''
      this.params.endTime = ''
      this.duration.splice(0)
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
      findworkerrorloglist(params).then(res => {
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
