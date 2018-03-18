<template>
  <div class="wrapBorrowing">
    <dev-list :list="nopassList"></dev-list>
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
    ...mapState(['nopassList']),
    ...mapGetters(['get_useraccount'])
  },
  created () {
    if (this.isAdmin) {
      this.adminGetList({requestType: 'getnopasslist'})
    } else {
      this.getList({userAccount: this.get_useraccount, requestType: 'getnopasslist'})
    }
  },
  methods: {
    ...mapActions(['getList','adminGetList'])
  }
}
</script>
<style lang="scss" scoped>
.wrapBorrowing{
  overflow: scroll;
  width: 100%;
}
</style>
