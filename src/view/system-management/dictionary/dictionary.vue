<style lang="less" scoped>
  @import url('~@/common/less/global.less');
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="5" class="col">
        <span class="span span-max">字典名称</span>
        <Input v-model="params.name" placeholder="字典名称" clearable size="large" />
      </Col>
      <Col span="5" offset="1" class="col">
        <span class="span">状态</span>
        <Select v-model="params.status" clearable size="large" @click="selectStatus">
          <Option v-for="item in status" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col offset="1" span="10">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 字典维护 -->
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(110106101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal">新增数据字典</Button>
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
    <!-- 新增或修改数据字典 -->
    <Modal
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ addFromTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <FormItem prop="types" label="字典分类" v-if="!isEdit">
          <Input type="text" v-model="addFromLine.types" placeholder="请输入字典分类" />
        </FormItem>
        <FormItem prop="name" label="字典名称">
          <Input type="text" v-model="addFromLine.name" placeholder="请输入字典名称" />
        </FormItem>
        <FormItem prop="nameValue" label="字典数值" v-if="!isEdit">
          <Input type="text" v-model="addFromLine.nameValue" placeholder="请输入字典数值" />
        </FormItem>
        <FormItem prop="sort" label="字典排序">
          <Input type="text" v-model="addFromLine.sort" placeholder="请输入字典排序" />
        </FormItem>
        <FormItem prop="descs" label="描述">
          <Input type="textarea" v-model="addFromLine.descs" placeholder="请输入字典描述" />
        </FormItem>
        <FormItem prop="status" label="字典状态">
          <RadioGroup v-model="addFromLine.status">
            <Radio label="1">禁用</Radio>
            <Radio label="0">启用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addUnit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  datadictionaryAdd,
  datadictionaryDel,
  datadictionaryUpdate,
  datadictionaryList
} from '@/api/system-setting'
export default {
  mixins: [mixin_table],
  data () {
    return {
      status: [
        {
          value: 1,
          label: '禁用'
        },
        {
          value: 0,
          label: '启用'
        }
      ],
      addFromTitle: '',
      params: {
        name: '',
        status: ''
      },
      // 表单参数（单位）
      addFromLine: {
        id: '',
        name: '',
        types: '',
        nameValue: '',
        sort: '',
        descs: '',
        status: '0'
      },
      addFromRule: {
        name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入字典名称', trigger: 'blur' }
        ],
        types: [
          { required: true, message: '请输入字典KEY', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入字典KEY', trigger: 'blur' }
        ],
        nameValue: [
          { required: true, message: '请输入字典值', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入字典值', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择字典状态', trigger: 'blur' },
          { type: 'string', min: 1, message: '请选择字典状态', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填写字典排序', trigger: 'blur' },
          { type: 'string', min: 1, message: '请填写字典排序', trigger: 'blur' }
        ]
      },
      // 代开新增单位modal
      addModalShow: false,
      // 打开新增标签modal
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
          title: '字典分类',
          key: 'types',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '字典名称',
          key: 'name',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '字典值',
          key: 'nameValue',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '描述',
          key: 'descs',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            return h('span', [params.row.status === 0 ? '启用' : '禁用'])
          }
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
                    content: '确定删除此账户吗？',
                    onOk: () => {
                      this.deleteData(params)
                    }
                  })
                }
              }
            })
            return h('div', [this.btnShow(110106102) && editIcon, this.btnShow(110106103) && deleteIcon])
          }
        }
      ],
      // 单位
      data: [],
      // 分页参数（单位）
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      isEdit: false
    }
  },
  created () {
    // 数据字典列表
    this.queryList()
  },
  mounted () {
  },
  methods: {
    selectStatus () {
      this.pageOpts.currentPage = 1
    },
    clearParams () {
      this.params.name = ''
      this.params.status = ''
      this.queryList()
    },
    // 打开新增数据字典页面
    openAddModal () {
      this.addModalShow = true
      this.addFromTitle = '新增数据字典'
      this.resetForm()
      this.isEdit = false
    },
    // 新增数据字典
    addUnit () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        datadictionaryAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      } else {
        datadictionaryUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      }
    },
    onPageSizeChange (pagesize) {
      this.pageOpts.pagesize = pagesize
      this.queryList()
    },
    // 翻页（数据字典）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 编辑
    editData (params) {
      console.log(params)
      this.addModalShow = true
      this.addFromTitle = '编辑数据字典'
      this.addFromLine.name = params.row.name
      this.addFromLine.sort = params.row.sort
      this.addFromLine.descs = params.row.descs
      this.addFromLine.id = params.row.id
      this.addFromLine.status = String(params.row.status)
      this.isEdit = true
    },
    // 删除数据
    deleteData (params) {
      datadictionaryDel(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.queryList()
        }
      })
    },
    // 查询数据（单位）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      datadictionaryList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    }
  }
}
</script>
