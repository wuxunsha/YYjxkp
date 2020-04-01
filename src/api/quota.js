import axios from '@/libs/api.request'

export const getQuotaList = () => {
  return axios.request({
    url: 'get/quota',
    method: 'post'
  })
}

// 指标类型列表(根据登录用户机构来决定)
export const indextypelist = () => {
  return axios.request({
    url: '/businesscomm/indextypelist',
    method: 'post'
  })
}

// 指标标签列表(根据登录用户机构来决定)
export const indexlabellist = () => {
  return axios.request({
    url: 'businesscomm/indexlabellist',
    method: 'post'
  })
}

// 根据dto获取可选数据采集单位列表
export const getdatacollectionorg = (data) => {
  return axios.request({
    url: 'businesscomm/getdatacollectionorg',
    method: 'post',
    data: data
  })
}

// （步骤一）新增指标模板
export const savenewtemplate = (data) => {
  return axios.request({
    url: 'indexnew/savenewtemplate',
    method: 'post',
    data: data
  })
}

// （步骤二）新建单个指标
export const saveoneindexlist = (data) => {
  return axios.request({
    url: 'indexnew/saveoneindexlist',
    method: 'post',
    data: data
  })
}

// （步骤二）修改单个指标
export const updateoneindexlist = (data) => {
  return axios.request({
    url: 'indexnew/updateoneindexlist',
    method: 'post',
    data: data
  })
}

// （步骤二）删除单个指标
export const deoneindexlist = (id) => {
  return axios.request({
    url: `indexnew/deoneindexlist/${id}`,
    method: 'post'
  })
}

// （步骤二）新建单个要点（模板）
export const saveoneperfomanceruletemplate = (data) => {
  return axios.request({
    url: 'indexnew/saveoneperfomanceruletemplate',
    method: 'post',
    data: data
  })
}

// （步骤二）修改单个要点（模板）
export const updateoneperfomanceruletemplate = (data) => {
  return axios.request({
    url: 'indexnew/updateoneperfomanceruletemplate',
    method: 'post',
    data: data
  })
}

// （步骤三）提交到数据采集单位
export const submitthenewtemplate = (data) => {
  return axios.request({
    url: 'indexnew/submitthenewtemplate',
    method: 'post',
    data: data
  })
}

// （步骤二）删除单个要点（模板）
export const deloneperfomanceruletemplate = (id) => {
  return axios.request({
    url: `indexnew/deloneperfomanceruletemplate/${id}`,
    method: 'post'
  })
}

// 新指标-指标模板初稿列表
export const getnewindexlistfirstdraft = (data) => {
  return axios.request({
    url: 'indexnew/getnewindexlistfirstdraft',
    method: 'post',
    data: data
  })
}

// 指标单位-列表
export const indexlablelist = (data) => {
  return axios.request({
    url: 'indexlable/list',
    method: 'post',
    data: data
  })
}

// 指标单位-详情
export const indexlableinfo = (id) => {
  return axios.request({
    url: `indexlable/info/${id}`,
    method: 'post'
  })
}

// 新指标-根据机构id和类型获取被考核单位(人)和数据采集单位（人）列表 如果指标类型是科室指标那么就是人,如果类型是其他就是机构
export const getorgorpersonlistbyorgandtypes = (data) => {
  return axios.request({
    url: `indexnew/getorgorpersonlistbyorgandtypes`,
    method: 'post',
    data: data
  })
}

// 数据采集-维护内容-维护内容
export const perfomanceruleset = (data) => {
  return axios.request({
    url: `indexnew/perfomanceruleset`,
    method: 'post',
    data: data
  })
}

// 指标发布前-批示与反馈
export const indexinstruction = (data) => {
  return axios.request({
    url: `indexnew/indexinstruction`,
    method: 'post',
    data: data
  })
}

// 维护分值-提交到被考核单位确认
export const submittoassessment = (data) => {
  return axios.request({
    url: `indexnew/submittoassessment`,
    method: 'post',
    data: data
  })
}

// 数据采集-维护内容-提交到分值维护
export const submitperfomanceruletoaudit = (id) => {
  return axios.request({
    url: `indexnew/submitperfomanceruletoaudit/${id}`,
    method: 'post'
  })
}

// 考核确认-被考核单位确认
export const assessmentmakesure = (id) => {
  return axios.request({
    url: `indexnew/assessmentmakesure/${id}`,
    method: 'post'
  })
}

// 指标发布-指标发布
export const indexrelease = (id) => {
  return axios.request({
    url: `indexnew/indexrelease/${id}`,
    method: 'post'
  })
}

// 维护分值-维护分值(根据要点模板id来维护)
export const rulescoreset = (data) => {
  return axios.request({
    url: `indexnew/rulescoreset`,
    method: 'post',
    data: data
  })
}

// 今年指标-指标池-根据当前用户返回上级指派给我作为考核单位的已发布的指标
export const getassessmentthisyearbyuporg = () => {
  return axios.request({
    url: `indexthisyear/getassessmentthisyearbyuporg`,
    method: 'post'
  })
}

// 今年指标-指标详情-返回机构ID对应的下属机构(如果下面只有科室那就不返回)
export const getorglistthisyearbyorgid = (orgId) => {
  return axios.request({
    url: `indexthisyear/getorglistthisyearbyorgid/${orgId}`,
    method: 'post'
  })
}

// 今年指标-指标详情-根据机构ID返回已发布的指标详情
export const getindexinfothisyearbyorgid = (orgId) => {
  return axios.request({
    url: `indexthisyear/getindexinfothisyearbyorgid/${orgId}`,
    method: 'post'
  })
}

// 根据ruleTemplateId获取对应的要点详情
export const getruleinfobyruletemplateid = (ruleTemplateId) => {
  return axios.request({
    url: `indexnew/getruleinfobyruletemplateid/${ruleTemplateId}`,
    method: 'post'
  })
}

// 历史指标-根据当前登录机构和年份获取对应的历史指标
export const getindexinfooveryearbyyear = (year) => {
  return axios.request({
    url: `indexoveryear/getindexinfooveryearbyyear/${year}`,
    method: 'post'
  })
}

// （发布之前都可）修改要点，分值，目标内容
export const updateindexbyruleid = (data) => {
  return axios.request({
    url: `indexnew/updateindexbyruleid`,
    method: 'post',
    data: data
  })
}
