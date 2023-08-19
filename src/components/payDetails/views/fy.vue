<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>富友进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>

        <table class="info-table">

          <tr>
            <td>商户名</td>
            <td>{{tableData.mchntName}}</td>
          </tr>
          <tr>
            <td>联系人身份证</td>
            <td>{{tableData.contactCertNo}}</td>
          </tr>
          <tr>
            <td>证件类型</td>
            <td>{{tableData.licenseType | licenseTypeFilter}}</td>
          </tr>
          <tr>
            <td>证件号码</td>
            <td>{{tableData.licenseNo}}</td>
          </tr>
          <tr>
            <td>证件有效期</td>
            <td>{{tableData.licenseStartDt | dtFilter}} 至 {{tableData.licenseExpireDt | dtFilter}}</td>
          </tr>
          <tr>
            <td>营业执照注册地址</td>
            <td>{{tableData.licRegisAddr}}</td>
          </tr>
          <tr>
            <td>经营范围代码</td>
            <td>{{tableData.business}}</td>
          </tr>
          <tr>
            <td>详细地址代码</td>
            <td>{{tableData.cityCd}} {{tableData.countyCd}}</td>
          </tr>
          <tr>
            <td>入账卡类型</td>
            <td>{{tableData.acntType | acntTypeFilter}}</td>
          </tr>
          <tr>
            <td>行别</td>
            <td>{{tableData.bankType}}</td>
          </tr>
          <tr>
            <td>入账卡开户行联行号</td>
            <td>{{tableData.interBankNo}}</td>
          </tr>

          <tr>
            <td>入账卡开户行名称</td>
            <td>{{tableData.issBankNm}}</td>
          </tr>
          <tr>
            <td>入账卡户名</td>
            <td>{{tableData.acntNm}}</td>
          </tr>
          <tr>
            <td>入账卡号</td>
            <td>{{tableData.acntNo}}</td>
          </tr>
          <tr>
            <td>法人姓名</td>
            <td>{{tableData.artifNm}}</td>
          </tr>
          <tr>
            <td>法人入账标识</td>
            <td>{{tableData.acntArtifFlag | acntArtifFlagFilter}}</td>
          </tr>
          <tr>
            <td>法人身份证号</td>
            <td>{{tableData.certifId}}</td>
          </tr>
          <tr>
            <td>法人身份证到期时间</td>
            <td>{{tableData.cardStartDt | dtFilter}} 至 {{tableData.certifIdExpireDt | dtFilter}}</td>
          </tr>
          <tr>
            <td>入账证件类型</td>
            <td>{{tableData.acntCertifTp | acntCertifTpFilter}}</td>
          </tr>
          <tr>
            <td>入账证件号</td>
            <td>{{tableData.acntCertifId}}</td>
          </tr>
          <tr>
            <td>入账证件到期日</td>
            <td>{{tableData.acntCertifExpireDt | dtFilter}}</td>
          </tr>
          <tr>
            <td>是否开通微信</td>
            <td>{{tableData.wxFlag | wxFlagFilter}}</td>
          </tr>
          <tr v-if="tableData.wxFlag == '1'">
            <td>微信扣率代码</td>
            <td>{{tableData.wxSetCd}}</td>
          </tr>
          <tr>
            <td>是否开通支付宝</td>
            <td>{{tableData.aliFlag | aliFlagFilter}}</td>
          </tr>
          <tr v-if="tableData.aliFlag == '1'">
            <td>支付宝扣率代码</td>
            <td>{{tableData.aliSetCd}}</td>
          </tr>
          <!-- <tr>
            <td>是否开通qq钱包</td>
            <td>{{tableData.qpayFlag | qpayFlagFilter}}</td>
          </tr>
          <tr>
            <td>qq钱包扣率</td>
            <td>{{tableData.qpaySetCd}}</td>
          </tr>
          <tr>
            <td>是否开通京东钱包</td>
            <td>{{tableData.jdpayFlag | jdpayFlagFilter}}</td>
          </tr>
          <tr>
            <td>京东扣率代码</td>
            <td>{{tableData.jdpaySetCd}}</td>
          </tr> -->
          <tr>
            <td>清算类型</td>
            <td>{{tableData.settleTp | settleTpFilter}}</td>
          </tr>
          <!-- <tr>
            <td>清算扣率</td>
            <td>{{tableData.settleTpCd}}</td>
          </tr>
          <tr>
            <td>清算时间</td>
            <td>{{tableData.settleTs||'未知清算时间'}}</td>
          </tr> -->
          <tr>
            <td>双账户</td>
            <td>{{tableData.hasReserveAcnt | hasReserveAcntFilter}}</td>
          </tr>
          <tr v-if="tableData.hasReserveAcnt == '1'">
            <td>行别</td>
            <td>{{tableData.reserveInterBankNo}}</td>
          </tr>
          <tr v-if="tableData.hasReserveAcnt == '1'">
            <td>入账开户行联行号</td>
            <td>{{tableData.reserveIssBankNm}}</td>
          </tr>
          <tr v-if="tableData.hasReserveAcnt == '1'">
            <td>入账卡户名</td>
            <td>{{tableData.reserveAcntNo}}</td>
          </tr>
          <tr v-if="tableData.hasReserveAcnt == '1'">
            <td>入账卡号</td>
            <td>{{tableData.reserveAcntNm}}</td>
          </tr>


          <tr>
            <td>门头照</td>
            <td>
              <img :src="imgFil(photoData.merchantHead)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营场所照</td>
            <td>
              <img :src="imgFil(photoData.otherPhoto3)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证正面照</td>
            <td>
              <img :src="imgFil(photoData.identityFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证反面照</td>
            <td>
              <img :src="imgFil(photoData.identityBack)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>开户许可证照</td>
            <td>
              <img :src="imgFil(photoData.bussinessCard)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>营业执照照片</td>
            <td>
              <img :src="imgFil(photoData.bussiness)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证正面照</td>
            <td>
              <img :src="imgFil(photoData.identityFaceCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证反面照</td>
            <td>
              <img :src="imgFil(photoData.identityBackCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>手持身份证照片</td>
            <td>
              <img :src="imgFil(photoData.identityBody)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>非法人对私授权函</td>
            <td>
              <img :src="imgFil(photoData.priAuth)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>银行卡</td>
            <td>
              <img :src="imgFil(photoData.cardFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>其他资料1</td>
            <td>
              <img :src="imgFil(photoData.other1)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>组织机构代码证图片</td>
            <td>
              <img :src="imgFil(photoData.organizationCodeId)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>税务登记证图片</td>
            <td>
              <img :src="imgFil(photoData.registrationCodeId)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>事业单位证明函图片</td>
            <td>
              <img :src="imgFil(photoData.certificateInstitution)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营许可证图片</td>
            <td>
              <img :src="imgFil(photoData.businessLicense)" alt="" class="previewImg">
            </td>
          </tr>


        </table>


      </div>
    </el-card>


  </div>
</template>

<script>
  import {
    getFyIncomingInfo
  } from '../api/fy'
  import {url} from '@/utils/request'

  export default {
    name: "hsf",
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        tableData: {},
				photoData: {}
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.pc = this.$route.query.pc;
      this.na = this.$route.query.na || '';

      this.getInfofun()

    },
		filters:{
			licenseTypeFilter(val){
				switch(val){
					case '0':
						return '营业执照';
					case '1':
						return '三证合一';
					case 'A':
						return '身份证';
					case 'B':
						return '个体户';
					case '2':
						return '事业单位';
					default:
						return '';
				}
			},
			dtFilter(val) {
				if(val == null || val == ''){
					return ''
				}
				return val[0] + val[1] + val[2] + val[3] + '-' + val[4] + val[5] + '-' + val[6] + val[7];
			},
			acntTypeFilter(val){
				switch(val){
					case '1':
						return '对公'
					case '2':
						return '对私'
					default:
						return '';
				}
			},
			acntArtifFlagFilter(val) {
				switch(val){
					case '0':
						return '非法人入账'
					case '1':
						return '法人入账'
					default:
						return '';
				}
			},
			acntCertifTpFilter(val) {
				switch(val){
					case '0':
						return '身份证'
					default:
						return '';
				}
			},
			wxFlagFilter(val) {
				if(val == '1'){
					return val;
				}
				return '未开通';
			},
			aliFlagFilter(val) {
				if(val == '1'){
					return val;
				}
				return '未开通';
			},
			qpayFlagFilter(val) {
				if(val == '1'){
					return val;
				}
				return '未开通';
			},
			jdpayFlagFilter(val) {
				if(val == '1'){
					return val;
				}
				return '未开通';
			},
			settleTpFilter(val) {
				switch(val){
					case '1':
						return '自动结算(T1)';
					case '2':
						return '手动结算';
					case '3':
						return '自动结算(D1)';
					case '4':
						return '定时结算';
					default:
						return '';
				}
			},
			hasReserveAcntFilter(val) {
				if(val == '1'){
					return '启动';
				}
				return '未启动';
			},
		},
    methods: {
      /**
       * 获取信息
       */
      getInfofun: function () {
        getFyIncomingInfo(this.id).then(res => {
          console.log(res);
          this.tableData = res.obj.fuiouMchInfo;
					this.photoData = res.obj.fuiouMchPhoto;
        }).catch(e => {

        })
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
