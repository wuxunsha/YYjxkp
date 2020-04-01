<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
  padding-bottom: 20px;
}
// 内容
.form-content {
  // 切换导航栏
  .steps {
    width: 100%;
    height: 50px;
    background-color: #fff;
    .tabs {
      margin-top: 16px;
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
}
// 审核对话框
.modal {
  .reject-input {
    padding: 40px 40px 0;
    /deep/textarea.ivu-input {
      resize: none;
      outline: none;
      height: 200px;
    }
  }
  /deep/.ivu-modal-footer {
    padding: 0 40px 50px;
    border-top: 0;
    .reject-btn {
      width: 130px;
      font-size:16px;
      font-weight:400;
      background:rgba(202,228,255,1);
      color:rgba(9,114,231,1);
      border: none;
    }
    .pass-btn {
      width: 130px;
      margin-left: 20px;
      font-size:16px;
      font-weight:400;
      border: none;
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
        <Content class='content'>
          <Row>
            <Table :row-class-name="rowClassName" :columns='columns' :data="PySumInnoList" :border="false">
              <template slot='operation' slot-scope="{ row }">
                <!-- 查看 -->
                <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineDraft(row.id)" v-if="btnShow(123106101)"></Icon>
               </template>
            </Table>
          </Row>
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
  getPageTable,
  getPySumInnoList
} from '@/api/statistical'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 高亮索引
      nowIndex: 0,
      // 页签
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
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      PySumInnoList: []
    }
  },
  created () {
    // 获取页签
    this.getInnoPageOrg()
  },
  methods: {
    // 获取页签
    getInnoPageOrg () {
      getPageTable().then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data
          this.queryInfo.tab = res.data.data[0].orgType
          this.getPySumInnoListAll()
        }
      })
    },
    // 切换页签
    tableBtn (orgType, i) {
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getPySumInnoListAll()
    },
    // 根据页签获取年度加分汇总列表（创新创优）
    getPySumInno (data) {
      getPySumInnoList(data).then(res => {
        if (res.data.code === 10000) {
          this.PySumInnoList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询全部送审计分汇总列表
    getPySumInnoListAll () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab
      }
      this.getPySumInno(data)
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getPySumInnoListAll()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getPySumInnoListAll()
    },
    // 查看加分详情页
    examineDraft (id) {
      this.$router.push({
        path: 'examine_awarded_particulars', query: { id: id }
      })
    }
  }
}
</script>
