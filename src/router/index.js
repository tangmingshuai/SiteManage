import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/login'

import index from '../components/index/index'
import list from '../components/index/list.vue'

import indexlist from '../components/index/children/list.vue'
import searchroom from '../components/index/children/searchroom'
import mine from '../components/index/children/mine.vue'
import statemanage from '../components/index/children/statemanage.vue'

import roomDetail from '../components/index/children/children/roomDetail.vue'
import roomUseDetail from '../components/index/children/children/roomUseDetail.vue'

import fillBorrowApply from '../components/index/children/children/fillBorrowApply.vue'

import borrowDev from '../components/borrowDev/borrowDev.vue'
import checking from '../components/borrowDev/children/checking.vue'
import passed from '../components/borrowDev/children/passed.vue'
import nopass from '../components/borrowDev/children/nopass.vue'
import expired from '../components/borrowDev/children/expired.vue'
import borrowDevDetail from '../components/borrowDev/children/children/borrowDevDetail.vue'

Vue.use(Router)
export default new Router({
  routes: [
      { path: '/', redirect: {name: 'login'}},
      { path: '/login', name: 'login', component: login},
      { path: '/list', name: 'list', component: list},
      // 首页
    { path: '/index',
      redirect: {name: 'list'},
      name: 'index',
      component: index,
      children: [
        { path: 'list', name: 'indexlist', component: indexlist},
          // 主页设备列表
          { path: 'searchroom', name: 'searchroom', component: searchroom},
          // 状态管理
          { path: 'statemanage', name: 'statemanage', component: statemanage},
          // 我的部分
        { path: 'mine',
          redirect: {name: 'borrowDev'},
          name: 'mine',
          component: mine,
          children: [
              // 借入设备模块
            {path: 'borrowDev',
              redirect: {name: 'checking'},
              name: 'borrowDev',
              component: borrowDev,
              children: [
                  {path: 'checking', name: 'checking', component: checking},
                  {path: 'passed', name: 'passed', component: passed},
                  {path: 'nopass', name: 'nopass', component: nopass},
                  {path: 'expired', name: 'expired', component: expired}
              ]
            }
          ]
        }
      ]
    },
      // 教室详情
      { path: '/roomDetail', name: 'roomDetail', component: roomDetail},

      //教室使用详情
      { path: '/roomUseDetail', name: 'roomUseDetail', component: roomUseDetail},

      // 填写借用申请页
      { path: '/fillBorrowApply', name: 'fillBorrowApply', component: fillBorrowApply},

      // 填写借用申请页
      { path: '/borrowDevDetail', name: 'borrowDevDetail', component: borrowDevDetail}
  ]
})
