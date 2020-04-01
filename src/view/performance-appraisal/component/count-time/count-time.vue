<style lang="less" scoped>
.timeBox{
    width: 100%;
    height: 50px;
    background-color: #FFEBD5;
    padding: 0 15px;
    line-height: 50px;
    display: flex;
    .prompt{
      color: red;
    }
    .deadline{
      flex: 1;
      text-align: center;
    }
    .time{
      flex: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      .period{
        padding: 0 5px;
        height: 45px;
        background-color: #FF9B29;
        border-radius: 8px;
        font-size: 36px;
        line-height: 45px;
        color: #fff;
        text-align: center;
        margin: 0 5px;
      }
    }
    .stratTime{
      flex: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    .endTime{
      flex: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    .last{
      flex: 1;
    }
}
</style>

<template>
  <!-- 倒计时组件 -->
  <div class="downTime-wrapper">
      <!-- 展示倒计时的盒子 -->
      <div class="timeBox">
        <div class="deadline">
          <span>录入截止时间</span>
          <span class="prompt">(超过录入时间系统自动扣分)</span>
        </div>
        <div class="time" v-show="timeStatus">
          <div class="period day">
            {{day}}
          </div>
          天
          <div class="period hour">
            {{hr}}
          </div>
          :
          <div class="period minute">
            {{min}}
          </div>
          :
          <div class="period second">
            {{sec}}
          </div>
        </div>
        <div class="stratTime" v-show="startStatus">
          {{notStarted}}
        </div>
        <div class="endTime" v-show="endTimeStatus">
          已结束
        </div>
        <div class="last">

        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    endTime: {
      type: Number
    },
    startTime: {
      type: Number
    },
    endMsg: {
      type: String
    }
  },
  data () {
    return {
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      // 倒计时之前
      startStatus: false,
      // 控制倒计时
      timeStatus: true,
      // 控制倒计时完后的状态
      endTimeStatus: false,
      notStarted: ''
    }
  },
  created () {
  },

  computed: {},
  mounted () {
    this.countdown()
  },
  methods: {
    countdown () {
      const end = this.endTime
      const start = this.startTime
      const now = Date.parse(new Date())
      if (now < start) {
        this.startStatus = true
        this.timeStatus = false
      } else {
        this.startStatus = false
        this.timeStatus = true
      }
      const msec = end - now
      if (msec <= 0) {
        this.timeStatus = false
        this.endTimeStatus = true
        return
      }
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.day = day >= 10 ? day : '0' + day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(function () {
        that.countdown()
      }, 1000)
    }
  }
}
</script>
