<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通联进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>
        <table class="info-table">
          <tr>
            <td>商户名称</td>
            <td>{{oldTLMchInfo.merchantname}}</td>
          </tr>
          <tr>
            <td>商户简称</td>
            <td>{{oldTLMchInfo.shortname}}</td>
          </tr>
          <tr>
            <td>所在省</td>
            <td>{{oldTLMchInfo.province}}</td>
          </tr>
          <tr>
            <td>所在市</td>
            <td>{{oldTLMchInfo.city}}</td>
          </tr>

          <tr>
            <td>客服电话</td>
            <td>{{oldTLMchInfo.servicephone}}</td>
          </tr>
          <tr>
            <td>所属行业</td>
            <td>{{oldTLMchInfo.mccid}}</td>
          </tr>
          <tr>
            <td>商户性质</td>
            <td>
              <span v-if="oldTLMchInfo.comproperty=='1'">企业</span>
              <span v-else-if="oldTLMchInfo.comproperty=='3'">个体户</span>
              <span v-else-if="oldTLMchInfo.comproperty=='4'">个人</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>营业执照名称</td>
            <td>{{oldTLMchInfo.corpbusname}}</td>
          </tr>

          <tr>
            <td>统一社会信用代码证</td>
            <td>{{oldTLMchInfo.creditcode}}</td>
          </tr>
          <tr>

          <tr>
            <td>社会信用代码证有效期</td>
            <td>{{oldTLMchInfo.creditcodeexpire}}</td>
          </tr>
          <tr>

          <tr>
            <td>法人姓名</td>
            <td>{{oldTLMchInfo.legal}}</td>
          </tr>

          <tr>
            <td>法人代表证件类型</td>
            <td>
              <span v-if="oldTLMchInfo.legalidtype=='01'">身份证</span>
              <span v-else-if="oldTLMchInfo.legalidtype=='04'">港澳通行证</span>
              <span v-else-if="oldTLMchInfo.legalidtype=='05'">台湾通行证</span>
              <span v-else>未知</span>
            </td>
          </tr>

          <tr>
            <td>法人代表证件号</td>
            <td>{{oldTLMchInfo.legalidno}}</td>
          </tr>

          <tr>
            <td>法人身份证有效期</td>
            <td>{{oldTLMchInfo.legalidexpire}}</td>
          </tr>

          <tr>
            <td>注册地址</td>
            <td>{{oldTLMchInfo.address}}</td>
          </tr>
          <tr>
            <td>商户负责人</td>
            <td>{{oldTLMchInfo.contactperson}}</td>
          </tr>
          <tr>
            <td>商户负责人电话</td>
            <td>{{oldTLMchInfo.contactphone}}</td>
          </tr>
          <tr>
            <td>结算方式</td>
            <td>
              <span v-if="oldTLMchInfo.clearmode=='0'">自主提现</span>
              <span v-else-if="oldTLMchInfo.clearmode=='1'">结算到银行卡</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>账户号</td>
            <td>{{oldTLMchInfo.acctid}}</td>
          </tr>
          <tr>
            <td>账户名</td>
            <td>{{oldTLMchInfo.acctname}}</td>
          </tr>
          <tr>
            <td>账户类型</td>
            <td>
              <span v-if="oldTLMchInfo.accttype=='0'">对私</span>
              <span v-else-if="oldTLMchInfo.accttype=='1'">对公</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>卡折类型</td>
            <td>
              <span v-if="oldTLMchInfo.accttp=='00'">借记卡</span>
              <span v-else-if="oldTLMchInfo.accttp=='01'">存折</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>到账类型</td>
            <td>
              <span v-if="oldTLMchInfo.dztype=='D0'">D0</span>
              <span v-else-if="oldTLMchInfo.dztype=='D1'">D1</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>所属银行</td>
            <td>{{oldTLMchInfo.bankcode}}</td>
          </tr>
          <tr>
            <td>支付行号</td>
            <td>{{oldTLMchInfo.cnapsno}}</td>
          </tr>
          <tr>
            <td>拓展人</td>
            <td>{{oldTLMchInfo.expanduser}}</td>
          </tr>
          <tr>
            <td>合同有效日期</td>
            <td>{{oldTLMchInfo.contractdate}}</td>
          </tr>
          <tr>
            <td>所属父客户</td>
            <td>{{oldTLMchInfo.addfacusid}}</td>
          </tr>
          <tr>
            <td>结算人身份证号</td>
            <td>{{oldTLMchInfo.settidno}}</td>
          </tr>

          <tr>
            <td>是否三证合一</td>
            <td>{{oldTLMchInfo.thrcertflag==1?'是':'否'}}</td>
          </tr>
          <tr>
            <td>组织机构代码证号</td>
            <td>{{oldTLMchInfo.organcode}}</td>
          </tr>
          <tr>
            <td>组织机构代码证有效期</td>
            <td>{{oldTLMchInfo.organexpire}}</td>
          </tr>
          <tr>
            <td>对公账户信息</td>
            <td>{{oldTLMchInfo.pubacctinfo}}</td>
          </tr>
          <tr>
            <td>线上线下业务场景</td>
            <td>{{oldTLMchInfo.thrcertflag==0?'线下':'线上'}}</td>
          </tr>
          <tr>
            <td>法人手机号</td>
            <td>{{oldTLMchInfo.legalphone}}</td>
          </tr>
          <tr>
            <td>渠道备注</td>
            <td>{{oldTLMchInfo.unsdremark}}</td>
          </tr>
          <tr>
            <td>无纸化标识</td>
            <td>{{oldTLMchInfo.agreetype==1?'电子协议':'纸质协议'}}</td>
          </tr>

          <tr>
            <td>营业执照照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.corpbuspic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证正面照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.legalidpicfront)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证反面照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.legalidpicback)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>手持身份证照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.legalpic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>商户门头照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.storepic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营内景照片</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.storeinnerpic)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营场所证明文件</td>
            <td>
              <img :src="imgFil(oldTLMchPhoto.bizplacepic)" alt="" class="previewImg">
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
  } from '../api/tl'
  import {url} from '@/utils/request'
  import {mixins} from "../../mixins/mixins";

  let that;
  export default {
    name: "tl",
    mixins:[mixins],
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        oldTLMchInfo: {},
        oldTLMchPhoto: {},
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
        this.oldTLMchInfo = data.oldTLMchInfo;
        this.oldTLMchPhoto = data.oldTLMchPhoto;
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
