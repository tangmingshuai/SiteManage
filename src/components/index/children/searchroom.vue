<template>
  <div>
  <div>
    <div class="weui-cells__title">选择日期</div>
    <group>
        <datetime :start-date='startDay' :end-date='endDay'	 v-model='selectDay' @on-change="change" title="使用日期"></datetime>
    </group>
    <checklist title="选择时段" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
    <x-button  @click.native="active()" type="primary" :disabled="disable001">查询</x-button>
 </div>
 <div class="foot-nav">
    <router-link @click.native="isHome=true" to="/index/searchroom" tag="div" class="nav-item">
       <img v-if="isHome" src="../../../assets/img/home_hover.png"/>
       <img v-else src="../../../assets/img/home.png">
       <span>首页</span>
    </router-link>
    <router-link @click.native="isHome=false,isMine=true" to="/index/mine/borrowDev" tag="div" class="nav-item">
       <img v-if="isMine&&!isHome" src="../../../assets/img/mine_hover.png">
       <img v-else src="../../../assets/img/mine.png">
       <span>我的</span>
    </router-link>
 </div>
</div>
</template>
<script>
import { XButton, Group, XInput, XTextarea, Datetime, Checklist} from 'vux'
import { mapActions } from 'vuex'
export default {
  components: {
    XButton,
    XInput,
    Group,
    Datetime,
    XTextarea,
    Checklist
  },
  data () {
    return {
      isHome: true,
      isMine: true,
      startDay: '',
      selectDay: '',
      endDay: '',
      commonList: [ '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00' ],
      checklist001: ['08:00-10:00'],
      labelPosition: '',
      disable001: false
    }
  },
  watch: {
    checklist001: function () {
      if (this.checklist001.length === 0) {
        this.disable001 = true
      } else {
        this.disable001 = false
      }
     // `this` 指向 vm 实例
    }
  },
  created () {
    let d = new Date()
    let str1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    let str2 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 6)
    this.startDay = str1
    this.selectDay = str1
    this.endDay = str2
  },

  methods: {
    ...mapActions(['searchroom', 'set_userdatetime']),
    active () {
      const borrowtime = {borrowDate: this.selectDay, borrowTime: this.checklist001}
      this.set_userdatetime(borrowtime)
      this.searchroom(borrowtime)
    },
    change (val, label) {
      // console.log('change', val, label)
    },
    onChange (val) {
      // console.log('change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.foot-nav{
  height: 3.5rem;
  width: 100%;
  position: fixed;
  flex-shrink: 0;
  flex-grow: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  .nav-item{
    height: 100%;
    width: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 1.6rem;
    }
    span{
      text-align: center;
        color: #999999;
      font-size: 0.8rem;
      line-height: 0.8rem;
      margin-top: 0.2rem;
      width: 5rem;
    }
  }
}
</style>
