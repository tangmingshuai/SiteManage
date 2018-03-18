<template>
  <div class=" wrap can-lend-detail">
    <div class="weui-cells__title">{{roomplace}}</div>
    <ul class="detail-info">
      <li><span class="title">场地类型</span><span class="value count">{{roomtype}}</span></li>
      <li><span class="title">容纳人数</span><span class="value">{{roomnumber}}</span></li>
      <li><span class="title">设备</span><span class="value">{{roomdevice}}</span></li>
    </ul>
    <div class="weui-cells__title"></div>
    <group title="使用情况">
      <div  v-for="(item, index) in items"  @click="router(item)">
        <cell v-bind:title="item.title" >
          <div>
            <span :class="item.spancolor">{{item.state}}</span>
          </div>
        </cell>
        <hr style="height:1px;border:none;border-top:1px solid #CCCCCC;" />
      </div>
  </group>
  <x-button  @click.native="viewClass()" type="primary">{{btn_text}}</x-button>
  <div v-transfer-dom>
  <x-dialog :show.sync="tableShow" class="dialog-demo">
    <slot name = 'default'>
      <p  class="weui-dialog__bd" v-html = "alertText"></p>
    </slot>
    <div @click="tableShow=false">
      <span class="vux-close"></span>
    </div>
  </x-dialog>
  </div>
  </div>
</template>
<script>
import { Cell, Group, XDialog, TransferDomDirective as TransferDom, XButton } from 'vux'
import { mapActions, mapGetters, mapState} from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    Cell,
    Group,
    XDialog,
    XButton
  },
  data () {
    return {
      tableShow: false,
      btn_text: '查看一周教室情况',
      items: [
        {
          state: '可使用',
          title: '08:00-10:00',
          spancolor: 'spangreen'
        },
        {
          state: '可使用',
          title: '10:00-12:00',
          spancolor: 'spangreen'
        },
        {
          state: '可使用',
          title: '12:00-14:00',
          spancolor: 'spangreen'
        },
        {
          state: '可使用',
          title: '14:00-16:00',
          spancolor: 'spangreen'
        },
        {
          state: '可使用',
          title: '16:00-18:00',
          spancolor: 'spangreen'
        },
        {
          state: '可使用',
          title: '18:00-20:00',
          spancolor: 'spangreen'
        }
      ],
      alertText: '<table><tr><th class="section">1</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th class="section">2</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>',
      roomtype: '',
      roomnumber: '',
      roomplace: '',
      roomdevice: '',
      room_id: this.$route.params.room_id,
      queryDate: this.$route.params.queryDate
    }
  },
  computed: {
    ...mapState(['roomUseDetail', 'roomStates']),
    ...mapGetters(['get_useraccount'])
  },
  created () {
    // 判断是否需要根据保存的id获取教室信息
    if (!this.room_id) {
      this.room_id = this.$store.state.roomDetailCache.room_id
      this.queryDate = this.$store.state.roomDetailCache.queryDate
    }
    // 保存选择的教室id，用于从填表界面返回时根据id获取教室信息
    const roomInfo = {room_id: this.room_id, queryDate: this.queryDate}
    this.addRoomDetailCache(roomInfo)
    // 判断教室状态
    for (let $i = 0; $i < Object.keys(this.$store.state.roomUseDetail).length; $i++) { // 后端传回的为一个对象（应该要传回数组= =),暂时这么处理
      if (this.$store.state.roomUseDetail[$i].id === this.room_id) {
        if (this.$store.state.roomUseDetail[$i].time1 === '待审核') {
          this.items[0].state = this.$store.state.roomUseDetail[$i].time1
          this.items[0].spancolor = 'spanblue'
        } else if (this.$store.state.roomUseDetail[$i].time1 === '已通过') {
          this.items[0].state = this.$store.state.roomUseDetail[$i].theme
          this.items[0].spancolor = 'spanblack'
        }
        if (this.$store.state.roomUseDetail[$i].time2 === '待审核') {
          this.items[1].state = this.$store.state.roomUseDetail[$i].time2
          this.items[1].spancolor = 'spanblue'
        } else if (this.$store.state.roomUseDetail[$i].time2 === '已通过') {
          this.items[1].state = this.$store.state.roomUseDetail[$i].theme
          this.items[1].spancolor = 'spanblack'
        }
        if (this.$store.state.roomUseDetail[$i].time3 === '待审核') {
          this.items[2].state = this.$store.state.roomUseDetail[$i].time3
          this.items[2].spancolor = 'spanblue'
        } else if (this.$store.state.roomUseDetail[$i].time3 === '已通过') {
          this.items[2].state = this.$store.state.roomUseDetail[$i].theme
          this.items[2].spancolor = 'spanblack'
        }
      }
    }
    // 处理教室详情信息
    for (let $i = 0; $i < this.$store.state.indexList.length; $i++) {
      if (this.$store.state.indexList[$i].id === this.room_id) {
        this.roomtype = new RegExp(/.*(?=\()/).exec(this.$store.state.indexList[$i].typenumber)[0]
        this.roomnumber = new RegExp(/\d{2,}/).exec(this.$store.state.indexList[$i].typenumber)[0]
        this.roomplace = this.$store.state.indexList[$i].place
        this.roomdevice = this.$store.state.indexList[$i].device
        break
      }
    }
    // 判断教室是否可用
    const roominfo = {requestType: 'getroomstates'}
    this.getRoomState(roominfo)
    for (let $i = 0; $i < this.roomStates.length; $i++) {
      if (this.roomStates[$i].state === 'off' && this.roomStates[$i].id === this.room_id) {
        for (let $i = 0; $i < this.items.length; $i++) {
          this.items[$i].state = '暂停使用'
          this.items[$i].spancolor = 'spanyellow'
        }
      }
    }
  },
  methods: {
    ...mapActions(['roomUseDetailRouter', 'getRoomState', 'addRoomDetailCache']),
    router (item) {
      if (item.state === '待审核') {
        for (let $i = 0; $i < Object.keys(this.$store.state.roomUseDetail).length; $i++) { // 后端传回的为一个对象（应该要传回数组= =),暂时这么处理
          if (this.$store.state.roomUseDetail[$i].id === this.room_id) {
            const roominfo = {state: item.state, borrowtime: item.title, borrowplace: this.roomplace, item: this.$store.state.roomUseDetail[$i], borrowDate: this.queryDate, requestType: 'roomUseDetailRouter'}
            this.roomUseDetailRouter(roominfo)
            break
          }
        }
      } else if (item.state === '可使用') {
        const roominfo = {id: this.room_id, state: item.state, borrowtime: item.title, borrowplace: this.roomplace, borrowDate: this.queryDate, requestType: 'roomUseDetailRouter'}
        this.roomUseDetailRouter(roominfo)
      }
    },
    viewClass () {
      this.tableShow = true
    }
  }

}
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
</style>
<style lang="scss" scoped>
.spangreen{
  color: green;
}
.spanblack{
  color: black;
}.spanblue{
  color: blue;
}
.spanyellow{
  color: orange;
}
.detail-info{
  width: 100%;
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  li{
    padding: 0.5rem 0;
    margin-left: 1rem;
    border-bottom: 1px solid #E5E5E5;
    .title{
      font-size: 1rem;
      color: #000;
      width: 30%;
      // height: 100%;
      top: 0px;
      display: inline-block;
    }
    .value{
      padding-top: 0;
    }
    .count{
      font-size: 1.1rem;
    }
    .dev{
      display: flex !important;
      flex-direction: row;
      align-items: flex-start;
      .dev-info{
        display: flex;
        flex-direction: column;
      }
      img{
        height: 3.5rem;
        width: 3.5rem;
        margin-top: 5px;
      }
    }
  }
}
  .careful{
    display: flex;
    align-items: flex-start;
    .value{
      height: 3rem;
      display: inline-block;
    }
  }
.borrow-info{
  padding: 0.2rem 1rem;
  span{
    margin-right: 1rem;
  }
}
.lend-btn{
  margin-top: 2.5rem;
  width: 90%;
  overflow: hidden;
}


.weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
