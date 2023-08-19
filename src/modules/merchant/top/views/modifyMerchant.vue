<template>
  <div class="app-container" v-loading="loading">


    <el-form ref="addForm" :rules="addFormRule" :model="addForm" :label-width="labelWidth" size="small">
      <!--商户基本信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商户基本信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">退出</el-button>
        </div>
        <!--表单-->
        <div>
          <el-form-item label="商户名称：" prop="name">
            <el-input v-model.trim="addForm.name"
                      placeholder="商户(公司)名称，与营业执照一致"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="商户简称：" prop="shortName">
            <el-input v-model.trim="addForm.shortName"
                      placeholder="商户(公司)简称，支付时显示的名称"
                      class="input-width">
            </el-input>
          </el-form-item>


          <el-form-item label="联系人姓名：" prop="contact">
            <el-input v-model.trim="addForm.contact" class="input-width"
                      placeholder="联系人（负责人）真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话：" prop="phone">
            <el-input v-model.trim="addForm.phone" :disabled="modifyMode" class="input-width"
                      placeholder="联系人手机号（商户号使用该手机号注册）（13011112222或059188886666）"></el-input>
          </el-form-item>


          <el-form-item label="客服电话：" prop="customerPhone">
            <el-input v-model.trim="addForm.customerPhone" class="input-width"
                      placeholder="客服手机或固定电话号码（13011112222或059188886666）"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model.trim="addForm.email" class="input-width"
                      placeholder="商户电子邮箱"></el-input>
          </el-form-item>

          <el-form-item label="商户类型：" prop="businessLevOne">
            <el-select v-model="addForm.businessLevOne" placeholder="请选择商户类型"
                       @change="getType1($event)">
              <el-option :value="n.name"
                         :key="index"
                         :label="n.name"
                         v-for="(n,index) in businessTypes">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营行业：" prop="businessLevTwo">
            <el-select v-model="addForm.businessLevTwo" placeholder="请选择一级经营行业"
                       @change="getType2($event)">
              <el-option :value="n.name"
                         :key="index"
                         :label="n.name"
                         v-for="(n,index) in businessTypes2">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="businessLevThree">
            <el-select v-model="addForm.businessLevThree" placeholder="请选择二级经营行业"
                       @change="getType3($event)">
              <el-option :value="n.name"
                         :key="index"
                         :label="n.name"
                         :title="n.desc"
                         v-for="(n,index) in businessTypes3">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="详细地址：">
            <el-form-item class="block" prop="province">
              <el-select v-model="addForm.province" placeholder="请选择省份"
                         @change="getProv($event)">
                <el-option :value="n"
                           :key="index"
                           :label="n"
                           v-for="(n,index) in dataProv[0]['prov']">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="block" prop="city">
              <el-select v-model="addForm.city" placeholder="请选择城市"
                         @change="getCity($event)">
                <el-option :value="n"
                           :key="index"
                           :label="n"
                           v-for="(n,index) in dataCity">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="area" class="block">
              <el-select v-model="addForm.area" placeholder="请选择区/县">
                <el-option :value="n"
                           :key="index"
                           :label="n"
                           v-for="(n,index) in dataCountry">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>


          <el-form-item prop="address">
            <el-input v-model.trim="addForm.address" class="input-width"
                      placeholder="详细地址（精确到门牌号）"></el-input>
          </el-form-item>


          <el-form-item label="法人姓名:">
            <el-input v-model.trim="addForm.legalName" class="input-width"
                      placeholder="法人真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="法人电话:">
            <el-input v-model.trim="addForm.legalPhone" class="input-width"
                      placeholder="法人手机号"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证号:">
            <el-input v-model.trim="addForm.legalIdNum" class="input-width"
                      placeholder="法人身份证号"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证有效期:">
            <div class="block">
              <el-form-item class="block">
                <el-date-picker
                  v-model="addForm.startLegalTime"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <span v-if="!LegalTimeMode">至</span>
              <el-form-item class="block" v-if="!LegalTimeMode">
                <el-date-picker
                  v-model="addForm.endLegalTime"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <el-checkbox v-model="LegalTimeMode">长期</el-checkbox>
          </el-form-item>

          <el-form-item label="营业执照号:">
            <el-input v-model.trim="addForm.license" class="input-width"
                      placeholder="营业执照号，如实填写"></el-input>
          </el-form-item>

          <el-form-item label="营业执照有效期:">
            <div class="block">
              <el-form-item class="block">
                <el-date-picker
                  v-model="addForm.startLicenseTime"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <span v-if="!licenseTimeMode">至</span>
              <el-form-item class="block" v-if="!licenseTimeMode">
                <el-date-picker
                  v-model="addForm.endLicenseTime"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <el-checkbox v-model="licenseTimeMode">长期</el-checkbox>
          </el-form-item>


        </div>
      </el-card>
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>结算信息</span>
        </div>
        <!--表单-->
        <div>
          <el-form-item label="对公对私：">
            <el-radio v-model="addForm.intoType" :label="1">对公</el-radio>
            <el-radio v-model="addForm.intoType" :label="2">对私</el-radio>
          </el-form-item>

          <div divName="对公" v-if="addForm.intoType==1">

            <el-form-item label="开户名称：">
              <el-input v-model.trim="addForm.pubOutletName"
                        placeholder="开户名称"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户城市：">
              <el-input v-model.trim="addForm.pubOutletCity"
                        placeholder="开户银行城市"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行：">
              <el-input v-model.trim="addForm.pubOutletBank"
                        placeholder="开户银行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行支行：">
              <el-input v-model.trim="addForm.pubOutlet"
                        placeholder="开户银行支行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算银行账号：">
              <el-input v-model.trim="addForm.pubBankAcct"
                        placeholder="银行账号"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算联行号：">
              <el-input v-model.trim="addForm.pubUnionpayNum"
                        placeholder="结算联行号，参考附件或咨询您的开户行"
                        class="input-width"
                        style="display: inline-block">
              </el-input>
              <span class="tips"> 联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 下载</a></span>
            </el-form-item>

          </div>

          <div divName="对私" v-if="addForm.intoType==2">

            <el-form-item label="结算人姓名：">
              <el-input v-model.trim="addForm.priName"
                        placeholder="结算人姓名（银行开户名称）"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算人手机号：">
              <el-input v-model.trim="addForm.priPhone"
                        placeholder="结算人联系电话号码"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算人身份证号：">
              <el-input v-model.trim="addForm.priIdNum"
                        placeholder="结算人身份证号"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算银行账号：">
              <el-input v-model.trim="addForm.priBankCardNum"
                        placeholder="结算银行账号（卡号、存折号）"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行：">
              <el-input v-model.trim="addForm.priBankName"
                        placeholder="开户银行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行支行：">
              <el-input v-model.trim="addForm.priBankOutlet"
                        placeholder="开户银行支行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算联行号：">
              <el-input v-model.trim="addForm.priUnionpayNum"
                        placeholder="结算联行号,参考附件或咨询您的开户行"

                        class="input-width">
              </el-input>
              <span class="tips">&nbsp联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')">查询</a></span>
            </el-form-item>

          </div>

        </div>
      </el-card>
      <!--图片资料-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>相关资质照片</span>
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
                  <span v-if="formImgUrl.priAuth!=''">&nbsp</span>
                  <span v-if="formImgUrl.priAuth!=''"
                        :class="{'up-success':formImgUrl.priAuth!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="priAuthUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.priAuth" :src="formImgUrl.priAuth" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--租房合同-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>租房合同</span>
                  <span v-if="formImgUrl.rentHouse!=''">&nbsp</span>
                  <span v-if="formImgUrl.rentHouse!=''"
                        :class="{'up-success':formImgUrl.rentHouse!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="rentHouseUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.rentHouse" :src="formImgUrl.rentHouse" class="logo">
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

            <!--其他资料1-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他资料-1</span>
                  <span v-if="formImgUrl.other1!=''">&nbsp</span>
                  <span v-if="formImgUrl.other1!=''"
                        :class="{'up-success':formImgUrl.other1!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="other1Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other1" :src="formImgUrl.other1" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--其他资料2-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他资料-2</span>
                  <span v-if="formImgUrl.other2!=''">&nbsp</span>
                  <span v-if="formImgUrl.other2!=''"
                        :class="{'up-success':formImgUrl.other2!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="other2Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other2" :src="formImgUrl.other2" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>


            <!--*************-->
          </div>
        </div>
        <!--表结束-->
        <div class="submit-btn-group">
          <el-tooltip class="item" effect="light" content="您填写的内容不会被保存！" placement="top">
            <el-button type="" @click="goQuit">取消并退出</el-button>
          </el-tooltip>

          <el-button type="primary" @click="dataCollation" :loading="btnLoading">{{modifyMode?'保存修改':'保存并前往支付通道'}}
          </el-button>
        </div>
      </el-card>


    </el-form>


  </div>
</template>

<script>
  import typeJson from '@/assets/merchantType/merchantType.json' //商户类型数据
  import cityJson from '@/assets/city/city.json' //地域数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  import {modifyMerchant, getMerchant, updateMerchant} from '../api/modifyMerchant'

  import {mixins} from "../../../../components/mixins/mixins";


  export default {
    name: "addMerchant",
    mixins:[mixins],
    data() {
      var checkShop_phon = (rule, value, callback) => {
        let reg = /^((0\d{2,3}\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('手机或电话号码格式错误(13011112222或059188886666)'))
        } else {
          callback()
        }

      };
      return {
        loading: false,
        btnLoading: false,
        labelWidth: '160px',

        modifyMode: false, //编辑模式？

        addForm: {
          name: '',//公司全名
          shortName: '',//公司简称,

          customerPhone: '', //客服
          email: '', //电邮

          businessLevOne: '', //商户类型
          businessLevTwo: '', //经营一级
          businessLevThree: '', //经营二级

          province: '', //省市区
          city: '',
          area: '',
          address: '', //详细地址

          contact: '', //负责人姓名 同时 也是联系人
          phone: '', //负责人电话
          legalName: '',
          legalPhone: '',
          legalIdNum: '',
          startLegalTime: '2019-08-06',
          endLegalTime: '2019-08-06',

          license: '', //营业执照号
          startLicenseTime: '2019-08-06',
          endLicenseTime: '2019-08-06',


          intoType: 1,//对公对私 1公 2私

          //对公
          pubOutletName: '', //对公账户名
          pubOutletCity: '', //对公开户城市
          pubOutletBank: '',
          pubOutlet: '',
          pubBankAcct: '',
          pubUnionpayNum: '',

          //对私
          priName: '', //对私账户名
          priPhone: '', //结算手机号
          priIdNum: '', //结算身份证
          priBankCardNum: '', //结算卡号
          priBankName: '', //结算银行
          priBankOutlet: '', //结算支行
          priUnionpayNum: '', //结算联行号

          //图片id
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
          priAuth: '', //非法人对私授权函
          rentHouse: '', //租房合同
          cardFace: '', //银行卡
          other1: '', //其他资料
          other2: '', //其他资料

          companyId: '', //运营商或者渠道商id
          managerId: '', //业务员id
          status: '1', //正常状态

        },
        LegalTimeMode: false, //法人身份证有效期模式 0非长期 1长期
        licenseTimeMode: false, //营业执照有效期模式 0非长期 1长期

        addFormRule: {
          name: [
            {required: true, message: '请输入商户名称', trigger: 'blur'},
          ],
          shortName: [
            {required: true, message: '请输入商户简称', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          customerPhone: [
            {required: true, message: '请输入客服电话', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          ],
          businessLevOne: [
            {required: true, message: '请选择商户类型', trigger: 'change'},
          ],
          businessLevTwo: [
            {required: true, message: '请选择经营行业', trigger: 'change'},
          ],
          businessLevThree: [
            {required: true, message: '请选择商户类型', trigger: 'change'},
          ],
          province: [
            {required: true, message: '请选择地址', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择地址', trigger: 'change'},
          ],
          area: [
            {required: true, message: '请选择地址', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
          ],
        },

        //图片临时
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
          rentHouse: '',
          priAuth: '',
          cardFace: '',
          other1: '', //其他资料
          other2: '', //其他资料

        },


        //经营类型选择器
        businessTypes: [], //经营类型数据
        businessTypes2: [], //经营类型数据2 选中1后出现
        businessTypes3: [], //经营类型数据3 选中2后出现
        selectedBusinessType1: null,
        selectedBusinessType2: null,
        selectedBusinessType3: null,

        //地域选择
        dataProv: cityJson['selectProv'],
        dataCity: '',  //城市
        dataCountry: '', //区域
        provIndex: '',
        cityIndex: '',

        //图片上传
        filesData: {
          module: 'image'
        },
        url: newUploadUrl,
        headers: {
          authorized: sessionStorage.token
        },

        //id
        urlid: '',

      }
    },
    mounted() {
      //选项赋值
      this.businessTypes = typeJson;

      //获取userId和companyId
      this.addForm.companyId = sessionStorage.getItem('companyId') || null;
      this.addForm.managerId = sessionStorage.getItem('userId') || null;


      //获取url id
      this.urlid = this.$route.query.id;  //接收ID
      let id = this.urlid;
      if (id !== '' && id != null && id != undefined) {
        this.modifyMode = true;  //修改模式
        this.getMerchantDetail()
      } else {
        this.$message.error('没有这个商户')
        this.modifyAfterGoBack()
      }
    },
    methods: {
      /**
       * 提交前数据整理
       */
      dataCollation: function () {
        let form;
        form = this.deepCopy(this.addForm);
        console.log(form);

        //处理日期为长期的情况
        if (this.LegalTimeMode) {
          form.endLegalTime = '2099-12-31'
        }
        if (this.licenseTimeMode) {
          form.endLicenseTime = '2099-12-31'
        }

        //直接按修改模式提交
        this.submitUpdateData(form)
      },
      /**
       * 保存修改
       */
      submitUpdateData: function (form) {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            if (form.status) {
              delete form.status //删除状态，不要改变这个
            }
            this.loading = true; //遮住页面
            this.btnLoading = true; //锁定按钮

            updateMerchant(form).then(res => {
              this.$message.success(res.msg);

              this.loading = false;

              setTimeout(() => {
                this.modifyAfterGoBack()
              }, 500)

            }).catch(e => {

              this.loading = false;
              this.btnLoading = false;

            })

          } else {
            this.$message.error('还有资料未填写');
            return false;
          }
        });


      },

      /**
       * 修改后返回
       */
      modifyAfterGoBack: function () {
        this.$router.go(-1)
      },

      /**
       * 获取商户数据
       */
      getMerchantDetail: function () {
        getMerchant(this.urlid).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },

      /**
       * 回显资料
       */
      autoInputData: function (data) {
        console.log(data);
        var merData = data.merchant;
        var intoData = data.plantMchtInto;


        this.addForm.merchantId = merData.id;
        this.addForm.intoId = intoData.id;

        this.addForm.companyId = merData.companyId;
        this.addForm.managerId = merData.managerId;

        this.addForm.name = merData.name || '';
        this.addForm.contact = merData.contact || '';
        this.addForm.phone = merData.phone || '';

        this.addForm.shortName = merData.shortName || '';
        this.addForm.customerPhone = merData.customerPhone || '';
        this.addForm.email = merData.email || '';

        this.addForm.businessLevOne = merData.businessLevOne || '';
        this.getType1(merData.businessLevOne);
        this.addForm.businessLevTwo = merData.businessLevTwo || '';
        this.getType2(merData.businessLevTwo);
        this.addForm.businessLevThree = merData.businessLevThree || '';

        setTimeout(() => {
          this.addForm.province = merData.province || '';
          this.getProv(merData.province);
        }, 100);

        setTimeout(() => {
          this.addForm.city = merData.city || '';
          this.getCity(merData.city);
        }, 200);

        setTimeout(() => {
          this.addForm.area = merData.area || '';
        }, 300);


        this.addForm.address = merData.address || '';


        this.addForm.legalName = merData.legalName || '';
        this.addForm.legalPhone = merData.legalPhone || '';
        this.addForm.legalIdNum = merData.legalIdNum || '';
        this.addForm.startLegalTime = merData.startLegalTime || '';
        this.addForm.endLegalTime = merData.endLegalTime || '';

        if (merData.endLegalTime === '2099-12-31') {
          this.LegalTimeMode = true
        }

        this.addForm.license = merData.license || '';
        this.addForm.startLicenseTime = merData.startLicenseTime || '';
        this.addForm.endLicenseTime = merData.endLicenseTime || '';
        if (merData.endLicenseTime === '2099-12-31') {
          this.licenseTimeMode = true
        }


        this.addForm.intoType = intoData.intoType || '';

        if (intoData.intoType === 1) {
          this.addForm.pubOutletName = intoData.pubOutletName || '';
          this.addForm.pubOutletCity = intoData.pubOutletCity || '';
          this.addForm.pubOutletBank = intoData.pubOutletBank || '';
          this.addForm.pubOutlet = intoData.pubOutlet || '';
          this.addForm.pubBankAcct = intoData.pubBankAcct || '';
          this.addForm.pubUnionpayNum = intoData.pubUnionpayNum || ''
        } else if (intoData.intoType === 2) {
          this.addForm.priName = intoData.priName || '';
          this.addForm.priPhone = intoData.priPhone || '';
          this.addForm.priIdNum = intoData.priIdNum || '';
          this.addForm.priBankCardNum = intoData.priBankCardNum || '';
          this.addForm.priBankName = intoData.priBankName || '';
          this.addForm.priBankOutlet = intoData.priBankOutlet || '';
          this.addForm.priUnionpayNum = intoData.priUnionpayNum || ''
        }

        this.addForm.merchantHead = intoData.merchantHead || '';
        this.addForm.merchantCheck = intoData.merchantCheck || '';
        this.addForm.otherPhoto3 = intoData.otherPhoto3 || '';
        this.addForm.identityFace = intoData.identityFace || '';
        this.addForm.identityBack = intoData.identityBack || '';
        this.addForm.bussinessCard = intoData.bussinessCard || '';
        this.addForm.bussiness = intoData.bussiness || '';
        this.addForm.identityFaceCopy = intoData.identityFaceCopy || '';
        this.addForm.identityBackCopy = intoData.identityBackCopy || '';
        this.addForm.identityBody = intoData.identityBody || '';
        this.addForm.priAuth = intoData.priAuth || '';
        this.addForm.rentHouse = intoData.rentHouse || '';
        this.addForm.cardFace = intoData.cardFace || '';
        this.addForm.other1 = intoData.other1 || '';
        this.addForm.other2 = intoData.other2 || '';

        this.formImgUrl.merchantHead = this.imgFil(intoData.merchantHead);
        this.formImgUrl.merchantCheck = this.imgFil(intoData.merchantCheck);
        this.formImgUrl.otherPhoto3 = this.imgFil(intoData.otherPhoto3);
        this.formImgUrl.identityFace = this.imgFil(intoData.identityFace);
        this.formImgUrl.identityBack = this.imgFil(intoData.identityBack);
        this.formImgUrl.bussinessCard = this.imgFil(intoData.bussinessCard);
        this.formImgUrl.bussiness = this.imgFil(intoData.bussiness);
        this.formImgUrl.identityFaceCopy = this.imgFil(intoData.identityFaceCopy);
        this.formImgUrl.identityBackCopy = this.imgFil(intoData.identityBackCopy);
        this.formImgUrl.identityBody = this.imgFil(intoData.identityBody);
        this.formImgUrl.cardFace = this.imgFil(intoData.cardFace);
        this.formImgUrl.priAuth = this.imgFil(intoData.priAuth);
        this.formImgUrl.rentHouse = this.imgFil(intoData.rentHouse);
        this.formImgUrl.cardFace = this.imgFil(intoData.cardFace);
        this.formImgUrl.other1 = this.imgFil(intoData.other1);
        this.formImgUrl.other2 = this.imgFil(intoData.other2)
      },

      /**
       * 下载
       */
      downloadFile: function (type) {
        if (type == 'localCode') {
          window.location.href = '../../static/file/localCode.xlsx'
        } else if (type == 'bankCode') {
          window.open("http://www.lianhanghao.com/");
        }
      },

      /**
       * 新建  商户经营类别
       */
      getType1: function (event) {
        //console.log(event)
        for (let i in this.businessTypes) {
          if (this.businessTypes[i].name == event) {
            this.selectedBusinessType1 = i;
            this.businessTypes2 = this.businessTypes[i].children;
            // 可以另外再保存名称，方便在商户直接列表显示中文
            // this.addForm.businessLevOne = this.dataTypes[i].name
            //this.newMerchantForm.type1 = event
          }
        }
        this.addForm.businessLevTwo = '';
        this.addForm.businessLevThree = ''
      },
      getType2: function (event) {
        //console.log(event)
        let inx = parseInt(this.selectedBusinessType1);
        let arr = this.businessTypes[inx].children;
        for (let i in arr) {
          if (arr[i].name == event) {
            this.selectedBusinessType2 = i;
            // 可以另外再保存名称，方便在商户直接列表显示中文
            this.addForm.businessLevTwo = arr[i].name;
            //this.newMerchantForm.type2 = event
            this.businessTypes3 = arr[i].children
          }
        }
        this.addForm.businessLevThree = ''
      },
      getType3: function (event) {
        console.log(event);
        let inx1 = parseInt(this.selectedBusinessType1);
        let inx2 = parseInt(this.selectedBusinessType2);
        let arr = this.businessTypes[inx1].children[inx2].children;
        for (let i in arr) {
          if (arr[i].name == event) {
            // 可以另外再保存名称，方便在商户直接列表显示中文
            this.addForm.businessLevThree = arr[i].name
          }
        }
      },

      /**
       * 省市区
       */
      //省
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];

        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];


        this.addForm.city = '';
        this.addForm.area = ''
      },
      //市
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];

        this.addForm.area = ''
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
        this.addForm.merchantHead = response.obj.path;
        this.formImgUrl.merchantHead = this.imgFil(response.obj.path)
      },
      //收银台照
      merchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收银台照上传成功',
          type: 'success'
        });
        this.addForm.merchantCheck = response.obj.path;
        this.formImgUrl.merchantCheck = this.imgFil(response.obj.path)
      },
      //经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所照上传成功',
          type: 'success'
        });
        this.addForm.otherPhoto3 = response.obj.path;
        this.formImgUrl.otherPhoto3 = this.imgFil(response.obj.path)
      },

      //法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面照上传成功',
          type: 'success'
        });
        this.addForm.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },
      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面照上传成功',
          type: 'success'
        });
        this.addForm.identityBack = response.obj.path;
        this.formImgUrl.identityBack = this.imgFil(response.obj.path)
      },
      //开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照上传成功',
          type: 'success'
        });
        this.addForm.bussinessCard = response.obj.path;
        this.formImgUrl.bussinessCard = this.imgFil(response.obj.path)
      },
      //营业执照
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照上传成功',
          type: 'success'
        });
        this.addForm.bussiness = response.obj.path;
        this.formImgUrl.bussiness = this.imgFil(response.obj.path)
      },
      //结算人身份证正面照
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证正面上传成功',
          type: 'success'
        });
        this.addForm.identityFaceCopy = response.obj.path;
        this.formImgUrl.identityFaceCopy = this.imgFil(response.obj.path)
      },
      //结算人身份证反面照
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证反面上传成功',
          type: 'success'
        });
        this.addForm.identityBackCopy = response.obj.path;
        this.formImgUrl.identityBackCopy = this.imgFil(response.obj.path)
      },
      //手持身份证照片
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照片上传成功',
          type: 'success'
        });
        this.addForm.identityBody = response.obj.path;
        this.formImgUrl.identityBody = this.imgFil(response.obj.path)
      },
      //银行卡照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡照上传成功',
          type: 'success'
        });
        this.addForm.cardFace = response.obj.path;
        this.formImgUrl.cardFace = this.imgFil(response.obj.path)
      },
      //非法人对私授权函
      priAuthUpload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人对私授权函上传成功',
          type: 'success'
        });
        this.addForm.priAuth = response.obj.path;
        this.formImgUrl.priAuth = this.imgFil(response.obj.path)
      },
      //租房合同
      rentHouseUpload(response, file) {
        console.log(response);
        this.$message({
          message: '租房合同上传成功',
          type: 'success'
        });
        this.addForm.rentHouse = response.obj.path;
        this.formImgUrl.rentHouse = this.imgFil(response.obj.path)
      },
      //其他资料1
      other1Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他补充资料1 上传成功',
          type: 'success'
        });
        this.addForm.other1 = response.obj.path;
        this.formImgUrl.other1 = this.imgFil(response.obj.path)
      },
      //其他资料2
      other2Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他补充资料2 上传成功',
          type: 'success'
        });
        this.addForm.other2 = response.obj.path;
        this.formImgUrl.other2 = this.imgFil(response.obj.path)
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

      /**
       *对类型、大小做限制
       */
      beforeLogoUpload(file) {

        let isImage = file.type.substring(0, 5) === 'image';
        let isImageSize = file.size;
        console.log('图片大小: ' + isImageSize + ' b');
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        if (isImageSize > 512 * 1000) {
          this.$message.error('仅支持500KB以下图片！');
          return false
        }
        return true
      },
      /**
       *获取图片  进件专用的方法
       */
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
       * 退出编辑页
       */
      goQuit: function () {
        this.$confirm('您填写的内容不会被保存, 是否退出?', '提醒', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go('-1')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '可以继续填写进件资料'
          });
        });

      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $inputWidth: 500px;

  .block {
    display: inline-block;
  }

  .input-width {
    width: $inputWidth;
  }

  .tips {
    display: inline-block;
    font-size: 13px;
    color: #8b8b8b;
    line-height: 14px;
  }


  .image-upload-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }

  .image-upload-item {
    margin: 4px 4px;
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

  .submit-btn-group {
    text-align: center;
  }


</style>
