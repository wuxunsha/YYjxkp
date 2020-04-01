<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
  padding-bottom: 20px;
}
.ivu-form-item {
  margin-top: 10px;
  margin-bottom: 0;
}
/deep/.ivu-form-item-label {
  width: 80px;
  text-align: center;
}
/deep/.ivu-form-item-content {
  margin-left: 80px;
}
// 审核对话框
.modal {
  .reject-input {
    padding: 40px 40px 0;
    /deep/textarea.ivu-input {
      resize: none;
      outline: none;
      min-height: 200px;
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
    <Row class="header-search">
      <Col span="6" class="col">
        <span class="span span-max" style="text-align: center;">标题</span>
        <Input v-model="queryInfo.title" size="large" placeholder="请输入标题" clearable />
      </Col>
      <Col span="6" class="col area">
        <span class="span span-max" style="text-align: center;">分类</span>
        <Select v-model="queryInfo.classify" placeholder="全部分类" @on-change="classifyChange" size="large">
          <Option v-for="item in classifyList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col span="6" class="col area">
        <span class="span span-max" style="text-align: center;">状态</span>
        <Select v-model="queryInfo.status" placeholder="全部状态" @on-change="statusChange" size="large">
          <Option v-for="item in statusList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col span="6" style="text-align: center;">
        <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
        <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
      </Col>
    </Row>
    <Row class="content">
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="findAuditList" :border="false">
          <template slot='createTime' slot-scope="{ row }">
            {{row.createTime | dateYMD}}
          </template>
          <template slot='status' slot-scope="{ row }">
            {{row.status === 1 ? '初稿' : row.status === 2 ? '驳回' : row.status === 3 ? '待发布' : row.status === 4 ? '已发布' : row.status === 5 ? '已下线' : '待审核'}}
          </template>
          <template slot='operation' slot-scope="{ row }">
            <Icon class="icon-font icondaishenhe" size="24" color="#00DD00" title="审核" @click="auditModal(row.id)" v-if="btnShow(115111101) && row.status !== 2"/>
          </template>
        </Table>
      </Col>
      <Col class="page">
        <Page
          :total="total"
          :page-size="queryInfo.size"
          :current="queryInfo.page"
          prev-text="上一页"
          next-text="下一页"
          @on-change='handlePageChange'
          @on-page-size-change='handleSizeChange'
          show-sizer
          show-total
          show-elevator
          :page-size-opts="[10, 20, 30, 50]"
        />
      </Col>
    </Row>

    <!-- 审核对话框 -->
    <Modal v-model="modal" width="60%" class="modal">
      <div style="text-align:center" class="reject-input">
        <Input v-model="reject" type="textarea" placeholder="驳回需要输入备注……" />
      </div>
      <div slot="footer">
        <Button type="info" class="reject-btn" @click="turnDown">驳回</Button>
        <Button type="primary" class="pass-btn" @click="pass">通过</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  findAudit,
  getlistbytype,
  passAudit,
  rejectAudit
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10,
        title: '',
        classify: '',
        status: ''
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
          title: '标题',
          key: 'title',
          className: 'tb-header',
          align: 'center',
          tooltip: true
        },
        {
          title: '内容摘要',
          key: 'content',
          className: 'tb-header',
          align: 'center',
          tooltip: true
        },
        {
          title: '分类',
          key: 'infoTypeName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '创建时间',
          slot: 'createTime',
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
      // 分类查询下拉框数据
      classifyList: [],
      // 状态查询下拉框数据
      statusList: [],
      // 表单数据
      findAuditList: [],
      // 审核对话框开关
      modal: false,
      // 驳回备注内容
      reject: ''
    }
  },
  created () {
    // 获取绩效资讯待审核列表
    this.getFindAuditList()
    // 查询分类下拉框数据
    this.getClassifyList()
    // 查询状态下拉框数据
    this.getStatusList()
  },
  computed: {},
  methods: {
    // 查询绩效资讯待审核列表
    getFindAuditList () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size
      }
      this.getFindAuditListAll(data)
    },
    // 查询分类下拉框数据
    getClassifyList () {
      getlistbytype(7).then(res => {
        if (res.data.code === 10000) {
          res.data.data.forEach((item, index) => {
            if (index === 1 || index === 4 || index === 5) {
              this.classifyList.push(item)
            }
          })
        }
      })
    },
    // 查询状态下拉框数据
    getStatusList () {
      getlistbytype(9).then(res => {
        if (res.data.code === 10000) {
          let arr = []
          const data = res.data.data
          data.forEach(item => {
            if (item.nameValue === '2' || item.nameValue === '6') {
              arr.push(item)
            }
          })
          this.statusList = arr
        }
      })
    },
    // 查询待审核全部列表
    getFindAuditListAll (data) {
      findAudit(data).then(res => {
        if (res.data.code === 10000) {
          this.findAuditList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 标题查询
    getTitleInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title
      }
      this.getFindAuditListAll(data)
    },
    // 分类查询
    classifyInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        infoType: this.queryInfo.classify
      }
      this.getFindAuditListAll(data)
    },
    // 状态查询
    statusInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        status: Number(this.queryInfo.status)
      }
      this.getFindAuditListAll(data)
    },
    // 标题+分类查询
    titleClassifyInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        infoType: this.queryInfo.classify
      }
      this.getFindAuditListAll(data)
    },
    // 分类+状态查询
    classifyStatusInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        status: this.queryInfo.status,
        infoType: this.queryInfo.classify
      }
      this.getFindAuditListAll(data)
    },
    // 状态+标题查询
    statusTitleInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        status: this.queryInfo.status
      }
      this.getFindAuditListAll(data)
    },
    // 状态+标题+分类查询
    statusTitleSortTypeInqire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        status: this.queryInfo.status,
        infoType: this.queryInfo.classify
      }
      this.getFindAuditListAll(data)
    },
    // 分类下拉框改变查询
    classifyChange () {
      this.queryInfo.page = 1
      if (this.queryInfo.title && !this.queryInfo.status) {
        this.titleClassifyInqire()
      } else if (this.queryInfo.status && !this.queryInfo.title) {
        this.classifyStatusInqire()
      } else if (this.queryInfo.title && this.queryInfo.status) {
        this.statusTitleSortTypeInqire()
      } else {
        this.classifyInqire()
      }
    },
    // 状态下拉框改变查询
    statusChange () {
      this.queryInfo.page = 1
      if (this.queryInfo.title && !this.queryInfo.classify) {
        this.statusTitleInqire()
      } else if (this.queryInfo.classify && !this.queryInfo.title) {
        this.classifyStatusInqire()
      } else if (this.queryInfo.classify && this.queryInfo.title) {
        this.statusTitleSortTypeInqire()
      } else {
        this.statusInqire()
      }
    },
    // 点击查询按钮
    inquire () {
      this.queryInfo.page = 1
      if (this.queryInfo.title && !this.queryInfo.classify && !this.queryInfo.status) {
        this.getTitleInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.classifyInqire()
      } else if (!this.queryInfo.title && !this.queryInfo.classify && this.queryInfo.status) {
        this.statusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.titleClassifyInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.classifyStatusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.statusTitleSortTypeInqire()
      } else {
        this.getFindAuditList()
      }
    },
    // 清空
    empty () {
      this.queryInfo = {
        page: 1,
        size: 10,
        title: '',
        classify: '',
        status: ''
      }
      this.getFindAuditList()
    },
    // 打开审核对话框
    auditModal (id) {
      this.modal = true
      this.scoringId = id
    },
    // 审核通过
    pass () {
      passAudit(this.scoringId).then(res => {
        if (res.data.code === 10000) {
          this.modal = false
          this.$Message.success('审核通过')
          this.getFindAuditList()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 驳回
    turnDown () {
      if (this.reject) {
        const data = {
          id: this.scoringId,
          reason: this.reject
        }
        rejectAudit(data).then(res => {
          if (res.data.code === 10000) {
            this.modal = false
            this.$Message.success('驳回成功')
            this.getFindAuditList()
          }
        })
      } else {
        return this.$Message.error('请提交驳回备注信息')
      }
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.title && !this.queryInfo.classify && !this.queryInfo.status) {
        this.getTitleInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.classifyInqire()
      } else if (!this.queryInfo.title && !this.queryInfo.classify && this.queryInfo.status) {
        this.statusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.titleClassifyInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.classifyStatusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.statusTitleSortTypeInqire()
      } else {
        this.getFindAuditList()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.title && !this.queryInfo.classify && !this.queryInfo.status) {
        this.getTitleInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.classifyInqire()
      } else if (!this.queryInfo.title && !this.queryInfo.classify && this.queryInfo.status) {
        this.statusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && !this.queryInfo.status) {
        this.titleClassifyInqire()
      } else if (!this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.classifyStatusInqire()
      } else if (this.queryInfo.title && this.queryInfo.classify && this.queryInfo.status) {
        this.statusTitleSortTypeInqire()
      } else {
        this.getFindAuditList()
      }
    }
  }
}
</script>
