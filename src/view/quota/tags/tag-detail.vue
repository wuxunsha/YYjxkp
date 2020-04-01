<style lang="less" scoped>
  @import url('~@/common/less/global.less');
</style>
<template>
  <div>
    <Row type="flex" justify="center" style="background-color: #fff; padding-top: 15px; padding-bottom: 15px">
      <Col>
        <strong><h3 style="color: #333333">GDP标签使用详情</h3></strong>
      </Col>
    </Row>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="5" class="col">
        <span class="span span-max">指标名称</span>
        <Input v-model="params.orgName" placeholder="请输入指标名称" size="large" clearable />
      </Col>
      <Col span="5" offset="1" class="col">
        <span class="span span-max">指标年份</span>
        <Select v-model="params.year">
          <Option v-for="item in years" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="5" offset="1" class="col">
        <span class="span span-max">指标级别</span>
        <Select v-model="params.level">
          <Option v-for="item in levels" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col offset="2" span="5" style="display: flex; justify-content: flex-end">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 搜索结果 -->
    <Row class="content">
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="data" :border="false"></Table>
      </Col>
      <Col class="page" v-if="total.length > pageOpts.pagesize">
        <Page
          :total="total"
          :page-size="pageOpts.pagesize"
          :current="pageOpts.currentPage"
          prev-text="上一页"
          next-text="下一页"
          @on-change="pageChange"
          show-elevator
        />
      </Col>
    </Row>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import { indexlableinfo } from '@/api/quota'
export default {
  mixins: [mixin_table],
  data () {
    return {
      params: {
        orgName: '',
        year: '',
        level: ''
      },
      levels: [
        {
          value: 1,
          label: '市级指标'
        },
        {
          value: 2,
          label: '区县指标'
        }
      ],
      years: [
        {
          value: 1,
          label: '2108年'
        },
        {
          value: 2,
          label: '2109年'
        },
        {
          value: 3,
          label: '2110年'
        }
      ],
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
          title: '指标名称',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标年份',
          key: 'orgTypeName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '机构',
          key: 'busiType',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标级别',
          key: 'leaderName',
          className: 'tb-header',
          align: 'center'
        }
      ],
      data: [],
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      }
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
    console.log(this.$route.params.id)
  },
  methods: {
    // 翻页
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 查询数据
    queryList () {
      // let params = {
      //   ...this.params,
      //   ...this.pageOpts
      // }
      indexlableinfo(this.$route.params.id).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 清楚搜索条件
    clearParams () {
      this.params.orgName = ''
    }
  }
}
</script>
