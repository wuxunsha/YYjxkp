<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  .work-log {
    .notice-title {
      font-size:26px;
      font-family:PingFang SC;
      font-weight:bold;
      line-height:22px;
      color:rgba(51,51,51,1);
      text-align: center;
      margin-top: 20px;
    }
    .notice-date {
      font-size:22px;
      font-family:PingFang SC;
      font-weight:500;
      line-height:22px;
      color:rgba(102,102,102,1);
      text-align: center;
      margin-top: 15px;
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
      .desc {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(112,112,112,1);
        margin-top: 15px;
      }
    }
  }
  .feedback {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-left: 5px;
  }
  .feedback-content {
    border-bottom:1px solid rgba(243,243,243,1);
    margin: 10px 30px 5px;
    .info {
      font-size:18px;
      font-family:PingFang SC;
      font-weight:500;
      line-height:30px;
      color:rgba(51,51,51,1);
      display: flex;
      justify-content: space-between;
      .reply {
        color: #2d8cf0;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .desc {
      display: flex;
      justify-content: space-between;
      >span {
        font-size:18px;
        font-family:PingFang SC;
        line-height:54px;
        color:rgba(204,204,204,1);
      }
    }
  }
  .modal-log {
    max-height: 600px;
    overflow: auto;
  }
  /deep/ textarea.ivu-input {
    height: 100px;
  }
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="6" class="col">
        <span class="span span-max">时间段</span>
        <DatePicker
          type="datetimerange"
          placeholder="开始时间~结束时间"
          v-model="duration"
          style="width: 300px"
          @on-change="selectTime"
        ></DatePicker>
      </Col>
      <Col offset="1" span="10">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 我的日志 -->
    <Row class="content">
      <Col class="btn-add" v-if="btnShow(118101)">
        <Button type="primary" class="add" icon="md-add" @click="openAddModal">写日志</Button>
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
    <!-- 新增或修改工作日志 -->
    <Modal
      v-model="addModalShow"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
        <div slot="header" class="add-header">{{ addFromTitle }}</div>
        <div class="modal-log">
          <!-- header -->
          <Form ref="addForm" :model="addFromLine" :rules="addFromRule"  style="margin-top: 20px">
            <FormItem prop="todayContent" label="今天的工作内容">
              <Input type="textarea" v-model="addFromLine.todayContent" placeholder="记录今天的工作内容..." show-word-limit :maxlength="1000"/>
            </FormItem>
            <FormItem label="未完成的事情">
              <Input type="textarea" v-model="addFromLine.incompleteContent" placeholder="还有哪些事情没有完成..." show-word-limit :maxlength="1000"/>
            </FormItem>
            <FormItem label="明天的工作计划">
              <Input type="textarea" v-model="addFromLine.tomorrowPlan" placeholder="规划明天要完成的事情..." show-word-limit :maxlength="1000"/>
            </FormItem>
            <FormItem label="需要协调的事情">
              <Input type="textarea" v-model="addFromLine.coordinateContent" placeholder="需要同其他部门或同事协调的事情..." show-word-limit :maxlength="1000"/>
            </FormItem>
            <!-- 上传附件 -->
              <FormItem label='上传附件' class="modalUpload" prop="attachmentIds">
                <Upload
                  ref="upload1"
                  :number="fileNumberLimt"
                  :format="fileFormat"
                  :data="defaultList"
                  @uploadURL="uploadURL"
                  >
                </Upload>
                <p style="color:#777;">最多支持5个附件（JPEG、pdf、word文档）</p>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" class="footer">
          <Button type="primary" @click="publishNotice">确定</Button>
        </div>
    </Modal>
    <!-- 查看工作日志 -->
    <Modal
      v-model="addModalShow1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <div slot="header" class="add-header">工作日志</div>
      <div class="modal-log">
        <div class="work-log">
          <div class="notice-date">{{ addFromLine.createTime | dateFormat }}</div>
          <div class="notice-item">
            <p class="label">今天的工作内容：</p>
            <p class="desc">{{ addFromLine.todayContent }}</p>
          </div>
          <div class="notice-item">
            <p class="label">未完成的工作：</p>
            <p class="desc">{{ addFromLine.incompleteContent }}</p>
          </div>
          <div class="notice-item">
            <p class="label">明天的工作规划：</p>
            <p class="desc">{{ addFromLine.tomorrowPlan }}</p>
          </div>
          <div class="notice-item">
            <p class="label">需要协调的工作：</p>
            <p class="desc">{{ addFromLine.coordinateContent }}</p>
          </div>
          <div class="notice-item">
            <p class="label">附件（点击下载）</p>
            <Upload :data="defaultList" ></Upload>
          </div>
        </div>
        <Row style="padding: 20px 15px; margin-top: 40px">
          <Col v-if="btnShow(118104)">
            <Icon type="ios-book" size="24"/>
            <span class="feedback">批示</span>
          </Col>
          <Col v-if="btnShow(118104)">
            <Input type="textarea" class="textarea" v-model="comment" placeholder="请输批示内容" />
          </Col>
          <Col style="margin: 20px auto" v-if="btnShow(118104)">
            <Button type="primary" @click="indexinstruction" size="small">批示</Button>
          </Col>
          <Col class="feedback-content" v-for="(item, index) in instructionInfoVOS" :key="'批示' + index">
            <div :class="{reply: item.replyType === 2}">
              <div class="info">
                {{ item.content }}
                <span class="reply" @click="openReplyModal(item.id)" v-if="btnShow(118104)">回复</span>
              </div>
              <div class="desc">
                <span class="form">{{ item.instruOrgName }}</span>
                <span class="time">{{ item.createTime | dateFormat }}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addModalShow1=false">确定</Button>
      </div>
    </Modal>
    <!-- 回复 -->
    <Modal
      v-model="addModalShow2"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="500"
      >
      <div slot="header" class="add-header">{{ modalTitle }}</div>
      <Form ref="addForm1" :model="addFromLine1" :rules="addFromRule1" :label-width="80" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="20">
            <FormItem label="回复内容">
              <Input type="textarea" v-model="replyContent" placeholder="请输入回复内容" maxlength="100" show-word-limit />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="addReply">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Upload from '@/common/upload/upload'
import { getStandardDate } from '@/libs/tools'
import {
  workLogAdd,
  update,
  findWorkLogByPage,
  findOne,
  reply
} from '@/api/work-log'
export default {
  mixins: [mixin_table],
  components: {
    Upload
  },
  data () {
    return {
      // 待显示的附件列表，多个url：url1|url2|...
      defaultList: '',
      // 文件上传的个数限制
      fileNumberLimt: 5,
      // 文件格式限制
      fileFormat: ['jpeg', 'jpg', 'png', 'pdf', 'doc'],
      duration: '',
      modalTitle: '反馈回复',
      // defaultList: [],
      uploadList: [],
      addFromTitle: '',
      params: {
        startTime: '',
        endTime: ''
      },
      // 表单参数（单位）
      addFromLine: {
        id: '',
        todayContent: '',
        incompleteContent: '',
        tomorrowPlan: '',
        coordinateContent: '',
        attachmentIds: ''
      },
      addFromRule: {
        todayContent: [
          { required: true, message: '今天的工作内容', trigger: 'blur' },
          { type: 'string', min: 1, message: '今天的工作内容', trigger: 'blur' }
        ],
        incompleteContent: [
          { required: true, message: '未完成的事情', trigger: 'blur' },
          { type: 'string', min: 1, message: '未完成的事情', trigger: 'blur' }
        ],
        tomorrowPlan: [
          { required: true, message: '明天的工作计划', trigger: 'blur' },
          { type: 'string', min: 1, message: '明天的工作计划', trigger: 'blur' }
        ],
        coordinateContent: [
          { required: true, message: '需要协调的事情', trigger: 'blur' },
          { type: 'string', min: 1, message: '需要协调的事情', trigger: 'blur' }
        ]
      },
      // 回复
      addFromLine1: {
        replyContent: ''
      },
      addFromRule1: {
        replyContent: [
          { required: true, message: '请输入回复内容', trigger: 'blur' },
          { type: 'string', message: '请输入回复内容', trigger: 'blur' }
        ]
      },
      // 代开新增单位modal
      addModalShow: false,
      // 查看日志详情
      addModalShow1: false,
      // 回复
      addModalShow2: false,
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
          title: '时间',
          className: 'tb-header',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.createTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '内容摘要',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let _content = params.row.todayContent
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
          title: '反馈与批示',
          key: 'count',
          className: 'tb-header',
          align: 'center',
          width: 200
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
            // 查看详情
            let detailIcon = h('Icon', {
              props: {
                type: 'ios-eye-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.addModalShow1 = true
                  this.detailData(params.row.id)
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
                  this.editData(params.row.id)
                }
              }
            })
            return h('div', [this.btnShow(118102) && editIcon, this.btnShow(118106) && detailIcon])
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
      // 批示记录
      instructionInfoVOS: [],
      // 批示内容
      comment: '',
      // 批示id
      commentId: '',
      // 批示的回复
      replyContent: ''
    }
  },
  created () {
    // 工作日志列表
    this.queryList()
  },
  watch: {
    addModalShow (newVal) {
      if (!newVal) {
        this.resetForm()
        this.$refs.upload1.emptyData()
        console.log('============', this.defaultList)
      }
    }
  },
  methods: {
    // 附件上传成功后的回调
    uploadURL (uploadList) {
      console.log(uploadList)
      let _fileUrl = []
      uploadList.forEach(item => {
        _fileUrl.push(item.absolutePath)
      })
      this.addFromLine.attachmentIds = _fileUrl.join('|')
    },
    // 选择查询时间
    selectTime (time) {
      this.params.startTime = new Date(time[0]).getTime()
      this.params.endTime = new Date(time[1]).getTime()
      this.pageOpts.page = 1
    },
    reply (params) {
      reply(params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.detailData(params.themeId)
          // 是批示还是回复
          if (!params.replyId) {
            this.comment = ''
          } else {
            this.commentId = ''
            this.replyContent = ''
            this.addModalShow2 = false
          }
        }
      })
    },
    // 批示
    indexinstruction () {
      let params = {
        replyType: 1,
        themeId: this.addFromLine.id,
        content: this.comment
      }
      this.reply(params)
    },
    // 回复
    addReply () {
      console.log('回复内容：', this.addFromLine.replyContent)
      let params = {
        replyType: 2,
        replyId: this.commentId,
        themeId: this.addFromLine.id,
        content: this.replyContent
      }
      this.reply(params)
    },
    openReplyModal (id) {
      this.commentId = id
      this.addModalShow2 = true
    },
    htmlContentChange (html, text) {
      this.content = html
      console.log(html)
    },
    selectStatus () {
      this.pageOpts.page = 1
    },
    clearParams () {
      this.params.startTime = ''
      this.params.endTime = ''
      this.duration = ''
      this.queryList()
    },
    // 打开新增工作日志页面
    openAddModal () {
      this.addModalShow = true
      this.addFromTitle = '新增工作日志'
      this.isEdit = false
      this.resetForm()
      this.$refs.upload1.emptyData()
    },
    // 新增工作日志
    publishNotice () {
      let params = {
        ...this.addFromLine
      }
      if (!this.isEdit) {
        workLogAdd(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
            this.resetForm()
          }
        })
      } else {
        update(params).then(res => {
          if (res.data.code === 10000) {
            this.queryList()
            this.$Message.success(res.data.msg)
            this.addModalShow = false
            this.resetForm()
          }
        })
      }
    },
    onPageSizeChange (size) {
      this.pageOpts.size = size
      this.queryList()
    },
    // 翻页（工作日志）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.page = current
      this.queryList()
    },
    detailData (id) {
      findOne(id).then(res => {
        if (res.data.code === 10000) {
          this.addFromLine.id = res.data.data.id
          this.addFromLine.createTime = res.data.data.createTime
          this.addFromLine.todayContent = res.data.data.todayContent
          this.addFromLine.tomorrowPlan = res.data.data.tomorrowPlan
          this.addFromLine.incompleteContent = res.data.data.incompleteContent
          this.addFromLine.coordinateContent = res.data.data.coordinateContent
          this.addFromLine.attachmentIds = res.data.data.attachmentIds
          this.defaultList = res.data.data.attachmentIds
          this.instructionInfoVOS = res.data.data.instructionInfoVOS
        }
      })
    },
    // 编辑
    editData (id) {
      this.detailData(id)
      this.addModalShow = true
      this.addFromTitle = '编辑工作日志'
      this.isEdit = true
    },
    // 查询数据（单位）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      findWorkLogByPage(params).then(res => {
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
