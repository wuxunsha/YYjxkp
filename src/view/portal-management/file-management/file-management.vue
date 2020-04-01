<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
}
/deep/.ivu-modal-header {
  border-bottom: 0;
  padding: 0;
}
/deep/.ivu-modal-footer {
  border-top: 0;
  display: none;
}
.ivu-form-item {
  margin-top: 10px;
  margin-bottom: 0;
}
/deep/.ivu-form-item-label {
  width: 80px;
  text-align: right;
}
/deep/.ivu-form-item-content {
  margin-left: 80px;
}
/deep/.ivu-icon {
  margin-right: 6px;
}
/deep/.ivu-form-item {
  margin-bottom: 24px;
}
.header-search {
  .col {
    .span-max {
      width: 110px;
    }
    /deep/.ivu-input {
      height: 40px;
    }
    /deep/.ivu-input-suffix i {
      line-height: 40px;
    }
  }
}
.content {
  .online {
    transform: rotate(180deg)
  }
}
/* 创建社会评价模板 */
.modal-information {
  /deep/.ivu-modal-content {
    padding: 30px 60px;
  }
  .modal-title {
    color: #333;
    text-align: center;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 0;
  }
  .modal-content {
    text-align: left;
    /deep/.ivu-select {
      width: 50%;
    }
    .upload {
      p {
        margin-top: 10px;
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        color: rgb(233, 96, 96);
      }
    }
  }
  div.modal-content {
    text-align: left;
  }
  .modal-footer {
    text-align: center;
    margin-top: 40px;
    .add-btn {
      width: 382px;
      height: 56px;
      border: none;
      border-radius: 8px;
      background: rgba(9, 114, 231, 1);
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

<template>
  <div>
    <Row class="header-search">
      <Col span="8" class="col">
        <span class="span span-max" style="text-align: center;">文件名</span>
        <Input v-model='queryInfo.fileName' size="large" placeholder="请输入文件名" clearable />
      </Col>
      <Col span="8" class="col">
        <span class="span span-max" style="text-align: center;">查询时间</span>
        <DatePicker type="daterange" placeholder="开始时间~结束时间" v-model="duration" transfer @on-change="selectTime"></DatePicker>
      </Col>
      <Col span="8" style="text-align: center;">
        <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
        <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
      </Col>
    </Row>
    <Row class="content">
      <Col class="btn-add">
        <Button type="primary" class="add" @click="addFile" v-if="btnShow(115112101)">
          <i class="icon-font iconxinzeng"></i>
          新增文件
        </Button>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="formData" :border="false">
          <template slot='createTime' slot-scope="{ row }">
            {{row.createTime | dateYMD}}
          </template>
          <template slot='fileType'>
            <Icon class="icon-font iconword" size="24" color="#0972E7"/>
          </template>
          <template slot='status' slot-scope="{ row }">
            {{row.status === 0 ? '未发布' : row.status === 1 ? '上线' : '下线'}}
          </template>
          <template slot='operation' slot-scope="{ row }">
            <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" @click="editFile(row.id)" v-if="btnShow(115112102) && row.status !== 1"/>
            <Icon class="icon-font icon212121" size="24" color="#0972E7" title="发布" @click="publishFile(row.id)" v-if="btnShow(115112105) && row.status === 0"/>
            <Icon class="icon-font iconxiazai-" size="24" color="#0972E7" title="下载" @click="uploadFile(row.id)" v-if="btnShow(115112108)"/>
            <Icon class="icon-font iconxiaxiansvg online" size="24" color="#0972E7" title="上线" @click="onlineFile(row.id)" v-if="btnShow(115112106) && row.status === 2"/>
            <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinetFile(row.id)" v-if="btnShow(115112107) && row.status === 1"/>
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

    <!-- 新增文件弹窗 -->
    <Modal v-model='addFileModal' width='70%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>新增文件</span>
      </p>
      <div class='modal-content'>
        <Form ref='issueValidateRef' :model='addFileData'>
          <FormItem label='文件名称' prop="fileName" :rules="{required: true, message: '请输入文件名称', trigger: 'blur'}">
            <Input  class='title-input' v-model="addFileData.fileName" maxlength="25" show-word-limit placeholder='请输入文件名称' />
          </FormItem>
          <FormItem label='上传附件' class="upload" prop="downloadUrl" :rules="{required: true, message: '请上传附件', trigger: 'change'}">
            <Upload :format="['doc','docx','xlsx','xls']" :number=1 @uploadURL="addUploadURL" ref="addAttachmentUpload"/>
            <p>附件格式：doc、docx、xlsx、xls</p>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="preserve">确 定</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 编辑文件弹窗 -->
    <Modal v-model='editFileModal' width='70%' class='modal-information' @on-visible-change="editModalChange">
      <p class='modal-title'>
        <span>新增文件</span>
      </p>
      <div class='modal-content'>
        <Form ref='editValidateRef' :model='editFileData'>
          <FormItem label='文件名称' prop="fileName" :rules="{required: true, message: '请输入文件名称', trigger: 'blur'}">
            <Input  class='title-input' v-model="editFileData.fileName" maxlength="25" show-word-limit placeholder='请输入文件名称' />
          </FormItem>
          <FormItem label='上传附件' class="upload" prop="downloadUrl" :rules="{required: true, message: '请上传附件', trigger: 'change'}">
            <Upload :format="['doc','docx','xlsx','xls']" :number=1 @uploadURL="editUploadURL" ref="editAttachmentUpload" :data="editFileData.downloadUrl"/>
            <p>附件格式：doc、docx、xlsx、xls</p>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="editAttachment">确 定</Button>
          </Row>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Upload from '@/common/upload/upload.vue'
import {
  findAttachmentByPage,
  addAttachment,
  findOneAttachment,
  updateAttachment,
  publishAttachment,
  offlinetAttachment,
  onlineAttachment
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  data () {
    return {
      duration: '',
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10,
        fileName: '',
        startTime: '',
        endTime: ''
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
          title: '文件名称',
          key: 'fileName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '发布时间',
          slot: 'createTime',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '附件',
          slot: 'fileType',
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
      // 表单数据
      formData: [],
      // 控制新增文件弹窗开关
      addFileModal: false,
      // 新增文件数据
      addFileData: {
        fileName: '',
        downloadUrl: '',
        fileType: '',
        fileSize: 0
      },
      // 控制编辑问卷弹窗开关
      editFileModal: false,
      // 编辑问卷数据
      editFileData: {}
    }
  },
  components: {
    Upload
  },
  created () {
    // 查询所有文件
    this.getFindArrachmentAll()
  },
  methods: {
    // 查询文件列表
    getFindAttachmentByPage (data) {
      findAttachmentByPage(data).then(res => {
        if (res.data.code === 10000) {
          this.formData = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询所有文件
    getFindArrachmentAll () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size
      }
      this.getFindAttachmentByPage(data)
    },
    // 根据文件名查询文件
    getFileNameFindAttachment () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        fileName: this.queryInfo.fileName
      }
      this.getFindAttachmentByPage(data)
    },
    // 根据时间段查询文件
    getTimeFindAttachment () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        startTime: this.queryInfo.startTime,
        endTime: this.queryInfo.endTime
      }
      this.getFindAttachmentByPage(data)
    },
    // 根据文件名+时间段查询文件
    getFileNameTimeFindAttachment () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        startTime: this.queryInfo.startTime,
        endTime: this.queryInfo.endTime,
        fileName: this.queryInfo.fileName
      }
      this.getFindAttachmentByPage(data)
    },
    // 点击查询按钮
    inquire () {
      this.queryInfo.page = 1
      if (this.queryInfo.fileName && !this.queryInfo.startTime && !this.queryInfo.endTime) {
        this.getFileNameFindAttachment()
      } else if (!this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getTimeFindAttachment()
      } else if (this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getFileNameTimeFindAttachment()
      } else {
        this.getFindArrachmentAll()
      }
    },
    // 清空
    empty () {
      this.duration = ''
      this.queryInfo = {
        page: 1,
        size: 10,
        fileName: '',
        startTime: '',
        endTime: ''
      }
      this.getFindArrachmentAll()
    },
    // 选择查询时间
    selectTime (time) {
      this.queryInfo.startTime = new Date(time[0]).getTime()
      this.queryInfo.endTime = new Date(time[1]).getTime()
      this.queryInfo.page = 1
      if (this.queryInfo.fileName) {
        this.getFileNameTimeFindAttachment()
      } else {
        this.getTimeFindAttachment()
      }
    },
    // 显示发布资讯弹窗
    addFile () {
      this.addFileModal = true
    },
    // 监听新增文件弹窗状态改变函数
    modalChange (e) {
      if (e) {
        this.$refs.addAttachmentUpload.emptyData()
        this.addFileData = {
          fileName: '',
          downloadUrl: '',
          fileType: ''
        }
      }
    },
    // 获取上传图片地址
    addUploadURL (data) {
      if (data.length > 0) {
        this.addFileData.downloadUrl = data[0].absolutePath
        this.addFileData.fileSize = data[0].fileSize
        this.addFileData.fileType = data[0].fileName.substring(data[0].fileName.indexOf('.') + 1).trim()
      } else {
        this.addFileData.downloadUrl = ''
        this.addFileData.fileType = ''
        this.addFileData.fileSize = 0
      }
    },
    // 保存提交资讯内容
    preserve () {
      this.$refs.issueValidateRef.validate((valid) => {
        if (valid) {
          addAttachment(this.addFileData).then(res => {
            if (res.data.code === 10000) {
              this.addFileModal = false
              this.getFindArrachmentAll()
              this.$Message.success('新增成功')
            }
          })
        }
      })
    },
    // 打开编辑文件弹窗
    editFile (id) {
      this.editFileModal = true
      findOneAttachment(id).then(res => {
        if (res.data.code === 10000) {
          this.editFileData = res.data.data
        }
      })
    },
    // 获取编辑文件上传附件地址
    editUploadURL (data) {
      if (data.length > 0) {
        this.editFileData.downloadUrl = data[0].absolutePath
        this.editFileData.fileSize = data[0].fileSize
        this.editFileData.fileType = data[0].fileName.substring(data[0].fileName.indexOf('.') + 1).trim()
      } else {
        this.editFileData.downloadUrl = ''
        this.editFileData.fileType = ''
        this.editFileData.fileSize = 0
      }
    },
    // 提交编辑文件数据
    editAttachment () {
      this.$refs.editValidateRef.validate((valid) => {
        if (valid) {
          updateAttachment(this.editFileData).then(res => {
            if (res.data.code === 10000) {
              this.editFileModal = false
              this.getFindArrachmentAll()
              this.$Message.success('修改成功')
            }
          })
        }
      })
    },
    // 监听编辑文件弹窗状态改变函数
    editModalChange (e) {
      if (e) {
        this.$refs.editValidateRef.emptyData()
      }
    },
    // 发布文件
    publishFile (id) {
      publishAttachment(id).then(res => {
        if (res.data.code === 10000) {
          this.getFindArrachmentAll()
          this.$Message.success('发布成功')
        }
      })
    },
    // 下线文件
    offlinetFile (id) {
      offlinetAttachment(id).then(res => {
        if (res.data.code === 10000) {
          this.getFindArrachmentAll()
          this.$Message.success('下线成功')
        }
      })
    },
    // 上线文件
    onlineFile (id) {
      onlineAttachment(id).then(res => {
        if (res.data.code === 10000) {
          this.getFindArrachmentAll()
          this.$Message.success('上线成功')
        }
      })
    },
    // 下载文件
    uploadFile (id) {
      location.href = 'http://47.112.144.243:8086/attachment/fileDownload/' + id
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.fileName && !this.queryInfo.startTime && !this.queryInfo.endTime) {
        this.getFileNameFindAttachment()
      } else if (!this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getTimeFindAttachment()
      } else if (this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getFileNameTimeFindAttachment()
      } else {
        this.getFindArrachmentAll()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.fileName && !this.queryInfo.startTime && !this.queryInfo.endTime) {
        this.getFileNameFindAttachment()
      } else if (!this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getTimeFindAttachment()
      } else if (this.queryInfo.fileName && this.queryInfo.startTime && this.queryInfo.endTime) {
        this.getFileNameTimeFindAttachment()
      } else {
        this.getFindArrachmentAll()
      }
    }
  }
}
</script>
