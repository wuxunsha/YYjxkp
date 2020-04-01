
<style lang="less" scoped>
  .flex-box {
    display: flex;
    justify-content: center
  }
  .unit-label {
    font-size:26px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:57px;
  }
  .flow1 {
    background: rgba(9,114,231,1);
    >span:first-child {
      color: rgba(9,114,231,1);
    }
  }
  .flow2 {
    background: rgba(255,155,41,1);
    >span:first-child {
      color: rgba(255,155,41,1);
    }
  }
  .flow3 {
    background: rgba(78,193,50,1);
    >span:first-child {
      color: rgba(78,193,50,1);
    }
  }
  .flow4 {
    background: rgba(255,72,96,1);
    >span:first-child {
      color: rgba(255,72,96,1);
    }
  }
  .flow5 {
    background: rgba(167,92,242,1);
    >span:first-child {
      color: rgba(167,92,242,1);
    }
  }
  .flow-tag {
    width:283px;
    height:52px;
    line-height: 52px;
    opacity:1;
    border-radius:50px 16px 50px 50px;
    color: #fff;
    font-size: 22px;
    >span:first-child {
      display: inline-block;
      width: 42px;
      height: 42px;
      text-align: center;
      background: #fff;
      line-height: 42px;
      border-radius: 50%;
      margin-left: 10px;
    }
    >span:last-child {
      display: inline-block;
      color: #fff;
      width: 70%;
      text-align: center;
    }
  }
  .arrow {
    height: 110px;
    background-image: url('~@/assets/images/system/flow-arrow.png');
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
<template>
  <div style="padding: 30px">
    <Row type="flex" justify="center">
      <Col span="6"></Col>
      <Col span="10"></Col>
      <Col span="8" class="unit-label">执行部门</Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow1">
          <span>01</span>
          <span>考核模板</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>选定需要考核的内容及范围，分为日常考核及年度考核</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit1" label-in-value multiple v-model="viewUnit1" :disabled="!btnShow(110101102101)">
          <Option v-for="item in unitList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow2">
          <span>02</span>
          <span>数据采集单位</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>收集需要考核指标的结果并录入数据</p>
      </Col>
      <Col span="8">数据采集单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow3">
          <span>03</span>
          <span>数据核对</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>被考核单位根据采集单位提交的数据，核对准确情况</p>
      </Col>
      <Col span="8">被考核单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow4">
          <span>04</span>
          <span>复核与修改</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>根据被考核单位提供的反馈信息，修改指标结果</p>
      </Col>
      <Col span="8">数据采集单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow5">
          <span>05</span>
          <span>结果确认及发布</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>对数据采集单位提交的结果进行确认，并录入最终分值</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit5" label-in-value multiple v-model="viewUnit5" :disabled="!btnShow(110101102101)">
          <Option v-for="item in unitList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col>
        <Button type="primary" style="margin-top: 60px" @click="updateNode" :disabled="!btnShow(110101102101)">更新</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getindexbatchnodeslist, setbatchnodeslist, getindexbatchnodesinfolist } from '@/api/system-setting'
export default {
  name: '',
  props: {
    type: {
      type: Number,
      default: () => {
        return 2
      }
    }
  },
  data () {
    return {
      viewUnit1: [],
      viewUnit5: [],
      unitList1: [],
      unitList5: [],
      nodeIdsArr: [],
      nodeNamesArr: [],
      nodesArr: [1, 5],
      ids1: '',
      ids5: '',
      names1: '',
      names5: ''
    }
  },
  created () {
    if (this.type === 2) {
      this.getindexbatchnodeslist()
      this.getindexbatchnodesinfolist()
    }
  },
  methods: {
    // 已选机构
    getindexbatchnodesinfolist () {
      let type = 2
      getindexbatchnodesinfolist(type).then(res => {
        if (res.data.code === 10000) {
          let data = res.data.data
          if (data.length > 0) {
            data.forEach(item => {
              let _idsStr = ''
              // let _namesStr = ''
              if (item.nodeLevel === 1) {
                _idsStr = item.nodeId
                // _namesStr = item.nodeRelevanceName
                this.viewUnit1 = _idsStr.split(',')
                this.viewUnit1.forEach((item, index) => {
                  this.viewUnit1[index] = parseInt(item)
                })
              }
              if (item.nodeLevel === 5) {
                _idsStr = item.nodeId
                // _namesStr = item.nodeRelevanceName
                this.viewUnit5 = _idsStr.split(',')
                this.viewUnit5.forEach((item, index) => {
                  this.viewUnit5[index] = parseInt(item)
                })
              }
            })
          }
        }
      })
    },
    // 设置流程
    setbatchnodeslist () {
      let params = {
        nodeIdsArr: this.nodeIdsArr,
        nodeNamesArr: this.nodeNamesArr,
        nodesArr: this.nodesArr
      }
      setbatchnodeslist(params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
        }
      })
    },
    // 获取可选机构可选列表
    getindexbatchnodeslist () {
      // type（1,指标管理;2,绩效考核;）
      let type = 2
      getindexbatchnodeslist(type).then(res => {
        if (res.data.code === 10000) {
          this.unitList1 = res.data.data
          this.unitList5 = res.data.data
        }
      })
    },
    // 更新节点
    updateNode () {
      console.log(this.nodeIdsArr, this.nodeNamesArr, this.nodesArr)
      this.$Modal.confirm({
        title: '流程更新',
        content: `确定更新考核管理流程吗？`,
        onOk: () => {
          this.nodeIdsArr = [this.ids1, this.ids5]
          this.nodeNamesArr = [this.names1, this.names5]
          this.setbatchnodeslist()
        }
      })
    },
    selectUnit1 (value) {
      let ids = []
      let names = []
      value.forEach(item => {
        ids.push(item.value)
        names.push(item.label)
      })
      this.ids1 = ids.join(',')
      this.names1 = names.join(',')
    },
    selectUnit5 (value) {
      let ids = []
      let names = []
      value.forEach(item => {
        ids.push(item.value)
        names.push(item.label)
      })
      this.ids5 = ids.join(',')
      this.names5 = names.join(',')
    }
  }
}
</script>
