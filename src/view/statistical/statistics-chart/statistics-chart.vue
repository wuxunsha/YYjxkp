<style lang='less' scoped>
/deep/.ivu-card-shadow {
  box-shadow: none;
}
.layout {
  background: #fff;
  .from-content {
    padding: 24px 18px;
    background: #fff;
    .chart-title {
      font-size:20px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      margin-bottom: 30px;
      span {
        vertical-align: middle;
      }
      i {
        font-size: 20px;
        color:rgba(9,114,231,1);
        cursor: pointer;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
    .echarts {
      h4 {
        width: 100%;
        color: red;
        font-size:20px;
        font-weight:bold;
      }
    }
  }
}
// 图表管理弹窗
.modal {
  /deep/.ivu-modal-header {
    border-bottom: 0;
  }
  /deep/.ivu-modal-footer {
    padding-top: 0;
    border-top: 0;
    text-align: center;
  }
  .header-title {
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(51,51,51,1);
    line-height: 20px;
    text-align: center;
  }
  .modal-content {
    padding: 0 20px;
    p {
      font-size:17px;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .modal-Checkbox {
      padding: 8px 44px 10px;
      /deep/.ivu-checkbox-wrapper {
        width: 90%;
        margin-bottom: 8px;
      }
      /deep/.ivu-checkbox+span {
        font-size: 14px;
        font-weight: 500;
        color: rgba(102,102,102,1);
      }
      .tab-control {
        margin-bottom: 16px;
        .index-name {
          height: 30px;;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(102,102,102,1);
          .selcect-box {
            float: right;
            select {
              margin-top: 4px;
            }
          }
        }
        .index-explain {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(187,187,187,1);
          padding-left: 22px;
        }
      }
    }
    .modal-tabs {
      padding: 14px 40px 16px;
      span {
        padding: 8px 20px;
        margin-right: 18px;
        background: #CAE4FF;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(9,114,231,1);
        cursor: pointer;
      }
      .active {
        background: rgba(9,114,231,1);
        color: rgba(255,255,255,1);
      }
    }
    .modal-tabs-bar {
      padding: 10px 46px;
      .tab-control {
        margin-bottom: 16px;
        .index-name {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(102,102,102,1);
        }
        .index-explain {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(187,187,187,1);
          padding-left: 22px;
        }
      }
    }
  }
  .modal-footer {
    .submitBtn {
      width: 360px;
      height: 56px;
      background: #0972E7;
      border-radius: 6px;
      outline: none;
      font-size: 17px;
      font-weight: 500;
      line-height: 41px;
      color: rgba(255,255,255,1);
    }
  }
}
</style>

<template>
  <div class="layout">
    <Layout>
      <!-- 表格内容 -->
      <Content class='from-content'>
        <!-- 图标名称 -->
        <Row class="chart-title">
          <Col span="24">
            <span>益阳市关键指标图表</span>
            <i class="icon-font iconshezhi" @click="showChartGov" v-if="btnShow(123104103)"></i>
          </Col>
        </Row>
        <!-- 第一排表 -->
        <Row>
          <Row v-for="(tab, index) in ChartData" :key="index">
            <h4>{{tab.title}}</h4>
            <Row>
              <Col span="11" v-for="(item, idx) in tab.list" :key="idx" style="margin-right: 40px;">
                <chart-bar style="width: 100%;height: 300px;" :value="item.map" text="日常考核" :nameOfId="item.testId" v-if="item.tabType === 1"/>
                <chart-par style="width: 90%;height: 300px;" :value="item.map" text="年度考核" :nameOfId="item.testId" v-if="item.tabType === 2"/>
              </Col>
            </Row>
          </Row>
        </Row>
      </Content>
    </Layout>

    <!-- 图表管理弹窗 -->
    <Modal v-model="modal" width="50%" class="modal" @on-visible-change="modalChange">
      <p slot="header" class="header-title">
        <span>图表管理</span>
      </p>
      <div class="modal-content">
        <p>已选指标（最多20个关注指标）</p>
        <div class="modal-Checkbox">
          <Row class="tab-control" v-for="(item, index) in selectedData" :key="index">
            <Col span="14">
              <Row class="index-name">
                {{item.indexLableName}}
              </Row>
              <Row class="index-explain">
                <span>{{item.lableDesc}}</span>
              </Row>
            </Col>
            <Col span="4">
              <Select v-model="item.chartTypes" style="width:170px" placeholder="请选择图表展示方式">
                <Option v-for="item in cityList" :value="item.label" :key="item.label">{{ item.value }}</Option>
              </Select>
            </Col>
            <Col span="1" offset="5">
              <i class="ivu-icon ivu-icon-ios-close-circle-outline" @click="delIndex(index)"></i>
            </Col>
          </Row>
        </div>
        <p>可选指标列表</p>
        <div class="modal-tabs">
          <span :class="index === nowIndex ? 'active' : ''" v-for="(item, index) in statdataTab" :key="item.id" @click="tableBtn(item.orgType,index)">{{item.orgtypeName}}</span>
        </div>
        <div class="modal-tabs-bar">
          <CheckboxGroup v-model="social">
            <Row class="tab-control" v-for="(item, index) in socialList" :key="index">
              <Checkbox :label="item.indexLableId">
                <span class="index-name">{{item.indexLableName}}</span>
                <Row class="index-explain">
                  <span>{{item.lableDesc}}</span>
                </Row>
              </Checkbox>
            </Row>
          </CheckboxGroup>
        </div>
      </div>
      <div slot="footer" class="modal-footer">
          <Button class="submitBtn" @click="ascertain">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getViewData,
  getIndexChartList,
  getStatdataPageTab,
  getIndexChart,
  saveIndexChart
} from '@/api/statistical'
import ChartBar from './components/echarts/bar'
import ChartPar from './components/echarts/par'
export default {
  components: {
    ChartBar,
    ChartPar
  },
  data () {
    return {
      // 页签
      tab: null,
      // 高亮索引
      nowIndex: 0,
      // 展示图表数据
      ChartData: [],
      // 图标管理弹窗开关
      modal: false,
      // 已选指标数据
      selectedData: [],
      // 报表页签
      statdataTab: [],
      // 可选指标列表
      socialList: [],
      // 可选指标
      social: [],
      cityList: [
        {
          value: '柱状图',
          label: 1
        },
        {
          value: '线条图',
          label: 2
        }
      ]
    }
  },
  created () {
    // 查询个人关注图表展示数据
    this.getView()
  },
  methods: {
    // 查询个人关注图表展示数据
    getView () {
      getViewData().then(res => {
        if (res.data.code === 10000) {
          this.ChartData = res.data.data
        }
      })
    },
    // 打开图表管理弹窗
    showChartGov () {
      this.modal = true
      this.getChartList()
      this.getStatdataTab()
    },
    // 查询个人关注指标图表列表
    getChartList () {
      getIndexChartList().then(res => {
        if (res.data.code === 10000) {
          this.selectedData = res.data.data
        }
      })
    },
    // 获取统计报表页签
    getStatdataTab () {
      getStatdataPageTab().then(res => {
        if (res.data.code === 10000) {
          this.statdataTab = res.data.data
          this.tab = res.data.data[0].orgType
          this.getIndexChartData()
        }
      })
    },
    // 根据机构类型获取可选指标列表
    getIndexChartData () {
      getIndexChart(this.tab).then(res => {
        if (res.data.code === 10000) {
          this.socialList = res.data.data
        }
      })
    },
    // 切换页签
    tableBtn (orgType, i) {
      this.nowIndex = i
      this.tab = orgType
      this.social = []
      this.getIndexChartData()
    },
    // 删除已选指标
    delIndex (i) {
      this.selectedData.splice(i, 1)
    },
    // 保存指标
    ascertain () {
      const data = {
        optIndexChartList: this.selectedData,
        statisIndexChartList: this.social
      }
      saveIndexChart(data).then(res => {
        if (res.data.code === 10000) {
          this.modal = false
          this.getView()
          this.$Message.success('设置成功')
        }
      })
    },
    // 图标管理弹窗状态改变
    modalChange (e) {
      if (e === false) {
        this.selectedData = []
        this.statdataTab = []
        this.social = []
      }
    }
  }
}
</script>
