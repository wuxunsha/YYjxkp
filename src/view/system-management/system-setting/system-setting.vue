<style lang="less" scoped>
@tab-height: 50px;
/deep/.ivu-tabs-bar {
  background-color: #fff;
  height: @tab-height;
  border-bottom: none;
  margin-bottom: 0;
  /deep/.ivu-tabs-nav .ivu-tabs-tab {
    font-family:PingFang SC;
    height: @tab-height;
    line-height: 36px;
    color: #0972E7;
    font-weight: 500;
    font-size: 16px;
    min-width: 150px;
    text-align: center;
  }
  /deep/.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #FF9B29;
  }
  /deep/.ivu-tabs-ink-bar {
    background-color: #FF9B29;
  }
}
/deep/.ivu-tabs-content {
  height: calc(~'100% - 56px');
  background-color: #fff;
}
/deep/.ivu-tabs-tabpane {
  height: 100%;
  background-color: #fff;
}
</style>
<template>
  <div>
    <Tabs @on-click="tabClick" name="OrgTabs">
      <template
        v-for="item in tabList"
      >
      <TabPane
        icon="ios-trending-up"
        v-if="btnShow(item.code)"
        :label="item.name"
        :name="item.type.toString()"
        :key="'flow-' + item.type"
        >
        <component
          :is="currentComponent"
          :type="item.type"
          ></component>
      </TabPane>
    </template>
    </Tabs>
  </div>
</template>

<script>
import MakeQuota from './flow-child/make-quota'
import AssessmentManagement from './flow-child/assessment-management'
import InnovationAndExcellence from './flow-child/innovation-and-excellence'
import PerformanceImprovement from './flow-child/performance-improvement'
import SocialEvaluation from './flow-child/social-evaluation'
export default {
  components: {
    MakeQuota,
    AssessmentManagement,
    InnovationAndExcellence,
    PerformanceImprovement,
    SocialEvaluation
  },
  data () {
    return {
      tabList: [
        {
          name: '指标制定',
          type: 1,
          status: true,
          code: 110101101
        },
        {
          name: '考核管理',
          type: 2,
          status: true,
          code: 110101102
        },
        {
          name: '创新创优',
          type: 3,
          status: false,
          code: 9999999999
        },
        {
          name: '绩效改进',
          type: 4,
          status: true,
          code: 110101103
        },
        {
          name: '社会评价',
          type: 5,
          status: true,
          code: 110101104
        }
      ],
      currentTab: '',
      currentComponent: ''
    }
  },
  created () {
    this.tabClick('1')
  },
  methods: {
    tabClick (name) {
      switch (name) {
        case '1':
          this.currentComponent = MakeQuota
          break
        case '2':
          this.currentComponent = AssessmentManagement
          break
        case '3':
          this.currentComponent = InnovationAndExcellence
          break
        case '4':
          this.currentComponent = PerformanceImprovement
          break
        case '5':
          this.currentComponent = SocialEvaluation
          break
        default:
          break
      }
    }
  }
}
</script>
