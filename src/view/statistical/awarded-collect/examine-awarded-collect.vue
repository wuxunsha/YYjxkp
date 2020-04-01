<style lang='less' scoped>
@import url('~@/common/less/global.less');
.content {
  // 表格内容
  .from-content {
    margin-top: 14px;
    padding: 16px 20px 0;
    background-color: #fff;
  }
}
</style>

<template>
  <div>
    <Layout>
      <div class="content">
        <Row class="header-search">
          <Col span="7" class="col">
            <span class="span span-max">单位名称</span>
            <Input v-model='queryInfo.unitName' size="large" placeholder="请输入单位名称" clearable />
          </Col>
          <Col span="7" class="col area" offset="1">
            <span class="span span-max">所属分类</span>
            <Select v-model="queryInfo.classify" placeholder="默认所有部门" @on-change="selectHandel(queryInfo.classify)" size="large">
               <Option v-for="(item, index) in cityList" :value="item.value" :key="index">{{ item.name }}</Option>
            </Select>
          </Col>
          <Col offset="1" span="7" style="text-align: right;">
            <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
            <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
          </Col>
        </Row>
        <Content class='from-content'>
          <Col class="btn-add">
            <Button type='primary' class="add" @click="downloadTable" v-if="btnShow(123105101)">
              <Icon class="icon-font iconxiazai-"></Icon>
              下载表格
            </Button>
          </Col>
          <Col>
            <Table :row-class-name="rowClassName" :columns='columns' :data="innoPointList" :border="false">
            </Table>
          </Col>
          <Row class='page'>
            <Page :total='total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]" :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' prev-text="上一页" next-text="下一页"/>
          </Row>
        </Content>
      </div>
    </Layout>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getInnoPoint,
  getDatadict
} from '@/api/statistical'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 查询条件
      queryInfo: {
        tab: null,
        page: 1,
        size: 10,
        unitName: '',
        classify: ''
      },
      // 数据总条数
      total: 0,
      // 分类下拉框数据
      cityList: [],
      // 表格参数
      columns: [
        {
          type: 'index',
          title: '序号',
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
          title: '单位名称',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '所属分类',
          key: 'busiTypeName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '加分',
          key: 'score',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      innoPointList: [],
      // 下载域名
      downloadUrl: 'http://47.112.144.243:9092'
    }
  },

  created () {
    // 查询出机构所属分类
    this.getDatadictType()
    // 获取创新创优加分汇总列表（查看详情）
    this.getInnoPointListAll()
  },

  computed: {},

  methods: {
    // 查询出机构所属分类
    getDatadictType () {
      getDatadict().then(res => {
        if (res.data.code === 10000) {
          this.cityList = res.data.data
        }
      })
    },
    // 获取创新创优加分汇总列表（查看详情）
    getInnoPoint (data) {
      getInnoPoint(data).then(res => {
        if (res.data.code === 10000) {
          this.innoPointList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询
    inquire () {
      if (this.queryInfo.unitName && !this.queryInfo.classify) {
        this.queryInfo.page = 1
        this.UnitNameInquire()
      } else if (!this.queryInfo.unitName && !this.queryInfo.classify) {
        this.queryInfo.page = 1
        this.getInnoPointListAll()
      } else {
        this.queryInfo.page = 1
        this.relevanceInquire()
      }
    },
    // 查询全部列表
    getInnoPointListAll () {
      const data = {
        perYearSummaryId: this.$route.query.id,
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      this.getInnoPoint(data)
    },
    // 单位名称查询
    UnitNameInquire () {
      const data = {
        orgName: this.queryInfo.unitName,
        perYearSummaryId: this.$route.query.id,
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      this.getInnoPoint(data)
    },
    // 所属分类查询
    selectHandel (id) {
      let classifyId = id + ''
      if (this.queryInfo.unitName) {
        const data = {
          busiType: classifyId,
          orgName: this.queryInfo.unitName,
          perYearSummaryId: this.$route.query.id,
          pageIndex: this.queryInfo.page,
          pageSize: this.queryInfo.size
        }
        this.getInnoPoint(data)
      } else if (this.queryInfo.classify && !this.queryInfo.unitName) {
        const data = {
          busiType: classifyId,
          perYearSummaryId: this.$route.query.id,
          pageIndex: this.queryInfo.page,
          pageSize: this.queryInfo.size
        }
        this.getInnoPoint(data)
      } else {
        const data = {
          perYearSummaryId: this.$route.query.id,
          pageIndex: this.queryInfo.page,
          pageSize: this.queryInfo.size
        }
        this.getInnoPoint(data)
      }
    },
    // 所属单位和分类一起查询
    relevanceInquire () {
      let classifyId = this.queryInfo.classify + ''
      const data = {
        orgName: this.queryInfo.unitName,
        busiType: classifyId,
        perYearSummaryId: this.$route.query.id,
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      this.getInnoPoint(data)
    },
    // 清空
    empty () {
      this.queryInfo.unitName = ''
      this.queryInfo.classify = ''
      this.queryInfo.page = 1
    },
    // 下载表格
    downloadTable () {
      if (this.queryInfo.unitName && !this.queryInfo.classify) {
        location.href = this.downloadUrl + '/statdata/uploadExcel?orgName=' + this.queryInfo.unitName + '&perYearSummaryId=' + this.$route.query.id
      } else if (this.queryInfo.classify && !this.queryInfo.unitName) {
        location.href = this.downloadUrl + '/statdata/uploadExcel?busiType=' + this.queryInfo.classify + '&perYearSummaryId=' + this.$route.query.id
      } else if (this.queryInfo.unitName && this.queryInfo.classify) {
        location.href = this.downloadUrl + '/statdata/uploadExcel?orgName=' + this.queryInfo.unitName + '&perYearSummaryId=' + this.$route.query.id + '&busiType=' + this.queryInfo.classify
      } else {
        location.href = this.downloadUrl + '/statdata/uploadExcel?perYearSummaryId=' + this.$route.query.id
      }
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getInnoPointListAll()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getInnoPointListAll()
    }
  }
}
</script>
