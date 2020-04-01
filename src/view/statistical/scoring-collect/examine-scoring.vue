<style lang="less" scoped>
@import url('~@/common/less/global.less');
li {
  list-style: none;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 16px;
  font-weight: 500;
  line-height: 57px;
  color: rgba(9, 114, 231, 1);
  padding: 0 50px;
}
/deep/.ivu-tabs-nav-container {
  background: #fff;
}
/deep/.ivu-tabs-bar {
  border-bottom: 14px solid #F5F7F9;
  margin-bottom: 0;
}
/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #FF9B29;
}
/deep/.ivu-tabs-ink-bar {
  background-color: #FF9B29;
}
/deep/.ivu-badge-count-alone {
  top: -10px;
  left: 10px;
}
/deep/textarea.ivu-input {
  min-height: 260px;
  border: 1px solid rgba(94,173,255,1);
  border-radius: 8px;
  resize: none;
}
/deep/.ivu-modal-footer {
  border-top: 0;
}
/* 反馈内容 */
.from-content {
  .title {
    margin-top: 25px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 18px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .total {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(102, 102, 102, 1);
    text-align: center;
  }
  .tabs {
    .tabs1 {
      // 备注信息
      .from-footer {
        margin-top: 14px;
        padding: 24px 20px 100px;
        background-color: #fff;
        .remark {
          font-size:18px;
          font-weight:bold;
          line-height:38px;
          color:rgba(51,51,51,1);
          margin-bottom: 14px;
        }
        .remark-input {
          margin-bottom: 26px;
        }
        .from-btn {
          text-align: center;
          .from-add {
            width:382px;
            height:56px;
            background:rgba(9,114,231,1);
            border: none;
            border-radius:6px;
            font-size:18px;
            font-weight:500;
            outline: none;
          }
        }
        .reference {
          margin-left: 36px;
          p {
            font-size:16px;
            font-weight:500;
            line-height:16px;
            color:rgba(102,102,102,1);
          }
        }
      }
    }
    .tabs2 {
      background: #fff;
      padding: 24px 20px 40px;
      .feedback-input {
        width: 100%;
      }
      .add-feedback {
        width: 166px;
        height: 44px;
        margin-top: 14px;
        background-color: #0972E7;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
      }
      /* 已反馈内容 */
      .footer {
        margin-top: 40px;
        background: #fff;
        .already-feedback {
          font-size: 20px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          i {
            font-size: 26px;
            color: #0081FF;
          }
        }
        .already-feedback-content {
          margin-left: 34px;
          li {
            border-bottom: 1px solid #F3F3F3;
            p:nth-child(2) {
              font-size: 16px;
              height: 30px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              .revert {
                float: right;
                font-size: 16px;
                height: 30px;
                font-weight: 500;
                color: rgba(9, 114, 231, 1);
                cursor: pointer;
              }
            }
            p:nth-child(1) {
              font-size: 14px;
              height: 30px;
              font-weight:500;
              color: rgba(204, 204, 204, 1);
              .feedback-time {
                float: right;
                font-size: 14px;
                height: 30px;
                font-weight:500;
                color: rgba(204, 204, 204, 1);
                i {
                  vertical-align: initial;
                  margin-right: 4px;
                }
              }
            }
            >div {
              width: 100%;
              margin-top: 10px;
              div {
                margin-left: 40px!important;
                >span:nth-child(1) {
                  color: rgba(204, 204, 204, 1);
                }
              }
            }
          }
        }
      }
    }
  }
}
// 回复弹窗
.modal {
  .modal-content {
    margin-top: 40px;
  }
  .modal-footer {
    .add-botton {
      width: 100px;
    }
  }
}
</style>

<template>
  <div>
    <Layout>
      <!-- 反馈内容 -->
      <Content class="from-content">
        <Tabs class="tabs" value="name1">
          <TabPane label="计分汇总" name="name1" class="tabs1">
            <div>
                <!-- 表格内容 -->
                <Content class='content'>
                    <Row class="table">
                        <Table :row-class-name="rowClassName" :columns='columns' :data="pySumData" :border="false">
                        </Table>
                    </Row>
                </Content>
                <!-- 备注信息 -->
                <Footer class="from-footer">
                    <!-- 备注消息 -->
                    <Row class="remark">
                    <Col span="24">
                        <!-- <p>已设置2个一类，3个二类等级。</p> -->
                    </Col>
                    </Row>
                    <Row class="reference">
                    <Col span="24">
                        <p>
                        <span>备注：</span>
                        <span>{{remark}}</span>
                        </p>
                    </Col>
                    </Row>
                </Footer>
            </div>
          </TabPane>
          <TabPane label="反馈与批示" name="name2" class="tabs2">
            <!-- 反馈内容 -->
            <Row>
              <Input v-model="feedbackContent" show-word-limit type="textarea" class="feedback-input" :maxlength="1000" />
            </Row>
            <Row>
              <Button class="add-feedback" @click="submitFeedbackData" v-if="btnShow(123101107)">提交反馈</Button>
            </Row>

            <!-- 已反馈内容 -->
            <Row class="footer">
              <Row class="already-feedback">
                <Icon class="icon-font iconfankuixinxi" />已反馈内容
              </Row>
              <ul class="already-feedback-content">
                <li v-for="item in feedbackList" v-bind:key="item.id">
                  <p>
                    <span>
                      <span>{{item.userName}}</span>
                      <span>{{item.position}}</span>
                      <span>{{item.mobPhone}}</span>
                    </span>
                    <span class="feedback-time">
                      <Icon class="icon-font iconshijian1" />{{item.createTime | dateFormat}}
                    </span>
                  </p>
                  <p>
                    <span>{{item.content}}</span>
                    <span class="revert" @click="showModal(item.id)" v-if="btnShow(123101107)">回复</span>
                  </p>
                  <div>
                    <div v-for="item1 in item.childList" v-bind:key="item1.id">
                      <span>{{item1.userName}}:</span>
                      <span>{{item1.content}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>

    <!-- 回复弹窗 -->
    <Modal v-model="modal" style="text-align: center;" class="modal" @on-visible-change="modaChange">
      <div class="modal-content" style="text-align:center">
        <Input v-model="revert" show-word-limit type="textarea" class="feedback-input" :maxlength="200" placeholder="请输入回复内容" />
      </div>
      <div slot="footer" style="text-align: center;" class="modal-footer">
        <Button type="primary" class="add-botton" @click="submitRevert">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getPySumDet,
  submitFeedback,
  getInstruct
} from '@/api/statistical'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 表格参数
      columns: [
        {
          title: '序号',
          key: 'id',
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
          title: '单位',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '总分',
          key: 'sumScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标扣分',
          key: 'deductionScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标加分',
          key: 'bonusScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '创新加分',
          key: 'innovateScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '最后得分',
          key: 'finalScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '建议等级',
          key: 'sugLevalName',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      pySumData: [],
      // 备注信息
      remark: '',
      // 反馈内容
      feedbackContent: '',
      // 反馈列表
      feedbackList: [],
      // 回复弹窗开关
      modal: false,
      // 回复反馈
      revert: '',
      // 反馈列表id
      replyId: null
    }
  },
  created () {
    // 获取机构计分汇总列表
    this.getPySumDetListAll()
    // 根据汇总列表ID得到反馈结果
    this.getInstruct()
  },
  methods: {
    // 获取机构计分汇总列表
    getPySumDetListAll () {
      getPySumDet(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.pySumData = res.data.data.pageData
          this.remark = res.data.data.remark
        }
      })
    },
    // 提交反馈
    submitFeedbackData () {
      const data = {
        content: this.feedbackContent,
        themeId: this.$route.query.id,
        replyType: 1
      }
      submitFeedback(data).then(res => {
        if (res.data.code === 10000) {
          this.feedbackContent = ''
          this.$Message.success('提交反馈成功')
          this.getInstruct()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 根据汇总列表ID得到反馈结果
    getInstruct () {
      getInstruct(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.feedbackList = res.data.data.list
        }
      })
    },
    // 显示回复弹窗
    showModal (id) {
      this.modal = true
      this.replyId = id
    },
    // 提交回复
    submitRevert () {
      const data = {
        content: this.revert,
        replyType: 2,
        themeId: this.$route.query.id,
        replyId: this.replyId
      }
      submitFeedback(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('提交回复成功')
          this.replyId = null
          this.modal = false
          this.revert = ''
          this.getInstruct()
        }
      })
    },
    // 监听回复弹窗关闭
    modaChange (e) {
      if (e === false) {
        this.revert = ''
      }
    }
  }
}
</script>
