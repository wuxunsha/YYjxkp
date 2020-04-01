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
  width: 70px;
  text-align: center;
}
/deep/.ivu-modal-footer {
  display: none;
}
/deep/.ivu-icon {
  margin-right: 6px;
}
.content {
  .table-name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
    color:rgba(51,51,51,1);
  }
  .table-unit {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: rgba(102,102,102,1);
  }
}
/* 新增实事项目弹窗 */
.modal-practical {
  /deep/.ivu-form-item-content {
    margin-left: 80px;
  }
  /deep/.ivu-modal-content {
    padding: 30px 60px;
    .practical-title {
      color: #333;
      text-align: center;
      font-size: 20px;
      height: 50px;
      line-height: 50px;
      border-bottom: 0;
    }
    .practical-content {
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
    div.practical-content {
      text-align: left;
    }
    .practical-footer {
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
}
/* 更新进度弹窗 */
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
    /deep/.ivu-date-picker {
      width: 100%;
    }
    .comp-input {
      width: 100%;
    }
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
    }
  }
  div.modal-content {
    text-align: left;
  }
  .modal-footer {
    text-align: right;
    margin-top: 40px;
    .cancel-btn {
      width: 130px;
      font-size:16px;
      font-weight:400;
      background:rgba(202,228,255,1);
      color:rgba(9,114,231,1);
      border: none;
    }
    .issue-btn {
      width: 130px;
      margin-left: 20px;
      font-size:16px;
      font-weight:400;
      border: none;
    }
  }
}
</style>

<template>
  <div>
    <Row class="content">
      <Col class="table-name">
        <h4>{{tableTitie}}</h4>
      </Col>
      <Col class="table-unit">
        <p>当前机构：{{orgName}}</p>
      </Col>
      <Col class="btn-add">
        <Button type="primary" class="add" @click="showPracticalModal(queryInfo.tab)" v-if="btnShow(115102101)">
          <i class="icon-font iconxinzeng"></i>
          新增实事项目
        </Button>
      </Col>
      <Col>
        <Table :row-class-name="rowClassName" :columns="columns" :data="projectList" :border="false">
          <template slot='source' slot-scope="{ row }">
            {{row.source === 0 ? '新建指标' : '当年指标'}}
          </template>
          <template slot='operation' slot-scope="{ row }">
            <!-- 编辑 -->
            <Icon class="icon-font iconcaozuo-bianji" size="24" color="#0972E7" title="编辑" v-if="btnShow(115102103) && row.source === 0" @click="editProject(row.id)" />
            <!-- 进度更新 -->
            <Icon type="md-refresh" size="24" color="#0972E7" title="进度更新" @click="scheduleUpdate(row.id)" v-if="btnShow(115102104)"/>
            <!-- 移除 -->
             <Icon type="ios-trash-outline" size="24" color="#FF3333" title="移除" @click="deleteProject(row.id)" v-if="btnShow(115102102)"/>
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

    <!-- 更新进度弹窗 -->
    <Modal v-model='scheduleModal' width='60%' class='modal-information' @on-visible-change="modalChange">
      <p class='modal-title'>
        <span>更新进度</span>
      </p>
      <div class='modal-content'>
        <Form ref='compileValidateRef'>
          <FormItem>
            <Row>
              <Col span="3">
                <span>截止时间</span>
              </Col>
              <Col span="21">
                <DatePicker type="datetime" placeholder="请选择截止时间" @on-change="deadlineTime" v-model="cutOffTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="3">
                <span>完成情况</span>
              </Col>
              <Col span="19">
                <InputNumber :max="9999999999999" :min="0.01" :precision="2" v-model="updateData.compValue" class="comp-input"></InputNumber>
              </Col>
              <Col span="2" style="text-align: center;">
                <span>万元</span>
              </Col>
            </Row>
          </FormItem>
          <FormItem class='annunciate'>
            <Input class='annunciate-input' placeholder='请输入备注内容' type="textarea" v-model="updateData.remarks" />
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='modal-footer'>
            <Button class='cancel-btn' @click="cancel">取 消</Button>
            <Button class='issue-btn' type="primary" @click="updatePlan">提 交</Button>
          </Row>
        </Form>
      </div>
    </Modal>

    <!-- 新增实事项目弹窗 -->
    <Modal v-model='practicalModal' width='80%' class='modal-practical' @on-visible-change="projectModalChange">
      <p class='practical-title'>
        <span>新增实事项目</span>
      </p>
      <div class='practical-content'>
        <Form ref='practicalValidateRef'>
          <FormItem label='项目单位'>
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
            <Input v-model="practicalData.unitName" maxlength="25" show-word-limit placeholder='请输入副标题' />
          </FormItem>
          <FormItem label='通告内容' class='annunciate' v-if="practicalData.source === '0'">
            <Input class='annunciate-input' v-model="practicalData.content" maxlength="200" show-word-limit placeholder='请输入通告内容' type="textarea" />
          </FormItem>
          <FormItem label='目标数据' class="targetData" v-if="practicalData.source === '0'">
            <Row>
              <Col span="16">
                <InputNumber :precision="2" :min="0.01" v-model="practicalData.targetData" class="target-input"></InputNumber>
              </Col>
              <Col span=7 offset="1">
                <Select v-model="practicalData.unitMeasurement" placeholder='请选择计量单位'>
                  <Option v-for="item in meteringUnit" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='practical-footer'>
            <Button class='add-btn' @click="preserve">发 布</Button>
          </Row>
        </Form>
      </div>
    </Modal>

     <!-- 编辑实事项目弹窗 -->
    <Modal v-model='editPracticalModal' width='80%' class='modal-practical' @on-visible-change="editProjectModalChange">
      <p class='practical-title'>
        <span>编辑实事项目</span>
      </p>
      <div class='practical-content'>
        <Form ref='editPracticalValidateRef'>
          <FormItem label='项目单位'>
            <Input v-model="editPracticalList.orgName" disabled/>
          </FormItem>
          <FormItem label='项目名称'>
            <Input v-model="editPracticalList.projectName" maxlength="25" show-word-limit placeholder='请输入副标题' />
          </FormItem>
          <FormItem label='通告内容' class='annunciate'>
            <Input class='annunciate-input' v-model="editPracticalList.projectContent" maxlength="200" show-word-limit placeholder='请输入通告内容' type="textarea" />
          </FormItem>
          <FormItem label='目标数据' class="targetData">
            <Row>
              <Col span="16">
                <InputNumber :precision="2" :min="0.01" v-model="editPracticalList.targetValue" class="target-input"></InputNumber>
              </Col>
              <Col span=7 offset="1">
                <Select v-model="editPracticalList.unitName" placeholder='请选择计量单位'>
                  <Option v-for="item in editMeteringUnit" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <!-- 保存按钮 -->
          <Row class='practical-footer'>
            <Button class='add-btn' @click="submitEditProject">发 布</Button>
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
  findOnePracProject,
  getDatadictionaryType,
  getFindByIndex,
  getPracProjectType,
  addPracProject,
  deletePracProject,
  updateProgress,
  findOneProject,
  updateProject
} from '@/api/portal-management'
export default {
  mixins: [mixin_table],
  components: {
    dynamicTable
  },
  data () {
    return {
      // 机构id
      orgId: null,
      // 表名
      tableTitie: '',
      // 机构名称
      orgName: '',
      // 分页参数
      queryInfo: {
        page: 1,
        size: 10
      },
      // 总条数
      total: 0,
      // 表格参数
      columns: [
        {
          title: '序号',
          key: 'id',
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
          title: '名称',
          key: 'projectName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '内容',
          key: 'projectContent',
          tooltip: true,
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '目标',
          key: 'targetValue',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '来源',
          slot: 'source',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '完成情况',
          key: 'compValue',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '进展',
          key: 'progress',
          className: 'tb-header',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.progress + '%')
          }
        },
        {
          title: '操作',
          slot: 'operation',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      projectList: [],
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
        projectName: '',
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
      },
      // 编辑实事项目弹窗开关
      editPracticalModal: false,
      // 编辑实事项目弹窗计量单位下拉框数据
      editMeteringUnit: [],
      // 编辑实事项目数据
      editPracticalList: {},
      // 更新进度弹窗开关
      scheduleModal: false,
      // 更新进度截止时间
      cutOffTime: '',
      // 更新进度弹窗内容
      updateData: {
        id: null,
        orgId: null,
        orgType: null,
        cutoffTime: '',
        compValue: null,
        remarks: ''
      }
    }
  },
  created () {
    // 查询详情
    this.getFindOnePracProject()
  },
  computed: {},
  methods: {
    // 查询详情
    getFindOnePracProject () {
      console.log(this.btnShow(115102104))
      this.orgId = this.$route.query.orgType
      const data = {
        orgId: this.$route.query.id,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
        years: this.$route.query.years
      }
      findOnePracProject(data).then(res => {
        if (res.data.code === 10000) {
          this.projectList = res.data.data.data.dataList
          this.total = res.data.data.data.total
          this.tableTitie = res.data.data.title
          this.orgName = res.data.data.orgName
        }
      })
    },
    // 显示新增实事项目弹窗
    showPracticalModal () {
      this.getProjectUnit(this.orgId)
      this.getMeteringUnit()
      this.practicalModal = true
    },
    // 根据页签获取新增弹窗项目单位
    getProjectUnit (orgType) {
      getPracProjectType(orgType).then(res => {
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
    // 点击发布按钮
    preserve () {
      if (this.practicalData.source === '0') {
        const data = {
          orgType: this.orgId,
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
          orgType: this.orgId,
          orgId: Number(this.practicalData.projectName),
          source: Number(this.practicalData.source),
          ids: this.currentYearIndex
        }
        this.submitAddProject(data)
      }
    },
    // 提交新增实事项目
    submitAddProject (data) {
      addPracProject(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('新增成功')
          this.practicalModal = false
          this.getFindOnePracProject()
        }
      })
    },
    // 监听新增实事项目弹窗状态改变函数
    projectModalChange (e) {
      if (e === false) {
        this.$refs.practicalValidateRef.resetFields()
        this.practicalData = {
          projectName: '',
          source: '0',
          unitName: '',
          content: '',
          targetData: null,
          unitMeasurement: ''
        }
      }
    },
    // 显示编辑实事项目弹窗
    editProject (id) {
      this.getEditMeteringUnit()
      this.getFindProject(id)
      this.editPracticalModal = true
    },
    // 获取编辑弹窗计量单位
    getEditMeteringUnit () {
      getDatadictionaryType(15).then(res => {
        if (res.data.code === 10000) {
          this.editMeteringUnit = res.data.data
        }
      })
    },
    // 根据id查询单条实事项目
    getFindProject (id) {
      findOneProject(id).then(res => {
        if (res.data.code === 10000) {
          let name = res.data.data.unitName
          res.data.data.name = name
          this.editPracticalList = res.data.data
        }
      })
    },
    // 提交编辑实事项目
    submitEditProject () {
      updateProject(this.editPracticalList).then(res => {
        if (res.data.code === 10000) {
          this.getFindOnePracProject()
          this.$Message.success('编辑成功')
          this.editPracticalModal = false
        }
      })
    },
    // 监听编辑实事项目弹窗状态改变函数
    editProjectModalChange (e) {
      if (e === false) {
        this.$refs.editPracticalValidateRef.resetFields()
        this.projectUnit = []
        this.editPracticalList = {
          projectName: '',
          unitName: '',
          content: '',
          targetData: null,
          unitMeasurement: ''
        }
      }
    },
    // 打开更新进度弹窗
    scheduleUpdate (id) {
      this.updateData.id = id
      this.updateData.orgId = this.$route.query.id
      this.updateData.orgType = this.orgId
      this.scheduleModal = true
    },
    // 监听更新进度弹窗改变事件
    modalChange (e) {
      if (e === false) {
        this.$refs.compileValidateRef.resetFields()
        this.cutOffTime = ''
        this.updateData = {
          cutoffTime: '',
          compValue: null,
          remarks: ''
        }
      }
    },
    // 截止时间
    deadlineTime (e) {
      this.updateData.cutoffTime = e
    },
    // 更新进度
    updatePlan () {
      updateProgress(this.updateData).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('更新进度成功')
          this.scheduleModal = false
          this.getFindOnePracProject()
        }
      })
    },
    // 移除实事项目
    deleteProject (id) {
      deletePracProject(id).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('移除成功')
          this.getFindOnePracProject()
        }
      })
    },
    // 取消更新进度
    cancel () {
      this.scheduleModal = false
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getFindOnePracProject()
    },
    // 每页显示条数改变
    handleSizeChange (size) {
      this.queryInfo.size = size
      this.getFindOnePracProject()
    }
  }
}
</script>
