<template>
  <div>
    <div class="weui-cells__title">申请表</div>
    <group>
      <x-input readonly title="使用日期" placeholder="请输入申请日期" v-model="borrowDate" required></x-input>
      <x-input readonly title="使用时段" placeholder="请输入申请时段" v-model="borrowTime" required></x-input>
      <x-input readonly title="使用地点" placeholder="请输入申请地点"  v-model="borrowPlace" required></x-input>
      <x-input  title="申请单位" placeholder="请输入申请单位" v-model="borrowTeam" required></x-input>
      <x-input  title="申请人" is-type="china-name" placeholder="请输入申请个人" v-model="borrowEr" required></x-input>
      <x-input  title="手机" is-type="china-mobile" placeholder="申请人手机" v-model="phone" required></x-input>
      <x-input  title="QQ" is-type="number" placeholder="申请人QQ" v-model="qq" required></x-input>
      <x-input  title="活动主题" placeholder="请输入申请主题" v-model="theme" required></x-input>
    </group>
      <div class="weui-cells__title">详细说明</div>
    <group>
      <x-textarea  placeholder="请填写详细说明(50字以内)" :height="80" :max="50" v-model="detail" required></x-textarea>
    </group>
         <check-icon :value.sync="rulesvalue">我已阅读并同意<a class="rules" v-on:click="viewrules()">场地使用规则</a>
</check-icon>
      <x-button style="margin-bottom: 1.5rem" :disabled="!rulesvalue" @click.native="submit()" type="primary">{{btn_text}}</x-button>
      <alert :value="alertvalue" title='学习支持中心使用规则'>
        <slot name = 'default'>
          <p  class="weui-dialog__bd" v-html = "alertText"></p>
        </slot>
      </alert>
  </div>
</template>
<script>
import { Alert, CheckIcon, XButton, Group, XInput, XTextarea, Datetime, PopupPicker, Cell} from 'vux'
import { mapActions, mapState} from 'vuex'
export default {
  components: {
    Alert,
    CheckIcon,
    XButton,
    XInput,
    Group,
    XTextarea,
    PopupPicker,
    Datetime,
    Cell

  },
  computed: {
    ...mapState([
      'alert'
    ])
  },
  data () {
    return {
      room_id: this.$route.params.room_id,
      userAccount: this.$store.getters.get_useraccount,
      borrowDate: this.$route.params.borrowDate,
      borrowTime: this.$route.params.borrowTime,
      borrowPlace: this.$route.params.borrowPlace,
      borrowTeam: '',
      borrowEr: '',
      phone: null,
      qq: null,
      theme: '',
      detail: '',
      rulesvalue: false,
      btn_text: '我要申请',
      isAdmin: this.$store.getters.get_isadmin, // 不能使用mapGetters？
      alertvalue: false,
      alertText: '<p>1.使用单位必须通过“小民同学官微”申请平台申请，并遵守申请使用时段的截止时间，不得拖延时间影响其它单位的正常使用。</p><p>2.若活动取消，要求活动方至少提前半小时告知中心工作人员。</p><p>3.布置场地时，墙面、墙柱一律禁止使用粘性物品粘贴，一经发现且不听劝阻者，立即取消使用资格。</p><p>4.活动厅室内如需装饰，只能采用绳线；如需海报宣传，请各申请单位提前准备好易拉宝、支架、展板等宣传专用用具进行摆放。</p><p>5.活动方务必保护好公共财产，若发现损坏、遗失公物的行为，对当事人处以被损实物原价200%的经济处罚。</p><p>6.活动结束后，活动方需清理场地，所产生的垃圾及其他物品带离各厅室；如有移动桌椅的情况，务必全部按原处还原，经工作人员确认后方可。</p><p>7.活动方需积极配合值班人员工作，若严重违反场地管理条例者，将纳入活动黑名单，4年内限制申请使用。</p>'
    }
  },
  created () {
    if (this.isAdmin) {
      this.btn_text = '使用教室'
    }
    if (this.$route.params.borrowTime[1] === '10:00-12:00') {
      this.borrowTime = '08:00-12:00'
    } if (this.$route.params.borrowTime[2] === '12:00-14:00') {
      this.borrowTime = '08:00-14:00'
    } if (this.$route.params.borrowTime[3] === '14:00-16:00') {
      this.borrowTime = '08:00-16:00'
    } if (this.$route.params.borrowTime[4] === '16:00-18:00') {
      this.borrowTime = '08:00-18:00'
    } if (this.$route.params.borrowTime[5] === '18:00-20:00') {
      this.borrowTime = '08:00-20:00'
    } if (this.$route.params.borrowTime[1] === '12:00-14:00') {
      this.borrowTime = '10:00-14:00'
    } if (this.$route.params.borrowTime[2] === '14:00-16:00') {
      this.borrowTime = '10:00-16:00'
    } if (this.$route.params.borrowTime[3] === '16:00-18:00') {
      this.borrowTime = '10:00-18:00'
    } if (this.$route.params.borrowTime[4] === '18:00-20:00') {
      this.borrowTime = '10:00-20:00'
    } if (this.$route.params.borrowTime[1] === '14:00-16:00') {
      this.borrowTime = '12:00-16:00'
    } if (this.$route.params.borrowTime[2] === '16:00-18:00') {
      this.borrowTime = '12:00-18:00'
    } if (this.$route.params.borrowTime[3] === '18:00-20:00') {
      this.borrowTime = '12:00-20:00'
    } if (this.$route.params.borrowTime[1] === '16:00-18:00') {
      this.borrowTime = '14:00-18:00'
    } if (this.$route.params.borrowTime[2] === '18:00-20:00') {
      this.borrowTime = '14:00-20:00'
    } if (this.$route.params.borrowTime[1] === '18:00-20:00') {
      this.borrowTime = '16:00-20:00'
    }
  },
  // computed: {
  //   ...mapState(['devDetail', 'user'])
  // },
  methods: {
    ...mapActions(['esBorrowApply', 'adminBorrowApply']),
    submit () {//管理员直接借入教室
      if (this.isAdmin) {
        let applyForm = {
          room_id: this.room_id,
          borrowDate: this.borrowDate,
          borrowTime: this.$route.params.borrowTime,
          borrowPlace: this.borrowPlace,
          borrowTeam: this.borrowTeam,
          borrowEr: this.borrowEr,
          phone: this.phone,
          qq: this.qq,
          theme: this.theme,
          detail: this.detail,
          userAccount: this.$store.getters.get_useraccount,
          adminName: this.$store.getters.get_adminname,
          adminContacts: this.$store.getters.get_admincontacts,
          feedback: 'selfagree',
          requestType: 'borrowin'
        }
        this.adminBorrowApply(applyForm)
      } else {//用户申请借入教室
        let applyForm = {
          room_id: this.room_id,
          borrowDate: this.borrowDate,
          borrowTime: this.$route.params.borrowTime,
          borrowPlace: this.borrowPlace,
          borrowTeam: this.borrowTeam,
          borrowEr: this.borrowEr,
          phone: this.phone,
          qq: this.qq,
          theme: this.theme,
          detail: this.detail,
          userAccount: this.$store.getters.get_useraccount,
          requestType: 'borrowin'
        }
        this.esBorrowApply(applyForm)
      }
    },
    viewrules () {
      setTimeout(() => {
        this.alertvalue = true
      }, 0)
      this.alertvalue = false
      this.rulesvalue=false
    }
  }
}
</script>
<style lang="scss" scoped>
.weui-dialog__bd{
  height: 200px;
  overflow-y: scroll;
  text-align: left;
}
.rules{
  color: green;
  text-decoration:underline
}
</style>
