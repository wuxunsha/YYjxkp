<style lang="less" scoped>
  @import url('~@/common/less/global.less');
  @import './login.less';
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

<template>
  <Row class="login" type="flex" justify="center" align="middle">
    <Col span="8" style="min-width: 600px; max-width: 750px">
      <Row class="login-box">
        <Col span="20" offset="2">
          <h1 class="header">益阳市绩效评估大数据平台</h1>
        </Col>
        <Col span="20" offset="2" class="login-form">
          <Form ref="formLogin" :model="params" :rules="loginRules">
            <FormItem prop="userName">
              <Input v-model="params.userName" placeholder="输入账号/手机号码" class="login-input" maxlength="10" show-word-limit >
                <Icon type="md-person" color="#0972E7" size="24" slot="prefix" />
              </Input>
            </FormItem>
            <FormItem prop="password" class="ivu-form-item-content-custome">
              <Input v-model="params.password" placeholder="输入登录密码" type="password">
                <Icon type="md-lock" color="#0972E7" size="24" slot="prefix"/>
              </Input>
            </FormItem>
            <FormItem prop="verifycode" class="ivu-form-item-content-custome" v-if="needCode">
              <Row>
                <Col span="12">
                  <Input v-model="params.verifycode" placeholder="输入验证码">
                    <Icon type="md-key" color="#0972E7" size="24" slot="prefix" />
                  </Input>
                </Col>
                <Col span="8" offset="3">
                  <div class="code-view" @click="getCode">
                    <img :src="code" alt="验证码">
                  </div>
                </Col>
              </Row>
            </FormItem>
            <FormItem class="btn-login">
              <Button type="primary" size="large" @click="handleSubmit">登录</Button>
              <!-- <Button type="primary" size="large" @click="handleSubmit" :loading="btn_loading">登录</Button> -->
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Spin fix v-if="showConfigStatus">
        <Icon size="20" type="ios-loading" class="demo-spin-icon-load" />
        {{configStatus}}
      </Spin>
    </Col>
  </Row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    // 登录账号校验
    // const validateAccount = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入账号/手机号码'))
    //   } else {
    //     if (this.formCustom.passwdCheck !== '') {
    //       // 对第二个密码框单独验证
    //       this.$refs.formCustom.validateField('passwdCheck')
    //     }
    //     callback()
    //   }
    // }
    // 密码校验
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.formCustom.passwdCheck !== '') {
    //       // 对第二个密码框单独验证
    //       this.$refs.formCustom.validateField('passwdCheck')
    //     }
    //     callback()
    //   }
    // }
    // 验证码校验
    // const validateCode = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入验证码'))
    //   } else {
    //     if (this.formCustom.passwdCheck !== '') {
    //       // 对第二个密码框单独验证
    //       this.$refs.formCustom.validateField('passwdCheck')
    //     }
    //     callback()
    //   }
    // }
    return {
      needCode: false,
      col_width: 8,
      btn_loading: false,
      configStatus: '',
      showConfigStatus: false,
      code: '',
      params: {
        userName: '',
        password: '',
        verifycode: ''
      },
      loginRules: {
        // userName: [
        //   { validator: validateAccount, trigger: 'blur' }
        // ],
        // password: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // verifycode: [
        //   { validator: validateCode, trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    let _isNeedCode = sessionStorage.getItem('NEEDCODE')
    if (_isNeedCode === '1') {
      this.needCode = true
      this.getCode()
    } else {
      this.needCode = false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'loadRoute',
      'getImgCode'
    ]),
    // 获取验证码
    getCode () {
      this.getImgCode().then(res => {
        if (res.data.code === 10000) {
          this.code = `data:image/png;base64,${res.data.data}`
          this.params.verifycode = res.data.msg.split(':')[1]
        } else {
          console.log('获取到的验证码:', res)
        }
      })
    },
    handleSubmit ({ userName = this.params.userName, password = this.params.password, verifycode = this.params.verifycode }) {
      if (this.params.userName === '') {
        this.$Message.warning('账户名不能为空')
        return
      }
      if (this.params.password === '') {
        this.$Message.warning('密码不能为空')
        return
      }
      if (this.needCode && this.params.verifycode === '') {
        this.$Message.warning('验证码不能为空')
        return
      }
      this.btn_loading = true
      this.handleLogin({ userName, password, verifycode }).then(res => {
        sessionStorage.setItem('NEEDCODE', '0')
        this.btn_loading = false
        this.showConfigStatus = true
        this.configStatus = '正在获取用户信息...'
        setTimeout(() => {
          this.configStatus = '正在加载系统设置...'
          // 根据权限配置路由
          this.loadRoute(res).then(res => {
            location.reload()
            // 跳转首页
            // this.$router.push({
            //   name: this.$config.homeName
            // })
          })
        }, 100)
      }).catch(err => {
        this.needCode = true
        this.getCode()
        sessionStorage.setItem('NEEDCODE', '1')
        console.log(err)
      })
    }
  }
}
</script>
