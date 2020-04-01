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
  background-position: center 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.feedback {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-left: 5px;
}
.feedback-content {
  border-bottom:1px solid rgba(243,243,243,1);
  margin: 10px 30px 5px;
  .info {
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    line-height:30px;
    color:rgba(51,51,51,1);
  }
  .desc {
    display: flex;
    justify-content: space-between;
    >span {
      font-size:20px;
      font-family:PingFang SC;
      line-height:54px;
      color:rgba(204,204,204,1);
    }
  }
}
/deep/textarea.ivu-input {
  min-height: 200px;
}
.remark {
  margin-top: 20px;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:26px;
  color:rgba(51,51,51,1);
  >p:first-child {
    color: #0972E7;
  }
}
.quota-info {
  background:rgba(202,228,255,1);
  padding: 20px;
  border-radius: 10px;
}
</style>
<template>
  <div style="height: 100%; overflow-y: auto">
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col>
        <article-steps :currentId="currentId" :stepsList="stepsList"></article-steps>
      </Col>
    </Row>
    <Tabs @on-click="quotaTabClick" value="quota_content" name="OrgTabs-2a">
      <TabPane label="指标内容" name="quota_content" icon="ios-trending-up" tab="OrgTabs-2a">
        <Row style="padding: 20px 15px">
          <Col class="quota-table" span="2" v-if="isControlOrgConfirm">
            <Button type="primary" @click="assessmentmakesure">提交反馈结果</Button>
          </Col>
          <Col span="20" style="text-align: right">
            总分：{{ totalScore }}
          </Col>
          <Col class="quota-table" span="24" style="margin-top: 20px">
            <DynamicTable
              :editIndex.sync="tableOptions.editIndex"
              :option="tableOptions"
              >
            </DynamicTable>
          </Col>
          <Col span="24" class="remark">
            <p>备注</p>
            <p>1.对工作中出现重大失误、造成严重不良影响的;提请市绩效评估委员会研究,加大扣分力度。</p>
            <p>2.出现被考评单位未明确考核工作目标值时，该单位此项工作考核得分按该指标的全市平均分计分。</p>
            <p>3.标记“  ”为省定指标:标记“  "为市委经济工作会议、市政府工作报告内容。</p>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="反馈与批示" name="feedback" icon="ios-trending-up" tab="OrgTabs-2a" v-if="isControlFeedback">
        <Row style="padding: 20px 15px">
          <Col>
            <Input type="textarea" class="textarea" v-model="content" placeholder="请输入反馈内容" />
          </Col>
          <Col style="margin: 20px auto">
            <Button type="primary" @click="indexinstruction">提交反馈</Button>
          </Col>
          <Col>
            <Icon type="ios-book" size="24"/>
            <span class="feedback">已反馈内容</span>
          </Col>
          <Col class="feedback-content" v-for="(item, index) in feedbackList" :key="'反馈与批示' + index">
            <div class="info">{{ item.content }}</div>
            <div class="desc">
              <span class="form">{{ item.instruOrgName }}</span>
              <span class="time">{{ item.createTime | dateFormat }}</span>
            </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Header from '../../components/header'
import DynamicTable from '../../../component/dynamic-table'
import {
  assessmentmakesure,
  indexinstruction
} from '@/api/quota'
export default {
  components: {
    Header,
    DynamicTable
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data () {
    return {
      content: '',
      // 步骤条参数
      stepsList: [
        {
          explain: '初稿',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '填写指标内容',
          icon: 'ivu-icon ivu-icon-ios-desktop'
        },
        {
          explain: '分值维护',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '被考核单位确认',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '确认并发布',
          icon: 'ivu-icon ivu-icon-ios-grid'
        }
      ],
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          // perCode: '要点编号',
          perDesc: '考核要点',
          assessmentOrgName: '被考核单位',
          // area: '地区',
          targetValue: '目标任务',
          dataCollectionOrgName: '数据采集'
        },
        // // 是否会操作行
        // editRow: {
        //   status: true,
        //   cols: ['score', 'perCode']
        // },
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['targetValue']
        },
        // checkbox: {
        //   status: false,
        //   colIndex: 3
        // },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 3, 4, 7]
        },
        editIndex: -1,
        // 数据
        data: []
      },
      titles: {
        title: ''
      }
    }
  },
  computed: {
    indexTableVoList () {
      return this.data.indexTableVoList
    },
    // 当前流程节点
    currentId () {
      return this.data.status
    },
    title () {
      return this.data.title
    },
    // 反馈列表
    feedbackList () {
      return this.data.indexBatchInstructionListVOList
    },
    totalScore () {
      return this.data.totalScore
    },
    sheetType () {
      return this.$route.query.type
    },
    // 考核单位确认
    isControlOrgConfirm () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104104101)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106106101)) {
        _control = true
      }

      return _control
    },
    // 反馈批示控制
    isControlFeedback () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104106)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106105)) {
        _control = true
      }

      return _control
    }
  },
  created () {
    this.queryList()
    this.titles.title = this.title
    console.log('提交反馈结果：', this.data)
  },
  methods: {
    // 提交反馈结果
    assessmentmakesure () {
      this.$Modal.confirm({
        title: '提交反馈结果',
        content: `确定提交反馈结果吗？`,
        onOk: () => {
          let id = this.data.id
          assessmentmakesure(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.$emit('refresh-quota-type')
            }
          })
        }
      })
    },
    // 反馈与批示
    indexinstruction () {
      if (!this.content || this.content.length === 0) {
        this.$Message.warning('请输入反馈内容')
        return
      }
      let params = {
        content: this.content,
        // replyType: 回复类型，1，回复主题，2，回复评论
        replyType: 1,
        themeId: this.data.id
      }
      indexinstruction(params).then(res => {
        if (res.data.code === 10000) {
          this.content = ''
          this.$Message.success(res.data.msg)
          this.$emit('refresh-quota-type')
        }
      })
    },
    quotaTabClick (name) {
      console.log(name)
    },
    queryList () {
      this.$store.state.quota.list = this.indexTableVoList || []
      this.$store.commit('setQuota', this.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
