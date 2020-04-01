const mixin_table = {
  methods: {
    // 表格斑马纹
    rowClassName (row, index) {
      if (index % 2 === 0) {
        return 'tb-row-odd'
      } else if (index % 2 === 1) {
        return 'tb-row-even'
      }
      return ''
    }
  }
}

export default mixin_table
