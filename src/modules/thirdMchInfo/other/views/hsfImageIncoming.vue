<template>
  <!--惠闪付图片进件-->
  <div class="app-container" v-loading="loading">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>惠闪付图片进件资料</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">退出编辑并返回</el-button>
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
                <span v-if="formImgUrl.merchantHead!=''">&nbsp</span>
                <span v-if="formImgUrl.merchantHead!=''"
                      :class="{'up-success':formImgUrl.merchantHead!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="merchantHeadUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <!--<img v-if="formImgUrl.merchantHead" :src="formImgUrl.merchantHead" class="logo">-->
                <img v-if="formImgUrl.merchantHead" :src="formImgUrl.merchantHead" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--收银台照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>收银台照</span>
                <span v-if="formImgUrl.merchantCheck!=''">&nbsp</span>
                <span v-if="formImgUrl.merchantCheck!=''"
                      :class="{'up-success':formImgUrl.merchantCheck!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="merchantCheckUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.merchantCheck" :src="formImgUrl.merchantCheck" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--经营场所照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>经营场所照</span>
                <span v-if="formImgUrl.otherPhoto3!=''">&nbsp</span>
                <span v-if="formImgUrl.otherPhoto3!=''"
                      :class="{'up-success':formImgUrl.otherPhoto3!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="otherPhoto3Upload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.otherPhoto3" :src="formImgUrl.otherPhoto3" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--法人身份证正面照(面部)-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>法人身份证正面</span>
                <span v-if="formImgUrl.identityFace!=''">&nbsp</span>
                <span v-if="formImgUrl.identityFace!=''"
                      :class="{'up-success':formImgUrl.identityFace!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="identityFaceUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.identityFace" :src="formImgUrl.identityFace" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--法人身份证反面照(国徽)-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>法人身份证反面</span>
                <span v-if="formImgUrl.identityBack!=''">&nbsp</span>
                <span v-if="formImgUrl.identityBack!=''"
                      :class="{'up-success':formImgUrl.identityBack!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="identityBackUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.identityBack" :src="formImgUrl.identityBack" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--开户许可证照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>开户许可证照</span>
                <span v-if="formImgUrl.bussinessCard!=''">&nbsp</span>
                <span v-if="formImgUrl.bussinessCard!=''"
                      :class="{'up-success':formImgUrl.bussinessCard!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="bussinessCardUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.bussinessCard" :src="formImgUrl.bussinessCard" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--营业执照照片-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>营业执照</span>
                <span v-if="formImgUrl.bussiness!=''">&nbsp</span>
                <span v-if="formImgUrl.bussiness!=''"
                      :class="{'up-success':formImgUrl.bussiness!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="bussinessUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.bussiness" :src="formImgUrl.bussiness" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--结算人身份证正面照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>结算人身份证正面照</span>
                <span v-if="formImgUrl.identityFaceCopy!=''">&nbsp</span>
                <span v-if="formImgUrl.identityFaceCopy!=''"
                      :class="{'up-success':formImgUrl.identityFaceCopy!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="identityFaceCopyUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.identityFaceCopy" :src="formImgUrl.identityFaceCopy" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--结算人身份证反面照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>结算人身份证反面照</span>
                <span v-if="formImgUrl.identityBackCopy!=''">&nbsp</span>
                <span v-if="formImgUrl.identityBackCopy!=''"
                      :class="{'up-success':formImgUrl.identityBackCopy!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="identityBackCopyUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.identityBackCopy" :src="formImgUrl.identityBackCopy" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--手持身份证照片-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>手持身份证照片</span>
                <span v-if="formImgUrl.identityBody!=''">&nbsp</span>
                <span v-if="formImgUrl.identityBody!=''"
                      :class="{'up-success':formImgUrl.identityBody!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="identityBodyUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.identityBody" :src="formImgUrl.identityBody" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--非法人对私授权函-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>非法人对私授权函</span>
                <span v-if="formImgUrl.otherPhoto4!=''">&nbsp</span>
                <span v-if="formImgUrl.otherPhoto4!=''"
                      :class="{'up-success':formImgUrl.otherPhoto4!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="otherPhoto4Upload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.otherPhoto4" :src="formImgUrl.otherPhoto4" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--租房合同-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>租房合同</span>
                <span v-if="formImgUrl.otherPhoto2!=''">&nbsp</span>
                <span v-if="formImgUrl.otherPhoto2!=''"
                      :class="{'up-success':formImgUrl.otherPhoto2!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="otherPhoto2Upload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.otherPhoto2" :src="formImgUrl.otherPhoto2" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--其他资料-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>其他资料</span>
                <span v-if="formImgUrl.otherPhoto!=''">&nbsp</span>
                <span v-if="formImgUrl.otherPhoto!=''"
                      :class="{'up-success':formImgUrl.otherPhoto!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="otherPhotoUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.otherPhoto" :src="formImgUrl.otherPhoto" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--银行卡照-->
          <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
            <div>
              <div class="card-header-title">
                <span>银行卡照</span>
                <span v-if="formImgUrl.cardFace!=''">&nbsp</span>
                <span v-if="formImgUrl.cardFace!=''"
                      :class="{'up-success':formImgUrl.cardFace!=''}">成功
                </span>
              </div>
              <el-upload
                class="logo-uploader"
                :action="url"
                accept="image/png,image/jpg,image/jpeg"
                :data="filesData"
                name="file"
                :show-file-list="false"
                :on-success="cardFaceUpload"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="formImgUrl.cardFace" :src="formImgUrl.cardFace" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
            </div>
          </el-card>

          <!--*************-->
        </div>
      </div>

      <div class="btn-group">
        <el-button type="primary" @click="submitForm" v-loading="btnLoading" :disabled="btnLoading">提交进件材料</el-button>
      </div>
      <!--表结束-->
    </el-card>


  </div>
  <!--惠闪付图片进件结束-->
</template>

<script>
  import {returnThumbnailUrl, uploadUrl, hsfuploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  export default {
    name: "hsfBasicIncoming",
    data() {
      return {
        loading: true, //加载
        btnLoading: false,
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
        url: hsfuploadUrl,
        headers: {
          authorized: sessionStorage.token
        },
      }
    },
    filters: {
      //二维码换成http路径

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
          this.loading = false;
          console.log(res.obj);
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

        // this.form.id = data.id;
        // this.form.merchantHead = data.merchantHead;
        // this.form.merchantCheck = data.merchantCheck || '';
        // this.form.otherPhoto3 = data.otherPhoto3 || '';
        // this.form.identityFace = data.identityFace || '';
        // this.form.identityBack = data.identityBack || '';
        // this.form.bussinessCard = data.bussinessCard || '';
        // this.form.bussiness = data.bussiness || '';
        // this.form.identityFaceCopy = data.identityFaceCopy || '';
        // this.form.identityBackCopy = data.identityBackCopy || '';
        // this.form.identityBody = data.identityBody || '';
        // this.form.otherPhoto4 = data.otherPhoto4 || '';
        // this.form.otherPhoto2 = data.otherPhoto2 || '';
        // this.form.otherPhoto = data.otherPhoto || '';
        // this.form.cardFace = data.cardFace || '';
        //
        // console.log( this.form)
        //
        //
        // if (data.merchantHead != '') this.formImgUrl.merchantHead = returnThumbnailUrl(data.merchantHead);
        // if (data.merchantCheck != '') this.formImgUrl.merchantCheck = returnThumbnailUrl(data.merchantCheck);
        // if (data.otherPhoto3 != '') this.formImgUrl.otherPhoto3 = returnThumbnailUrl(data.otherPhoto3);
        // if (data.identityFace != '') this.formImgUrl.identityFace = returnThumbnailUrl(data.identityFace);
        // if (data.identityBack != '') this.formImgUrl.identityBack = returnThumbnailUrl(data.identityBack);
        // if (data.bussinessCard != '') this.formImgUrl.bussinessCard = returnThumbnailUrl(data.bussinessCard);
        // if (data.bussiness != '') this.formImgUrl.bussiness = returnThumbnailUrl(data.bussiness);
        // if (data.identityFaceCopy != '') this.formImgUrl.identityFaceCopy = returnThumbnailUrl(data.identityFaceCopy);
        // if (data.identityBackCopy != '') this.formImgUrl.identityBackCopy = returnThumbnailUrl(data.identityBackCopy);
        // if (data.identityBody != '') this.formImgUrl.identityBody = returnThumbnailUrl(data.identityBody);
        // if (data.otherPhoto4 != '') this.formImgUrl.otherPhoto4 = returnThumbnailUrl(data.otherPhoto4);
        // if (data.otherPhoto2 != '') this.formImgUrl.otherPhoto2 = returnThumbnailUrl(data.otherPhoto2);
        // if (data.otherPhoto != '') this.formImgUrl.otherPhoto = returnThumbnailUrl(data.otherPhoto);
        // if (data.cardFace != '') this.formImgUrl.cardFace = returnThumbnailUrl(data.cardFace);


      },

      imgFil: function (val) {
        //resource
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val == '' || val == null) {
          return ''
        }
        let arrayStr = val.split('\\'); // 凭\\分割出文件名

        console.log(arrayStr);
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
        this.form.merchantHead = response.obj.path;
        this.formImgUrl.merchantHead = this.imgFil(response.obj.path)
      },
      //收银台照
      merchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收银台照上传成功',
          type: 'success'
        });
        this.form.merchantCheck = response.obj.path;
        this.formImgUrl.merchantCheck = this.imgFil(response.obj.path)
      },
      //经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所照上传成功',
          type: 'success'
        });
        this.form.otherPhoto3 = response.obj.path;
        this.formImgUrl.otherPhoto3 = this.imgFil(response.obj.path)
      },

      //法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面照上传成功',
          type: 'success'
        });
        this.form.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },
      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面照上传成功',
          type: 'success'
        });
        this.form.identityBack = response.obj.path;
        this.formImgUrl.identityBack = this.imgFil(response.obj.path)
      },
      //开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照上传成功',
          type: 'success'
        });
        this.form.bussinessCard = response.obj.path;
        this.formImgUrl.bussinessCard = this.imgFil(response.obj.path)
      },
      //营业执照
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照上传成功',
          type: 'success'
        });
        this.form.bussiness = response.obj.path;
        this.formImgUrl.bussiness = this.imgFil(response.obj.path)
      },
      //结算人身份证正面照
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证正面上传成功',
          type: 'success'
        });
        this.form.identityFaceCopy = response.obj.path;
        this.formImgUrl.identityFaceCopy = this.imgFil(response.obj.path)
      },
      //结算人身份证反面照
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证反面上传成功',
          type: 'success'
        });
        this.form.identityBackCopy = response.obj.path;
        this.formImgUrl.identityBackCopy = this.imgFil(response.obj.path)
      },
      //手持身份证照片
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照片上传成功',
          type: 'success'
        });
        this.form.identityBody = response.obj.path;
        this.formImgUrl.identityBody = this.imgFil(response.obj.path)
      },
      //非法人对私授权函
      otherPhoto4Upload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人对私授权函上传成功',
          type: 'success'
        });
        this.form.otherPhoto4 = response.obj.path;
        this.formImgUrl.otherPhoto4 = this.imgFil(response.obj.path)
      },
      //租房合同
      otherPhoto2Upload(response, file) {
        console.log(response);
        this.$message({
          message: '租房合同上传成功',
          type: 'success'
        });
        this.form.otherPhoto2 = response.obj.path;
        this.formImgUrl.otherPhoto2 = this.imgFil(response.obj.path)
      },
      //其他资料
      otherPhotoUpload(response, file) {
        console.log(response);
        this.$message({
          message: '其他资料上传成功',
          type: 'success'
        });
        this.form.otherPhoto = response.obj.path;
        this.formImgUrl.otherPhoto = this.imgFil(response.obj.path)
      },
      //银行卡照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡照上传成功',
          type: 'success'
        });
        this.form.cardFace = response.obj.path;
        this.formImgUrl.cardFace = this.imgFil(response.obj.path)
      },


      /**
       * 尝试提示表单
       */
      submitForm: function () {
        let that = this;
        this.btnLoading = true;

        hsfImgUpdate(this.form).then(res => {
          this.$message.success('照片资料提交成功');
          setTimeout(function () {
            that.$router.go('-1')
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },


      /**
       * 工具
       */
      /**
       * 返回
       */
      goBack() {
        this.$confirm('正在编辑的数据将不会保存，是否退出？', '退出编辑？', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go('-1')
        }).catch(() => {

        });
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
        let isImageSize=file.size;
        console.log('图片大小:'+isImageSize )
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        if (isImageSize>512*1000) {
          this.$message.error('仅支持500KB以下图片！');
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

  .btn-group {
    width: 100%;
    text-align: center;
  }
</style>
