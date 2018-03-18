<template>
  <div class="index-wrap">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="foot-nav">
       <router-link v-show="!this.$store.getters.get_isadmin" @click.native="isHome=true" to="/index/searchroom" tag="div" class="nav-item">
          <img v-if="isHome" src="../../assets/img/home_hover.png"/>
          <img v-else src="../../assets/img/home.png">
          <span>首页</span>
       </router-link>
       <router-link v-show="this.$store.getters.get_isadmin" @click.native="isHome=true" to="/index/list" tag="div" class="nav-item">
          <img v-if="isHome" src="../../assets/img/home_hover.png"/>
          <img v-else src="../../assets/img/home.png">
          <span>首页</span>
       </router-link>
       <router-link @click.native="isHome=false,isMine=true,isState=false" to="/index/mine/borrowDev" tag="div" class="nav-item">
          <img v-if="!isHome&&isMine&&!isState" src="../../assets/img/mine_hover.png">
          <img v-else src="../../assets/img/mine.png">
          <span>我的</span>
       </router-link>
       <router-link v-show="isAdmin" @click.native="isHome=false,isMine=false,isState=true" to="/index/statemanage" tag="div" class="nav-item">
          <img v-if="!isHome&&!isMine&&isState" src="../../assets/img/statemanage_hover.png">
          <img v-else src="../../assets/img/statemanage.png">
          <span>状态管理</span>
       </router-link>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      isHome: this.$route.params.isHome,
      isMine: this.$route.params.isMine,
      isState: this.$route.params.isState,
      isAdmin: this.$store.getters.get_isadmin
    }
  },
  methods: {
  },
  create () {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.index-wrap{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;

}
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
.bottom{
  height: 4.5rem;
  width: 100%;
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  bottom: 0px;
   z-index: 9;
}
</style>
