export const sliderMenuList = {
  'status': 200,
  'code': 99999,
  'data': [
    {
      'icon': 'md-settings',
      'name': 'system',
      'meta': {
        'title': '系统设置',
        'icon': 'md-settings'
      },
      'children': [
        {
          'icon': 'md-settings',
          'name': 'settings',
          'meta': {
            'title': '',
            'icon': 'md-settings'
          },
          'children': [{
            'icon': 'md-settings',
            'name': 'settings_page',
            'meta': {
              'title': '流程设置',
              'icon': 'md-settings'
            }
          }]
        }, {
          'icon': 'md-notifications',
          'name': 'roles',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'roles_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '角色管理'
            }
          }]
        }, {
          'icon': 'md-notifications',
          'name': 'account',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'account_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '账户管理'
            }
          }]
        }, {
          'icon': 'md-notifications',
          'name': 'menu',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'menu_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '资源管理'
            }
          }]
        }, {
          'icon': 'md-notifications',
          'name': 'data_maintenance',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'data_maintenance_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '数据维护'
            }
          }]
        }, {
          'icon': 'md-notifications',
          'name': 'dictionary_list',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'dictionary_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '字典维护'
            }
          }]
        }]
    },
    {
      'icon': 'md-settings',
      'name': 'agency',
      'meta': {
        'title': '职能机构',
        'icon': 'md-settings'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'agency_list',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'agency_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '机构列表'
            }
          }]
        }
      ]
    },
    {
      'icon': 'md-settings',
      'name': 'quota_management',
      'meta': {
        'title': '指标管理',
        'icon': 'md-settings'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'quota_tags_list',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'tags_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标标签库'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'quota_tag_detail',
          'meta': {
            'icon': 'md-notifications',
            'title': '',
            'hideInMenu': 'true'
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'detail_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标-标签详情'
            }
          }]
        },
        // 标签汇总
        {
          'icon': 'md-notifications',
          'name': 'quota_summary',
          'meta': {
            'icon': 'md-notifications',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'summary_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标汇总'
            }
          }]
        },
        // 今年指标
        {
          'icon': 'md-notifications',
          'name': 'this_year_quota_pool_list',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'this_year_pool_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标池'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'this_year_organization',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'this_year_organization_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '机构指标详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'this_year_office',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'this_year_office_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '科室指标详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'this_year_quota_detail',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'this_year_quota_detail_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标-查看详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'this_year_private_quota',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'this_year_private_quota_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '个人指标-指标详情'
            }
          }]
        },
        // 历史指标
        {
          'icon': 'md-notifications',
          'name': 'history_quota_pool_list',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'history_pool_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '历史指标-指标池'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'history_organization',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'history_organization_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '历史指标-机构指标详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'history_office',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'history_office_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '历史指标-科室指标详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'history_quota_detail',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'history_quota_detail_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '历史指标-指标-查看详情'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'history_private_quota',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'history_private_quota_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '历史指标-个人指标-指标详情'
            }
          }]
        },
        // 新建指标（引导页）
        {
          'icon': 'md-notifications',
          'name': 'new_quota_guide_organization',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'new_quota_guide_organization_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '新建区县市指标模板'
            }
          }]
        },
        // 新建模板
        {
          'icon': 'md-notifications',
          'name': 'new_quota',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'new_quota_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '新建机构指标'
            }
          }]
        },
        // 指标发布
        {
          'icon': 'md-notifications',
          'name': 'quota_public',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'quota_public_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标发布'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'confirm_quota',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'confirm_quota_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '指标确认'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'score_input',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'score_input_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '分值录入'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'create_quota_content',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'create_quota_content_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '初稿提交审核'
            }
          }]
        },
        {
          'icon': 'md-notifications',
          'name': 'update_quota_content',
          'meta': {
            'icon': 'md-notifications',
            'hideInMenu': 'true',
            'title': ''
          },
          'children': [{
            'icon': 'md-notifications',
            'name': 'update_quota_content_page',
            'meta': {
              'icon': 'md-notifications',
              'title': '维护指标内容'
            }
          }]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'performance_appraisal',
      'meta': {
        'title': '绩效考核',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'superior_backlog',
          'meta': {
            'icon': 'logo-buffer',
            'title': '上级待办'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'superior_backlog_main_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '上级待办'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'interior_assess',
          'meta': {
            'icon': 'logo-buffer',
            'title': '内部考核'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'interior_assess_main_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '内部考核'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'assess_progress',
          'meta': {
            'icon': 'logo-buffer',
            'title': '考核进度'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'assess_progress_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '考核进度'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'innovation_excellence',
      'meta': {
        'title': '创新创优',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'innovation_excellence_list',
          'meta': {
            'icon': 'logo-buffer',
            'title': '个人创新创优列表'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'innovation_excellence_list_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '个人创新创优列表'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'department_innovation_excellence_list',
          'meta': {
            'icon': 'logo-buffer',
            'title': '部门创新创优列表'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'department_innovation_excellence_list_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '部门创新创优列表'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'review',
          'meta': {
            'icon': 'ios-stats',
            'title': '审核'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'review_page',
              'meta': {
                'icon': 'ios-stats',
                'title': '审核'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'estimate',
      'meta': {
        'title': '社会评价',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'superior_estimate',
          'meta': {
            'icon': 'logo-buffer',
            'title': '上级评价'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'superior_estimate_main_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '上级评价'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'interior_estimate',
          'meta': {
            'icon': 'ios-stats',
            'title': '内部评价'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'interior_estimate_main_page',
              'meta': {
                'title': '内部评价',
                'icon': 'ios-stats'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'estimate_manage',
          'meta': {
            'icon': 'ios-stats',
            'title': '评价管理'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'estimate_manage_page',
              'meta': {
                'title': '评价管理',
                'icon': 'ios-stats'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'performance_improvement',
      'meta': {
        'title': '绩效改进',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'superior',
          'meta': {
            'icon': 'logo-buffer',
            'title': '上级指定'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'process_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '上级指定'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'internal',
          'meta': {
            'icon': 'logo-buffer',
            'title': '内部改进'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'internal_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '内部改进'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'leader',
          'meta': {
            'icon': 'logo-buffer',
            'title': '领导监管'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'leader_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '领导监管'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'statistical',
      'meta': {
        'title': '统计报表',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'scoring_collect',
          'meta': {
            'icon': 'logo-buffer',
            'title': '计分汇总'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'scoring_collect_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '计分汇总'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'scoring_audit',
          'meta': {
            'icon': 'logo-buffer',
            'title': '计分汇总(审核)'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'scoring_audit_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '计分汇总(审核)'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'scoring_particulars',
          'meta': {
            'icon': 'logo-buffer',
            'title': '计分详情汇总'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'scoring_particulars_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '计分详情汇总'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'awarded_collect',
          'meta': {
            'icon': 'logo-buffer',
            'title': '加分汇总'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'awarded_collect_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '加分汇总'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'awarded_particulars',
          'meta': {
            'icon': 'logo-buffer',
            'title': '加分详情汇总'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'awarded_particulars_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '加分详情汇总'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'statistics_chart',
          'meta': {
            'icon': 'logo-buffer',
            'title': '图表'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'statistics_chart_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '图表'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'address_list',
      'meta': {
        'title': '通讯录',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'department',
          'meta': {
            'icon': 'logo-buffer',
            'title': '当前机构'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'department_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '当前机构'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'district',
          'meta': {
            'icon': 'logo-buffer',
            'title': '益阳市'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'district_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '益阳市'
              }
            }
          ]
        }
      ]
    },
    {
      'icon': 'logo-buffer',
      'name': 'portal_management',
      'meta': {
        'title': '门户管理',
        'icon': 'logo-buffer'
      },
      'children': [
        {
          'icon': 'md-notifications',
          'name': 'performance_information',
          'meta': {
            'icon': 'logo-buffer',
            'title': '绩效资讯'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'performance_information_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '绩效资讯'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'peoples_livelihood',
          'meta': {
            'icon': 'logo-buffer',
            'title': '民生绩效'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'peoples_livelihood_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '民生绩效'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'lightspot',
          'meta': {
            'icon': 'logo-buffer',
            'title': '亮点特色'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'lightspot_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '亮点特色'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'performance_theory',
          'meta': {
            'icon': 'logo-buffer',
            'title': '绩效理论'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'performance_theory_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '绩效理论'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'know_about',
          'meta': {
            'icon': 'logo-buffer',
            'title': '了解我们'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'know_about_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '了解我们'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'to_audit',
          'meta': {
            'icon': 'logo-buffer',
            'title': '待审核'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'to_audit_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '待审核'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'activity_manage',
          'meta': {
            'icon': 'logo-buffer',
            'title': '活动管理'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'activity_manage_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': '活动管理'
              }
            }
          ]
        },
        {
          'icon': 'md-notifications',
          'name': 'banner_manage',
          'meta': {
            'icon': 'logo-buffer',
            'title': 'banner管理'
          },
          'children': [
            {
              'icon': 'md-notifications',
              'name': 'banner_manage_page',
              'meta': {
                'icon': 'logo-buffer',
                'title': 'banner管理'
              }
            }
          ]
        }
      ]
    }
  ]
}
