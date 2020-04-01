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
.ivu-form-item {
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
/* 无数据展示页面 */
.no-data {
  height: 100%;
  background: url('~@/assets/images/estimate/society-estimate-bg.png') no-repeat;
  background-size: 100% 100%;
}
.header {
  width: 100%;
  height: 108px;
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
    text-align: center;
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
</style>

<template>
  <div>
    <Layout>
      <!-- 无数据页面 -->
      <Content class='no-data' v-if="isYearDataFlag"></Content>

      <!-- 有数据页面 -->
      <div v-else>
        <Row class='header'>
          <Row class='title'>
            <Col span='24'>
              <h4>评价管理</h4>
            </Col>
          </Row>
          <Row class="article-steps">
            <Col span='24'>
              <p>当前单位：{{templateTitle}}</p>
            </Col>
          </Row>
          <Row class='tabs'>
              <Col span='3' v-for="(item, index) in tabList"  :class="index == nowIndex ? 'tabs-title active' : 'tabs-title'" :key="index"  @click.native="tableBtn(item.orgType,index,item.orgtypeName)"><span>{{item.orgtypeName}}</span></Col>
          </Row>
        </Row>
        <Row class="content">
        <!-- 搜索区域 -->
        <Row class="header-search">
          <Col span="6" class="col">
            <span class="span span-max">年份</span>
            <Input v-model='queryInfo.year' size="large" placeholder="请输入年份" clearable />
          </Col>
          <Col span="6" class="col area">
            <span class="span span-max">乡镇-街道</span>
            <Input v-model='queryInfo.area' size="large" placeholder="请输入乡镇-街道名称" clearable />
          </Col>
          <Col span="6" class="col area">
            <span class="span span-max">当前流程</span>
            <Select v-model="queryInfo.task" placeholder="默认全部流程" class="flow-select" @on-change="taskChange" size="large">
              <Option v-for="item in taskInfoList" :value="item.nameValue" :key="item.id">{{item.name}}</Option>
            </Select>
          </Col>
          <Col span="6" style="text-align: right;">
            <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
            <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
          </Col>
        </Row>
        <Col>
          <Table :row-class-name="rowClassName" :columns="columns" :data="socieEvalList" :border="false">
            <template slot='operation' slot-scope="{row}">
              <!-- 查看 -->
              <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="questionnaire(row.surveyId)" title="查看详情" v-if="btnShow(116102101107)"/>
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
      </div>
    </Layout>

  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  evaManPageTab,
  getTaskInfo,
  getSocieEval
} from '@/api/estimate'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 接收年份检测结果
      isYearDataFlag: false,
      // 高亮索引
      nowIndex: 0,
      // 页签数据
      tabList: [],
      // 查询条件
      queryInfo: {
        tab: null,
        page: 1,
        size: 10,
        year: '',
        area: '',
        task: ''
      },
      // 数据总条数
      total: 0,
      // 标题
      templateTitle: '',
      // 列表数据
      socieEvalList: [],
      // 当前流程下拉框数据
      taskInfoList: [],
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
          title: '乡镇-街道',
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
          title: '当前流程',
          key: 'remark',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ]
    }
  },

  created () {
    // 获取页签
    this.getPageTabType()
  },

  methods: {
    // 查询模板列表
    getSocieEvalList (obj) {
      getSocieEval(obj).then(res => {
        if (res.data.code === 10000) {
          this.socieEvalList = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 获取页签
    getPageTabType () {
      evaManPageTab().then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data.list
          this.queryInfo.tab = res.data.data.list[0].orgType
          this.templateTitle = res.data.data.orgName
          this.getSocieList()
          this.getTaskInfoList()
        }
      })
    },
    // 获取评价管理当前流程下拉框数据
    getTaskInfoList () {
      const data = {
        types: 16
      }
      getTaskInfo(data).then(res => {
        if (res.data.code === 10000) {
          this.taskInfoList = res.data.data
        }
      })
    },
    // 当前流程下拉框改变
    taskChange () {
      if (this.queryInfo.task && !this.queryInfo.year && !this.queryInfo.area) {
        this.taskInquire()
      } else if (this.queryInfo.task && this.queryInfo.year && !this.queryInfo.area) {
        this.yearTaskInquire()
      } else if (this.queryInfo.task && !this.queryInfo.year && this.queryInfo.area) {
        this.areaTaskInquire()
      } else if (this.queryInfo.task && this.queryInfo.year && this.queryInfo.area) {
        this.areaYearTaskInquire()
      }
    },
    // 查询
    inquire () {
      this.queryInfo.page = 1
      // 根据年份查询
      if (this.queryInfo.year && !this.queryInfo.area && !this.queryInfo.task) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year && !this.queryInfo.task) {
        this.getAreaList()
      } else if (this.queryInfo.task && !this.queryInfo.year && !this.queryInfo.area) {
        this.taskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && !this.queryInfo.task) {
        this.yearAreaInquire()
      } else if (this.queryInfo.year && !this.queryInfo.area && this.queryInfo.task) {
        this.yearTaskInquire()
      } else if (!this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaTaskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaYearTaskInquire()
      } else {
        this.getSocieList()
      }
    },
    // 查询所有
    getSocieList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab
      }
      this.getSocieEvalList(data)
    },
    // 年份查询
    getYearList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.year
      }
      this.getSocieEvalList(data)
    },
    // 乡镇街道查询
    getAreaList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area
      }
      this.getSocieEvalList(data)
    },
    // 当前流程查询
    taskInquire () {
      let task = this.queryInfo.task.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        statusList: task
      }
      this.getSocieEvalList(data)
    },
    // 年份+当前流程查询
    yearTaskInquire () {
      let task = this.queryInfo.task.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.year,
        statusList: task
      }
      this.getSocieEvalList(data)
    },
    // 年份+乡镇街道查询
    yearAreaInquire () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        years: this.queryInfo.year
      }
      this.getSocieEvalList(data)
    },
    // 乡镇街道+当前流程查询
    areaTaskInquire () {
      let task = this.queryInfo.task.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        statusList: task
      }
      this.getSocieEvalList(data)
    },
    // 乡镇街道+年份+当前流程查询
    areaYearTaskInquire () {
      let task = this.queryInfo.task.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area,
        years: this.queryInfo.year,
        statusList: task
      }
      this.getSocieEvalList(data)
    },
    // 清空
    empty () {
      this.queryInfo.page = 1
      this.queryInfo.size = 10
      this.queryInfo.year = ''
      this.queryInfo.area = ''
      this.queryInfo.task = ''
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        orgType: this.queryInfo.tab
      }
      this.getSocieEvalList(data)
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.year && !this.queryInfo.area && !this.queryInfo.task) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year && !this.queryInfo.task) {
        this.getAreaList()
      } else if (this.queryInfo.task && !this.queryInfo.year && !this.queryInfo.area) {
        this.taskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && !this.queryInfo.task) {
        this.yearAreaInquire()
      } else if (this.queryInfo.year && !this.queryInfo.area && this.queryInfo.task) {
        this.yearTaskInquire()
      } else if (!this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaTaskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaYearTaskInquire()
      } else {
        this.getSocieList()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.year && !this.queryInfo.area && !this.queryInfo.task) {
        this.getYearList()
      } else if (this.queryInfo.area && !this.queryInfo.year && !this.queryInfo.task) {
        this.getAreaList()
      } else if (this.queryInfo.task && !this.queryInfo.year && !this.queryInfo.area) {
        this.taskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && !this.queryInfo.task) {
        this.yearAreaInquire()
      } else if (this.queryInfo.year && !this.queryInfo.area && this.queryInfo.task) {
        this.yearTaskInquire()
      } else if (!this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaTaskInquire()
      } else if (this.queryInfo.year && this.queryInfo.area && this.queryInfo.task) {
        this.areaYearTaskInquire()
      } else {
        this.getSocieList()
      }
    },
    // 点击跳转调查表页
    questionnaire (id) {
      this.$router.push({
        path: 'examine_particulars', query: { id: id }
      })
    },
    // 切换页签
    tableBtn (orgType, i, orgName) {
      this.tabName = orgName
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getSocieList()
    }
  }
}
</script>
