<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  /deep/.zk-table__header-row .zk-table__header-cell {
    padding: initial;
    text-align: center;
    &:nth-child(2) {
      > div {
        text-align: center;
        padding-left: 20px;
      }
    }
  }
  /deep/.zk-table__header-row .zk-table__cell-inner {
    padding: initial;
    text-align: center;
  }
  /deep/.zk-table__header-row {
    background-color: rgba(239,247,255,1);
    font-weight: bold;
    font-size: 15px;
    height: 3.75rem;
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
    <!-- 搜索结果 -->
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(110104101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal()">新增资源</Button>
      </Col>
      <Col>
        <Table :loading="loading" :row-class-name="rowClassName" row-key="id" :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <!-- 新增账户 -->
    <Modal
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ modalTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <FormItem prop="resName" label="资源名称">
          <Input type="text" v-model="addFromLine.resName" placeholder="请输入资源名称" maxlength="12" show-word-limit />
        </FormItem>
        <FormItem prop="resValue" label="接口">
          <Input type="text" v-model="addFromLine.resValue" placeholder="请输入接口" />
        </FormItem>
        <FormItem prop="orderNum" label="排序" v-if="btnShow(110104105)">
          <Input type="text" v-model="addFromLine.orderNum" placeholder="请输入排序值" />
        </FormItem>
        <FormItem prop="resType" label="类型">
          <RadioGroup v-model="addFromLine.resType">
            <Radio label="0" :disabled="disabled">菜单</Radio>
            <Radio label="1" :disabled="disabled">按钮</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="icon" label="资源图片">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="avatarAction"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="资源图片" v-model="avatarPrview">
              <img :src="prviewUrl" v-if="avatarPrview" style="width: 100%">
          </Modal>
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
  resourceAdd,
  resourceDel,
  resourceList,
  resourceUpdate
} from '@/api/system-setting'
export default {
  mixins: [mixin_table],
  data () {
    return {
      disabled: false,
      loading: true,
      modalTitle: '',
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
        resName: '',
        resCode: '',
        icon: 'md-settting',
        resValue: '',
        resType: '0',
        parentId: 0,
        orderNum: ''
      },
      addFromRule: {
        resName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入资源名称', trigger: 'blur' }
        ],
        resValue: [
          { required: true, message: '请输入接口名称', trigger: 'blur' },
          { type: 'string', message: '请输入接口名称', trigger: 'blur' }
        ]
      },
      addModalShow: false,
      columns: [
        {
          title: '资源',
          key: 'resName',
          width: 250,
          tree: true,
          className: 'tb-header'
        },
        {
          title: '资源编码',
          key: 'resCode',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '接口',
          key: 'resValue',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '资源类型',
          key: 'resType',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let resType = params.row.resType === 0 ? '菜单' : '按钮'
            return h('span', resType)
          }
        },
        {
          title: '排序',
          key: 'orderNum',
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
                  this.openAddModal('newNode', params)
                }
              }
            })
            let addTooltip = h('Tooltip', {
              props: {
                content: '编辑',
                theme: 'light',
                placement: 'top'
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
            let btns = ''
            if (params.row.resType === 0) {
              btns = [this.btnShow(110104101) && addTooltip, this.btnShow(110104102) && editTooltip, this.btnShow(110104103) && deleteTooltip]
            } else {
              btns = [this.btnShow(110104102) && editTooltip, this.btnShow(110104103) && deleteTooltip]
            }
            return h('div', btns)
          }
        }
      ],
      data: [],
      isEdit: false,
      newNodeForParent: {}
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
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
    openAddModal (node, params) {
      // 是否为新节点
      if (node === 'newNode') {
        this.disabled = false
        this.addFromLine.parentId = params.row.id
      } else {
        this.disabled = true
        this.addFromLine.parentId = 0
      }
      this.modalTitle = '新增资源'
      this.addModalShow = true
      this.isEdit = false
      this.resetForm()
    },
    // 新增资源
    addAccount () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        resourceAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.$Message.success(res.data.msg)
            this.queryList()
            this.addModalShow = false
            this.resetForm()
          }
        })
      } else {
        resourceUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
            this.resetForm()
          }
        })
      }
    },
    // 编辑
    editData (params) {
      this.disabled = true
      this.modalTitle = '编辑资源'
      this.addModalShow = true
      this.isEdit = true
      this.addFromLine.resCode = params.row.resCode
      this.addFromLine.resName = params.row.resName
      this.addFromLine.orderNum = params.row.orderNum
      this.addFromLine.parentId = params.row.parentId
      this.addFromLine.resType = params.row.resType.toString()
      this.addFromLine.resValue = params.row.resValue
      this.addFromLine.id = params.row.id
    },
    // 重置密码
    resetPassword (params) {
      this.$Message.success('已重置')
    },
    // 删除数据
    deleteData (params) {
      this.$Modal.confirm({
        title: '删除资源',
        content: '确定删除此资源吗？',
        onOk: () => {
          resourceDel(params.row.id).then(res => {
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
        ...this.params
      }
      resourceList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data
          this.loading = false
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
