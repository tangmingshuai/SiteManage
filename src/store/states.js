import Vue from 'vue'
export default {
  loading: {
    show: false,
    text: '加载中'
  },
  alert: {
    value: false,
    title: '',
    content: ''
  },
  toast: {
    value: false,
    type: 'success',
    'is-show-mask': false,
    text: ''
  },
  user: {
    user: '',
    user_id: ''
  },
  admin: {
    user: '',
    user_id: '',
    user_name: '',
    user_contacts: ''
  },
  admindatetime: '',
  userdatetime: '',
  roomDetailCache: [],
  indexList: [],
  checkList: [],
  passList: [],
  nopassList: [],
  expiredList: [],

  searchList: [],
  roomUseDetail: [],
  // 教室状态
  roomStates: []
}
