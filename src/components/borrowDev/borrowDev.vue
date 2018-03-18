<template>
  <div class="borrow-dev">
    <ul class="nav-3">
      <router-link tag="li" :to="{name: 'checking'}">待审核</router-link>
      <router-link tag="li" :to="{name: 'passed'}">已通过</router-link>
      <router-link tag="li" :to="{name: 'nopass'}">未通过</router-link>
      <router-link tag="li" :to="{name: 'expired'}">已失效</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
  components: {
    Tab,
    TabItem
  }
}
</script>
<style lang="scss" scoped>
.router-link-active{
  color: #09bb07;
}
.borrow-dev{
  display: flex;
  margin-bottom: 40px;
  flex-direction: column;
}
</style>
