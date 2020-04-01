<style lang="" scoped>
</style>
<template>
  <Table
    ref="selection"
    :id="tableId"
    :columns="column"
    :data="list"
    :border="true"
    :disabled-hover="true"
     :loading="loading"
    @on-selection-change="onSelectionChage"
  >
    <template v-for="(value, name) in header" slot-scope="{ row, index }" :slot="name">
      <div :key="name">
        <Input type="text" v-model="editCols[name]" v-if="editIndex === index"></Input>
        <span v-else>{{ row[name] }}</span>
      </div>
    </template>
    <!-- <template v-if="editRow" slot-scope="{ row, index }" slot="operation">
      <slot v-bind:row="index"></slot>
    </template> -->
  </Table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dynamin_table',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editIndex: {
      type: Number,
      default: () => {
        return -1
      }
    }
  },
  computed: {
    quotaStore () {
      return this.$store.state.quota
    },
    column () {
      return this.quotaStore.columns
    },
    list () {
      return this.quotaStore.list
    },
    header () {
      return this.option.header
    },
    editRow () {
      return this.option.editRow || false
    },
    ...mapGetters([
      'getQuotaList'
    ])
  },
  data () {
    return {
      tableId: new Date().getTime(),
      editCols: {},
      score: '',
      loading: true
    }
  },
  watch: {
    getQuotaList (newVal) {
      setTimeout(() => {
        this.mergeTable()
      }, 1000)
    }
  },
  created () {
    setTimeout(() => {
      this.mergeTable()
    }, 1000)
  },
  methods: {
    mergeTable () {
      this.$nextTick(vm => {
        let keys = []
        let indexs = []
        this.column.forEach((item, key) => {
          keys.push(item.key)
          indexs.push(key)
        })
        let mergeCellIndex = []
        // 过滤不需要合并的列
        keys.forEach((item, key) => {
          if (item === 'operation' || item === 'selection') {
            mergeCellIndex.push(key)
            indexs.splice(indexs.indexOf(key), 1)
          } else {
            let noMergeCells = (this.option.mergeCell && this.option.mergeCell.noMergeCellName) || indexs
            if (noMergeCells.includes(item)) {
              mergeCellIndex.push(key)
              indexs.splice(indexs.indexOf(key), 1)
            }
          }
        })
        let self = this
        $(`#${this.tableId} div .ivu-table-body table`).tablesMergeCell({
          automatic: true,
          cols: indexs
        })
        setTimeout(() => {
          self.loading = false
        }, 1500)
        // console.log('now column>>>>>>>>', keys, indexs, mergeCellIndex)
      })
    },
    onSelectionChage (selection) {
      this.$emit('on-selection-change', selection)
    }/* ,
    onRowClick (row, index) {
      console.log('单元格内修改')
      // if (this.editRow) {
      //   this.editRow.cols.forEach(item => {
      //     this.editCols[item] = row[item]
      //   })
      //   this.$emit('update:editIndex', index)
      // }
    } */
  }
}
</script>
