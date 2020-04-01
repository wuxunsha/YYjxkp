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
.exception-flow {
  height: 100%;
  background-color: #fff;
  background-image: url('~@/assets/images/quota/new_quota_bg.png');
  background-position: center 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 30px 20px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  span {
    font-size:40px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:70px;
    color:rgba(9,114,231,1);
    margin-bottom: 100px;
  }
}
</style>
<template>
  <Tabs @on-click="tabClick" name="OrgTabs" :value="currentTab" style="height: 100%">
    <template
      v-for="(item, index) in tabs"
      >
      <TabPane
        icon="ios-trending-up"
        tab="OrgTabs"
        :label="item.indexTypeName"
        :key="'机构' + index"
        >
        <div v-if="item.indexTypeStatue != 2 && item.indexTypeStatue != 3" style="height: 100%">
          <component
            v-if="currentTab === index"
            :is="currentComponent"
            :data="item"
            @refresh-quota-type="refreshPage(index)"
            ></component>
        </div>
        <div v-else class="exception-flow">
          <span>当前有正在进行的流程，不能创建</span>
        </div>
      </TabPane>
    </template>
  </Tabs>
</template>

<script>
import {
  // 根据登录用户获取本级机构能创建的指标类型
  getloginnewindexnodesinfopeer,
  // 根据登录用户获取上级机构的指标类型和状态
  getloginnewindexnodesinfoup
} from '@/api/system-setting'
import ModifyQuota from '../components/modify-quota'
import CreateGuide from '../components/create-guide'
// 维护指标内容
import CreateQuotaContent from '../create-quota-content/create-quota-content'
import ScoreInput from '../score-input/score-input'
import ConfirmQuota from '../confirm-quota/confirm-quota'
import QuotaPublic from '../quota-public/public'
export default {
  name: 'app',
  components: {
    ModifyQuota,
    CreateGuide
  },
  data () {
    return {
      currentTab: 0,
      currentComponent: '',
      quotaList: [],
      tabs: []
    }
  },
  computed: {
    sheetType () {
      return this.$route.query.type
    },
    isSuperior () {
      return this.sheetType === 'peers' ? 1 : 0
    }
  },
  created () {
    if (this.sheetType === 'peers') {
      this.getloginnewindexnodesinfopeer(0)
    } else {
      this.getloginnewindexnodesinfoup(0)
    }
  },
  methods: {
    // 初稿提交成功后刷新页面
    refreshPage (index) {
      setTimeout(() => {
        location.reload()
      }, 600)
      // if (this.sheetType === 'peers') {
      //   this.getloginnewindexnodesinfopeer(index)
      // } else {
      //   this.getloginnewindexnodesinfoup(index)
      // }
    },
    // 获取本级tabs
    getloginnewindexnodesinfopeer (index) {
      getloginnewindexnodesinfopeer().then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          this.tabs.forEach(item => {
            item.isSuperior = this.isSuperior
            // 流程节点发生变化，需要重置页面的页签
            // if (item.indexTypeStatue === 2 || item.indexTypeStatue === 3) {
            //   this.tabs.splice(index, 1)
            //   index = 0
            // }
          })
          // 初始化页面
          this.tabClick(index)
        }
      })
    },
    // 获取上级tabs
    getloginnewindexnodesinfoup (index) {
      getloginnewindexnodesinfoup().then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          // 初始化页面
          this.tabs.forEach((item, index) => {
            item.isSuperior = this.isSuperior
            // 流程节点发生变化，需要重置页面的页签
            // if (item.indexTypeStatue === 2 || item.indexTypeStatue === 3) {
            //   this.tabs.splice(index, 1)
            //   index = 0
            // }
          })
          // 初始化页面。
          // 因为tabs会嵌套使用，所以必须使用name属性来确定其唯一性
          this.tabClick(index)
        }
      })
    },
    tabClick (index) {
      let tab = this.tabs[index]
      console.log('当前机构下的数据：', tab)
      /*
        * 流程状态：indexTypeStatue
        * 0, "正常
        * 1, "没有流程在运行(不能创建)"
        * 2, "有流程在运行但不是正确节点"
        * 3, "有流程在运行是正确节点但是登录用户不是参与者"
        * 4, "没有流程在运行(你可创建)"
      */
      /*
        * 指标状态：status
        * 1，"初稿"
        * 2，"维护指标内容中"
        * 3，"分值维护中"
        * 4，"被考核单位确认"
        * 5，"发布中"
        * 6，"已发布"
      */

      // 没有流程在运行时进入模板初稿创建导航页面
      if (tab.indexTypeStatue === 1 || tab.indexTypeStatue === 4) {
        this.currentComponent = CreateGuide
      } else if (tab.indexTypeStatue === 0) {
        // 流程正常时，根据指标状态确定页面
        switch (tab.status) {
          case 1:
            this.currentComponent = ModifyQuota
            break
          // 分值维护
          case 3:
            this.currentComponent = ScoreInput
            break
          case 4:
            this.currentComponent = ConfirmQuota
            break
          case 5:
            this.currentComponent = QuotaPublic
            break
          case 2:
          case 6:
            this.currentComponent = CreateQuotaContent
            break
          default:
            console.log('indexTypeStatue:', tab.indexTypeStatue, 'status:', tab.status)
            break
        }
      } else {
        // indexTypeStatue为2,3时页签不显示
      }
      // this.currentTab = typeof item === 'string' ? item : JSON.stringify(item)
      this.currentTab = index
    }
  }
}
</script>
