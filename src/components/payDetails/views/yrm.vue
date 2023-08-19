<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>易融码进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>

        <table class="info-table">


          <tr>
            <td>登录手机号</td>
            <td>{{yrmMchInfo.hybPhone}}</td>
          </tr>
          <tr>
            <td>入账人姓名</td>
            <td>{{yrmMchInfo.bankAccName}}</td>
          </tr>
          <tr>
            <td>店主身份证号</td>
            <td>{{yrmMchInfo.accNum}}</td>
          </tr>
          <tr>
            <td>结算银行卡号</td>
            <td>{{yrmMchInfo.bankAccNo}}</td>
          </tr>
          <tr>
            <td>开户行</td>
            <td>{{yrmMchInfo.bankBranch}}</td>
          </tr>
          <tr>
            <td>开户支行</td>
            <td>{{yrmMchInfo.bankSubbranch}}</td>
          </tr>
          <tr>
            <td>系统行号</td>
            <td>{{yrmMchInfo.payBankId}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>对公/私</td>
            <td>
              <span v-if="yrmMchInfo.accType==1">对公</span>
              <span v-else>对私</span>
            </td>
          </tr>
          <tr>
            <td>销售ID</td>
            <td>{{yrmMchInfo.saleId}}</td>
          </tr>
          <tr>
            <td>商户名称</td>
            <td>{{yrmMchInfo.rname}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>商户类型</td>
            <td>
              <span v-if="yrmMchInfo.areaType==4">企业</span>
              <span v-else-if="yrmMchInfo.areaType==5">个体工商户</span>
              <span v-else-if="yrmMchInfo.areaType==6">个人</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>经营地址</td>
            <td>{{yrmMchInfo.baddr}}</td>
          </tr>
          <tr>
            <td>详细经营地址</td>
            <td>{{yrmMchInfo.raddr}}</td>
          </tr>
          <tr>
            <td>门店所在地地区代码</td>
            <td>{{yrmMchInfo.localCode}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>结算类型</td>
            <td>
              <span v-if="yrmMchInfo.settleType=='T'">T+1结算</span>
              <span v-else-if="yrmMchInfo.settleType=='D'">D+1结算</span>
              <span v-else>未知</span>
            </td>
          </tr>
          <tr>
            <td>法人姓名</td>
            <td>{{yrmMchInfo.legalName}}</td>
          </tr>
          <tr>
            <td>法人身份证号</td>
            <td>{{yrmMchInfo.legalIdNum}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>注册来源</td>
            <td>{{yrmMchInfo.remarks==3?'默认':'未知'}}</td>
          </tr>
          <tr>
            <td>联系人</td>
            <td>{{yrmMchInfo.contact}}</td>
          </tr>
          <tr>
            <td>联系手机号</td>
            <td>{{yrmMchInfo.phone}}</td>
          </tr>

          <tr>
            <td>联系人身份证号</td>
            <td>{{yrmMchInfo.idCardNumber}}</td>
          </tr>

          <tr>
            <td>行业范围</td>
            <td>{{yrmMchInfo.businessScope}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>是否开通储值卡</td>
            <td>{{yrmMchInfo.isForeign==0?'是':'否'}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>是否优质客户</td>
            <td>{{yrmMchInfo.isHighQualityMer==0?'是':'否'}}</td>
          </tr>


          <tr>
            <td>费率</td>
            <td>{{yrmMchInfo.scanRate}}</td>
          </tr>

          <tr>
            <!--需要过滤-->
            <td>所属行业</td>
            <td>{{yrmMchInfo.industryId|industryFil}}</td>
          </tr>

          <tr v-if="yrmMchInfo.areaType===4 || yrmMchInfo.areaType==5">
            <td>营业执照号</td>
            <td>{{yrmMchInfo.license}}</td>
          </tr>
          <tr v-if="yrmMchInfo.areaType===4 || yrmMchInfo.areaType==5">
            <td>营业执照注册名称</td>
            <td>{{yrmMchInfo.shortName}}</td>
          </tr>

          <tr v-if="yrmMchInfo.areaType===4 || yrmMchInfo.areaType==5">
            <td>营业执照有效期</td>
            <td>{{yrmMchInfo.licenceExp}}</td>
          </tr>

          <tr v-if="yrmMchInfo.accType===2">
            <td>入账人身份证有效期</td>
            <td>{{yrmMchInfo.idNumExp}}</td>
          </tr>

          <tr v-if="yrmMchInfo.accType===4">
            <td>法人身份证有效期</td>
            <td>{{yrmMchInfo.legalIdExp}}</td>
          </tr>

          <tr>
            <td>业务类型</td>
            <td>默认</td>
          </tr>


          <tr>
            <td>门头照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.merchantHead)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>收银台照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.merchantCheck)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营场所照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.otherPhoto3)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证正面</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.identityFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证反面</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.identityBack)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>开户许可证照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.bussinessCard)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>营业执照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.bussiness)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证正面照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.identityFaceCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证反面照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.identityBackCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>手持身份证照片</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.identityBody)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>非法人对私授权函</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.priAuth)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>租房合同</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.rentHouse)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>银行卡照</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.cardFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>其他资料</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.other1)" alt="" class="previewImg">
            </td>
          </tr>

          <tr>
            <td>快递行业资质</td>
            <td>
              <img :src="imgFil(yrmMchPhoto.materialUpLoad9File)" alt="" class="previewImg">
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
  } from '../api/yrm'
  import {url} from '@/utils/request'
  import {mixins} from "../../mixins/mixins";

  let that;
  export default {
    name: "hsf",
    mixins:[mixins],
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        yrmMchInfo: {},
        yrmMchPhoto: {},

        industryOptions: [
          {value: '8', name: '小型超市/便利店/零售商店'},
          {value: '9', name: '小吃/快餐/美食城'},
          {value: '10', name: '水果零售/蔬菜零售'},
          {value: '11', name: '水吧/饮料/冷饮'},
          {value: '12', name: '药品/医疗/保健'},
          {value: '13', name: '美发/美容/足疗保健'},
          {value: '14', name: '网吧/KTV/酒吧休闲娱乐类'},
          {value: '15', name: '大中型餐饮'},
          {value: '16', name: '大中型连锁超市'},
          {value: '17', name: '校园内食堂/餐饮'},
          {value: '18', name: '校园内超市/便利店/零售'},
          {value: '19', name: '快递'},
          {value: '20', name: '彩票'},
          {value: '21', name: '交通运输/票务旅游'},
          {value: '22', name: '教育'},
          {value: '23', name: '烟酒零食'},
          {value: '24', name: '其他'}
        ],//行业
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
        this.yrmMchInfo = this.deepCopy(data.yrmMchInfo)
        this.yrmMchPhoto = this.deepCopy(data.yrmMchPhoto)


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
