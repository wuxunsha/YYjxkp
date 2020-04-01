import axios from '@/libs/api.request'

// 获取发起考核表单信息
export const getSummaryComments = () => {
  return axios.request({
    url: '/perfomanc/getIdeaSummary',
    method: 'post'
  })
}

//  获取结果发布表单信息
export const getResultInfo = () => {
  return axios.request({
    url: '/perfomanc/getScoreInput',
    method: 'post'
  })
}

// 获取上级数据核对与反馈列表
export const getDataCheckList = (data) => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesinfoup/' + data,
    method: 'post'
  })
}

// 获取本级数据核对与反馈列表
export const getDataCheckLists = (data) => {
  return axios.request({
    url: '/newperfomancebatchcommon/getloginperfomancebatchnodesinfopeer/' + data,
    method: 'post'
  })
}

// 提交反馈
export const submitFeedback = (data) => {
  return axios.request({
    url: '/newperfomancebatch/assessmentinstruction',
    data,
    method: 'post'
  })
}

// 意见汇总提交给绩效办
export const submitPerformance = (data) => {
  return axios.request({
    url: '/newperfomancebatch/datacollectioninstruction',
    data,
    method: 'post'
  })
}

// 用户流程评论
export const processSubmission = (data) => {
  return axios.request({
    url: '/newperfomancebatchcommon/comments',
    data,
    method: 'post'
  })
}

//  结果发布
export const resultRelease = (data) => {
  return axios.request({
    url: '/newperfomancebatch/resultdisplayinstruction',
    data,
    method: 'post'
  })
}

// 打分
export const resultScore = (data) => {
  return axios.request({
    url: '/newperfomancebatch/resultdisplaygrade',
    data,
    method: 'post'
  })
}
