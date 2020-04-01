<template>
  <div :id="nameOfId"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    nameOfId: {
      type: String,
      default: 'dom1'
    }
  },
  data () {
    return {
      obj: this.value
    }
  },
  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.nameOfId))
      let xAxisData = Object.keys(this.obj)
      let seriesData = Object.values(this.obj)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.text,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
