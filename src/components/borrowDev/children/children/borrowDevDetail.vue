  <template>
  <div class=" wrap comfirm-receive">
    <group :title="title" titleColor="#888888">
      <x-input readonly title="使用日期" placeholder="请输入申请日期" v-model="borrowDate"></x-input>
      <x-input readonly title="使用时段" placeholder="请输入申请时段" v-model="borrowTime"></x-input>
      <x-input readonly title="使用地点" placeholder="请输入申请地点"  v-model="borrowPlace"></x-input>
      <x-input readonly title="申请单位" placeholder="请输入申请单位" v-model="borrowTeam"></x-input>
      <x-input readonly title="申请人" is-type="china-name" placeholder="请输入申请个人" v-model="borrowEr"></x-input>
      <x-input readonly title="手机" is-type="china-mobile" placeholder="申请人手机" v-model="phone"></x-input>
      <x-input readonly title="QQ" is-type="number" placeholder="申请人QQ" v-model="qq"></x-input>
      <x-input readonly title="活动主题" placeholder="请输入申请主题" v-model="theme"></x-input>
    </group>
  </group>
  <group v-show="adminInfoShow" title="审核人" titleColor="#888888">
  <x-input readonly :title="adminName" placeholder="申请人" v-model="adminContacts"></x-input>
  </group>

  <group title="详细说明" titleColor="#888888">
    <x-textarea readonly placeholder="请填写详细说明(50字以内)" :height="80" :max="50" v-model="detail"></x-textarea>
  </group>
</group>
<group  v-show="fankuiShow" title="反馈说明" titleColor="#888888">
  <x-textarea  v-bind:readonly="ifFankui" placeholder="请填写详细说明(50字以内)" :height="80" :max="50" v-model="feedback"></x-textarea>
</group>
  <div>
    <x-button v-show="buttonShow1" @click.native.once="submit1()" :disabled="disable001"  class="btn" type="primary">{{btn_text1}}</x-button>
    <x-button v-show="buttonShow2" style="margin-bottom: 1.5rem" @click.native.once="submit2()" :disabled="disable001"  class="btn" type="warn">{{btn_text2}}</x-button>
  </div>
</div>

</template>
<script>
import { XButton, Group, XInput, XTextarea} from 'vux'
import { mapActions,mapState} from 'vuex'
export default {
  components: {
    XButton,
    XInput,
    Group,
    XTextarea
  },
  data () {
    return {
      title: '',
      type: this.$route.params.item.type,
      room_id: this.$route.params.item.id,
      borrowDate: this.formatDate(this.$route.params.item.borrowdate),
      btn_text1: '',
      btn_text2: '',
      borrowTime: this.$route.params.item.showtime,
      borrowPlace: this.$route.params.item.place,
      borrowTeam: this.$route.params.item.borrowteam,
      borrowEr: this.$route.params.item.borrower,
      phone: this.$route.params.item.phone,
      qq: this.$route.params.item.qq,
      theme: this.$route.params.item.theme,
      adminName: this.$route.params.item.adminname,
      adminContacts: this.$route.params.item.admincontacts,
      detail: this.$route.params.item.detail,
      feedback: this.$route.params.item.feedback,
      requesttype: this.$route.params.item.requesttype,
      fankuiShow: false,
      buttonShow1: false,
      buttonShow2: false,
      adminInfoShow: false, //在除审核页面外显示审核人的信息
      ifFankui: true,//在除待审核页面外，反馈说明均为readonly
      disable001:false,//根据教室状态判断能否审核教室
      isAdmin: this.$store.getters.get_isadmin // 不能使用mapGetters？
    }
  },
  computed: {
    ...mapState(['roomStates'])
  },
  watch: {//监测是否填写反馈说明，未填写时不能进行下一步操作
    feedback: function (val) {
      if(this.feedback!==''){
        this.disable001=false
      }else{
        this.disable001=true
      }
    }
  },
  created () {
    switch (this.requesttype) {  //根据不同的页面显示不同的样式
      case 'admincheck':
        this.title = '申请表'; this.btn_text1 = '同意'; this.btn_text2 = '拒绝'; this.buttonShow1 = 'true'; this.buttonShow2 = 'true'; this.fankuiShow = 'true';this.ifFankui=false;this.disable001=true
        break
	    case 'checking':
	      this.title = '申请表'; this.btn_text2 = '取消申请'; this.buttonShow2 = 'true'
        break
	    case 'passed':
        this.title = '申请表'; this.adminInfoShow = 'true'
        if (this.$route.params.item.feedback !== 'selfagree') { this.fankuiShow = 'true' }
        break
      case 'nopass':
        this.title = '申请表'; this.fankuiShow = 'true'; this.adminInfoShow = 'true'
        break
      case 'expired':
        this.title = '申请表'
        if (this.$route.params.item.feedback !== 'selfcancel') { this.fankuiShow = 'true' }
        break
    }
    //判断教室能否审核
    for (let $i = 0; $i < this.roomStates.length; $i++) {
      if(this.$route.params.item.id = this.roomStates[$i].id){
        if(this.roomStates[$i].state=='off'){
          this.disable001=true
        }
      }
    }
  },
  methods: {
    ...mapActions(['cancelChecking', 'adminCancelChecking', 'adminAgreeChecking']),
    formatDate (date) {  //将时间戳转换为日期
      return new Date(parseInt(date) * 1000).toLocaleString().replace(/\//g, '-').replace(/日/g, ' ').replace(/上午8:00:00/, '')
    },
    submit1 () { //管理员审核同意
      if (this.isAdmin) {
        let applyForm = {
          room_id: this.$route.params.item.id,
          borrowDate: this.$route.params.item.borrowdate,
          borrowEr: this.$route.params.item.borrower,
          borrowPlace: this.$route.params.item.place,
          borrowTeam: this.$route.params.item.borrowteam,
          theme: this.$route.params.item.theme,
          detail: this.$route.params.item.detail,
          phone: this.$route.params.item.phone,
          qq: this.$route.params.item.qq,
          feedback: this.feedback,
          userAccount: this.$route.params.item.borrowaccount,
          borrowTime: this.$route.params.item.borrowtime,
          adminName: this.$store.getters.get_adminname,
          adminContacts: this.$store.getters.get_admincontacts,
          requestType: 'adminAgreeChecking'
        }
        this.adminAgreeChecking(applyForm)
      }
    },
    submit2 () { //管理员审核拒绝
      if (this.isAdmin) {
        let applyForm = {
          room_id: this.$route.params.item.id,
          borrowDate: this.$route.params.item.borrowdate,
          borrowEr: this.$route.params.item.borrower,
          borrowPlace: this.$route.params.item.place,
          borrowTeam: this.$route.params.item.borrowteam,
          theme: this.$route.params.item.theme,
          detail: this.$route.params.item.detail,
          phone: this.$route.params.item.phone,
          qq: this.$route.params.item.qq,
          userAccount: this.$route.params.item.borrowaccount,
          borrowTime: this.$route.params.item.borrowtime,
          feedback: this.feedback,
          adminName: this.$store.getters.get_adminname,
          adminContacts: this.$store.getters.get_admincontacts,
          requestType: 'adminCancelChecking'
        }
        this.adminCancelChecking(applyForm)
      } else {//用户自己取消申请
        const cancelinfo = {
          room_id: this.$route.params.item.id,
          borrowDate: this.$route.params.item.borrowdate,
          borrowEr: this.$route.params.item.borrower,
          borrowPlace: this.$route.params.item.place,
          borrowTeam: this.$route.params.item.borrowteam,
          theme: this.$route.params.item.theme,
          detail: this.$route.params.item.detail,
          phone: this.$route.params.item.phone,
          qq: this.$route.params.item.qq,
          userAccount: this.$route.params.item.borrowaccount,
          borrowTime: this.$route.params.item.borrowtime,
          feedback: 'selfcancel',
          requestType: 'cancelchecking'}
        this.cancelChecking(cancelinfo)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
