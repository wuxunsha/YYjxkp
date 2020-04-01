<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-icon {
  margin-right: 6px;
}
.content {
  padding: 16px 20px 0;
  background-color: #fff;
  .online {
    transform: rotate(180deg)
  }
  .add-button {
    margin-bottom: 14px;
    text-align: right;
  }
  /* 分页 */
  .page {
    text-align: center;
    padding: 34px 0 100px;
  }
}
// 新增banner图弹窗
.modal {
  /deep/.ivu-modal-header {
    border-bottom: 0;
    padding-bottom: 0;
  }
  /deep/.ivu-modal-footer {
    padding-top: 0;
    border-top: 0;
    text-align: center;
  }
  .header-title {
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(51,51,51,1);
    line-height: 20px;
    text-align: center;
  }
  .modal-content {
    padding: 0 20px;
    p {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 40px;
      color: rgb(233, 96, 96);
    }
    .image-box {
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .modal-footer {
    width: 100%;
    span {
      display: inline-block;
      margin-right: 20px;
    }
    .submitBtn {
      width: 100px;
      height: 40px;
      padding: 0;
      background: #0972E7;
      border-radius: 6px;
      outline: none;
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
      color: rgba(255,255,255,1);
    }
  }
}
</style>

<template>
  <div class='layout'>
    <Layout>
      <div>
        <Content class='content'>
          <Row class="add-button">
            <Button type="primary" @click="showModal" v-if="btnShow(115107101)">
              <i class="icon-font iconxinzeng"></i>
              新增
            </Button>
          </Row>
          <Row>
            <Table stripe :columns='columns' :data='tableData' disabled-hover>
              <template slot='imgUrl' slot-scope="{ row }">
                <img :src="row.imgUrl" style="width:200px;height:60px;margin-top:6px;">
              </template>
              <template slot='createTime' slot-scope="{ row }">
                <span>{{row.createTime | dateYMD}}</span>
              </template>
              <template slot='status' slot-scope="{ row }">
                <span>{{row.status === 0 ? '已上线' : '待上线'}}</span>
              </template>
              <template slot='operation' slot-scope="{ row }">
                <!-- 上线 -->
                <Icon class="icon-font iconxiaxiansvg online" size="24" color="#0972E7" title="上线" @click="online(row.id)" v-if="btnShow(115107108) && row.status === 1"/>
                <!-- 下线 -->
                <Icon class="icon-font iconxiaxiansvg" size="24" color="#0972E7" title="下线" @click="offlinet(row.id)" v-if="btnShow(115107109) && row.status === 0"/>
                <!-- 删除 -->
                <Icon class="icon-font iconshanchu" size="24" color="#FF3333" title="删除" @click="delect(row.id)" v-if="btnShow(115107107) && row.status === 1"/>
              </template>
            </Table>
          </Row>
          <Row class='page'>
            <Page :total='queryInfo.total' :current='queryInfo.page' :page-size-opts="[10, 20, 30, 50]" :page-size='queryInfo.size' show-elevator show-sizer show-total @on-change='handlePageChange' @on-page-size-change='handleSizeChange' />
          </Row>
        </Content>
      </div>
    </Layout>

    <!-- 新增banner图弹窗 -->
    <Modal v-model="modal" width="60%" class="modal" @on-visible-change="modalChange">
      <p slot="header" class="header-title">
        <span>新增banner图</span>
      </p>
      <div class="modal-content">
        <p>建议尺寸：1920x320</p>
        <div class="image-box" v-if="uploadImgUrl">
          <img :src="uploadImgUrl" alt="">
        </div>
      </div>
      <div slot="footer" class="modal-footer">
        <span>
          <Upload :action="actionLink" :disabled="uploadFlag" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :on-success="handleSuccess" :show-upload-list="false" :max-size="5120">
            <Button class="submitBtn" :disabled="uploadFlag">上传图片</Button>
          </Upload>
        </span>
        <span>
          <Button class="submitBtn" :disabled="addFlag" @click="addBanner">确定</Button>
        </span>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  findBannerInfo,
  onlineBanner,
  offlinetBanner,
  addBannerInfo,
  deleteBanner
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 查询条件
      queryInfo: {
        page: 1,
        size: 10,
        total: 0
      },
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
          title: '图片',
          slot: 'imgUrl',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '创建时间',
          slot: 'createTime',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '状态',
          slot: 'status',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表单数据
      tableData: [],
      // 新增banner图弹窗显示隐藏开关
      modal: false,
      // 上传按钮禁用开关
      uploadFlag: false,
      // 确定按钮禁用开关
      addFlag: true,
      // 图片上传地址
      actionLink: 'http://47.112.144.243:9092/fileuploaddown/fileuploadone/4',
      // 上传图片路径
      uploadImgUrl: ''
    }
  },

  created () {
    // 查询banner图数据
    this.getFindBannerInfo()
  },
  computed: {},
  methods: {
    // 查询banner图数据
    getFindBannerInfo () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size
      }
      findBannerInfo(data).then(res => {
        if (res.data.code === 10000) {
          this.queryInfo.total = res.data.data.total
          this.tableData = res.data.data.dataList
        }
      })
    },
    // 上线banner图
    online (id) {
      onlineBanner(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('上线成功')
          this.getFindBannerInfo()
        }
      })
    },
    // 下线banner图
    offlinet (id) {
      offlinetBanner(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('下线成功')
          this.getFindBannerInfo()
        }
      })
    },
    // 删除banner图
    delect (id) {
      this.$Modal.confirm({
        title: '是否删除该banner图？',
        content: '<p>此删除为永久删除，请确认是否删除？</p>',
        onOk: () => {
          deleteBanner(id).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success('删除成功')
              this.getFindBannerInfo()
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getFindBannerInfo()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getFindBannerInfo()
    },
    // 显示新增banner图弹窗
    showModal () {
      this.modal = true
    },
    // 文件上传成功
    handleSuccess (res) {
      if (res.code === 10000) {
        this.$Message.success('上传banner图成功')
        this.uploadImgUrl = res.data.absolutePath
        this.uploadFlag = true
        this.addFlag = false
      }
    },
    // 文件格式验证失败时的钩子
    handleFormatError () {
      this.$Notice.warning({
        title: '温馨提示',
        desc: '您上传的图片格式不符合要求，请重新上传jpg或png格式图片'
      })
    },
    // 点击确定按钮上传到数据库
    addBanner () {
      const data = {
        imgUrl: this.uploadImgUrl
      }
      addBannerInfo(data).then(res => {
        if (res.data.code === 10000) {
          this.modal = false
          this.getFindBannerInfo()
          this.$Message.success('新增banner图成功')
          this.addFlag = true
        }
      })
    },
    // 上传banner图弹窗状态改变
    modalChange (e) {
      if (e === false) {
        this.uploadFlag = false
        this.addFlag = true
        this.uploadImgUrl = ''
      }
    }
  }
}
</script>
