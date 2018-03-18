<template>
  <div class="wrapBorrowing">
    <dev-list :list="checkList"></dev-list>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters} from 'vuex'
import devList from '../../common/devList.vue'
export default {
  components: {
    mapActions,
    mapState,
    devList
  },
  data () {
    return {
      isAdmin: this.$store.getters.get_isadmin // 不能使用mapGetters？
    }
  },
  computed: {
    ...mapState(['checkList']),
    ...mapGetters(['get_useraccount'])
  },
  created () {
    //判断是否为管理员，若是，获取所有数据，否则获取对应用户数据
    if (this.isAdmin) {
      this.adminGetList({requestType: 'getchecklist'})
    } else {
      this.getList({userAccount: this.get_useraccount, requestType: 'getchecklist'})
    }
  },
  methods: {
    ...mapActions(['getList', 'adminGetList']),
  }
}
</script>
<style lang="scss" scoped>
.wrapBorrowing{
  overflow: scroll;
  width: 100%;
}
</style>
