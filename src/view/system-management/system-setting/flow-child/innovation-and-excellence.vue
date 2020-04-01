
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
          <span>申请</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>各单位/个人根据规则自定义申请</p>
      </Col>
      <Col span="8">各单位/个人申请</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow2">
          <span>02</span>
          <span>审核</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>单位领导审核</p>
      </Col>
      <Col span="8">所在部门正职领导</Col>
      <Col span="6" class="arrow"></Col>
      <Col span="10"></Col>
      <Col span="8"></Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6" class="flex-box">
        <div class="flow-tag flow4">
          <span>03</span>
          <span>上级机构审核</span>
        </div>
      </Col>
      <Col span="10">
        <p>注解</p>
        <p>转内部项目后上级机构相关人员进行审核</p>
      </Col>
      <Col span="8">
        <Select placeholder="新增执行部门" @on-change="selectUnit1" label-in-value multiple>
          <Option v-for="item in unitList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col>
        <Button type="primary" style="margin-top: 60px" @click="updateNode">更新</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      unitList1: [
        {
          value: 1,
          label: '资阳区'
        },
        {
          value: 2,
          label: '益阳市'
        }
      ],
      nodeIdsArr: [],
      nodeNamesArr: [],
      nodesArr: [1],
      ids1: '',
      names1: ''
    }
  },
  methods: {
    updateNode () {
      this.nodeIdsArr = [this.ids1]
      this.nodeNamesArr = [this.names1]
      console.log(this.nodeIdsArr, this.nodeNamesArr, this.nodesArr)
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
    }
  }
}
</script>
