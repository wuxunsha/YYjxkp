
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
  </Row>
</template>

<script>
import {
  gatherlist,
  getTaskInfo,
  issue,
  perfprovecheck,
  cancelIssue
} from '@/api/improvement'
import mixin_table from '@/common/mixin/table'
export default {
  mixins: [mixin_table],
  name: '',
  data () {
    return {
      params: {
        perCode: '',
        improOrgName: '',
        statusList: ''
      },
      unitList: [],
      statusList: [],
      currentTab: '',
      currentId: 3,
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
          title: '改进单位/人',
          key: 'improOrgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '改进指标数',
          key: 'choseRuleProveNum',
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
              case 1:
                span = '待生效'
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
            // 改进内容
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
                content: '改进内容',
                theme: 'light',
                placement: 'top'
              }
            }, [updateIcon])
            // 选择指标
            let selectQuotaIcon = h('Icon', {
              props: {
                type: 'md-checkmark',
                ...prop
              },
              on: {
                click: () => {
                  this.selectQuota(params.row)
                }
              }
            })
            let selectQuotaTooltip = h('Tooltip', {
              props: {
                content: '选择指标',
                theme: 'light',
                placement: 'top'
              }
            }, [selectQuotaIcon])
            // 发布
            let publicIcon = h('Icon', {
              props: {
                type: 'md-done-all',
                ...prop
              },
              on: {
                click: () => {
                  this.publicTemp(params.row)
                }
              }
            })
            let publicTooltip = h('Tooltip', {
              props: {
                content: '发布',
                theme: 'light',
                placement: 'top'
              }
            }, [publicIcon])
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
            // 取消改进
            let cancelIcon = h('Icon', {
              props: {
                type: 'ios-cut',
                ...prop
              },
              on: {
                click: () => {
                  this.cancelTemp(params.row)
                }
              }
            })
            let cancelTooltip = h('Tooltip', {
              props: {
                content: '取消改进',
                theme: 'light',
                placement: 'top'
              }
            }, [cancelIcon])

            // 按钮控制
            let status = params.row.status
            let btns = []
            switch (status) {
              case 1:
                btns = [this.btnShow(113101103107) && updateTooltip, this.btnShow(113101103103) && selectQuotaTooltip, this.btnShow(113101103105) && publicTooltip, this.btnShow(113101103108) && cancelTooltip]
                break
              case 2:
                btns = [this.btnShow(113101103102) && detailTooltip, this.btnShow(113101103106) && checkTooltip]
                break
              case 3:
              case 4:
                // 已验收和已取消只能查看详情
                btns = [this.btnShow(113101103102) && detailTooltip]
                break
              default:
                console.log('该状态无配置:', status)
                break
            }
            if (status === 1) {
              // 初稿时显示编辑，提交，删除按钮
            } else if (status === 3) {
              // 验收后只显示查看详情按钮
              btns = [detailTooltip]
            } else {
              // 提交但未验收显示查看详情，验收按钮
              btns = [detailTooltip, checkTooltip]
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
      pageSizeOpts: [10, 20, 50, 100]
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
    }
  },
  created () {
    this.queryList()
    this.getTaskInfo()
  },
  methods: {
    // 获取状态列表
    getTaskInfo () {
      let params = {
        types: 18
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
    // 改进内容
    updateTemp (row) {
      let _query = {
        id: row.id
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement_doc/notice_detail', query: _query })
    },
    // 选择指标
    selectQuota (row) {
      let _query = {
        id: row.id
      }
      this.$router.push({ path: '/performance_improvement/superior/improvement/detail', query: _query })
    },
    // 发布模板
    publicTemp (row) {
      this.$Modal.confirm({
        title: '发布通知',
        content: '确定发布该通知吗？',
        onOk: () => {
          let id = row.id
          issue(id).then(res => {
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
    // 取消
    cancelTemp (row) {
      this.$Modal.confirm({
        title: '取消发布',
        content: '确定取消发布改进通知吗？',
        onOk: () => {
          let id = row.id
          cancelIssue(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.queryList()
            }
          })
        }
      })
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
      gatherlist(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    clearParams () {
      this.params.perCode = ''
      this.params.improOrgName = ''
      this.params.statusList = ''
      this.queryList()
    }
  }
}
</script>
