<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/.ivu-modal-body {
  padding: 0;
}
/deep/.ivu-modal-header {
  border-bottom: 0;
  padding: 0;
}
/deep/.ivu-modal-footer {
  border-top: 0;
  display: none;
}
.ivu-form-item {
  margin-top: 4px;
  margin-bottom: 0;
}
/deep/.ivu-form-item-label {
  width: 80px;
  text-align: right;
}
/deep/.ivu-form-item-content {
  margin-left: 80px;
}
/deep/.ivu-icon {
  margin-right: 6px;
}
/deep/.ivu-form-item {
  margin-bottom: 24px;
}
// 页签栏
.tabs {
  background-color: #fff;
  padding-top: 10px;
  .tabs-title {
    padding-bottom: 8px;
    text-align: center;
    font-size: 16px;
    color:rgba(9,114,231,1);
    cursor: pointer;
  }
  .active {
    color: #FF9B29;
    border-bottom: 2px solid #FF9B29;
  }
}
/* 新增实事项目弹窗 */
.modal-information {
  /deep/.ivu-modal-content {
    padding: 30px 60px;
  }
  .modal-title {
    color: #333;
    text-align: center;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 0;
  }
  .modal-content {
    text-align: left;
    .annunciate {
      margin-top: 10px;
      /deep/textarea.ivu-input {
        margin-top: 10px;
        min-height: 200px;
        resize: none;
      }
    }
    .targetData {
      margin-top: 10px;
      .target-input {
        width: 100%;
      }
    }
  }
  div.modal-content {
    text-align: left;
  }
  .modal-footer {
    text-align: center;
    margin-top: 40px;
    .add-btn {
      width: 382px;
      height: 56px;
      border: none;
      border-radius: 8px;
      background: rgba(9, 114, 231, 1);
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

<template>
  <div>
    <Row class="header-search">
      <Col span="7" class="col">
        <span class="span span-max" style="text-align: center;">年份</span>
        <Input v-model='queryInfo.years' size="large" placeholder="请输入年份" clearable />
      </Col>
      <Col span="7" class="col" offset="1">
        <span class="span span-max" style="text-align: center;">区域名称</span>
        <Input v-model='queryInfo.area' size="large" placeholder="请输入区域名称" clearable />
      </Col>
      <Col span="8" style="text-align: center;" offset="1">
        <Button type="primary" class="custome-btn" @click="inquire">查询</Button>
        <Button class="custome-btn custome-btn-default" @click="empty">清空</Button>
      </Col>
    </Row>
    <Row class='tabs'>
      <Col span='3' :class="index === nowIndex ? 'tabs-title active' : 'tabs-title'" v-for="(item, index) in tabList" :key="item.orgId" @click.native="tableBtn(item.orgType,index,item.status)">
        <span>{{item.orgName}}</span>
      </Col>
    </Row>
    <Row class="content">
      <Col class="btn-add">
        <Button type="primary" class="add" @click="showPracticalModal" v-if="btnShow(115102101)">
          <i class="icon-font iconxinzeng"></i>
          新增实事项目
        </Button>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="pracData" :border="false">
          <template slot='operation' slot-scope="{row}">
            <Icon class="icon-font iconchakanyanjingshishifenxi" size="24" color="#0972E7" @click="questionnaire(row.orgId, row.years)" title="查看详情" v-if="btnShow(115102105)"/>
          </template>
        </Table>
      </Col>
      <Col class="page">
        <Page
          :total="total"
          :page-size="queryInfo.size"
          :current="queryInfo.page"
          prev-text="上一页"
          next-text="下一页"
          @on-change='handlePageChange'
          @on-page-size-change='handleSizeChange'
          show-sizer
          show-total
          show-elevator
          :page-size-opts="[10, 20, 30, 50]"
        />
      </Col>
    </Row>

    <Modal v-model='practicalModal' width='70%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>新增实事项目</span>
      </p>
      <div class='modal-content'>
        <Form ref='practicalValidateRef' :model='practicalData'>
          <FormItem label='项目单位' prop="projectName" :rules="{type: 'number', required: true, message: '请选择项目单位', trigger: 'change'}">
            <Select v-model="practicalData.projectName" placeholder="受益单位" @on-change="projectChange">
              <Option v-for="item in projectUnit" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
            </Select>
          </FormItem>
          <FormItem label='项目来源'>
            <RadioGroup v-model="practicalData.source">
              <Row style="width: 100%;">
                <Col span="12">
                  <Radio label="0">
                    <span>新建指标</span>
                  </Radio>
                </Col>
                <Col span="12">
                  <Radio label="1">
                    <span>当年指标</span>
                  </Radio>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="practicalData.source === '1'">
            <Row>
              <Col span="24">
                <dynamicTable :option="tableOptions" @on-selection-change="onSelectionChage"/>
              </Col>
            </Row>
          </FormItem>
          <FormItem label='项目名称' v-if="practicalData.source === '0'">
            <Input v-model="practicalData.unitName" maxlength="50" show-word-limit placeholder='请输入副标题' />
          </FormItem>
          <FormItem label='通告内容' class='annunciate' v-if="practicalData.source === '0'">
            <Input class='annunciate-input' v-model="practicalData.content" maxlength="200" show-word-limit placeholder='请输入通告内容' type="textarea" />
          </FormItem>
          <FormItem label='目标数据' class="targetData" v-if="practicalData.source === '0'">
            <Row>
              <Col span="16">
                <InputNumber :max="9999999999999" :min="0.01" :precision="2" v-model="practicalData.targetData" class="target-input"></InputNumber>
              </Col>
              <Col span=7 offset="1">
                <Select v-model="practicalData.unitMeasurement" placeholder='请选择计量单位'>
                  <Option v-for="item in meteringUnit" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='add-btn' @click="preserve">发 布</Button>
          </Row>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import dynamicTable from '../../quota/component/dynamic-table'
import {
  getPracProjectTab,
  getPracProjectFindPage,
  getPracProjectType,
  getFindByIndex,
  addPracProject,
  getDatadictionaryType
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  components: {
    dynamicTable
  },
  data () {
    return {
      // 页签
      tabList: [],
      // 高亮索引
      nowIndex: 0,
      // 查询条件
      queryInfo: {
        tab: null,
        page: 1,
        size: 10,
        years: '',
        area: ''
      },
      // 数据总条数
      total: 0,
      // 表格参数
      columns: [
        {
          title: '序号',
          key: 'orgId',
          className: 'tb-header',
          align: 'center',
          width: '100',
          render: (h, params) => {
            let index = ++params.index
            index = index > 9 ? index : `${index}`
            return h('span', index)
          }
        },
        {
          title: '年份',
          key: 'years',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '区县市',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '实事项目数',
          key: 'count',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表单数据
      pracData: [],
      // 控制新增实事项目按钮显示隐藏开关
      addBtnFlag: true,
      // 控制新增实事项目弹窗开关
      practicalModal: false,
      // 项目单位
      projectUnit: [],
      // 计量单位
      meteringUnit: [],
      // 当年指标id集合
      currentYearIndex: [],
      // 新增实事项目数据
      practicalData: {
        projectName: [],
        source: '0',
        unitName: '',
        content: '',
        targetData: null,
        unitMeasurement: ''
      },
      // 表格配置
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          level1: '一级指标',
          level2: '二级指标',
          level3: '三级指标',
          level4: '四级指标',
          level5: '',
          score: '分值',
          checkPoint: '考核要点',
          task: '目标任务'
        },
        dynamicCols: {
          status: true,
          cols: ['level4', 'level5']
        },
        // 是否启用单元格提示功能
        colToolTips: {
          // 启用状态
          status: true,
          // 需要启用提示的列名
          cols: ['task']
        },
        checkbox: {
          status: true,
          colIndex: 5
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [ 0, 1, 2, 3 ]
        },
        editIndex: -1,
        // 数据
        data: []
      }
    }
  },
  created () {
    // 获取页签
    this.getLivelihoodTab()
  },
  computed: {},
  methods: {
    // 获取民生绩效页签
    getLivelihoodTab () {
      getPracProjectTab(10).then(res => {
        if (res.data.code === 10000) {
          this.tabList = res.data.data
          this.queryInfo.tab = res.data.data[0].orgType
          this.addBtnFlag = res.data.data[0].status
          this.getPracProjectFindPageListAll()
        }
      })
    },
    // 切换页签
    tableBtn (orgType, i, status) {
      this.addBtnFlag = status
      this.nowIndex = i
      this.queryInfo.tab = orgType
      this.getPracProjectFindPageListAll()
    },
    // 获取民生绩效数据
    getPracProjectFindPageList (data) {
      getPracProjectFindPage(data).then(res => {
        if (res.data.code === 10000) {
          this.pracData = res.data.data.dataList
          this.total = res.data.data.total
        }
      })
    },
    // 获取全部数据
    getPracProjectFindPageListAll () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        orgType: this.queryInfo.tab
      }
      this.getPracProjectFindPageList(data)
    },
    // 年份查询
    yearsInquire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.years
      }
      this.getPracProjectFindPageList(data)
    },
    // 区域查询
    areaInquire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        orgName: this.queryInfo.area
      }
      this.getPracProjectFindPageList(data)
    },
    // 年份+区域查询
    yearsAreaInquire () {
      const data = {
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        orgType: this.queryInfo.tab,
        years: this.queryInfo.years,
        orgName: this.queryInfo.area
      }
      this.getPracProjectFindPageList(data)
    },
    // 点击查询按钮
    inquire () {
      this.queryInfo.page = 1
      if (this.queryInfo.years && !this.queryInfo.area) {
        this.yearsInquire()
      } else if (!this.queryInfo.years && this.queryInfo.area) {
        this.areaInquire()
      } else if (this.queryInfo.years && this.queryInfo.area) {
        this.yearsAreaInquire()
      } else {
        this.getPracProjectFindPageListAll()
      }
    },
    // 清空查询条件
    empty () {
      this.queryInfo = {
        page: 1,
        size: 10,
        years: '',
        area: ''
      }
      this.getPracProjectFindPageListAll()
    },
    // 显示新增实事项目弹窗
    showPracticalModal () {
      this.getProjectUnit()
      this.getMeteringUnit()
      this.practicalModal = true
    },
    // 根据页签获取项目单位
    getProjectUnit () {
      getPracProjectType(this.queryInfo.tab).then(res => {
        if (res.data.code === 10000) {
          this.projectUnit = res.data.data
        }
      })
    },
    // 项目单位改变
    projectChange (e) {
      if (e) {
        this.getFindByIndexList(e)
      }
    },
    // 根据项目单位查询当年指标
    getFindByIndexList (orgId) {
      const data = {
        orgType: this.queryInfo.tab,
        orgId: orgId
      }
      getFindByIndex(data).then(res => {
        if (res.data.code === 10000) {
          if (res.data.data.length > 0) {
            this.$store.state.quota.list = res.data.data
            this.$store.commit('setQuota', res.data.data)
            this.$store.commit('createColumn', this.tableOptions)
          } else {
            this.$store.state.quota.list = []
            this.$store.commit('setQuota', [])
          }
        }
      })
    },
    // 获取计量单位
    getMeteringUnit () {
      getDatadictionaryType(15).then(res => {
        if (res.data.code === 10000) {
          this.meteringUnit = res.data.data
        }
      })
    },
    // 复选框选中数据
    onSelectionChage (selection) {
      let idArr = []
      selection.map(item => {
        idArr.push(item.id)
      })
      this.currentYearIndex = idArr
    },
    // 监听新增实事项目弹窗状态改变函数
    modalChange (e) {
      if (e === false) {
        this.$refs.practicalValidateRef.resetFields()
        this.projectUnit = []
        this.practicalData = {
          projectName: [],
          source: '0',
          unitName: '',
          content: '',
          targetData: null,
          unitMeasurement: ''
        }
      }
    },
    // 点击发布按钮
    preserve () {
      this.$refs.practicalValidateRef.validate((valid) => {
        if (valid) {
          if (this.practicalData.source === '0') {
            const data = {
              orgType: this.queryInfo.tab,
              orgId: Number(this.practicalData.projectName),
              source: Number(this.practicalData.source),
              projectName: this.practicalData.unitName,
              projectContent: this.practicalData.content,
              targetValue: Number(this.practicalData.targetData),
              unitName: this.practicalData.unitMeasurement
            }
            this.submitAddProject(data)
          } else if (this.practicalData.source === '1' && this.currentYearIndex.length > 0) {
            const data = {
              orgType: this.queryInfo.tab,
              orgId: Number(this.practicalData.projectName),
              source: Number(this.practicalData.source),
              ids: this.currentYearIndex
            }
            this.submitAddProject(data)
          }
        }
      })
    },
    // 提交新增实事项目
    submitAddProject (data) {
      addPracProject(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('新增成功')
          this.practicalModal = false
          this.getPracProjectFindPageListAll()
        }
      })
    },
    // 查看详情
    questionnaire (id, years) {
      this.$router.push({
        path: './examine_peoples_particulars',
        query: {
          id: id,
          orgType: this.queryInfo.tab,
          years: years
        }
      })
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      if (this.queryInfo.years && !this.queryInfo.area) {
        this.yearsInquire()
      } else if (!this.queryInfo.years && this.queryInfo.area) {
        this.areaInquire()
      } else if (this.queryInfo.years && this.queryInfo.area) {
        this.yearsAreaInquire()
      } else {
        this.getPracProjectFindPageListAll()
      }
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      if (this.queryInfo.years && !this.queryInfo.area) {
        this.yearsInquire()
      } else if (!this.queryInfo.years && this.queryInfo.area) {
        this.areaInquire()
      } else if (this.queryInfo.years && this.queryInfo.area) {
        this.yearsAreaInquire()
      } else {
        this.getPracProjectFindPageListAll()
      }
    }
  }
}
</script>
