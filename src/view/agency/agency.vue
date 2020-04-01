<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  /deep/.zk-table__header-row .zk-table__cell-inner {
    padding: initial;
    text-align: center;
    &:nth-child(2) {
      > div {
        text-align: left;
        padding-left: 20px;
      }
    }
  }
  /deep/.zk-table__body-row .zk-table__body-cell {
    .zk-table__cell-inner {
      :nth-child(2) {
        padding: initial;
        text-align: center;
      }
    }
  }
  /deep/ .zk-table__body-row {
    color: #333333;
    font-size: 15px;
    height: 3.75rem;
  }
  /deep/ .ivu-table-wrapper>.ivu-spin-fix {
    border: none
  }
</style>
<template>
  <div>
    <Row class="content">
      <Col>
        <Table :loading="loading" :row-class-name="rowClassName" row-key="id" :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <!-- 新增或编辑账户 -->
    <Modal
      v-model="addModalShow"
       @on-visible-change="visibleChange"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ modalTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="20">
            <FormItem prop="orgName" label="机构名称">
              <Input type="text" v-model="addFromLine.orgName" placeholder="请输入机构名称" maxlength="20" show-word-limit />
            </FormItem>
            <FormItem prop="orgType" label="机构类型">
              <Select v-model="addFromLine.orgType" clearable placeholder="请选择机构类型" @on-change="selectOrgType" :label-in-value="true" :disabled='isEdit'>
                <Option v-for="item in orgTypes" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="busiType" label="分类" v-if="addFromLine.orgType === '2' || addFromLine.orgType === '5'">
              <Select v-model="addFromLine.busiType" clearable placeholder="请选择分类" @on-change="selectBusType" :label-in-value="true" :disabled='isEdit'>
                <Option v-for="item in busTypes" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="leaderId" label="直管领导">
              <Select v-model="addFromLine.leaderId" clearable placeholder="请选择直管领导" @on-change="selectLeader" :label-in-value="true">
                <Option v-for="item in leaders" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <!-- <FormItem prop="isMain" label="是否机构">
              <RadioGroup v-model="addFromLine.isMain">
                <Radio label="0">机构</Radio>
                <Radio label="1">科室</Radio>
              </RadioGroup>
            </FormItem> -->
            <FormItem prop="isMain" label="管理员角色" :label-width="100" v-if="addFromLine.isMain === '0'">
              <Select v-model="addFromLine.managerRoleId" :label-in-value="true" @on-change="selectManagerRole">
                <Option v-for="item in managerRoles" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="managerName" label="管理账户" v-if="addFromLine.isMain === '0'">
              <Input type="text" v-model="addFromLine.managerName" placeholder="请输入管理账户" maxlength="20" show-word-limit :disabled='isEdit'/>
            </FormItem>
            <FormItem prop="managerPassWord" label="密码" v-if="addFromLine.isMain === '0'">
              <Input type="password" placeholder="******" v-model="addFromLine.managerPassWord" disabled/>
            </FormItem>
            <FormItem prop="orgDesc" label="机构描述">
              <Input type="textarea" v-model="addFromLine.orgDesc" placeholder="请输入机构描述" maxlength="100" show-word-limit />
            </FormItem>
          </Col>
        </Row>
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
  oranizationAdd,
  oranizationDel,
  oranizationList,
  oranizationUpdate,
  datadictionaryGetlistbytype,
  getrolelist,
  getaccountlistbyorgid,
  getorgtypelistbyOrgId
} from '@/api/system-setting'
const MD5 = require('crypto-js/md5')
export default {
  mixins: [mixin_table],
  data () {
    return {
      loading: true,
      modalTitle: '',
      // 直管领导
      leaders: [],
      // 分类
      busTypes: [],
      // 机构类型
      orgTypes: [],
      addFromLine: {
        orgName: '',
        managerName: '',
        // 数据库字段设计错误，所以bus后多了一个i
        busiType: '',
        busiTypeName: '',
        orgType: '',
        orgTypeName: '',
        leaderId: '',
        leaderName: '',
        isMain: '',
        managerRoleId: '',
        managerRoleName: '',
        orgDesc: '',
        parentId: '',
        managerPassWord: MD5('yy123456').toString()
      },
      addFromRule: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { type: 'string', message: '请输入机构名称', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '请输入管理账户', trigger: 'blur' },
          { type: 'string', message: '请输入管理账户', trigger: 'blur' }
        ],
        orgType: [
          { required: true, message: '请选择机构类型', trigger: 'blur' }
        ],
        busiType: [
          { required: true, message: '请输入分类', trigger: 'blur' },
          { type: 'string', message: '请输入分类', trigger: 'blur' }
        ],
        isMain: [
          { required: true, message: '请选择管理员角色', trigger: 'blur' },
          { type: 'string', message: '请选择管理员角色', trigger: 'blur' }
        ],
        orgDesc: [
          { required: true, message: '请输入机构描述', trigger: 'blur' },
          { type: 'string', message: '请输入机构描述', trigger: 'blur' }
        ]
      },
      addModalShow: false,
      params: {
        orgName: '',
        orgTypeName: '',
        leaderName: ''
      },
      orgTypeList: [],
      columns: [
        {
          title: '机构名称',
          key: 'orgName',
          width: 250,
          tree: true,
          className: 'tb-header'
        },
        {
          title: '机构类型',
          key: 'orgTypeName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '分类',
          key: 'busiTypeName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '管理员账户',
          key: 'managerName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '直管领导',
          key: 'leaderName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '机构描述',
          key: 'orgDesc',
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
            // 新增
            let addIcon = h('Icon', {
              props: {
                type: 'md-add',
                ...prop
              },
              on: {
                click: () => {
                  this.openAddModal(params)
                }
              }
            })
            let addTooltip = h('Tooltip', {
              props: {
                content: '新增',
                theme: 'light',
                placement: 'top',
                style: {
                  wordBreak: 'break-all'
                }
              }
            }, [addIcon])
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
                  this.deleteData(params)
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
            return h('div', [this.btnShow(126101101) && addTooltip, this.btnShow(126101102) && editTooltip, this.btnShow(126101103) && deleteTooltip])
          }
        }
      ],
      data: [],
      total: 0,
      pageOpts: {
        pagesize: 10,
        currentPage: 1
      },
      isEdit: false,
      managerRoles: [],
      orgId: ''
    }
  },
  created () {
    this.queryList()
    this.orgId = JSON.parse(localStorage.getItem('USER_INFO')).orgId
    // 机构类型
    this.getorgtypelistbyOrgId()
  },
  methods: {
    // 选择直管领导
    selectLeader (value) {
      if (!value) return
      this.addFromLine.leaderName = value.label
      this.addFromLine.leaderId = value.value
    },
    handle (scope) {
      console.log(scope)
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    // 上级机构用户列表
    getaccountlistbyorgid (id) {
      getaccountlistbyorgid(id).then(res => {
        if (res.data.code === 10000) {
          this.leaders = res.data.data
          this.leaders.forEach(item => {
            item.value = item.id + ''
            item.label = item.userName
          })
        }
      })
    },
    // 选择机构角色管理员
    selectManagerRole (value) {
      if (!value) return
      this.addFromLine.managerRoleId = value.value
      this.addFromLine.managerRoleName = value.label
    },
    // 查询管理员角色
    getrolelist () {
      let params = {
        ...this.pageOpts
      }
      console.log(params)
      getrolelist().then(res => {
        if (res.data.code === 10000) {
          this.managerRoles = res.data.data
          this.managerRoles.forEach(item => {
            item.value = item.id + ''
            item.label = item.roleName
          })
        }
      })
    },
    selectOrgType (value) {
      if (!value) return
      this.addFromLine.orgTypeName = value.label
      // 选择为科室时，单选组件联动
      if (value.value === '8') {
        this.addFromLine.isMain = 1 + ''
        this.addFromLine.managerName = ''
      } else {
        this.addFromLine.isMain = 0 + ''
      }
    },
    selectBusType (value) {
      if (!value) return
      this.addFromLine.busiTypeName = value.label
    },
    // 根据id获取可选机构类型
    getorgtypelistbyOrgId () {
      let id = this.orgId
      getorgtypelistbyOrgId(id).then(res => {
        if (res.data.code === 10000) {
          this.orgTypes = res.data.data
          this.orgTypes.forEach(item => {
            this.$set(item, 'value', item.id + '')
            this.$set(item, 'label', item.name)
          })
          if (this.isEdit) {
            this.addFromLine.orgTypes = res.data.data
            this.addFromLine.orgTypes.forEach(item => {
              this.$set(item, 'value', item.id + '')
              this.$set(item, 'label', item.name)
            })
          }
        }
      })
    },
    // 根据类型返回对应数据字典(不分页)
    datadictionaryGetlistbytype (type) {
      datadictionaryGetlistbytype(type).then(res => {
        if (res.data.code === 10000) {
          this.busTypes = res.data.data
          this.busTypes.forEach(item => {
            this.$set(item, 'value', item.nameValue + '')
            this.$set(item, 'label', item.name)
          })
        }
      })
    },
    // 打开新增页面
    openAddModal (params) {
      this.modalTitle = '新增机构'
      this.addModalShow = true
      this.isEdit = false
      this.addFromLine.id = ''
      this.orgId = params.row.id
      this.addFromLine.parentId = params.row.id
      this.getrolelist()
      this.getaccountlistbyorgid(params.row.id)
      // 机构类型
      this.getorgtypelistbyOrgId()
      // 类型：type=3
      this.datadictionaryGetlistbytype(3)
    },
    // 新增用户
    addAccount () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        oranizationAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.$Message.success(res.data.msg)
            this.addModalShow = false
            this.queryList()
          }
        })
      } else {
        oranizationUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      }
    },
    // 编辑
    editData (params) {
      this.modalTitle = '修改机构信息'
      this.addModalShow = true
      this.isEdit = true
      this.orgId = params.row.parentId
      this.addFromLine.id = params.row.id
      this.addFromLine.orgType = params.row.orgType + ''
      this.addFromLine.orgName = params.row.orgName
      this.addFromLine.managerName = params.row.managerName
      this.addFromLine.busiType = params.row.busiType + ''
      this.addFromLine.orgDesc = params.row.orgDesc
      this.addFromLine.leaderId = params.row.leaderId + ''
      console.log(params.row.orgType, 'kkkkkkkkkkkkkkkkkkk')
      this.addFromLine.managerRoleId = params.row.managerRoleId + ''
      this.addFromLine.managerRoleName = params.row.managerRoleName
      // 是否机构
      this.addFromLine.isMain = params.row.orgType === 8 ? '1' : '0'
      this.getrolelist()
      // 获取直管领导
      this.getaccountlistbyorgid(params.row.parentId)
      // 机构类型
      this.getorgtypelistbyOrgId()
      console.log(this.addFromLine.orgType, params.row.orgType)
      // 类型：type=3
      this.datadictionaryGetlistbytype(3)
    },
    // 删除数据
    deleteData (params) {
      this.$Modal.confirm({
        title: '删除账户',
        content: '确定删除此账户吗？',
        onOk: () => {
          // this.deleteData(params)
          oranizationDel(params.row.id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
    },
    // 查询数据
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.orgType = params.orgType === '-1' ? '' : params.orgType
      oranizationList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
          this.loading = false
        }
      })
    },
    // 清楚搜索条件
    clearParams () {
      this.params.orgName = ''
      this.params.orgTypeName = ''
      this.params.leaderName = ''
      this.queryList()
    }
  },
  watch: {
    'addFromLine.accountType' (newVal) {
      console.log(newVal)
      // 同时为管理员和联络员
      if (newVal.length === 2) {
        this.addFromLine.isManager = 1
        this.addFromLine.isContacter = 1
      } else if (newVal.length === 1) {
        // 管理员或联络员
        newVal[0] === 1 ? this.addFromLine.isManager = 1 : this.addFromLine.isContacter = 1
      } else {
        // 既不是管理员也不是联络员
        this.addFromLine.isContacter = 0
        this.addFromLine.isManager = 0
      }
    }
  }
}
</script>
