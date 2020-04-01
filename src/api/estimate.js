import axios from '@/libs/api.request'

// 获取按钮操作权限
export const getSupAndSubPerm = () => {
  return axios.request({
    url: '/socie/getSupAndSubPerm',
    method: 'post'
  })
}

// 获取页签
export const getPageTab = (data) => {
  return axios.request({
    url: 'socie/getPageTab',
    data,
    method: 'post'
  })
}

// 判断该年份是否有数据
export const isViewSocie = (data) => {
  return axios.request({
    url: '/socie/isViewSocie',
    data,
    method: 'post'
  })
}

// 判断是否显示创建模板按钮
export const isViewCreateButton = (data) => {
  return axios.request({
    url: '/socie/isViewCreateButton',
    data,
    method: 'post'
  })
}

// 根据页签获取模板列表
export const getSocieEval = (data) => {
  return axios.request({
    url: 'socie/getSocieEvalList',
    data,
    method: 'post'
  })
}

// 创建模板获取被考察机构列表
export const getInspect = (data) => {
  return axios.request({
    url: 'socie/getInspectOrgList',
    data: data,
    method: 'post'
  })
}

// 获取机构列表
export const getOrg = (data) => {
  return axios.request({
    url: 'socie/getOrgList',
    data,
    method: 'post'
  })
}

// 保存模板
export const socieEvalSave = (data) => {
  return axios.request({
    url: 'socie/socieEvalSave',
    data,
    method: 'post'
  })
}

// 提交模板
export const socieEvalUpdate = (id) => {
  return axios.request({
    url: '/socie/socieEvalUpdate/' + id,
    method: 'post'
  })
}

// 获取修改模板
export const socieEval = (id) => {
  return axios.request({
    url: '/socie/socieEval/' + id,
    method: 'post'
  })
}

// 编辑模板获取被考察机构列表
export const getToBeCollOrgList = (data) => {
  return axios.request({
    url: 'socie/getToBeCollOrgList',
    data: data,
    method: 'post'
  })
}

// 查看社会评价问卷详情
export const getSurveyView = (suerveyId) => {
  return axios.request({
    url: '/socie/surveyView/' + suerveyId,
    method: 'post'
  })
}

// 提交反馈
export const submitSurveyfeedbackSub = (data) => {
  return axios.request({
    url: '/socie/surveyfeedbackSub',
    data: data,
    method: 'post'
  })
}

// 获取反馈列表
export const getSurveyfeedback = (suerveyId) => {
  return axios.request({
    url: '/socie/surveyfeedback/' + suerveyId,
    method: 'post'
  })
}

// 获取问卷调查列表
export const getSocieEvalQuesList = (data) => {
  return axios.request({
    url: '/socie/getSocieEvalQuesList',
    data,
    method: 'post'
  })
}

// 获取问卷调查状态
export const getStatusType = () => {
  return axios.request({
    url: '/socie/getStatusByTypes',
    method: 'post'
  })
}

// 提交问卷调查表
export const questtionSub = (id) => {
  return axios.request({
    url: '/socie/questtionSub/' + id,
    method: 'post'
  })
}

// 提交编辑问卷
export const submitQuesttionSave = (obj) => {
  return axios.request({
    url: '/socie/questtionSave',
    data: obj,
    method: 'post'
  })
}

// 获取社会评价计分列表
export const getSocieEvalGrade = (data) => {
  return axios.request({
    url: '/socie/getSocieEvalGradeList',
    data,
    method: 'post'
  })
}

// 打分
export const socieEvalGrade = (data) => {
  return axios.request({
    url: '/socie/socieEvalGrade',
    data,
    method: 'post'
  })
}

// 获取评价管理页签
export const evaManPageTab = () => {
  return axios.request({
    url: '/socie/evaManPageTab',
    method: 'post'
  })
}

// 获取评价管理当前流程下拉框列表
export const getTaskInfo = (data) => {
  return axios.request({
    url: '/socie/getTaskInfo',
    data,
    method: 'post'
  })
}
