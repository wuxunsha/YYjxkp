<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
}
/deep/.ivu-modal-header {
  border-bottom: 0;
}
/deep/.ivu-modal-footer {
  border-top: 0;
}
/dep/.ivu-modal-header {
  padding-bottom: 0;
}
/dep/.ivu-form-item {
  margin-top: 30px;
  margin-bottom: 0;
}
/deep/.ivu-form-item-label {
  width: 95px!important;
}
/deep/.ivu-form-item-content {
  margin-left: 102px!important;
}
/deep/.people>.ivu-form-item-content {
  margin-left: 32px!important;
}
/deep/.modal-footer>.ivu-form-item-content {
  margin-left: 76px!important;
  margin-bottom: 100px;
}
/deep/.ivu-modal-footer {
  display: none;
}
/deep/.my-number-input {
  resize: none;
  border-radius: 8px;
  outline: none;
  height: 32px;
}
/deep/.ivu-input-word-count {
  background: none;
}
/deep/.ivu-icon {
  vertical-align: initial;
  margin-right: 6px;
}
/* 无数据展示页面 */
.no-data {
  position: relative;
  height: 80vh;
  background: url('~@/assets/images/estimate/society-estimate-bg.png') no-repeat;
  background-size: 100% 100%;
  button {
    position: absolute;
    bottom: 10%;
    left: 50%;
    margin-left: -210px;
    width: 420px;
    height: 88px;
    background-color: #0972E7;
    border: none;
    border-radius: 27px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 70px;
    color: rgba(255, 255, 255, 1);
    outline: none;
  }
}
/* 有数据展示页面 */
.header {
  width: 100%;
  height: 148px;
  background-color: #fff;
  .title {
    width: 100%;
    text-align: center;
    margin: 20px 0 4px;
    font-size: 20px;
    font-weight:bold;
    line-height:16px;
    color:rgba(51,51,51,1);
  }
  .article-steps {
    padding: 0 28px;
  }
  .tabs {
    .tabs-title {
      padding-bottom: 18px;
      text-align: center;
      font-size: 16px;
      color:rgba(9,114,231,1);
      cursor: pointer;
    }
    .active {
      color: #FF9B29;
      border-bottom: 2px solid #FF9B29;
    }
  }
}
/* 创建社会评价模板 */
.modal-template {
  /deep/.ivu-modal-content {
    padding: 0 100px;
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
    .direction {
      margin-top: 18px;
      font-size: 16px;
      color: #0972E7;
    }
    // 评价方向
    .people {
      margin-top: 16px;
      /deep/.ivu-form-item-label {
        line-height: 32px;
      }
      /deep/.ivu-form-item-error-tip {
        left: 10%;
        white-space:nowrap;
      }
      .people-input {
        margin-top: 10px;
        .sequence {
          text-align: right;
          margin-right: 16px;
        }
        .accounts-score {
          text-align: center;
          margin-left: 5px;
        }
        .score-input {
          width: 111%;
          height: 32px;
          outline: none;
          text-align: center;
        }
        .direction-grade {
          margin-left: 6px;
          text-align: center;
        }
      }
    }
    .add-direction {
      margin: 6px 0 0 100px;
      font-size: 14px;
      cursor: pointer;
      .direction-btn {
        border: none;
        font-size: 14px;
        margin-left: 6px;
        outline:none;
        color: #0972E7;
      }
    }
    .aggregate {
      margin-top: 6px;
      text-align: center;
    }
  }
  div.modal-content {
    text-align: left;
  }
  .modal-footer {
    text-align: center;
    margin: 58px 0 100px;
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
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div>
    <!-- 无数据页面 -->
    <Row class='no-data' v-if="isYearDataFlag">
      <button @click="showModal(1)" v-if="btnShow(116107)">
        <i class="icon-font iconxinzeng"></i>
        创建{{assessYear}}社会评价模板
      </button>
    </Row>

    <!-- 有数据页面 -->
    <Row v-else>
      <Row class='header'>
        <Row class='title'>
          <Col span='24'>{{templateTitle}}</Col>
        </Row>
        <Row class="article-steps">
          <article-steps :currentId="1" :stepsList="stepsList"></article-steps>
        </Row>
        <Row class='tabs'>
            <Col span='3' v-for="(item, index) in tabList"  :class="index == nowIndex ? 'tabs-title active' : 'tabs-title'" :key="index"  @click.native="tableBtn(item.orgType,index,item.orgtypeName)"><span>{{item.orgtypeName}}</span></Col>
        </Row>
      </Row>
      <Row class="content">
        <!-- 搜索区域 -->
        <Row class="header-search">
          <Col span="7" class="col">
            <span class="span span-max">年份</span>
            <Input v-model='queryInfo.year' size="large" placeholder="请输入年份" clearable />
          </Col>
          <Col span="7" class="col area" offset="1">
            <span class="span span-max">机构名称/人</span>
            <Input v-model='queryInfo.area' size="large" placeholder="请输入机构名称/人" clearable />
          </Col>
          <Col offset="1" span="7" style="text-align: right;">
            <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
            <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
          </Col>
        </Row>
        <Col class="btn-add">
          <Button type="primary" class="add" @click='showModal(2)' v-if="btnShow(116107)">
            <Icon class="icon-font iconxinzeng"></Icon>
            创建{{assessYear}}社会评价模板
          </Button>
        </Col>
        <Col>
          <Table :row-class-name="rowClassName" :columns="columns" :data="socieEvalList" :border="false">
            <template slot='operation' slot-scope="{row}">
              <!-- 编辑 -->
              <Icon class="icon-font iconxiugai" size="24" color="#0972E7" @click="editTemplate(row.id)" v-if='btnShow(116102101103) && row.status === 0' title="编辑"/>
              <!-- 查看 -->
              <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="questionnaire(row.surveyId)" v-if='btnShow(116102101107) && row.status != 0' title="查看详情" />
              <!-- 提交 -->
              <Icon class="icon-font icontijiao" size="24" color="#0972E7" @click="submitTemplate(row.id)" v-if='btnShow(116102101104) && row.status === 0' title="提交"/>
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
            @on-change="handlePageChange"
            @on-page-size-change="handleSizeChange"
            show-sizer
            show-total
            show-elevator
            :page-size-opts="[10, 20, 30, 50]"
          />
        </Col>
      </Row>
    </Row>

    <!-- 创建社会评价模板弹窗 -->
    <Modal v-model='modal' width='70%' class='modal-template' @on-visible-change="modaChange">
      <p slot='header' class='modal-title'>
        <span>创建{{assessYear}}年{{tabName}}社会评价模板</span>
      </p>
      <div class='modal-content'>
        <Form ref='formValidateRef' :model='formValidate' :rules="addRuleValiTemplate">
          <FormItem label='被考察机构' prop="beInspectList">
            <Select v-model='formValidate.beInspectList' placeholder='请选择被考核单位' multiple>
              <Option v-for="(item, index) in inspectOrgList" :value="item.id" :key="index">{{ item.orgName }}</Option>
            </Select>
          </FormItem>
          <FormItem label='采集机构' prop="doInspectList">
            <Select v-model='formValidate.doInspectList' placeholder='请选择评价采集单位' multiple>
                <Option v-for="item in orgList" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
            </Select>
          </FormItem>
          <FormItem label='计分方式' prop="surveyScore">
            <Select v-model='formValidate.surveyScore' placeholder='请选择计分方式' @on-change="addFormValidate">
                <Option v-for="item in scoringList" :value="item.number" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <Row>
            <Col span='24' class='direction'>
              <Icon class='icon-font iconpingjia4' />评价方向
            </Col>
          </Row>
          <FormItem class='people' v-for="(item, index) in formValidate.surveySubtitleEntityList" :key="index" :prop="'surveySubtitleEntityList.' + index + '.title'" :rules="{required: true, message: '请输入评价方向', trigger: 'blur'}" :label="mapRealtionshipAnswerName[index]">
            <Row class="people-input">
              <Col span='15'>
                <Input v-model='formValidate.surveySubtitleEntityList[index].title' show-word-limit placeholder='请输入评价方向' :maxlength="25"/>
              </Col>
              <Col span='3' class="accounts-score">所占分值</Col>
              <Col span='2'>
                <FormItem :prop="'surveySubtitleEntityList.' + index + '.score'" :rules="{type: 'number', required: true, message: '请输入所占分值', trigger: 'blur'}">
                  <NumberInput :max=100 :point="2" v-model.number="formValidate.surveySubtitleEntityList[index].score" class="score-input"></NumberInput>
                </FormItem>
              </Col>
              <Col span="1" class="direction-grade">
                <span>分</span>
              </Col>
            </Row>
          </FormItem>
          <Row>
            <Col span='4' style='color: #0972E7' class="add-direction" v-if="formValidate.surveySubtitleEntityList.length < 20">
              <Icon class="icon-font iconxinzeng-" />
              <span class="direction-btn" @click="addDirection">新增</span>
            </Col>
            <Col offset='20' class="aggregate">总计：{{aggregateScore}}分</Col>
          </Row>
          <FormItem class='modal-footer'>
            <Button type='error' size='large' long :loading='modal_loading' @click="addTemplate" class='add-btn' :disabled="addFlag">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 编辑社会评价模板弹窗 -->
    <Modal v-model='etitModal' width='70%' class='modal-template' @on-visible-change="editModaChange">
      <p slot='header' class='modal-title'>
        <span>编辑{{assessYear}}年区县（市）社会评价模板</span>
      </p>
      <div class='modal-content'>
        <Form :model='editForm' :label-width='80' :rules="editRuleValiTemplate" ref="editForm">
          <FormItem label='被考察机构' prop="beInspectList">
            <Select v-model='editForm.beInspectList' disabled multiple>
              <Option v-for="item in toBeCollOrg" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
            </Select>
          </FormItem>
          <FormItem label='采集机构' prop="doInspectList">
            <Select v-model='editForm.doInspectList' placeholder='请选择评价采集单位' multiple>
                <Option v-for="item in orgList" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
            </Select>
          </FormItem>
          <FormItem label='计分方式' prop="surveyScore">
            <Select v-model='editForm.surveyScore' placeholder='请选择计分方式' @on-change="editFormValidate">
                <Option v-for="item in editScoringList" :value="item.number" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <Row>
            <Col span='24' class='direction'>
              <Icon class='icon-font iconpingjia4' />评价方向
            </Col>
          </Row>
          <FormItem class='people' v-for="(item, index) in editForm.surveySubtitleEntityList" :key="index" :prop="'surveySubtitleEntityList.' + index + '.title'" :rules="{required: true, message: '请输入评价方向', trigger: 'blur'}" :label="mapRealtionshipAnswerName[index]">
            <Row class="people-input">
              <Col span='15'>
                <Input v-model='editForm.surveySubtitleEntityList[index].title' show-word-limit placeholder='请输入评价方向' :maxlength="25" />
              </Col>
              <Col span='3' class="accounts-score">所占分值</Col>
              <Col span='2'>
                <FormItem :prop="'surveySubtitleEntityList.' + index + '.score'" :rules="{type: 'number', required: true, message: '请输入所占分值', trigger: 'blur'}">
                  <NumberInput :max=100 :point="2" v-model="editForm.surveySubtitleEntityList[index].score" class="score-input"></NumberInput>
                </FormItem>
              </Col>
              <Col span="1" class="direction-grade">
                <span>分</span>
              </Col>
            </Row>
          </FormItem>
          <Row>
            <Col span='4' style='color: #0972E7' class="add-direction" v-if="editForm.surveySubtitleEntityList.length < 20">
              <Icon class="icon-font iconxinzeng-" />
              <span class="direction-btn" @click="editDirection">新增</span>
            </Col>
            <Col offset='21' class="aggregate">总计：{{editAggregateScore}}分</Col>
          </Row>
          <FormItem class='modal-footer'>
            <Button type='error' size='large' long :loading='modal_loading' @click="submitEditTemplate" class='add-btn' :disabled="editFlag">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import NumberInput from '@/common/numberInput/numberInput.vue'
import mixin_table from '@/common/mixin/table'
import {
  getPageTab,
  isViewSocie,
  isViewCreateButton,
  getSocieEval,
  getInspect,
  getOrg,
  socieEvalSave,
  socieEvalUpdate,
  socieEval,
  getToBeCollOrgList
} from '@/api/estimate'
export default {
  mixins: [mixin_table],
  components: {
    NumberInput
  },
  data () {
    return {
      // 接收年份检测结果
      isYearDataFlag: false,
      // 是否显示创建模板按钮开关
      isViewCreateButtonFlag: true,
      // 考核年份
      assessYear: '',
      // 步骤条参数
      stepsList: [
        {
          explain: '创建模板',
          icon: 'icon-font iconchuangjianpushu-xianxing'
        },
        {
          explain: '内容填写',
          icon: 'icon-font icontianxie'
        },
        {
          explain: '采集与录入',
          icon: 'icon-font iconqichuluru'
        }
      ],
      // 高亮索引
      nowIndex: 0,
      // 模板id
      socieSaveId: null,
      // 页签数据
      tabList: [],
      // 页签名称
      tabName: '',
      // 查询条件
      queryInfo: {
        tab: null,
        page: 1,
        size: 10,
        year: '',
        area: ''
      },
      // 数据总条数
      total: 0,
      // 模板标题
      templateTitle: '',
      // 模板列表数据
      socieEvalList: [],
      // 编辑模板数据
      editForm: {
        beInspectList: [],
        doInspectList: [],
        surveyScore: null,
        surveySubtitleEntityList: [
          {
            title: '',
            score: ''
          }
        ]
      },
      // 步骤条参数
      current: 0,
      // 表格参数
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
          title: '年份',
          key: 'years',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '机构名称/人',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '问卷调查题',
          key: 'quesNum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '反馈与批示',
          key: 'feedback',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '得分',
          key: 'score',
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
      // 控制创建社会评价模板弹窗开关
      modal: false,
      etitModal: false,
      modal_loading: false,
      // 控制创建模板弹窗确定按钮开关
      addFlag: true,
      // 创建模板内容
      formValidate: {
        types: 2,
        userType: null,
        beInspectList: [],
        doInspectList: [],
        surveyScore: null,
        surveySubtitleEntityList: [
          {
            title: '',
            score: ''
          }
        ]
      },
      // 创建模板合计分数
      aggregate: 0,
      // 创建模板被考察机构
      inspectOrgList: [],
      // 编辑模板被考察机构
      toBeCollOrg: [],
      // 创建模板机构列表
      orgList: [],
      // 控制编辑模板弹窗确定按钮开关
      editFlag: false,
      // 创建模板计分方式
      scoringList: [
        {
          value: '10分制',
          number: 10
        },
        {
          value: '100分制',
          number: 100
        }
      ],
      // 编辑模板计分方式
      editScoringList: [
        {
          value: '10分制',
          number: 10
        },
        {
          value: '100分制',
          number: 100
        }
      ],
      // 新增方向映射
      mapRealtionshipAnswerName: {
        0: '一、',
        1: '二、',
        2: '三、',
        3: '四、',
        4: '五、',
        5: '六、',
        6: '七、',
        7: '八、',
        8: '九、',
        9: '十、',
        10: '十一、',
        11: '十二、',
        12: '十三、',
        13: '十四、',
        14: '十五、',
        15: '十六、',
        16: '十七、',
        17: '十八、',
        18: '十九、',
        19: '二十、'
      },
      // 创建模板表单验证
      addRuleValiTemplate: {
        beInspectList: [
          { type: 'array', required: true, message: '请选择被考察机构', trigger: 'change' }
        ],
        doInspectList: [
          { type: 'array', required: true, message: '请选择采集机构', trigger: 'change' }
        ],
        surveyScore: [
          { type: 'number', required: true, message: '请选择计分方式', trigger: 'change' }
        ]
      },
      // 编辑模板表单验证
      editRuleValiTemplate: {
        beInspectList: [
          { type: 'array', required: true, message: '请选择被考察机构', trigger: 'change' }
        ],
        doInspectList: [
          { type: 'array', required: true, message: '请选择采集机构', trigger: 'change' }
        ],
        surveyScore: [
          { type: 'number', required: true, message: '请选择计分方式', trigger: 'change' }
        ]
      }
    }
  },

  created () {
    // 检测该年份是否有数据
    this.isYearData()
    // 获取发起考核年份
    this.isYear()
  },

  computed: {
    // 创建模板总分
    aggregateScore: function () {
      let resultNumber = 0
      const result = this.formValidate.surveySubtitleEntityList.reduce((res, cur) => {
        res += Number(cur.score)
        return res
      }, 0)
      resultNumber += result
      return resultNumber
    },
    // 编辑模板总分
    editAggregateScore: function () {
      let resultNumber = 0
      const result = this.editForm.surveySubtitleEntityList.reduce((res, cur) => {
        res += Number(cur.score)
        return res
      }, 0)
      resultNumber += result
      return resultNumber
    }
  },
  watch: {
    // 创建模板确定按钮控制开关
    aggregateScore: function (e) {
      if (this.formValidate.surveyScore === e) {
        this.addFlag = false
      } else {
        this.addFlag = true
      }
    },
    // 编辑模板确定按钮控制开关
    editAggregateScore: function (e) {
      if (this.editForm.surveyScore === e) {
        this.editFlag = false
      } else {
        this.editFlag = true
      }
    }
  },

  methods: {
    // 获取当前发起考核年份
    isYear () {
      const dt = new Date()
      const y = dt.getFullYear()
      const year = y - 1
      this.assessYear = year
    },
    // 检测年份是否有数据
    isYearData () {
      const data = {
        types: 2
      }
      isViewSocie(data).then(res => {
        if (res.data.code === 10000) {
          if (res.data.data.code === 0) {
            // 有数据
            this.isYearDataFlag = false
            // 获取页签
            this.getPageTabType()
          } else {
            // 无数据
            this.isYearDataFlag = true
          }
        }
      })
    },
    // 判断是否显示创建模板按钮
    isViewCreateBtn () {
      const data = {
        orgType: this.queryInfo.tab,
        types: 2
      }
      isViewCreateButton(data).then(res => {
        if (res.data.code === 10000) {
          if (res.data.data.code === 1) {
            // 显示按钮
            this.isViewCreateButtonFlag = true
          } else {
            // 隐藏按钮
            this.isViewCreateButtonFlag = false
          }
        }
      })
    },
    // 查询模板列表
    getSocieEvalList (obj) {
      getSocieEval(obj).then(res => {
        if (res.data.code === 10000) {
          this.socieEvalList = res.data.data.dataList
          this.total = res.data.data.total
          this.templateTitle = res.data.data.listTitle
        }
      })
    },
    // 新增方向
    addDirection () {
      this.formValidate.surveySubtitleEntityList.push({
        title: '',
        score: ''
      })
    },
    // 获取页签
    getPageTabType () {
      const data = {
        types: 2
      }
      getPageTab(data).then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data.list
          this.queryInfo.tab = res.data.data.list[0].orgType
          this.tabName = res.data.data.orgName
          this.getSocieList()
          this.isViewCreateBtn()
        }
      })
    },
    // 根据页签获取模板列表
    getSocieEvalTypeList () {
      this.getSocieList()
    },
    // 查询
    inquire () {
      this.queryInfo.page = 1
      // 根据年份查询
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.getQueryList()
      } else {
        this.getSocieList()
      }
    },
    // 查询所有
    getSocieList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        types: 2
      }
      this.getSocieEvalList(data)
    },
    // 年份查询
    getYearList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.year,
        types: 2
      }
      this.getSocieEvalList(data)
    },
    // 区县市查询
    getAreaList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        types: 2
      }
      this.getSocieEvalList(data)
    },
    // 关联查询
    getQueryList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        years: this.queryInfo.year,
        types: 2
      }
      this.getSocieEvalList(data)
    },
    // 清空
    empty () {
      this.queryInfo.year = ''
      this.queryInfo.area = ''
      this.queryInfo.page = 1
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        types: 2
      }
      this.getSocieEvalList(data)
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      // 根据年份查询
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.getQueryList()
      } else {
        this.getSocieList()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      // 根据年份查询
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.getQueryList()
      } else {
        this.getSocieList()
      }
    },
    // 显示创建模板弹窗
    showModal () {
      this.modal = true
      this.getInspectOrgList()
      this.getOrgList()
    },
    // 创建模板获取被考察机构列表
    getInspectOrgList () {
      const data = {
        orgType: this.queryInfo.tab,
        types: 2
      }
      getInspect(data).then(res => {
        if (res.data.code === 10000) {
          this.inspectOrgList = res.data.data.list
          this.formValidate.userType = res.data.data.userType
        }
      })
    },
    // 获取机构列表
    getOrgList () {
      const data = {
        types: 2
      }
      getOrg(data).then(res => {
        if (res.data.code === 10000) {
          this.orgList = res.data.data
        }
      })
    },
    // 创建模板计分方式改变
    addFormValidate (e) {
      if (e === this.aggregateScore) {
        this.addFlag = false
      } else {
        this.addFlag = true
      }
    },
    // 提交创建模板
    addTemplate () {
      this.$refs.formValidateRef.validate((valid) => {
        if (valid) {
          socieEvalSave(this.formValidate).then(res => {
            if (res.data.code === 10000) {
              this.modal_loading = false
              this.modal = false
              this.$Message.success('创建模板成功')
              this.isYearData()
              this.getSocieList()
              this.getPageTabType()
            }
          })
        }
      })
    },
    // 监听创建模板弹窗状态改变函数
    modaChange (e) {
      if (e === false) {
        this.$refs.formValidateRef.resetFields()
        this.addFlag = true
        this.formValidate = {
          beInspectList: [],
          doInspectList: [],
          surveyScore: null,
          surveySubtitleEntityList: [
            {
              title: '',
              score: ''
            }
          ]
        }
      }
    },
    // 监听编辑模板弹窗状态改变函数
    editModaChange (e) {
      if (e === false) {
        this.$refs.editForm.resetFields()
        this.editFlag = true
        this.editForm.direction = [{
          people: '',
          peopleScore: ''
        }]
      }
    },
    // 点击跳转调查表页
    questionnaire (id) {
      this.$router.push({
        path: 'interior_questionnaire', query: { id: id }
      })
    },
    // 切换页签
    tableBtn (orgType, i, orgName) {
      this.tabName = orgName
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getSocieList()
      this.isViewCreateBtn()
    },
    // 提交模板
    submitTemplate (id) {
      socieEvalUpdate(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交成功')
          this.getSocieList()
        }
      })
    },
    // 获取修改模板数据
    editTemplate (id) {
      // 模板id
      this.socieSaveId = id
      this.etitModal = true
      this.getToBeCollOrg(id)
      this.getOrgList()
      socieEval(this.socieSaveId).then(res => {
        if (res.data.code === 10000) {
          this.editForm = res.data.data
        }
      })
    },
    // 编辑模板计分方式改变
    editFormValidate (e) {
      if (e === this.editAggregateScore) {
        this.editFlag = false
      } else {
        this.editFlag = true
      }
    },
    // 编辑模板获取被考察机构列表
    getToBeCollOrg (id) {
      const data = {
        orgType: this.queryInfo.tab,
        types: 2,
        id: id
      }
      getToBeCollOrgList(data).then(res => {
        if (res.data.code === 10000) {
          this.toBeCollOrg = res.data.data
        }
      })
    },
    // 编辑模板新增方向
    editDirection () {
      this.editForm.surveySubtitleEntityList.push({
        title: '',
        score: ''
      })
    },
    // 提交编辑模板
    submitEditTemplate () {
      this.editForm.surveySubtitleEntityList.forEach(item => {
        if (item.score) {
          item.score = Number(item.score)
        }
      })
      this.editForm.id = this.socieSaveId
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          socieEvalSave(this.editForm).then(res => {
            if (res.data.code === 10000) {
              this.modal_loading = true
              setTimeout(() => {
                this.modal_loading = false
                this.etitModal = false
                this.$Message.success('修改模板成功')
              }, 2000)
            }
          })
        }
      })
    }
  }
}
</script>
