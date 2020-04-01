<template>
  <div class="upload-box">
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
      <template>
        <img :src="item" v-if="/.(jpg|jpeg|bmp|png|tif|gif)$/g.test(item)">
        <Icon class="icon-font iconword word-icon" v-else-if="/.(doc|docx)$/g.test(item)"/>
        <Icon type="ios-document" class="file-icon" v-else/>
        <div class="demo-upload-list-cover" v-if="flag">
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
        <div class="demo-upload-list-cover" v-else>
          <Icon class="icon-font iconxiazai1" @click.native="upload(item)"></Icon>
        </div>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="format ? format : ['jpg','jpeg','png']"
      :max-size="maxSize ? maxSize : 5120"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="actionLink" :class="uploadList.length < number ? 'uploadBtn showUploadBtn' : 'uploadBtn hiddenUploadBtn'"
      :headers="headers" v-if="flag">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-add" size="40"></Icon>
      </div>
    </Upload>
  </div>
</template>
<script>
import { getToken } from '@/libs/util'
export default {
  props: {
    // 附件数量
    number: Number, // 默认不限制数量
    // 附件格式
    format: Array, // 默认格式['jpg','jpeg','png']
    // 附件传入数据
    data: String, // 传入以|分隔的字符串地址
    // 附件大小
    maxSize: Number, // 默认附件大小：5M
    // 上传附件方式
    privacy: Number, // 默认上传公开上传方式
    // 调用类型
    type: Number // 1:查看详情
  },
  data () {
    return {
      // 上传接口返回数据
      defaultList: [],
      uploadList: [],
      // 图片上传地址
      actionLink: 'http://47.112.144.243:9092/fileuploaddown/fileuploadone/4',
      headers: {},
      // 控制上传、删除按钮显示隐藏开关
      flag: true
    }
  },
  watch: {
    privacy: {
      handler (data) {
        if (data) {
          this.headers = {
            'Access-Token': getToken('token')
          }
          this.actionLink = 'http://47.112.144.243:9092/fileuploaddown/fileuploadone/' + data
        }
      },
      deep: true,
      immediate: true
    },
    data: function (data) {
      if (data) {
        let dataArr = this.data.split('|')
        this.uploadList = dataArr
      } else {
        this.uploadList = []
      }
    },
    type: {
      handler (data) {
        if (data === 1) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 清空上传数据
    emptyData () {
      this.uploadList = []
      this.defaultList = []
    },
    handleRemove (index) {
      this.uploadList.splice(index, 1)
      this.defaultList.splice(index, 1)
      this.$emit('uploadURL', this.defaultList)
    },
    upload (data) {
      console.log(data)
    },
    handleSuccess (res) {
      if (res.code === 10000) {
        this.uploadList.push(res.data.absolutePath)
        this.defaultList.push(res.data)
        this.$emit('uploadURL', this.defaultList)
      }
    },
    handleFormatError () {
      if (this.format) {
        this.$Notice.warning({
          title: '只能上传' + this.format + '格式的附件'
        })
      } else {
        this.$Notice.warning({
          title: '只能上传jpg、jpeg、png格式的附件'
        })
      }
    },
    handleMaxSize () {
      if (this.maxSize) {
        this.$Notice.warning({
          title: '上传的附件不能大于' + this.maxSize / 1024 + 'M'
        })
      } else {
        this.$Notice.warning({
          title: '上传的附件不能大于5M'
        })
      }
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.number
      if (!check) {
        this.$Notice.warning({
          title: '只能上传一个附件'
        })
      }
      return check
    }
  }
}
</script>
<style lang="less" scoped>
.upload-box {
  height: 60px;
}
.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
  img {
    width: 100%;
    height: 100%;
  }
  .file-icon {
    font-size: 58px;
  }
  .word-icon {
    font-size: 58px;
    color: cornflowerblue;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.ivu-icon {
  line-height: 58px;
}
.uploadBtn {
  display: inline-block;
  width: 58px;
}
.showUploadBtn {
  visibility: visible;
}
.hiddenUploadBtn {
  visibility: hidden;
}
</style>
