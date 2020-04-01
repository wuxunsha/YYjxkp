<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  .notice-item {
  margin-top: 30px;
  padding: 0 30px;
  .label {
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:20px;
    color:rgba(51,51,51,1);
    margin-bottom: 15px;
  }
}
</style>
<template>
  <div>
    <!-- 搜索区域 -->
    <Row class="header-search">
      <Col span="5" class="col">
        <span class="span span-max">通告名称</span>
        <Input v-model="params.title" placeholder="通告名称" clearable size="large" />
      </Col>
      <Col span="5" class="col">
        <span class="span span-max">发起单位</span>
        <Input v-model="params.orgName" placeholder="发起单位" clearable size="large" />
      </Col>
      <Col offset="1" span="10">
        <Button type="primary" class="custome-btn" @click="queryList">查询</Button>
        <Button @click="clearParams" class="custome-btn custome-btn-default">清空</Button>
      </Col>
    </Row>
    <!-- 字典维护 -->
    <Row class="content">
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="data" :border="false"></Table>
      </Col>
      <Col class="page">
        <Page
          :total="total"
          :page-size="pageOpts.size"
          :current="pageOpts.page"
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
    <!-- 查看通知公告 -->
    <Modal
      v-model="addModalShow1"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <div slot="header" class="add-header">{{ detail.title }}</div>
      <div class="notice-detail" v-html="detail.content"></div>
      <div class="notice-item">
        <p class="label">附件（点击下载）</p>
        <Upload :data="defaultList" ></Upload>
      </div>
      <div class="attch"></div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import { findNoticeByLowerPage, findOne } from '@/api/notice'
import { getStandardDate } from '@/libs/tools'
import Upload from '@/common/upload/upload'
export default {
  mixins: [mixin_table],
  components: {
    Upload
  },
  data () {
    return {
      defaultList: '',
      params: {
        title: '',
        orgName: ''
      },
      // 代开新增单位modal
      addModalShow1: false,
      // 打开新增标签modal
      columns: [
        {
          title: '序号',
          key: 'order',
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
          title: '通告名称',
          key: 'title',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '内容摘要',
          key: 'name',
          className: 'tb-header',
          align: 'center',
          width: 300,
          render: (h, params) => {
            let _content = params.row.content
            if (!_content) return
            _content = this.getSimpleText(_content)
            let span = ''
            if (_content.length > 100) {
              span = h('div', _content.substr(0, 100) + '...')
            } else {
              span = h('div', _content)
            }
            let tooltip = h('Tooltip', {
              props: {
                content: _content,
                theme: 'light',
                placement: 'top'
              }
            }, [span])
            return h('div', [tooltip])
          }
        },
        {
          title: '发起单位',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '通知时间',
          key: 'descs',
          className: 'tb-header',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let datetime = getStandardDate(params.row.createTime, 'year')
            return h('span', datetime)
          }
        },
        {
          title: '附件数量',
          key: 'attamentIds',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            let num = params.row.attamentIds.split('|').length
            return h('span', num)
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
            // 查看详情
            let detailIcon = h('Icon', {
              props: {
                type: 'ios-eye-outline',
                ...prop
              },
              on: {
                click: () => {
                  this.detailData(params)
                }
              }
            })
            return h('div', [this.btnShow(117108) && detailIcon])
          }
        }
      ],
      // 单位
      data: [],
      // 分页参数（单位）
      total: 0,
      pageOpts: {
        size: 10,
        page: 1
      },
      pageSizeOpts: [10, 20, 50, 100],
      detail: {
        title: '',
        content: '',
        attamentIds: ''
      }
    }
  },
  created () {
    // 通知公告列表
    this.queryList()
  },
  mounted () {
  },
  methods: {
    // 获取富文本中的纯文本
    getSimpleText (html) {
      let re1 = new RegExp('<.+?>', 'g')
      let msg = html.replace(re1, '')
      return msg
    },
    selectStatus () {
      this.pageOpts.page = 1
    },
    clearParams () {
      this.params.title = ''
      this.params.orgName = ''
      this.queryList()
    },
    onPageSizeChange (size) {
      this.pageOpts.size = size
      this.queryList()
    },
    // 翻页（通知公告）
    pageChange (current) {
      console.log('current page num:', current)
      this.pageOpts.page = current
      this.queryList()
    },
    detailData (params) {
      this.addModalShow1 = true
      console.log('查看详情：', params)
      let id = params.row.id
      findOne(id).then(res => {
        if (res.data.code === 10000) {
          this.detail.title = res.data.data.title
          this.detail.content = res.data.data.content
          this.detail.attamentIds = res.data.data.attamentIds
          this.defaultList = res.data.data.attamentIds
        }
      })
    },
    // 查询数据（单位）
    queryList () {
      let params = {
        ...this.params,
        ...this.pageOpts
      }
      findNoticeByLowerPage(params).then(res => {
        if (res.data.code === 10000) {
          this.data = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    }
  }
}
</script>
