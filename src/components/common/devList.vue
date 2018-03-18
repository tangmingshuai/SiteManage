<template>
  <div class="dev-list-panel">
    <div v-for="item in list" style="background: #fff">
      <div class="dev-item-box"  @click="$router.push({name: 'borrowDevDetail', params: {item:item,requesttype:item.requesttype } })">
         <div class="dev-item">
           <img class="dev-item-img" :src="item.picurl"/>
           <ul class="dev-item-info">
              <li class="dev-item-info-title"><span class="dev-item-info-left">{{item.typenumber}}</span></li>
              <li><span class="dev-item-info-left"></span><span class="dev-item-info-right">{{item.theme}}</span></li>
              <li><span class="dev-item-info-left"></span><span class="dev-item-info-right">{{item.showdate}}</span></li>
           </ul>
           <div class="weui-cell__ft">></div>
         </div>
      </div>
        <cell></cell>
    </div>
  </div>
</template>
<script>
import { Cell} from 'vux'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: ['list'],
  methods: {
  },
  components: {
    Cell
  },
  computed: {
   // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'get_useraccount'
    ]),
    userAccount () {
      return this.get_useraccount
    }
  }
}
</script>
<style lang="scss" scoped>
.weui-cell{
  height: 0.1px;
  background: #f0f0f0;
}
.weui-cell__ft{
  margin: auto;
}
.dev-item-info-right{
  display: block;
  width:  200px;/*对宽度的定义,根据情况修改*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1rem;
  color: #353535;
}
.dev-list-panel{
  width: 100%;
  height:100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .dev-item-box{
    height: 100px;
    width: 100%;
    position: relative;
    &::after{
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #E5E5E5;
      color: #E5E5E5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
      left: 15px;
    }
    .dev-item{
      width: 94%;
      height: 72px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: flex-start;
      .dev-item-img{
        width: 70px;
        margin-right: 15px;
      }
      .dev-item-info{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 0.8rem;
        color: #a9a9a9;
        .dev-item-info-title{
          color: #000;
          font-size: 1rem;
          .dev-item-info-left{
            margin-right: 3rem;
          }

        }
      }
    }
  }
}
</style>
