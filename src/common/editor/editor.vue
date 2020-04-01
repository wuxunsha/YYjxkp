<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
import { getToken } from '@/libs/util'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    this.editor.customConfig.menus = [
      'image',
      'bold',
      'italic',
      'justify'
    ]
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    this.editor.customConfig.uploadImgServer = 'http://47.112.144.243:9092/fileuploaddown/fileuploadone/4'
    this.editor.customConfig.uploadImgHeaders = {
      'Access-Token': getToken('token')
    }
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        var url = result.data.absolutePath
        insertImg(url)
      }
    }
    this.editor.create()
  },
  watch: {
    value (newVal) {
      if (newVal) {
        this.setHtml(newVal)
      }
    }
  }
}
</script>

<style lang="less">
.editor-wrapper *{
  z-index: 100 !important;
  width: 100%;
}
.w-e-menu{
  z-index: 2 !important;
}
.w-e-text-container{
  z-index: 1 !important;
}
</style>
