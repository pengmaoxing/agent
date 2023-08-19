<template>
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进件信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpOut">返回</el-button>
      </div>
      <!--数据-->
      <div>

        <table class="info-table">
          <tr>
            <td>账户类型</td>
            <td>{{tableData.intoType==1?'对公':'对私'}}</td>
          </tr>

          <template v-if="tableData.intoType==1">
            <tr>
              <td>开户名称</td>
              <td>{{tableData.pubOutletName}}</td>
            </tr>
            <tr>
              <td>开户城市</td>
              <td>{{tableData.pubOutletCity}}</td>
            </tr>
            <tr>
              <td>开户银行</td>
              <td>{{tableData.pubOutletBank}}</td>
            </tr>
            <tr>
              <td>开户银行支行</td>
              <td>{{tableData.pubOutlet}}</td>
            </tr>
            <tr>
              <td>结算银行账号</td>
              <td>{{tableData.pubBankAcct}}</td>
            </tr>
            <tr>
              <td>结算联行号</td>
              <td>{{tableData.pubUnionpayNum}}</td>
            </tr>
          </template>
          <template v-else-if="tableData.intoType==2">
            <tr>
              <td>结算人姓名</td>
              <td>{{tableData.priName}}</td>
            </tr>
            <tr>
              <td>结算人手机号</td>
              <td>{{tableData.priPhone}}</td>
            </tr>
            <tr>
              <td>结算人身份证号</td>
              <td>{{tableData.priIdNum}}</td>
            </tr>
            <tr>
              <td>结算银行账号</td>
              <td>{{tableData.priBankCardNum}}</td>
            </tr>
            <tr>
              <td>开户银行支行</td>
              <td>{{tableData.priBankOutlet}}</td>
            </tr>
            <tr>
              <td>结算联行号</td>
              <td>{{tableData.priUnionpayNum}}</td>
            </tr>
          </template>

          <tr>
            <td>门头照</td>
            <td>
              <img :src="imgFil(tableData.merchantHead)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>收银台照</td>
            <td>
              <img :src="imgFil(tableData.merchantCheck)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>经营场所照</td>
            <td>
              <img :src="imgFil(tableData.otherPhoto3)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证正面</td>
            <td>
              <img :src="imgFil(tableData.identityFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>法人身份证反面</td>
            <td>
              <img :src="imgFil(tableData.identityBack)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>开户许可证照</td>
            <td>
              <img :src="imgFil(tableData.bussinessCard)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>营业执照</td>
            <td>
              <img :src="imgFil(tableData.bussiness)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证正面照</td>
            <td>
              <img :src="imgFil(tableData.identityFaceCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>结算人身份证反面照</td>
            <td>
              <img :src="imgFil(tableData.identityBackCopy)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>手持身份证照片</td>
            <td>
              <img :src="imgFil(tableData.identityBody)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>非法人对私授权函</td>
            <td>
              <img :src="imgFil(tableData.priAuth)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>租房合同</td>
            <td>
              <img :src="imgFil(tableData.rentHouse)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>银行卡照</td>
            <td>
              <img :src="imgFil(tableData.cardFace)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>其他资料-1</td>
            <td>
              <img :src="imgFil(tableData.other1)" alt="" class="previewImg">
            </td>
          </tr>
          <tr>
            <td>其他资料-2</td>
            <td>
              <img :src="imgFil(tableData.other2)" alt="" class="previewImg">
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
  } from '../api/publicAPI'
  import {url} from '@/utils/request'

  export default {
    name: "wxpay",
    props: ['channlename'],
    data() {
      return {
        loading: false, //加载
        id: '',
        pc: '',
        na: '',
        tableData: {}
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
        getInfo(this.id, this.pc).then(res => {
          let data = res.obj;
          let merchant = data.merchant;
          let plantMchtInto = data.plantMchtInto;
          Object.assign(merchant, plantMchtInto)
          this.tableData = merchant
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
          let urltxt = '';
          urltxt = url + '/filepath/' + arrayStr[(arrayStr.length - 1)];
          return urltxt
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
