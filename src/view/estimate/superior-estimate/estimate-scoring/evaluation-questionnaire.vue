<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-header {
  border-bottom: 0;
}
/deep/.ivu-modal-footer {
  border-top: 0;
}
/deep/.ivu-icon {
  margin-right: 6px;
}
/deep/.ivu-form-item {
  margin-bottom: 0;
}
/deep/.ivu-form .ivu-form-item-label {
  font-size: 18px;
}
.header {
  width: 100%;
  height: 147px;
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
      color: rgba(9, 114, 231, 1);
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      cursor: pointer;
    }
    .active {
      color: #FF9B29;
      border-bottom: 2px solid #FF9B29;
    }
  }
}
// 计分弹窗
.modal {
  .modal-title {
    margin: 50px 0 40px;
    font-size:20px;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .modal-content {
    width: 100%;
    padding: 0 50px;
    span {
      font-size:18px;
      font-weight: 500;
      color:rgba(51,51,51,1);
    }
    .modal-content-input {
      margin: 0 8px 0 15px;
      input {
        border: none;
        width: 376px;
        height: 38px;
        border-radius:6px;
        background: #F3F3F3;
      }
    }
  }
  .modal-explain {
    margin: 10px 0 0 110px;
    font-size:12px;
    font-weight:500;
    color:rgba(204,204,204,1);
  }
  .modal-footer {
    text-align: center;
    .add-btn {
      width: 382px;
      height: 56px;
      background:rgba(9,114,231,1);
      border-radius:6px;
      border: none;
      font-size:18px;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-bottom: 80px;
    }
  }
}
</style>

<template>
  <div>
    <Row>
      <Row class='header'>
        <Row class='title'>
          <Col span='24'>{{tableTitle}}</Col>
        </Row>
        <Row class="article-steps">
          <article-steps :currentId="3" :stepsList="stepsList"></article-steps>
        </Row>
        <Row class='tabs'>
          <Col span='3' v-for="(item, index) in tabList"  :class="index == nowIndex ? 'tabs-title active' : 'tabs-title'" :key="index"  @click.native="tableBtn(item.orgType,index)"><span>{{item.orgtypeName}}</span></Col>
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
            <Input  v-model='queryInfo.area' size="large" placeholder="请输入机构名称/人" clearable />
          </Col>
          <Col offset="1" span="7" style="text-align: right;">
            <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
            <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
          </Col>
        </Row>
        <Col>
          <Table :row-class-name="rowClassName" :columns="columns" :data="evalGradeList" :border="false">
            <template slot="operation" slot-scope="{row}">
              <!-- 计分 -->
              <Icon class="icon-font icontongjifenxi" size="24" color="#0972E7" @click="scoring(row.id, row.surveyScore, row.orgName)" v-if="btnShow(116102103102) && row.status != 3" title="计分" />
              <!-- 查看查看详情 -->
              <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="questionnaire(row.surveyId)" title="查看详情" v-if="btnShow(116102101107)"/>
              <!-- 下载 -->
              <Icon class="icon-font iconxiazai-" size="24" color="#0972E7" @click="download(row.surveyId)" title="下载" v-if="btnShow(116102103103)"/>
            </template>
          </Table>
        </Col>
        <Col class="page">
          <Page :total="total" :page-size="queryInfo.size" :current="queryInfo.page" prev-text="上一页" next-text="下一页" @on-change="handlePageChange" @on-page-size-change="handleSizeChange" show-sizer show-total show-elevator :page-size-opts="[10, 20, 30, 50]"/>
        </Col>
      </Row>
    </Row>

    <!-- 计分弹窗 -->
    <Modal v-model="modal" width="580" class="modal">
        <p slot="header" style="text-align:center" class="modal-title">
          {{orgNameType}}社会评价最终得分
        </p>
        <Row class="modal-content">
          <Form>
            <FormItem label='分数'>
              <Col span="19">
                <NumberInput :max=100 :point="2" v-model="scoringScore"></NumberInput>
              </Col>
              <Col span="2" style="margin-left: 6px;">
                <span>分</span>
              </Col>
            </FormItem>
          </Form>
        </Row>
        <div class="modal-explain">线上问卷得分</div>
        <div slot="footer" class="modal-footer">
            <Button type="error" size="large" class="add-btn" @click="addScoring">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import NumberInput from '@/common/numberInput/numberInput.vue'
import mixin_table from '@/common/mixin/table'
import {
  getPageTab,
  getSocieEvalGrade,
  socieEvalGrade
} from '@/api/estimate'
export default {
  mixins: [mixin_table],
  components: {
    NumberInput
  },
  data () {
    return {
      // 高亮索引
      nowIndex: 0,
      // 页签数据
      tabList: [],
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
      // 表名
      tableTitle: '',
      // 计分id
      socieEvalId: null,
      // 计分分数
      scoringScore: '',
      // 查询条件
      queryInfo: {
        tab: '',
        page: 1,
        size: 10,
        year: '',
        area: ''
      },
      // 数据总条数
      total: 0,
      // 表格参数
      columns: [
        {
          title: '序号',
          key: 'surveyId',
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
          title: '反馈与评论',
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
      // 表单数据
      evalGradeList: [],
      // 计分弹窗开关
      modal: false,
      // 计分弹窗机构名称
      orgNameType: '',
      // 计分方式
      surveyScoreType: 0,
      // 创建模板内容
      formValidate: {
        assess: '',
        gather: '',
        scoring: '',
        people: '',
        peopleScore: '',
        direction: '',
        directionScore: ''
      },
      // 下载域名
      downloadUrl: 'http://47.112.144.243:9092'
    }
  },

  created () {
    // 获取页签
    this.getPageTabType()
  },
  computed: {},
  methods: {
    // 获取页签
    getPageTabType () {
      const data = {
        types: 1
      }
      getPageTab(data).then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data.list
          this.queryInfo.tab = res.data.data.list[0].orgType
          this.getSocieEvalGradeAll()
        }
      })
    },
    // 获取评价列表
    getSocieEvalGradeTypeList (data) {
      getSocieEvalGrade(data).then(res => {
        if (res.data.code === 10000) {
          this.evalGradeList = res.data.data.dataList
          this.total = res.data.data.total
          this.tableTitle = res.data.data.listTitle
        }
      })
    },
    // 查询
    inquire () {
      // 根据年份查询
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.queryInfo.page = 1
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.queryInfo.page = 1
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.queryInfo.page = 1
        this.getQueryList()
      } else {
        this.queryInfo.page = 1
        this.getSocieEvalGradeAll()
      }
    },
    // 查询所有
    getSocieEvalGradeAll () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        types: 1
      }
      this.getSocieEvalGradeTypeList(data)
    },
    // 年份查询
    getYearList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.year,
        types: 1
      }
      this.getSocieEvalGradeTypeList(data)
    },
    // 区县市查询
    getAreaList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        types: 1
      }
      this.getSocieEvalGradeTypeList(data)
    },
    // 关联查询
    getQueryList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        years: this.queryInfo.year,
        types: 1
      }
      this.getSocieEvalGradeTypeList(data)
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
        types: 1
      }
      this.getSocieEvalGradeTypeList(data)
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.getQueryList()
      } else {
        this.getSocieEvalGradeAll()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.year && !this.queryInfo.area) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year) {
        this.getAreaList()
      } else if (this.queryInfo.year && this.queryInfo.area) {
        this.getQueryList()
      } else {
        this.getSocieEvalGradeAll()
      }
    },
    // 切换页签
    tableBtn (orgType, i) {
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getSocieEvalGradeAll()
    },
    // 点击跳转调查表页
    questionnaire (id) {
      this.$router.push({
        path: 'superior_estimate_scoring', query: { id: id }
      })
    },
    // 下载
    download (surveyId) {
      location.href = this.downloadUrl + '/socie/uploadQuestionFile/' + surveyId
    },
    // 打开计分弹窗
    scoring (id, surveyScore, orgName) {
      this.orgNameType = orgName
      this.surveyScoreType = surveyScore
      this.socieEvalId = id
      this.modal = true
    },
    // 打分
    addScoring () {
      if (!this.scoringScore) {
        this.$Message.error('请输入计分分数')
      } else if (this.scoringScore > this.surveyScoreType) {
        this.$Message.error('计分分数不能大于计分方式设置的值')
      } else {
        const data = {
          socieEvalId: this.socieEvalId,
          score: this.scoringScore,
          types: 1
        }
        socieEvalGrade(data).then(res => {
          if (res.data.code === 10000) {
            this.modal = false
            this.scoringScore = ''
            this.$Message.success('计分成功')
            this.getSocieEvalGradeAll()
          }
        })
      }
    }
  }
}
</script>
