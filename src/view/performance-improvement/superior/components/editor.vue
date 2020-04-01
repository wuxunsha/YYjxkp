<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
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
      default: true
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
      // console.log('text>>>>>>>>>>>', text)
      // console.log('html>>>>>>>>>>>', html)
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text, this.editor)
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // 配置字体颜色
    this.editor.customConfig.colors = ['red']
    // 配置菜单
    this.editor.customConfig.menus = [
      'foreColor'
    ]
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
  },
  watch: {
    value (newVal) {
      if (newVal) {
        // 设置内容
        console.log('this value:', this.value)
        this.editor.txt.html(this.value)
      }
    }
  }
}
</script>

<style lang="less">
.editor-wrapper *{
  z-index: 100 !important;
}
</style>
