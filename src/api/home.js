import axios from '@/libs/api.request'

// 待处理列表
export const todoList = (data) => {
  return axios.request({
    url: '/wechatOptData/pcIndex/todoList',
    data,
    method: 'post'
  })
}

// 通知通告列表
export const noticeList = (data) => {
  return axios.request({
    url: '/wechatOptData/pcIndex/noticeList',
    data,
    method: 'post'
  })
}
