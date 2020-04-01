import axios from '@/libs/api.request'

//  创新创优展示列表
export const queryList = (data) => {
  return axios.request({
    url: '/innovate/querylist',
    data,
    method: 'post'
  })
}

//  部门创新创优展示列表
export const departmentQueryList = (data) => {
  return axios.request({
    url: '/innovatedepartment/querylist',
    data,
    method: 'post'
  })
}

//  查看规则列表的展示
export const ruleQueryList = (data) => {
  return axios.request({
    url: '/innovaterule/queryList',
    data,
    method: 'post'
  })
}

//  查看规则列表上级的展示
export const UpruleQueryList = (data) => {
  return axios.request({
    url: '/innovaterule/queryListUp',
    data,
    method: 'post'
  })
}

//  删除创新创优列表
export const deleteList = (data) => {
  return axios.request({
    url: '/innovate/delete/' + data,
    method: 'post'
  })
}

//  删除部门创新创优列表
export const departmentDeleteList = (data) => {
  return axios.request({
    url: '/innovatedepartment/delete/' + data,
    method: 'post'
  })
}

//  删除创新创优列表
export const ruleDeleteList = (data) => {
  return axios.request({
    url: '/innovaterule/delete/' + data,
    method: 'post'
  })
}

//  新增创新创优
export const save = (data) => {
  return axios.request({
    url: '/innovate/save',
    data,
    method: 'post'
  })
}

//  部门新增创新创优
export const departmentSave = (data) => {
  return axios.request({
    url: '/innovatedepartment/save',
    data,
    method: 'post'
  })
}

//  新增规则
export const saveRule = (data) => {
  return axios.request({
    url: '/innovaterule/save',
    data,
    method: 'post'
  })
}

//  批示回复
export const reply = (data) => {
  return axios.request({
    url: '/innovatecomm/instructionsorreply',
    data,
    method: 'post'
  })
}

//  查看详情
export const seeDetails = (data) => {
  return axios.request({
    url: '/innovatecomm/querybyid/' + data,
    method: 'post'
  })
}

//  审核表格数据
export const reviewQueryList = (data) => {
  return axios.request({
    url: '/innovatecomm/queryauditlist',
    data,
    method: 'post'
  })
}

//  发布申请
export const postApplication = (data) => {
  return axios.request({
    url: '/innovatecomm/applyfor/' + data,
    method: 'post'
  })
}

//  修改创新创优
export const modifyDepartment = (data) => {
  return axios.request({
    url: '/innovatedepartment/update',
    data,
    method: 'post'
  })
}

//  修改部门创新创优
export const modifyDepartments = (data) => {
  return axios.request({
    url: '/innovatedepartment/update',
    data,
    method: 'post'
  })
}

//  转部门项目
export const transferDepartment = (data) => {
  return axios.request({
    url: '/innovatecomm/individualtransfer/' + data,
    method: 'post'
  })
}

//  审核规则列表
export const auditrulelist = (data) => {
  return axios.request({
    url: '/innovatecomm/auditrulelist',
    data,
    method: 'post'
  })
}

//  创新创优审核通过
export const pass = (data) => {
  return axios.request({
    url: '/innovatecomm/pass',
    data,
    method: 'post'
  })
}

//  创新创优审核驳回
export const reject = (data) => {
  return axios.request({
    url: '/innovatecomm/reject',
    data,
    method: 'post'
  })
}

//  修改规则
export const updateRoules = (data) => {
  return axios.request({
    url: '/innovaterule/update',
    data,
    method: 'post'
  })
}
