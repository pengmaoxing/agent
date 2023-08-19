<template>
  <div class="app-container" v-loading="loading">

    <!--<el-card class="box-card">-->
    <!--<div>-->
    <!--<el-button size="medium" type="primary" @click="submitCheck">提交第三方</el-button>-->
    <!--<el-button size="medium" @click="goback">返 回</el-button>-->
    <!--</div>-->
    <!--</el-card>-->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>经营联系信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goback()">返回</el-button>
      </div>
      <div>
        <table>
          <tr>
            <td>负责人</td>
            <td>{{data.shop_keeper}}</td>
          </tr>
          <tr>
            <td>负责人电话</td>
            <td>{{data.keeper_phone}}</td>
          </tr>
          <tr>
            <td>客服电话</td>
            <td>{{data.shop_phone}}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>{{data.email}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>经营基本信息</span>
      </div>
      <div>
        <table>
          <tr>
            <td>商户简称</td>
            <td>{{data.shop_nickname}}</td>
          </tr>
          <tr>
            <td>一级经营范围</td>
            <td>{{data.type}}</td>
          </tr>
          <tr>
            <td>二级经营范围</td>
            <td>{{data.classify}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>营业执照</span>
      </div>
      <div>
        <table>
          <tr>
            <td>营业执照号</td>
            <td>{{data.licence_no}}</td>
          </tr>
          <tr>
            <td>起始时间</td>
            <td>{{data.licence_begin_date}}</td>
          </tr>
          <tr>
            <td>截止时间</td>
            <td>{{data.licence_expire_date}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业法人/经办人</span>
      </div>
      <div>
        <table>
          <tr>
            <td>法人姓名</td>
            <td>{{data.artif_name}}</td>
          </tr>
          <tr>
            <td>法人手机号</td>
            <td>{{data.artif_phone}}</td>
          </tr>
          <tr>
            <td>法人身份证号</td>
            <td>{{data.artif_identity}}</td>
          </tr>
          <tr>
            <td>身份证起始日期</td>
            <td>{{data.identity_start_time}}</td>
          </tr>
          <tr>
            <td>身份证截止日期</td>
            <td>{{data.identity_expire_time}}</td>
          </tr>

        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>结算账户</span>
      </div>
      <div>
        <table>
          <tr>
            <td>结算卡号</td>
            <td>{{data.card}}</td>
          </tr>
          <tr>
            <td>结算银行</td>
            <td>{{data.bank_name}}</td>
          </tr>
          <tr>
            <td>结算开户行</td>
            <td>{{data.bank_address}}</td>
          </tr>
          <tr>
            <td>结算联行号</td>
            <td>{{data.bank_add_no}}</td>
          </tr>
          <tr>
            <td>结算人手机号</td>
            <td>{{data.card_phone}}</td>
          </tr>
          <tr>
            <td>结算人身份证号</td>
            <td>{{data.identity}}</td>
          </tr>
          <tr>
            <td>结算人姓名</td>
            <td>{{data.card_name}}</td>
          </tr>
        </table>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商户基本信息</span>
      </div>
      <div>
        <table>
          <tr>
            <td>商户全称</td>
            <td>{{data.shop_name}}</td>
          </tr>
          <tr>
            <td>订单编号</td>
            <td>{{data.order_id}}</td>
          </tr>
          <tr>
            <td>省</td>
            <td>{{data.province}}</td>
          </tr>
          <tr>
            <td>市</td>
            <td>{{data.city}}</td>
          </tr>
          <tr>
            <td>区/县</td>
            <td>{{data.area}}</td>
          </tr>
          <tr>
            <td>渠道</td>
            <td>{{data.pay_type | paytypeFil}}</td>
          </tr>
          <tr>
            <td>商户类型</td>
            <td>{{data.business_type |businesstypeFil}}</td>
          </tr>
          <tr>
            <td>微信费率</td>
            <td>{{data.rate_wx}}</td>
          </tr>
          <tr>
            <td>支付宝费率</td>
            <td>{{data.rate_alipay}}</td>
          </tr>
          <tr>
            <td>备注信息</td>
            <td>{{data.description}}</td>
          </tr>
          <tr>
            <td>合作商号</td>
            <td>{{data.agent_id}}</td>
          </tr>
          <tr>
            <td>快速进件</td>
            <td>{{data.signin_typ|signintypFil}}</td>
          </tr>
          <tr>
            <td>详细地址</td>
            <td>{{data.shop_address}}</td>
          </tr>
        </table>
      </div>
    </el-card>


    <!--<el-card class="box-card">-->
    <!--<div slot="header" class="clearfix">-->
    <!--<span>图片信息</span>-->
    <!--</div>-->
    <!--<div>-->
    <!--<table>-->
    <!--<tr>-->
    <!--<td>门头照</td>-->
    <!--<td>-->

    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.merchantHead)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.merchantHead)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->

    <!--</td>-->

    <!--</tr>-->
    <!--<tr>-->
    <!--<td>收银台照</td>-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.merchantCheck)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.merchantCheck)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>经营场所照</td>-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.otherPhoto3)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.otherPhoto3)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>法人身份证正面照</td>-->
    <!--&lt;!&ndash;<td>{{data.identityFace}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.identityFace)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.identityFace)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>法人身份证正面照</td>-->
    <!--&lt;!&ndash;<td>{{data.identityBack}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.identityBack)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.identityBack)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>开户许可证照</td>-->
    <!--&lt;!&ndash;<td>{{data.bussinessCard}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.bussinessCard)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.bussinessCard)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>营业执照照片</td>-->
    <!--&lt;!&ndash;<td>{{data.bussiness}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.bussiness)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.bussiness)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>结算人身份证正面照</td>-->
    <!--&lt;!&ndash;<td>{{data.identityFaceCopy}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.identityFaceCopy)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.identityFaceCopy)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>结算人身份证反面照</td>-->
    <!--&lt;!&ndash;<td>{{data.identityBackCopy}}</td>&ndash;&gt;-->
    <!--<td>-->
    <!--<template>-->
    <!--<el-popover-->
    <!--placement="left"-->
    <!--title=""-->
    <!--trigger="hover"-->
    <!--width="700">-->
    <!--<img :src="getImg(data.identityFaceCopy)" width="100%"/>-->
    <!--<img slot="reference" :src="getImg(data.identityFaceCopy)"-->
    <!--class="item-image">-->
    <!--</el-popover>-->
    <!--</template>-->
    <!--<img class="file-img" :src="getImg(data.identityBackCopy)" alt="">-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>手持身份证照片</td>-->
    <!--&lt;!&ndash;<td>{{data.identityBody}}</td>&ndash;&gt;-->
    <!--<td><img class="file-img" :src="getImg(data.identityBody)" alt=""></td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>非法人对私授权函</td>-->
    <!--&lt;!&ndash;<td>{{data.otherPhoto4}}</td>&ndash;&gt;-->
    <!--<td><img class="file-img" :src="getImg(data.otherPhoto4)" alt=""></td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>租房合同</td>-->
    <!--&lt;!&ndash;<td>{{data.otherPhoto2}}</td>&ndash;&gt;-->
    <!--<td><img class="file-img" :src="getImg(data.otherPhoto2)" alt=""></td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>其他资料</td>-->
    <!--&lt;!&ndash;<td>{{data.otherPhoto}}</td>&ndash;&gt;-->
    <!--<td><img class="file-img" :src="getImg(data.otherPhoto)" alt=""></td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td>银行卡正面照</td>-->
    <!--&lt;!&ndash;<td>{{data.cardFace}}</td>&ndash;&gt;-->
    <!--<td><img class="file-img" :src="getImg(data.cardFace)" alt=""></td>-->
    <!--</tr>-->

    <!--</table>-->
    <!--</div>-->
    <!--</el-card>-->

  </div>
</template>

<script>
  import {detail} from '@/modules/merchant/agent/api/merchantInfo'
  import {returnThumbnailUrl, returnFilesUrl, uploadUrl} from '@/modules/file/api/upload'
  import {
    findHsfentryFile,
    hsfFileUpdate,
    hsfGetDetails,
    hsfRegister
  } from '@/modules/thirdMchInfo/agent/api/hsfMerchantInfo'

  export default {
    name: 'hsfDetails',
    data() {
      return {
        loading: true,
        data: '',
        id: '',
      }
    },
    mounted() {
      this.id = this.$route.query.id;  //接收ID

      if (this.id == null || this.id == '') {
        let that = this
        this.$message.error('禁止直接访问，即将跳转至列表页')
        setTimeout(function () {
          that.$router.go('-1')
        }, 3000)
      } else {
        this.getDetail(this.id)
      }
      //获取本运营商详情

    },
    methods: {
      goback: function () {
        this.$router.go('-1')
      },
      getDetail: function (id) {
        let that = this
        hsfGetDetails(id).then(res => {
          console.log(res);

          if (res.obj == null) {
            this.$message.error('进件资料为空，请联系相关人员完善信息！')
            setTimeout(function () {
              that.$router.go('-1')
            }, 1000)
            return
          } else {
            this.data = res.obj;
            this.loading = false;
          }
        }).catch(e => {

        })
      },

      /**
       * 提交给第三方
       */
      submitCheck() {
        let id = this.id
        hsfRegister(id).then(res => {

        }).catch(e => {

        })
      },

      /**
       * 换取图片
       */
      getImg: function (val) {
        let reg = /^[0-9]*$/;
        if (reg.test(val)) {
          return returnFilesUrl(val)
        } else {
          let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC';
          return base64
        }

      },
      /**
       * 工具
       * @param ts 时间戳
       * @returns {string} 格式化事时间
       */
      //时间格式化
      format(ts) {
        let time = new Date(ts);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0(m) {
        return m < 10 ? '0' + m : m
      },
    },
    filters: {
      signintypFil: function (val) {
        let txt = '未知';
        if (val == '' || val == null) {
          return txt
        }
        let v = parseInt(val);
        switch (v) {
          case 1:
            txt = '快速进件';
            break;
          case 0:
            txt = '人工审核';
            break;
          default:
            txt = '未定义';
            break
        }
        return txt
      },
      paytypeFil: function (val) {
        let txt = '未知';
        if (val == '' || val == null) {
          return txt
        }
        switch (val) {
          case 'yirongma1':
            txt = '和融通三方通道（普通）';
            break;
          case 'yirongma2':
            txt = '和融通三方通道（优质）';
            break;
          case 'suixingfu':
            txt = '随行付三方通道';
            break;
          default:
            txt = '未定义';
            break
        }
        return txt
      },
      businesstypeFil: function (val) {
        let txt = '未知';
        if (val == '' || val == null) {
          return txt
        }
        let v = parseInt(val);
        switch (v) {
          case 1:
            txt = '企业商户';
            break;
          case 2:
            txt = '合体工商户';
            break;
          case 3:
            txt = '个人商户';
            break;
          default:
            txt = '未定义';
            break
        }
        return txt
      },
      representativeTypeFil: function (val) {
        let v = parseInt(val);
        let txt = '';
        switch (v) {
          case 1:
            txt = '法人';
            break;
          case 2:
            txt = '经办人';
            break;
          default:
            break
        }
        return txt
      },
      certificateFil: function (val) {
        let v = parseInt(val);
        let txt = '';
        switch (v) {
          case 1:
            txt = '身份证';
            break;
          case 2:
            txt = '护照';
            break;
          default:
            break
        }
        return txt
      }
    }
  }
</script>

<style scoped>
  .box-card {
    margin-bottom: 20px;
  }

  table > tr {
    height: 60px;
    font-size: 14px;
  }

  table > tr > td:nth-child(1) {
    color: #808080;
    width: 200px;
    text-align: right;
    padding: 0 20px 0 0;
  }

  table > tr > td:nth-child(1):after {
    content: '：';

  }

  table > tr > td:nth-child(2) {
    color: #5b5b5b;
    letter-spacing: 1px;
  }

  .file-img {
    width: auto;
    height: 200px;
    border-radius: 8px;
    border: 1px solid #c7c7c7;
  }

  .item-image {
    width: auto;
    max-width: 500px;
    height: 200px;

    border-radius: 8px;

    border: 1px dashed #c9dff5;
  }
</style>
