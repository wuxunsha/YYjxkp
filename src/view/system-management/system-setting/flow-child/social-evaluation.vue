
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
          <span>社会评价模板</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>制作社会评价模板</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit1" label-in-value multiple v-model="viewUnit1" :disabled="!btnShow(110101104102)">
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
          <span>问卷内容填写</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>填写并确定社会评价调查内容</p>
      </Col>
      <Col span="8">被考核单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow3">
          <span>03</span>
          <span>社会评价调查</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>安排并组织进行社会调查</p>
      </Col>
      <Col span="8">数据采集单位</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow4">
          <span>04</span>
          <span>结果输入</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>录入最终结果</p>
      </Col>
      <Col span="8">数据采集单位</Col>
      <Col>
        <Button type="primary" style="margin-top: 60px" @click="updateNode" :disabled="!btnShow(110101104102)">更新</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { setOptPeopleProcess, getOptPeople, getindexbatchnodesinfolistsocie } from '@/api/system-setting'
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
      unitList1: [],
      nodeIdsArr: [],
      nodeNamesArr: [],
      nodesArr: [1],
      nodeType: '',
      nodeParams1: {}
    }
  },
  created () {
    if (this.type === 5) {
      this.getOptPeople()
      this.getindexbatchnodesinfolistsocie()
    }
  },
  methods: {
    // 已选机构
    getindexbatchnodesinfolistsocie () {
      let type = 4
      getindexbatchnodesinfolistsocie(type).then(res => {
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
          })
        }
      })
    },
    // 得到执行人
    getOptPeople () {
      getOptPeople().then(res => {
        if (res.data.code === 10000) {
          this.nodeType = res.data.data.nodeType
          this.unitList1 = res.data.data.list
        }
      })
    },
    updateNode () {
      // optTypes, 3绩效改进  4，社会评价
      this.$Modal.confirm({
        title: '流程更新',
        content: `确定更社会评价流程吗？`,
        onOk: () => {
          let params = {
            optTypes: 4,
            optPeopleProcessInfoS: [this.nodeParams1]
          }
          console.log(params)
          setOptPeopleProcess(params).then(res => {
            if (res.data.code === 10000) {
              this.$Message.success(res.data.msg)
            }
          })
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
      this.$set(this.nodeParams1, 'optUserIds', ids.join(','))
      this.$set(this.nodeParams1, 'optUserNames', names.join(','))
      this.$set(this.nodeParams1, 'nodeLev', 1)
      this.$set(this.nodeParams1, 'nodeType', this.nodeType)
    }
  }
}
</script>
