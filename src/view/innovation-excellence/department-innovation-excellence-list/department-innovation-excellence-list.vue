<style lang='less' scoped>
@import "../innovation-excellence-list/innovation-excellence-list.less";
.checkRule{
  /deep/.ivu-select-selected-value{
  width: 180px;
  }
  /deep/.ivu-modal-footer {
    display: none;
  }
}
.addRules {
  /deep/.ivu-modal-footer {
    display: none;
  }
}
/deep/.ivu-table-wrapper {
  border: 0;
  /deep/.ivu-table-header thead tr th {
    padding: 16px 0;
  }
  /deep/.ivu-table-header {
    font-size: 1.0625rem;
    font-weight: bold;
  }
}
.InformationQuery {
  display: flex;
  .inputBox {
    flex: 1;
    display: flex;
    align-items: center;
    span {
      width: 30%;
      text-align: center;
    }
  }
}
.button {
  display: flex;
  justify-content: flex-end;
  /deep/.search-btn {
    width: 25%;
    height: 100%;
    border-radius: 4px;
    border: 0;
    background-color: #0972E7;
    color: #fff;
    margin-right: 60px;
  }
  /deep/.empty-btn {
    width: 25%;
    height: 100%;
    border-radius: 4px;
    border: 0;
    background-color: #CAE4FF;
    color: #0972E7;
  }
}
</style>

<template>
  <div class="layout">
    <layout>
      <div class="form-content">
        <!-- 查询区域 -->
        <Row class='inquire'>
          <div class="InformationQuery">
            <!-- 名称查询 -->
            <div class="input-left inputBox">
              <span>名称</span>
              <Input clearable class='title-input' placeholder="请输入名称" v-model="checkInfo.title" />
            </div>
            <!-- 查询时间 -->
            <div class="input-center inputBox">
              <span>查询时间</span>
              <DatePicker  type="date" :start-date="new Date(2020, 0, 1)" placeholder="开始时间" style="width: 75%" v-model="checkInfo.startTime"></DatePicker>
            </div>
            <div class="input-right inputBox">
              <span>~</span>
              <DatePicker type="date" :start-date="new Date(2020, 0, 1)" placeholder="截止时间" style="width: 86%" v-model="checkInfo.endTime"></DatePicker>
            </div>
          </div>
        </Row>
        <Row class="inquire">
          <div class="InformationQuery">
            <!-- 状态查询 -->
            <div class="input-left inputBox">
              <span>状态</span>
              <Select v-model="checkInfo.status" class="status-select" placeholder="全部状态" transfer >
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <!-- 评级 -->
            <div class="input-center inputBox">
              <span style="width:40%">评级</span>
              <Select v-model="checkInfo.rating" class="status-select" placeholder="全部状态" transfer >
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <!-- 查询清空按钮 -->
            <div class="button inputBox">
              <button class='search-btn' @click="checkHandeler">查 询</button>
              <button class='empty-btn' @click="clearHandeler">清 空</button>
            </div>
          </div>
        </Row>
        <Content class='from-content'>
          <!-- 发布资讯 -->
          <Row class='create'>
            <Col span='24' class='create-template'>
              <Button type='primary' icon='ios-search' class='create-btn' style="margin-right:15px;" @click="newCreatedList" v-if="btnShow(114102101)">
                新增创新创优
              </Button>
              <Button type='primary' icon='ios-search' class='create-btn' @click="checkRule" >
                查看规则
              </Button>
            </Col>
          </Row>
          <!-- 创新创优表格内容 -->
          <Row class="table">
              <Table stripe   :columns='listHeader' :data='queryListData' disabled-hover>
                <template slot='applicationTime' slot-scope="{ row }">
                  {{row.createTime | dateFormat}}
                </template>
                <template slot="Status" slot-scope="{ row }">
                  <span v-if="row.status === 0">初稿</span>
                  <span v-if="row.status === 1">申请中</span>
                  <span v-if="row.status === 2">审核通过</span>
                  <span v-if="row.status === 3">驳回</span>
                </template>
                <template slot='operation' slot-scope="{ row }">
                  <!-- 查看 -->
                  <!-- v-if="row.status === 1 || row.status === 2" -->
                  <Icon  class="icon-font iconchakan" title="查看详情"  size="24" color="#0972E7" @click="seeDetailHandeler(row.id)" v-if="btnShow(114102104) && row.status === 1 || row.status === 2" />
                  <!-- <Button shape="circle" icon="ios-brush" title="查看详情" @click="seeDetailHandeler(row.id)" v-if="row.status === 1 || row.status === 2" ></Button> -->
                  <!-- 修改 -->
                  <!-- v-if="row.status === 3 || row.status === 0"  -->
                  <Icon type="ios-create-outline" size="24" title="修改" color="#0972E7" @click="modifyHanderle(row)" v-if="btnShow(114102102) && row.status === 3 || row.status === 0" />
                  <!-- <Button shape="circle" icon="ios-apps-outline" title="修改" v-if="row.status === 3 || row.status === 0" @click="modifyHanderle(row)"></Button> -->
                  <!-- 发布申请 -->
                  <!-- v-if="row.status === 0" -->
                  <Icon  class="ivu-icon icon-font icon212121" title="发布申请" size="24" color="#0972E7" @click="postApplication(row)" v-if="btnShow(114102105) && row.status === 0"/>
                  <!-- <Button shape="circle" icon="ios-albums-outline" title="发布申请" v-if="row.status === 0" @click="postApplication(row)" ></Button> -->
                  <!-- 删除 -->
                  <!-- v-if="row.status === 3 || row.status === 0"  -->
                  <!-- <Button shape="circle" icon="ios-albums-outline" title="删除" v-if="row.status === 3 || row.status === 0"  @click="deleteHandeler(row.id)" ></Button> -->
                  <Icon  class="ivu-icon icon-font iconshanchu" title="删除" size="24" color="red" @click="deleteHandeler(row.id)" v-if="btnShow(114102103) && row.status === 3 || row.status === 0" />
              </template>
              </Table>
          </Row>
          <!-- 分页 -->
          <Row class='page'>
            <Page :total='total' :current='currentPage' :page-size-opts="[10, 20, 30, 50]" :page-size='pagesize' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange'/>
          </Row>
        </Content>
      </div>
    </layout>

    <!-- 新建创新创优模板弹框 -->
    <Modal v-model='addTemplateStatus' width='60%' class='modal-information addTemplate' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>新建创新创优</span>
      </p>
      <div class='modal-content'>
        <Form ref='issueValidateRef'>
          <!-- 项目名称 -->
          <FormItem label='项目名称'>
            <Input  class='title-input'  maxlength="15" show-word-limit placeholder='请输入项目名称' v-model="saveInfo.title" />
          </FormItem>
          <!-- 内容摘要 -->
          <FormItem label='内容摘要'>
            <Input  class='title-input'  maxlength="25" show-word-limit placeholder='请输入内容摘要' v-model="saveInfo.content" />
          </FormItem>
          <!-- 项目说明 -->
          <FormItem label='项目说明'>
            <Input  type="textarea" maxlength="140" :rows="10" style="height:240px;" placeholder="请输入项目说明" v-model="saveInfo.projectDesc" />
          </FormItem>
          <!-- 上传附件 -->
          <FormItem label='上传附件' class="modalUpload">
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" v-bind:key="index">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                      :number="fileNumberLimt"
                      :format="fileFormat"
                      :data="defaultList1"
                      @uploadURL="uploadURL"
                      >
                    </Upload>
                    <p style="color:#777;">最多支持3个附件（JPEG、pdf、word文档）</p>
                </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="saveHandeler">保 存</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 查看规则模板 -->
    <Modal v-model='checkRuleStatus' width='60%' class='modal-information checkRule' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>创新创优规则</span>
      </p>
      <div class='modal-content'>
        <Row style="margin-bottom:20px;">
            <!-- <Button type='primary' icon='ios-search' class='create-btn' @click="addRuleHandeler" >新增规则</Button> -->
        </Row>
        <!-- 查看规则的表格 -->
        <Row class="table">
            <Table stripe   :columns='viewRulesHeader' :data='viewRulesList' disabled-hover>
                  <template slot='operation' slot-scope="{ row }" >
                  <!-- 修改 -->
                  <Icon type="ios-create-outline" size="24" title="修改" color="#0972E7" @click="modifyRules(row)"/>
                  <!-- 删除 -->
                  <Icon  class="ivu-icon icon-font iconshanchu" title="删除" size="24" color="red" @click="ruleDeleteHandeler(row.id)"/>
                  </template>
            </Table>
        </Row>
        <!-- 分页 -->
        <Row class='page' style="margin-top:20px;">
            <Page :total='rulePageData.total' :current='rulePageData.currentPage' :page-size-opts="[10, 20, 30, 50]" :page-size='pagesize' show-elevator show-sizer show-total />
        </Row>
      </div>
    </Modal>

    <!-- 查看详情模板 -->
    <Modal v-model='checkDetailStatus' width='60%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>部门创新创优查看</span>
      </p>
      <div class='modal-content'>
    <!-- 内容摘要 -->
        <Row class="performance-item" >
          <div class="performance-title">
            <div class="origin-mark">
              <div></div>
            </div>
            <div class="main-title">
              内容摘要
            </div>
          </div>
           <p >{{replyData.content}}</p>
        </Row>
    <!-- 项目说明 -->
        <Row class="performance-item" >
            <div class="performance-title">
              <div class="origin-mark">
                <div></div>
              </div>
              <div class="main-title">
                项目说明
              </div>
            </div>
           <p >{{replyData.projectDesc}}</p>
        </Row>
        <Row class="performance-item" >
          <div class="performance-title">
            <div class="origin-mark">
              <div></div>
            </div>
            <div class="main-title">
              附件
            </div>
          </div>
          <div class="annex">
            <div class="annex-item">

            </div>
            <div class="annex-item">

            </div>
            <div class="annex-item">

            </div>
          </div>
          <div class="annex-form">
            <div class="annex-form-item">
              <div class="origin-mark origin-select">
                 <div></div>
              </div>
              <div class="origin-text origin-text-select">公开</div>
            </div>
            <div class="annex-form-item">
              <div class="origin-mark">
                 <div></div>
              </div>
              <div class="origin-text">仅内部共享</div>
            </div>
          </div>
        </Row>
    <!-- 批示内容 -->
        <Row class="performance-item" >
          <div class="performance-title">
            <div class="origin-mark">
              <div></div>
            </div>
            <div class="main-title">
              批示内容
            </div>
          </div>
            <Input type="textarea" :rows="4" v-model="replyContent" />
        </Row>
    <!-- 提交批示 -->
        <Row class="performance-last-item">
          <Button type="primary" @click="submitApproval" v-if="btnShow(114102106)" >提交批示</Button>
          <!-- <p>绩效办张三丰：同意，并作为单位典型申请市创新创优姓名。</p>
          <p>张翠山回复：收到，执行</p>
          <div class="processing-time">
            <div>2019-12-25 &nbsp;&nbsp;&nbsp;18:20</div>
          </div> -->
          <div v-for="(item, index) in instructionEntityList" :key="index">
            <p style="color:#888888;">{{item.instruOrgName}}{{item.createName}}：{{item.content}}。
              <!-- <span style="color:#0972E7; float:right;margin-right:25px;cursor:pointer;">回复</span> -->
            </p>
            <div class="processing-time">
              <div>{{item.createTime | dateFormat}}</div>
            </div>
          </div>
        </Row>
      </div>
    </Modal>

    <!-- 新增规则模板 -->
    <Modal v-model='addRuleStatus' width='40%' class='modal-information addRules' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>新建规则</span>
      </p>
      <div class='modal-content'>
        <Row class="add-rule-item" style="margin-bottom:20px;">
            <div>评级名称</div>
            <Input v-model="newRuleData.title" placeholder="请输入评级名称"  />
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
            <div>计分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <Input v-model="newRuleData.score" placeholder="记录分值，支持小数点后两位"  />
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
           <Input  v-model="newRuleData.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入注释" style="width:100%;" />
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
          <Button type="primary" icon="ios-search" style="margin:0 auto;" @click="newRuleHandeler">保存</Button>
        </Row>
      </div>
    </Modal>

    <!-- 删除的模板 -->
    <Modal
        v-model="deleteModal"
        title="正在删除创新创优，删除后该条内容永远消失？"
        @on-ok="confirmDelete"
        @on-cancel="cancel">
    </Modal>

    <!-- 查看规则删除的模板 -->
    <Modal
        v-model="ruleDeleteModal"
        title="正在删除创新创优规则，删除后该条内容永远消失"
        @on-ok="ruleConfirmDelete"
        @on-cancel="ruleCancel">
    </Modal>

    <!-- 修改创新创优 -->
    <Modal v-model='modifyTemplateStatus' width='60%' class='modal-information addTemplate' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>编辑创新创优</span>
      </p>
      <div class='modal-content'>
        <Form ref='issueValidateRef'>
          <!-- 项目名称 -->
          <FormItem label='项目名称'>
            <Input  class='title-input' v-model="modifyList.title"  maxlength="15" show-word-limit placeholder='请输入项目名称'/>
          </FormItem>
          <!-- 内容摘要 -->
          <FormItem label='内容摘要'>
            <Input  class='title-input' v-model="modifyList.content"  maxlength="25" show-word-limit placeholder='请输入内容摘要'/>
          </FormItem>
          <!-- 项目说明 -->
          <FormItem label='项目说明'>
            <Input  type="textarea" v-model="modifyList.projectDesc" maxlength="140" :rows="10" style="height:240px;" placeholder="请输入项目说明"/>
          </FormItem>
          <!-- 上传附件 -->
          <FormItem label='上传附件' class="modalUpload">
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" v-bind:key="index">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                      :number="fileNumberLimt"
                      :format="fileFormat"
                      :data="defaultList"
                      @uploadURL="uploadURL"
                      >
                    </Upload>
                    <p style="color:#777;">最多支持3个附件（JPEG、pdf、word文档）</p>
                </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="saveModifyHanderle">保 存</Button>
          </Row>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { departmentQueryList, departmentDeleteList, UpruleQueryList, saveRule, reply, departmentSave, ruleDeleteList, seeDetails, postApplication, modifyDepartments } from '@/api/Innovation-excellence'
import Upload from '@/common/upload/upload'
export default {
  data () {
    return {
      // 文件上传的个数限制
      fileNumberLimt: 3,
      // 文件格式限制
      fileFormat: ['jpeg', 'jpg', 'png', 'pdf', 'doc'],
      // 修改创新创优模板
      modifyTemplateStatus: false,
      modifyList: {
        types: 1,
        content: '',
        projectDesc: '',
        title: '',
        id: ''
      },
      cityList: [
        {
          value: '1',
          label: '默认全国'
        },
        {
          value: '2',
          label: '省级'
        },
        {
          value: '3',
          label: '市级'
        },
        {
          value: '4',
          label: '县级'
        }
      ],
      cityList2: [
        {
          value: '0',
          label: '初稿'
        },
        {
          value: '1',
          label: '申请中'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '3',
          label: '驳回'
        }
      ],
      //  新建规则需要传的参数
      newRuleData: {
        title: '',
        score: '',
        content: ''
      },
      //  创新创优表格的表头
      listHeader: [
        {
          title: '序号',
          type: 'index',
          width: '100px'
        },
        {
          title: '创新创优名称',
          key: 'title',
          width: '200px'
        },
        {
          title: '申请时间',
          slot: 'applicationTime',
          key: 'createTime'
        },
        {
          title: '内容摘要',
          key: 'content'
        },
        {
          title: '附件',
          key: 'attachMentIds'
        },
        {
          title: '评级',
          key: 'level'
        },
        {
          title: '状态',
          slot: 'Status',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'operation',
          width: '200px'
        }
      ],
      //  表格总条数
      total: 0,
      //  页数
      pagesize: 10,
      //  分页
      currentPage: 1,
      //  最大页数
      maxPage: 0,
      //  查看规则分页器需要的数据
      rulePageData: {
        total: 0,
        pagesize: 10,
        currentPage: 1,
        maxPage: 0
      },
      //  查看规则表头
      viewRulesHeader: [
        {
          title: '序号',
          type: 'index',
          width: '150px'
        },
        {
          title: '评级',
          key: 'title'
        },
        {
          title: '计分',
          key: 'score'
        },
        {
          title: '注解',
          key: 'content',
          width: '300px'
        },
        {
          title: '操作',
          slot: 'operation',
          width: '200px'
        }
      ],
      //  查看规则的表格数据
      viewRulesList: [],
      // 创新创优的表格数据
      queryListData: [],
      model1: '',
      model2: '',
      // 要被删除的id
      deleteId: '',
      // 查看规则要被删除的id
      ruledeleteId: '',
      // 查询信息
      checkInfo: {
        title: '',
        startTime: '',
        endTime: '',
        status: '',
        rating: ''
      },
      //  新增创新创优模板需要传的数据
      saveInfo: {
        title: '',
        content: '',
        projectDesc: '',
        types: 1
      },
      //  批示回复需要传的参数
      replyData: {
        content: '',
        projectDesc: '',
        themeId: '',
        replyType: 2
      },
      //  查询的id
      seeDetailsId: '',
      // 控制弹出层
      addTemplateStatus: false,
      checkRuleStatus: false,
      checkDetailStatus: false,
      addRuleStatus: false,
      deleteModal: false,
      ruleDeleteModal: false,
      // 上传图片
      defaultList: '',
      defaultList1: '',
      imgName: '',
      visible: false,
      uploadList: [],
      // 获取列表传入
      queryLists: {
        currentPage: 1,
        pagesize: 10
      },
      // 提交批示的内容
      replyContent: '',
      // 查看详情中的信息
      instructionEntityList: []
    }
  },
  components: {
    Upload
  },
  created () {
    this.getQueryList(this.queryLists)
  },

  computed: {},
  methods: {
    // 附件上传成功后的回调
    uploadURL (uploadList) {
      console.log(uploadList)
      let _fileUrl = []
      uploadList.forEach(item => {
        _fileUrl.push(item.absolutePath)
      })
    },
    //  修改创新创优
    modifyHanderle (row) {
      this.modifyTemplateStatus = true
      this.modifyList.content = row.content
      this.modifyList.id = row.id
      this.modifyList.projectDesc = row.projectDesc
      this.modifyList.title = row.title
      console.log(this.modifyList)
    },
    saveHandeler () {
      this.getNewSave(this.saveInfo)
    },
    // 新增创新创优
    getNewSave (data) {
      departmentSave(data).then(res => {
        if (res.data.code === 10000) {
          this.addTemplateStatus = false
          this.getQueryList(this.queryLists)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 获取表格的数据
    getQueryList (data) {
      departmentQueryList(data).then(res => {
        if (res.data.code === 10000) {
          this.queryListData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.currentPage = res.data.data.currentPage
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 确定删除与取消删除的方法
    confirmDelete () {
      departmentDeleteList(this.deleteId).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('删除成功')
          this.getQueryList(this.queryLists)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    cancel () {
      this.$Message.info('您已取消删除操作')
    },
    //  查看规则删除的确定与取消
    ruleConfirmDelete () {
      ruleDeleteList(this.ruledeleteId).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('删除成功')
          this.checkRule()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    ruleCancel () {
      this.$Message.info('您已取消删除操作')
    },
    // 控制新增创新创优的弹出层的显示隐藏
    newCreatedList () {
      this.addTemplateStatus = true
    },
    //  点击查看规则中请求数据列表
    checkRule () {
      this.checkRuleStatus = true
      UpruleQueryList(this.queryLists).then(res => {
        if (res.data.code === 10000) {
          this.viewRulesList = res.data.data
          this.rulePageData.total = res.data.data.total
          this.rulePageData.pagesize = res.data.data.pagesize
          this.rulePageData.maxPage = res.data.data.maxPage
        } else {
          return this.$Message.error(res.data.msg)
        }
        console.log(res.data.data)
      })
    },
    //  点击保存发送新增规则的请求
    newRuleHandeler () {
      saveRule(this.newRuleData).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('新增成功')
          this.addRuleStatus = false
          this.checkRule()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    //  点击提交批示
    submitApproval () {
      let replyDataList = {
        content: this.replyContent,
        projectDesc: this.replyData.projectDesc,
        themeId: this.replyData.themeId,
        replyType: 1
      }
      reply(replyDataList).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('批示成功')
        }
        this.checkDetailStatus = false
        this.replyContent = ''
      })
    },
    // 查询
    checkHandeler () {
      departmentQueryList(this.checkInfo).then(res => {
        if (res.data.code === 10000) {
          this.queryListData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    //  查看详情
    checkDetail () {
      seeDetails(this.seeDetailsId).then(res => {
        if (res.data.code === 10000) {
          this.replyData.content = res.data.data.content
          this.replyData.projectDesc = res.data.data.projectDesc
          this.replyData.themeId = res.data.data.id
          this.instructionEntityList = res.data.data.instructionEntityList
        }
      })
    },
    //  删除
    deleteHandeler (id) {
      this.deleteModal = true
      this.deleteId = id
    },
    //  触发查看规则的删除
    ruleDeleteHandeler (id) {
      this.ruleDeleteModal = true
      this.ruledeleteId = id
    },
    // 清空
    clearHandeler () {
      this.checkInfo.title = ''
      this.checkInfo.startTime = ''
      this.checkInfo.endTime = ''
      this.checkInfo.status = ''
      this.checkInfo.rating = ''
    },
    //  点击触发表格操作中的查看
    seeDetailHandeler (id) {
      this.checkDetailStatus = true
      this.seeDetailsId = id
      this.checkDetail()
    },
    // 点击触发新增规则
    addRuleHandeler () {
      this.addRuleStatus = true
    },
    modalChange () {
    },
    // 移除文件
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.index(file), 1)
    },
    // 文件上传成功
    handleSuccess (res, file) {
      file.url = 'https:/o5wwk8baw.qnssl.co7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    // 文件格式验证失败
    handleFormatError (file) {
      this.$Notice.warning({
        title: '您上传的文件格式不符合要求，请重新上传'
      })
    },
    // 上传文件之前
    handleBeforeUpload () {
      // 文件小于1
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '最多上传1个图片'
        })
      }
      return check
    },
    //  页码改变
    handlePageChange (page) {
      const data = {
        currentPage: page
      }
      departmentQueryList(data).then(res => {
        if (res.data.code === 10000) {
          this.queryListData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.currentPage = res.data.data.currentPage
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    //  获取显示条数
    handleSizeChange (size) {
      const data = {
        pagesize: size
      }
      departmentQueryList(data).then(res => {
        if (res.data.code === 10000) {
          this.queryListData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.currentPage = res.data.data.currentPage
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    //  发布申请
    postApplication (row) {
      this.$Modal.confirm({
        title: '确认发布申请吗？',
        onOk: () => {
          postApplication(row.id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.info('发布申请成功')
              this.getQueryList(this.queryLists)
            }
          })
        },
        onCancel: () => {
          this.$Message.info('已取消发布')
        }
      })
    },
    //  修改创新创优
    saveModifyHanderle () {
      modifyDepartments(this.modifyList).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('修改成功')
          this.modifyTemplateStatus = false
          this.getQueryList(this.queryLists)
        }
      })
    }
  }
}
</script>
