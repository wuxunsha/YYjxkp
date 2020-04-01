<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-tree ul li {
  margin: 0;
  padding: 0;
}
/deep/.ivu-tree ul {
  margin-top: 10px;
  font-size: 16px;
}
/deep/.ivu-tree ul li {
  margin-top: 10px;
}
.form-content {
  .from-content {
    padding: 20px 20px 0;
    background-color: #fff;
    .place-unit {
      margin-bottom: 10px;
      p {
        font-size: 18px;
        font-weight: 500;
        color: rgb(112, 96, 250)
      }
    }
    /* 分页 */
    .page {
      text-align: center;
      padding: 34px 0 100px;
    }
  }
}
</style>

<template>
  <div class='layout'>
    <Layout>
      <div class='form-content'>
        <Content class='from-content'>
          <Row class="place-unit">
            <Col span="24">
              <p>
                <span>机构：</span>
                <span>{{org}}</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span="4" style="height: 37.8125rem;overflow: auto;">
              <Tree :data="data1" :load-data="loadData" @on-select-change="treeChange"></Tree>
            </Col>
            <Col span="20">
              <Row>
                <Table stripe :columns='columns' :data='tableList' disabled-hover>
                </Table>
              </Row>
              <Row class='page'>
                <Page :total='total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]" :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' />
              </Row>
            </Col>
          </Row>
        </Content>
      </div>
    </Layout>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  maninfo,
  orgList
} from '@/api/address-list'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 所选机构
      org: '益阳市',
      // 机构id
      orgId: 1,
      // 树形数据
      data1: [
        {
          title: '益阳市',
          loading: false,
          id: 1,
          children: []
        }
      ],
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10
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
          title: '姓名',
          key: 'nickName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '性别',
          key: 'sex',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let sexStr = params.row.sex === 0 ? '男' : (params.row.sex === 1 ? '女' : '-')
            return h('span', sexStr)
          }
        },
        {
          title: '职位',
          key: 'position',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '电话号码',
          key: 'mobPhone',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表单数据
      tableList: []
    }
  },

  created () {
    // 根据机构ID查询管理员
    this.getManinfo()
  },
  methods: {
    // 根据机构ID查询管理员
    getManinfo () {
      const data = {
        orgId: this.orgId,
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      maninfo(data).then(res => {
        if (res.data.code === 10000) {
          this.tableList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 异步加载子节点
    loadData (item, callback) {
      this.orgId = item.id
      this.getManinfo()
      let data = []
      const orgId = {
        parentId: this.orgId
      }
      orgList(orgId).then(res => {
        if (res.data.code === 10000) {
          data = res.data.data
        }
      })
      setTimeout(() => {
        callback(data)
      }, 1000)
    },
    // 点击树节点请求数据
    treeChange (item) {
      this.orgId = item[0].id
      this.getManinfo()
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getManinfo()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getManinfo()
    }
  }
}
</script>
