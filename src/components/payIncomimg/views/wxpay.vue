<template>
  <div v-loading="loading">
    <p class="cus-title">当前是{{payChannelName}}进件</p>
    <el-form ref="addForm" :model="addForm" :label-width="labelWidth" size="small">
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>进件信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--基础信息-->
        <div class="info">
          <p>基础信息</p>
        </div>
        <el-form-item label="商户名称：" prop="name">
          <el-input v-model.trim="baseInfo.name"
                    :disabled="isModify"
                    placeholder="商户(公司)名称，与营业执照一致"
                    class="input-width">
          </el-input>
        </el-form-item>

        <el-form-item label="商户简称：" prop="shortName">
          <el-input v-model.trim="baseInfo.shortName"
                    :disabled="isModify"
                    placeholder="商户(公司)简称，支付时显示的名称"
                    class="input-width">
          </el-input>
        </el-form-item>


        <el-form-item label="联系人姓名：" prop="contact">
          <el-input v-model.trim="baseInfo.contact"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="联系人（负责人）真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="联系人电话：" prop="phone">
          <el-input v-model.trim="baseInfo.phone"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="联系人手机号（商户号使用该手机号注册）"></el-input>
        </el-form-item>


        <el-form-item label="客服电话：" prop="customerPhone">
          <el-input v-model.trim="baseInfo.customerPhone"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="客服手机或固定电话号码"></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-model.trim="baseInfo.email"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="商户电子邮箱"></el-input>
        </el-form-item>

        <el-form-item label="商户类型：" prop="businessLevOne">
          <el-select v-model="baseInfo.businessLevOne"
                     :disabled="isModify"
                     placeholder="请选择商户类型"
                     @change="getType1($event)">
            <el-option :value="n.name"
                       :key="index"
                       :label="n.name"
                       v-for="(n,index) in businessTypes">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经营行业：" prop="businessLevTwo">
          <el-select v-model="baseInfo.businessLevTwo"
                     :disabled="isModify"
                     placeholder="请选择一级经营行业"
                     @change="getType2($event)">
            <el-option :value="n.name"
                       :key="index"
                       :label="n.name"
                       v-for="(n,index) in businessTypes2">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="businessLevThree">
          <el-select v-model="baseInfo.businessLevThree"
                     :disabled="isModify"
                     placeholder="请选择二级经营行业"
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
            <el-select v-model="baseInfo.province"
                       :disabled="isModify"
                       placeholder="请选择省份"
                       @change="getProv($event)">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataProv[0]['prov']">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="block" prop="city">
            <el-select v-model="baseInfo.city"
                       :disabled="isModify"
                       placeholder="请选择城市"
                       @change="getCity($event)">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataCity">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="area" class="block">
            <el-select v-model="baseInfo.area"
                       :disabled="isModify"
                       placeholder="请选择区/县">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataCountry">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>


        <el-form-item prop="address">
          <el-input v-model.trim="baseInfo.address"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="详细地址（精确到门牌号）"></el-input>
        </el-form-item>


        <el-form-item label="法人姓名:">
          <el-input v-model.trim="baseInfo.legalName"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="法人真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="法人电话:">
          <el-input v-model.trim="baseInfo.legalPhone"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="法人手机号"></el-input>
        </el-form-item>

        <el-form-item label="法人身份证号:">
          <el-input v-model.trim="baseInfo.legalIdNum"
                    :disabled="isModify"
                    class="input-width"
                    placeholder="法人身份证号"></el-input>
        </el-form-item>

        <el-form-item label="法人身份证有效期:">
          <div class="block">
            <el-form-item class="block">
              <el-date-picker
                v-model="baseInfo.startLegalTime"
                :disabled="isModify"
                type="date"
                placeholder="开始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <span v-if="!LegalTimeMode">至</span>
            <el-form-item class="block" v-if="!LegalTimeMode">
              <el-date-picker
                v-model="baseInfo.endLegalTime"
                :disabled="isModify"
                type="date"
                placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-checkbox v-model="LegalTimeMode" :disabled="isModify">长期</el-checkbox>
        </el-form-item>

        <el-form-item label="营业执照号:">
          <el-input v-model.trim="baseInfo.license"
                    :disabled="isModify" class="input-width"
                    placeholder="营业执照号，如实填写"></el-input>
        </el-form-item>

        <el-form-item label="营业执照有效期:">
          <div class="block">
            <el-form-item class="block">
              <el-date-picker
                v-model="baseInfo.startLicenseTime"
                :disabled="isModify"
                type="date"
                placeholder="开始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <span v-if="!licenseTimeMode">至</span>
            <el-form-item class="block" v-if="!licenseTimeMode">
              <el-date-picker
                v-model="baseInfo.endLicenseTime"
                :disabled="isModify"
                type="date"
                placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-checkbox v-model="licenseTimeMode" :disabled="isModify">长期</el-checkbox>
        </el-form-item>

        <div class="info">
          <p>结算信息</p>
        </div>
        <!--表单-->
        <div>
          <el-form-item label="对公对私：">
            <el-radio v-model="addForm.intoType" :label="1">对公</el-radio>
            <el-radio v-model="addForm.intoType" :label="2">对私</el-radio>
          </el-form-item>

          <div divName="对公" v-if="addForm.intoType==1">

            <el-form-item label="开户名称：">
              <el-input v-model="addForm.pubOutletName"
                        placeholder="开户名称"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户城市：">
              <el-input v-model="addForm.pubOutletCity"
                        placeholder="开户银行城市"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行：">
              <el-input v-model="addForm.pubOutletBank"
                        placeholder="开户银行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行支行：">
              <el-input v-model="addForm.pubOutlet"
                        placeholder="开户银行支行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算银行账号：">
              <el-input v-model="addForm.pubBankAcct"
                        placeholder="银行账号"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算联行号：">
              <el-input v-model="addForm.pubUnionpayNum"
                        placeholder="结算联行号，参考附件或咨询您的开户行"
                        class="input-width"
                        style="display: inline-block">
              </el-input>
              <span class="tips"> 联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 下载</a></span>
            </el-form-item>

          </div>

          <div divName="对私" v-if="addForm.intoType==2">

            <el-form-item label="结算人姓名：">
              <el-input v-model="addForm.priName"
                        placeholder="结算人姓名（银行开户名称）"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算人手机号：">
              <el-input v-model="addForm.priPhone"
                        placeholder="结算人联系电话号码"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算人身份证号：">
              <el-input v-model="addForm.priIdNum"
                        placeholder="结算人身份证号"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算银行账号：">
              <el-input v-model="addForm.priBankCardNum"
                        placeholder="结算银行账号（卡号、存折号）"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行：">
              <el-input v-model="addForm.priBankName"
                        placeholder="开户银行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="开户银行支行：">
              <el-input v-model="addForm.priBankOutlet"
                        placeholder="开户银行支行"
                        class="input-width">
              </el-input>
            </el-form-item>

            <el-form-item label="结算联行号：">
              <el-input v-model="addForm.priUnionpayNum"
                        placeholder="结算联行号,参考附件或咨询您的开户行"

                        class="input-width">
              </el-input>
              <span class="tips"> 联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 下载</a></span>
            </el-form-item>

          </div>

        </div>
      </el-card>

      <!--费率-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>结算费率</span>
        </div>
        <!--表单-->
        <div>
          <div divName="动态表单">
            <el-form-item :label="payChannelName + item.name+'结算费率：'"
                          v-for="(item,index) in dymForm"
                          :key="index"
                          required>
              <el-input-number v-model="item.value" :min="0" :max="1" :precision="2" :step="0.01"
                               :placeholder="payChannelName + item.name+'结算费率 例如:0.3'"
                               class="input-width">
                <!--<template slot="append"></template>-->
              </el-input-number>
              %
              <!--帮助-->
              <template v-if="item.merchantDescription">
                <el-tooltip class="item" effect="light" :content="item.merchantDescription" placement="right">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <!--费率-->
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
        <div class="submit-btn-group" v-if="mode==='new'">

          <el-button type="" @click="goQuit">退出</el-button>

          <el-button type="primary" @click="dataCollation" v-loading="btnLoading" :disabled="btnLoading">保存并下一步
          </el-button>
        </div>


        <div class="submit-btn-group" v-if="mode==='add'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="dataCollation">提交资料
          </el-button>
        </div>

        <div class="submit-btn-group" v-if="mode==='modify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="dataCollation">保存修改
          </el-button>
        </div>

        <div class="submit-btn-group" v-if="mode==='verify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" v-loading="btnLoading" :disabled="btnLoading" @click="dataCollation">保存并审核通过
          </el-button>
          <el-button @click="submitRejest">驳回</el-button>
        </div>
      </el-card>


    </el-form>
    <p class="cus-title">当前是{{payChannelName}}进件</p>

  </div>
</template>

<script>
  import typeJson from '@/assets/merchantType/merchantType.json' //商户类型数据
  import cityJson from '@/assets/city/city.json' //地域数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  import {mixins} from "../../mixins/mixins";

  import {
    getPlantInfo,
    getWxInfo,
    updateMerchant,
    findPayType,
    modifyMerchant,
    findPayTypeByChannel,
    modifyMerchantJson
  } from '../api/wxpay'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'


  export default {
    name: "addMerchant",
    mixins: [mixins], //混入
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {
      return {
        loading: false,
        labelWidth: '370px',
        btnLoading: false,
        baseInfo: {
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
          startLegalTime: '',
          endLegalTime: '',

          license: '', //营业执照号
          startLicenseTime: '',
          endLicenseTime: '',
        },
        addForm: {
          id: '',
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

          merchantId: '',
          // companyId: '', //运营商或者渠道商id
          // managerId: '', //业务员id
          status: '1', //正常状态

        },
        LegalTimeMode: false, //法人身份证有效期模式 0非长期 1长期
        licenseTimeMode: false, //营业执照有效期模式 0非长期 1长期


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

        dymForm: [],


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


        //checkData
        isModify: true, //关闭

        //applyId
        applyId: '',

      }
    },
    mounted() {

      //经营选项赋值
      this.businessTypes = typeJson;

      //获取userId和companyId
      // this.addForm.companyId = sessionStorage.getItem('companyId') || null;
      // this.addForm.managerId = sessionStorage.getItem('userId') || null;


      //获取url中的id
      this.urlid = this.$route.query.id;//接收ID

      //获取进件资料回显
      this.getMerchantDetail(this.urlid);

      //获取费率表单
      this.getPayType()
    },
    methods: {

      /**
       * 获取资料
       */
      getMerchantDetail: function (id) {


        if (this.mode === 'new') {
          this.newAddMerchantInfo(id)
        } else if (this.mode === 'add') {
          if (this.status == 2 || this.status == 4) {
            this.modifyMerchantInfo(id)
          } else {
            this.newAddMerchantInfo(id)
          }
        } else if (this.mode === 'modify') {
          this.modifyMerchantInfo(id)
        } else if (this.mode === 'verify') {
          if (this.status == 2 || this.status == 4 || this.status == 3) {
            this.modifyMerchantInfo(id)
          } else {
            this.newAddMerchantInfo(id)
          }
        }

      },

      //新进件拉取平台资料
      newAddMerchantInfo: function (id) {
        getPlantInfo(id).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },
      //编辑拉取已进件资料
      modifyMerchantInfo: function (id) {
        getWxInfo(id, this.payChannel).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },
      //审核模式拉取资料
      verifyMerchantInfo: function (id) {
        getWxInfo(id, this.payChannel).then(res => {
          if (res.obj != null) {
            this.autoInputData(res.obj)
          }
        }).catch(e => {

        })
      },

      /**
       * 动态费率获取
       */
      getPayType: function () {

        if (this.mode === 'new') {
          //new & add
          let pw = this.payway;
          let pc = this.payChannel;
          findPayType(pw, pc).then(res => {
            let data = res.obj;
            this.dymForm = data;
            console.log(this.dymForm)
          }).catch(e => {

          })
        } else if (this.mode === 'add' || this.mode === 'modify' || this.mode === 'verify') {
          //申请开通并提交审核
          let pc = this.payChannel;
          let id = this.urlid;
          findPayTypeByChannel(pc, id).then(res => {
            let data = res.obj;
            console.log(data);

            this.applyId = data.applyId; //applyid赋值
            let feeArr = data.payComposeList;
            let tmp = [];
            for (let i in feeArr) {
              for (let j in feeArr[i].payComposeByTypeVOS) {
                feeArr[i].payComposeByTypeVOS[j].payWay = feeArr[i].payWay;
                feeArr[i].payComposeByTypeVOS[j].name = feeArr[i].name + feeArr[i].payComposeByTypeVOS[j].name;
                feeArr[i].payComposeByTypeVOS[j].value = feeArr[i].payComposeByTypeVOS[j].value || 0.00;
                tmp.push(feeArr[i].payComposeByTypeVOS[j])
              }
            }
            console.log(tmp);
            this.dymForm = tmp;
          }).catch(e => {
          })
        }


      },


      /**
       * 提交前数据整理
       */
      dataCollation: function () {
        let form;
        form = this.deepCopy(this.addForm);

        // //处理日期为长期的情况
        // if (this.LegalTimeMode) {
        //   form.endLegalTime = '2099-12-31'
        // }
        // if (this.licenseTimeMode) {
        //   form.endLicenseTime = '2099-12-31'
        // }


        //费率插入至主表单
        let check = false;
        for (let i in this.dymForm) {
          if (this.dymForm[i].value === '' || this.dymForm[i].value == null) {
            check = true
          }
        }
        if (check) {
          this.$message.error('还有费率未填写');
          return false
        }
        let id = this.urlid;
        form.merchantId = id; //附上id
        //判断打开方式，调用不同保存。
        if (this.mode === 'new') {
          this.submitAddData(form)
        } else if (this.mode === 'add') {
          this.submitUpdateData(form)
        } else if (this.mode === 'modify') {
          this.submitUpdateData(form)
        } else if (this.mode === 'verify') {
          this.submitUpdateData(form)
        }

      },
      /**
       * 提交新进件资料
       */
      submitAddData: function (form) {
        this.btnLoading = true;
        modifyMerchantJson(JSON.stringify(form), this.payChannel).then(res => {
          this.$message.success('保存进件资料成功');
          //根据来源不同，之后进行不同的操作
          this.branching() //new
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 提交修改进件资料
       */
      submitUpdateData: function (form) {
        if (form.status) {
          delete form.status //删除状态，不要改变这个
        }

        modifyMerchantJson(JSON.stringify(form), this.payChannel).then(res => {
          this.$message.success('保存进件资料成功');
          if (this.mode === 'verify') {
            this.verifyOK();
          } else {
            this.branching() //根据mode决定走向
          }
        }).catch(e => {
          this.btnLoading = false
        })

      },


      /**
       *父级不同操作
       */
      branching: function () {
        if (this.mode === 'new') {
          //第三方进件后直接下一步并保存当前的费率信息 dymForm
          this.$emit('next', this.dymForm);
        } else if (this.mode === 'add') {
          //提交记录
          this.submitRecord();
        } else if (this.mode === 'modify') {
          //跳回前一页（非进件）
          this.submitRecord();
          this.$emit('next');
        } else if (this.mode === 'verify') {
          if(this.status == 2){
            this.submitRecord();
          }
          this.$emit('next');
        }
        this.btnLoading = false
      },
      /**
       * 提交记录
       */
      submitRecord: function () {
        let form = this.dymForm;
        //费率汇集
        let tmpArr = [];
        for (let i in form) {
          let pw = form[i].payWay;
          let pc = this.payChannel;
          let pt = form[i].payType;
          let value = form[i].value;
          let obj = {};
          obj.payWay = pw;
          obj.payChannel = pc;
          obj.payType = pt;
          obj.value = value || 0;
          tmpArr.push(obj)
        }

        let data = tmpArr; //源数组
        if (tmpArr) {
          let tempArrToStr = [];
          for (let i in data) {
            let str = `${data[i].payChannel},${data[i].payWay},${data[i].payType},${data[i].value}`;
            tempArrToStr.push(str)
          }
          let feeStr = tempArrToStr.join(';'); //转字符串编组

          console.log(feeStr);

          //提交费率信息
          saveRrecord(this.urlid, feeStr, this.payChannel).then(res => {
            this.$emit('next');
          }).catch(e => {

          })
        }

      },


      /**
       * 审核费率汇集
       */
      verifyFeeColl: function () {
        let form = this.dymForm;
        //费率汇集
        let tmpArr = [];
        for (let i in form) {
          let pw = form[i].payWay;
          let pc = this.payChannel;
          let pt = form[i].payType;
          let value = form[i].value;
          let obj = {};

          obj.payWay = pw;
          obj.payChannel = pc;
          obj.payType = pt;
          obj.merchantFeeRate = (value / 100).toFixed(4) || 0;
          obj.officialFeeRate = 0;

          tmpArr.push(obj)
        }
        if (tmpArr) {
          return JSON.stringify(tmpArr)
        } else {
          return false
        }
      },


      /**
       * 审核通过
       */
      verifyOK: function () {

        this.$confirm('确认审核通过?', '提醒', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let mid = this.urlid;
          let pc = this.payChannel;
          let reason = '';
          let fee = this.verifyFeeColl();
          checkVerify(pc, mid, reason, fee, this.applyId).then(res => {
            this.$message.success('审核通过');
            this.branching() //返回
          }).catch(e => {
            this.$message.error(e.msg);
            this.btnLoading = false
          })

        }).catch(() => {
          this.btnLoading = false
        });

      },


      /**
       * 回显资料
       */
      autoInputData: function (row) {
        if (row.merchant) {
          let data = row.merchant
          this.baseInfo = data

          if (data.endLegalTime === '2099-12-31') {
            this.LegalTimeMode = true
          }

          if (data.endLicenseTime === '2099-12-31') {
            this.licenseTimeMode = true
          }
        }

        if (row.plantMchtInto) {
          let data = row.plantMchtInto

          this.addForm.merchantId = data.merchantId;
          this.addForm.id = data.id;
          this.addForm.intoType = data.intoType || '';

          if (data.intoType == 1) {
            this.addForm.pubOutletName = data.pubOutletName || '';
            this.addForm.pubOutletCity = data.pubOutletCity || '';
            this.addForm.pubOutletBank = data.pubOutletBank || '';
            this.addForm.pubOutlet = data.pubOutlet || '';
            this.addForm.pubBankAcct = data.pubBankAcct || '';
            this.addForm.pubUnionpayNum = data.pubUnionpayNum || ''
          } else if (data.intoType == 2) {
            this.addForm.priName = data.priName || '';
            this.addForm.priPhone = data.priPhone || '';
            this.addForm.priIdNum = data.priIdNum || '';
            this.addForm.priBankCardNum = data.priBankCardNum || '';
            this.addForm.priBankName = data.priBankName || '';
            this.addForm.priBankOutlet = data.priBankOutlet || '';
            this.addForm.priUnionpayNum = data.priUnionpayNum || ''
          }

          this.addForm.merchantHead = data.merchantHead || '';
          this.addForm.merchantCheck = data.merchantCheck || '';
          this.addForm.otherPhoto3 = data.otherPhoto3 || '';
          this.addForm.identityFace = data.identityFace || '';
          this.addForm.identityBack = data.identityBack || '';
          this.addForm.bussinessCard = data.bussinessCard || '';
          this.addForm.bussiness = data.bussiness || '';
          this.addForm.identityFaceCopy = data.identityFaceCopy || '';
          this.addForm.identityBackCopy = data.identityBackCopy || '';
          this.addForm.identityBody = data.identityBody || '';
          this.addForm.priAuth = data.priAuth || '';
          this.addForm.rentHouse = data.rentHouse || '';
          this.addForm.cardFace = data.cardFace || '';
          this.addForm.other1 = data.other1 || '';
          this.addForm.other2 = data.other2 || '';

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
          this.formImgUrl.cardFace = this.imgFil(data.cardFace);
          this.formImgUrl.priAuth = this.imgFil(data.priAuth);
          this.formImgUrl.rentHouse = this.imgFil(data.rentHouse);
          this.formImgUrl.cardFace = this.imgFil(data.cardFace);
          this.formImgUrl.other1 = this.imgFil(data.other1);
          this.formImgUrl.other2 = this.imgFil(data.other2)
        }
      },
      /**
       * 下载
       */
      downloadFile: function (type) {
        if (type == 'localCode') {
          window.location.href = './static/file/localCode.xlsx'
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
        //this.dialogForm.selectCity = this.dataCity[0]
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        //this.dialogForm.selectCountry = this.dataCountry[0]

        this.addForm.city = '';
        this.addForm.area = ''
      },
      //市
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        // this.dialogForm.selectCountry = this.dataCountry[0]
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
        if (isImageSize > 8192 * 1000) {
          this.$message.error('图片大小最大为8M');
          return false
        }
        return true
      },
      /**
       *获取图片  进件专用的方法
       */
      imgFil: function (val) {
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val === '' || val == null) {
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
        this.$confirm('您当前填写的内容不会被保存, 是否退出?', '提醒', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('next');
        }).catch(() => {
        });
      },

      /**
       *组件内提请驳回
       */
      submitRejest: function () {
        let applyid = this.applyId || ''
        this.$emit('rejest', applyid)
      }
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

  .cus-title {
    width: 100%;
    max-width: 100%;
    font-size: 18px;
    font-weight: lighter;
    color: #8b8b8b;
    text-align: center;
  }

  .info {
    padding: 0px 16px;
    border-left: 5px solid #6c6fbf;
    margin: 20px 0;
  }


</style>
