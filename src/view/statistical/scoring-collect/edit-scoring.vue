<style lang='less' scoped>
@import url('~@/common/less/global.less');
/deep/textarea.ivu-input {
  min-height: 260px;
  border: 1px solid rgba(94,173,255,1);
  border-radius: 16px;
  resize: none;
}
.form-content {
  // 表格内容
  .content {
    padding: 24px 20px;
    background-color: #fff;
    .table-title {
      width: 100%;
      text-align: center;
      margin-bottom: 25px;
      .table-name {
        font-size:20px;
        font-weight:bold;
        line-height:24px;
        color:rgba(51,51,51,1);
      }
      .table-type,
      .table-unit {
        font-size:18px;
        font-weight:500;
        line-height:30px;
        color:rgba(102,102,102,1);
      }
    }
  }
  // 备注信息
  .from-footer {
    margin-top: 14px;
    padding: 24px 20px 100px;
    background-color: #fff;
    .remark {
      font-size:18px;
      font-weight:bold;
      line-height:38px;
      color:rgba(51,51,51,1);
      margin-bottom: 14px;
    }
    .remark-input {
      margin-bottom: 26px;
    }
    .from-btn {
      text-align: center;
      .from-add {
        width:382px;
        height:56px;
        background:rgba(9,114,231,1);
        border: none;
        border-radius:6px;
        font-size:18px;
        font-weight:500;
        outline: none;
      }
    }
    .reference {
      margin-left: 36px;
      p {
        font-size:16px;
        font-weight:500;
        line-height:16px;
        color:rgba(102,102,102,1);
      }
    }
  }
}
</style>

<template>
  <div>
    <Layout>
      <!-- 编辑详情 -->
      <div class='form-content' >
        <!-- 表格内容 -->
        <Content class='content'>
          <!-- 表名 -->
          <Row class="table-title">
            <Row>
              <Col span="24" class="table-name">
                <h4>{{tableTitie}}</h4>
              </Col>
            </Row>
            <Row>
              <Col span="24" class="table-type">
                <p>（{{tableType}}）</p>
              </Col>
            </Row>
            <Row>
              <Col span="24" class="table-unit">
                <p>当前单位：{{orgName}}</p>
              </Col>
            </Row>
          </Row>
          <Row class="table">
            <Table :row-class-name="rowClassName" :columns='columns' :data="pySumData" :border="false">
              <template slot='sugLevel' slot-scope="{ row }">
                <!-- 编辑状态 -->
                <Select v-model="row.sugLevel" transfer @on-change="selectHnadle($event, row.id)">
                  <Option v-for="item in cityList" :value="item.sugLevel" :key="item.id" >{{ item.name }}</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </Content>

        <!-- 备注信息 -->
        <Footer class="from-footer">
          <!-- 备注消息 -->
          <Row class="remark">
            <Col span="24">
              <p>
                <span>已设置</span>
                <span>
                  <span>2个</span>
                  <span>一级，</span>
                  <span>3个</span>
                  <span>二级</span>
                </span>
                <span>等级。</span>
              </p>
            </Col>
          </Row>
          <!-- 新增备注内容 -->
          <Row class="remark-input" >
            <Col span="24">
              <Input v-model="remark" placeholder="请输入备注消息" type="textarea"/>
            </Col>
          </Row>
          <Row class="from-btn">
            <Col span="24">
              <Button type="primary" class="from-add" @click="addPySumDet">完 成</Button>
            </Col>
          </Row>
        </Footer>
      </div>
    </Layout>
  </div>
</template>

<script>
import mixin_table from '@/common/mixin/table'
import {
  getPySumDet,
  getSuglevel,
  savePySumDetList
} from '@/api/statistical'
export default {
  mixins: [mixin_table],
  data () {
    return {
      // 表名
      tableTitie: '',
      // 表类型
      tableType: '',
      // 机构名称
      orgName: '',
      // 备注
      remark: '',
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
          title: '单位',
          key: 'orgName',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '总分',
          key: 'sumScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标扣分',
          key: 'deductionScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '指标加分',
          key: 'bonusScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '创新加分',
          key: 'innovateScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '最后得分',
          key: 'finalScore',
          className: 'tb-header',
          align: 'center'
        },
        {
          title: '建议等级',
          slot: 'sugLevel',
          className: 'tb-header',
          align: 'center'
        }
      ],
      // 表格数据
      pySumData: [],
      // 下拉选择内容
      cityList: []
    }
  },
  created () {
    // 获取机构计分汇总列表
    this.getPySumDetList()
  },
  methods: {
    // 获取机构计分汇总列表
    getPySumDetList () {
      getPySumDet(this.$route.query.id).then(res => {
        if (res.data.code === 10000) {
          this.tableTitie = res.data.data.listTitle
          this.tableType = res.data.data.littleTitle
          this.orgName = res.data.data.orgName
          this.pySumData = res.data.data.pageData
          this.getSuglevelSelectList()
        }
      })
    },
    // 获取建议等级下拉列表
    getSuglevelSelectList () {
      getSuglevel().then(res => {
        if (res.data.code === 10000) {
          this.cityList = res.data.data
        }
      })
    },
    // 编辑建议等级
    selectHnadle (e, id) {
      this.pySumData.map(item => {
        if (item.id === id) {
          item.sugLevel = e
        }
      })
    },
    // 提交编辑
    addPySumDet () {
      if (this.remark) {
        const data = {
          remark: this.remark,
          statPySumDetDTOList: this.pySumData
        }
        this.savePySumDet(data)
      } else {
        const data = {
          statPySumDetDTOList: this.pySumData
        }
        this.savePySumDet(data)
      }
    },
    // 保存编辑建议等级后的汇总列表
    savePySumDet (data) {
      savePySumDetList(data).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success('保存编辑列表成功')
          setTimeout(() => {
            this.remark = ''
            this.$router.push({
              path: 'scoring_collect'
            })
          }, 1000)
        }
      })
    }
  }
}
</script>
