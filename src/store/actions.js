import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import {serialize} from '../util.js'
export default {
  login ({ commit, state }, payload) {
    return axios.post('/api/user/api.php', payload)
      .then(res => {
        if (res.data.user_id === 'student') {
          commit('set_userlogin', res.data); router.push({path: '/index/searchroom'})
        } else if (res.data.user_id === 'admin') {
          commit('set_adminlogin', res.data); router.push({path: '/index/list',params: {isHome: true,isMine:false,isState:false}})
        } else {
          setTimeout(() => {
            commit('set_alert', {value: true, title: '认证失败', content: '您输入的账号或密码有误，请确认后重新输入'})
          }, 0)
          commit('set_alert', {value: false, title: '认证失败', content: '您输入的账号或密码有误，请确认后重新输入'})
        }
      })
  },
  searchroom ({commit, state}, payload) {
    var borrowTimeTest = payload.borrowTime[0]
    let i // 判断选择了多少时间段
    for (i = 1; i < payload.borrowTime.length; i++) {
      borrowTimeTest += payload.borrowTime[i]
    }
    function judgetime (borrowTime, time) {
      if (borrowTime.indexOf(time) !== -1) {
        return 1
      } else {
        return 0
      }
    }
    if (  // 处理不能勾选非连续时间段的逻辑= =，自己算法真的差
        (i >= 2 && judgetime(borrowTimeTest, '08:00-10:00') && !judgetime(borrowTimeTest, '10:00-12:00')) ||
        (i >= 3 && judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && !judgetime(borrowTimeTest, '12:00-14:00')) ||
        (i >= 4 && judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && !judgetime(borrowTimeTest, '14:00-16:00')) ||
        (i >= 5 && judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && judgetime(borrowTimeTest, '14:00-16:00') && !judgetime(borrowTimeTest, '16:00-18:00')) ||
        (i >= 2 && !judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && !judgetime(borrowTimeTest, '12:00-14:00')) ||
        (i >= 3 && !judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && !judgetime(borrowTimeTest, '14:00-16:00')) ||
        (i >= 4 && !judgetime(borrowTimeTest, '08:00-10:00') && judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && judgetime(borrowTimeTest, '14:00-16:00') && !judgetime(borrowTimeTest, '16:00-18:00')) ||
        (i >= 2 && !judgetime(borrowTimeTest, '08:00-10:00') && !judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && !judgetime(borrowTimeTest, '14:00-16:00')) ||
        (i >= 3 && !judgetime(borrowTimeTest, '08:00-10:00') && !judgetime(borrowTimeTest, '10:00-12:00') && judgetime(borrowTimeTest, '12:00-14:00') && judgetime(borrowTimeTest, '14:00-16:00') && !judgetime(borrowTimeTest, '16:00-18:00')) ||
        (i >= 2 && !judgetime(borrowTimeTest, '08:00-10:00') && !judgetime(borrowTimeTest, '10:00-12:00') && !judgetime(borrowTimeTest, '12:00-14:00') && judgetime(borrowTimeTest, '14:00-16:00') && !judgetime(borrowTimeTest, '16:00-18:00'))
    ) {
      setTimeout(() => {
        commit('set_alert', {value: true, title: '时段选择错误', content: '请勾选连续的借用时段'})
      }, 0)
      commit('set_alert', {value: false, title: '时段选择错误', content: '请勾选连续的借用时段'})
    } else {
      let query = serialize(payload)
      return axios.get('/api/list.php' + query)
          .then((res) => {
            if (res.data.length === 0) { // 判断是否有空闲教室，若没有，弹窗提示
              setTimeout(() => {
                commit('set_alert', {value: true, title: '没有空闲场地', content: '请重新选择'})
              }, 0)
              commit('set_alert', {value: false, title: '没有空闲场地', content: '请重新选择'})
            } else {
              router.push({name: 'index',
                params: { borrowDate: payload.borrowDate, borrowTime: payload.borrowTime
                }
              })
          .catch((err) => { console.log(err) })
            }
          })
    }
  },
  // 处理主页用户和管理员跳转
  indexRouter  ({commit, state}, payload) {
    if (payload.isAdmin) {
      router.push({name: 'roomUseDetail',
        params: { queryDate: payload.queryDate, borrowTime: payload.borrowTime, room_id: payload.room_id
        }})
    } else {
      router.push({name: 'roomDetail',
        params: { borrowDate: payload.borrowDate, borrowTime: payload.borrowTime, room_id: payload.room_id
        }})
    }
  },
    // 获取主页设备信息列表
  getIndexList ({ commit, state }, payload) {
    if (payload.borrowTime) {
      commit('set_loading', {show: true, text: '加载中'})
      let query = serialize(payload)
      return axios.get('/api/list.php' + query)
        .then((res) => {
          if (res.data) {
            commit('set_indexList', res.data)
            commit('set_loading', {show: false})
          }
        })
        .catch((err) => { console.log(err) })
    }
  },
  // 将选择的教室的详情信息保存到states管理，方便在填写表单页面返回时存有数据
  addRoomDetailCache ({ commit, state }, payload) {
    commit('set_roomDetailCache', payload)
  },
  getAdminList ({ commit, state }, payload) {
    commit('set_loading', {show: true, text: '加载中'})
    return axios.post('/api/admin/api.php', payload)
        .then((res) => {
          if (res.data) {
            commit('set_indexList', res.data)
            commit('set_loading', {show: false})
          }
        })
        .catch((err) => { console.log(err) })
  },
  // 用户获取表单列表
  getList ({ commit, state }, payload) {
    if (payload.userAccount !== '') {
      commit('set_loading', {show: true, text: '加载中'})
      return axios.post('/api/user/api.php', payload)
        .then((res) => {
          if (res.data) {
            let string = payload.requestType
            switch (string) {
              case 'getchecklist':
                commit('set_checkList', res.data)
                break
              case 'getpasslist':
                commit('set_passList', res.data)
                break
              case 'getnopasslist':
                commit('set_nopassList', res.data)

                break
              case 'getexpiredlist':
                commit('set_expiredList', res.data)
                break
              default:
            }
            commit('set_loading', {show: false})
          }
        })
        .catch((err) => { console.log(err) })
    }
  },
  // 管理员获取表单
  adminGetList ({commit, state}, payload) {
    commit('set_loading', {show: true, text: '加载中'})
    return axios.post('/api/admin/api.php', payload)
        .then((res) => {
          if (res.data) {
            let string = payload.requestType
            switch (string) {
              case 'getchecklist':
                commit('set_checkList', res.data)
                break
              case 'getpassedlist':
                commit('set_passList', res.data)
                break
              case 'getnopasslist':
                commit('set_nopassList', res.data)

                break
              case 'getexpiredlist':
                commit('set_expiredList', res.data)
                break
              default:
            }
            commit('set_loading', {show: false})
          }
        })
        .catch((err) => { console.log(err) })
  },
// 判断用户是否在同一时间内借入
  checkuser ({commit, state}, checkinfo) {
    return axios.post('/api/checkuser.php', checkinfo)
      .then((res) => {
        if (res.data === 'no') {
          setTimeout(() => {
            commit('set_alert', {value: true, title: '不可借入', content: '您在当前时段已经借入其他教室'})
          }, 0)
          commit('set_alert', {value: false, title: '不可借入', content: '您在当前时段已经借入其他教室'})
        } else if (res.data === 'yes') {
          router.push({name: 'fillBorrowApply',
            params: {room_id: checkinfo.room_id,
              borrowPlace: checkinfo.borrowPlace,
              borrowDate: checkinfo.borrowDate,
              borrowTime: checkinfo.borrowTime}})
        }
      })
      .catch((err) => { console.log(err) })
  },
    // 用户创建新的借用申请
  esBorrowApply ({commit, state}, payload) {
    return axios.post('/api/borrowin.php', payload)
    .then((res) => {
      if (res.data === 'error') {
        setTimeout(() => {
          commit('set_alert', {value: true, title: '参数不合法', content: '请检查信息输入是否正确'})
        }, 0)
        commit('set_alert', {value: false, title: '参数不合法', content: '请检查信息输入是否正确'})
      } else if (res.data === 'success') {
        setTimeout(() => {
          commit('set_toast', {value: true, text: '请等待管理员批准'})
        }, 0)
        commit('set_toast', {value: false, text: '请等待管理员批准'})
        router.push({name: 'mine',params: {isHome: false,isMine:true,isState:false}})
      }
    })
    .catch((err) => { console.log(err) })
  },
  // 管理员创建借用申请（直接借用，教室状态改为已通过）
  adminBorrowApply ({commit, state}, payload) {
    return axios.post('/api/admin/api.php', payload)
    .then((res) => {
      if (res.data === 'error') {
        setTimeout(() => {
          commit('set_alert', {value: true, title: '参数不合法', content: '请检查借入流程是否正确'})
        }, 0)
        commit('set_alert', {value: false, title: '参数不合法', content: '请检查借入流程是否正确'})
      } else if (res.data === 'success') {
        setTimeout(() => {
          commit('set_toast', {value: true, text: '借入成功'})
        }, 0)
        commit('set_toast', {value: false, text: '借入成功'})
        router.push({name: 'mine',params: {isHome: false,isMine:true,isState:false}})
      }
    })
    .catch((err) => { console.log(err) })
  },
  // 处理管理员教室状态详情页的跳转逻辑
  roomUseDetailRouter ({commit, state}, payload) {
    if (payload.state === '可使用') {
      router.push({name: 'fillBorrowApply',
        params: {room_id: payload.id,
          borrowPlace: payload.borrowplace,
          borrowDate: payload.borrowDate,
          borrowTime: payload.borrowtime}})
    } else if (payload.state === '待审核') {
      router.push({name: 'borrowDevDetail',
        params: {item: payload.item, requesttype: payload.requestType}})
    }
  },
  // 取消待审核表单
  cancelChecking ({commit, state}, payload) {
    return axios.post('/api/user/api.php', payload)
    .then((res) => {
      if (res.data === 'error') {
        setTimeout(() => {
          commit('set_alert', {value: true, title: '参数不合法', content: '请检查取消流程是否正确'})
        }, 0)
        commit('set_alert', {value: false, title: '参数不合法', content: '请检查取消流程是否正确'})
      } else if (res.data === 'success') {
        setTimeout(() => {
          commit('set_toast', {value: true, text: '已取消申请'})
        }, 0)
        commit('set_toast', {value: false, text: '已取消申请'})
        router.push({name: 'mine'})
      }
    })
    .catch((err) => { console.log(err) })
  },
  // 管理员取消待审核表单
  adminCancelChecking ({commit, state}, payload) {
    return axios.post('/api/admin/api.php', payload)
    .then((res) => {
      if (res.data === 'error') {
        setTimeout(() => {
          commit('set_alert', {value: true, title: '参数不合法', content: '请检查取消流程是否正确'})
        }, 0)
        commit('set_alert', {value: false, title: '参数不合法', content: '请检查取消流程是否正确'})
      } else if (res.data === 'success') {
        setTimeout(() => {
          commit('set_toast', {value: true, text: '已取消申请'})
        }, 0)
        commit('set_toast', {value: false, text: '已取消申请'})
        router.push({name: 'mine'})
      }
    })
    .catch((err) => { console.log(err) })
  },
  // 管理员通过待审核表单
  adminAgreeChecking ({commit, state}, payload) {
    return axios.post('/api/admin/api.php', payload)
    .then((res) => {
      if (res.data === 'error') {
        setTimeout(() => {
          commit('set_alert', {value: true, title: '参数不合法', content: '请检查取消流程是否正确'})
        }, 0)
        commit('set_alert', {value: false, title: '参数不合法', content: '请检查取消流程是否正确'})
      } else if (res.data === 'success') {
        setTimeout(() => {
          commit('set_toast', {value: true, text: '已通过申请'})
        }, 0)
        commit('set_toast', {value: false, text: '已通过申请'})
        router.push({name: 'mine'})
      }
    })
    .catch((err) => { console.log(err) })
  },

    // 获取教室借用详情（管理端）
  getRoomUseDetail ({commit, state}, payload) {
    commit('set_loading', {show: true, text: '加载中'})
    return axios.post('/api/admin/api.php', payload)
        .then((res) => {
          commit(`set_roomUseDetail`, res.data)
          commit('set_loading', {show: false})
        })
        .catch((err) => {
          console.log(err)
        })
  },
  // 保存管理员选择的日期
  set_admindatetime ({commit, state}, payload) {
    commit(`set_admindatetime`, payload.queryDate)
  },
  // 保存用户选择的日期
  set_userdatetime ({commit, state}, payload) {
    commit(`set_userdatetime`, payload)
  },

  // 管理员更改教室可借状态
  changeRoomState ({commit, state}, payload) {
    commit('set_loading', {show: true, text: '加载中'})
    return axios.post('/api/admin/api.php', payload)
      .then((res) => {
        if (res.data === 'error') {
          setTimeout(() => {
            commit('set_alert', {value: true, title: '参数不合法', content: '请检查取消流程是否正确'})
          }, 0)
          commit('set_alert', {value: false, title: '参数不合法', content: '请检查取消流程是否正确'})
        } else if (res.data === 'success') {
          setTimeout(() => {
            commit('set_toast', {value: true, text: '教室状态已更改'})
          }, 0)
          commit('set_toast', {value: false, text: '教室状态已更改'})

          const roominfo = {requestType: 'getroomstates'}
          return axios.post('/api/admin/api.php', roominfo)
            .then((res) => {
              commit(`set_roomStates`, res.data)
              commit('set_loading', {show: false})
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 管理员获取教室可借状态
  getRoomState ({commit, state}, payload) {
    return axios.post('/api/admin/api.php', payload)
      .then((res) => {
        commit(`set_roomStates`, res.data)
        commit('set_loading', {show: false})
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
