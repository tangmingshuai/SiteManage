<template>
  <div class="list">
    <div v-transfer-dom>
      <popup v-model="showPopup">
          <datetime-view confirm-text="确认" format="YYYY-MM-DD" @on-change="change" v-model="datetime"></datetime-view>
      </popup>
    </div>
    <div v-show="isAdmin" class="selectdata">
      <p  @click="showPopup=true">{{title}}</p>
      <p >{{weekday}}</p>
    </div>
    <div v-show="!isAdmin" class="weui-cells__title">空闲场地</div>
<div  v-for="item in indexList">
    <div class="weui-panel weui-panel_access">
      <div @click="router(item.id)"  class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="item.picurl">
          </div>
          <div class="weui-media-box__bd list_item item_info">
              <h4 class="weui-media-box__title">{{item.place}}</h4>
              <p class="weui-media-box__desc"> {{item.typenumber}}</p>
          </div>
          <div class="weui-cell__ft">></div>
        </a>
      </div>
    </div>
    <cell></cell>
</div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters} from 'vuex'
  import { Cell, Popup, XButton, TransferDom, Datetime, DatetimeView, Group} from 'vux'
  export default {
    data () {
      return {
        formatValueFunction (val) {
          return val.replace(/-/, '年').replace(/-/, '月').concat('日')
        },
        title: '点击选择\n日期',
        datetime: '',
        weekday: '默认为当前日期',
        showPopup: false,
        borrowDate: this.$route.params.borrowDate,
        queryDate: this.$store.state.admindatetime,
        borrowTime: this.$route.params.borrowTime,
        isAdmin: this.$store.getters.get_isadmin // 不能使用mapGetters？
      }
    },
    components: {
      Cell,
      Group,
      Popup,
      Datetime,
      DatetimeView,
      XButton,
      TransferDom
    },
    computed: {
      ...mapState(['indexList']),
      ...mapGetters(['get_useraccount'])

    },
    created () {
      if (this.isAdmin) {
        this.getAdminList({userAccount: this.get_useraccount, requestType: 'getindexlist'}) // post请求，多接口api需要识别请求，因此加入一个type参数

        if (this.$store.state.admindatetime.length === 0) { // 判断是否已选择时间，为选择则使用当天时间
          let date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
          let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          let dateStr = year + '-' + month + '-' + day
          const roomuseinfo = {queryDate: this.dateStr, requestType: 'getroomstate'}
          this.getRoomUseDetail(roomuseinfo)
          this.change(dateStr)
        } else {
          const roomuseinfo = {queryDate: this.queryDate, requestType: 'getroomstate'}
          this.getRoomUseDetail(roomuseinfo)
          this.datetime = this.$store.state.admindatetime // 同步时间选择器为当前选择日期
          this.change(this.$store.state.admindatetime)
        }
      } else {
        this.getIndexList({borrowDate: this.borrowDate, borrowTime: this.borrowTime})// get请求
      }
    },
    methods: {
      ...mapActions(['getIndexList', 'getRoomUseDetail', 'set_admindatetime', 'indexRouter', 'getAdminList', 'getRoomStates']),
      router (id) {
        this.indexRouter({isAdmin: this.isAdmin, queryDate: this.$store.state.admindatetime, borrowDate: this.borrowDate, borrowTime: this.borrowTime, room_id: id})
      },
      change (value) {
        const roomuseinfo = {queryDate: value, requestType: 'getroomstate'}
        this.set_admindatetime(roomuseinfo)
        this.getRoomUseDetail(roomuseinfo) // 重新获取教室状态列表
        value = value.replace('-', '年')
        value = value.replace('-', '月')
        value = value.concat('日')
        let year = new RegExp(/\d*(?=年)/).exec(value)
        let month = new RegExp(/\d*(?=月)/).exec(value)
        let day = new RegExp(/\d*(?=日)/).exec(value)
        let date = new Date(year, month - 1, day)
        let weekday = date.getDay()
        switch (weekday) {
          case 1:
            this.title = value
            this.weekday = '星期一'
            break
          case 2:
            this.title = value
            this.weekday = '星期二'
            break
          case 3:
            this.title = value
            this.weekday = '星期三'
            break
          case 4:
            this.title = value
            this.weekday = '星期四'
            break
          case 5:
            this.title = value
            this.weekday = '星期五'
            break
          case 6:
            this.title = value
            this.weekday = '星期六'
            break
          case 0:
            this.title = value
            this.weekday = '星期日'
            break
        }
      },
      click () {
        this.showPopup = true
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.selectdata{
  background-color: #09bb07;
  color: white;
  text-align: center;
  font-size: 80%;
  height: 3rem;
}
.weui-cell{
  height: 0.1px;
  background: #f0f0f0;
}
.list{
  flex-grow: 1;
  white-space: nowrap;
  position: relative;
  overflow: auto;
}
.weui-media-box__desc{
  font-size: 1rem;
  color: #353535;
}
    a.weui-media-box{
      position: relative !important;
    }
    .weui-panel__bd{
      height: 7rem !important;
    }
    .weui-media-box__hd{
      width: 5rem;
      height: 5rem;
    }
    .item_info{
      height: 5rem;
    }
    p{
      margin-top: 6px;
    }
    .count{
       color: #189f17;
       font-weight: bold;
       font-size: 140%;
       margin-right: 4px;
    }
    .weui-btn{
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
</style>
