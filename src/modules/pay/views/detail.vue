<template>
  <div class="app-container" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>联系信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goback()">返回</el-button>
      </div>
      <div>
        <table>
          <tr>
            <td>联系人姓名</td>
            <td>{{data.contact}}</td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td>{{data.phone}}</td>
          </tr>
          <tr>
            <td>常用邮箱</td>
            <td>{{data.email}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>经营信息</span>
      </div>
      <div>
        <table>
          <tr>
            <td>商户简称</td>
            <td>{{data.shortName}}</td>
          </tr>
          <tr>
            <td>经营类目</td>
            <td>
              {{data.businessLevOne}} /
              {{data.businessLevTwo}} /
              {{data.businessLevThree}}
            </td>
          </tr>
          <tr>
            <td>售卖商品场景</td>
            <td>
              <el-checkbox-group v-model="sellCheck">
                <el-checkbox label="1" disabled>线下</el-checkbox>
                <el-checkbox label="2" disabled>公众号/小程序</el-checkbox>
                <el-checkbox label="3" disabled>网站</el-checkbox>
                <el-checkbox label="4" disabled>APP</el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr v-if="sellScene_offline">
            <td>门店地址</td>
            <td>{{data.address}}</td>
          </tr>
          <tr v-if="sellScene_wxapp">
            <td>公众号/小程序名称</td>
            <td>{{data.miniProgramName}}</td>
          </tr>
          <tr v-if="sellScene_wxapp">
            <td>公众号/小程序截图</td>
            <td><img :src="getImg(data.miniProgramPhotoId)" alt=""></td>
          </tr>
          <tr v-if="sellScene_website">
            <td>公司网站</td>
            <td>{{data.companyWeb}}</td>
          </tr>
          <tr v-if="sellScene_app">
            <td>APP上线状态</td>
            <td>{{data.appStatus=='1'?'已上线':'未上线'}}</td>
          </tr>
          <tr v-if="sellScene_app">
            <td>APP页面截图</td>
            <td><img :src="getImg(data.appPhotoId)" alt=""></td>
          </tr>
          <tr>
            <td>客服电话</td>
            <td>{{data.cusServiceTel}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商户信息</span>
      </div>
      <div>
        <table>
          <tr>
            <td>商户名称</td>
            <td>{{data.merchantName}}</td>
          </tr>
          <tr>
            <td>注册地址</td>
            <td>{{data.registerAddress}}</td>
          </tr>
          <tr>
            <td>组织机构代码</td>
            <td>{{data.organizationCode}}</td>
          </tr>
          <tr>
            <td>组织机构有效期</td>
            <td>{{format(data.startOrganizationTime)}}至{{format(data.endOrganizationTime)}}</td>
          </tr>
          <tr>
            <td>组织机构代码证照片</td>
            <td><img :src="getImg(data.organizationPhotoId)" alt=""></td>
          </tr>
          <tr>
            <td>证件持有人类型</td>
            <td>{{data.representativeType | representativeTypeFil}}</td>
          </tr>
          <tr>
            <td>证件持有人姓名</td>
            <td>{{data.representativeName}}</td>
          </tr>
          <tr>
            <td>证件类型</td>
            <td>{{data.certificate | certificateFil}}</td>
          </tr>
          <tr>
            <td>证件影印件</td>
            <td><img :src="getImg(data.epresentativePhotoId)" alt=""></td>
          </tr>
          <tr>
            <td>证件有效期</td>
            <td>{{format(data.startCertificateTime)}}至{{format(data.endCertificateTime)}}</td>
          </tr>
          <tr>
            <td>证件号码</td>
            <td>{{data.certificateNum}}</td>
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
            <td>账户类型</td>
            <td>{{data.accountType}}</td>
          </tr>
          <tr>
            <td>开户名称</td>
            <td>{{data.accountHolder}}</td>
          </tr>
          <tr>
            <td>开户银行</td>
            <td>{{data.bankName}}</td>
          </tr>
          <tr>
            <td>开户银行城市</td>
            <td>{{data.bankCity}}</td>
          </tr>
          <tr>
            <td>开户支行</td>
            <td>{{data.bankOutlet}}</td>
          </tr>
          <tr>
            <td>银行账号</td>
            <td>{{data.accountNumber}}</td>
          </tr>
        </table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驳回信息</span>
      </div>

    </el-card>
  </div>
</template>

<script>
  import {detail} from '@/modules/merchant/agent/api/merchantInfo'
  import {returnThumbnailUrl, returnFilesUrl, uploadUrl} from '@/modules/file/api/upload'

  export default {
    name: 'detail',
    data () {
      return {
        loading: true,
        data: '',
        sellCheck: [],
        sellScene_offline: false,
        sellScene_wxapp: false,
        sellScene_website: false,
        sellScene_app: false,
      }
    },
    mounted () {
      this.id = this.$route.query.id  //接收ID
      //获取本运营商详情
      this.getDetail(this.id)
    },
    methods: {
      goback: function () {
        this.$router.go('-1')
      },
      getDetail: function (id) {
        detail(id).then(res => {
          console.log(res)
          this.data = res.obj
          this.sellCheck = JSON.parse(res.obj.sellCheck)
          this.showSell()
          this.loading = false
        }).catch(e => {

        })
      },
      /**
       *显示不同售卖场景下的表单
       */
      showSell: function () {
        let select = this.sellCheck
        let offlice = false
        let wxapp = false
        let website = false
        let app = false
        //判断是否有选中某个属性
        for (let i in select) {
          if (select[i] == '1') {
            offlice = true
          }
          if (select[i] == '2') {
            wxapp = true
          }
          if (select[i] == '3') {
            website = true
          }
          if (select[i] == '4') {
            app = true
          }
        }
        this.sellScene_offline = offlice
        this.sellScene_wxapp = wxapp
        this.sellScene_website = website
        this.sellScene_app = app
      },
      /**
       * 返回图片
       */
      getImg: function (id) {
        console.log('图片ID' + id)
        if (id == null || id == '') {
          return ''
        }
        return returnThumbnailUrl(id)
      },
      /**
       * 工具
       * @param ts 时间戳
       * @returns {string} 格式化事时间
       */
      //时间格式化
      format (ts) {
        let time = new Date(ts)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0 (m) {
        return m < 10 ? '0' + m : m
      },
    },
    filters: {
      representativeTypeFil: function (val) {
        let v = parseInt(val)
        let txt = ''
        switch (v) {
          case 1:
            txt = '法人'
            break
          case 2:
            txt = '经办人'
            break
          default:
            break
        }
        return txt
      },
      certificateFil: function (val) {
        let v = parseInt(val)
        let txt = ''
        switch (v) {
          case 1:
            txt = '身份证'
            break
          case 2:
            txt = '护照'
            break
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
    letter-spacing:1px;
  }
</style>
