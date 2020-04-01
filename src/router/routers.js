// 示例
import ExampleRouter from './example'
// 公共路由
import { Login, Home } from './comm-router'
// 系统设置
import SystemSetting from './system-setting'
// 职能机构
import Agency from './agency'
// 创新创优
import InnovationExcellence from './innovation-excellence'
// 绩效改进
import PerformanceImprovement from './performance-improvement'
// 社会评价
import Estimate from './estimate'
// 指标管理
import QuotaManagement from './quota-management'
// 绩效考核
import PerformanceAppraisal from './performance-appraisal'
// 统计报表
import Statistical from './statistical'
// 通讯录
import AddressList from './address-list'
// 通知公告
import Notice from './notice'
// 工作日志
import WorkLog from './work-log'
// 门户管理
import PortalManagement from './portal-management'
// 安全审计
import SecurityAudit from './security-audit'
// 错误页
import ErrorPage from './error-page'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export const constantsRouter = [
  Login,
  Home,
  ExampleRouter
]

export const asyncRouter = [
  SystemSetting,
  Agency,
  InnovationExcellence,
  PerformanceImprovement,
  Estimate,
  QuotaManagement,
  PerformanceAppraisal,
  Statistical,
  AddressList,
  Notice,
  WorkLog,
  PortalManagement,
  SecurityAudit,
  ErrorPage
]
