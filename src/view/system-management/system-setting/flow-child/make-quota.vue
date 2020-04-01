
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
          <span>指示模板</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>制定指标模板，创建指标名称、考核要点、确定数据采集单位</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit1" label-in-value multiple v-model="viewUnit1" :disabled="!btnShow(110101101101)">
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
          <span>内容填写</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>数据采集单位填写考核内容、计分方式及执行单位</p>
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
          <span>分值确定</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>确定考核内容是否合理，并对各项指标规定分值</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit3" label-in-value multiple v-model="viewUnit3" :disabled="!btnShow(110101101101)">
          <Option v-for="item in unitList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow4">
          <span>04</span>
          <span>复核与反馈</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>根据被考核单位确认指标内容并进行反馈</p>
      </Col>
      <Col span="8">被考核单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow5">
          <span>05</span>
          <span>确认发布</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>线下与领导确认指标内容并发布最终修改版本</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit5" label-in-value multiple v-model="viewUnit5" :disabled="!btnShow(110101101101)">
          <Option v-for="item in unitList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col>
        <Button type="primary" style="margin-top: 60px" @click="updateNode" :disabled="!btnShow(110101101101)">更新</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getindexbatchnodeslist, setindexnodeslist, getindexbatchnodesinfolist } from '@/api/system-setting'
export default {
  name: '',
  props: {
    type: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  data () {
    return {
      viewUnit1: [],
      viewUnit3: [],
      viewUnit5: [],
      unitList1: [],
      unitList3: [],
      unitList5: [],
      nodeIdsArr: [],
      nodeNamesArr: [],
      nodesArr: [1, 3, 5],
      ids1: '',
      ids3: '',
      ids5: '',
      names1: '',
      names3: '',
      names5: ''
    }
  },
  created () {
    if (this.type === 1) {
      this.getindexbatchnodeslist()
      this.getindexbatchnodesinfolist()
    }
  },
  methods: {
    // 已选机构
    getindexbatchnodesinfolist () {
      let type = 1
      getindexbatchnodesinfolist(type).then(res => {
        if (res.data.code === 10000) {
          let data = res.data.data
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
            if (item.nodeLevel === 3) {
              _idsStr = item.nodeId
              // _namesStr = item.nodeRelevanceName
              this.viewUnit3 = _idsStr.split(',')
              this.viewUnit3.forEach((item, index) => {
                this.viewUnit3[index] = parseInt(item)
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
      })
    },
    // 设置流程
    setindexnodeslist () {
      let params = {
        nodeIdsArr: this.nodeIdsArr,
        nodeNamesArr: this.nodeNamesArr,
        nodesArr: this.nodesArr
      }
      setindexnodeslist(params).then(res => {
        if (res.data.code === 10000) {
          this.$Message.success(res.data.msg)
        }
      })
    },
    // 获取可选机构可选列表
    getindexbatchnodeslist () {
      // type（1,指标管理;2,绩效考核;）
      let type = 1
      getindexbatchnodeslist(type).then(res => {
        if (res.data.code === 10000) {
          this.unitList1 = res.data.data
          this.unitList3 = res.data.data
          this.unitList5 = res.data.data
        }
      })
    },
    // 更新节点
    updateNode () {
      this.$Modal.confirm({
        title: '流程更新',
        content: `确定更新指标制定流程吗？`,
        onOk: () => {
          this.nodeIdsArr = [this.ids1, this.ids3, this.ids5]
          this.nodeNamesArr = [this.names1, this.names3, this.names5]
          this.setindexnodeslist()
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
    selectUnit3 (value) {
      let ids = []
      let names = []
      value.forEach(item => {
        ids.push(item.value)
        names.push(item.label)
      })
      this.ids3 = ids.join(',')
      this.names3 = names.join(',')
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
