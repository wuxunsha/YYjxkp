import axios from '@/libs/api.request'

// 获取页签
export const getPageTable = () => {
  return axios.request({
    url: '/statdata/getPageTab',
    method: 'post'
  })
}

// 根据页签获取年度待送审计分汇总列表（待送审）
export const getPySum = (data) => {
  return axios.request({
    url: '/statdata/pySum/list',
    data: data,
    method: 'post'
  })
}

// 送审
export const toSubmit = (id) => {
  return axios.request({
    url: '/statdata/pySum/toSubmit/' + id,
    method: 'post'
  })
}

// 查看计分详情汇总
export const getSurveyView = (suerveyId) => {
  return axios.request({
    url: '/statdata/pySum/infoView/' + suerveyId,
    method: 'post'
  })
}

// 查看加分详情汇总
export const getInnoPointExamine = (id) => {
  return axios.request({
    url: '/statdata/innoPoint/list/' + id,
    method: 'post'
  })
}

// 获取机构计分汇总列表
export const getPySumDet = (id) => {
  return axios.request({
    url: '/statdata/pySumDet/list/' + id,
    method: 'post'
  })
}

// 获取建议等级下拉列表
export const getSuglevel = () => {
  return axios.request({
    url: '/statdata/pySumDet/suglevel',
    method: 'post'
  })
}

// 保存编辑建议等级后的汇总列表
export const savePySumDetList = (data) => {
  return axios.request({
    url: '/statdata/pySumDet/updsugLev',
    data,
    method: 'post'
  })
}

// 提交反馈
export const submitFeedback = (data) => {
  return axios.request({
    url: '/statdata/instruct/save',
    data,
    method: 'post'
  })
}

// 根据汇总列表ID得到反馈结果
export const getInstruct = (pySumId) => {
  return axios.request({
    url: '/statdata/instruct/list/' + pySumId,
    method: 'post'
  })
}

// 查看问卷详情
export const getPySumYear = (data) => {
  return axios.request({
    url: '/statdata/pySum/yearList',
    data: data,
    method: 'post'
  })
}

// 审核
export const pySumAudit = (data) => {
  return axios.request({
    url: '/statdata/pySum/audit',
    data,
    method: 'post'
  })
}

// 根据页签获取年度加分汇总列表
export const getPySumInnoList = (data) => {
  return axios.request({
    url: '/statdata/pySum/innoList',
    data,
    method: 'post'
  })
}

// 获取创新创优加分汇总列表（查看详情）
export const getInnoPoint = (data) => {
  return axios.request({
    url: '/statdata/innoPoint/list',
    data,
    method: 'post'
  })
}

// 查询出机构所属分类
export const getDatadict = () => {
  return axios.request({
    url: '/statdata/datadict/list',
    method: 'post'
  })
}

// 查询个人关注图表展示数据
export const getViewData = () => {
  return axios.request({
    url: '/statdata/indexChart/view',
    method: 'post'
  })
}

// 查询个人关注指标图表列表
export const getIndexChartList = () => {
  return axios.request({
    url: '/statdata/indexChart/list',
    method: 'post'
  })
}

// 获取统计报表页签
export const getStatdataPageTab = () => {
  return axios.request({
    url: '/statdata/getPageTab',
    method: 'post'
  })
}

// 根据机构类型获取可选指标列表
export const getIndexChart = (orgType) => {
  return axios.request({
    url: '/statdata/indexChart/list/' + orgType,
    method: 'post'
  })
}

// 保存个人关注指标（标签）
export const saveIndexChart = (data) => {
  return axios.request({
    url: '/statdata/indexChart/save',
    data,
    method: 'post'
  })
}
