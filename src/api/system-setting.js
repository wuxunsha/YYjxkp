import axios from '@/libs/api.request'

/* 核心公共参数 */
// 获取授权资源树结构(根据登录用户机构来决定)
export const getresourcetree = (data) => {
  return axios.request({
    url: `/syscomm/getresourcetree`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 获取登录用户上级机构用户列表
export const getaccountlistbyorgid = (id) => {
  return axios.request({
    url: `/syscomm/getaccountlistbyorgid/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 获取所有角色列表(根据登录用户机构来决定)
export const getrolelist = (data) => {
  return axios.request({
    url: `/syscomm/getrolelist`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 新指标-获取当前登录用户本级节点详情
export const getloginnewindexnodesinfopeer = () => {
  return axios.request({
    url: `indexnew/getloginnewindexnodesinfopeer`,
    method: 'post'
  })
}

// 新指标-获取当前登录用户上级节点详情
export const getloginnewindexnodesinfoup = () => {
  return axios.request({
    url: `indexnew/getloginnewindexnodesinfoup`,
    method: 'post'
  })
}

/* 基础数据维护 */
// 新增单位指标
export const indexperuintAdd = (data) => {
  return axios.request({
    url: `/indexperuint/add`,
    data: data,
    method: 'post'
  })
}

// 删除单位指标
export const indexperuintDel = (id) => {
  return axios.request({
    url: `/indexperuint/del/${id}`,
    method: 'post'
  })
}
// 单位指标详情
export const indexperuintInfo = (id) => {
  return axios.request({
    url: `/indexperuint/info/${id}`,
    method: 'post'
  })
}
// 单位指标列表
export const indexperuintList = (data) => {
  return axios.request({
    url: `/indexperuint/list`,
    data: data,
    method: 'post'
  })
}
// 修改单位指标
export const indexperuintUpdate = (data) => {
  return axios.request({
    url: `/indexperuint/update`,
    data: data,
    method: 'post'
  })
}

// 新增标签
export const indexlableAdd = (data) => {
  return axios.request({
    url: `/indexlable/add`,
    data: data,
    method: 'post'
  })
}

// 删除标签
export const indexlableDel = (id) => {
  return axios.request({
    url: `/indexlable/del/${id}`,
    method: 'post'
  })
}
// 标签详情
export const indexlableInfo = (id) => {
  return axios.request({
    url: `/indexlable/info/${id}`,
    method: 'post'
  })
}
// 标签列表
export const indexlableList = (data) => {
  return axios.request({
    url: `/indexlable/list`,
    data: data,
    method: 'post'
  })
}
// 修改标签
export const indexlableUpdate = (data) => {
  return axios.request({
    url: `/indexlable/update`,
    data: data,
    method: 'post'
  })
}

/* 账户设置 */
// 新增用户
export const accountAdd = (data) => {
  return axios.request({
    url: `/account/add`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 删除用户
export const accountDel = (id) => {
  return axios.request({
    url: `/account/del/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查看用户
export const accountInfo = (id) => {
  return axios.request({
    url: `/account/info/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查询用户列表
export const accountList = (data) => {
  return axios.request({
    url: `/account/list`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改用户
export const accountUpdate = (data) => {
  return axios.request({
    url: `/account/update`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 重置密码
export const accountResetpassword = (id) => {
  return axios.request({
    url: `/account/resetpassword/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

/* 角色设置 */
// 新增角色
export const roleAdd = (data) => {
  return axios.request({
    url: `/role/add`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 删除角色
export const roleDel = (id) => {
  return axios.request({
    url: `/role/del/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查看角色
export const roleInfo = (id) => {
  return axios.request({
    url: `/role/info/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查询角色列表
export const roleList = (data) => {
  return axios.request({
    url: `/role/list`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改角色
export const roleUpdate = (data) => {
  return axios.request({
    url: `/role/update`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

/* 机构控制 */
// 新增机构
export const oranizationAdd = (data) => {
  return axios.request({
    url: `/oranization/add`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 删除机构
export const oranizationDel = (id) => {
  return axios.request({
    url: `/oranization/del/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查看机构
export const oranizationInfo = (id) => {
  return axios.request({
    url: `/oranization/info/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查询机构列表
export const oranizationList = (data) => {
  return axios.request({
    url: `/oranization/list`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改机构
export const oranizationUpdate = (data) => {
  return axios.request({
    url: `/oranization/update`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 组织结构列表
export const oranizationListTree = (data) => {
  return axios.request({
    url: `/oranization/listtree`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

/* 资源（菜单）控制 */
// 新增菜单
export const resourceAdd = (data) => {
  return axios.request({
    url: `/resource/add`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 删除菜单
export const resourceDel = (id) => {
  return axios.request({
    url: `/resource/del/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查看菜单
export const resourceInfo = (id) => {
  return axios.request({
    url: `/resource/info/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查询菜单列表
export const resourceList = (data) => {
  return axios.request({
    url: `/resource/list`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改菜单
export const resourceUpdate = (data) => {
  return axios.request({
    url: `/resource/update`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改菜单
export const resourceSetorderno = (id, orderno) => {
  return axios.request({
    url: `/resource/setorderno/${id}/${orderno}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

/* 数据字典 */
// 新增数据字典
export const datadictionaryAdd = (data) => {
  return axios.request({
    url: `/datadictionary/add`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 删除数据字典
export const datadictionaryDel = (id) => {
  return axios.request({
    url: `/datadictionary/del/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查看数据字典
export const datadictionaryInfo = (id) => {
  return axios.request({
    url: `/datadictionary/info/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 查询数据字典列表
export const datadictionaryList = (data) => {
  return axios.request({
    url: `/datadictionary/list`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改数据字典
export const datadictionaryUpdate = (data) => {
  return axios.request({
    url: `/datadictionary/update`,
    data: Object.assign(data, { isPublicApi: true }),
    method: 'post'
  })
}

// 修改数据字典
export const datadictionarySetorderno = (id, orderno) => {
  return axios.request({
    url: `/datadictionary/setorderno/${id}/${orderno}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 根据类型返回对应数据字典(不分页)
export const datadictionaryGetlistbytype = (type) => {
  return axios.request({
    url: `/datadictionary/getlistbytype/${type}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 可选机构类型(根据登录用户机构来决定)
export const getorgtypelistbylogin = () => {
  return axios.request({
    url: `/syscomm/getorgtypelistbylogin`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 可选机构类型(根据登录用户机构上级结构来决定)
export const getorgtypelistbyloginup = () => {
  return axios.request({
    url: `syscomm/getorgtypelistbyloginup`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 可选机构类型(根据机构id)
export const getorgtypelistbyOrgId = (id) => {
  return axios.request({
    url: `syscomm/getorgtypelistbyOrgId/${id}`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 科室列表(根据登录用户机构来决定)
export const getdeplist = () => {
  return axios.request({
    url: `/syscomm/getdeplist`,
    data: { isPublicApi: true },
    method: 'post'
  })
}
// 机构列表 (根据登录用户机构来决定 获取的是下级机构还是下级科室)
export const getoranizationlistdepororg = () => {
  return axios.request({
    url: `/syscomm/getoranizationlistdepororg`,
    data: { isPublicApi: true },
    method: 'post'
  })
}

// 指标管理（绩效考核）流程根据登录用户获取节点设置人(单位） type（1,指标管理;2,绩效考核;）
export const getindexbatchnodeslist = (type) => {
  return axios.request({
    url: `orgprocess/getindexbatchnodeslist/${type}`,
    method: 'post'
  })
}

// 指标管理（绩效考核）-节点详情列表 type（1,指标管理;2,绩效考核;）
export const getindexbatchnodesinfolist = (type) => {
  return axios.request({
    url: `orgprocess/getindexbatchnodesinfolist/${type}`,
    method: 'post'
  })
}

// 指标管理（绩效考核）-绩效考核-流程获取节点设置人(单位)
export const setbatchnodeslist = (data) => {
  return axios.request({
    url: `orgprocess/setbatchnodeslist`,
    method: 'post',
    data: data
  })
}

// 指标管理（绩效考核）-指标管理-流程获取节点设置人(单位)）
export const setindexnodeslist = (data) => {
  return axios.request({
    url: `orgprocess/setindexnodeslist`,
    method: 'post',
    data: data
  })
}

// 得到执行人
export const getOptPeople = () => {
  return axios.request({
    url: `socie/getOptPeople`,
    method: 'post'
  })
}

// 设置流程各节点执行人
export const setOptPeopleProcess = (data) => {
  return axios.request({
    url: `socie/setOptPeopleProcess`,
    method: 'post',
    data: data
  })
}

// 得到用户已设置流程节点
export const getindexbatchnodesinfolistsocie = (types) => {
  return axios.request({
    url: `socie/getindexbatchnodesinfolist/${types}`,
    method: 'post'
  })
}
