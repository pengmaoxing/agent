<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>银盛进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>

        <table class="info-table">

          <tr>
            <td>商户模式</td>
            <td>{{mchInfo.userType|userTypeFil}}</td>
          </tr>

          <tr>
            <td>营业执照全称</td>
            <td>{{mchInfo.businessLicence}}</td>
          </tr>

          <tr>
            <td>商户简称（小票）</td>
            <td>{{mchInfo.userShortName}}</td>
          </tr>

          <tr>
            <td>营业执照号码</td>
            <td>{{mchInfo.businessLicenceNo}}</td>
          </tr>

          <tr>
            <td>营业执照日期</td>
            <td>{{mchInfo.businessLicenceSdate}}至{{mchInfo.businessLicenceEdate}}</td>
          </tr>

          <tr>
            <td>注册地址</td>
            <td>{{mchInfo.registeredAddress}}</td>
          </tr>

          <tr>
            <td>营业地址</td>
            <td>{{mchInfo.businessAddress}}</td>
          </tr>

          <tr>
            <td>法人姓名</td>
            <td>{{mchInfo.legalPersonName}}</td>
          </tr>

          <tr>
            <td>法人电话</td>
            <td>{{mchInfo.legalPersonPhone}}</td>
          </tr>

          <tr>
            <td>法人身份证</td>
            <td>{{mchInfo.legalPersonId}}</td>
          </tr>

          <tr>
            <td>人身份证日期</td>
            <td>{{mchInfo.legalPersonIdSdate}}至{{mchInfo.legalPersonIdEdate}}</td>
          </tr>

          <tr>
            <td>非法人姓名</td>
            <td>{{mchInfo.unincorporatedName}}</td>
          </tr>

          <tr>
            <td>非法人身份证号码</td>
            <td>{{mchInfo.unincorporatedId}}</td>
          </tr>


          <tr>
            <td>实际控制人</td>
            <td>{{mchInfo.actualManager}}</td>
          </tr>

          <tr>
            <td>结算账户卡号</td>
            <td>{{mchInfo.balanceAccCardno}}</td>
          </tr>

          <tr>
            <td>结算账户户名</td>
            <td>{{mchInfo.balanceAccName}}</td>
          </tr>

          <tr>
            <td>开户行所属省</td>
            <td>{{mchInfo.openAccProvince}}</td>
          </tr>

          <tr>
            <td>开户行所属市</td>
            <td>{{mchInfo.openAccCity}}</td>
          </tr>

          <tr>
            <td>开户行区县</td>
            <td>{{mchInfo.openAccArea}}</td>
          </tr>

          <tr>
            <td>开户行行别名称</td>
            <td>{{mchInfo.bankName}}</td>
          </tr>

          <tr>
            <td>开户行行别编号</td>
            <td>{{mchInfo.bankType}}</td>
          </tr>

          <tr>
            <td>开户行编号（支行）</td>
            <td>{{mchInfo.openAccBanktype}}</td>
          </tr>

          <tr>
            <td>开户行名称（支行）</td>
            <td>{{mchInfo.openAccBankname}}</td>
          </tr>

          <tr>
            <td>银行预留手机号</td>
            <td>{{mchInfo.bankMobile}}</td>
          </tr>

          <tr>
            <td>账户类型</td>
            <td>{{mchInfo.balanceAccType|balanceAccTypeFil}}</td>
          </tr>

          <tr>
            <td>联系人姓名</td>
            <td>{{mchInfo.contactsName}}</td>
          </tr>

          <tr>
            <td>联系人电话</td>
            <td>{{mchInfo.contactsPhone}}</td>
          </tr>

          <tr>
            <td>联系人邮箱</td>
            <td>{{mchInfo.contactsEmail}}</td>
          </tr>

          <tr>
            <td>联系人地址</td>
            <td>{{mchInfo.contactsAddr}}</td>
          </tr>

          <tr>
            <td>微信签约费率</td>
            <td>{{mchInfo.wechatSignRate}} %</td>
          </tr>

          <tr>
            <td>微信签约费率封底</td>
            <td>{{mchInfo.wechatSignMin}} 分</td>
          </tr>

          <tr>
            <td>微信签约费率封顶</td>
            <td>{{mchInfo.wechatSignMax}} 分</td>
          </tr>

          <tr>
            <td>支付宝签约费率</td>
            <td>{{mchInfo.alipaySignRate}} %</td>
          </tr>

          <tr>
            <td>支付宝签约费率封底</td>
            <td>{{mchInfo.alipaySignMin}} 分</td>
          </tr>

          <tr>
            <td>支付宝签约费率封顶</td>
            <td>{{mchInfo.alipaySignMax}} 分</td>
          </tr>

          <tr>
            <td>结算起始金额</td>
            <td>{{mchInfo.lowestStlAmt}} 分</td>
          </tr>

          <tr>
            <td>备注</td>
            <td>{{mchInfo.remark}}</td>
          </tr>

          <tr>
            <td>证件类型</td>
            <td>{{mchInfo.certType|certTypeFil}}</td>
          </tr>

          <tr>
            <td>商户级别</td>
            <td>{{mchInfo.mercLvl|mercLvlFil}}</td>
          </tr>

          <tr v-if="mchInfo.mercLvl==='2'">
            <td>总店商户号</td>
            <td>{{mchInfo.mercUpId}}</td>
          </tr>


          <tr>
            <td>门头照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.bussiness)"width="100%"/>
                <img :src="imgFil(mchPhoto.bussiness)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>法人身份证正面照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.identityFace)"width="100%"/>
                <img :src="imgFil(mchPhoto.identityFace)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>法人身份证反面照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.identityBack)"width="100%"/>
                <img :src="imgFil(mchPhoto.identityBack)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>结算银行卡正面照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.cardFace)"width="100%"/>
                <img :src="imgFil(mchPhoto.cardFace)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>结算银行卡反面照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.cardBack)"width="100%"/>
                <img :src="imgFil(mchPhoto.cardBack)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>门头照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.merchantHead)"width="100%"/>
                <img :src="imgFil(mchPhoto.merchantHead)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>经营场所照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.otherPhoto3)"width="100%"/>
                <img :src="imgFil(mchPhoto.otherPhoto3)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>收银台照</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.merchantCheck)"width="100%"/>
                <img :src="imgFil(mchPhoto.merchantCheck)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>手持身份证照片</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.identityBody)"width="100%"/>
                <img :src="imgFil(mchPhoto.identityBody)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
            </td>
          </tr>

          <tr>
            <td>收单业务协议照片</td>
            <td>
              <el-popover
                placement="right-end"
                title=""
                trigger="hover"
                width="600">
                <img :src="imgFil(mchPhoto.receiptBusiness)"width="100%"/>
                <img :src="imgFil(mchPhoto.receiptBusiness)"  slot="reference" alt="" class="previewImg"
                     style="padding: 5px">
              </el-popover>
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
  } from '../api/ys'
  import {url} from '@/utils/request'
  import {mixins} from "../../mixins/mixins";

  let that;
  export default {
    name: "hsf",
    mixins: [mixins],
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        mchInfo: {},
        mchPhoto: {},
      }
    },
    beforeCreate: function () {
      that = this
    },
    filters: {
      //商户类型过滤器
      userTypeFil: function (val) {
        let str = '';
        if (val === '0') {
          str = '个体商户'
        } else if (val === '1') {
          str = '企业商户'
        } else if (val === '2') {
          str = '小微商户'
        } else {
          str = '未知'
        }
        return str
      },
      //借记卡类型
      balanceAccTypeFil: function (val) {
        let str = '';
        if (val === '11') {
          str = '对私借记卡（对私账户）'
        } else if (val === '21') {
          str = '对公借记卡（对公账户）'
        } else {
          str = '未知'
        }
        return str
      },

      //证件类型
      certTypeFil: function (val) {
        let str = '';
        if (val === '00') {
          str = '身份证'
        } else {
          str = '其他'
        }
        return str
      },

      //商户级别
      mercLvlFil: function (val) {
        let str = '';
        if (val === '1') {
          str = '总店'
        } else if (val === '2') {
          str = '分店'
        } else {
          str = '其他'
        }
        return str
      },

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
          let data = res.obj;
          this.dataSet(data)
        }).catch(e => {

        })
      },


      /**
       * 处理回显数据
       */
      dataSet: function (data) {
        this.mchInfo = data.oldYSMchInfo;
        this.mchPhoto = data.oldYSMchPhoto
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
    width: 190px;
  }

  .info-table tr td:nth-child(1):after {
    content: '：';
  }

  .info-table tr td:nth-child(2) {

  }

  .info-table tr td:nth-child(2) img {
    width: 200px;
    height: auto;
  }


</style>
