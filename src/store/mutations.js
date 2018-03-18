export default {
  set_loading (state, payload) {
    state.loading = payload
  },
  set_toast (state, payload) {
    state.toast = payload
  },
  set_userlogin (state, payload) {
    state.user = payload
  },
  set_adminlogin (state, payload) {
    state.admin = payload
  },
  set_indexList (state, payload) {
    state.indexList = payload
  },
  set_roomDetailCache (state, payload) {
    state.roomDetailCache = payload
  },
  set_checkList (state, payload) {
    state.checkList = payload
  },
  set_passList (state, payload) {
    state.passList = payload
  },
  set_nopassList (state, payload) {
    state.nopassList = payload
  },
  set_expiredList (state, payload) {
    state.expiredList = payload
  },
  set_roomStates (state, payload) {
    state.roomStates = payload
  },
  set_alert (state, payload) {
    state.alert = payload
  },
  set_admindatetime (state, payload) {
    state.admindatetime = payload
  },
  set_userdatetime (state, payload) {
    state.userdatetime = payload
  },
  set_roomUseDetail (state, payload) {
    state.roomUseDetail = payload
  },
  unset_roomUseDetail (state, payload) {
    state.roomUseDetail = null
  },

  // 社团设备
  set_canLend (state, payload) {
    state.canLend = payload
  },
  set_hasLend (state, payload) {
    state.hasLend = payload
  },
  set_hasTimeout (state, payload) {
    state.hasTimeout = payload
  },
  set_waitComfirm (state, payload) {
    state.waitComfirm = payload
  },

  // 借入设备
  set_borrowing (state, payload) {
    state.borrowing = payload
  },
  set_checking (state, payload) {
    state.checking = payload
  },
  set_hasTimeoutReturn (state, payload) {
    state.hasTimeoutReturn = payload
  },
  set_waitComfirmReturn (state, payload) {
    state.waitComfirmReturn = payload
  },

  // 消息审核
  set_borrowApplay (state, payload) {
    state.borrowApplay = payload
  },
  set_lendApply (state, payload) {
    state.lendApply = payload
  }
}
