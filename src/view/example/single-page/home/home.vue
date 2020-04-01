<template>
  <div>
    <div class="content-box">
      <div class="pending-matter">
        <div class="pending-matter-header">
          <h4>
            <i class="icon-font iconwenjian"></i>
            待处理事项
            <span>({{pendingAmount}})</span>
          </h4>
        </div>
        <div class="pending-matter-content">
          <ul>
            <li v-for="item in todoList" :key="item.id" @click="pendingMatterDetails(item.busyType, item.busyNodes)">
              <Icon type="ios-medical" class="column"/>
              <span class="title">{{item.title.length > 22 ? item.title.substring(0,22) + '......' : item.title}}</span>
              <span class="time">{{item.createTime | dateYMD}}</span>
            </li>
          </ul>
        </div>
        <div class="page">
          <Page :total="pendingAmount" size="small" :page-size="queryInfo.size" :current="queryInfo.page" @on-change='handlePageChange'/>
        </div>
      </div>
      <div class="announcement">
        <div class="announcement-header">
          <h4>
            <i class="icon-font icontongzhi5"></i>
            通知通告
          </h4>
          <span @click="noticeListPage">
            更多>>
          </span>
        </div>
        <div class="announcement-content">
          <ul>
            <li v-for="item in noticeList" :key="item.id" @click="announcementDetails(item.id)">
              <span class="title">{{item.title.length > 30 ? item.title.substring(0,30) + '......' : item.title}}</span>
              <span class="time">{{item.createTime | dateYMD}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  todoList,
  noticeList
} from '@/api/home'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      // 待处理列表数据
      todoList: {},
      // 待处理事项数量
      pendingAmount: 0,
      queryInfo: {
        page: 1,
        size: 5
      },
      // 通知通告列表数据
      noticeList: {}
    }
  },
  created () {
    // 获取待处理列表
    this.getTodoList()
    // 获取通知通告列表
    this.getNoticeList()
  },
  methods: {
    // 获取待处理列表
    getTodoList () {
      const data = {
        pageIndex: this.queryInfo.page,
        pageSize: this.queryInfo.size
      }
      todoList(data).then(res => {
        if (res.data.code === 10000) {
          this.todoList = res.data.data.dataList
          this.pendingAmount = res.data.data.total
        }
      })
    },
    // 获取通知通告列表
    getNoticeList () {
      const data = {
        pageIndex: 1,
        pageSize: 5
      }
      noticeList(data).then(res => {
        if (res.data.code === 10000) {
          this.noticeList = res.data.data.dataList
        }
      })
    },
    // 查看待处理详情
    pendingMatterDetails (busyType, busyNodes) {
      // switch (busyType) {
      //   case 1:
      //     if (busyNodes === 1) {
      //       this.$router.push({
      //         path: 'notice_list_page'
      //       })
      //     }
      //     break
      // }
    },
    // 页码改变
    handlePageChange (page) {
      this.queryInfo.page = page
      this.getTodoList()
    },
    // 跳转通知通告列表页
    noticeListPage () {
      this.$router.push({
        path: 'notice_list_page'
      })
    },
    // 查看通知通告详情
    announcementDetails (id) {
      this.$router.push({
        path: 'notice_list_page',
        query: {
          id: id,
          type: 'notice_detail'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.content-box{
  display: flex;
  .pending-matter {
    flex: 0.8;
    height: 270px;
    background: #fff;
    padding: 16px 0 0 20px;
    margin-right: 10px;
    .pending-matter-header {
      overflow: hidden;
      h4 {
        float: left;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color:#333333;
        i {
          font-size: 26px;
          color: #0972E7;
          vertical-align: bottom;
        }
        span {
          color: #CB0303;
        }
      }
    }
    .pending-matter-content {
      margin-top: 14px;
      height: 190px;
      ul {
        padding-right: 20px;
        li {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 37px;
          color: rgba(102,102,102,1);
          border-bottom: 1px solid rgba(243,243,243,1);
          overflow: hidden;
          cursor: pointer;
          .column {
            margin-right: 8px;
            font-size: 12px;
            color: #0972E7;
          }
          .time {
            float: right;
            color: #ccc;
          }
        }
        li:hover {
          color: #0972E7;
          .time {
            color: #0972E7;
          }
        }
      }
    }
    .page {
      text-align: center;
      margin-top: 4px;
    }
  }
  .announcement {
    flex: 1;
    height: 270px;
    background: #fff;
    padding: 16px 20px;
    .announcement-header {
      overflow: hidden;
      h4 {
        float: left;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color:#333333;
        i {
          font-size: 26px;
          color: #0972E7;
          vertical-align: bottom;
        }
        span {
          color: #CB0303;
        }
      }
      >span {
        float: right;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: rgba(9,114,231,1);
        cursor: pointer;
      }
    }
    .announcement-content {
      margin-top: 14px;
      ul {
        li {
          position: relative;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 43px;
          color: rgba(102,102,102,1);
          overflow: hidden;
          cursor: pointer;
          padding-left: 20px;
          .time {
            float: right;
            color: #ccc;
          }
        }
        li:hover {
          color: #0972E7;
          .time {
            color: #0972E7;
          }
        }
        li:before {
          margin-top: -2px;
          content: '';
          position: absolute;
          left: 6px;
          top: 50%;
          width: 5px;
          height: 5px;
          background-color: #0972E7;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
