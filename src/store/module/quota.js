
export default {
  state: {
    list: [],
    columns: [],
    rows: [],
    header: {},
    rules: []
  },
  getters: {
    getQuotaList: state => {
      return state.list
    }
  },
  mutations: {
    setQuota (state, data) {
      state.list = data
    },
    setTableHeader (state, data) {
      state.header = { ...data }
    },
    getMergeRules1 (state) {
      // 要过滤的key
      let blacklist = ['id', 'level4', 'level5']
      // 以第一行数据为基准确定合并规则
      // let rowData = state.list[0]

      // 获取对象的key集合
      const getObjKeys = obj => {
        return Object.keys(obj)
      }
      // 获取key的index
      const getIndexOfKey = (obj, key) => {
        let keys = getObjKeys(obj)
        return keys.indexOf(key)
      }
      // 过滤key
      const filterBlackList = list => {
        blacklist.forEach(item => {
          for (let i in list) {
            if (item === i) {
              delete list[i]
            }
          }
        })
        return list
      }
      // 要对比的单元格数据
      let compareCell = {}
      let rules = []
      // 当前单元格的合并规则
      let currentRowSpan = 0
      let partRowSpan = 0

      // 初始化规则
      const initRules = (item, rowIndex) => {
        compareCell = filterBlackList(item)
        let rowRules = []
        for (let k in compareCell) {
          rowRules.push(createCellRule(k, rowIndex))
          if (getIndexOfKey(compareCell, k) === 0) {
            rules.push(rowRules)
          }
          // 第1行数据
          if (rowIndex === 0) {
            rules[rowIndex][getIndexOfKey(compareCell, k)].rowspan = 1
            rules[rowIndex][getIndexOfKey(compareCell, k)].colspan = 1
            if (getIndexOfKey(compareCell, k) === 0) {
              console.log(currentRowSpan, rowIndex, compareCell[k], state.list[rowIndex])
            }
          }
          // >1行的数据
          if (rowIndex > 0) {
            if (getIndexOfKey(compareCell, k) === 0) {
              currentRowSpan = ++currentRowSpan
            }
            // 对比当前行和前一行k的值，如果相同，则重置前一行该单元格的行合并值、列合并值，当前行该单元格的行合并值、列合并值递增1
            // 如果行号没有发生变化currentRowSpan不会发生变化
            if (compareCell[k] === state.list[rowIndex - 1][k]) {
              if (partRowSpan === 0) {
                // 前一行
                rules[rowIndex - 1][getIndexOfKey(compareCell, k)].rowspan = 0
                rules[rowIndex - 1][getIndexOfKey(compareCell, k)].colspan = 0
                // 当前行
                rules[rowIndex][getIndexOfKey(compareCell, k)].rowspan = currentRowSpan
                rules[rowIndex][getIndexOfKey(compareCell, k)].colspan = 1
              } else {
                // 前一行
                rules[rowIndex - 1][getIndexOfKey(compareCell, k)].rowspan = 0
                rules[rowIndex - 1][getIndexOfKey(compareCell, k)].colspan = 0
                // 当前行
                rules[rowIndex][getIndexOfKey(compareCell, k)].rowspan = partRowSpan
                rules[rowIndex][getIndexOfKey(compareCell, k)].colspan = 1
              }
              if (k === 'level3') {
                // console.log(currentRowSpan, rowIndex, compareCell[k], state.list[rowIndex][k])
              }
            } else {
              // if (k === 'level3') {
              partRowSpan = rowIndex - 1
              console.log(`%c rowIndex: ${rules[rowIndex][getIndexOfKey(compareCell, k)].rowIndex} , columnIndex: ${rules[rowIndex][getIndexOfKey(compareCell, k)].columnIndex} rowspan: ${rules[rowIndex][getIndexOfKey(compareCell, k)].rowspan} , colspan: ${rules[rowIndex][getIndexOfKey(compareCell, k)].colspan} , currentRowSpan: ${currentRowSpan}`, 'color: green')
              // console.log(currentRowSpan, i, compareCell[k])
              rules[rowIndex - 1][getIndexOfKey(compareCell, k)].rowspan = partRowSpan
              rules[rowIndex - 1][getIndexOfKey(compareCell, k)].colspan = 1
              // 当前行
              rules[rowIndex][getIndexOfKey(compareCell, k)].rowspan = 1
              rules[rowIndex][getIndexOfKey(compareCell, k)].colspan = 1
              // if (compareCell[k] !== state.list[rowIndex - 1][k]) {
              // console.log(currentRowSpan, rowIndex, compareCell[k], state.list[rowIndex][k])
              currentRowSpan = 0
              //   compareCell = state.list[i]
              // }
              // currentRowSpan = 0
              // }
            }
          }
        }
      }

      // 创建单个单元格规则
      const createCellRule = (k, rowIndex) => {
        return {
          rowIndex: rowIndex,
          columnIndex: getIndexOfKey(compareCell, k),
          rowspan: 1,
          colspan: 1
        }
      }

      // 遍历规则
      for (let i = 0; i < state.list.length; i++) {
        if (i < state.list.length) {
          // 初始化规则
          initRules(state.list[i], i)
        }
      }
      state.rules = rules
    },
    getMergeRules (state) {
      // 单元格合并规则
      let rules = []
      const eachRow = list => {
        // 行数据，用于获取规则时遍历不同行
        let rowData = list[0]
        // 过滤id和空字段，得到第一条可能产生合并的row
        let ruleRow = {}
        for (let k in rowData) {
          if (k !== 'id' && k !== 'level4' && k !== 'level5' && rowData[k] !== '') {
            ruleRow[k] = rowData[k]
          }
        }
        // console.log('rule row: ', ruleRow)

        // 遍历每个单元格
        const eachCell = (list, ruleKey, index) => {
          if (list.length === 0) return
          let _arr = []
          let totalRows = state.list.length
          const nextCell = (list) => {
            for (let k = 0; k < list.length; k++) {
              if (state.list[k][ruleKey] !== ruleRow[ruleKey]) {
                _arr = list.slice(k)
                // k为单元格所跨行数，值为1不需要合并。这里过滤掉
                if (k > 1) {
                  let ri = totalRows - _arr.length === 35 ? 0 : totalRows - _arr.length - k
                  let cellRule = {
                    rowspan: k,
                    colspan: 1,
                    rowIndex: ri,
                    columnIndex: index
                  }
                  rules.push(cellRule)
                  // console.log('>>>>>>>>>>>>', 'k:', k, ' v:', list[k - 1][ruleKey], ' rule:', cellRule)
                }
                nextCell(_arr)
                break
              } else {
                // 当前列需整列合并时
                if (k === list.length - 1) {
                  let ri = totalRows - _arr.length === 35 ? 0 : totalRows - _arr.length
                  let cellRule = {
                    rowspan: ++k,
                    colspan: 1,
                    rowIndex: ri,
                    columnIndex: index
                  }
                  rules.push(cellRule)
                }
              }
            }
          }
          nextCell(list)
        }

        const COLUMNS = Object.keys(ruleRow)

        for (let ruleKey in ruleRow) {
          // console.log(`%c ---------- ${ruleKey}`, 'color: orange')
          let index = COLUMNS.indexOf(ruleKey)
          eachCell(state.list, ruleKey, index)
        }
      }
      eachRow(state.list)
      state.rules = rules
    },
    createColumn (state, options) {
      // 需要显示的列名
      let header = options.header
      // 是否有自定义功能
      let operation = options.colOperation || { status: false }
      // 是否需要显示单元格提示
      let tooltips = options.colToolTips || { status: false }
      // 是否需要复选框
      let checkbox = options.checkbox || { status: false }
      // 是否会修改行数据
      let editCells = options.editRow || { status: false }
      // 指定的列如果为空则不生成列
      let dynamicCols = options.dynamicCols || { status: false }
      // 单元格自定义插槽
      let colSlot = options.colSlot || []
      // let c = (state.list && state.list[0]) || []
      let firstData = (state.list && state.list[0]) || []
      let c = header
      let k = Object.keys(c)
      let columns = []
      k.forEach(item => {
        // 排除非指定列
        // if (header[item] === undefined) return false
        // 对于指定的列，可以配置字段为空时排除此列
        if (dynamicCols.status && dynamicCols.cols.includes(item) && !firstData[item]) return false
        // 目标任务添加tooltip
        let tip = tooltips.status && tooltips.cols.includes(item) ? { ellipsis: true, tooltip: true } : {}
        // 需要修改的单元格
        let editCell = editCells.status && editCells.cols.includes(item) ? { slot: item } : {}
        // 单元格自定义插槽
        let renderIndex = colSlot.findIndex(rc => rc.key === item)
        let render = renderIndex > -1 ? { render: colSlot[renderIndex].render } : {}
        // 生成表格的列
        columns.push({
          title: header[item],
          key: item,
          align: 'center',
          ...editCell,
          ...tip,
          ...render
        })
      })
      // 添加操作按钮
      if (operation.status) {
        columns.push({
          title: '操作',
          key: 'operation',
          align: 'center',
          // slot: 'operation'
          render: operation.render
        })
      }
      // 复选框
      if (checkbox.status) {
        let chceckbox = {
          key: 'selection',
          type: 'selection',
          width: 60,
          align: 'center'
        }
        columns.splice(checkbox.colIndex, 0, chceckbox)
      }
      console.log('=============', columns)
      state.columns = columns
    }
  },
  actions: {}
}
