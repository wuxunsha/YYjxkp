<style lang="less" scoped>
.quota-table {
  background-color: #fff;
  padding: 20px;
}
/deep/ .ivu-radio-default {
  display: flex;
  align-items: center;
}
</style>
<template>
  <div>
    <Row>
      <Col>
        <Header :titles="titles" />
      </Col>
      <Col class="quota-table" v-if="btnShow(113101101103)">
        <Button type="primary" @click="createNotice">创建改进通知</Button>
      </Col>
      <Col class="quota-table">
        <DynamicTable
          :option="tableOptions"
          >
        </DynamicTable>
      </Col>
    </Row>
    <!-- 整改通知模板 -->
    <Modal
      v-model="addModalShow"
       @on-visible-change="visibleChange"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="800"
      >
      <!-- header -->
      <div slot="header" class="add-header">整改通知模板</div>
      <Form ref="addForm" :model="addFromLine" :rules="addFromRule" :label-width="80" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <Col span="24">
            <FormItem prop="title" label="抬头">
              <Input v-model="addFromLine.title" placeholder="请输入抬头" />
            </FormItem>
            <FormItem prop="perCode" label="编号">
              <Input v-model="addFromLine.perCode" placeholder="请输入编号" />
            </FormItem>
            <FormItem prop="content" label="内容">
              <Editor @on-change="htmlContentChange"/>
            </FormItem>
            <FormItem prop="content" label="选择印章">
              <RadioGroup v-model="imgurl">
                <Radio :label="item + index" v-for="(item, index) in imgs" :key="index">
                  <img :src="item" width="100" alt="图章">
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" @click="postProve">保存到改进通知</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { perfproveview, postProve } from '@/api/improvement'
import DynamicTable from '../../../quota/component/dynamic-table'
import Header from '../../../quota/summary/components/header'
import Editor from '../components/editor'
export default {
  components: {
    DynamicTable,
    Header,
    Editor
  },
  data () {
    return {
      imgurl: '',
      imgs: [
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780',
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780',
        'https://img.tukuppt.com//png_preview/00/04/61/bli0Sv7p7O.jpg!/fw/780'
      ],
      addModalShow: false,
      addFromLine: {
        title: '',
        perCode: '',
        content: ''
      },
      addFromRule: {},
      tableOptions: {
        // 需要作为列显示的列名
        header: {
          indexOneName: '一级指标',
          indexTwoName: '二级指标',
          indexThreeName: '三级指标',
          indexFourName: '四级指标',
          indexFiveName: '五级指标',
          score: '分值',
          // perCode: '要点编号',
          perDesc: '考核要点',
          // area: '地区',
          targetValue: '目标任务',
          busiDesc: '实际完成情况',
          resultScore: '得分',
          // pointType: '计分方式',
          dataCollectionOrgName: '数据采集单位'
        },
        dynamicCols: {
          status: true,
          cols: ['indexTwoName', 'indexThreeName', 'indexFourName', 'indexFiveName']
        },
        // 是否启用合并
        mergeCell: {
          status: true,
          // 需要合并的列的索引
          colIndex: [0, 1, 2, 3, 4, 7]
        },
        // 数据
        data: []
      },
      titles: {
        title: '',
        subtitle: ''
      }
    }
  },
  computed: {
    orgId () {
      return this.$route.query.orgId
    },
    orgType () {
      return this.$route.query.orgType
    },
    perBatchCode () {
      return this.$route.query.perBatchCode
    }
  },
  created () {
    this.perfproveview()
  },
  methods: {
    htmlContentChange (html, text) {
      console.log('==========', html, text)
      this.addFromLine.content = html
    },
    postProve () {
      this.$Modal.confirm({
        title: '发起确认',
        content: '确定发起该改进通知吗？',
        onOk: () => {
          let params = {
            content: this.addFromLine.content,
            orgId: this.orgId,
            perBatchCode: this.perBatchCode,
            perCode: this.addFromLine.perCode,
            title: this.addFromLine.title,
            sealPath: 'seal/path'
          }
          postProve(params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
              this.addModalShow = false
            }
          })
        }
      })
    },
    visibleChange (visible) {
      if (!visible) {
        this.resetForm()
      }
    },
    // 清空表单
    resetForm () {
      this.$refs.addForm.resetFields()
    },
    // 创建改进通知
    createNotice () {
      console.log('创建改进通知')
      this.addModalShow = true
    },
    // 机构待改进详情
    perfproveview (row) {
      let params = {
        orgId: this.orgId,
        orgType: this.orgType,
        perBatchCode: this.perBatchCode
      }
      perfproveview(params).then(res => {
        if (res.data.code === 10000) {
          console.log('改进详情', res.data.data.data)
          this.titles.title = '整改单位/人：' + res.data.data.orgName
          this.titles.subtitle = '考核时间：' + res.data.data.perBatchTime
          this.$store.state.quota.list = res.data.data.data
          this.$store.commit('setQuota', res.data.data.data)
          this.$store.commit('createColumn', this.tableOptions)
        }
      })
    }
  }
}
</script>
