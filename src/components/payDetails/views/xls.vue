<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>传化进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>
        <table class="info-table">
          <tr>
            <td>商户类型</td>
            <td>
              <span v-if="xlsMchInfo.organization_type=='1'">小微商户</span>
              <span v-else-if="xlsMchInfo.organization_type=='2'">个体工商户</span>
              <span v-else-if="xlsMchInfo.organization_type=='3'">企业</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>商户名称</td>
            <td>{{xlsMchInfo.name}}</td>
          </tr>
          <tr>
            <td>商户简称</td>
            <td>{{xlsMchInfo.shortname}}</td>
          </tr>
          <tr>
            <td>MCC码</td>
            <td>{{xlsMchInfo.mcc_code}}</td>
          </tr>
          <tr>
            <td>subMCC码</td>
            <td>{{xlsMchInfo.sub_mcc_code}}</td>
          </tr>
          <tr>
            <td>小微经营类型</td>
            <td>
              <span v-if="xlsMchInfo.person_type=='MICRO_TYPE_STORE'">门店场所</span>
              <span v-else-if="xlsMchInfo.organization_type=='MICRO_TYPE_MOBILE'">流动经营/便民服务</span>
              <span v-else-if="xlsMchInfo.organization_type=='MICRO_TYPE_ONLINE'">线上商品/服务交易默认</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>店铺/商户地址</td>
            <td>{{xlsMchInfo.province}}{{xlsMchInfo.city}}{{xlsMchInfo.area}}{{xlsMchInfo.address}}</td>
          </tr>

          <tr>
            <td>主营业务</td>
            <td>{{xlsMchInfo.main_business}}</td>
          </tr>
          <tr>

          <tr>
            <td>支付服务用途</td>
            <td>{{xlsMchInfo.payment_purposes}}</td>
          </tr>
          <tr>

          <tr>
            <td>法人/联系人姓名</td>
            <td>{{xlsMchInfo.contact}}</td>
          </tr>
          <tr>
            <td>法人/经营者联系电话</td>
            <td>{{xlsMchInfo.service_phone}}</td>
          </tr>

          <tr>
            <td>证件号码</td>
            <td>{{xlsMchInfo.id_card_number}}</td>
          </tr>

          <tr>
            <td>证件有效期</td>
            <td>{{xlsMchInfo.exprie_date=='99991231'?'长期':xlsMchInfo.exprie_date}}</td>
          </tr>
          <tr>
            <td>商户证件类型</td>
            <td>{{xlsMchInfo.license_type}}</td>
          </tr>

          <tr>
            <td>商户证件号</td>
            <td>{{xlsMchInfo.license_number}}</td>
          </tr>

          <tr>
            <td>商户成立日期</td>
            <td>{{xlsMchInfo.found_date}}</td>
          </tr>
          <tr>
            <td>商户证件有效期</td>
            <td>{{xlsMchInfo.license_exprie_date}}</td>
          </tr>
          <tr>
            <td>商户注册资本</td>
            <td>{{xlsMchInfo.registered_capital}}</td>
          </tr>
          <tr>
            <td>受益所有人</td>
            <td>{{xlsMchInfo.benefit_contact}}</td>
          </tr>
          <tr>
            <td>受益所有人身份证号码</td>
            <td>{{xlsMchInfo.benefit_id_card_number}}</td>
          </tr>
          <tr>
            <td>受益所有人证件有效期</td>
            <td>{{xlsMchInfo.benefit_exprie_date}}</td>
          </tr>
          <tr>
            <td>商户联系人姓名</td>
            <td>{{xlsMchInfo.mch_contact}}</td>
          </tr>
          <tr>
            <td>商户联系人电话</td>
            <td>{{xlsMchInfo.mch_service_phone}}</td>
          </tr>
          <tr>
            <td>商户联系人证件号</td>
            <td>{{xlsMchInfo.mch_id_card_number}}</td>
          </tr>
          <tr>
            <td>商户联系人邮箱</td>
            <td>{{xlsMchInfo.email}}</td>
          </tr>
          <tr>
            <td>结算账户类型</td>
            <td>{{xlsMchInfo.type==1?'私账':'公账'}}</td>
          </tr>
          <tr>
            <td>银行编码</td>
            <td>{{xlsMchInfo.bank_code}}</td>
          </tr>
          <tr>
            <td>开户名称</td>
            <td>{{xlsMchInfo.account_name}}</td>
          </tr>
          <tr>
            <td>银行账号</td>
            <td>{{xlsMchInfo.account_number}}</td>
          </tr>
          <tr>
            <td>开户省份/开户城市/支行名称</td>
            <td>{{xlsMchInfo.bank_province_code}}{{xlsMchInfo.bank_city_code}}{{xlsMchInfo.branch_name}}</td>
          </tr>
          <tr>
            <td>报备渠道</td>
            <td>{{xlsMchInfo.channel}}</td>
          </tr>
          <tr>
            <td>微信渠道号</td>
            <td>{{xlsMchInfo.wechat_channel_no}}</td>
          </tr>
          <tr>
            <td>支付宝pid</td>
            <td>{{xlsMchInfo.alipay_pid}}</td>
          </tr>
          <tr>
            <td>身份证正面</td>
            <td>
              <img :src="imgFil(xlsMchInfo.idcard_front_pic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>身份证反面</td>
            <td>
              <img :src="imgFil(xlsMchInfo.idcard_back_pic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>商户证件照片</td>
            <td>
              <img :src="imgFil(xlsMchInfo.license_pic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>银行卡照</td>
            <td>
              <img :src="imgFil(xlsMchInfo.bankcard_pic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>门头照</td>
            <td>
              <img :src="imgFil(xlsMchInfo.door_pic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>店内环境照</td>
            <td>
              <img :src="imgFil(xlsMchInfo.environment_pic)" alt="" class="previewImg">
            </td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    getInfo
  } from '../api/xls'
  import {url} from '@/utils/request'
  import {mixins} from "../../mixins/mixins";

  let that;
  export default {
    name: "xls",
    mixins:[mixins],
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        xlsMchInfo: {},
      }
    },
    beforeCreate: function () {
      that = this
    },
    filters: {
      industryFil: function (val) {
        if (val == '' || val == null) {
          return ''
        }
        let data = that.industryOptions
        let text
        for (let i in data) {
          if (val == data[i].value) {
            text = data[i].name
            break;
          }
        }

        return text || '未知'
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.pc = this.$route.query.pc;
      this.na = this.$route.query.na || '';

      this.getInfofun()

    },
    methods: {
      /**
       * 获取信息
       */
      getInfofun: function () {
        getInfo(this.id).then(res => {
          console.log(res);
          let data = res.obj
          this.dataSet(data)
        }).catch(e => {

        })
      },


      /**
       * 处理回显数据
       */
      dataSet: function (data) {
        this.xlsMchInfo = data.xlsMchInfo
      },

      /**
       * 跳出
       */
      jumpOut: function () {
        this.$emit('gobackbutton')
      },

      /**
       *获取图片  进件专用的方法
       */
      imgFil: function (val) {

        if (val) {
          if (val === '' || val == null) {
            return ''
          }
          let arrayStr = val.split('\\'); // 凭\\分割出文件名
          if(arrayStr.length>4){
            return url + '/filepath/'+arrayStr[(arrayStr.length - 2)]+"/" + arrayStr[(arrayStr.length - 1)];
          }else{
            return url + '/filepath/' + arrayStr[(arrayStr.length - 1)];
          }
        } else {
          let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC';
          return base64
        }

      },

    }
  }
</script>

<style scoped>

  .info-table {
    width: 100%;
  }

  .info-table tr {
    font-size: 14px;
    color: #3A3A3A;
    line-height: 40px;
  }

  .info-table tr td:nth-child(1) {
    padding-right: 20px;
    text-align: right;
    width: 150px;
  }

  .info-table tr td:nth-child(2) {

  }

  .info-table tr td:nth-child(2) img {
    width: 200px;
    height: auto;
  }


</style>
