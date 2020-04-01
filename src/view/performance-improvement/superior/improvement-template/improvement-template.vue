<style lang="less" scoped>
  @import url('~@/common/less/global.less');
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
  .disqualified-unit {
    margin-top: 30px;
  }
  .page {
    padding-bottom: 20px;
  }
</style>

<template>
  <Row style="background-color: #fff;" type="flex" justify="center">
    <Col style="padding: 20px" span="18">
      <article-steps :currentId="currentId" :stepsList="stepsList"></article-steps>
    </Col>
    <Col style="padding: 20px" span="24">
      <Tabs @on-click="tabClick" :value="currentTab">
        <template
          v-for="(item, index) in tabs"
          >
          <TabPane
            icon="ios-trending-up"
            :label="item.orgtypeName"
            :name="item.orgType.toString()"
            :key="'机构' + index"
            >
            <Row style="margin-top: 30px">
              <Col span="4" class="col">
                <span class="span">编号</span>
                <Input v-model="params.perCode" size="large" placeholder="请输入编号" clearable />
              </Col>
              <Col span="4" class="col">
                <span class="span span-max">改进单位/人</span>
                <Input v-model="params.improOrgName" size="large" placeholder="请输入改进单位/人" clearable />
              </Col>
              <Col span="4" class="col">
                <span class="span">状态</span>
                <Select v-model="params.statusList" size="large">
                  <Option v-for="item in statusList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                </Select>
              </Col>
              <Col offset="1" span="8">
                <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
                <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
              </Col>
              <Col span="24">
                <Table :row-class-name="rowClassName" class="disqualified-unit" :columns="columns" :data="data" :border="false"></Table>
              </Col>
            </Row>
          </TabPane>
        </template>
      </Tabs>
    </Col>
    <Col class="page">
      <Page
        :total="total"
        :page-size="pageOpts.pageSize"
        :current="pageOpts.pageIndex"
        prev-text="上一页"
        next-text="下一页"
        @on-change="pageChange"
        @on-page-size-change="onPageSizeChange"
        show-sizer
        show-total
        show-elevator
        :page-size-opts="pageSizeOpts"
      />
    </Col>
    <Col span="24">
       <!-- 整改通知模板 -->
        <Modal
          v-model="addModalShow"
          @on-visible-change="visibleChange"
          :mask-closable="false"
          class-name="vertical-center-modal"
          width="800"
          >
          <!-- header -->
          <div slot="header" class="add-header">编辑通知模板</div>
          <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
            <Row type="flex" justify="center">
              <Col span="24">
                <FormItem prop="title" label="抬头">
                  <Input v-model="addFromLine.title" placeholder="请输入抬头" />
                </FormItem>
                <FormItem prop="perCode" label="编号">
                  <Input v-model="addFromLine.perCode" placeholder="请输入编号" />
                </FormItem>
                <FormItem prop="content" label="内容">
                  <Editor @on-change="htmlContentChange" :value="addFromLine.content" />
                </FormItem>
                <FormItem prop="content" label="选择印章">
                  <RadioGroup v-model="imgurl">
                    <Radio :label="item + index" v-for="(item, index) in imgs" :key="index">
                      <img :src="item" width="100" alt="图章">
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer" class="footer">
            <Button type="primary" @click="updatePostProve">保存通知模板</Button>
          </div>
        </Modal>
    </Col>
  </Row>
</template>

<script>
import {
  getTaskInfo,
  forPostList,
  getPageTab,
  updatePostProve,
  perfprovement,
  perfprovedel,
  perfprovesub,
  perfprovecheck
} from '@/api/improvement'
import mixin_table from '@/common/mixin/table'
import Editor from '../components/editor'
export default {
  mixins: [mixin_table],
  name: '',
  components: {
    Editor
  },
  data () {
    return {
      addModalShow: false,
      addFromLine: {
        title: '',
        perCode: '',
        content: ''
      },
      addFromRule: {},
      params: {
        perCode: '',
        improOrgName: '',
        statusList: '',
        orgType: ''
      },
      imgurl: '',
      imgs: [
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780',
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780',
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780'
      ],
      statusList: [],
      currentTab: '',
      currentId: '',
      stepsList: [
        {
          explain: '创建模板',
          icon: 'ivu-icon ivu-icon-ios-albums'
        },
        {
          explain: '提交模板',
          icon: 'ivu-icon ivu-icon-ios-desktop'
        },
        {
          explain: '改进指标确定',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '改进方案回复',
          icon: 'ivu-icon ivu-icon-ios-grid'
        },
        {
          explain: '验收',
          icon: 'ivu-icon ivu-icon-ios-grid'
        }
      ],
      tabs: [],
      columns: [
        {
          title: '序号',
          key: 'nubmer',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '编号',
          key: 'perCode',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '机构名称/人',
          key: 'improOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '采集人',
          key: 'dataCollectionOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '待改进指标数',
          key: 'ruleProveNum',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '反馈与批示',
          key: 'instructionCount',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let status = params.row.status
            let span = ''
            switch (status) {
              case 0:
                span = '初稿'
                break
              case 1:
                span = '待发布'
                break
              case 2:
                span = '已发布'
                break
              case 3:
                span = '已验收'
                break
              case 4:
                span = '已取消'
                break
              case 5:
                span = '已回复'
                break
              default:
                console.log('该状态无配置:', status)
                break
            }
            return h('span', span)
          }
        },
        {
          title: '操作',
          key: 'operation',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            const prop = {
              size: '24',
              color: '#0972E7'
            }
            // 编辑模板
            let updateIcon = h('Icon', {
              props: {
                type: 'ios-create-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.updateTemp(params.row)
                }
              }
            })
            let updateTooltip = h('Tooltip', {
              props: {
                content: '编辑模板',
                theme: 'light',
                placement: 'top'
              }
            }, [updateIcon])
            // 提交模板
            let confirmIcon = h('Icon', {
              props: {
                type: 'md-checkmark',
                ...prop
              },
              on: {
                click: () => {
                  this.confirmTemp(params.row)
                }
              }
            })
            let confirmTooltip = h('Tooltip', {
              props: {
                content: '提交',
                theme: 'light',
                placement: 'top'
              }
            }, [confirmIcon])
            // 删除
            let delIcon = h('Icon', {
              props: {
                type: 'ios-trash-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.delTemp(params.row)
                }
              }
            })
            let delTooltip = h('Tooltip', {
              props: {
                content: '删除模板',
                theme: 'light',
                placement: 'top'
              }
            }, [delIcon])
            // 查看详情
            let detailIcon = h('Icon', {
              props: {
                type: 'md-book',
                ...prop
              },
              on: {
                click: () => {
                  this.detailTemp(params.row)
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
            // 验收
            let checkIcon = h('Icon', {
              props: {
                type: 'md-build',
                ...prop
              },
              on: {
                click: () => {
                  this.checkTemp(params.row)
                }
              }
            })
            let checkTooltip = h('Tooltip', {
              props: {
                content: '验收',
                theme: 'light',
                placement: 'top'
              }
            }, [checkIcon])

            // 按钮控制
            let status = params.row.status
            let btns = []
            switch (status) {
              case 0:
                // 初稿时显示编辑，提交，删除按钮
                btns = [this.btnShow(113101102101) && updateTooltip, this.btnShow(113101102104) && confirmTooltip, this.btnShow(113101102105) && delTooltip]
                break
              case 1:
              case 3:
              case 4:
                // 1.待发布；3.已验收；4.已取消
                btns = [this.btnShow(113101102101) && detailTooltip]
                break
              case 2:
              case 5:
                // 2.已发布；5.已回复
                btns = [this.btnShow(113101102101) && detailTooltip, this.btnShow(113101102108) && checkTooltip]
                break
              default:
                console.log('该状态无配置:', status)
                break
            }
            return h('div', btns)
          }
        }
      ],
      data: [],
      total: 0,
      pageOpts: {
        pageSize: 10,
        pageIndex: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      temId: ''
    }
  },
  computed: {
    // 上级指定或内部改进
    typeName () {
      // superior，上级；internal，内部
      return this.$route.query.typename
    },
    types () {
      // 1，上级评价；2，内部评价
      return this.typeName === 'internal' ? 2 : 1
    },
    stepindex () {
      return this.$route.query.stepindex
    }
  },
  created () {
    this.getTaskInfo()
    this.getPageTab()
    this.setStepIndex()
  },
  methods: {
    setStepIndex () {
      this.currentId = parseInt(this.stepindex)
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    // 获取机构列表
    getPageTab () {
      console.log('待改进单位')
      let params = {
        types: this.types
      }
      getPageTab(params).then(res => {
        if (res.data.code === 10000) {
          this.tabs = res.data.data
          this.currentTab = this.tabs[0].orgType.toString()
          this.params.orgType = this.currentTab
          this.queryList()
        }
      })
    },
    // 获取状态列表
    getTaskInfo () {
      let params = {
        types: 17
      }
      getTaskInfo(params).then(res => {
        if (res.data.code === 10000) {
          let _selectList = res.data.data
          _selectList.forEach(item => {
            item.value = item.nameValue
            item.label = item.name
          })
          this.statusList = _selectList
        }
      })
    },
    htmlContentChange (html, text) {
      this.addFromLine.content = html
    },
    // 编辑模板
    updateTemp (row) {
      this.addModalShow = true
      // 查看模板详情
      let id = row.id
      perfprovement(id).then(res => {
        if (res.data.code === 10000) {
          console.log(res.data.data)
          this.addFromLine.title = res.data.data.template.title
          this.addFromLine.perCode = res.data.data.template.perCode
          this.addFromLine.content = res.data.data.template.content
          this.temId = res.data.data.template.id
        }
      })
    },
    // 保存编辑后的模板
    updatePostProve () {
      this.$Modal.confirm({
        title: '编辑通知模板',
        content: '确定编辑该通知模板吗？',
        onOk: () => {
          let params = {
            content: this.addFromLine.content,
            perCode: this.addFromLine.perCode,
            title: this.addFromLine.title,
            temId: this.temId
          }
          updatePostProve(params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.addModalShow = false
            }
          })
        }
      })
    },
    // 提交初稿
    confirmTemp (row) {
      this.$Modal.confirm({
        title: '提交初稿',
        content: '确定提交初稿吗？',
        onOk: () => {
          let id = row.id
          perfprovesub(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
    },
    // 删除模板
    delTemp (row) {
      this.$Modal.confirm({
        title: '删除通知模板',
        content: '确定删除该通知模板吗？',
        onOk: () => {
          let id = row.id
          perfprovedel(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
    },
    // 查看详情
    detailTemp (row) {
      let _query = {
        id: row.id,
        typename: this.typeName
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement_template/detail', query: _query })
    },
    // 验收
    checkTemp (row) {
      this.$Modal.confirm({
        title: '验收改进方案',
        content: '确定验收该改进方案吗？',
        onOk: () => {
          let id = row.id
          perfprovecheck(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
    },
    tabClick (name) {
      // tab切换后重置页码
      this.params.orgType = name
      this.queryList()
    },
    onPageSizeChange (pageSize) {
      this.pageOpts.pageSize = pageSize
      this.queryList()
    },
    // 翻页（指标单位）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.pageIndex = current
      this.queryList()
    },
    // 查询数据（标签）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      params.statusList = !params.statusList ? [] : params.statusList.split()
      params.types = this.types
      forPostList(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
      console.log('待改进单位', params)
    },
    clearParams () {
      this.params.perCode = ''
      this.params.improOrgName = ''
      this.params.statusList = ''
      this.queryList()
    }
  },
  watch: {
    stepindex (newVal) {
      if (newVal) {
        this.setStepIndex()
      }
    }
  }
}
</script>
