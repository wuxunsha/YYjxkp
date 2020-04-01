import Main from '@/components/main'
import Example from '@/components/example'

const ExampleRouter = {
  path: '',
  name: '示例',
  meta: {
    title: '示例',
    notCache: true,
    resCode: 'example'
  },
  component: Main,
  children: [
    {
      path: '/message',
      name: 'message',
      component: Example,
      meta: {
        resCode: 'example'
      },
      children: [
        {
          path: 'message_page',
          name: 'message_page',
          meta: {
            icon: 'md-notifications',
            title: '消息中心',
            resCode: 'example'
          },
          component: () => import('@/view/example/single-page/message/index.vue')
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      meta: {
        icon: 'logo-buffer',
        title: '组件',
        resCode: 'example'
      },
      component: Example,
      children: [
        {
          path: 'tree_select_page',
          name: 'tree_select_page',
          meta: {
            icon: 'md-arrow-dropdown-circle',
            title: '树状下拉选择器',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/tree-select/index.vue')
        },
        {
          path: 'count_to_page',
          name: 'count_to_page',
          meta: {
            icon: 'md-trending-up',
            title: '数字渐变',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/count-to/count-to.vue')
        },
        {
          path: 'drag_list_page',
          name: 'drag_list_page',
          meta: {
            icon: 'ios-infinite',
            title: '拖拽列表',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/drag-list/drag-list.vue')
        },
        {
          path: 'drag_drawer_page',
          name: 'drag_drawer_page',
          meta: {
            icon: 'md-list',
            title: '可拖拽抽屉',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/drag-drawer')
        },
        {
          path: 'org_tree_page',
          name: 'org_tree_page',
          meta: {
            icon: 'ios-people',
            title: '组织结构树',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/org-tree')
        },
        {
          path: 'tree_table_page',
          name: 'tree_table_page',
          meta: {
            icon: 'md-git-branch',
            title: '树状表格',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/tree-table/index.vue')
        },
        {
          path: 'cropper_page',
          name: 'cropper_page',
          meta: {
            icon: 'md-crop',
            title: '图片裁剪',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/cropper/cropper.vue')
        },
        {
          path: 'tables_page',
          name: 'tables_page',
          meta: {
            icon: 'md-grid',
            title: '多功能表格',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/tables/tables.vue')
        },
        {
          path: 'split_pane_page',
          name: 'split_pane_page',
          meta: {
            icon: 'md-pause',
            title: '分割窗口',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/split-pane/split-pane.vue')
        },
        {
          path: 'markdown_page',
          name: 'markdown_page',
          meta: {
            icon: 'logo-markdown',
            title: 'Markdown编辑器',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/markdown/markdown.vue')
        },
        {
          path: 'editor_page',
          name: 'editor_page',
          meta: {
            icon: 'ios-create',
            title: '富文本编辑器',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/editor/editor.vue')
        },
        {
          path: 'icons_page',
          name: 'icons_page',
          meta: {
            icon: '_bear',
            title: '自定义图标',
            resCode: 'example'
          },
          component: () => import('@/view/example/components/icons/icons.vue')
        }
      ]
    },
    {
      path: '/update',
      name: 'update',
      meta: {
        icon: 'md-cloud-upload',
        title: '数据上传',
        resCode: 'example'
      },
      component: Example,
      children: [
        {
          path: 'update_table_page',
          name: 'update_table_page',
          meta: {
            icon: 'ios-document',
            title: '上传Csv',
            resCode: 'example'
          },
          component: () => import('@/view/example/update/update-table.vue')
        },
        {
          path: 'update_paste_page',
          name: 'update_paste_page',
          meta: {
            icon: 'md-clipboard',
            title: '粘贴表格数据',
            resCode: 'example'
          },
          component: () => import('@/view/example/update/update-paste.vue')
        }
      ]
    },
    {
      path: '/excel',
      name: 'excel',
      meta: {
        icon: 'ios-stats',
        title: 'EXCEL导入导出',
        resCode: 'example'
      },
      component: Example,
      children: [
        {
          path: 'upload-excel',
          name: 'upload-excel',
          meta: {
            icon: 'md-add',
            title: '导入EXCEL',
            resCode: 'example'
          },
          component: () => import('@/view/example/excel/upload-excel.vue')
        },
        {
          path: 'export-excel',
          name: 'export-excel',
          meta: {
            icon: 'md-download',
            title: '导出EXCEL',
            resCode: 'example'
          },
          component: () => import('@/view/example/excel/export-excel.vue')
        }
      ]
    }
  ]
}

export default ExampleRouter
