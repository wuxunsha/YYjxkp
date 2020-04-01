import axios from '@/libs/api.request'

// 获取当前登录用户上级绩效考核每一个节点是否有操作权限
export const getloginperfomancebatchnodesstatueup = () => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesstatueup',
    method: 'post'
  })
}

// 获取当前登录用户本级绩效考核每一个节点是否有操作权限
export const getloginperfomancebatchnodesstatuepeer = () => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesstatuepeer',
    method: 'post'
  })
}

// 获取当前登录用户上级节点指标类型
export const getloginperfomancebatchindextypeup = () => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchindextypeup',
    method: 'post'
  })
}

// 当前登录用户上级节点根据机构id和类型获取当前年份指标主表
export const getindexbyyears = (data) => {
  return axios.request({
    url: '/newperfomancebatch/getindexbyyears',
    data,
    method: 'post'
  })
}

// 当前登录用户上级节点根据机构id和类型获取历年指标主表列表
export const getindexlist = (data) => {
  return axios.request({
    url: '/newperfomancebatch/getindexlist',
    data,
    method: 'post'
  })
}

// 当前登录用户上级节点根据sheetId获取对应的指标详情
export const getindexinfobysheetid = (sheetId) => {
  return axios.request({
    url: '/newperfomancebatch/getindexinfobysheetid/' + sheetId,
    method: 'post'
  })
}

// 当前登录用户上级节点根据sheetId获取考核单位
export const getporgorpersonalbysheetid = (sheetId) => {
  return axios.request({
    url: '/newperfomancebatchcommon/getporgorpersonalbysheetid/' + sheetId,
    method: 'post'
  })
}

// 根据ruleTemplateId获取对应的要点详情
export const getruleinfobyruletemplateid = (ruleTemplateId) => {
  return axios.request({
    url: '/newperfomancebatch/getruleinfobyruletemplateid/' + ruleTemplateId,
    method: 'post'
  })
}

// 当前登录用户上级节点发起考核
export const createperfomancebatch = (data) => {
  return axios.request({
    url: '/newperfomancebatch/createperfomancebatch',
    data,
    method: 'post'
  })
}

// 获取当前登录用户上级节点详情
export const getloginperfomancebatchnodesinfoup = (nodes) => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesinfoup/' + nodes,
    method: 'post'
  })
}

// 获取当前登录用户本级节点详情
export const getloginperfomancebatchnodesinfopeer = (nodes) => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesinfopeer/' + nodes,
    method: 'post'
  })
}

// 获取当前登录用户本级指标类型
export const getloginperfomancebatchindextypepeer = () => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchindextypepeer',
    method: 'post'
  })
}

// 提交当前登录用户本级指标数据录入
export const dataCollectiondataentry = (data) => {
  return axios.request({
    url: '/newperfomancebatch/dataCollectiondataentry',
    data,
    method: 'post'
  })
}

// 提交当前登录用户本级指标数据给被考核单位
export const dataentryinstruction = (data) => {
  return axios.request({
    url: '/newperfomancebatch/dataentryinstruction',
    data,
    method: 'post'
  })
}

// 考核进度-根据登录用户获取当前机构考核任务进度(领导专用)
export const theinspectionschedule = () => {
  return axios.request({
    url: '/newperfomancebatch/theinspectionschedule',
    method: 'post'
  })
}

// 提交反馈与评论
export const submitComments = (data) => {
  return axios.request({
    url: '/newperfomancebatchcommon/comments',
    data,
    method: 'post'
  })
}
