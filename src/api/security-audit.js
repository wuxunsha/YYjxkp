import axios from '@/libs/api.request'

// 业务操作日志列表
export const findbusinessoperationsloglist = (data) => {
  return axios.request({
    url: '/securityaudit/findbusinessoperationsloglist',
    method: 'post',
    data
  })
}

// 账户登录日志列表
export const finduserloginloglist = (data) => {
  return axios.request({
    url: '/securityaudit/finduserloginloglist',
    method: 'post',
    data
  })
}

// 错误日志列表
export const findworkerrorloglist = (data) => {
  return axios.request({
    url: '/securityaudit/findworkerrorloglist',
    method: 'post',
    data
  })
}

// 登录板块数据
export const loginblockdata = (data) => {
  return axios.request({
    url: '/securityaudit/loginblockdata',
    method: 'post',
    data
  })
}
