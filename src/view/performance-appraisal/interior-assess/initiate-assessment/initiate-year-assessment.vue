<style lang='less' scoped>
/deep/.ivu-form-item {
    margin-bottom: 10px;
}
/deep/.ivu-date-picker {
    width: 100%;
}
.from-content {
  .content {
    background: #fff;
    margin-top: .625rem;
    padding: 1.25rem 2.125rem;
    width: 100%;
    .title-name {
      font-size:20px;
      font-weight:bold;
      text-align: center;
      color:rgba(51,51,51,1);
    }
    // 时间节点设置
    .time-node-set {
        span,
        i {
            font-size: 16px;
            font-weight: 500;
            line-height: 40px;
            color: rgba(51,51,51,1);
        }
    }
    .time-set {
        span {
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            color: rgba(51,51,51,1);
        }
        .deduct-marks {
            width: 100%;
        }
    }
    // 考核项目
    .assess-project {
        span,
        i {
            font-size: 16px;
            font-weight: 500;
            line-height: 40px;
            color: #0972E7;
        }
        .assess-project-icon {
            text-align: center;
        }
    }
    // 发起考核按钮
    .initiate-assess {
        margin-top: 30px;
        text-align: center;
        .initiate-assess-btn {
            width: 25%;
            height: 56px;
            font-size: 18px;
            font-weight: 500;
            color: rgba(255,255,255,1);
        }
    }
  }
}
</style>

<template>
    <div>
        <Layout>
            <Content class='from-content'>
                <!-- 表名 -->
                <Row class="content">
                    <Row>
                        <Col span="24" class="title-name">
                            <h4>发起年度考核</h4>
                        </Col>
                    </Row>
                    <Form :model="assessData">
                        <!-- 时间节点设置 -->
                        <FormItem class="time-node-set">
                            <Row>
                                <Col>
                                  <i class="icon-font iconshijian"></i>
                                  <span>时间节点设置</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="time-set">
                            <Row>
                                <Col span="8">
                                    <Row>
                                        <Col span="9">
                                            <span>数&nbsp;&nbsp;&nbsp;据&nbsp;&nbsp;&nbsp;&nbsp;采&nbsp;&nbsp;&nbsp;&nbsp;集</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据采集截止时间" @on-change="gatherEndTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="8">
                                    <Row>
                                        <Col span="9" style="text-align: center;">
                                            <span>超时通知时间</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据采集截止时间" @on-change="gatherTimeoutTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="2" style="text-align:center;">
                                    <span>是否扣分</span>
                                </Col>
                                <Col span="3" style="text-align:center;">
                                    <RadioGroup v-model="assessData.dataCDeductPoint" @on-change="dataCDeductPointChange">
                                        <Radio :label="no">
                                            <span>否</span>
                                        </Radio>
                                        <Radio :label="yes">
                                            <span>是</span>
                                        </Radio>
                                    </RadioGroup>
                                </Col>
                                 <Col span="3">
                                    <Row>
                                        <Col span="14">
                                            <InputNumber v-model="assessData.dataCPoints" class="deduct-marks" :disabled="assessData.dataCDeductPoint === 0 ? true : false"></InputNumber>
                                        </Col>
                                        <Col span="6">
                                            <span>分</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="time-set">
                            <Row>
                                <Col span="8">
                                    <Row>
                                        <Col span="9">
                                            <span>数据核对与复核</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="reCheckTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="8">
                                    <Row>
                                        <Col span="9" style="text-align: center;">
                                            <span>超时通知时间</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="reCheckTimeoutTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="2" style="text-align:center;">
                                    <span>是否扣分</span>
                                </Col>
                                <Col span="3" style="text-align:center;">
                                    <RadioGroup v-model="assessData.dataApproveDeductPoint" @on-change="dataApproveDeductPointChange">
                                        <Radio :label="no">
                                            <span>否</span>
                                        </Radio>
                                        <Radio :label="yes">
                                            <span>是</span>
                                        </Radio>
                                    </RadioGroup>
                                </Col>
                                 <Col span="3">
                                    <Row>
                                        <Col span="14">
                                            <InputNumber v-model="assessData.dataApprovePoints" class="deduct-marks" :disabled="assessData.dataApproveDeductPoint === 0 ? true : false"></InputNumber>
                                        </Col>
                                        <Col span="6">
                                            <span>分</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="time-set">
                            <Row>
                                <Col span="8">
                                    <Row>
                                        <Col span="9">
                                            <span>数据修改与提交</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="editTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="8">
                                    <Row>
                                        <Col span="9" style="text-align: center;">
                                            <span>超时通知时间</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="editTimeoutTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="2" style="text-align:center;">
                                    <span>是否扣分</span>
                                </Col>
                                <Col span="3" style="text-align:center;">
                                    <RadioGroup v-model="assessData.dataCommitDeductPoint" @on-change="dataCommitDeductPointChange">
                                        <Radio :label="no">
                                            <span>否</span>
                                        </Radio>
                                        <Radio :label="yes">
                                            <span>是</span>
                                        </Radio>
                                    </RadioGroup>
                                </Col>
                                 <Col span="3">
                                    <Row>
                                        <Col span="14">
                                            <InputNumber v-model="assessData.dataCommitPoints" class="deduct-marks" :disabled="assessData.dataCommitDeductPoint === 0 ? true : false"></InputNumber>
                                        </Col>
                                        <Col span="6">
                                            <span>分</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="time-set">
                            <Row>
                                <Col span="8">
                                    <Row>
                                        <Col span="9">
                                            <span>分值确认与发布</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="issueTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="8">
                                    <Row>
                                        <Col span="9" style="text-align: center;">
                                            <span>超时通知时间</span>
                                        </Col>
                                        <Col span="15">
                                            <DatePicker  type="datetime" format="yyyy-MM-dd HH" transfer placeholder="请选择数据截止时间" @on-change="issueTimeoutTimeChange"></DatePicker>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="2" style="text-align:center;">
                                    <span>是否扣分</span>
                                </Col>
                                <Col span="3" style="text-align:center;">
                                    <RadioGroup v-model="assessData.dataPublishDeductPoint" @on-change="dataPublishDeductPointChange">
                                        <Radio :label="no">
                                            <span>否</span>
                                        </Radio>
                                        <Radio :label="yes">
                                            <span>是</span>
                                        </Radio>
                                    </RadioGroup>
                                </Col>
                                 <Col span="3">
                                    <Row>
                                        <Col span="14">
                                            <InputNumber v-model="assessData.dataPublishPoints" class="deduct-marks" :disabled="assessData.dataPublishDeductPoint === 0 ? true : false"></InputNumber>
                                        </Col>
                                        <Col span="6">
                                            <span>分</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </FormItem>
                        <!-- 考核项目 -->
                        <FormItem class="assess-project">
                            <Row>
                                <Col span="1" class="assess-project-icon">
                                    <i class="icon-font icondudaokaohe"></i>
                                </Col>
                                <Col span="23">
                                    <span>考核项目</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="assess-project">
                            <Row>
                                <Col span="24">
                                    <dynamicTable :option="tableOptions"/>
                                </Col>
                            </Row>
                        </FormItem>
                        <!-- 发起考核按钮 -->
                        <FormItem class="initiate-assess">
                            <Row style="text-align:center;">
                                <Col span="24">
                                    <Button type="primary" class="initiate-assess-btn" @click="initiateAssess">发起考核</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Row>
            </Content>
        </Layout>
    </div>
</template>

<script>
import {
  getindexinfobysheetid,
  getporgorpersonalbysheetid,
  createperfomancebatch
} from '@/api/performance-appraisal'
import dynamicTable from '../../../quota/component/dynamic-table'
import { getTimeStamp } from '@/libs/tools'
export default {
  components: {
    dynamicTable
  },
  data () {
    return {
      // 表格数据
      tabList: [],
      no: 0,
      yes: 1,
      // 当前时间戳
      presentTime: '',
      // 发起考核数据
      assessData: {
        // 考核类型
        types: 1,
        // 顶级指标id
        sheetId: null,
        // 考核项目id
        perOrgIds: [],
        // 年度第一天
        perStartTime: '',
        // 年度最后一天
        perEndTime: '',
        // 数据采集截止时间
        dataCEndTime: '',
        // 数据采集超时通知时间
        dataCTimeout: '',
        // 数据采集是否扣分选项
        dataCDeductPoint: 0,
        // 数据采集扣分数
        dataCPoints: 0,
        // 数据复核截止时间
        dataApproveEndTime: '',
        // 数据复核超时通知时间
        dataApproveTimeout: '',
        // 数据复核是否扣分选项
        dataApproveDeductPoint: 0,
        // 数据采集扣分数
        dataApprovePoints: 0,
        // 数据修改截止时间
        dataCommitEndTime: '',
        // 数据修改超时通知时间
        dataCommitTimeout: '',
        // 数据修改是否扣分选项
        dataCommitDeductPoint: 0,
        // 数据修改扣分数
        dataCommitPoints: 0,
        // 数据发布截止时间
        dtatPublishEndTime: '',
        // 数据发布超时通知时间
        dataPublishTimeout: '',
        // 数据发布是否扣分选项
        dataPublishDeductPoint: 0,
        // 数据发布扣分数
        dataPublishPoints: 0,
        // 考核项目
        perCodeList: '',
        // 考核年份
        years: ''
      },
      // 表格配置
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          perDesc: '考核要点',
          assessmentOrgName: '被考核单位',
          targetValue: '目标任务',
          // targetType: '计分方式',
          dataCollectionOrgName: '数据采集单位'
        },
        // 判断指标是否有内容显示
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 自定义插槽内容
        // colSlot: [
        //   {
        //     key: 'targetType',
        //     render: (h, params) => {
        //       // let _status = params.row.targetType
        //       let _lalbel = ''
        //       // switch (_status) {
        //       //   case 1:
        //       //     _lalbel = '量化'
        //       //     break
        //       //   case 2:
        //       //     _lalbel = '非量化'
        //       //     break
        //       //   default:
        //       //     _lalbel = '-'
        //       //     break
        //       // }
        //       return h('span', _lalbel)
        //     }
        //   }
        // ],
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['targetValue', 'perDesc']
        },
        checkbox: {
          status: false,
          colIndex: 5
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          // colIndex: [0, 1, 2, 3, 4, 5],
          noMergeCellName: ['score', 'perDesc', 'targetValue']
        },
        editIndex: -1,
        // 数据
        data: []
      }
    }
  },
  created () {
    // 根据指标主表id获取对应的指标详情
    this.getindexinfobysheetidList()
    // 根据sheetId获取考核单位
    this.getporgorpersonalbysheetidList()
    // 获取发起考核年份
    this.isYear()
  },
  computed: {
  },
  methods: {
    // 根据指标主表id获取对应的指标详情
    getindexinfobysheetidList () {
      getindexinfobysheetid(this.$route.query.sheetId).then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data.batchTableVoList
          this.$store.state.quota.list = res.data.data.batchTableVoList
          this.$store.commit('setQuota', res.data.data.batchTableVoList)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    },
    // 获取当前发起考核年份
    isYear () {
      const dt = new Date()
      const y = dt.getFullYear()
      // 年度第一天
      const yeatFirstDay = y + '-01-01'
      // 年度最后一天
      const yeatLastDay = y + '-12-30'
      const firstTimeStamp = getTimeStamp(yeatFirstDay)
      const lastTimeStamp = getTimeStamp(yeatLastDay)
      this.assessData.perStartTime = firstTimeStamp
      this.assessData.perEndTime = lastTimeStamp
      const year = y
      this.assessData.years = year
      this.presentTime = dt
    },
    // 根据sheetId获取考核单位
    getporgorpersonalbysheetidList () {
      getporgorpersonalbysheetid(this.$route.query.sheetId).then(res => {
        if (res.data.code === 10000) {
          let perCodeArr = []
          let orgList = res.data.data
          orgList.map(item => {
            perCodeArr.push(item.value)
          })
          this.assessData.perOrgIds = perCodeArr.toString()
        }
      })
    },
    // 数据采集扣分选项改变
    dataCDeductPointChange (e) {
      if (e === 0) {
        this.assessData.dataCPoints = 0
      }
    },
    // 数据核对与复核扣分选项改变
    dataApproveDeductPointChange (e) {
      if (e === 0) {
        this.assessData.dataApprovePoints = 0
      }
    },
    // 数据修改与提交扣分选项改变
    dataCommitDeductPointChange (e) {
      if (e === 0) {
        this.assessData.dataCommitPoints = 0
      }
    },
    // 分值确认与发布扣分选项改变
    dataPublishDeductPointChange (e) {
      if (e === 0) {
        this.assessData.dataPublishPoints = 0
      }
    },
    // 数据采集截止时间改变
    gatherEndTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataCEndTime = timeStamp
    },
    // 数据采集超出时间改变
    gatherTimeoutTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataCTimeout = timeStamp
    },
    // 数据核对与复核截止时间改变
    reCheckTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataApproveEndTime = timeStamp
    },
    // 数据核对与复核超出时间改变
    reCheckTimeoutTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataApproveTimeout = timeStamp
    },
    // 数据修改与提交截止时间改变
    editTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataCommitEndTime = timeStamp
    },
    // 数据修改与提交超出时间改变
    editTimeoutTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataCommitTimeout = timeStamp
    },
    // 分值确认与发布截止时间改变
    issueTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dtatPublishEndTime = timeStamp
    },
    // 分值确认与发布超出时间改变
    issueTimeoutTimeChange (time) {
      let timeStamp = getTimeStamp(time + ':00')
      this.assessData.dataPublishTimeout = timeStamp
    },
    // 发起考核
    initiateAssess () {
      let perCodeArr = []
      this.tabList.map(item => {
        perCodeArr.push(item.ruleTemplateId)
      })
      let percodeArrList = this.newArr(perCodeArr)
      this.assessData.perCodeList = percodeArrList.toString()
      this.assessData.sheetId = this.$route.query.sheetId
      if (!this.assessData.dataCEndTime) {
        this.$Message.error('请选择数据采集截止时间')
      } else if (!this.assessData.dataCTimeout) {
        this.$Message.error('请选择数据采集超时通知时间')
      } else if (!this.assessData.dataApproveEndTime) {
        this.$Message.error('请选择数据复核截止时间')
      } else if (!this.assessData.dataApproveTimeout) {
        this.$Message.error('请选择数据复核超时通知时间')
      } else if (!this.assessData.dataCommitEndTime) {
        this.$Message.error('请选择数据修改截止时间')
      } else if (!this.assessData.dataCommitTimeout) {
        this.$Message.error('请选择数据修改超时通知时间')
      } else if (!this.assessData.dtatPublishEndTime) {
        this.$Message.error('请选择数据发布截止时间')
      } else if (!this.assessData.dataPublishTimeout) {
        this.$Message.error('请选择数据发布超时通知时间')
      } else if (this.assessData.dataCEndTime <= this.presentTime) {
        this.$Message.error('数据采集截止时间要大于当前时间')
      } else if (this.assessData.dataCEndTime <= this.assessData.dataCTimeout) {
        this.$Message.error('数据采集超时通知时间不能大于或等于数据采集截止时间')
      } else if (this.assessData.dataApproveEndTime <= this.presentTime) {
        this.$Message.error('数据复核截止时间要大于当前时间')
      } else if (this.assessData.dataCEndTime >= this.assessData.dataApproveEndTime) {
        this.$Message.error('数据复核截止时间要大于数据采集截止时间')
      } else if (this.assessData.dataApproveEndTime <= this.assessData.dataApproveTimeout) {
        this.$Message.error('数据复核超时通知时间不能大于或等于数据复核截止时间')
      } else if (this.assessData.dataCommitEndTime <= this.presentTime) {
        this.$Message.error('数据修改截止时间要大于当前时间')
      } else if (this.assessData.dataApproveEndTime >= this.assessData.dataCommitEndTime) {
        this.$Message.error('数据复核截止时间不能大于数据修改截止时间')
      } else if (this.assessData.dataCommitEndTime <= this.assessData.dataCommitTimeout) {
        this.$Message.error('数据修改超时通知时间不能大于或等于数据修改截止时间')
      } else if (this.assessData.dtatPublishEndTime <= this.presentTime) {
        this.$Message.error('数据发布截止时间要大于当前时间')
      } else if (this.assessData.dataCommitEndTime >= this.assessData.dtatPublishEndTime) {
        this.$Message.error('数据修改截止时间不能大于数据发布截止时间')
      } else if (this.assessData.dtatPublishEndTime <= this.assessData.dataPublishTimeout) {
        this.$Message.error('数据发布超时通知时间不能大于或等于数据发布截止时间')
      } else {
        createperfomancebatch(this.assessData).then(res => {
          if (res.data.code === 10000) {
            this.$Message.success('发起年度考核成功')
            setTimeout(() => {
              this.$router.push({
                path: './superior_backlog_main_page'
              })
            }, 1000)
          }
        })
      }
    },
    // 数组去重
    newArr (arr) {
      return Array.from(new Set(arr))
    }
  }
}
</script>
