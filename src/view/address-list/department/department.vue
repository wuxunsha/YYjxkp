<style lang='less' scoped>
@import url('~@/common/less/global.less');
.form-content {
  .from-content {
    padding: 20px 20px 0;
    background-color: #fff;
    .place-unit {
      p {
        font-size: 18px;
        font-weight: 500;
        color: rgb(112, 96, 250)
      }
    }
    .header-search {
      padding: 0!important;
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
                <span>当前单位：</span>
                <span>{{myOrg}}</span>
              </p>
            </Col>
          </Row>
          <!-- 搜索区域 -->
          <Row class="header-search">
            <Col span="6" class="col">
              <span class="span span-max" style="text-align: center;">姓名</span>
              <Input v-model='queryInfo.name' size="large" placeholder="请输入姓名" clearable/>
            </Col>
            <Col span="6" class="col area">
              <span class="span span-max" style="text-align: center;">性别</span>
              <Select v-model="queryInfo.sex" placeholder="请选择性别" size="large" @on-change="sexChange">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6" class="col">
              <span class="span span-max" style="text-align: center;">电话号码</span>
              <Input v-model='queryInfo.phone' size="large" placeholder="请输入电话号码" clearable/>
            </Col>
            <Col span="6" style="text-align: center;">
              <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
              <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
            </Col>
          </Row>
          <Row>
            <Table stripe :columns='columns' :data='tableList' disabled-hover>
            </Table>
          </Row>
          <Row class='page'>
            <Page :total='total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]" :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' />
          </Row>
        </Content>
      </div>
    </Layout>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  myOrgUserList
} from '@/api/address-list'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 当前机构
      myOrg: '',
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10,
        name: '',
        sex: '',
        phone: ''
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
      tableList: [],
      // 性别查询下拉框数据
      cityList: [
        {
          value: '0',
          label: '男'
        },
        {
          value: '1',
          label: '女'
        }
      ]
    }
  },

  created () {
    // 查询所在机构全部数据
    this.inquireAllData()
  },
  computed: {},
  methods: {
    // 获取所在机构数据
    getMyOrgUserList (data) {
      myOrgUserList(data).then(res => {
        if (res.data.code === 10000) {
          this.tableList = res.data.data.list.dataList
          this.myOrg = res.data.data.orgName
          this.total = res.data.data.list.total
        }
      })
    },
    // 查询所有数据
    inquireAllData () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      this.getMyOrgUserList(data)
    },
    // 根据姓名查询
    inquireName () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        nickName: this.queryInfo.name
      }
      this.getMyOrgUserList(data)
    },
    // 根据电话号码查询
    inquirePhone () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        mobPhone: this.queryInfo.phone
      }
      this.getMyOrgUserList(data)
    },
    // 根据性别查询
    inquireSex () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        sex: this.queryInfo.sex
      }
      this.getMyOrgUserList(data)
    },
    // 姓名+性别查询
    inquireNameSex () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        nickName: this.queryInfo.name,
        sex: this.queryInfo.sex
      }
      this.getMyOrgUserList(data)
    },
    // 姓名+电话号码查询
    inquireNamePhone () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        nickName: this.queryInfo.name,
        mobPhone: this.queryInfo.phone
      }
      this.getMyOrgUserList(data)
    },
    // 性别+电话号码查询
    inquireSexPhone () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        sex: this.queryInfo.sex,
        mobPhone: this.queryInfo.phone
      }
      this.getMyOrgUserList(data)
    },
    // 姓名+性别+电话号码查询
    inquireNameSexPhone () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        nickName: this.queryInfo.name,
        sex: this.queryInfo.sex,
        mobPhone: this.queryInfo.phone
      }
      this.getMyOrgUserList(data)
    },
    // 性别下拉框数据改变
    sexChange () {
      if (!this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.queryInfo.page = 1
        this.inquireSex()
      } else if (this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.queryInfo.page = 1
        this.inquireNameSex()
      } else if (!this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.queryInfo.page = 1
        this.inquireSexPhone()
      } else if (this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.queryInfo.page = 1
        this.inquireNameSexPhone()
      }
    },
    // 点击查询按钮
    inquire () {
      this.queryInfo.page = 1
      if (this.queryInfo.name && !this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireName()
      } else if (!this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSex()
      } else if (!this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquirePhone()
      } else if (this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSex()
      } else if (this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireNamePhone()
      } else if (!this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSexPhone()
      } else if (this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSexPhone()
      } else {
        this.inquireAllData()
      }
    },
    // 清空
    empty () {
      this.queryInfo = {
        page: 1,
        size: 10,
        name: '',
        sex: '',
        phone: ''
      }
      this.inquireAllData()
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.name && !this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireName()
      } else if (!this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSex()
      } else if (!this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquirePhone()
      } else if (this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSex()
      } else if (this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireNamePhone()
      } else if (!this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSexPhone()
      } else if (this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSexPhone()
      } else {
        this.inquireAllData()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.name && !this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireName()
      } else if (!this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSex()
      } else if (!this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquirePhone()
      } else if (this.queryInfo.name && !this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSex()
      } else if (this.queryInfo.name && this.queryInfo.phone && !this.queryInfo.sex) {
        this.inquireNamePhone()
      } else if (!this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireSexPhone()
      } else if (this.queryInfo.name && this.queryInfo.phone && this.queryInfo.sex) {
        this.inquireNameSexPhone()
      } else {
        this.inquireAllData()
      }
    }
  }
}
</script>
