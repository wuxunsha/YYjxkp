<style lang="less" scoped>
  /deep/ .ivu-avatar {
    background-color: #ffffff;
    margin-right: .9375rem;
  }
</style>
<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <span style="color: #ffffff; margin-right:10px">{{ orgName }}</span>
        <span style="color: #ffffff; margin-right:10px">{{ userName }}</span>
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="ios-arrow-down" color="#fff"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { getToken } from '@/libs/util'
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(getToken('USER_INFO'))
    },
    orgName () {
      return this.userInfo.orgName
    },
    userName () {
      return this.userInfo.userName
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
