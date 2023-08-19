<template>
  <!--惠闪付图片进件-->
  <div class="app-container" v-loading="loading">
    <!--<el-card class="box-card">-->
      <!--<div>-->
        <!--<el-button size="medium" type="primary" @click="submitImgCheck">提交第三方</el-button>-->
        <!--<el-button size="medium" @click="goBack">返 回</el-button>-->
      <!--</div>-->
    <!--</el-card>-->
    <el-card class="box-card"  style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>惠闪付图片进件资料</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
      </div>
      <!--表单内容-->
      <div>
        <div class="image-upload-box">
          <!--*************-->

          <!--门头照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>门头照</span>
              </div>
              <img v-if="formImgUrl.merchantHead" :src="formImgUrl.merchantHead" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--收银台照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>收银台照</span>
              </div>
              <img v-if="formImgUrl.merchantCheck" :src="formImgUrl.merchantCheck" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--经营场所照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>经营场所照</span>
              </div>
              <img v-if="formImgUrl.otherPhoto3" :src="formImgUrl.otherPhoto3" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--法人身份证正面照(面部)-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>法人身份证正面</span>
              </div>
              <img v-if="formImgUrl.identityFace" :src="formImgUrl.identityFace" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--法人身份证反面照(国徽)-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>法人身份证反面</span>
              </div>
              <img v-if="formImgUrl.identityBack" :src="formImgUrl.identityBack" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--开户许可证照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>开户许可证照</span>
              </div>
              <img v-if="formImgUrl.bussinessCard" :src="formImgUrl.bussinessCard" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--营业执照照片-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>营业执照</span>
              </div>
              <img v-if="formImgUrl.bussiness" :src="formImgUrl.bussiness" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--结算人身份证正面照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>结算人身份证正面照</span>
              </div>
              <img v-if="formImgUrl.identityFaceCopy" :src="formImgUrl.identityFaceCopy" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--结算人身份证反面照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>结算人身份证反面照</span>

              </div>
              <img v-if="formImgUrl.identityBackCopy" :src="formImgUrl.identityBackCopy" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--手持身份证照片-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>手持身份证照片</span>
              </div>
              <img v-if="formImgUrl.identityBody" :src="formImgUrl.identityBody" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--非法人对私授权函-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>非法人对私授权函</span>

              </div>
              <img v-if="formImgUrl.otherPhoto4" :src="formImgUrl.otherPhoto4" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--租房合同-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>租房合同</span>
              </div>
              <img v-if="formImgUrl.otherPhoto2" :src="formImgUrl.otherPhoto2" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--其他资料-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>其他资料</span>
              </div>
              <img v-if="formImgUrl.otherPhoto" :src="formImgUrl.otherPhoto" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--银行卡照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>银行卡照</span>
              </div>
              <img v-if="formImgUrl.cardFace" :src="formImgUrl.cardFace" class="logo">
              <img v-else :src="base64" class="logo">
            </div>
          </el-card>

          <!--*************-->
        </div>
      </div>

      <div class="btn-group">
        <!--<el-button type="primary" @click="submitImgCheck" v-loading="btnLoading" :disabled="btnLoading">提交第三方</el-button>-->
      </div>
      <!--表结束-->
    </el-card>


  </div>
  <!--惠闪付图片进件结束-->
</template>

<script>
  import {returnThumbnailUrl, uploadUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/agent/api/hsfMerchantInfo'
  import {url} from '@/utils/request'
  export default {
    name: "hsfBasicIncoming",
    data() {
      return {
        loading: true, //加载
        btnLoading: false,
        base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC',
        form: {
          merchantHead: '', //门头照
          merchantCheck: '', //收银台照
          otherPhoto3: '', //经营场所照
          identityFace: '', //法人身份证正面照(面部)
          identityBack: '', //法人身份证反面照(国徽)
          bussinessCard: '', //开户许可证照
          bussiness: '', //营业执照照片
          identityFaceCopy: '', //结算人身份证正面照
          identityBackCopy: '', //结算人身份证反面照
          identityBody: '', //手持身份证照片
          otherPhoto4: '', //非法人对私授权函
          otherPhoto2: '', //租房合同
          otherPhoto: '', //其他资料
          cardFace: '', //银行卡
        },
        formImgUrl: {
          merchantHead: '',
          merchantCheck: '',
          otherPhoto3: '',
          identityFace: '',
          identityBack: '',
          bussinessCard: '',
          bussiness: '',
          identityFaceCopy: '',
          identityBackCopy: '',
          identityBody: '',
          otherPhoto4: '',
          otherPhoto2: '',
          otherPhoto: '',
          cardFace: '',
        },
        //图片上传-------------------
        filesData: {
          module: 'image'
        },
        url: uploadUrl + '/user',
        headers: {
          authorized: sessionStorage.token
        },
      }
    },
    mounted() {
      this.urlid = this.$route.query.id;  //接收ID

      //获取进件资料
      this.findHsfentryFile(this.urlid)
    },

    methods: {
      /**
       * 获取进件资料回显
       */
      findHsfentryFile: function (id) {
        findHsfentryImg(id).then(res => {
          let data = res.obj;
          this.loading = false
          this.dataAutoInput(data)
        }).catch(e => {

        })
      },

      dataAutoInput: function (data) {
        this.form.id = data.id;
        this.form.merchantHead = data.merchantHead;
        this.form.merchantCheck = data.merchantCheck || '';
        this.form.otherPhoto3 = data.otherPhoto3 || '';
        this.form.identityFace = data.identityFace || '';
        this.form.identityBack = data.identityBack || '';
        this.form.bussinessCard = data.bussinessCard || '';
        this.form.bussiness = data.bussiness || '';
        this.form.identityFaceCopy = data.identityFaceCopy || '';
        this.form.identityBackCopy = data.identityBackCopy || '';
        this.form.identityBody = data.identityBody || '';
        this.form.otherPhoto4 = data.otherPhoto4 || '';
        this.form.otherPhoto2 = data.otherPhoto2 || '';
        this.form.otherPhoto = data.otherPhoto || '';
        this.form.cardFace = data.cardFace || '';

        console.log(this.form);

        this.formImgUrl.merchantHead = this.imgFil(data.merchantHead);
        this.formImgUrl.merchantCheck = this.imgFil(data.merchantCheck);
        this.formImgUrl.otherPhoto3 = this.imgFil(data.otherPhoto3);
        this.formImgUrl.identityFace = this.imgFil(data.identityFace);
        this.formImgUrl.identityBack = this.imgFil(data.identityBack);
        this.formImgUrl.bussinessCard = this.imgFil(data.bussinessCard);
        this.formImgUrl.bussiness = this.imgFil(data.bussiness);
        this.formImgUrl.identityFaceCopy = this.imgFil(data.identityFaceCopy);
        this.formImgUrl.identityBackCopy = this.imgFil(data.identityBackCopy);
        this.formImgUrl.identityBody = this.imgFil(data.identityBody);
        this.formImgUrl.otherPhoto4 = this.imgFil(data.otherPhoto4);
        this.formImgUrl.otherPhoto2 = this.imgFil(data.otherPhoto2);
        this.formImgUrl.otherPhoto = this.imgFil(data.otherPhoto);
        this.formImgUrl.cardFace = this.imgFil(data.cardFace);

      },
      imgFil: function (val) {
        //resource
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val == '' || val == null) {
          return ''
        }
        let arrayStr = val.split('\\'); // 凭\\分割出文件名

        if(arrayStr.length>4){
          return url + '/filepath/'+arrayStr[(arrayStr.length - 2)]+"/" + arrayStr[(arrayStr.length - 1)];
        }else{
          return url + '/filepath/' + arrayStr[(arrayStr.length - 1)];
        }
      },
      /**
       * 照片上传 function 组
       */
      //门头照
      merchantHeadUpload(response, file) {
        console.log(response);
        this.$message({
          message: '门头照上传成功',
          type: 'success'
        });
        this.form.merchantHead = response.obj;
        this.formImgUrl.merchantHead = returnThumbnailUrl(response.obj)
      },
      //收银台照
      merchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收银台照上传成功',
          type: 'success'
        });
        this.form.merchantCheck = response.obj;
        this.formImgUrl.merchantCheck = returnThumbnailUrl(response.obj)
      },
      //经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所照上传成功',
          type: 'success'
        });
        this.form.otherPhoto3 = response.obj;
        this.formImgUrl.otherPhoto3 = returnThumbnailUrl(response.obj)
      },

      //法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面照上传成功',
          type: 'success'
        });
        this.form.identityFace = response.obj;
        this.formImgUrl.identityFace = returnThumbnailUrl(response.obj)
      },
      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面照上传成功',
          type: 'success'
        });
        this.form.identityBack = response.obj;
        this.formImgUrl.identityBack = returnThumbnailUrl(response.obj)
      },
      //开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照上传成功',
          type: 'success'
        });
        this.form.bussinessCard = response.obj;
        this.formImgUrl.bussinessCard = returnThumbnailUrl(response.obj)
      },
      //营业执照
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照上传成功',
          type: 'success'
        });
        this.form.bussiness = response.obj;
        this.formImgUrl.bussiness = returnThumbnailUrl(response.obj)
      },
      //结算人身份证正面照
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证正面上传成功',
          type: 'success'
        });
        this.form.identityFaceCopy = response.obj;
        this.formImgUrl.identityFaceCopy = returnThumbnailUrl(response.obj)
      },
      //结算人身份证反面照
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证反面上传成功',
          type: 'success'
        });
        this.form.identityBackCopy = response.obj;
        this.formImgUrl.identityBackCopy = returnThumbnailUrl(response.obj)
      },
      //手持身份证照片
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照片上传成功',
          type: 'success'
        });
        this.form.identityBody = response.obj;
        this.formImgUrl.identityBody = returnThumbnailUrl(response.obj)
      },
      //非法人对私授权函
      otherPhoto4Upload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人对私授权函上传成功',
          type: 'success'
        });
        this.form.otherPhoto4 = response.obj;
        this.formImgUrl.otherPhoto4 = returnThumbnailUrl(response.obj)
      },
      //租房合同
      otherPhoto2Upload(response, file) {
        console.log(response);
        this.$message({
          message: '租房合同上传成功',
          type: 'success'
        });
        this.form.otherPhoto2 = response.obj;
        this.formImgUrl.otherPhoto2 = returnThumbnailUrl(response.obj)
      },
      //其他资料
      otherPhotoUpload(response, file) {
        console.log(response);
        this.$message({
          message: '其他资料上传成功',
          type: 'success'
        });
        this.form.otherPhoto = response.obj;
        this.formImgUrl.otherPhoto = returnThumbnailUrl(response.obj)
      },
      //银行卡照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡照上传成功',
          type: 'success'
        });
        this.form.cardFace = response.obj;
        this.formImgUrl.cardFace = returnThumbnailUrl(response.obj)
      },


      /**
       * 尝试提示进件
       */
      submitImgCheck: function () {
        this.btnLoading = true;

      },


      /**
       * 工具
       */
      noImg: function () {
        let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC'
        return base64
      },
      /**
       * 返回
       */
      goBack() {
        this.$router.go('-1')
      },
      /**
       *上传失败
       **/
      handleImageFailed() {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      },
      /*
   * 对类型、大小做限制
   * */
      beforeLogoUpload(file) {
        let isImage = file.type.substring(0, 5) === 'image';
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        return true
      },
    }
  }
</script>

<style scoped>

  .image-upload-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .image-upload-item {
    margin: 10px auto;
  }


  .card-header-title {
    padding: 0 0 10px 0;
  }

  .card-header-title span {
    font-size: 14px;
    color: #7a7a7a;
  }

  .up-success {
    color: #67C23A !important;
  }


  /*图片上传*/
  .logo-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .logo-uploader:hover {
    border-color: #409EFF;
  }

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .logo {
    width: 178px;
    height: 178px;
    display: block;
  }

  .title-header {
    margin-bottom: 10px;
  }

  .name_title {
    font-size: 24px;
    margin: 0 0 10px 0;
  }

  .name_back {
    cursor: pointer;
    float: right;
    font-size: 14px;
    color: #409eff;
  }

  .image-upload-item > div img {
    width: 178px;
    height: 178px;
  }

  .btn-group {
    width: 100%;
    text-align: center;
  }
</style>
