<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-icon {
  margin-right: 6px;
}
.header {
  width: 100%;
  height: 105px;
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
}
.content {
  .header-search {
    padding: 0;
    .area {
      margin-left: 4%;
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
          <article-steps :currentId="2" :stepsList="stepsList"></article-steps>
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
            <span class="span span-max">状态</span>
            <Select v-model="queryInfo.state" placeholder="默认全部状态" @on-change="selectHandel" size="large">
              <Option v-for="item in cityList" :value="item.statusList" :key="item.id">{{ item.statusName }}</Option>
            </Select>
          </Col>
          <Col offset="1" span="7" style="text-align: right;">
            <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
            <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
          </Col>
        </Row>
        <Col>
          <Table :row-class-name="rowClassName" :columns="columns" :data="socieEvalQuesList" :border="false">
            <template slot="operation" slot-scope="{row}">
              <!-- 编辑 -->
              <Icon class="icon-font iconxiugai" size="24" color="#0972E7" @click="editQuestionnaire(row.surveyId)" v-if="btnShow(116102102102) && row.status === 1" title="编辑" />
              <!-- 查看 -->
              <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="questionnaire(row.surveyId)" v-if="btnShow(116102101107) && row.status != 1" title="查看详情" />
              <!-- 提交 -->
              <Icon class="icon-font icontijiao" size="24" color="#0972E7" @click="submitQuestionnaire(row.id)" v-if="btnShow(116102102103) && row.status === 1" title="提交"/>
            </template>
            <template slot-scope="{ row }" slot="state">
              <span>{{row.status == 1 ? '待提交': row.status == 2 ? '已提交':'已完成'}}</span>
            </template>
          </Table>
        </Col>
        <Col class="page">
          <Page :total="total" :page-size="queryInfo.size" :current="queryInfo.page" prev-text="上一页" next-text="下一页" @on-change="handlePageChange" @on-page-size-change="handleSizeChange" show-sizer show-total show-elevator :page-size-opts="[10, 20, 30, 50]"/>
        </Col>
      </Row>
    </Row>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getSocieEvalQuesList,
  getStatusType,
  questtionSub
} from '@/api/estimate'
export default {
  mixins: [mixin_table],
  data () {
    return {
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
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10,
        year: '',
        state: '',
        types: 2
      },
      // 总条数
      total: 0,
      // 问卷调查列表
      socieEvalQuesList: [],
      cityList: [],
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
          title: '模块',
          key: 'subTtileStrs',
          tooltip: true,
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
          title: '状态',
          slot: 'state',
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
    // 获取问卷调查列表
    this.getSocieEvalQuesAll()
    // 查询状态
    this.getStatusByTypes()
  },
  methods: {
    // 获取问卷调查列表
    getSocieQuesList (data) {
      getSocieEvalQuesList(data).then(res => {
        if (res.data.code === 10000) {
          this.socieEvalQuesList = res.data.data.dataList
          this.total = res.data.data.total
          this.tableTitle = res.data.data.listTitle
        }
      })
    },
    // 查询状态
    getStatusByTypes () {
      getStatusType().then(res => {
        if (res.data.code === 10000) {
          this.cityList = res.data.data
        }
      })
    },
    // 查询
    inquire () {
      if (this.queryInfo.year && !this.queryInfo.state) {
        // 年份查询
        this.queryInfo.page = 1
        this.yearInquire()
      } else if (!this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.statusInquire()
      } else if (this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.yearStatusInquire()
      } else {
        this.queryInfo.page = 1
        this.getSocieEvalQuesAll()
      }
    },
    // 清空
    empty () {
      this.queryInfo = {
        page: 1,
        size: 10,
        year: '',
        state: '',
        types: 2
      }
      this.getSocieEvalQuesAll()
    },
    // 查询所有
    getSocieEvalQuesAll () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        types: 2
      }
      this.getSocieQuesList(data)
    },
    // 年份查询
    yearInquire () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        years: this.queryInfo.year,
        types: 2
      }
      this.getSocieQuesList(data)
    },
    // 状态查询
    statusInquire () {
      let statusId = this.queryInfo.state + ''
      let statusList = statusId.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        statusList: statusList,
        types: 2
      }
      this.getSocieQuesList(data)
    },
    // 年份+状态查询
    yearStatusInquire () {
      let statusId = this.queryInfo.state + ''
      let statusList = statusId.split(',')
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size,
        statusList: statusList,
        years: this.queryInfo.year,
        types: 2
      }
      this.getSocieQuesList(data)
    },
    // 查询状态
    selectHandel () {
      if (this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.yearStatusInquire()
      } else if (!this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.statusInquire()
      }
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.year && !this.queryInfo.state) {
        // 年份查询
        this.queryInfo.page = 1
        this.yearInquire()
      } else if (!this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.statusInquire()
      } else if (this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.yearStatusInquire()
      } else {
        this.queryInfo.page = 1
        this.getSocieEvalQuesAll()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.year && !this.queryInfo.state) {
        // 年份查询
        this.queryInfo.page = 1
        this.yearInquire()
      } else if (!this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.statusInquire()
      } else if (this.queryInfo.year && this.queryInfo.state) {
        this.queryInfo.page = 1
        this.yearStatusInquire()
      } else {
        this.queryInfo.page = 1
        this.getSocieEvalQuesAll()
      }
    },
    // 查看详情
    questionnaire (id) {
      this.$router.push({
        path: 'interior_examine_particulars', query: { id: id }
      })
    },
    // 提交问卷
    submitQuestionnaire (id) {
      questtionSub(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交成功')
          this.getSocieEvalQuesAll()
        }
      })
    },
    // 进入编辑页面
    editQuestionnaire (id) {
      this.$router.push({
        path: 'interior_entering_content', query: { id: id }
      })
    }
  }
}

</script>
