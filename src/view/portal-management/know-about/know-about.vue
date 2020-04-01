<style lang="less" scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 16px;
  font-weight: 500;
  line-height: 57px;
  color: rgba(9, 114, 231, 1);
  padding: 0 50px;
}
/deep/.ivu-tabs-nav-container {
  background: #fff;
}
/deep/.ivu-tabs-bar {
  border-bottom: 14px solid #F5F7F9;
  margin-bottom: 0;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #FF9B29;
}
/deep/.ivu-tabs-ink-bar {
  background-color: #FF9B29;
}
/deep/.ivu-badge-count-alone {
  top: -10px;
  left: 10px;
}
.ivu-form-item {
  margin-bottom: 0;
}
/deep/.ivu-form-item-label {
  width: 80px;
  text-align: center;
}
/deep/.ivu-form-item-content {
  margin-left: 80px;
}
/deep/.ivu-modal-footer {
  border-top: 0;
  display: none;
}
/deep/.ivu-icon {
  margin-right: 6px;
}
.content {
  margin-top: 0;
  .online {
    transform: rotate(180deg)
  }
}
/* 新增人员弹窗 */
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
    .modalRow {
      margin-top: 20px;
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
/* 新增公告弹窗 */
.modal-annunciate {
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
    .modalRow {
      margin-top: 20px;
    }
    // 上传文件
    .modalUpload {
      margin-top: 20px;
    }
    // 上传文件提示语
    .reminder {
      margin-top: 16px;
      p {
        font-size: 12px;
        font-weight:500;
        line-height: 12px;
        color:rgba(226,0,30,1);
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
/* 查看通告详情弹窗 */
.modal-examine {
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
  // 通告内容
  .modal-content {
    p {
      text-indent: 2em;
    }
  }
  // 日期
  .annunciate-date {
    text-align: right;
    margin-top: 10px;
  }
  // 附件
  .accessory {
    padding-left: 30px;
  }
}
</style>

<template>
  <div>
    <Layout>
      <Content>
        <Tabs class="tabs" value="name1">
          <TabPane label="机构介绍" name="name1" class="tabs1">
            <div>
              <Row class="content">
                <Col class="btn-add">
                  <Button type="primary" class="add" @click="showAddPracticalModal" v-if="btnShow(115103101)">
                    <i class="icon-font iconxinzeng"></i>
                    新增人员
                  </Button>
                </Col>
                <Col>
                  <Table :row-class-name="rowClassName" :columns="columns" :data="organizationData" :border="false">
                    <template slot='operation' slot-scope="{ row }">
                      <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" @click="showEditPracticalModal(row.id)" v-if="btnShow(115103103)"/>
                      <Icon class="icon-font iconshanchu" size="24" color="#0972E7" title="删除" @click="deletePersonnel(row.id)" v-if="btnShow(115103102)"/>
                    </template>
                  </Table>
                </Col>
                <Col class="page">
                  <Page
                    :total="queryInfo.total"
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
            </div>
          </TabPane>
          <TabPane label="公告公示" name="name2" class="tabs2">
            <div>
              <Row class="header-search">
                <Col span="8" class="col">
                  <span class="span span-max" style="text-align: center;">通告名称</span>
                  <Input v-model='noticeQueryInfo.name' size="large" placeholder="请输入通告名称" clearable />
                </Col>
                <Col span="8" class="col">
                  <span class="span span-max" style="text-align: center;">状态</span>
                  <Select v-model='noticeQueryInfo.status' placeholder="默认全部状态" @on-change="surveyStatusChange" size="large" transfer>
                    <Option v-for="item in statusList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Col>
                <Col span="7" style="text-align: center;" offset="1">
                  <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
                  <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
                </Col>
              </Row>
               <Row class="content">
                <Col class="btn-add">
                  <Button type="primary" class="add" @click="showAnnunciateModal" v-if="btnShow(115104101)">
                    <i class="icon-font iconxinzeng"></i>
                    新增公告
                  </Button>
                </Col>
                <Col>
                  <Table :row-class-name="rowClassName" :columns="noticeColumns" :data="noticeData" :border="false">
                    <template slot='createTime' slot-scope="{ row }">
                      {{row.createTime | dateYMD}}
                    </template>
                    <template slot='attamentIds' slot-scope="{ row }">
                      {{row.attamentIds.length}}
                    </template>
                    <template slot='status' slot-scope="{ row }">
                      {{row.status === 0 ? '待发布' : row.status === 1 ? '上线' : '下线'}}
                    </template>
                    <template slot='operation' slot-scope="{ row }">
                      <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" @click="editAnnunciate(row.id)" v-if="btnShow(115104102) && row.status === 0" />
                      <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineAnnunciate(row.id)" v-if="btnShow(115104103) && row.status != 0" />
                      <Icon class="icon-font iconfabu1" size="24" color="#0972E7" title="发布" @click="releaseAnnunciate(row.id)" v-if="btnShow(115104108) && row.status === 0" />
                      <Icon class="icon-font iconxiaxiansvg online" size="24" color="#0972E7" title="上线" @click="onlineAnnunciate(row.id)" v-if="btnShow(115104106) && row.status === 2" />
                      <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinetAnnunciate(row.id)" v-if="btnShow(115104107) && row.status === 1" />
                    </template>
                  </Table>
                </Col>
                <Col class="page">
                  <Page
                    :total="noticeQueryInfo.total"
                    :page-size="noticeQueryInfo.size"
                    :current="noticeQueryInfo.page"
                    prev-text="上一页"
                    next-text="下一页"
                    @on-change='noticeHandlePageChange'
                    @on-page-size-change='noticeHandleSizeChange'
                    show-sizer
                    show-total
                    show-elevator
                    :page-size-opts="[10, 20, 30, 50]"
                  />
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>

    <!-- 新增人员弹窗 -->
    <Modal v-model='addPersonnelModal' width='60%' class='modal-information' @on-visible-change="addModalChange">
        <p class='modal-title'>
            <span>新增人员</span>
        </p>
        <div class='modal-content'>
            <Form ref='addPersonnelValidateRef' :model='addPersonnelData'>
                <FormItem label='机构类型' class="modalRow" prop="orgType" :rules="{required: true, message: '请选择机构类型', trigger: 'change'}">
                    <Select v-model="addPersonnelData.orgType" placeholder='受益机构' @on-change="intionalType">
                        <Option v-for="item in institutionalTypeList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label='职位' class="modalRow" prop="positionId" :rules="{required: true, message: '请选择职位', trigger: 'change'}">
                    <Select v-model="addPersonnelData.positionId" placeholder='请选择职位' :disabled="positionFlag" >
                        <Option v-for="item in positionList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label='姓名' class="modalRow" prop="name" :rules="{required: true, message: '请输入姓名', trigger: 'blur'}">
                    <Input v-model="addPersonnelData.name" placeholder="请输入姓名" maxlength="12" show-word-limit/>
                </FormItem>
                <FormItem label='备注' class="modalRow">
                    <Input v-model="addPersonnelData.remarks" placeholder="请输入备注" maxlength="15" show-word-limit/>
                </FormItem>
                <!-- 保存按钮 -->
                <Row class='modal-footer'>
                    <Button class='add-btn' @click="saveAddStaff">保 存</Button>
                </Row>
            </Form>
        </div>
    </Modal>

    <!-- 编辑机构人员弹窗 -->
    <Modal v-model='editPersonnelModal' width='70%' class='modal-information' @on-visible-change="editModalChange">
      <p class='modal-title'>
        <span>编辑机构人员</span>
      </p>
      <div class='modal-content'>
        <Form ref='editPersonnelValidateRef' :model='editPersonnelData'>
          <FormItem label='机构类型' class="modalRow" prop="orgType" :rules="{required: true, message: '请选择机构类型', trigger: 'change'}">
            <Select v-model="editPersonnelData.orgType" placeholder='受益机构' @on-change="editIntionalType">
              <Option v-for="item in institutionalTypeList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label='职位' class="modalRow" prop="positionId" :rules="{required: true, message: '请选择职位', trigger: 'change'}">
            <Select v-model="editPersonnelData.positionId" placeholder='请选择职位' >
              <Option v-for="item in positionList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label='姓名' class="modalRow" prop="name" :rules="{required: true, message: '请输入姓名', trigger: 'blur'}">
            <Input v-model="editPersonnelData.name" placeholder="请输入姓名" maxlength="12" show-word-limit/>
          </FormItem>
          <FormItem label='备注' class="modalRow">
            <Input v-model="editPersonnelData.remarks" placeholder="请输入备注" maxlength="15" show-word-limit/>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="saveEditStaff">保 存</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 新增通告弹窗 -->
    <Modal v-model='annunciateModel' width='70%' class='modal-annunciate' @on-visible-change="annunciateModelChange">
        <p class='modal-title'>
          <span>发布公告</span>
        </p>
        <div class='modal-content'>
          <Form ref='annunciateValidateRef' :model='annunciateData' :rules="addRuleAnnunciate">
            <FormItem label='公告标题' class="modalRow" prop="title" :rules="{required: true, message: '请输入公告标题', trigger: 'blur'}">
              <Input v-model="annunciateData.title" placeholder="请输入标题" maxlength="50" show-word-limit/>
            </FormItem>
            <FormItem label='内容详情' class="modalRow" prop="content">
              <Editor v-model="annunciateData.content" ref="editor"></Editor>
            </FormItem>
            <FormItem label='上传附件' class="modalUpload">
              <Upload :format="['jpg','jpeg','pdf','doc','docx']" :number=5 @uploadURL="addUploadURL"/>
            </FormItem>
            <FormItem class="reminder">
              <Row>
                <Col span="24">
                  <p>支持JPEG、PDF、DOC、DOCX格式，最多上传5个附件</p>
                </Col>
              </Row>
            </FormItem>
            <!-- 保存按钮 -->
            <Row class='modal-footer'>
              <Button class='add-btn' @click="Rule">完 成</Button>
            </Row>
          </Form>
        </div>
    </Modal>

    <!-- 编辑通告弹窗 -->
    <Modal v-model='editAnnunciateModel' width='70%' class='modal-annunciate' @on-visible-change="editAnnunciateModelChange">
      <p class='modal-title'>
        <span>编辑通告</span>
      </p>
      <div class='modal-content'>
        <Form :model='editAnnunciateData' ref='editAnnunciateValidateRef' :rules="editRuleAnnunciate">
          <FormItem label='公告标题' class="modalRow" prop="title" :rules="{required: true, message: '请输入公告标题', trigger: 'blur'}">
            <Input v-model="editAnnunciateData.title" placeholder="请输入标题" maxlength="50" show-word-limit/>
          </FormItem>
          <FormItem label='内容详情' class="modalRow" prop="content">
            <Editor v-model="editAnnunciateData.content" ref="editEditor"></Editor>
          </FormItem>
          <FormItem label='上传附件' class="modalUpload">
            <Upload :format="['jpg','jpeg','pdf','doc','docx']" :number=5 @uploadURL="editUploadURL"/>
          </FormItem>
          <FormItem class="reminder">
            <Row>
              <Col span="24">
                <p>支持JPEG、PDF、DOC、DOCX格式，最多上传5个附件</p>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="addEditAnnunciate">完 成</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 查看通告详情弹窗 -->
    <Modal v-model='examineAnnunciateModel' width='70%' class='modal-examine'>
      <p class='modal-title'>
        <span>{{examineData.title}}</span>
      </p>
      <Row class='modal-content'>
        <Col span="24" v-html="examineData.content">

        </Col>
      </Row>
      <Row class="annunciate-date">
        <Col span="24">
          <p>
            <span>日期：</span>
            <span>{{examineData.createTime}}</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <p>附件</p>
        </Col>
      </Row>
      <Row class="accessory">
        <Col span="3" style="text-align: center;">
          <div>
            <Icon type="ios-albums" />
          </div>
          <p>环境保护</p>
        </Col>
        <Col span="3" style="text-align: center;">
          <div>
            <Icon type="ios-albums" />
          </div>
          <p>环境保护</p>
        </Col>
        <Col span="3" style="text-align: center;">
          <div>
            <Icon type="ios-albums" />
          </div>
          <p>环境保护</p>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Editor from '@/common/editor/editor.vue'
import Upload from '@/common/upload/upload.vue'
import {
  portalPersonFind,
  portalNoticeFindNotice,
  getlistbytype,
  addPortalPerson,
  portalPersonFindOne,
  portalPersonDelete,
  portalPersonUpdate,
  addPortalNotice,
  portalNoticeFindOne,
  updatePortalNotice,
  releasePortalNotice,
  offlinetPortalNotice,
  onlinePortalNotice
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
      // 机构介绍查询条件
      queryInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      // 机构介绍表格参数
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
          title: '机构类型',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '职位',
          key: 'positionName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remarks',
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
      // 机构介绍表格数据
      organizationData: [],
      // 控制新增人员弹窗开关
      addPersonnelModal: false,
      // 新增人员机构类型下拉框数据
      institutionalTypeList: [],
      // 禁用新增人员职位下拉框开关
      positionFlag: true,
      // 新增人员职位下拉框数据
      positionList: [],
      // 新增人员数据
      addPersonnelData: {
        orgType: '',
        positionId: '',
        name: '',
        remarks: ''
      },
      // 控制编辑机构人员弹窗开关
      editPersonnelModal: false,
      // 编辑机构介绍人员数据
      editPersonnelData: {
        orgType: '',
        positionId: '',
        name: '',
        remarks: ''
      },
      // 公告公示查询条件
      noticeQueryInfo: {
        page: 1,
        size: 10,
        total: 0,
        name: '',
        status: ''
      },
      // 公告公示状态下拉框数据
      statusList: [],
      // 公告公示表格参数
      noticeColumns: [
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
          title: '通告名称',
          key: 'title',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '内容摘要',
          key: 'content',
          className: 'tb-header',
          align: 'center',
          tooltip: true
        },
        {
          title: '发布时间',
          slot: 'createTime',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '附件',
          slot: 'attamentIds',
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
      // 公告公示表格数据
      noticeData: [],
      // 发布通告弹窗开关
      annunciateModel: false,
      // 新增通告数据
      annunciateData: {
        title: '',
        content: '',
        attamentIds: ''
      },
      // 新增通告上传文件路径
      addPersonnelURL: [],
      // 编辑通告上传文件路径
      editPersonnelURL: [],
      // 编辑公告弹窗开关
      editAnnunciateModel: false,
      // 编辑通告数据
      editAnnunciateData: {},
      // 查看通告详情弹窗开关
      examineAnnunciateModel: false,
      // 查看通告详情数据
      examineData: {},
      // 发布绩效资讯表单验证
      addRuleAnnunciate: {
        content: [
          { validator: validateAddContent, trigger: 'blur' }
        ]
      },
      // 发布绩效资讯表单验证
      editRuleAnnunciate: {
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
    // 查询机构介绍数据
    this.getPortalPersonFindListAll()
    // 查询公示公告全部数据
    this.getPortalNoticeFindList()
    // 查询公告公示状态下拉框数据
    this.getPortalNoticeTypeList()
  },

  computed: {},

  methods: {
    // 查询机构介绍数据
    getPortalPersonFindList (data) {
      portalPersonFind(data).then(res => {
        if (res.data.code === 10000) {
          this.organizationData = res.data.data.dataList
          this.queryInfo.total = res.data.data.total
        }
      })
    },
    // 查询机构介绍全部数据
    getPortalPersonFindListAll () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size
      }
      this.getPortalPersonFindList(data)
    },
    // 查询新增人员机构类型下拉框数据
    getTypeList () {
      getlistbytype(13).then(res => {
        if (res.data.code === 10000) {
          this.institutionalTypeList = res.data.data
        }
      })
    },
    // 查询职位
    getPosition (typeId) {
      getlistbytype(typeId).then(res => {
        if (res.data.code === 10000) {
          this.positionList = res.data.data
        }
      })
    },
    // 显示新增人员弹窗
    showAddPracticalModal () {
      this.getTypeList()
      this.addPersonnelModal = true
      this.positionFlag = true
    },
    // 监听新增人员弹窗状态改变函数
    addModalChange (e) {
      if (e === false) {
        this.$refs.addPersonnelValidateRef.resetFields()
        this.addPersonnelData = {
          orgType: '',
          positionId: '',
          name: '',
          remarks: ''
        }
      }
    },
    // 新增人员机构类型改变
    intionalType (e) {
      this.positionFlag = false
      if (e) {
        this.getPosition(e)
      }
    },
    // 保存新增人员
    saveAddStaff () {
      this.$refs.addPersonnelValidateRef.validate((valid) => {
        if (valid) {
          addPortalPerson(this.addPersonnelData).then(res => {
            if (res.data.code === 10000) {
              this.addPersonnelModal = false
              this.getPortalPersonFindListAll()
              this.$Message.success('新增人员成功')
            }
          })
        }
      })
    },
    // 显示编辑机构人员弹窗
    showEditPracticalModal (id) {
      this.editTypeList()
      this.getPositionFindOne(id)
      this.editPersonnelModal = true
    },
    // 按id查询机构人员
    getPositionFindOne (id) {
      portalPersonFindOne(id).then(res => {
        if (res.data.code === 10000) {
          res.data.data.orgType = res.data.data.orgType + ''
          res.data.data.positionId = res.data.data.positionId + ''
          this.editPersonnelData = res.data.data
          this.getPosition(this.editPersonnelData.orgType)
        }
      })
    },
    // 查询编辑机构人员类型下拉框数据
    editTypeList () {
      getlistbytype(13).then(res => {
        if (res.data.code === 10000) {
          this.institutionalTypeList = res.data.data
        }
      })
    },
    // 编辑机构人员弹窗机构类型改变
    editIntionalType (e) {
      if (e) {
        this.getPosition(e)
      }
    },
    // 监听编辑机构人员弹窗状态改变函数
    editModalChange (e) {
      if (e === false) {
        this.$refs.editPersonnelValidateRef.resetFields()
        this.editPersonnelURL = []
        this.editPersonnelData = {
          orgType: '',
          positionId: '',
          name: '',
          remarks: ''
        }
      }
    },
    // 保存编辑机构人员信息
    saveEditStaff () {
      this.$refs.editPersonnelValidateRef.validate((valid) => {
        if (valid) {
          this.editPersonnelData.attamentIds = this.editPersonnelURL.toString()
          portalPersonUpdate(this.editPersonnelData).then(res => {
            if (res.data.code === 10000) {
              this.editPersonnelURL = []
              this.editPersonnelModal = false
              this.getPortalPersonFindListAll()
              this.$Message.success('编辑成功')
            }
          })
        }
      })
    },
    // 删除机构人员
    deletePersonnel (id) {
      this.$Modal.confirm({
        title: '是否删除该人员？',
        content: '<p>此删除为永久删除，请确认是否删除？</p>',
        onOk: () => {
          portalPersonDelete(id).then(res => {
            if (res.data.code === 10000) {
              this.getPortalPersonFindListAll()
              this.$Message.success('删除成功')
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    // 机构介绍页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getPortalPersonFindListAll()
    },
    // 机构介绍每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getPortalPersonFindListAll()
    },
    // 显示新增通告弹窗
    showAnnunciateModal () {
      this.annunciateModel = true
    },
    // 监听新增公告弹窗状态改变函数
    annunciateModelChange (e) {
      if (e === false) {
        this.$refs.annunciateValidateRef.resetFields()
        this.$refs.editor.setHtml('')
        this.addPersonnelURL = []
        this.annunciateData = {
          title: '',
          content: '',
          attamentIds: ''
        }
      }
    },
    // 查询公示公告全部数据
    getPortalNoticeFindListAll (data) {
      portalNoticeFindNotice(data).then(res => {
        if (res.data.code === 10000) {
          res.data.data.dataList.map(item => {
            if (item.attamentIds) {
              let attamentIdsString = item.attamentIds
              let attamentIdsArr = attamentIdsString.split(',')
              item.attamentIds = attamentIdsArr
            } else {
              item.attamentIds = []
            }
            if (item.content) {
              let htmlStr = item.content
              let text = this.getSimpleText(htmlStr)
              item.content = text
            }
          })
          this.noticeData = res.data.data.dataList
          this.noticeQueryInfo.total = res.data.data.total
        }
      })
    },
    // 查询公告公示状态下拉框数据
    getPortalNoticeTypeList () {
      getlistbytype(14).then(res => {
        if (res.data.code === 10000) {
          this.statusList = res.data.data
        }
      })
    },
    // 查询公告公示数据
    getPortalNoticeFindList () {
      const data = {
        page: this.noticeQueryInfo.page,
        size: this.noticeQueryInfo.size
      }
      this.getPortalNoticeFindListAll(data)
    },
    // 公告公示通告名称查询
    nameInquire () {
      const data = {
        page: this.noticeQueryInfo.page,
        size: this.noticeQueryInfo.size,
        title: this.noticeQueryInfo.name
      }
      this.getPortalNoticeFindListAll(data)
    },
    // 公告公示状态查询
    statusInquire () {
      const data = {
        page: this.noticeQueryInfo.page,
        size: this.noticeQueryInfo.size,
        status: this.noticeQueryInfo.status
      }
      this.getPortalNoticeFindListAll(data)
    },
    // 公告公示名称+状态查询
    statusNameInquire () {
      const data = {
        page: this.noticeQueryInfo.page,
        size: this.noticeQueryInfo.size,
        status: this.noticeQueryInfo.status,
        title: this.noticeQueryInfo.name
      }
      this.getPortalNoticeFindListAll(data)
    },
    // 公告公示状态下拉框改变
    surveyStatusChange (e) {
      this.noticeQueryInfo.page = 1
      if (!this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusInquire()
      } else if (this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusNameInquire()
      }
    },
    // 点击公告公示查询
    inquire () {
      this.noticeQueryInfo.page = 1
      if (this.noticeQueryInfo.name && !this.noticeQueryInfo.status) {
        this.nameInquire()
      } else if (!this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusInquire()
      } else if (this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusNameInquire()
      } else {
        this.getPortalNoticeFindList()
      }
    },
    // 提交新增通告
    Rule () {
      this.$refs.annunciateValidateRef.validate((valid) => {
        if (valid) {
          this.annunciateData.attamentIds = this.addPersonnelURL.toString()
          addPortalNotice(this.annunciateData).then(res => {
            if (res.data.code === 10000) {
              this.addPersonnelURL = []
              this.annunciateModel = false
              this.$Message.success('新增通告成功')
              this.getPortalNoticeFindList()
            }
          })
        }
      })
    },
    // 显示编辑通告
    editAnnunciate (id) {
      portalNoticeFindOne(id).then(res => {
        if (res.data.code === 10000) {
          this.editAnnunciateData = res.data.data
          this.$refs.editEditor.setHtml(this.editAnnunciateData.content)
          this.editAnnunciateModel = true
        }
      })
    },
    // 提交编辑公告信息
    addEditAnnunciate () {
      this.$refs.editAnnunciateValidateRef.validate((valid) => {
        if (valid) {
          updatePortalNotice(this.editAnnunciateData).then(res => {
            if (res.data.code === 10000) {
              this.editAnnunciateModel = false
              this.$Message.success('编辑通告成功')
              this.getPortalNoticeFindList()
            }
          })
        }
      })
    },
    // 监听编辑公告弹窗改变
    editAnnunciateModelChange (e) {
      if (e === false) {
        this.$refs.editAnnunciateValidateRef.resetFields()
        this.$refs.editor.setHtml('')
      }
    },
    // 公告公示页码改变
    noticeHandlePageChange (page) {
      this.noticeQueryInfo.page = page
      if (this.noticeQueryInfo.name && !this.noticeQueryInfo.status) {
        this.nameInquire()
      } else if (!this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusInquire()
      } else if (this.noticeQueryInfo.name && this.noticeQueryInfo.status) {
        this.statusNameInquire()
      } else {
        this.getPortalNoticeFindList()
      }
    },
    // 公告公示每页显示条数改变
    noticeHandleSizeChange (size) {
      this.noticeQueryInfo.size = size
      if (this.noticeQueryInfo.name && !this.noticeQueryInfo.status) {
        this.nameInquire()
      } else if (!this.noticeQueryInfo.name && this.noticeQueryInfo.statsus) {
        this.statusInquire()
      } else if (this.noticeQueryInfo.name && this.noticeQueryInfo.statsus) {
        this.statusNameInquire()
      } else {
        this.getPortalNoticeFindList()
      }
    },
    // 清空公示公告查询条件
    empty () {
      this.noticeQueryInfo = {
        page: 1,
        size: 10,
        name: '',
        status: ''
      }
      this.getPortalNoticeFindList()
    },
    // 新增通告获取上传图片地址
    addUploadURL (data) {
      if (data.length > 0) {
        data.forEach(item => {
          this.addPersonnelURL.push(item.url)
        })
      } else {
        this.addPersonnelURL = []
      }
    },
    // 编辑通告获取上传图片地址
    editUploadURL (data) {
      if (data.length > 0) {
        data.forEach(item => {
          this.editPersonnelURL.push(item.url)
        })
      } else {
        this.editPersonnelURL = []
      }
    },
    // 查看通告详情
    examineAnnunciate (id) {
      portalNoticeFindOne(id).then(res => {
        if (res.data.code === 10000) {
          let date = new Date(res.data.data.createTime)
          let formatDate = this.formatDate(date)
          res.data.data.createTime = formatDate
          this.examineData = res.data.data
          this.examineAnnunciateModel = true
        }
      })
    },
    // 发布通告
    releaseAnnunciate (id) {
      releasePortalNotice(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('发布成功')
          this.getPortalNoticeFindList()
        }
      })
    },
    // 下线通告
    offlinetAnnunciate (id) {
      offlinetPortalNotice(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('下线成功')
          this.getPortalNoticeFindList()
        }
      })
    },
    // 上线通告
    onlineAnnunciate (id) {
      onlinePortalNotice(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('上线成功')
          this.getPortalNoticeFindList()
        }
      })
    },
    // 获取富文本中的纯文本
    getSimpleText (html) {
      let re1 = new RegExp('<.+?>', 'g')
      let msg = html.replace(re1, '')
      return msg
    },
    // 格式化时间
    formatDate (now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      return year + '年' + month + '月' + date + '日'
    }
  }
}
</script>
