<style lang="less" scoped>
  @import url('~@/common/less/global.less');
</style>
<template>
  <div>
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(110102101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal">新增角色</Button>
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
    <!-- 新增角色 -->
    <Modal
      @on-visible-change="visibleChange"
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ addModalTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <FormItem prop="roleName" label="角色名称">
          <Input type="text" v-model="addFromLine.roleName" placeholder="请输入角色名称" maxlength="10" show-word-limit />
        </FormItem>
        <FormItem prop="resourceIds" label="角色权限">
          <div style="max-height: 400px; overflow-y: auto;">
            <Tree :data="roles" show-checkbox @on-check-change="onCheckChange" ref="roleTree"></Tree>
          </div>
        </FormItem>
        <FormItem prop="roleDesc" label="权限说明">
          <Input type="textarea" v-model="addFromLine.roleDesc" placeholder="请输入权限说明" maxlength="100" show-word-limit />
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addAccount">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  roleAdd,
  roleDel,
  roleUpdate,
  roleList,
  roleInfo,
  getresourcetree
} from '@/api/system-setting'
export default {
  mixins: [mixin_table],
  data () {
    return {
      addModalTitle: '',
      // 角色列表
      roles: [],
      addFromLine: {
        roleName: '',
        roleDesc: '',
        resourceIds: [],
        resourceOtherIds: []
      },
      addFromRule: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入角色描述', trigger: 'blur' }
        ],
        resourceIds: [
          { required: true, message: '请选择角色权限', trigger: 'blur' },
          { type: 'array', min: 1, message: '请选择角色权限', trigger: 'blur' }
        ]
      },
      addModalShow: false,
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
          title: '角色名称',
          key: 'roleName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '权限说明',
          key: 'roleDesc',
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
            let editTooltip = h('Tooltip', {
              props: {
                content: '编辑',
                theme: 'light',
                placement: 'top'
              }
            }, [editIcon])
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
                    title: '删除角色',
                    content: `正在删除“${params.row.roleName}”角色，如果删除，与该角色有关的用户将失去相应权限`,
                    onOk: () => {
                      this.deleteData(params)
                    }
                  })
                }
              }
            })
            let deleteTooltip = h('Tooltip', {
              props: {
                content: '删除',
                theme: 'light',
                placement: 'top'
              }
            }, [deleteIcon])
            return h('div', [this.btnShow(110102102) && editTooltip, this.btnShow(110102103) && deleteTooltip])
          }
        }
      ],
      data: [],
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
    this.queryList()
  },
  methods: {
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
        this.treeSelected = []
      }
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    onCheckChange (currentList, currentItem) {
      // 处理勾选的节点
      let allSelectIds = this.$refs.roleTree.getCheckedNodes()
      let selectIds1 = []
      allSelectIds.forEach(item => {
        selectIds1.push(item.id)
      })
      this.addFromLine.resourceOtherIds = selectIds1.join(',')

      // 处理勾选的和半选的节点
      let partSelectIds = this.$refs.roleTree.getCheckedAndIndeterminateNodes()
      let selectIds2 = []
      partSelectIds.forEach(item => {
        selectIds2.push(item.id)
      })
      this.addFromLine.resourceIds = selectIds2.join(',')
      console.log(this.addFromLine.resourceIds)
    },
    // 获取角色权限
    getresourcetree () {
      getresourcetree().then(res => {
        if (res.data.code === 10000) {
          this.roles = res.data.data
        }
      })
    },
    // filterRoles (roles) {
    //   let newTree = []
    //   let currentRoot = []
    //   // 节点的parentId
    //   let parentId = []
    //   let eachRoles = function (node) {
    //     for (const key in node) {
    //       // 缓存当前根节点
    //       if (node[key].parentId === 0) {
    //         // console.log(key)
    //         currentRoot = [node[key]]
    //         let eachNode = function (_node) {
    //           for (const nodeKey in _node) {
    //             if (!parentId.includes(_node[nodeKey].parentId) && _node[nodeKey].parentId) {
    //               parentId.push(_node[nodeKey].parentId)
    //             }
    //             // 检查children
    //             if (_node[nodeKey].children && _node[nodeKey].children.length > 0) {
    //               eachNode(_node[nodeKey].children)
    //             }
    //           }
    //         }
    //         eachNode(currentRoot)
    //         // console.log('parent id >>>>>>>>>>>>', parentId)
    //       }
    //       // 处理根节点
    //       let _newNode = []
    //       // console.log('skldj>>>>>', node[key].title)
    //       if (node[key].children) {
    //         if (node[key].children.some(item => !item.checked)) {
    //           // 如果当前的parentId与缓存根节点的parentId有匹配，当前根节点的checked就设置为false
    //           console.log('jl//////', parentId, node[key].parentId)
    //           if (parentId.includes(node[key].parentId)) {
    //             let eachCurrentRoot = function (currentRoot) {
    //               for (const currentRootKey in currentRoot) {
    //                 currentRoot[currentRootKey].checked = false
    //               }
    //               _newNode = currentRoot
    //             }
    //             eachCurrentRoot(currentRoot)
    //           }
    //         }
    //       }
    //       newTree.push(_newNode)
    //       // console.log(node[key].title)
    //       if (node[key].children) {
    //         eachRoles(node[key].children)
    //       }
    //     }
    //   }
    //   eachRoles(roles)
    //   console.log('new tree>>>>>>>>>>>>>', newTree)
    //   return roles
    // },
    // 打开新增页面
    openAddModal () {
      this.addModalTitle = '新增角色'
      this.addModalShow = true
      this.isEdit = false
      this.addFromLine.id = ''
      this.addFromLine.resourceIds = []
      this.addFromLine.roleName = ''
      this.addFromLine.roleDesc = ''
      this.getresourcetree()
    },
    // 新增或编辑角色
    addAccount () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        if (params.roleName === '' || params.resourceIds.length === 0) return
        roleAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      } else {
        params.resourceIds = this.addFromLine.resourceIds
        roleUpdate(params).then(res => {
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
    // 翻页
    pageChange (current) {
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 编辑
    editData (params) {
      this.addModalTitle = '编辑角色'
      this.addModalShow = true
      this.isEdit = true
      roleInfo(params.row.id).then(res => {
        if (res.data.code === 10000) {
          let data = res.data.data
          this.addFromLine.id = data.id
          // 权限实际的数据
          // this.filterRoles(data.jurisdictionResourceBeans)
          // data.jurisdictionResourceBeans
          // 显示的数据
          this.roles = data.jurisdictionResourceBeansOther || []
          this.$nextTick(() => {
            // 处理勾选的几点
            let selectList1 = this.$refs.roleTree.getCheckedNodes()
            let selectIds1 = []
            selectList1.forEach(item => {
              selectIds1.push(item.id)
            })
            this.addFromLine.resourceOtherIds = selectIds1.join(',')

            // 处理半选和勾选的节点
            let selectList2 = this.$refs.roleTree.getCheckedAndIndeterminateNodes()
            let selectIds2 = []
            selectList2.forEach(item => {
              selectIds2.push(item.id)
            })
            this.addFromLine.resourceIds = selectIds2.join(',')
          })
          this.addFromLine.roleName = data.roleName
          this.addFromLine.roleDesc = data.roleDesc
        }
      })
    },
    // 删除数据
    deleteData (params) {
      roleDel(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.queryList()
        }
      })
    },
    // 查询数据
    queryList () {
      let params = {
        ...this.pageOpts
      }
      roleList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    }
  }
}
</script>
