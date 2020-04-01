<style lang='less' scoped>
@import  "../../../../common/less/global.less";
/deep/.ivu-modal-footer{
    border-top: 0;
    display: none;
}
.countdown {
      width: 100%;
      height: 50px;
      background-color: #FFEBD5;
      padding: 0 20px;
}
.header {
  .header-title {
      text-align: center;
      margin-bottom: 30px;
      .title {
        font-size: 24px;
        color: #333333
      }
      .current-unit{
          font-size: 22px;
          color: #666666;
      }
  }
  .steps {
      width: 100%;
      height: 50px;
      overflow: hidden;
      margin-top: 10px;
  }
}
.inquire {
    display: flex;
    margin-bottom: 20px;
    .query-modal{
      flex: 1;
      height: 50px;
      display: flex;
      line-height: 40px;
        span{
            margin-right: 5px;
            width: 30%;
            text-align: center;
        }
        /deep/.ivu-input-large{
            flex: 1;
        }
        /deep/.custome-btn {
            width: 100px;
            height: 40px;
            border-radius: 4px;
            margin-right: 30px;
        }
        /deep/.custome-btn-default{
            background-color: #cae4ff;
            color: #0972E7;
        }
    }
    .query-clear{
        display: flex;
        justify-content: flex-end;
    }
    .status{
        padding-left: 25px;
    }
}
.modal-title{
  font-size: 20px;
  color: #333333;
  text-align: center;
}
.secondary {
  font-size: 16px;
  color: #666666;
  text-align: center;
}
.thirdTitle{
    font-size: 14px;
    color: #666666;
    text-align: center;
}
.modal-content {
    margin-top: 30px;
}
/deep/.ivu-modal-body {
    padding: 0;
    padding-top: 30px;
}
.tabs{
    margin-top: 20px;
}
/deep/.ivu-tabs-nav-scroll{
    background-color: #EFF7FF;
    margin-bottom: 10px;
    border: 0;
}
.quota-table {
  background-color: #fff;
  padding: 20px;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 18px;
  font-weight: 500;
  line-height: 57px;
  color: rgba(9, 114, 231, 1);
  padding: 0 50px;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #FF9B29;
}
/deep/.ivu-tabs-ink-bar {
  background-color: #FF9B29;
}
/deep/textarea.ivu-input {
  min-height: 300px;
  border: 1px solid #5EADFF;
  resize: none;
  border-radius: 8px;
}
/deep/.ivu-input-type-textarea{
  padding: 15px;
}
.submit{
  margin-bottom: 15px;
  /deep/.ivu-btn-primary{
    border-radius: 4px;
    margin-left: 15px;
  }
}
.submit-assessment{
  /deep/.ivu-btn-primary{
    border-radius: 4px;
    margin-left: 20px;
  }
}
.separate-line{
  width: 100%;
  height: 15px;
  background-color: #F3F3F3;
}
.already-feedback {
  font-size: 20px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin:15px 0 20px 15px;
}
.feedback-content-item {
  margin: 0 45px 8px 50px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  p{
    font-size: 14px;
    color: #333333;
    margin-bottom: 8px;
  }
  .feedback-person{
    display: flex;
    justify-content: space-between;
    span{
      font-size: 12px;
     color: #CCCCCC;
    }
  }
}
</style>

<template>
    <div class="container">
        <div class="content">
            <div class="header">
                <div class="header-title">
                    <p class="title">数据核对与反馈</p>
                    <p class="current-unit">当前单位:赫山区</p>
                </div>
                <Countdown :startTime=1576636321000 :endTime=1576940600000></Countdown>
                <div class="steps">
                    <article-steps :currentId="3" :stepsList="stepsList"></article-steps>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- 查询模块 -->
            <div class="inquire">
                <div class="submit-unit query-modal">
                    <span>提交单位</span>
                    <Select  size="large" clearable placeholder="按单位查询">
                        <Option v-for="item in queryUnit" :value="item.label" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="status query-modal">
                    <span>状态</span>
                    <Select  size="large" clearable placeholder="默认全部状态">
                        <Option v-for="item in queryStatus" :value="item.label" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="query-clear query-modal">
                    <div class="children">
                      <Button type="primary" class="custome-btn" >查询</Button>
                      <Button class="custome-btn custome-btn-default">清空</Button>
                    </div>
                </div>
            </div>
            <!-- 表格 -->
            <Row class="table">
                <Table stripe   :columns='listHeader' :data='queryListData' disabled-hover>
                  <template slot='applicationTime' slot-scope="{ row }">
                    {{row.createTime | dateFormat}}
                  </template>
                  <!-- slot-scope="{ row }" -->
                  <template slot='operation' >
                    <!-- 查看 -->
                    <Button shape="circle" icon="ios-brush" title="查看" @click="seeDetailsHandeler"></Button>
                    <!-- 审核 -->
                    <Button shape="circle" icon="ios-apps-outline" title="确认" ></Button>
                </template>
                </Table>
            </Row>
            <!-- 分页 -->
            <Row class='page'>
              <Page :total='10'  :page-size-opts="[10,20,30]" show-elevator show-sizer show-total/>
            </Row>
        </div>

    <!-- 查看详情模板 -->
    <Modal v-model='seeDetailsStatus' width='60%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>赫山区绩效考核</span>
      </p>
      <p class="secondary">
        <span>数据采集单位：市发展改革委 张三丰 13312345678</span>
      </p>
      <p class="thirdTitle ">
        <span>考核时间段：2019年1月1日~6月30日</span>
      </p>
      <div class='modal-content'>
        <Countdown :startTime=1576636321000 :endTime=1576940600000></Countdown>
        <div class="tabs">
          <Tabs value="name1">
          <TabPane label="考核内容" name="name1">
            <Row class="submit-assessment">
              <Button type="primary" >提交给被考核单位</Button>
            </Row>
            <Row>
              <Col class="quota-table">
                <DynamicTable :option="tableOptions" />
              </Col>
            </Row>
          </TabPane>
          <TabPane label="反馈与批示" name="name2">
            <!-- 反馈内容 -->
            <Row class="feedback-content">
              <Input  show-word-limit type="textarea" class="feedback-input" :maxlength="1000"/>
            </Row>
            <Row class="submit">
              <Button type="primary" >提交反馈</Button>
            </Row>
            <div class="separate-line">
            </div>
            <Row class="already-feedback">
                <Icon type="ios-checkmark" />已反馈内容
            </Row>
            <Row class="feedback-content-item">
                <p>一级指标名称大攻坚战。二级、三级指标防范化解重大风险，考核要点:防范民间非法集资，当年陈案化解率期望设置为35%。考核要点:防范民间非法集资，
                当年陈案化解率期望设置为35%。
                </p>
                <div class="feedback-person">
                  <span>绩效办  张三丰  13312345678 </span>
                  <span>2019-12-25     18:20</span>
                </div>
            </Row>
            <Row class="feedback-content-item">
                <p>一级指标名称大攻坚战。二级、三级指标防范化解重大风险，考核要点:防范民间非法集资，当年陈案化解率期望设置为35%。考核要点:防范民间非法集资，
                当年陈案化解率期望设置为35%。
                </p>
                <div class="feedback-person">
                  <span>绩效办  张三丰  13312345678 </span>
                  <span>2019-12-25     18:20</span>
                </div>
            </Row>
          </TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
    </div>
</template>

<script>
// import { queryList, deleteList, ruleQueryList, saveRule, reply } from '@/api/Innovation-excellence'
import { getDataCheckList } from '@/api/performance-appraisals'
import {
  getQuotaList
} from '@/api/quota'
import DynamicTable from '../../../quota/component/dynamic-table'
import Countdown from '../../component/count-time/count-time'
export default {
  components: {
    DynamicTable,
    Countdown
  },
  data () {
    return {
      // 步骤条所需要的数据
      stepsList: [
        {
          explain: '发起',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '数据采集',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '考核单位确认',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '汇总与修改',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '结果发布',
          icon: 'ivu-icon ivu-icon-ios-albums'
        }
      ],
      // select选择器需要的数据
      queryStatus: [
        {
          value: '1',
          label: '默认全部'
        },
        {
          value: '2',
          label: '待反馈'
        },
        {
          value: '3',
          label: '已反馈'
        }
      ],
      queryUnit: [
        {
          value: '1',
          label: '财政部'
        },
        {
          value: '2',
          label: '税务局'
        }
      ],
      //  表格的的表头
      listHeader: [
        {
          title: '序号',
          key: 'id',
          width: '100px'
        },
        {
          title: '提交单位',
          key: 'title',
          width: '200px'
        },
        {
          title: '提交时间',
          slot: 'applicationTime',
          key: 'createTime'
        },
        {
          title: '反馈与批示数',
          key: 'content'
        },
        {
          title: '状态',
          key: 'attachMentIds'
        },
        {
          title: '操作',
          slot: 'operation',
          key: 'amount3'
        }
      ],
      //  表格的数据
      queryListData: [
        {
          id: 1,
          title: '市发展改革委',
          applicationTime: 123456789,
          content: 38,
          attachMentIds: '待反馈'
        },
        {
          id: 2,
          title: '市发展改革委',
          applicationTime: 123456789,
          content: 38,
          attachMentIds: '待反馈'
        }
      ],
      //  控制查看详情模板的显示隐藏
      seeDetailsStatus: false,
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          level1: '一级指标',
          level2: '二级指标',
          level3: '三级指标',
          score: '分值',
          number: '要点编号',
          checkPoint: '考核要点',
          // area: '地区',
          task: '目标任务',
          pointType: '积分方式',
          unit: '数据采集'
        },
        // 是否会操作行
        editRow: {
          status: true,
          cols: ['score', 'number']
        },
        // 是否需要操作功能
        colOperation: {
          // 启用状态
          status: true,
          // 自定义功能逻辑，同iview的render逻辑
          render: this.operation()
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['task']
        },
        checkbox: {
          status: false,
          colIndex: 3
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 5, 9]
        },
        editIndex: -1,
        // 数据
        data: []
      },
      // 需要合并的列的索引
      colSpan: [0, 1, 2, 5, 9],
      // 数据
      data: []
    }
  },
  created () {
    this.getDataList()
  },

  computed: {},
  methods: {
    modalChange () {
    },
    //  控制查看详情模板
    seeDetailsHandeler () {
      this.queryList()
      this.seeDetailsStatus = true
    },
    operation () {
      return (h, params) => {
        const prop = {
          size: '24',
          color: '#0972E7'
        }
        // 编辑
        let detailIcon = h('Icon', {
          props: {
            type: 'ios-paper-outline',
            ...prop
          },
          on: {
            click: () => {
              this.detailData(params)
            }
          }
        })
        let detailTooltip = h('Tooltip', {
          props: {
            content: '查看详情',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [detailTooltip])
      }
    },
    queryList () {
      getQuotaList().then(res => {
        if (res.data.status === 200) {
          this.$store.state.quota.list = res.data.data
          this.$store.commit('setQuota', res.data.data)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    },
    //  表格的数据
    getDataList () {
      getDataCheckList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
