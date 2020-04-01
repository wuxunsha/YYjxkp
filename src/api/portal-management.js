import axios from '@/libs/api.request'

// 绩效资讯-查询全部绩效资讯
export const findInformation = (data) => {
  return axios.request({
    url: '/information/findInformationByPage',
    data,
    method: 'post'
  })
}

// 绩效资讯-查询全部分类
export const getlistbytype = (typeId) => {
  return axios.request({
    url: '/information/getlistbytype/' + typeId,
    method: 'post'
  })
}

// 绩效资讯-提交新增绩效资讯
export const addInformation = (data) => {
  return axios.request({
    url: '/information/add',
    data,
    method: 'post'
  })
}

// 绩效资讯-提交编辑绩效资讯
export const updateInformation = (data) => {
  return axios.request({
    url: '/information/update',
    data,
    method: 'post'
  })
}

// 绩效资讯-根据id查询资讯内容
export const editInformation = (data) => {
  return axios.request({
    url: '/information/findOne',
    data,
    method: 'post'
  })
}

// 绩效资讯-绩效资讯提交审核
export const informationSubmitAudit = (data) => {
  return axios.request({
    url: '/information/submitAudit',
    data,
    method: 'post'
  })
}

// 绩效资讯-绩效资讯上线
export const informationOnline = (data) => {
  return axios.request({
    url: '/information/online',
    data,
    method: 'post'
  })
}

// 绩效资讯-绩效资讯上线
export const informationOfflinet = (data) => {
  return axios.request({
    url: '/information/offlinet',
    data,
    method: 'post'
  })
}

// 绩效资讯-查询绩效资讯待审核列表
export const findAudit = (data) => {
  return axios.request({
    url: '/information/findAuditByPage',
    data,
    method: 'post'
  })
}

// 绩效资讯-绩效资讯通过审核
export const passAudit = (id) => {
  return axios.request({
    url: '/information/audit/' + id,
    method: 'post'
  })
}

// 绩效资讯-绩效资讯驳回
export const rejectAudit = (data) => {
  return axios.request({
    url: '/information/reject',
    data,
    method: 'post'
  })
}

// 了解我们-查询了解我们机构介绍全部数据
export const portalPersonFind = (data) => {
  return axios.request({
    url: '/portalPerson/findByPage',
    data,
    method: 'post'
  })
}

// 了解我们-查询了解我们公示公告全部数据
export const portalNoticeFindNotice = (data) => {
  return axios.request({
    url: '/portalNotice/findNoticeByPage',
    data,
    method: 'post'
  })
}

// 了解我们-了解我们公示公告新增人员
export const addPortalPerson = (data) => {
  return axios.request({
    url: '/portalPerson/add',
    data,
    method: 'post'
  })
}

// 了解我们-按id查询机构人员
export const portalPersonFindOne = (id) => {
  return axios.request({
    url: '/portalPerson/findOne/' + id,
    method: 'post'
  })
}

// 了解我们-保存机构接收编辑机构人员信息
export const portalPersonUpdate = (data) => {
  return axios.request({
    url: '/portalPerson/update',
    data,
    method: 'post'
  })
}

// 了解我们-了解我们机构介绍删除机构人员
export const portalPersonDelete = (id) => {
  return axios.request({
    url: '/portalPerson/delete/' + id,
    method: 'post'
  })
}

// 了解我们-提交公示公告发布通告
export const addPortalNotice = (data) => {
  return axios.request({
    url: '/portalNotice/add',
    data,
    method: 'post'
  })
}

// 了解我们-查询公示公告详情
export const portalNoticeFindOne = (id) => {
  return axios.request({
    url: '/portalNotice/findOne/' + id,
    method: 'post'
  })
}

// 了解我们-提交编辑通告
export const updatePortalNotice = (data) => {
  return axios.request({
    url: '/portalNotice/update',
    data,
    method: 'post'
  })
}

// 了解我们-发布通告
export const releasePortalNotice = (id) => {
  return axios.request({
    url: '/portalNotice/release/' + id,
    method: 'post'
  })
}

// 了解我们-下线通告
export const offlinetPortalNotice = (id) => {
  return axios.request({
    url: '/portalNotice/offlinet/' + id,
    method: 'post'
  })
}

// 了解我们-上线通告
export const onlinePortalNotice = (id) => {
  return axios.request({
    url: '/portalNotice/online/' + id,
    method: 'post'
  })
}

// 活动管理-查询活动模块数据
export const findActivityByPage = (data) => {
  return axios.request({
    url: '/activity/findActivityByPage',
    data,
    method: 'post'
  })
}

// 活动管理-新增活动
export const addActivity = (data) => {
  return axios.request({
    url: '/activity/add',
    data,
    method: 'post'
  })
}

// 活动管理-按id查询活动
export const findOneActivity = (id) => {
  return axios.request({
    url: '/activity/findOne/' + id,
    method: 'post'
  })
}

// 活动管理-新增活动
export const updateActivity = (data) => {
  return axios.request({
    url: '/activity/update',
    data,
    method: 'post'
  })
}

// 活动管理-上线活动
export const onlineActivity = (id) => {
  return axios.request({
    url: '/activity/online/' + id,
    method: 'post'
  })
}

// 活动管理-下线活动
export const offlinetActivity = (id) => {
  return axios.request({
    url: '/activity/offlinet/' + id,
    method: 'post'
  })
}

// 活动管理-查询问卷调查全部数据
export const findSurveyPortalSurvey = (data) => {
  return axios.request({
    url: '/portalSurvey/findSurveyByPage',
    data,
    method: 'post'
  })
}

// 活动管理-查询问卷调查状态下拉框数据
export const getDatadictionaryType = (type) => {
  return axios.request({
    url: '/datadictionary/getlistbytype/' + type,
    method: 'post'
  })
}

// 活动管理-新增问卷调查
export const addPortalSurvey = (data) => {
  return axios.request({
    url: '/portalSurvey/add',
    data,
    method: 'post'
  })
}

// 活动管理-提交编辑问卷调查
export const updatePortalSurvey = (data) => {
  return axios.request({
    url: '/portalSurvey/update',
    data,
    method: 'post'
  })
}

// 活动管理-根据id查询问卷
export const findPortalSurvey = (id) => {
  return axios.request({
    url: '/portalSurvey/findByList/' + id,
    method: 'post'
  })
}

// 活动管理-根据id上线问卷
export const onlinePortalSurvey = (id) => {
  return axios.request({
    url: '/portalSurvey/online/' + id,
    method: 'post'
  })
}

// 活动管理-根据id下线问卷
export const offlinetPortalSurvey = (id) => {
  return axios.request({
    url: '/portalSurvey/offlinet/' + id,
    method: 'post'
  })
}

// banner管理-查询banner图数据
export const findBannerInfo = (data) => {
  return axios.request({
    url: '/bannerInfo/findByPage',
    data,
    method: 'post'
  })
}

// banner管理-新增banner图
export const addBannerInfo = (data) => {
  return axios.request({
    url: '/bannerInfo/add',
    data,
    method: 'post'
  })
}

// banner管理-上线banner图
export const onlineBanner = (id) => {
  return axios.request({
    url: '/bannerInfo/online/' + id,
    method: 'post'
  })
}

// banner管理-下线banner图
export const offlinetBanner = (id) => {
  return axios.request({
    url: '/bannerInfo/offlinet/' + id,
    method: 'post'
  })
}

// banner管理-删除banner图
export const deleteBanner = (id) => {
  return axios.request({
    url: '/bannerInfo/delete/' + id,
    method: 'post'
  })
}

// 民生绩效-获取民生绩效页签
export const getPracProjectTab = (orgType) => {
  return axios.request({
    url: '/pracProject/getPageTags/' + orgType,
    method: 'post'
  })
}

// 民生绩效-根据页签获取民生绩效数据列表
export const getPracProjectFindPage = (data) => {
  return axios.request({
    url: '/pracProject/findPageByProject',
    data,
    method: 'post'
  })
}

// 民生绩效-根据页签获取民生绩效新增实事项目弹窗项目单位
export const getPracProjectType = (id) => {
  return axios.request({
    url: '/pracProject/findByOrgType/' + id,
    method: 'post'
  })
}

// 民生绩效-根据项目单位查询当年指标
export const getFindByIndex = (data) => {
  return axios.request({
    url: '/pracProject/findByIndex',
    data,
    method: 'post'
  })
}

// 民生绩效-提交新增实事项目
export const addPracProject = (data) => {
  return axios.request({
    url: '/pracProject/add',
    data,
    method: 'post'
  })
}

// 民生绩效-按id查询实事项目详情
export const findOnePracProject = (data) => {
  return axios.request({
    url: '/pracProject/findByPage',
    data,
    method: 'post'
  })
}

// 民生绩效-按id查询单条实事项目
export const findOneProject = (id) => {
  return axios.request({
    url: '/pracProject/findOne/' + id,
    method: 'post'
  })
}

// 民生绩效-按id编辑单条实事项目
export const updateProject = (data) => {
  return axios.request({
    url: '/pracProject/update',
    data,
    method: 'post'
  })
}

// 民生绩效-更新实事项目进度
export const updateProgress = (data) => {
  return axios.request({
    url: '/pracProject/updateProgress',
    data,
    method: 'post'
  })
}

// 民生绩效-按id移除实事项目
export const deletePracProject = (id) => {
  return axios.request({
    url: '/pracProject/delete/' + id,
    method: 'post'
  })
}

// 文件管理-条件查询文件列表
export const findAttachmentByPage = (data) => {
  return axios.request({
    url: 'attachment/findAttachmentByPage',
    data,
    method: 'post'
  })
}

// 文件管理-新增文件
export const addAttachment = (data) => {
  return axios.request({
    url: 'attachment/add',
    data,
    method: 'post'
  })
}

// 文件管理-按id查询文件
export const findOneAttachment = (id) => {
  return axios.request({
    url: 'attachment/findOne/' + id,
    method: 'post'
  })
}

// 文件管理-编辑文件
export const updateAttachment = (data) => {
  return axios.request({
    url: 'attachment/update',
    data,
    method: 'post'
  })
}

// 文件管理-发布文件
export const publishAttachment = (id) => {
  return axios.request({
    url: 'attachment/publish/' + id,
    method: 'post'
  })
}

// 文件管理-下线文件
export const offlinetAttachment = (id) => {
  return axios.request({
    url: 'attachment/offlinet/' + id,
    method: 'post'
  })
}

// 文件管理-上线文件
export const onlineAttachment = (id) => {
  return axios.request({
    url: 'attachment/online/' + id,
    method: 'post'
  })
}
