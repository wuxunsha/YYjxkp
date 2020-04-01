<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
  padding-bottom: 20px;
}
/deep/.ivu-icon {
  margin-right: 6px;
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
  <div class='layout'>
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
          <Row class="table">
            <Table stripe :columns='columns' :data="pySumYearList" disabled-hover>
              <template slot='status' slot-scope="{ row }">
                <span :class="row.status == 0 ? 'stayToSubmit': row.status == 1 ? 'stayAudit': row.status == 2 ? 'passAudit' : 'noPassAudit'">{{row.status == 1 ? '待审核': row.status == 2 ? '审核通过' : '审核不通过'}}</span>
              </template>
              <template slot='operation' slot-scope="{ row }">
                <!-- 查看 -->
                <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineDraft(row.id)" v-if="btnShow(123101103)"></Icon>
                <!-- 审核 -->
                 <Icon class="icon-font icondaishenhe" size="24" color="#0972E7" title="审核" @click="auditModal(row.id)" v-if="btnShow(123102102) && row.status === 1"></Icon>
               </template>
            </Table>
          </Row>
          <Row class='page'>
            <Page :total='total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]"  :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' prev-text="上一页" next-text="下一页"/>
          </Row>
        </Content>
      </div>
    </Layout>

    <!-- 审核对话框 -->
    <Modal v-model="modal" width="60%" class="modal">
      <div style="text-align:center" class="reject-input">
        <Input v-model="reject" type="textarea" placeholder="驳回需要输入备注……" />
      </div>
      <div slot="footer">
        <Button type="info" class="reject-btn" @click="rejectAudit">驳回</Button>
        <Button type="primary" class="pass-btn" @click="passAudit">通过</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getPageTable,
  getPySumYear,
  pySumAudit
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
        size: 3,
        year: '',
        area: ''
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
      pySumYearList: [],
      // 审核对话框开关
      modal: false,
      // 年度汇总数据id
      scoringId: null,
      // 驳回备注内容
      reject: ''
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
    // 根据页签获取年度待送审计分汇总列表（待送审）
    getPySumCollectList (data) {
      getPySumYear(data).then(res => {
        if (res.data.code === 10000) {
          this.pySumYearList = res.data.data.dataList
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
    // 切换页签
    tableBtn (orgType, i) {
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getPySumCollectListAll()
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
    // 查看计分详情页
    examineDraft (id) {
      this.$router.push({
        path: 'view_details', query: { id: id }
      })
    },
    // 打开审核对话框
    auditModal (id) {
      this.modal = true
      this.scoringId = id
    },
    // 审核通过
    passAudit () {
      const data = {
        id: this.scoringId,
        status: 2
      }
      pySumAudit(data).then(res => {
        if (res.data.code === 10000) {
          this.modal = false
          this.$Message.success('审核成功')
          this.getPySumCollectListAll()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 驳回
    rejectAudit () {
      if (this.reject) {
        const data = {
          remark: this.reject,
          id: this.scoringId,
          status: 3
        }
        pySumAudit(data).then(res => {
          if (res.data.code === 10000) {
            this.modal = false
            this.$Message.success('驳回成功')
            this.getPySumCollectListAll()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      } else {
        return this.$Message.error('请提交驳回备注信息')
      }
    }
  }
}
</script>
