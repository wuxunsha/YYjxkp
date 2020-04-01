<style lang='less' scoped>
    @import "./review.less";
    @import "../innovation-excellence-list/innovation-excellence-list.less";
.review {
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
              <Input clearable class='title-input' placeholder="请输入名称" v-model="checkInfo.checkName" />
            </div>
            <!-- 查询时间 -->
            <div class="input-center inputBox">
              <span>查询时间</span>
              <DatePicker  type="date" :start-date="new Date(1991, 4, 14)" placeholder="开始时间" style="width: 75%" v-model="checkInfo.startTime"></DatePicker>
            </div>
            <div class="input-right inputBox">
              <span>~</span>
              <DatePicker type="date" :start-date="new Date(1991, 4, 14)" placeholder="截止时间" style="width: 86%" v-model="checkInfo.endTime"></DatePicker>
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
              <span style="width: 40%;">申请机构/人</span>
              <Select v-model="checkInfo.rating" class="status-select" placeholder="请选择状态" transfer >
                  <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
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
          <!-- 创新创优表格内容 -->
          <Row class="table">
              <Table stripe   :columns='reviewHeader' :data='reviewData' disabled-hover>
                <template slot='applicationTime' slot-scope="{ row }">
                  {{row.createTime | dateFormat}}
                </template>
                <template slot='status' slot-scope="{ row }">
                  <span v-if="row.status == 0">新建</span>
                  <span v-if="row.status == 1">待审核</span>
                  <span v-else-if="row.status == 2">审核通过</span>
                  <span v-else>驳回</span>
                </template>
                <!--  -->
                <template slot='operation' slot-scope="{ row }">
                  <!-- 查看 -->
                  <!-- <Button shape="circle" icon="ios-brush" title="查看详情" @click="seeDetailHandeler(row.id)"></Button> -->
                  <Icon  class="icon-font iconchakan" title="查看详情"  size="24" color="#0972E7" @click="seeDetailHandeler(row.id)"/>
                  <!-- 审核 -->
                  <!-- <Button shape="circle" icon="ios-apps-outline" title="审核" @click="reviewHandeler(row)" v-if="row.status === 1"></Button> -->
                  <Icon  class="icon-font iconshenhe" title="审核"  size="24" color="#0972E7" @click="reviewHandeler(row)" v-if="row.status === 1"/>
                  <!-- 批示 -->
                  <!-- <Button shape="circle" icon="ios-albums-outline" title="批示" v-if="row.status === 1 || row.status === 2"></Button> -->
                  <!-- 删除 -->
                  <!-- <Button shape="circle" icon="ios-albums-outline" title="删除"  @click="deleteHandeler(row.id)" v-if="row.status === 3"></Button> -->
                  <Icon  class="ivu-icon icon-font iconshanchu" title="删除" size="24" color="red" @click="deleteHandeler(row.id)" v-if="row.status === 3"/>
                  <!-- 转部门项目 -->
                  <!-- <Button shape="circle" icon="ios-albums-outline" title="转部门项目"  @click="transferDepartment(row)" v-if="row.status === 2" ></Button> -->
                  <!-- v-if="row.status === 2" -->
                  <Icon  class="ivu-icon icon-font iconzhuan" title="转部门项目" size="24" color="#0972E7" @click="transferDepartment(row)" v-if="btnShow(114103103)"/>
                </template>
              </Table>
          </Row>
          <!-- 分页 -->
          <Row class='page'>
            <Page :total=10 :current=1 :page-size-opts="[10, 20, 30, 50]" :page-size=10 show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange'/>
          </Row>
        </Content>
      </div>
    </layout>
    <!-- 查看详情模板 -->
    <Modal v-model='checkDetailStatus' width='60%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>绩效评估考核方法</span>
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
          <Button type="primary" @click="submitApproval">提交批示</Button>
          <!-- <p>绩效办张三丰：同意，并作为单位典型申请市创新创优姓名。</p>
          <p>张翠山回复：收到，执行</p>
          <div class="processing-time">
            <div>2019-12-25 &nbsp;&nbsp;&nbsp;18:20</div>
          </div> -->
          <div v-for="(item, index) in instructionEntityList" :key="index">
            <p style="color:#888888;">{{item.instruOrgName}}{{item.createName}}：{{item.content}}。
              <!-- 回复 -->
              <span style="color:#0972E7; float:right;margin-right:25px;cursor:pointer;"></span>
            </p>
            <div class="processing-time">
              <div>{{item.createTime | dateFormat}}</div>
            </div>
          </div>
        </Row>
      </div>
    </Modal>

    <!-- 删除的模板 -->
    <Modal
        v-model="deleteModal"
        title="确定删除该条数据吗？"
        @on-ok="confirmDelete"
        @on-cancel="cancel">
    </Modal>

    <!-- 审核的模板 -->
    <Modal v-model='reviewModel' width='40%' class='modal-information review' @on-visible-change="modalChange">
      <p class='modal-title' style="margin-bottom:50px;">
        <span>正在审核"绩效评估考核方案"</span>
      </p>
      <div class='modal-content'>
        <Row class="add-rule-item" style="margin-bottom:20px;">
            <div>评级</div>
            <Select v-model="rating.ruleID" class="status-select" placeholder="请选择创新创优评级" transfer >
                <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
            <div>分数</div>
            <span style="margin-left:20px; color:#666666;">{{scoreHanderle}}</span>
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
           <Input  type="textarea" v-model="rating.content" :autosize="{minRows: 2,maxRows: 5}"  style="width:90%;" />
        </Row>
        <Row class="add-rule-item" style="margin-bottom:20px;">
           <div class="review-status">
                <Button type='primary'  class='create-btn' style="margin-right:15px; background-color:#CAE4FF;color:#0972E7;" @click="rejectHanderle" >
                        驳回
                </Button>
                <Button type='primary'  class='create-btn' @click="passHanderle" >
                        通过
                </Button>
           </div>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import { reviewQueryList, reply, transferDepartment, seeDetails, deleteList, auditrulelist, pass, reject } from '@/api/Innovation-excellence'
export default {
  data () {
    return {
      rating: {
        id: '',
        ruleID: '',
        content: ''
      },
      cityList: [
      ],
      cityList2: [
        {
          value: '1',
          label: '默认全部'
        },
        {
          value: '2',
          label: '待审核'
        },
        {
          value: '3',
          label: '审核通过'
        },
        {
          value: '4',
          label: '未通过'
        }
      ],
      //  审核表格的数据
      reviewHeader: [
        {
          title: '序号',
          type: 'index',
          width: '100px'
        },
        {
          title: '创新创优名称',
          key: 'title'
        },
        {
          title: '申请机构/人',
          key: 'userOrgName'
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
          title: '状态',
          slot: 'status',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'operation',
          width: '200px'
        }
      ],
      reviewData: [
      ],
      model1: '',
      model2: '',
      // 查询信息
      checkInfo: {
        checkName: '',
        startTime: '',
        endTime: '',
        status: '',
        rating: ''
      },
      //  提交批示的内容
      instructionContent: '',
      total: 0,
      currentPage: 0,
      pageSize: 0,
      maxPage: 0,
      // 控制弹出层
      deleteModal: false,
      checkDetailStatus: false,
      reviewModel: false,
      seeDetailsId: '',
      // 上传图片
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      // 查看详情的id
      detailId: '',
      //  批示回复需要传的参数
      replyData: {
        content: '',
        projectDesc: '',
        themeId: '',
        replyType: 1
      },
      // 查看详情中的信息
      instructionEntityList: [],
      // 提交批示的内容
      replyContent: ''
    }
  },
  components: {
  },
  created () {
    this.Auditrulelist()
  },
  mounted () {
    this.getQueryList()
  },
  computed: {
    scoreHanderle: function () {
      if (!this.rating.ruleID) {
        return ''
      }
      let score = this.rating.ruleID.match(/a(\S*)/)[1]
      return score
    }
  },
  methods: {
    //  点出触发驳回
    rejectHanderle () {
      let ruleID = Number(this.rating.ruleID.match(/(\S*)a/)[1])
      let ratingData = {
        id: this.rating.id,
        ruleID: ruleID,
        content: this.rating.content
      }
      reject(ratingData).then(res => {
        console.log(this.rating.ruleID)
        if (res.data.code === 10000) {
          this.$Message.info('审核已驳回')
          this.reviewModel = false
          this.getQueryList()
        }
      })
    },
    //  点击触发通过
    passHanderle () {
      if (!this.rating.ruleID) {
        this.$Message.error('请选择评级')
      }
      let ruleID = Number(this.rating.ruleID.match(/(\S*)a/)[1])
      let ratingData = {
        id: this.rating.id,
        ruleID: ruleID,
        content: this.rating.content
      }
      pass(ratingData).then(res => {
        if (res.data.code === 10000) {
          this.$Message.info('审核已通过')
          this.reviewModel = false
          this.getQueryList()
        }
      })
    },
    // 确定删除与取消删除的方法
    confirmDelete () {
      deleteList(this.deleteId).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('删除成功')
          this.getQueryList(this.queryLists)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    cancel () {
      this.$Message.info('您已取消删除操作')
    },
    // 点击转部门
    transferDepartment (row) {
      transferDepartment(row.id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('转部门成功')
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
    getQueryList () {
      reviewQueryList({}).then(res => {
        console.log(res)
        if (res.data.code === 10000) {
          this.reviewData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.currentPage = res.data.data.currentPage
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    //  页码改变
    handlePageChange () {
    },
    //  获取显示条数
    handleSizeChange () {
    },
    // 查询
    checkHandeler () {
      reviewQueryList(this.checkInfo).then(res => {
        if (res.data.code === 10000) {
          this.reviewData = res.data.data.dataList
          this.total = res.data.data.total
          this.pagesize = res.data.data.pagesize
          this.maxPage = res.data.data.maxPage
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 清空
    clearHandeler () {
      this.checkInfo.checkName = ''
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
    //  删除
    deleteHandeler (id) {
      this.deleteModal = true
      this.deleteId = id
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
    //  获取评级
    Auditrulelist () {
      auditrulelist().then(res => {
        if (res.data.code === 10000) {
          console.log(res)
          let data = res.data.data
          for (var i = 0; i < data.length; i++) {
            this.cityList.push({
              value: data[i].id + 'a' + data[i].score,
              label: data[i].title
            })
          }
          console.log(111111111111111111111111, this.cityList)
        }
      })
    },
    // 点击触发审核的弹出层
    reviewHandeler (e) {
      this.reviewModel = true
      this.rating.id = e.id
      console.log(e)
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
    }
  }
}
</script>
