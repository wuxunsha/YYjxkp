<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-icon {
  margin-right: 6px;
}
.form-content {
  // 切换导航栏
  .steps {
    width: 100%;
    height: 50px;
    background-color: #fff;
    .tabs {
      margin-top: 13px;
      .tabs-title {
        padding-bottom: 11px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color:rgba(9,114,231,1);
        cursor: pointer;
      }
      .active {
        color: #FF9B29;
        border-bottom: 2px solid #FF9B29;
      }
    }
  }
  // 表格内容
  .content {
    .table {
      // 待送审
      .stayToSubmit {
        color: #FF9B29;
      }
      // 审核通过
      .passAudit {
        color: #0972E7;
      }
      // 审核不通过
      .noPassAudit {
        color: #E2001E;
      }
      // 待审核
      .stayAudit {
        color: #458B00;
      }
    }
  }
}
</style>

<template>
  <div>
    <Layout>
        <!-- 内容 -->
      <div class='form-content'>
          <!-- 导航切换栏 -->
        <Row class='steps'>
          <Row class='tabs'>
            <Col span='3' v-for="(item, index) in tabList" :class="index == nowIndex ? 'tabs-title active' : 'tabs-title'" :key="index" @click.native="tableBtn(item.orgType,index)"><span>{{item.orgtypeName}}</span></Col>
          </Row>
        </Row>
        <!-- 表格内容 -->
        <Row class="content">
          <Row class="table">
            <Table :row-class-name="rowClassName" :columns='columns' :data="pySumList" :border="false">
              <template slot='status' slot-scope="{ row }">
                <span :class="row.status == 0 ? 'stayToSubmit': row.status == 1 ? 'stayAudit': row.status == 2 ? 'passAudit' : 'noPassAudit'">{{row.status == 0 ? '待送审': row.status == 1 ? '待审核': row.status == 2 ? '审核通过' : '审核不通过'}}</span>
              </template>
              <template slot='operation' slot-scope="{ row }">
                <!-- 编辑 -->
                 <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" @click="editDraft(row.id)" v-if="btnShow(123101105) && row.status === 0 || row.status === 3"></Icon>
                <!-- 查看 -->
                <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineDraft(row.id)" v-if="btnShow(123101103) && row.status === 1 || row.status === 2"></Icon>
                <!-- 送审 -->
                <Icon class="icon-font icondaishenhe" size="24" color="#0972E7" title="送审" @click="submit(row.id)" v-if="btnShow(123101108) && row.status === 0 || row.status === 3"></Icon>
               </template>
            </Table>
          </Row>
          <Row class='page'>
            <Page :total='total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]" :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' prev-text="上一页" next-text="下一页"/>
          </Row>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getPageTable,
  getPySum,
  toSubmit
} from '@/api/statistical'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 高亮索引
      nowIndex: 0,
      // 页签数据
      tabList: [],
      // 查询条件
      queryInfo: {
        tab: null,
        page: 1,
        size: 3
      },
      // 数据总条数
      total: 0,
      // 表格参数
      columns: [
        {
          title: '序号',
          key: 'id',
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
          title: '考核周期',
          key: 'years',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '状态',
          slot: 'status',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      pySumList: []
    }
  },

  created () {
    // 获取页签
    this.getPageTabType()
  },
  methods: {
    // 获取页签
    getPageTabType () {
      getPageTable().then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data
          this.queryInfo.tab = res.data.data[0].orgType
          this.getPySumCollectListAll()
        }
      })
    },
    // 切换页签
    tableBtn (orgType, i) {
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getPySumCollectListAll()
    },
    // 根据页签获取年度待送审计分汇总列表（待送审）
    getPySumCollectList (data) {
      getPySum(data).then(res => {
        if (res.data.code === 10000) {
          this.pySumList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询全部送审计分汇总列表
    getPySumCollectListAll () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab
      }
      this.getPySumCollectList(data)
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getPySumCollectListAll()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getPySumCollectListAll()
    },
    // 编辑计分详情页
    editDraft (id) {
      this.$router.push({
        path: 'edit_scoring', query: { id: id }
      })
    },
    // 查看计分详情页
    examineDraft (id) {
      this.$router.push({
        path: 'examine_scoring', query: { id: id }
      })
    },
    // 送审
    submit (id) {
      toSubmit(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交成功')
          this.getPySumCollectListAll()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
