<template>
  <div class=" wrap can-lend-detail">
    <div class="weui-cells__title">场地详情</div>
    <ul class="detail-info">
      <li><span class="title">场地类型</span><span class="value count">{{roomtype}}</span></li>
      <li><span class="title">容纳人数</span><span class="value">{{roomnumber}}</span></li>
      <li><span class="title">地点</span><span class="value">{{roomplace}}</span></li>
      <li><span class="title">设备</span><span class="value">{{roomdevice}}</span></li>
      <li><span class="title">负责人</span><span class="value">{{roomleader}}</span></li>
      <li><span class="title">联系方式</span><span class="value">{{roomcontacts}}</span></li>
    </ul>

    <x-button
      @click.native.once="submit" href="javascript:" class="lend-bt" type="primary">我要申请
    </x-button>
  </div>
</template>
<script>
import { XDialog, TransferDomDirective as TransferDom, XButton } from 'vux'
import { mapActions } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    XButton
  },
  data () {
    return {
      roomtype: '',
      roomnumber: '',
      roomplace: '',
      roomdevice: '',
      roomleader: '',
      roomcontacts: '',
      room_id: this.$route.params.room_id,
      borrowDate: this.$store.state.userdatetime.borrowDate,
      borrowTime: this.$store.state.userdatetime.borrowTime,
      showLendRecord: false
    }
  },
  methods: {
    ...mapActions(['checkuser','addRoomDetailCache']),
    submit () {
      const checkinfo = {room_id: this.room_id,
        borrowDate: this.borrowDate,
        borrowTime: this.borrowTime,
        borrowPlace: this.roomplace,
        userAccount: this.$store.getters.get_useraccount}
      this.checkuser(checkinfo)
    }
  },
  created () {
    //判断是否需要根据保存的id获取教室信息
    if(!this.room_id){
      this.room_id= this.$store.state.roomDetailCache.room_id
    }
    //保存选择的教室id，用于从填表界面返回时根据id获取教室信息
    const roomInfo = {room_id: this.room_id}
    this.addRoomDetailCache(roomInfo)
    //根据教室id从state中匹配相应的教室详情
    for (let $i = 0; $i < this.$store.state.indexList.length; $i++) {
      if (this.$store.state.indexList[$i].id === this.room_id) {
        this.roomtype = this.$store.state.indexList[$i].typenumber
        this.roomnumber = this.$store.state.indexList[$i].typenumber
        this.roomplace = this.$store.state.indexList[$i].place
        this.roomdevice = this.$store.state.indexList[$i].device
        this.roomleader = this.$store.state.indexList[$i].leader
        this.roomcontacts = this.$store.state.indexList[$i].contacts
        break
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
  }

}
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
</style>
<style lang="scss" scoped>
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
