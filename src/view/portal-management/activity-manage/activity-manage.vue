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
/* 新建活动弹窗 */
.modal-activity {
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

/* 发起通告弹窗 */
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
      .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
        img{
          width: 100%;
          height: 100%;
        }
        .demo-upload-list-cover{
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,.6);
          i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
          }
        }
      }
      .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
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
    <Layout>
      <Content class="content-box">
        <Tabs name="tab" class="tabs" ref="tabsType" :value="currentTab">
          <TabPane label="页面浮窗" name="name1" class="tabs1">
            <div>
              <Row class="header-search">
                <Col span="8" class="col">
                  <span class="span span-max" style="text-align: center;">活动名称</span>
                  <Input v-model='activityQueryInfo.name' size="large" placeholder="默认全部" clearable />
                </Col>
                <Col span="8" class="col area">
                  <span class="span span-max" style="text-align: center;">活动状态</span>
                  <Select v-model='activityQueryInfo.status' placeholder="默认全部状态" @on-change="statusChange" size="large">
                    <Option v-for="item in activityStatusList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Col>
                <Col span="8" style="text-align: center;">
                  <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
                  <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
                </Col>
              </Row>
              <Row class="content">
                <Col class="btn-add">
                  <Button type="primary" class="add" @click="showNewActivityModel" v-if="btnShow(115105101)">
                    <i class="icon-font iconxinzeng"></i>
                    新建活动
                  </Button>
                </Col>
                <Col>
                  <Table :row-class-name="rowClassName" :columns="columns" :data="activityData" :border="false">
                    <template slot='createTime' slot-scope="{ row }">
                      {{row.createTime | dateYMD}}
                    </template>
                    <template slot='imgUrl' slot-scope="{ row }">
                      <img :src="row.imgUrl" alt="" style="width:80px;height:50px;" v-if="row.imgUrl">
                    </template>
                    <template slot='links' slot-scope="{ row }">
                      <a :href="row.links" v-if="row.links">{{row.links}}</a>
                    </template>
                    <template slot='status' slot-scope="{ row }">
                      {{row.status === 0 ? '待发布' : row.status === 1 ? '已上线' : '已下线'}}
                    </template>
                    <template slot='operation' slot-scope="{ row }">
                      <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" @click="editActivity(row.id)" v-if="btnShow(115105102) && row.status != 1" />
                      <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineActivity(row.id, row.links, row.linksStatus)" v-if="btnShow(115105103) && row.status != 0" />
                      <Icon class="icon-font iconxiaxiansvg online"  size="24" color="#0972E7" title="上线" @click="online(row.id)" v-if="btnShow(115105105) && row.status === 0 || row.status === 2" />
                      <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinet(row.id)" v-if="btnShow(115105106) && row.status === 1" />
                    </template>
                  </Table>
                </Col>
                <Col class="page">
                  <Page
                    :total="activityQueryInfo.total"
                    :page-size="activityQueryInfo.size"
                    :current="activityQueryInfo.page"
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
          <TabPane label="问卷调查" name="name2" class="tabs2">
            <div>
              <Row class="header-search">
                <Col span="8" class="col">
                  <span class="span span-max" style="text-align: center;">主题</span>
                  <Input v-model='surveyQueryInfo.theme' size="large" placeholder="默认全部" clearable />
                </Col>
                <Col span="8" class="col area">
                  <span class="span span-max" style="text-align: center;">状态</span>
                  <Select v-model='surveyQueryInfo.status' placeholder="默认全部状态" @on-change="surveyStatusChange" size="large">
                    <Option v-for="item in surveyStatusList" :value="item.nameValue" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Col>
                <Col span="8" style="text-align: center;">
                  <Button type="primary" class="custome-btn" @click="surveyInquire">查询</Button>
                  <Button class="custome-btn custome-btn-default" @click="surveyEmpty">清空</Button>
                </Col>
              </Row>
              <Row class="content">
                <Col class="btn-add">
                  <Button type="primary" class="add" @click="newQuestionnaire" v-if="btnShow(115106101)">
                    <i class="icon-font iconxinzeng"></i>
                    新建问卷
                  </Button>
                </Col>
                <Col>
                  <Table :row-class-name="rowClassName" :columns="surveyColumns" :data="surveyData" :border="false">
                    <template slot='realNameStatus' slot-scope="{ row }">
                      <span>{{row.realNameStatus === 0 ? '非实名' : '实名'}}</span>
                    </template>
                    <template slot='createTime' slot-scope="{ row }">
                      {{row.createTime | dateYMD}}
                    </template>
                    <template slot='qnum' slot-scope="{ row }">
                      <span>{{row.qnum ? row.qnum : '0'}}</span>
                    </template>
                    <template slot='status' slot-scope="{ row }">
                      <span>{{row.status === 0 ? '待发布' : row.status === 1 ? '已上线' : '已下线'}}</span>
                    </template>
                    <template slot='anum' slot-scope="{ row }">
                      <span>{{row.anum ? row.anum : '0'}}</span>
                    </template>
                    <template slot='operation' slot-scope="{ row }">
                      <Icon class="icon-font iconcaozuo-bianji" color="#0972E7" title="编辑" @click="editQuestionnaire(row.id)" v-if="btnShow(115106103) && row.status === 0" />
                      <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" title="查看详情" @click="examineQuerstionnaire(row.id)" v-if="btnShow(115106105) && row.status != 0" />
                      <Icon class="icon-font iconxiaxiansvg online" size="24" color="#0972E7" title="上线" @click="onlineSurvey(row.id)" v-if="btnShow(115106108) && row.status === 0" />
                      <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinetSurvey(row.id)" v-if="btnShow(115106109) && row.status === 1" />
                      <Icon class="icon-font iconxiazai-" size="24" color="#0972E7" title="下载结果" @click="surveyDownload(row.id)" v-if="btnShow(115106110) && row.status != 0" />
                    </template>
                  </Table>
                </Col>
                <Col class="page">
                  <Page
                    :total="surveyQueryInfo.total"
                    :page-size="surveyQueryInfo.size"
                    :current="surveyQueryInfo.page"
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

    <!-- 新建活动弹窗 -->
    <Modal v-model='newActivityModel' width='70%' class='modal-activity' @on-visible-change="newActivityModelChange">
      <p class='modal-title'>
        <span>新建活动</span>
      </p>
      <div class='modal-content'>
        <Form ref='newActivityValidateRef' :model='newActivityData'>
          <!-- 活动主题 -->
          <FormItem label='活动主题' class="modalRow" prop="theme" :rules="{required: true, message: '请输入活动主题', trigger: 'blur'}">
            <Input v-model="newActivityData.theme" placeholder="请输入活动主题" maxlength="50" show-word-limit/>
          </FormItem>
          <!-- 浮窗图片 -->
          <FormItem label='浮窗图片' class="modalRow modalUpload">
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
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <p style="font-size: 12px;color: rgba(226,0,30,1);">建议尺寸：nxn</p>
          </FormItem>
          <!-- 内容类型 -->
          <FormItem label='内容类型' class="modalRow">
            <RadioGroup v-model="newActivityData.linksStatus" @on-change="radioChange" style="width: 100%;">
              <Row>
                <Col span="7">
                  <Radio label="1">
                    <span>独立内容</span>
                  </Radio>
                </Col>
                <Col span="17">
                  <Row>
                    <Col span="8">
                      <Radio label="2">
                        <span>已有网页链接</span>
                      </Radio>
                    </Col>
                    <Col span="16">
                      <Input v-model="newActivityData.links" placeholder="请输入链接" :disabled="newActivityData.linksStatus === '1' ? true : false"/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <!-- 活动标题 -->
          <FormItem label='活动标题' class="modalRow" v-if="newActivityData.linksStatus === '1'">
            <Input v-model="newActivityData.title" placeholder="请输入活动标题" maxlength="50" show-word-limit/>
          </FormItem>
           <!-- 活动内容 -->
           <FormItem label='活动内容' class="modalRow" v-if="newActivityData.linksStatus === '1'">
            <Editor v-model="newActivityData.content" ref="newActivityEditor"></Editor>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="submitActivity">完 成</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 编辑活动弹窗 -->
    <Modal v-model='editActivityModel' width='70%' class='modal-activity' @on-visible-change="editActivityModelChange">
      <p class='modal-title'>
        <span>编辑活动</span>
      </p>
      <div class='modal-content'>
        <Form :model='editActivityData' ref='editActivityValidateRef'>
          <!-- 活动主题 -->
          <FormItem label='活动主题' class="modalRow" prop="theme" :rules="{required: true, message: '请输入活动主题', trigger: 'blur'}">
            <Input v-model="editActivityData.theme" placeholder="请输入活动主题" maxlength="50" show-word-limit/>
          </FormItem>
          <!-- 浮窗图片 -->
          <FormItem label='浮窗图片' class="modalRow modalUpload">
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
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <p style="font-size: 12px;color: rgba(226,0,30,1);">建议尺寸：nxn</p>
          </FormItem>
          <!-- 内容类型 -->
          <FormItem label='内容类型' class="modalRow">
            <RadioGroup v-model="editActivityData.linksStatus" style="width: 100%;" @on-change="editRadioChange">
              <Row>
                <Col span="7">
                  <Radio label="1">
                    <span>独立内容</span>
                  </Radio>
                </Col>
                <Col span="17">
                  <Row>
                    <Col span="8">
                      <Radio label="2">
                        <span>已有网页链接</span>
                      </Radio>
                    </Col>
                    <Col span="16">
                      <Input v-model="editActivityData.links" placeholder="请输入链接" :disabled="editActivityData.linksStatus === '1' ? true : false"/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <!-- 活动标题 -->
          <FormItem label='活动标题' class="modalRow" v-if="editActivityData.linksStatus === '1'">
            <Input v-model="editActivityData.title" placeholder="请输入活动标题" maxlength="50" show-word-limit/>
          </FormItem>
            <!-- 活动内容 -->
            <FormItem label='活动内容' class="modalRow" v-if="editActivityData.linksStatus === '1'">
            <Editor v-model="editActivityData.content" ref="editActivityEditor"></Editor>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="updateEditActivity">完 成</Button>
          </Row>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import Editor from '@/common/editor/editor.vue'
import {
  findActivityByPage,
  getlistbytype,
  addActivity,
  findOneActivity,
  updateActivity,
  onlineActivity,
  offlinetActivity,
  findSurveyPortalSurvey,
  getDatadictionaryType,
  onlinePortalSurvey,
  offlinetPortalSurvey
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  data () {
    return {
      currentTab: '',
      // 页面浮窗查询条件
      activityQueryInfo: {
        page: 1,
        size: 10,
        total: 0,
        name: '',
        status: ''
      },
      // 活动状态查询下拉框数据
      activityStatusList: [],
      // 页面浮窗表格参数
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
          title: '活动名称',
          key: 'theme',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '活动图片',
          slot: 'imgUrl',
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
          title: '链接到',
          slot: 'links',
          className: 'tb-header',
          align: 'center',
          tooltip: true
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
      // 页面浮窗表格数据
      activityData: [],
      // 控制新建活动弹窗开关
      newActivityModel: false,
      // 新建活动数据
      newActivityData: {
        theme: '',
        title: '',
        linksStatus: '1',
        links: '',
        content: ''
      },
      // 控制编辑活动弹窗开关
      editActivityModel: false,
      // 编辑活动数据
      editActivityData: {},
      // 问卷调查查询条件
      surveyQueryInfo: {
        page: 1,
        size: 10,
        total: 0,
        theme: '',
        status: ''
      },
      // 问卷调查状态查询下拉框数据
      surveyStatusList: [],
      // 问卷调查表格参数
      surveyColumns: [
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
          title: '主题',
          key: 'theme',
          className: 'tb-header',
          align: 'center',
          tooltip: true
        },
        {
          title: '问卷要求',
          slot: 'realNameStatus',
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
          title: '题数',
          slot: 'qnum',
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
          title: '参与人数',
          slot: 'anum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          width: '200px',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 问卷调查表格数据
      surveyData: [],
      // 上传图片
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      // 下载问卷结果路径
      downloadUrl: 'http://47.112.144.243:8086'
    }
  },
  components: {
    Editor
  },
  created () {
    // 获取返回状态
    this.getReturnType()
    // 查询活动模块全部数据
    this.getFindActivityByPageListAll()
    // 查询活动模块状态下拉框数据
    this.getStatusList()
    // 查询问卷调查全部数据
    this.getFindSurveyByPageAll()
    // 查询问卷调查状态下拉框数据
    this.getDatadictionary()
  },
  methods: {
    // 获取返回状态
    getReturnType () {
      if (Number(this.$route.query.name) === 2) {
        this.currentTab = 'name2'
      } else {
        this.currentTab = 'name1'
      }
    },
    // 查询活动模块数据
    getFindActivityByPageList (data) {
      findActivityByPage(data).then(res => {
        if (res.data.code === 10000) {
          this.activityData = res.data.data.dataList
          this.activityQueryInfo.total = res.data.data.total
        }
      })
    },
    // 查询活动模块状态下拉框数据
    getStatusList () {
      getlistbytype(14).then(res => {
        if (res.data.code === 10000) {
          this.activityStatusList = res.data.data
        }
      })
    },
    // 查询活动模块全部数据
    getFindActivityByPageListAll () {
      const data = {
        page: this.activityQueryInfo.page,
        size: this.activityQueryInfo.size
      }
      this.getFindActivityByPageList(data)
    },
    // 活动模块活动名称查询
    findActivityNameInquire () {
      const data = {
        page: this.activityQueryInfo.page,
        size: this.activityQueryInfo.size,
        title: this.activityQueryInfo.name
      }
      this.getFindActivityByPageList(data)
    },
    // 活动模块状态查询
    findActivityStatusInquire () {
      const data = {
        page: this.activityQueryInfo.page,
        size: this.activityQueryInfo.size,
        status: this.activityQueryInfo.status
      }
      this.getFindActivityByPageList(data)
    },
    // 活动模块名称+状态查询
    findActivityNameStatusInquire () {
      const data = {
        page: this.activityQueryInfo.page,
        size: this.activityQueryInfo.size,
        status: this.activityQueryInfo.status,
        title: this.activityQueryInfo.name
      }
      this.getFindActivityByPageList(data)
    },
    // 活动模块状态下拉框改变查询
    statusChange () {
      this.activityQueryInfo.page = 1
      if (this.activityQueryInfo.name) {
        this.findActivityNameStatusInquire()
      } else if (this.activityQueryInfo.status) {
        this.findActivityStatusInquire()
      }
    },
    // 点击活动模块查询
    inquire () {
      this.activityQueryInfo.page = 1
      if (this.activityQueryInfo.name && !this.activityQueryInfo.status) {
        this.findActivityNameInquire()
      } else if (!this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityStatusInquire()
      } else if (this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityNameStatusInquire()
      } else {
        this.getFindActivityByPageListAll()
      }
    },
    // 清空活动模块查询条件
    empty () {
      this.activityQueryInfo = {
        page: 1,
        size: 10,
        name: '',
        status: ''
      }
      this.getFindActivityByPageListAll()
    },
    // 显示新建活动弹窗
    showNewActivityModel () {
      this.newActivityModel = true
    },
    // 监听新建活动弹窗状态改变函数
    newActivityModelChange (e) {
      if (e === false) {
        this.$refs.newActivityValidateRef.resetFields()
        this.$refs.newActivityEditor.setHtml('')
        this.newActivityData = {
          theme: '',
          title: '',
          linksStatus: '1',
          links: '',
          content: ''
        }
      }
    },
    // 监听编辑活动弹窗状态改变函数
    editActivityModelChange (e) {
      if (e === false) {
        this.$refs.editActivityValidateRef.resetFields()
      }
    },
    // 新增活动内容类型选项改变
    radioChange (e) {
      if (e === '1') {
        this.newActivityData.links = ''
      } else {
        this.newActivityData.title = ''
        this.newActivityData.content = ''
      }
    },
    // 提交新建活动
    submitActivity () {
      this.$refs.newActivityValidateRef.validate((valid) => {
        if (valid) {
          addActivity(this.newActivityData).then(res => {
            if (res.data.code === 10000) {
              this.newActivityModel = false
              this.getFindActivityByPageListAll()
              this.$Message.success('新建活动成功')
            }
          })
        }
      })
    },
    // 编辑活动
    editActivity (id) {
      this.editActivityModel = true
      findOneActivity(id).then(res => {
        if (res.data.code === 10000) {
          let linksStatus = res.data.data.linksStatus + ''
          res.data.data.linksStatus = linksStatus
          this.editActivityData = res.data.data
          this.$refs.editActivityEditor.setHtml(this.editActivityData.content)
        }
      })
    },
    // 编辑活动内容类型选项改变
    editRadioChange (e) {
      if (e === '1') {
        this.editActivityData.links = ''
      } else {
        this.editActivityData.title = ''
        this.editActivityData.content = ''
      }
    },
    // 保存编辑活动内容
    updateEditActivity () {
      this.$refs.editActivityValidateRef.validate((valid) => {
        if (valid) {
          updateActivity(this.editActivityData).then(res => {
            if (res.data.code === 10000) {
              this.editActivityModel = false
              this.getFindActivityByPageListAll()
              this.$Message.success('修改活动成功')
            }
          })
        }
      })
    },
    // 查看活动详情
    examineActivity (id, links, linksStatus) {
      if (linksStatus === 1) {
        this.$router.push({
          path: 'pexamine_activity_particulars', query: { id: id }
        })
      } else {
        location.href = links
      }
    },
    // 上线
    online (id) {
      onlineActivity(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('上线成功')
          this.getFindActivityByPageListAll()
        }
      })
    },
    // 下线
    offlinet (id) {
      offlinetActivity(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('下线成功')
          this.getFindActivityByPageListAll()
        }
      })
    },
    // 页面浮窗页码改变
    handlePageChange (page) {
      this.activityQueryInfo.page = page
      if (this.activityQueryInfo.name && !this.activityQueryInfo.status) {
        this.findActivityNameInquire()
      } else if (!this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityStatusInquire()
      } else if (this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityNameStatusInquire()
      } else {
        this.getFindActivityByPageListAll()
      }
    },
    // 页面浮窗每页显示条数改变
    handleSizeChange (size) {
      this.activityQueryInfo.size = size
      if (this.activityQueryInfo.name && !this.activityQueryInfo.status) {
        this.findActivityNameInquire()
      } else if (!this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityStatusInquire()
      } else if (this.activityQueryInfo.name && this.activityQueryInfo.status) {
        this.findActivityNameStatusInquire()
      } else {
        this.getFindActivityByPageListAll()
      }
    },
    // 查询问卷调查数据
    getFindSurveyByPage (data) {
      findSurveyPortalSurvey(data).then(res => {
        if (res.data.code === 10000) {
          this.surveyData = res.data.data.dataList
          this.surveyQueryInfo.total = res.data.data.total
        }
      })
    },
    // 查询问卷调查状态下拉框数据
    getDatadictionary () {
      getDatadictionaryType(14).then(res => {
        if (res.data.code === 10000) {
          this.surveyStatusList = res.data.data
        }
      })
    },
    // 查询全部问卷调查数据
    getFindSurveyByPageAll () {
      const data = {
        page: this.surveyQueryInfo.page,
        size: this.surveyQueryInfo.size
      }
      this.getFindSurveyByPage(data)
    },
    // 根据主题查询问卷调查数据
    surveyThemeInquire () {
      const data = {
        page: this.surveyQueryInfo.page,
        size: this.surveyQueryInfo.size,
        title: this.surveyQueryInfo.theme
      }
      this.getFindSurveyByPage(data)
    },
    // 根据状态查询问卷调查数据
    surveyStatusInquire () {
      const data = {
        page: this.surveyQueryInfo.page,
        size: this.surveyQueryInfo.size,
        status: Number(this.surveyQueryInfo.status)
      }
      this.getFindSurveyByPage(data)
    },
    // 主题+状态查询问卷调查数据
    surveyThemeStatusInquire () {
      const data = {
        page: this.surveyQueryInfo.page,
        size: this.surveyQueryInfo.size,
        status: Number(this.surveyQueryInfo.status),
        title: this.surveyQueryInfo.theme
      }
      this.getFindSurveyByPage(data)
    },
    // 问卷调查状态下拉框改变
    surveyStatusChange () {
      this.surveyQueryInfo.page = 1
      if (this.surveyQueryInfo.theme) {
        this.surveyThemeStatusInquire()
      } else if (this.surveyQueryInfo.status) {
        this.surveyStatusInquire()
      }
    },
    // 点击问卷调查查询按钮
    surveyInquire () {
      this.surveyQueryInfo.page = 1
      if (this.surveyQueryInfo.theme && !this.surveyQueryInfo.status) {
        this.surveyThemeInquire()
      } else if (!this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyStatusInquire()
      } else if (this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyThemeStatusInquire()
      } else {
        this.getFindSurveyByPageAll()
      }
    },
    // 点击清空问卷调查查询条件
    surveyEmpty () {
      this.surveyQueryInfo = {
        page: 1,
        size: 10,
        theme: '',
        status: ''
      }
      this.getFindSurveyByPageAll()
    },
    // 新建问卷
    newQuestionnaire () {
      this.$router.push({
        path: 'new_questionnaire'
      })
    },
    // 编辑问卷
    editQuestionnaire (id) {
      this.$router.push({
        path: 'edit_questionnaire', query: { id: id }
      })
    },
    // 查看问卷详情
    examineQuerstionnaire (id) {
      this.$router.push({
        path: 'examine_questionnaire', query: { id: id }
      })
    },
    // 根据id上线问卷
    onlineSurvey (id) {
      onlinePortalSurvey(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('上线成功')
          this.getFindSurveyByPageAll()
        }
      })
    },
    // 根据id下线问卷
    offlinetSurvey (id) {
      offlinetPortalSurvey(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('下线成功')
          this.getFindSurveyByPageAll()
        }
      })
    },
    // 根据id下载结果
    surveyDownload (id) {
      location.href = this.downloadUrl + '/portalSurvey/surveyDownload/' + id
    },
    // 问卷调查页码改变
    noticeHandlePageChange (page) {
      this.surveyQueryInfo.page = page
      if (this.surveyQueryInfo.theme && !this.surveyQueryInfo.status) {
        this.surveyThemeInquire()
      } else if (!this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyStatusInquire()
      } else if (this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyThemeStatusInquire()
      } else {
        this.getFindSurveyByPageAll()
      }
    },
    // 问卷调查每页显示条数改变
    noticeHandleSizeChange (size) {
      this.surveyQueryInfo.size = size
      if (this.surveyQueryInfo.theme && !this.surveyQueryInfo.status) {
        this.surveyThemeInquire()
      } else if (!this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyStatusInquire()
      } else if (this.surveyQueryInfo.theme && this.surveyQueryInfo.status) {
        this.surveyThemeStatusInquire()
      } else {
        this.getFindSurveyByPageAll()
      }
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
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
