<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  @tab-height: 50px;
  /deep/.ivu-tabs-bar {
    background-color: #fff;
    height: @tab-height;
    border-bottom: none;
    margin-bottom: 0;
    /deep/.ivu-tabs-nav .ivu-tabs-tab {
      font-family:PingFang SC;
      height: @tab-height;
      line-height: 36px;
      color: #0972E7;
      font-weight: 500;
      font-size: 16px;
      min-width: 150px;
      text-align: center;
    }
    /deep/.ivu-tabs-nav .ivu-tabs-tab-active {
      color: #FF9B29;
    }
    /deep/.ivu-tabs-ink-bar {
      background-color: #FF9B29;
    }
  }
  /deep/.ivu-tabs-content {
    height: calc(~'100% - 56px');
    background-color: #fff;
  }
  /deep/.ivu-tabs-tabpane {
    height: 100%;
    background-color: #fff;
  }
  .disqualified-unit {
    margin-top: 30px;
  }
</style>
<template>
  <div>
    <!-- 指标单位、标签库 -->
    <Tabs>
      <TabPane label="指标单位">
        <Row class="content">
          <Col class="btn-add" v-if="btnShow(110105101)">
            <Button type="primary" class="add" icon="md-add" @click="openAddModal">新增指标单位</Button>
          </Col>
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
      </TabPane>
      <TabPane label="标签库">
        <Row class="content">
          <Col class="btn-add" v-if="btnShow(111101101)">
            <Button type="primary" class="add" icon="md-add" @click="openAddModal1">新增标签</Button>
          </Col>
          <Col>
            <Table :row-class-name="rowClassName" :columns="columns1" :data="data1" :border="false"></Table>
          </Col>
          <Col class="page">
            <Page
              :total="total1"
              :page-size="pageOpts1.pagesize"
              :current="pageOpts1.currentPage"
              prev-text="上一页"
              next-text="下一页"
              @on-change="pageChange1"
              @on-page-size-change="onPageSizeChange1"
              show-sizer
              show-total
              show-elevator
              :page-size-opts="pageSizeOpts"
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    <!-- 新增或修改指标单位 -->
    <Modal
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">创建单位</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <FormItem prop="unitName" label="单位名称">
          <Input type="text" v-model="addFromLine.unitName" placeholder="请输入单位名称" maxlength="8" show-word-limit />
        </FormItem>
        <FormItem prop="unitDesc" label="用途说明">
          <Input type="textarea" v-model="addFromLine.unitDesc" placeholder="请添加单位说明；如：家，3家公司" maxlength="50" show-word-limit />
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addUnit">确定</Button>
      </div>
    </Modal>
    <!-- 新增指标签 -->
    <Modal
      v-model="addModalShow1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">创建标签</div>
      <Form ref="addForm1" :model="addFromLine1" :rules="addFromRule1" :label-width="80" style="margin-top: 20px">
        <FormItem prop="lableName" label="标签名称">
          <Input type="text" v-model="addFromLine1.lableName" placeholder="请输入标签名称" maxlength="8" show-word-limit />
        </FormItem>
        <FormItem prop="lableDesc" label="标签说明">
          <Input type="textarea" v-model="addFromLine1.lableDesc" placeholder="请添加单位说明；如：家，3家公司" maxlength="50" show-word-limit />
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addIndexlable">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  indexperuintAdd,
  indexperuintDel,
  indexperuintUpdate,
  indexperuintList,
  indexlableAdd,
  indexlableDel,
  indexlableUpdate,
  indexlableList
} from '@/api/system-setting'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 表单参数（单位）
      addFromLine: {
        id: '',
        unitName: '',
        unitDesc: ''
      },
      addFromRule: {
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入单位名称', trigger: 'blur' }
        ],
        unitDesc: [
          { required: true, message: '请输入单位说明', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入单位说明', trigger: 'blur' }
        ]
      },
      // 表单参数（标签）
      addFromLine1: {
        id: '',
        lableName: '',
        lableDesc: ''
      },
      addFromRule1: {
        lableName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入标签名称', trigger: 'blur' }
        ],
        lableDesc: [
          { required: true, message: '请输入标签说明', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入标签说明', trigger: 'blur' }
        ]
      },
      // 代开新增单位modal
      addModalShow: false,
      // 打开新增标签modal
      addModalShow1: false,
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
          title: '单位',
          key: 'unitName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '用途说明',
          key: 'unitDesc',
          className: 'tb-header',
          align: 'center'
        },
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
            let editIcon = h('Icon', {
              props: {
                type: 'ios-create-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.editData(params)
                }
              }
            })
            // 删除
            let deleteIcon = h('Icon', {
              props: {
                type: 'ios-trash-outline',
                size: '24',
                color: 'red'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '删除账户',
                    content: `正在删除单位“${params.row.unitName}”，删除后会对已使用该单位的指标造成影响`,
                    onOk: () => {
                      this.deleteData(params)
                    }
                  })
                }
              }
            })
            return h('div', [this.btnShow(110105102) && editIcon, this.btnShow(110105103) && deleteIcon])
          }
        }
      ],
      columns1: [
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
        //   title: '关联指标数',
        //   key: 'links',
        //   className: 'tb-header',
        //   align: 'center'
        // },
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
            let editIcon = h('Icon', {
              props: {
                type: 'ios-create-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.editData1(params)
                }
              }
            })
            // 删除
            let deleteIcon = h('Icon', {
              props: {
                type: 'ios-trash-outline',
                size: '24',
                color: 'red'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '删除账户',
                    content: '确定删除此标签吗？',
                    onOk: () => {
                      this.deleteData1(params)
                    }
                  })
                }
              }
            })
            return h('div', [this.btnShow(111101102) && editIcon, this.btnShow(111101103) && deleteIcon])
          }
        }
      ],
      // 单位
      data: [],
      // 标签
      data1: [],
      // 分页参数（单位）
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      // 分页参数（标签）
      total1: 0,
      pageOpts1: {
        pagesize: 10,
        currentPage: 1
      },
      isEdit: false
    }
  },
  created () {
    // 指标单位列表
    this.queryList()
    // 标签列表
    this.queryList1()
  },
  mounted () {
  },
  methods: {
    // 打开新增指标单位页面
    openAddModal () {
      this.addModalShow = true
      this.addFromLine.id = ''
      this.addFromLine.unitName = ''
      this.addFromLine.unitDesc = ''
      this.isEdit = false
    },
    // 打开新增标签页面
    openAddModal1 () {
      this.addModalShow1 = true
      this.addFromLine1.id = ''
      this.addFromLine1.lableName = ''
      this.addFromLine1.lableDesc = ''
      this.isEdit = false
    },
    // 新增指标单位
    addUnit () {
      let params = {
        ...this.addFromLine
      }
      if (params.unitName === '' || params.unitDesc === '') return
      if (!this.isEdit) {
        indexperuintAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      } else {
        indexperuintUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      }
    },
    // 新增标签
    addIndexlable () {
      let params = {
        ...this.addFromLine1
      }
      if (params.lableName === '' || params.lableDesc === '') return
      if (!this.isEdit) {
        indexlableAdd(params).then(res => {
          console.log(res)
          if (res.data.code === 10000) {
            this.queryList1()
            this.$Message.success(res.data.msg)
            this.addModalShow1 = false
          }
        })
      } else {
        indexlableUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList1()
            this.$Message.success(res.data.msg)
            this.addModalShow1 = false
          }
        })
      }
    },
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      this.queryList()
    },
    onPageSizeChange1 (pagesize) {
      this.pageOpts1.pagesize = pagesize
      this.queryList1()
    },
    // 翻页（指标单位）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 翻页（标签）
    pageChange1 (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 编辑单位
    editData (params) {
      this.addModalShow = true
      this.addFromLine.unitName = params.row.unitName
      this.addFromLine.unitDesc = params.row.unitDesc
      this.addFromLine.id = params.row.id
      this.isEdit = true
    },
    // 编辑标签
    editData1 (params) {
      console.log(params)
      this.addModalShow1 = true
      this.addFromLine1.lableName = params.row.lableName
      this.addFromLine1.lableDesc = params.row.lableDesc
      this.addFromLine1.id = params.row.id
      this.isEdit = true
    },
    // 删除数据
    deleteData (params) {
      indexperuintDel(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.queryList()
        }
      })
    },
    // 删除数据
    deleteData1 (params) {
      indexlableDel(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.queryList1()
        }
      })
    },
    // 查询数据（单位）
    queryList () {
      let params = {
        ...this.pageOpts
      }
      indexperuintList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询数据（标签）
    queryList1 () {
      let params = {
        ...this.pageOpts1
      }
      indexlableList(params).then(res => {
        if (res.data.code === 10000) {
          this.data1 = res.data.data.dataList
          this.total1 = res.data.data.total
        }
      })
    }
  }
}
</script>
