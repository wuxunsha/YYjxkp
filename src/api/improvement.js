import axios from '@/libs/api.request'

// 得到绩效改进上级指定以及内部指定各按钮操作权限
export const getSupAndSubPerm = () => {
  return axios.request({
    url: 'informProve/getSupAndSubPerm',
    method: 'post'
  })
}

// 绩效改进获取页签
export const getPageTab = data => {
  return axios.request({
    url: 'informProve/getPageTab',
    method: 'post',
    data: data
  })
}

// 获取待改进机构列表
export const orgList = data => {
  return axios.request({
    url: 'informProve/perfprove/orgList',
    method: 'post',
    data: data
  })
}

// 机构待改进详情
export const perfproveview = (data) => {
  return axios.request({
    url: `informProve/perfprove/view`,
    method: 'post',
    data: data
  })
}

// 发起改进通知
export const postProve = (data) => {
  return axios.request({
    url: `informProve/perfprove/postProve`,
    method: 'post',
    data: data
  })
}

// 得到当前流程下拉列表(提交模板页面的状态列表)
export const getTaskInfo = (data) => {
  return axios.request({
    url: `/socie/getTaskInfo`,
    method: 'post',
    data: data
  })
}

// 根据机构列表查询改进通知列表（初稿）
export const forPostList = (data) => {
  return axios.request({
    url: `informProve/perfprove/forPostList`,
    method: 'post',
    data: data
  })
}

// 通知详情
export const perfprovement = (id) => {
  return axios.request({
    url: `informProve/perfprove/ment/${id}`,
    method: 'post'
  })
}

// 保存反馈
export const saveInstruc = (data) => {
  return axios.request({
    url: `informProve/perfprove/saveInstruc`,
    method: 'post',
    data: data
  })
}

// 保存编辑后的模板
export const updatePostProve = (data) => {
  return axios.request({
    url: `informProve/perfprove/updatePostProve`,
    method: 'post',
    data: data
  })
}

// 删除初稿
export const perfprovedel = (id) => {
  return axios.request({
    url: `informProve/perfprove/del/${id}`,
    method: 'post'
  })
}

// 提交初稿
export const perfprovesub = (id) => {
  return axios.request({
    url: `informProve/perfprove/sub/${id}`,
    method: 'post'
  })
}

// 改进通知（正式）
export const gatherlist = (data) => {
  return axios.request({
    url: `informProve/perfprove/gatherlist`,
    method: 'post',
    data: data
  })
}

// 待改进明细(改进通知初稿-附件)
export const chosepointview = (id) => {
  return axios.request({
    url: `informProve/perfprove/chosepointview/${id}`,
    method: 'post'
  })
}

// 添加到通知附件中
export const chosepointsub = (data) => {
  return axios.request({
    url: `informProve/perfprove/chosepointsub`,
    method: 'post',
    data: data
  })
}

// 发布(待改进指标通知)
export const issue = (id) => {
  return axios.request({
    url: `informProve/perfprove/issue/${id}`,
    method: 'post'
  })
}

// 验收整改通知
export const perfprovecheck = (id) => {
  return axios.request({
    url: `informProve/perfprove/check/${id}`,
    method: 'post'
  })
}

// 改进明细列表
export const proveDetailList = (data) => {
  return axios.request({
    url: `informProve/perfprove/proveDetailList`,
    method: 'post',
    data: data
  })
}

// 改进监管获取页签
export const imfoManPageTab = () => {
  return axios.request({
    url: `informProve/imfoManPageTab`,
    method: 'post'
  })
}

// 取消改进
export const cancelIssue = (id) => {
  return axios.request({
    url: `informProve/perfprove/cancelIssue/${id}`,
    method: 'post'
  })
}
