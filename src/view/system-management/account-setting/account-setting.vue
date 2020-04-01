<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  /deep/.ivu-avatar {
    background: transparent;
  }
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="3" class="col">
        <span class="span span-max">账户名称</span>
        <Input v-model="params.userName" size="large" placeholder="请输入账户名称" clearable />
      </Col>

      <Col span="3" class="col" offset="1">
        <span class="span">姓名</span>
        <Input v-model="params.nickName" size="large" placeholder="请输入姓名" clearable />
      </Col>
      <Col span="3" class="col" offset="1">
        <span class="span">职位</span>
        <Input v-model="params.position" size="large" placeholder="请输入职位" clearable />
      </Col>
      <Col offset="1" span="3" class="col">
        <span class="span">电话</span>
        <Input v-model="params.mobPhone" size="large" placeholder="请输入您的电话号码" clearable />
      </Col>
      <Col span="3" offset="1" class="col">
        <span class="span">性别</span>
        <Select v-model="params.sex" size="large">
          <Option v-for="item in sexList" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col offset="1" span="7">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 搜索结果 -->
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(110103101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal">新增账户</Button>
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
    <!-- 新增或编辑账户 -->
    <Modal
      @on-visible-change="visibleChange"
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ modalTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="11">
            <FormItem prop="nickName" label="姓名">
              <Input type="text" v-model="addFromLine.nickName" placeholder="请输入姓名" maxlength="20" show-word-limit />
            </FormItem>
            <FormItem prop="mobPhone" label="电话号码">
              <Input type="text" v-model="addFromLine.mobPhone" placeholder="请输入电话号码" />
            </FormItem>
            <FormItem prop="position" label="职位">
              <Input type="text" v-model="addFromLine.position" placeholder="请输入职位" />
            </FormItem>
            <FormItem prop="userName" label="账户名称">
              <Input type="text" v-model="addFromLine.userName" placeholder="请输入账户名称" :disabled="isEdit" />
            </FormItem>
            <FormItem prop="password" label="密码">
              <Input type="password" placeholder="******" disabled/>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem prop="sex" label="性别">
              <RadioGroup v-model="addFromLine.sex">
                <Radio label="0">男</Radio>
                <Radio label="1">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem prop="isLeader" label="是否领导">
              <RadioGroup v-model="addFromLine.isLeader">
                <Radio label="0">普通职员</Radio>
                <Radio label="1">正职领导</Radio>
                <Radio label="2">副职领导</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem prop="accountType" label="账户类型">
              <CheckboxGroup v-model="addFromLine.accountType">
                <Checkbox label="1">管理员</Checkbox >
                <Checkbox label="2">联络员</Checkbox >
              </CheckboxGroup>
            </FormItem>
            <FormItem prop="avatar" label="头像">
              <Upload :number="1" :format="['jpg','jpeg','png']" @uploadURL="uploadURL" :data="addFromLine.avatarUrl"></Upload>
              <Modal title="头像" v-model="avatarPrview">
                <img :src="prviewUrl" v-if="avatarPrview" style="width: 100%">
              </Modal>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem prop="role" label="角色授权">
              <Select v-model="addFromLine.role" :label-in-value="true" clearable multiple placeholder="请选择角色权限" @on-change="selectRole">
                <Option v-for="item in roles" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem prop="upperOrgId" label="所属科室" placeholder="请选择所属科室">
              <Select v-model="addFromLine.upperOrgId" clearable placeholder="请选择所属科室" @on-change="selectDepartment" :label-in-value="true">
                <Option v-for="item in departments" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem prop="governmentOrgIds" label="管辖机构" placeholder="请选择管辖机构">
              <Select v-model="addFromLine.governmentOrgIds" multiple clearable placeholder="请选择管辖机构" @on-change="selectJurisdiction" :label-in-value="true">
                <Option v-for="item in orgs" :value="item.value" :key="item.label">{{ item.label }}</Option>
              </Select>
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
  getrolelist,
  accountAdd,
  accountDel,
  accountList,
  accountUpdate,
  accountResetpassword,
  getdeplist,
  getoranizationlistdepororg
} from '@/api/system-setting'
import Upload from '@/common/upload/upload'
export default {
  components: {
    Upload
  },
  mixins: [mixin_table],
  data () {
    return {
      modalTitle: '',
      // 角色列表
      roles: [],
      // 机构列表
      orgs: [],
      defaultList: [
        {
          name: '',
          url: 'https://b-ssl.duitang.com/uploads/blog/201601/23/20160123143238_nkyrw.jpeg'
        }
      ],
      prviewUrl: 'https://b-ssl.duitang.com/uploads/blog/201601/23/20160123143238_nkyrw.jpeg',
      avatarPrview: false,
      avatarAction: '',
      addFromLine: {
        role: [],
        accountType: [],
        isLeader: 0,
        isContacter: 0,
        isManager: 0,
        userName: '',
        mobPhone: '',
        sex: '',
        avatarUrl: '',
        position: '',
        nickName: '',
        // 用户资源
        userResourceIds: '',
        userRoleIdsNames: '',
        // 角色
        roleids: '',
        rolenames: '',
        // 管辖机构
        governmentOrgIds: '',
        governmentOrgNames: '',
        // 科室
        upperOrgId: '',
        upperOrgName: ''
      },
      addFromRule: {
        nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入账号名称', trigger: 'blur' }
        ],
        mobPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { type: 'string', min: 8, message: '请输入电话号码', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' },
          { type: 'string', message: '请输入职位', trigger: 'blur' }
        ],
        // userResourceIds: [
        //   { required: true, message: '请选择角色授权', trigger: 'blur' },
        //   { type: 'string', message: '请选择角色授权', trigger: 'blur' }
        // ],
        role: [
          { required: true, message: '请选择角色授权', trigger: 'blur' },
          { type: 'array', message: '请选择角色授权', trigger: 'blur' }
        ]
      },
      addModalShow: false,
      params: {
        userName: '',
        sex: '',
        mobPhone: '',
        position: '',
        nickName: ''
      },
      sexList: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '男'
        },
        {
          value: '1',
          label: '女'
        }
      ],
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
        },
        {
          title: '账户名称',
          key: 'userName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '头像',
          key: 'avatarUrl',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let avatar = params.row.avatarUrl
            return h('Avatar', {
              props: {
                src: avatar
              }
            })
          }
        },
        {
          title: '角色授权',
          key: 'rolenames',
          className: 'tb-header',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '管辖机构',
          key: 'governmentOrgNames',
          className: 'tb-header',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '所属科室',
          key: 'upperOrgName',
          className: 'tb-header',
          align: 'center',
          ellipsis: true,
          tooltip: true
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
            let resetPasswordIcon = h('Icon', {
              props: {
                type: 'iconxianxing-zhongzhimima',
                custom: 'icon-font iconxianxing-zhongzhimima',
                ...prop,
                size: 20
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '密码重置',
                    content: '确定重置此账户密码吗？',
                    onOk: () => {
                      this.resetPassword(params)
                    }
                  })
                }
              }
            })
            let resetPasswordTooltip = h('Tooltip', {
              props: {
                content: '密码重置',
                theme: 'light',
                placement: 'top'
              }
            }, [resetPasswordIcon])
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
                    content: `确定删除此账户吗？`,
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
            return h('div', [this.btnShow(110103102) && editTooltip, this.btnShow(110103105) && resetPasswordTooltip, this.btnShow(110103103) && deleteTooltip])
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
      isEdit: false,
      departments: []
    }
  },
  created () {
    this.queryList()
  },
  methods: {
    // 上传图片
    uploadURL (data) {
      console.log(data)
      this.addFromLine.avatarUrl = (data && data.length > 0 && data[0].absolutePath) ? data[0].absolutePath : ''
    },
    // 选择管辖机构（多选）
    selectJurisdiction (item) {
      let orgIds = []
      let orgNames = []
      item.forEach(item => {
        orgIds.push(item.value)
        orgNames.push(item.label)
      })
      // this.addFromLine.governmentOrgIds = orgIds.join(',')
      this.addFromLine.governmentOrgNames = orgNames.join(',')
      console.log(this.addFromLine.governmentOrgIds, this.addFromLine.governmentOrgNames)
    },
    // 获取机构
    getoranizationlistdepororg () {
      getoranizationlistdepororg().then(res => {
        if (res.data.code === 10000) {
          this.orgs = res.data.data
          this.orgs.forEach(item => {
            this.$set(item, 'value', item.id + '')
            this.$set(item, 'label', item.orgName)
          })
        }
      })
    },
    // 选择科室
    selectDepartment (value) {
      this.addFromLine.upperOrgName = value.label
    },
    // 获取科室列表
    getdeplist () {
      getdeplist().then(res => {
        if (res.data.code === 10000) {
          this.departments = res.data.data
          this.departments.forEach(item => {
            this.$set(item, 'value', item.id + '')
            this.$set(item, 'label', item.orgName)
          })
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    // 选择角色权限
    selectRole (item) {
      let roleIds = []
      let roleNames = []
      item.forEach(item => {
        roleIds.push(item.value)
        roleNames.push(item.label)
      })
      this.addFromLine.userRoleIdsNames = `${roleIds.join(',')};${roleNames.join(',')}`
      console.log(this.addFromLine.userRoleIdsNames)
    },
    // 获取角色列表
    getresourcetree () {
      return new Promise((resolve, reject) => {
        getrolelist().then(res => {
          if (res.data.code === 10000) {
            this.roles = []
            let data = res.data.data
            data.forEach(item => {
              this.roles.push({ ...item, label: item.roleName, value: item.id })
            })
            resolve()
          } else {
            reject(res)
          }
        })
      })
    },
    // 上传之前
    handleBeforeUpload () {},
    // 文件大小验证失败
    handleMaxSize () {
      this.$Message['warning']({
        background: true,
        content: '图片大小不能超过2M'
      })
    },
    // 文件格式验证失败
    handleFormatError () {
      this.$Message['warning']({
        background: true,
        content: '只允许上传jpg,jpeg,png格式的图片'
      })
    },
    // 上传成功
    handleSuccess () {},
    // 打开新增页面
    openAddModal () {
      this.addModalShow = true
      this.modalTitle = '新增用户'
      this.isEdit = false
      this.addFromLine.id = ''
      this.resetForm()
      this.getdeplist()
      this.getresourcetree()
      // 管辖机构
      this.getoranizationlistdepororg()
    },
    // 新增用户
    addAccount () {
      let params = {
        ...this.addFromLine
      }
      if (typeof params.governmentOrgIds === 'object' && params.governmentOrgIds) params.governmentOrgIds = params.governmentOrgIds.join(',')
      // 职位
      if (params.position.length < 2 || params.position.length > 12) {
        this.$Message.warning('职位长度应为2~12')
        return
      }
      // 角色授权
      if (this.addFromLine.role.length === 0) {
        this.$Message.warning('角色授权不能为空')
        return
      }
      if (!this.isEdit) {
        accountAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.$Message.success(res.data.msg)
            this.queryList()
            this.addModalShow = false
          }
        })
      } else {
        accountUpdate(params).then(res => {
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
      console.log('current page num:', current)
      this.pageOpts.currentPage = current
      this.queryList()
    },
    // 获取角色授权（编辑时回显状态）
    getRoles () {
      this.getresourcetree().then(() => {
        if (String(this.addFromLine.roleids) !== 'null' && String(this.addFromLine.roleids) !== 'undefined') {
          this.addFromLine.role = this.addFromLine.roleIds.split(',')
          if (this.addFromLine.role.length > 0) {
            this.addFromLine.role.forEach((item, key) => {
              this.addFromLine.role[key] = Number(item)
            })
          }
        }
      })
    },
    // 获取账户类型（编辑时回显状态）
    getAccountType () {
      let isManager = Number(this.addFromLine.isManager)
      let isContacter = Number(this.addFromLine.isContacter)
      if (isManager === 1 && isContacter === 1) {
        this.addFromLine.accountType = ['1', '2']
      } else if (isManager === 1) {
        this.addFromLine.accountType = ['1']
      } else if (isContacter === 1) {
        this.addFromLine.accountType = ['2']
      } else {
        this.addFromLine.accountType = []
      }
    },
    // 编辑
    editData (params) {
      this.addModalShow = true
      this.modalTitle = '修改用户'
      this.isEdit = true
      this.addFromLine.id = params.row.id
      this.addFromLine.nickName = params.row.nickName
      this.addFromLine.userName = params.row.userName
      this.addFromLine.avatarUrl = params.row.avatarUrl
      this.addFromLine.mobPhone = params.row.mobPhone
      this.addFromLine.position = params.row.position
      this.addFromLine.sex = String(params.row.sex)
      this.addFromLine.isLeader = String(params.row.isLeader)
      this.addFromLine.isManager = String(params.row.isManager)
      this.addFromLine.isContacter = String(params.row.isContacter)
      this.addFromLine.upperOrgId = String(params.row.upperOrgId)
      this.addFromLine.roleIds = params.row.roleids || ''
      this.addFromLine.rolenames = params.row.rolenames || ''
      this.addFromLine.governmentOrgIds = params.row.governmentOrgIds && params.row.governmentOrgIds.split(',')
      console.log(this.addFromLine)
      this.getAccountType()
      this.getRoles()
      this.getdeplist()
      this.getoranizationlistdepororg()
    },
    // 重置密码
    resetPassword (params) {
      accountResetpassword(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
        }
      })
    },
    // 删除数据
    deleteData (params) {
      accountDel(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.queryList()
        }
      })
    },
    // 查询数据
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.sex = params.sex === '-1' ? '' : params.sex
      accountList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 清楚搜索条件
    clearParams () {
      this.params.userName = ''
      this.params.sex = '-1'
      this.params.mobPhone = ''
      this.params.position = ''
      this.params.nickName = ''
      this.queryList()
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    }
  },
  watch: {
    'addFromLine.accountType' (newVal) {
      // 同时为管理员和联络员
      if (newVal.length === 2) {
        this.addFromLine.isManager = 1
        this.addFromLine.isContacter = 1
      } else if (newVal.length === 1) {
        // 管理员或联络员
        if (newVal.includes('1')) {
          this.addFromLine.isManager = 1
          this.addFromLine.isContacter = 0
        } else {
          this.addFromLine.isManager = 0
          this.addFromLine.isContacter = 1
        }
      } else {
        // 既不是管理员也不是联络员
        this.addFromLine.isContacter = 0
        this.addFromLine.isManager = 0
      }
      // console.log('=======================', this.addFromLine.isManager, '====================')
    }
  }
}
</script>
