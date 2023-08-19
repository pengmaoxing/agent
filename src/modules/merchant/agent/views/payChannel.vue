<template>
  <!--运渠-->
  <div class="app-container" id="mypage" v-loading="loading">
    <!--paywayConfigShow true 显示选择支付通道-->
    <div divName="预先选择支付通道" v-if="paywayConfigShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择支付通道</span>
        </div>
        <!--内容-->
        <div>
          <template>
            <el-form ref="form" label-width="170px">
              <el-form-item :label="item.selectItem.name+'支付通道：'"
                            v-for="(item,index) in payWayData" :key="index">
                <!--<el-input v-model="item.selectItem.value"></el-input>-->
                <el-select v-model="item.config" placeholder="请选择">
                  <el-option
                    v-for="option in item.selectItemList"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>


          <div class="btn-group">
            <el-button @click="cancelConfig">取消</el-button>
            <el-button type="primary" @click="submitPayConfig">下一步</el-button>
          </div>
        </div>
      </el-card>

    </div>

    <!--paywayConfigShow false 显示进件-->
    <div divName="审核修改" v-if="!paywayConfigShow">
      <!--新增支付通道后放在此处-->
      <!--wxpay 微信-->
      <!--alipay 支付宝-->

      <alipay v-if="currentPayChannel==1" @next="nextPayWayPage"
              mode="new"
              :payway="currentPayWay||null"
              :paywayname="currentPayWayName||null"
              :payChannel="currentPayChannel||null"
              :payChannelName="currentPayChannelName||null">
      </alipay>

      <wxpay v-else-if="currentPayChannel==2" @next="nextPayWayPage"
             mode="new"
             :payway="currentPayWay||null"
             :paywayname="currentPayWayName||null"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
      </wxpay>

      <hsf v-else-if="currentPayChannel==104" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hsf>

      <hyb v-else-if="currentPayChannel==101" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hyb>

      <yrm v-else-if="currentPayChannel==102" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </yrm>

      <tts v-else-if="currentPayChannel==103" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </tts>

      <fy v-else-if="currentPayChannel==105" @next="nextPayWayPage"
          mode="new"
          :payway="currentPayWay||null"
          :paywayname="currentPayWayName||null"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </fy>

      <cmf v-else-if="currentPayChannel==108" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </cmf>

      <hk v-else-if="currentPayChannel==123" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hk>

      <dx v-else-if="currentPayChannel==124" @next="nextPayWayPage"
          mode="new"
          :payway="currentPayWay||null"
          :paywayname="currentPayWayName||null"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </dx>

      <ryx v-else-if="currentPayChannel==125" @next="nextPayWayPage"
          mode="new"
          :payway="currentPayWay||null"
          :paywayname="currentPayWayName||null"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </ryx>

      <xryx v-else-if="currentPayChannel==126" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </xryx>

      <hsq v-else-if="currentPayChannel==127" @next="nextPayWayPage"
            mode="new"
            :payway="currentPayWay||null"
            :paywayname="currentPayWayName||null"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
      </hsq>

      <ys v-else-if="currentPayChannel==109" @next="nextPayWayPage"
          mode="new"
          :payway="currentPayWay||null"
          :paywayname="currentPayWayName||null"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </ys>

      <wxmd v-else-if="currentPayChannel==120" @next="nextPayWayPage"
            mode="new"
            :payway="currentPayWay||null"
            :paywayname="currentPayWayName||null"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
      </wxmd>

      <xls v-else-if="currentPayChannel==121" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </xls>

      <tl v-else-if="currentPayChannel==110" @next="nextPayWayPage"
           mode="new"
           :payway="currentPayWay||null"
           :paywayname="currentPayWayName||null"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </tl>

    </div>

  </div>

</template>

<script>
  import {
    findPayWay,
    saveRrecord,
  } from '../api/payChannel'

  import alipay from '@/components/payIncomimg/views/alipay'
  import wxpay from '@/components/payIncomimg/views/wxpay'
  import hsf from '@/components/payIncomimg/views/hsf'
  import hyb from '@/components/payIncomimg/views/hyb'
  import yrm from '@/components/payIncomimg/views/yrm'
  import tts from '@/components/payIncomimg/views/tts'
  import fy from '@/components/payIncomimg/views/fy'
  import cmf from '@/components/payIncomimg/views/cmf'
  import wxmd from '@/components/payIncomimg/views/wxmd'
  import ys from '@/components/payIncomimg/views/ys'
  import xls from '@/components/payIncomimg/views/xls'
  import tl from '@/components/payIncomimg/views/tl'
  import hk from '@/components/payIncomimg/views/hk'
  import ryx from '@/components/payIncomimg/views/ryx'
  import dx from '@/components/payIncomimg/views/dx'
  import xryx from '@/components/payIncomimg/views/xryx'
  import hsq from '@/components/payIncomimg/views/hsq'
  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: "payChannel",
    mixins: [mixins],
    components: {alipay, wxpay, hsf, hyb, yrm, tts, fy, cmf, ys,wxmd,xls,tl,hk,ryx,dx,xryx,hsq}, //创建组件
    data() {
      return {
        loading: false,
        paywayConfigShow: true, //显示配置


        payWayData: [],
        selectPayConfig: [], //选中的payWay数组
        currentPayWay: '', //目前在操作的Way
        currentPayWayName: '', //name
        currentPayChannel: '',//当前在操作的Channel
        currentPayChannelName: '',//当前在操作的Channel
        currentIndex: 0, //下标

        id: '',//当前进件商户id

        //进件表单数据集合，留作信息
        allIntoInfo: []
      }
    },
    mounted() {
      //获取正在进件的商户信息(id)
      this.getCurrMerInfo();

      //
      this.getPayWayData();
    },
    methods: {
      /**
       * 获取正在进件的商户信息
       */
      getCurrMerInfo: function () {
        //获取addMerchant的新进件商户id
        this.id = this.$route.query.id;  //接收ID
        console.log(this.id);
        if (this.id === '' || this.id == null || this.id === undefined) {
          this.$message.error('ID信息错误！无法继续');
        }
      },

      /**
       * 获取支付通道选项
       */
      getPayWayData: function () {
        findPayWay().then(res => {
          let data = res.obj; //赋值
          this.payWayData = this.deepCopy(data);
          this.dataFormat()
        }).catch(e => {

        })
      },
      /**
       * 获取到的数据预处理
       */

      dataFormat: function () {
        for (let i in   this.payWayData) {
          if (this.payWayData[i].selectItemList.length > 0) {
            this.$set(this.payWayData[i], 'config', this.payWayData[i].selectItemList[0].value || '')
          }
        }
      },

      /**
       * 提交前配置必要数据
       */
      submitPayConfig: function () {

        if (this.id === '' || this.id == null || this.id == undefined) {
          this.$message.error('没有ID,无法继续');
          return false
        }

        let data = this.payWayData;
        let formData = [];
        for (let i in data) {
          let obj = {};
          obj['payWay'] = data[i].selectItem.value;
          obj['payWayName'] = data[i].selectItem.name;
          obj['payChannel'] = data[i].config;

          //遍历保存所有要进件的payway paychannel
          for (let j in data[i].selectItemList) {
            if (data[i].selectItemList[j].value === data[i].config) {
              obj['payChannelName'] = data[i].selectItemList[j].name;
            }
          }

          formData.push(obj)
        }

        // //这是假的数据
        // let formData = [
        //   {payWay: 1, payWayName: '微信', payChannel: 2, payChannelName: '微信官方'},
        // ];

        this.selectPayConfig = formData;
        //进入进件 默认打开第一条
        this.paywayConfigShow = false; //关闭通道配置卡片
        this.currentPayWay = formData[0].payWay;
        this.currentPayWayName = formData[0].payWayName;
        this.currentPayChannel = formData[0].payChannel;
        this.currentPayChannelName = formData[0].payChannelName;
        this.currentIndex = 0 //下标

      },
      /**
       * 下一步进件
       */

      nextPayWayPage: function (data = null) {

        //保存当前进件数据
        if (data) {
          let tmpArr = [];
          for (let i in data) {
            let pw = this.currentPayWay;
            let pc = this.currentPayChannel;
            let pt = data[i].payType;
            let value = data[i].value;
            let obj = {};
            obj.payWay = pw;
            obj.payChannel = pc;
            obj.payType = pt;
            obj.value = value || '';
            tmpArr.push(obj)
          }
          this.allIntoInfo.push(tmpArr);
        }


        let len = this.selectPayConfig.length;
        // console.log(len);
        // 判断是否结束进件
        if (this.currentIndex + 1 >= len) {
          this.loading = true;
          console.log(this.allIntoInfo);
          this.feeHandleFormat();
          setTimeout(() => {
            this.$message.info('提交流程结束');
            this.$router.push({path: '/merchant/agent/views/merchant'})
          }, 1000);
          return false
        } else {

          //-----------
          this.currentIndex++; //当前使用的支付通道 下标++
          //当前下标的支付通道id 用于显示不同表单（父级用）
          this.currentPayWay = this.selectPayConfig[this.currentIndex].payWay;
          this.currentPayWayName = this.selectPayConfig[this.currentIndex].payWayName;
          this.currentPayChannel = this.selectPayConfig[this.currentIndex].payChannel;
          this.currentPayChannelName = this.selectPayConfig[this.currentIndex].payChannelName;
        }
        // console.log(this.currentPayWayIndex)
      },

      /**
       * 提交进件费率信息
       */
      feeHandleFormat: function () {
        //this.allIntoInfo;
        let data = this.allIntoInfo;
        if (data) {
          let tempArr = [];
          for (let i in data) {
            for (let j in data[i]) {
              let str = `${data[i][j].payChannel},${data[i][j].payWay},${data[i][j].payType},${data[i][j].value || 0}`
              tempArr.push(str)
            }
          }
          let feeStr = tempArr.join(';');

          console.log(feeStr);


          saveRrecord(this.id, feeStr).then(res => {

          }).catch(e => {

          })
        }

      },

      /**
       * 取消配置
       */
      cancelConfig: function () {
        this.$confirm('您还未配置通道, 是否退出?', '提醒', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/merchant/agent/views/merchant'})
        }).catch(() => {

        });

      },

    }
  }
</script>

<style scoped>
  .btn-group {
    width: 100%;
    max-width: 100%;
    text-align: center;

  }


  #page {
    overflow-y: scroll;
  }
</style>
