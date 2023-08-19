<template>
  <div class="app-container">

    <publicinto v-if="pc==2||pc==1||pc==101||pc==103" :channlename="na" @gobackbutton="goback"></publicinto>

    <hsf v-if="pc==104" :channlename="na" @gobackbutton="goback"></hsf>
    <yrm v-if="pc==102" :channlename="na" @gobackbutton="goback"></yrm>
    <fy v-if="pc==105" :channlename="na" @gobackbutton="goback"></fy>
    <ls v-if="pc==106" :channlename="na" @gobackbutton="goback"></ls>
    <ys v-if="pc==109" :channlename="na" @gobackbutton="goback"></ys>
    <wxmd v-if="pc==120" :channlename="na" @gobackbutton="goback"></wxmd>
    <xls v-if="pc==121" :channlename="na" @gobackbutton="goback"></xls>
    <tl v-if="pc==110" :channlename="na" @gobackbutton="goback"></tl>


  </div>
</template>

<script>


  import publicinto from '@/components/payDetails/views/publicinto'
  import hsf from '@/components/payDetails/views/hsf'
  import wxmd from '@/components/payDetails/views/wxmd'
  import yrm from '@/components/payDetails/views/yrm'
  import fy from '@/components/payDetails/views/fy'
  import ls from '@/components/payDetails/views/leshua'
  import ys from '@/components/payDetails/views/ys'
  import tl from '@/components/payDetails/views/tl'
  import xls from '@/components/payDetails/views/xls'


  export default {
    name: "merDetails",
    components: {publicinto, hsf, yrm, fy, ls, ys,wxmd,xls,tl}, //创建组件
    data() {
      return {
        id: '',
        pc: '',
        na: ''
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.pc = this.$route.query.pc;
      this.na = this.$route.query.na || '';
    },
    methods: {
      /**
       * 退出
       */
      goback: function () {
        this.$router.go('-1')
      }
    }
  }
</script>

<style scoped>

</style>
