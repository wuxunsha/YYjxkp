<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  /deep/.ivu-tooltip-popper {
  /deep/.ivu-tooltip-content {
    /deep/.ivu-tooltip-inner {
      word-break: break-all;
      white-space: pre-wrap;
      max-width: 500px;
      max-height: 500px;
      overflow-y: auto;
    }
  }
}
.notice-item {
  margin-top: 30px;
  padding: 0 30px;
  .label {
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:20px;
    color:rgba(51,51,51,1);
    margin-bottom: 15px;
  }
}
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="5" class="col">
        <span class="span span-max">通告名称</span>
        <Input v-model="params.title" placeholder="通告名称" clearable size="large" />
      </Col>
      <Col span="5" class="col">
        <span class="span span-max">发起单位</span>
        <Input v-model="params.orgName" placeholder="发起单位" clearable size="large" />
      </Col>
      <Col offset="1" span="10">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 字典维护 -->
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(117101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal">发起通告</Button>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="data" :border="false"></Table>
      </Col>
      <Col class="page">
        <Page
          :total="total"
          :page-size="pageOpts.size"
          :current="pageOpts.page"
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
    <!-- 新增或修改通知公告 -->
    <Modal
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ addFromTitle }}</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <FormItem prop="title" label="通告名称">
          <Input type="text" v-model="addFromLine.title" placeholder="请输入通告标题" />
        </FormItem>
        <FormItem prop="content" label="通告内容">
           <Editor @on-change="htmlContentChange" :value="content" />
        </FormItem>
        <FormItem prop="receiver" label="接受对象">
          <Select clearable size="large" @on-change="selectOrg" multiple v-model="selectOrgArr">
            <Option v-for="item in orgByList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <!-- 上传附件 -->
        <FormItem label='上传附件' class="modalUpload">
          <Upload
            :number="fileNumberLimt"
            :format="fileFormat"
            :data="defaultList"
            @uploadURL="uploadURL"
            >
          </Upload>
          <p style="color:#777;">最多支持5个附件（JPEG、pdf、word文档）</p>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="publishNotice">确定</Button>
      </div>
    </Modal>
    <!-- 查看通知公告 -->
    <Modal
      v-model="addModalShow1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">{{ addFromLine.title }}</div>
      <div class="notice-detail" v-html="addFromLine.content"></div>
      <div class="notice-item">
        <p class="label">附件（点击下载）</p>
        <Upload :data="defaultList1" ></Upload>
      </div>
      <div class="attch"></div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Upload from '@/common/upload/upload'
import { getStandardDate } from '@/libs/tools'
import {
  noticeAdd,
  noticeUpdate,
  getOrgByList,
  findNoticeByPage,
  findOne,
  publish
} from '@/api/notice'
import Editor from '@/common/editor/editor'
export default {
  mixins: [mixin_table],
  components: {
    Editor,
    Upload
  },
  data () {
    return {
      // 待显示的附件列表，多个url：url1|url2|...
      defaultList: '',
      defaultList1: '',
      // 文件上传的个数限制
      fileNumberLimt: 5,
      // 文件格式限制
      fileFormat: ['jpeg', 'jpg', 'png', 'pdf', 'doc'],
      addFromTitle: '',
      params: {
        title: '',
        orgName: ''
      },
      orgByList: [],
      selectOrgArr: [],
      // 表单参数（单位）
      addFromLine: {
        id: '',
        title: '',
        receiver: '',
        content: '',
        attamentIds: ''
      },
      addFromRule: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入公告标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' },
          { type: 'string', min: 1, message: '请输入公告内容', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '请选择接收对象', trigger: 'blur' },
          { type: 'string', min: 1, message: '请选择接收对象', trigger: 'blur' }
        ]
      },
      // 代开新增单位modal
      addModalShow: false,
      addModalShow1: false,
      // 打开新增标签modal
      columns: [
        {
          title: '序号',
          key: 'order',
          className: 'tb-header',
          align: 'center',
          width: 100,
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '通告名称',
          key: 'title',
          // width: 300,
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '内容摘要',
          key: 'content',
          className: 'tb-header',
          align: 'center',
          width: 300,
          render: (h, params) => {
            let _content = params.row.content
            if (!_content) return
            _content = this.getSimpleText(_content)
            let span = ''
            if (_content.length > 100) {
              span = h('div', _content.substr(0, 100) + '...')
            } else {
              span = h('div', _content)
            }
            let tooltip = h('Tooltip', {
              props: {
                content: _content,
                theme: 'light',
                placement: 'top'
              }
            }, [span])
            return h('div', [tooltip])
          }
        },
        {
          title: '发起单位',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
          // width: 200
        },
        {
          title: '生效时间',
          key: 'descs',
          className: 'tb-header',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.createTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '附件',
          key: 'descs',
          className: 'tb-header',
          align: 'center'
          // width: 200
        },
        {
          title: '状态',
          key: 'status',
          className: 'tb-header',
          align: 'center',
          // width: 200,
          render: (h, params) => {
            // flag: 1,本用户；2,上级
            let isSelf = params.row.flag
            let status = params.row.status
            let readStatus = params.row.readStatus
            let statusText = ''
            if (isSelf === 1) {
              statusText = status === 0 ? '未发布' : '已发布'
            } else {
              statusText = readStatus === 0 ? '未读' : '已读'
            }
            return h('span', statusText)
          }
        },
        {
          title: '操作',
          key: 'operation',
          className: 'tb-header',
          align: 'center',
          // width: 200,
          render: (h, params) => {
            const prop = {
              size: '24',
              color: '#0972E7'
            }
            // 查看详情
            let detailIcon = h('Icon', {
              props: {
                type: 'ios-eye-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.detailData(params)
                }
              }
            })
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
            // 发布
            let publishIcon = h('Icon', {
              props: {
                type: 'ios-paper-plane-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '发布通知',
                    content: '确定发布通知吗？',
                    onOk: () => {
                      this.publishData(params)
                    }
                  })
                }
              }
            })

            let btns = []

            // flag: 1,本用户；2,上级
            let isSelf = params.row.flag
            let status = params.row.status
            if (isSelf === 1 && status === 0) {
              btns = [this.btnShow(117102) && editIcon, this.btnShow(117106) && publishIcon, this.btnShow(117103) && detailIcon]
            } else {
              btns = [this.btnShow(117103) && detailIcon]
            }

            return h('div', btns)
          }
        }
      ],
      // 单位
      data: [],
      // 分页参数（单位）
      total: 0,
      pageOpts: {
        size: 10,
        page: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      isEdit: false,
      content: '',
      // 外部模块跳转详情
      pageType: this.$route.query.type,
      noticeDetailId: this.$route.query.id
    }
  },
  created () {
    // 通知公告列表
    this.queryList()
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from)
    if (to.query.type && to.query.type === 'notice_detail') {
      next(vm => {
        vm.detailData({ row: { id: vm.noticeDetailId } })
      })
    } else {
      next()
    }
  },
  methods: {
    // 获取富文本中的纯文本
    getSimpleText (html) {
      let re1 = new RegExp('<.+?>', 'g')
      let msg = html.replace(re1, '')
      return msg
    },
    // 附件上传成功后的回调
    uploadURL (uploadList) {
      console.log(uploadList)
      let _fileUrl = []
      uploadList.forEach(item => {
        _fileUrl.push(item.absolutePath)
      })
      this.addFromLine.attamentIds = _fileUrl.join('|')
    },
    // 获取接收对象
    getOrgByList () {
      getOrgByList().then(res => {
        if (res.data.code === 10000) {
          let _orgList = res.data.data.list
          this.orgByList = []
          _orgList.forEach(item => {
            this.orgByList.push({
              value: item.orgId,
              label: item.orgName
            })
          })
        }
      })
    },
    htmlContentChange (html, text) {
      this.content = html
      this.addFromLine.content = html
      console.log(html)
    },
    selectOrg (orgList) {
      // this.pageOpts.page = 1
      this.selectOrgArr = orgList
      console.log(orgList)
      let _orgs = []
      orgList.forEach(item => {
        // orgName
        _orgs.push(item)
      })
      this.addFromLine.receiver = _orgs.join(',')
    },
    clearParams () {
      this.params.title = ''
      this.params.orgName = ''
      this.queryList()
    },
    // 打开新增通知公告页面
    openAddModal () {
      this.addModalShow = true
      this.addFromTitle = '新增通知公告'
      this.resetForm()
      // 获取接收对象
      this.getOrgByList()
      this.isEdit = false
    },
    // 新增通知公告
    publishNotice () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        noticeAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      } else {
        noticeUpdate(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
          }
        })
      }
    },
    onPageSizeChange (size) {
      this.pageOpts.size = size
      this.queryList()
    },
    // 翻页（通知公告）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.page = current
      this.queryList()
    },
    detailData (params) {
      this.addModalShow1 = true
      // 获取接收对象
      this.getOrgByList()
      findOne(params.row.id).then(res => {
        if (res.data.code === 10000) {
          this.addFromLine.title = res.data.data.title
          this.addFromLine.content = res.data.data.content
          this.defaultList1 = res.data.data.attamentIds
        }
      })
      console.log('查看详情：', params)
    },
    // 编辑
    editData (params) {
      console.log(params)
      this.addModalShow = true
      this.addFromLine.id = params.row.id
      this.addFromTitle = '编辑通知公告'
      this.addFromLine.title = params.row.title
      this.content = params.row.content
      this.defaultList = params.row.attamentIds
      // 获取接收对象
      this.getOrgByList()
      this.selectOrgArr = params.row.receiver.split(',')
      this.selectOrgArr.forEach((item, index) => {
        this.selectOrgArr[index] = parseInt(item)
      })
      console.log(this.selectOrgArr)
      // this.addFromLine.status = String(params.row.status)
      // this.$on('setHtml', this.addFromLine.content)
      this.isEdit = true
    },
    // 发布数据
    publishData (params) {
      publish(params.row.id).then(res => {
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
      findNoticeByPage(params).then(res => {
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
