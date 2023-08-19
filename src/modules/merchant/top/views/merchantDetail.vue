<template>
  <div class="card_box">
    <!--第一行 卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="name_title">{{operaDetail.name}}</span>
        <el-button style="float: right;font-size: 16px" type="text" @click="goBack"><i class="el-icon-back"></i> 返回列表
        </el-button>
      </div>
      <!--卡片内容-->
      <div>
        <table width="100%" class="info_table">
          <tbody>
          <tr>
            <td class="tb_title">商户名称</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.name}}</td>  <!--内容-->
            <td class="tb_title">商户简称</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.shortName}}</td>  <!--内容-->
            <td class="tb_title">客服电话</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.customerPhone}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">归属业务员</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.managerName}}</td>  <!--内容-->
            <td class="tb_title">联系人</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.contact}}</td>  <!--内容-->
            <td class="tb_title">手机号</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.phone}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">经营类别</td>   <!--标题-->
            <td class="tb_text">
              {{operaDetail.businessLevOne|businessLevOneFil}}-{{operaDetail.businessLevTwo}}-{{operaDetail.businessLevThree}}
            </td>  <!--内容-->
            <td class="tb_title">所在地区</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.province}}{{operaDetail.city}}{{operaDetail.area}}</td>  <!--内容-->
            <td class="tb_title">详细地址</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.address}}</td>  <!--内容-->
          </tr>

          <tr>
            <td class="tb_title">电子邮箱</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.email}}</td>  <!--内容-->
            <td class="tb_title">创建时间</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.createTime}}</td>  <!--内容-->
          </tr>

          <tr>
            <td class="tb_title">法人姓名</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.legalName||''}}</td>  <!--内容-->
            <td class="tb_title">法人电话</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.legalPhone||''}}</td>  <!--内容-->
            <td class="tb_title">法人身份证号</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.legalIdNum||''}}</td>  <!--内容-->
          </tr>

          <tr>
            <td class="tb_title">法人身份证有效期</td>   <!--标题-->
            <td class="tb_text">
              {{operaDetail.startLegalTime}}至{{operaDetail.endLegalTime==='2099-12-31'?'长期':operaDetail.endLegalTime}}
            </td>  <!--内容-->
          </tr>

          <tr>
            <td class="tb_title">营业执照号</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.license||''}}</td>  <!--内容-->
            <td class="tb_title">营业执照有效期</td>   <!--标题-->
            <td class="tb_text">
              {{operaDetail.startLicenseTime}}至{{operaDetail.endLicenseTime==='2099-12-31'?'长期':operaDetail.endLegalTime}}
            </td>  <!--内容-->
          </tr>
          </tbody>
        </table>
      </div>
    </el-card>

  </div>
</template>

<script>
  import {getMerchantDetail} from '../api/merchant'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'operaDetail',
    components: {pagination},
    data() {
      return {
        operaDetail: {}, //渠道商详情
      }
    },
    filters:{
      businessLevOneFil:function (val) {
        if (val==1){
          return '企业商户'
        }else if(val==2){
          return '个体工商户'
        }else if(val==3){
          return '个人商户'
        }else{
          return val||''
        }
      }
    },
    created() {

    },
    mounted() {
      console.log(this.$route.query.id)
      this.id = this.$route.query.id  //接收ID
      //获取本运营商详情
      this.getMerchantDetail(this.id)

    },
    methods: {
      goBack: function () {
        this.$router.go('-1')
      },

      //获取运营商信息
      getMerchantDetail: function (id) {

        //用vue router获取URL数据
        //然后用getMerchantDetail获取这个运营商的数据
        getMerchantDetail(id).then(res => {
          this.operaDetail = res.obj
        }).catch(e => {
          this.loading = false
        })
      },
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card_box {
    padding: 0 20px;
  }
  .box-card{
    margin-top: 20px;
  }

  .name_title {
    font-size: 32px;
  }

  .tb_title {
    font-weight: bold;
    width: 10%;
  }

  .tb_text {
    width: 20%;
    font-weight: lighter;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info_table tbody tr {
    line-height: 60px;
    font-size: 14px;
  }
  .info_table tbody tr td:nth-child(odd):after {
   content: '：';
  }
</style>
