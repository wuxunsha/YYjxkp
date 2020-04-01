import axios from 'axios'
import store from '@/store'
import { Message } from 'view-design'
import { setToken, getToken } from '@/libs/util'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (options) {
    console.log('url:', options)
    this.baseUrl = options.baseUrl
    this.publicUrl = options.publicUrl
    this.queue = {}
  }
  getInsideConfig ({ isPublicApi = false } = {}) {
    const config = {
      baseURL: isPublicApi ? this.publicUrl : this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      // 添加统一token
      config.headers['Access-Token'] = getToken('token')
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // 操作失败
      console.log(res)
      if (res.data.code === 10001) {
        Message.warning(res.data.msg)
      }
      // 系统内部错误
      if (res.data.code === 10002) {
        Message.error('系统内部错误：查询失败！')
      }
      // 字段校验不通过
      if (res.data.code === 10003) {
        Message.warning(res.data.msg)
      }
      // token失效，不可续签，需要重新登录
      if (res.data.code === 10004) {
        Message.warning(res.data.msg)
        // 清除用户登录信息
        setToken({ key: 'USER_INFO', value: '' })
        setToken({ key: 'token', value: '' })
        // 清除历史记录
        setToken({ key: 'tagNaveList', value: '' })
        // 清除RES_CODE
        setToken({ key: 'RES_CODE', value: '' })
        localStorage.sliderbarMenu = ''
        setTimeout(() => {
          window.location.reload()
        }, 350)
      }
      // token失效，可续签，重新调用业务接口
      if (res.data.code === 10005) {
        Message.warning(res.data.msg)
        // 清除用户登录信息
        setToken({ key: 'USER_INFO', value: '' })
        setToken({ key: 'token', value: '' })
        // 清除历史记录
        setToken({ key: 'tagNaveList', value: '' })
        // 清除RES_CODE
        setToken({ key: 'RES_CODE', value: '' })
        localStorage.sliderbarMenu = ''
        setTimeout(() => {
          window.location.reload()
        }, 350)
      }
      // token不能为空
      if (res.data.code === 10006) {
        Message.warning('请求中必须包含token字段')
      }
      // 没有接口访问权限
      if (res.data.code === 10008) {
        Message.warning('无接口访问权限')
      }
      // mock
      if (res.data.code === 99999) {
        console.warn('mock中的数据')
      }
      console.log('instance:', res.data, store.state.user)
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    const isPublicApi = Boolean(options.data && options.data.isPublicApi) || false
    if (isPublicApi) delete options.data.isPublicApi
    options = Object.assign(this.getInsideConfig({ isPublicApi: isPublicApi }), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
