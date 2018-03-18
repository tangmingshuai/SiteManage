export default {
  get_user (state) {
    return state.user
  },
  get_useraccount (state) {
    if (state.user.user !== '') {
      return state.user.user
    } else if (state.admin.user !== '') {
      return state.admin.user
    }
  },
  get_adminname (state) {
    return state.admin.user_name
  },
  get_admincontacts (state) {
    return state.admin.user_contacts
  },
  get_isadmin (state) {
    if (state.user.user !== '') {
      return false
    } else if (state.admin.user !== '') {
      return true
    }
  }
}
