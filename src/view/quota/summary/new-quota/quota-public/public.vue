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
.quota-info {
  background:rgba(202,228,255,1);
  padding: 20px;
  border-radius: 10px;
}
</style>
<template>
  <div style="height: 100%; overflow-y: auto">
    <Row style="background: #fff; padding: 0 15px" type="flex" justify="center">
      <Col span="24">
        <Header :titles="titles" />
      </Col>
      <Col span="15">
        <article-steps :currentId="currentId" :stepsList="stepsList"></article-steps>
      </Col>
      <Col span="24">
        <Tabs value="quota_content" name="OrgTabs-2a">
          <TabPane label="指标内容" name="quota_content" icon="ios-trending-up" tab="OrgTabs-2a">
            <Row style="padding: 20px 0">
              <Col class="quota-table" span="2" v-if="isControlPublicQuota">
                <Button type="primary" @click="indexrelease">发布指标</Button>
              </Col>
              <Col class="quota-table" span="2">
                <Button type="primary">下载指标</Button>
              </Col>
              <Col class="quota-table" span="24" style="margin-top: 20px">
                <DynamicTable
                  :editIndex.sync="tableOptions.editIndex"
                  :option="tableOptions"
                  >
                </DynamicTable>
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
      </Col>
    </Row>
    <!-- 修改要点，分值，目标内容 -->
    <Modal
      v-model="addModalShow"
       @on-visible-change="visibleChange"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">维护要点内容</div>
      <div class="quota-info">
        <p v-if="rowInfo.indexOneName">一级指标：{{ rowInfo.indexOneName }}</p>
        <p v-if="rowInfo.indexTwoName">二级指标：{{ rowInfo.indexTwoName }}</p>
        <p v-if="rowInfo.indexThreeName">三级指标：{{ rowInfo.indexThreeName }}</p>
        <p v-if="rowInfo.indexFourName">四级指标：{{ rowInfo.indexFourName }}</p>
        <p v-if="rowInfo.indexFiveName">五级指标：{{ rowInfo.indexFiveName }}</p>
      </div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="100" style="margin-top: 20px">
        <Col>
          <FormItem prop="perDesc" label="要点">
            <Input placeholder="请输入要点" v-model="addFromLine.perDesc" type="text" :disabled="!isControlUpdateRuleName"/>
          </FormItem>
          <FormItem prop="score" label="分值">
            <Input placeholder="请输入分值" v-model="addFromLine.score" type="text" number/>
          </FormItem>
          <FormItem prop="targetValue" label="目标任务">
            <Input placeholder="请输入目标任务" v-model="addFromLine.targetValue" type="text" />
          </FormItem>
        </Col>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="saveData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from '../../components/header'
import DynamicTable from '../../../component/dynamic-table'
import {
  indexinstruction,
  indexrelease,
  updateindexbyruleid
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
    const validateScore = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入分值'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('必须是数值'))
      } else {
        callback()
      }
    }
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
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
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
          cols: ['targetValue']
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 3, 4, 7, 9]
        },
        // 数据
        data: []
      },
      titles: {
        title: ''
      },
      rowInfo: '',
      addModalShow: false,
      addFromLine: {
        id: '',
        perDesc: '',
        score: '',
        targetValue: ''
      },
      addFromRule: {
        perDesc: [
          { required: true, type: 'string', message: '请输入要点', trigger: 'blur' }
        ],
        targetValue: [
          { required: true, type: 'string', message: '请输入目标任务', trigger: 'blur' }
        ],
        score: [
          { validator: validateScore, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.queryList()
    this.titles.title = this.title
    console.log('指标发布：', this.data)
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
    sheetType () {
      return this.$route.query.type
    },
    // 指标发布
    isControlPublicQuota () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104105103)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106104103)) {
        _control = true
      }

      return _control
    },
    // 修改要点名称
    isControlUpdateRuleName () {
      let _control = false
      // 内部
      if (this.sheetType === 'peers' && this.btnShow(111102104105101)) {
        _control = true
      }
      // 上级
      if (this.sheetType === 'up' && this.btnShow(111102106104101)) {
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
  methods: {
    // 指标发布
    indexrelease () {
      this.$Modal.confirm({
        title: '指标发布',
        content: `确定发布指标吗？`,
        onOk: () => {
          let id = this.data.id
          indexrelease(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.$emit('refresh-quota-type')
            }
          })
        }
      })
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
              this.detailData(params.row)
            }
          }
        })
        let detailTooltip = h('Tooltip', {
          props: {
            content: '修改',
            theme: 'light',
            placement: 'top'
          }
        }, [detailIcon])
        return h('div', [detailTooltip])
      }
    },
    detailData (row) {
      console.log(row)
      this.addModalShow = true
      this.rowInfo = row
      this.addFromLine.id = this.rowInfo.id
      this.addFromLine.perDesc = this.rowInfo.perDesc
      this.addFromLine.score = this.rowInfo.score
      this.addFromLine.targetValue = this.rowInfo.targetValue
    },
    saveData () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.updateindexbyruleid()
        } else {
          this.$Message.warning('请按提示输入内容')
        }
      })
    },
    // （发布之前都可）修改要点，分值，目标内容
    updateindexbyruleid () {
      let params = {
        ...this.addFromLine
      }
      updateindexbyruleid(params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
          this.addModalShow = false
          this.$emit('refresh-quota-type')
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    resetForm () {
      this.$refs.addForm.resetFields()
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
    queryList () {
      this.$store.state.quota.list = this.indexTableVoList || []
      this.$store.commit('setQuota', this.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  },
  watch: {
    data (newVal) {
      console.log('============', newVal.indexTableVoList)
      this.$store.state.quota.list = newVal.indexTableVoList || []
      this.$store.commit('setQuota', newVal.indexTableVoList || [])
      this.$store.commit('createColumn', this.tableOptions)
    }
  }
}
</script>
