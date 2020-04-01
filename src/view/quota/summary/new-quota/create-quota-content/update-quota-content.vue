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
</style>
<template>
  <div>
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col>
        <article-steps :currentId="2" :stepsList="stepsList"></article-steps>
      </Col>
    </Row>
    <Tabs @on-click="quotaTabClick" value="quota_content">
      <TabPane label="指标内容" name="quota_content" icon="ios-trending-up">
        <Row style="padding: 20px 15px">
          <Col class="quota-table" span="2">
            <Button type="primary">提交到绩效办汇总</Button>
          </Col>
          <Col class="quota-table" span="24" style="margin-top: 20px">
            <DynamicTable
              :editIndex.sync="tableOptions.editIndex"
              :option="tableOptions"
              @on-selection-change="onSelectionChage"
              >
            </DynamicTable>
          </Col>
          <Col span="24" class="remark">
            <p>备注</p>
            <p>1.对工作中出现重大失误、造成严重不良影响的;提请市绩效评估委员会研究,加大扣分力度。</p>
            <p>2.出现被考评单位未明确考核工作目标值时，该单位此项工作考核得分按该指标的全市平均分计分。</p>
            <p>3.标记“  ”为省定指标:标记“  "为市委经济工作会议、市政府工作报告内容。|</p>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="反馈与批示" name="feedback" icon="ios-trending-up">
        <Row style="padding: 20px 15px">
          <Col>
            <Input type="textarea" class="textarea" v-model="inputFeedback" placeholder="请输入反馈内容" />
          </Col>
          <Col style="margin: 20px auto">
            <Button type="primary">提交反馈</Button>
          </Col>
          <Col>
            <Icon type="ios-book" size="24"/>
            <span class="feedback">已反馈内容</span>
          </Col>
          <Col class="feedback-content">
            <div class="info">
              一级指标名称大攻坚战。二级、三级指标防范化解重大风险，考核要点:防范民间非法集资，当年陈案化解率期望设置为35%。考核要点:防范民间非法集资，
              当年陈案化解率期望设置为35%。
            </div>
            <div class="desc">
              <span class="form">赫山区</span>
              <span class="time">2019-12-17 21:20</span>
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
  getQuotaList
} from '@/api/quota'
export default {
  components: {
    Header,
    DynamicTable
  },
  data () {
    return {
      inputFeedback: '',
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
          explain: '采集与录入',
          icon: 'ivu-icon ivu-icon-ios-grid'
        }
      ],
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          level1: '一级指标',
          level2: '二级指标',
          level3: '三级指标',
          score: '分值',
          // number: '要点编号',
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
      titles: {
        title: '2020年区县（市）绩效考核指标待发布'
      }
    }
  },
  created () {
    this.queryList()
  },
  mounted () {
  },
  methods: {
    onSelectionChage (selection) {
      console.log(selection)
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
        // 保存
        let saveIcon = h('Icon', {
          props: {
            type: 'md-checkmark',
            ...prop
          },
          on: {
            click: () => {
              this.saveData(params)
            }
          }
        })
        let saveTooltip = h('Tooltip', {
          props: {
            content: '保存',
            theme: 'light',
            placement: 'top'
          }
        }, [saveIcon])
        // 取消
        let cancelIcon = h('Icon', {
          props: {
            type: 'md-close',
            ...prop
          },
          on: {
            click: (index) => {
              this.cancelData(index)
            }
          }
        })
        let cancelTooltip = h('Tooltip', {
          props: {
            content: '取消',
            theme: 'light',
            placement: 'top'
          }
        }, [cancelIcon])
        let _components = []
        if (this.tableOptions.editIndex !== -1 && params.index === this.tableOptions.editIndex) {
          _components = [saveTooltip, cancelTooltip]
        } else {
          _components = [detailTooltip]
        }
        return h('div', _components)
      }
    },
    quotaTabClick (name) {
      console.log(name)
    },
    queryList () {
      getQuotaList().then(res => {
        if (res.data.status === 200) {
          this.$store.state.quota.list = res.data.data
          this.$store.commit('setQuota', res.data.data)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
