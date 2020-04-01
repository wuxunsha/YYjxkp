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
      <Col span="6" class="col">
        <span class="span span-max" style="text-align: center;">标题</span>
        <Input v-model='queryInfo.title' size="large" placeholder="请输入标题" clearable />
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
      <Col class="btn-add">
        <Button type="primary" class="add" @click="showInformationModal" v-if="btnShow(115108101)">
          <i class="icon-font iconxinzeng"></i>
          发布资讯
        </Button>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="informationData" :border="false">
          <template slot='createTime' slot-scope="{ row }">
            {{row.createTime | dateYMD}}
          </template>
          <template slot='status' slot-scope="{ row }">
            {{row.status === 1 ? '初稿' : row.status === 2 ? '驳回' : row.status === 3 ? '待发布' : row.status === 4 ? '已发布' : row.status === 5 ? '已下线' : '待审核'}}
          </template>
          <template slot='operation' slot-scope="{ row }">
            <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" @click="editModal(row.id)" v-if="btnShow(115108102) && row.status === 1 || row.status === 2" title="编辑"/>
            <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="examine(row.id)" v-if="btnShow(115108103) && row.status != 1" title="查看详情" />
            <Icon class="icon-font icondaishenhe" size="24" color="#0972E7" @click="submitAudit(row.id)" v-if="btnShow(115108107) && row.status === 1" title="提交"/>
            <Icon class="icon-font iconxiaxiansvg online" size="24" color="#0972E7" title="上线" @click="online(row.id)" v-if="btnShow(115108105) && row.status === 3 || row.status === 5"/>
            <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinet(row.id)" v-if="btnShow(115108106) && row.status === 4"/>
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

    <!-- 发布资讯弹窗 -->
    <Modal v-model='informationModal' width='70%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>发布绩效资讯</span>
      </p>
      <div class='modal-content'>
        <Form ref='issueValidateRef' :model='informationList' :rules="addRuleCustom">
          <FormItem label='标 题' prop="title" :rules="{required: true, message: '请输入资讯标题', trigger: 'blur'}">
            <Input  class='title-input' v-model="informationList.title" maxlength="50" show-word-limit placeholder='请输入资讯标题' />
          </FormItem>
          <FormItem label='副标题'>
            <Input  class='title-input' v-model="informationList.titleSmall" maxlength="50" show-word-limit placeholder='请输入副标题' />
          </FormItem>
          <FormItem label='分  类' prop="sortType" :rules="{required: true, message: '请选择分类', trigger: 'change'}">
            <Select placeholder='请选择分类' transfer v-model="informationList.sortType">
              <Option v-for="item in classifyList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label='上传图片' class="upload">
            <Upload :format="['jpg','jpeg','png']" :number=1 @uploadURL="addUploadURL" ref="addInformationUpload"/>
            <p>建议上传图片尺寸：650x442</p>
          </FormItem>
          <FormItem label='通告内容' prop="content">
            <Editor v-model="informationList.content" ref="addEditor"></Editor>
          </FormItem>
          <FormItem label='发布时间' class="release-time">
            <RadioGroup v-model="informationList.timingState" @on-change="radioChange" style="width: 100%;">
              <Row :gutter="200">
                <Col span="8">
                  <Radio label="1">
                    <span>审核通过即发布</span>
                  </Radio>
                </Col>
                <Col span="14" offset="2">
                  <Row>
                    <Col span="9">
                      <Radio label="2">
                        <span>定时发布</span>
                      </Radio>
                    </Col>
                    <Col span="15">
                      <DatePicker v-model="informationList.publishTime" type="datetime" placeholder="请选择发布时间" @on-change="dateTime" :disabled="informationList.timingState === '1' ? true : false"></DatePicker>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <FormItem label='信息来源'>
            <Row>
              <Col span="10">
                <Row>
                  <Col span="24">
                    <Input v-model="informationList.infosource" maxlength="15" show-word-limit/>
                  </Col>
                </Row>
              </Col>
              <Col span="12" offset="2">
                <Row>
                  <Col span="4">
                    <span>作者</span>
                  </Col>
                  <Col span="20">
                    <Input v-model="informationList.author" maxlength="15" show-word-limit/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="preserve">保 存</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 编辑资讯弹窗 -->
    <Modal v-model='editInformationModal' width='70%' class='modal-information' @on-visible-change="editModalChange">
      <p class='modal-title'>
        <span>编辑绩效资讯</span>
      </p>
      <div class='modal-content'>
        <Form ref='editValidateRef' :model='editInformation' :rules="editRuleCustom">
          <FormItem label='标 题' prop="title" :rules="{required: true, message: '请输入资讯标题', trigger: 'blur'}">
            <Input  class='title-input' v-model="editInformation.title" maxlength="50" show-word-limit placeholder='请输入资讯标题' />
          </FormItem>
          <FormItem label='副标题'>
            <Input  class='title-input' v-model="editInformation.titleSmall" maxlength="50" show-word-limit placeholder='请输入副标题' />
          </FormItem>
          <FormItem label='分  类' prop="sortType" :rules="{required: true, message: '请选择分类', trigger: 'change'}">
            <Select placeholder='请选择分类' transfer v-model="editInformation.sortType">
                <Option v-for="item in classifyList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label='上传图片' class="upload">
            <Upload :format="['jpg','jpeg','png']" :number=1 @uploadURL="editUploadURL" :data="editInformation.imgurl" ref="editInformationUpload"/>
            <p>建议上传图片尺寸：650x442</p>
          </FormItem>
          <FormItem label='通告内容' prop="content">
            <Editor v-model="editInformation.content" ref="editEditor"></Editor>
          </FormItem>
          <FormItem label='发布时间' class="release-time">
            <RadioGroup v-model="editInformation.timingState" @on-change="editRadioChange" style="width: 100%;">
              <Row :gutter="200">
                <Col span="8">
                  <Radio label="1">
                    <span>审核通过即发布</span>
                  </Radio>
                </Col>
                <Col span="14" offset="2">
                  <Row>
                    <Col span="9">
                      <Radio label="2">
                        <span>定时发布</span>
                      </Radio>
                    </Col>
                    <Col span="15">
                      <DatePicker v-model="editInformation.publishTime" type="datetime" placeholder="请选择发布时间" @on-change="editDateTime" :disabled="editInformation.timingState === '1' ? true : false" transfer></DatePicker>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <FormItem label='信息来源'>
            <Row>
              <Col span="10">
                <Row>
                  <Col span="24">
                    <Input v-model="editInformation.infosource" maxlength="15" show-word-limit/>
                  </Col>
                </Row>
              </Col>
              <Col span="12" offset="2">
                <Row>
                  <Col span="4">
                    <span>作者</span>
                  </Col>
                  <Col span="20">
                    <Input v-model="editInformation.author" maxlength="15" show-word-limit/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="preserveEdit">保 存</Button>
          </Row>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Editor from '@/common/editor/editor.vue'
import Upload from '@/common/upload/upload.vue'
import {
  findInformation,
  getlistbytype,
  addInformation,
  editInformation,
  updateInformation,
  informationOnline,
  informationSubmitAudit,
  informationOfflinet
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  data () {
    // 发布绩效资讯自定义内容验证规则
    const validateAddContent = (rule, value, callback) => {
      if (this.getSimpleText(value) === '') {
        callback(new Error('请输入资讯内容'))
      } else {
        callback()
      }
    }
    // 发布绩效资讯自定义内容验证规则
    const validateEditContent = (rule, value, callback) => {
      if (!this.getSimpleText(value)) {
        callback(new Error('请输入资讯内容'))
      } else {
        callback()
      }
    }
    return {
      // 页签数据
      tab: null,
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
          key: 'sortTypeName',
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
      informationData: [],
      // 控制发布资讯弹窗开关
      informationModal: false,
      // 发布资讯数据
      informationList: {
        title: '',
        titleSmall: '',
        sortType: '',
        content: '',
        timingState: '1',
        publishTime: '',
        infosource: '',
        author: '',
        infoType: '',
        imgurl: ''
      },
      // 控制编辑资讯弹窗开关
      editInformationModal: false,
      // 编辑资讯弹窗数据
      editInformation: {},
      // 编辑图片数据
      editData: '',
      // 发布绩效资讯表单验证
      addRuleCustom: {
        content: [
          { validator: validateAddContent, trigger: 'blur' }
        ]
      },
      // 发布绩效资讯表单验证
      editRuleCustom: {
        content: [
          { validator: validateEditContent, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Editor,
    Upload
  },
  created () {
    // 获取页签id
    this.getTabId()
  },
  methods: {
    // 获取页签ID
    getTabId () {
      getlistbytype(7).then(res => {
        if (res.data.code === 10000) {
          this.tab = res.data.data[4].nameValue
          // 获取绩效资讯全部数据
          this.getFindInformationAll()
          // 查询分类下拉框数据
          this.getClassifyList()
          // 查询状态下拉框数据
          this.getStatusList()
        }
      })
    },
    // 获取绩效资讯
    getFindInformation (data) {
      findInformation(data).then(res => {
        if (res.data.code === 10000) {
          this.informationData = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 查询分类下拉框数据
    getClassifyList () {
      getlistbytype(11).then(res => {
        if (res.data.code === 10000) {
          this.classifyList = res.data.data
        }
      })
    },
    // 查询状态下拉框数据
    getStatusList () {
      getlistbytype(9).then(res => {
        if (res.data.code === 10000) {
          this.statusList = res.data.data
        }
      })
    },
    // 查询全部资讯
    getFindInformationAll () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size
      }
      this.getFindInformation(data)
    },
    // 标题查询
    getTitleInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title
      }
      this.getFindInformation(data)
    },
    // 分类查询
    classifyInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        sortType: this.queryInfo.classify
      }
      this.getFindInformation(data)
    },
    // 标题+分类查询
    titleClassifyInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        sortType: this.queryInfo.classify
      }
      this.getFindInformation(data)
    },
    // 分类+状态查询
    classifyStatusInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        status: this.queryInfo.status,
        sortType: this.queryInfo.classify
      }
      this.getFindInformation(data)
    },
    // 状态查询
    statusInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        status: Number(this.queryInfo.status)
      }
      this.getFindInformation(data)
    },
    // 状态+标题查询
    statusTitleInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        status: this.queryInfo.status
      }
      this.getFindInformation(data)
    },
    // 状态+标题+分类查询
    statusTitleSortTypeInqire () {
      const data = {
        infoType: this.tab,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        title: this.queryInfo.title,
        status: this.queryInfo.status,
        sortType: this.queryInfo.classify
      }
      this.getFindInformation(data)
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
        this.getFindInformationAll()
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
      this.getFindInformationAll()
    },
    // 显示发布资讯弹窗
    showInformationModal () {
      this.informationModal = true
    },
    // 监听发布资讯弹窗状态改变函数
    modalChange (e) {
      if (e === false) {
        this.$refs.issueValidateRef.resetFields()
        this.$refs.addInformationUpload.emptyData()
        this.$refs.addEditor.setHtml('')
        this.informationList = {
          title: '',
          titleSmall: '',
          sortType: '',
          content: '',
          timingState: '1',
          publishTime: '',
          infosource: '',
          author: '',
          infoType: '',
          imgurl: ''
        }
      }
    },
    // 监听编辑资讯弹窗状态改变函数
    editModalChange (e) {
      if (e === false) {
        this.$refs.editInformationUpload.emptyData()
      }
    },
    // 发布时间选项改变
    radioChange (timingState) {
      this.informationList.timingState = timingState
      if (timingState === '1') {
        this.informationList.publishTime = ''
      }
    },
    // 发布日期
    dateTime (e) {
      this.informationList.publishTime = e
    },
    // 获取上传图片地址
    addUploadURL (data) {
      if (data.length > 0) {
        this.informationList.imgurl = data[0].absolutePath
      } else {
        this.informationList.imgurl = ''
      }
    },
    // 保存提交资讯内容
    preserve () {
      this.$refs.issueValidateRef.validate((valid) => {
        if (valid) {
          this.informationList.infoType = this.tab
          addInformation(this.informationList).then(res => {
            if (res.data.code === 10000) {
              this.informationModal = false
              this.$Message.success('发布资讯成功')
              this.getFindInformationAll()
            }
          })
        }
      })
    },
    // 打开编辑弹窗
    editModal (id) {
      const data = {
        id: id,
        infoType: this.tab
      }
      editInformation(data).then(res => {
        if (res.data.code === 10000) {
          res.data.data.sortType = res.data.data.sortType + ''
          res.data.data.timingState = res.data.data.timingState + ''
          if (res.data.data.publishTime) {
            const date = new Date(res.data.data.publishTime)
            res.data.data.publishTime = this.formatDate(date)
          }
          this.editInformation = res.data.data
          this.$refs.editEditor.setHtml(this.editInformation.content)
        }
      })
      this.editInformationModal = true
    },
    // 编辑发布时间选项改变
    editRadioChange (timingState) {
      this.editInformation.timingState = timingState
      if (timingState === '1') {
        this.editInformation.publishTime = ''
      }
    },
    // 编辑发布日期
    editDateTime (e) {
      this.editInformation.publishTime = e
    },
    editUploadURL (data) {
      if (data.length > 0) {
        this.editInformation.imgurl = data[0].absolutePath
      } else {
        this.editInformation.imgurl = ''
      }
    },
    // 保存编辑内容
    preserveEdit () {
      this.$refs.editValidateRef.validate((valid) => {
        if (valid) {
          if (this.editInformation.publishTime) {
            const d = new Date(this.editInformation.publishTime)
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
            this.editInformation.publishTime = resDate + ' ' + resTime
          }
          updateInformation(this.editInformation).then(res => {
            if (res.data.code === 10000) {
              this.editInformationModal = false
              this.$Message.success('编辑绩效资讯成功')
              this.getFindInformationAll()
            }
          })
        }
      })
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
        this.getFindInformationAll()
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
        this.getFindInformationAll()
      }
    },
    // 查看详情
    examine (id) {
      this.$router.push({
        path: './examine_lightspot_particulars',
        query: {
          id: id,
          infoType: this.tab
        }
      })
    },
    // 提交
    submitAudit (id) {
      const data = {
        id: id,
        infoType: this.tab
      }
      informationSubmitAudit(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交审核成功')
          this.getFindInformationAll()
        }
      })
    },
    // 上线
    online (id) {
      const data = {
        id: id,
        infoType: this.tab
      }
      informationOnline(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('上线成功')
          this.getFindInformationAll()
        }
      })
    },
    // 下线
    offlinet (id) {
      const data = {
        id: id,
        infoType: this.tab
      }
      informationOfflinet(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('下线成功')
          this.getFindInformationAll()
        }
      })
    },
    // 格式化时间
    formatDate (now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      return year + ' - ' + month + ' - ' + date + ' ' + hour + ' : ' + minute + ' : ' + second
    },
    // 补零
    p (s) {
      return s < 10 ? '0' + s : s
    },
    // 获取富文本中的纯文本
    getSimpleText (html) {
      let re1 = new RegExp('<.+?>', 'g')
      let msg = html.replace(re1, '')
      return msg
    }
  }
}
</script>
