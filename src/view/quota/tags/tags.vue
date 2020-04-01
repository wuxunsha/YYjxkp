<style lang="less" scoped>
  @import url('~@/common/less/global.less');
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="10" class="col">
        <span class="span span-max">标签名</span>
        <Input v-model="params.lableName" placeholder="请输入标签名" size="large" clearable />
      </Col>
      <Col offset="10" span="4" style="display: flex; justify-content: flex-end">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 搜索结果 -->
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
import mixin_table from '@/common/mixin/table'
import { indexlablelist } from '@/api/quota'
export default {
  mixins: [mixin_table],
  data () {
    return {
      params: {
        lableName: ''
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
          title: '标签名',
          key: 'lableName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '标签说明',
          key: 'lableDesc',
          className: 'tb-header',
          align: 'center'
        },
        // {
        //   title: '分类',
        //   key: 'busiType',
        //   className: 'tb-header',
        //   align: 'center'
        // },
        {
          title: '关联指标数',
          key: 'assTotal',
          className: 'tb-header',
          align: 'center'
        }/* ,
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
                type: 'ios-shuffle',
                ...prop
              },
              on: {
                click: () => {
                  this.detailData(params)
                }
              }
            })
            let tooltip = h('Tooltip', {
              props: {
                content: '查看关联指标',
                theme: 'light',
                placement: 'top'
              }
            }, [detailIcon])
            return h('div', [tooltip])
          }
        } */
      ],
      data: [],
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      },
      pageSizeOpts: [10, 20, 50, 100]
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      this.queryList()
    },
    // 翻页
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 编辑
    detailData (params) {
      console.log('view detail:', params)
      this.$router.push({ path: `/quota/tag/detail/${params.row.id}` })
    },
    // 查询数据
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.orgType = params.orgType === '-1' ? '' : params.orgType
      indexlablelist(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 清楚搜索条件
    clearParams () {
      this.params.lableName = ''
      this.queryList()
    }
  }
}
</script>
