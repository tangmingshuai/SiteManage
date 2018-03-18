<template>
  <div class="mine">
  <group title="可用状态管理">
    <div v-for="(item, roomid) in items" @click="showPlugin(item.roomid)">
  <cell  v-bind:title="item.title" >
    <div>
      <span style="color: green">{{item.state}}</span>
    </div>
  </cell>
    </div>
  </group>
  <div v-transfer-dom>
  <confirm v-model="confirmShow"
     title="更改场地可用状态"
     @on-cancel="onCancel"
     @on-confirm="onConfirm"
     @on-show="onShow"
     @on-hide="onHide">
       <p style="text-align:center;">是否确认更改场地可用状态</p>
     </confirm>
  </div>
</div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'
  import { Group, Cell, Tab, Confirm, TabItem, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'
  export default {
    data () {
      return {
        confirmShow: false,
        itemroomid: '',
        items: [
          {
            roomid: 0,
            title: '北书院一楼学习支持中心',
            state: 'error'
          }
          // ,
          // {
          //   roomid: 1,
          //   title: '学生活动中心三楼二活',
          //   state: 'error'
          // }
        ]
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      Tab,
      TabItem,
      Confirm,
      XSwitch,
      XButton
    },
    computed: {
      ...mapState(['roomStates'])
    },
    created () {
      // 获取教室状态信息
      const roominfo = {requestType: 'getroomstates'}
      this.getRoomState(roominfo)
      for (let $i = 0; $i < this.roomStates.length; $i++) {
        this.items[$i].state = this.roomStates[$i].state
      }
    },
    watch: {
      roomStates: function (val) {
        for (let $i = 0; $i < this.roomStates.length; $i++) {
          this.items[$i].state = this.roomStates[$i].state
        }
      }
    },
    methods: {
      ...mapActions(['changeRoomState', 'getRoomState']),
      showPlugin (roomid) {
        this.confirmShow = true
        this.itemroomid = roomid
      },
      onCancel () {
        this.confirmShow   = false
      },
      onConfirm () {
        const roominfo = {roomid: this.itemroomid, requestType: 'changeroomstate'}
        this.changeRoomState(roominfo)
      },
      onShow () {
      },
      onHide () {
      }
    }
  }
</script>
<style lang="scss" scoped>
.mine{
  flex-grow: 1;
   white-space: nowrap;
   position: relative;
   overflow: hidden;
   display: flex;
   flex-direction: column;
}
.nav-1{
  position: relative;
  height: 40px;
  display: flex;
  justify-content: space-around;
  background-color: #00be2f;
  color:#86d893;
  flex-shrink: 0;
  li{
    line-height: 40px;
  }
  .router-link-active{
    color: #fff;
  }
}
.vux-tab{
  background-color: #00be2f;
}
.feedback{
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background-color: #898888;
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before{
    content: '';
    height: 5px;
    width: 40%;
    border-radius: 2.5px;
    background-color: #fff;
  }
  &::after{
    content: '';
    position: absolute;
    height: 40%;
    width: 5px;
    border-radius: 2.5px;
    background-color: #fff;
  }
}
</style>
