<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>聪明付进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单内容-->
        <div>

          <!--商户基本信息-->
          <!--<div class="info">-->
          <!--<p>商户信息</p>-->
          <!--</div>-->
          <!--<el-form-item label="合作商号：" prop="agent_id">-->
          <!--<el-input v-model="form.agent_id" class="standard-form" placeholder="请输入合作商号"></el-input>-->
          <!--</el-form-item>-->

          <!--经营联系信息-->
          <div class="info">
            <p>经营联系信息</p>
          </div>
          <el-form-item label="负责人：" prop="shop_keeper">
            <el-input v-model="form.shop_keeper" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="负责人身份证：" required>
            <el-input v-model="form.keeper_identity" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话：" prop="keeper_phone">
            <el-input v-model="form.keeper_phone" class="standard-form"></el-input>
            <span class="tips">接受固话与移动电话“0591-87000000”或“13000000000”</span>
          </el-form-item>
          <el-form-item label="客服电话：" prop="shop_phone">
            <el-input v-model="form.shop_phone" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model="form.email" class="standard-form"></el-input>
          </el-form-item>
          <!--经营基本信息-->
          <div class="info">
            <p>经营基本信息</p>
          </div>
          <el-form-item label="商户全称：" prop="shop_name">
            <el-input v-model="form.shop_name" placeholder="必须与营业执照一致" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户简称：" prop="shop_nickname">
            <el-input v-model="form.shop_nickname" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="商户类型" prop="business_type">
            <el-select v-model="form.business_type" placeholder="请选择商户类型" class="input-width">
              <el-option label="企业商户" value="1"></el-option>
              <el-option label="个体工商户" value="2"></el-option>
              <el-option label="个人商户" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商户经营范围：" prop="type">
            <el-select v-model="form.type" placeholder="一级经营范围"
                       @change="getType($event)">
              <el-option v-for="item in typeData"
                         :key="item.key"
                         :value="item.value" :label="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户二级经营范围：" prop="classify">
            <el-select v-model="form.classify" placeholder="二级经营范围">
              <el-option v-for="item in classifyData"
                         :key="item"
                         :value="item" :label="item"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!--营业执照-->
          <div class="info">
            <p>营业执照</p>
          </div>
          <el-form-item label="营业执照号：" prop="licence_no">
            <el-input v-model="form.licence_no" class="standard-form" placeholder="请输入营业执照号"></el-input>
          </el-form-item>
          <el-form-item label="营业执照有效期：">
            <el-form-item prop="licence_begin_date" class="block">
              <el-date-picker
                v-model="form.licence_begin_date"
                type="date"
                placeholder="选择营业执照起始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            至
            <el-form-item prop="licence_expire_date" class="block">
              <el-date-picker
                v-model="form.licence_expire_date"
                type="date"
                placeholder="选择营业执照结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <!--企业法人/经办人信息-->
          <div class="info">
            <p>企业法人/经办人信息</p>
          </div>
          <el-form-item label="法人姓名：" prop="artif_name">
            <el-input v-model="form.artif_name" class="standard-form" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法人手机号：" prop="artif_phone">
            <el-input v-model="form.artif_phone" class="standard-form" placeholder="请输入法人手机号"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号：" prop="artif_identity">
            <el-input v-model="form.artif_identity" class="standard-form" placeholder="请输入法人身份证号"></el-input>
          </el-form-item>

          <el-form-item label="法人/结算人身份证有效期：">
            <el-form-item prop="identity_start_time" class="block">
              <el-date-picker
                v-model="form.identity_start_time"
                type="date"
                placeholder="起始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            至
            <el-form-item prop="identity_expire_time" class="block">
              <el-date-picker
                v-model="form.identity_expire_time"
                type="date"
                placeholder="到期日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>


          <!--结算账户信息-->
          <div class="info">
            <p>渠道信息</p>
          </div>
          <el-form-item label="渠道：" prop="pay_type">
            <el-select v-model="form.pay_type" placeholder="渠道">
              <el-option value="xinhui" label="xinhui"></el-option>
            <!--  <el-option value="haike" label="haike"></el-option> -->
            </el-select>
          </el-form-item>


          <!--结算账户信息-->
          <div class="info">
            <p>结算账户信息</p>
          </div>
          <el-form-item label="结算人姓名：" prop="card_name">
            <el-input v-model="form.card_name" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算人手机号：" prop="card_phone">
            <el-input v-model="form.card_phone" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算人身份证号：" prop="identity">
            <el-input v-model="form.identity" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="结算人银行卡号：" prop="card">
            <el-input v-model="form.card" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算银行：" prop="bank_name">
            <el-input v-model="form.bank_name" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算开户行：" prop="bank_address">
            <el-input v-model="form.bank_address" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算联行号：" prop="bank_add_no">
            <el-input v-model="form.bank_add_no" class="standard-form"></el-input>
          </el-form-item>

          <div class="info">
            <p>手续费</p>
          </div>

          <el-form-item label="微信费率：">千分之
            <el-input-number v-model="form.rate_wx" required
                             controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                             label="微信费率">

            </el-input-number>
          </el-form-item>
          <el-form-item label="支付宝费率：">千分之
            <el-input-number v-model="form.rate_alipay" required
                             controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                             label="支付宝费率">

            </el-input-number>
          </el-form-item>

          <el-form-item label="额外手续费：" prop="extraFee">
            <el-input-number v-model="form.extraFee" :min="0" :max="1000" :step="2" :precision="2"
                             class="standard-form"></el-input-number>
            <span class="tips">（元）无额外手续费请填 0 </span>
          </el-form-item>


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
      <!--图片-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>聪明付图片进件资料</span>
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
        <!--表结束-->
        <div class="btn-group" v-if="mode==='new'">

          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" @click="dataCollation" :loading="btnLoading">保存并下一步
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='modify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollation">保存修改
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='add'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollation">提交资料
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='verify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button @click="submitRejest">驳回</el-button>
          <el-button type="primary" @click="dataCollation" :loading="btnLoading">聪明付审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="fileSubmit">提交经营与结算资料
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="imgFileSubmit">提交图片资料
          </el-button>
        </div>
        <!--表结束-->
      </el-card>
    </el-form>
    <p class="cus-title">{{payChannelName}}进件</p>
  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import typeJson from '@/assets/businessClass/business.json'
  import {returnThumbnailUrl, uploadUrl, hsfuploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {url} from '@/utils/request'
  import {
    getHsfPlatInfo,
    getHsfInfo,
    hsfUpdate,
    findPayType,
    modifyMerchant,
    findPayTypeByChannel,
    hsfRegister,
    hsfImageRegister
  } from '../api/cmf'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'

  export default {
    name: "hk",
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {
      var checkShop_phon = (rule, value, callback) => {
        let reg = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('手机或电话号码格式错误'))
        } else {
          callback()
        }

      };
      var checkIdNum = (rule, value, callback) => {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('身份证号格式错误'))
        } else {
          callback()
        }

      };
      var rate = (rule, value, callback) => {
        let reg = /^-?\d+(\.\d{1,4})?$/;
        if (value > 1) {
          callback(new Error('费率错误'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('费率错误'))
          } else {
            callback()
          }
        }


      };
      return {
        loading: false,
        btnLoading: false,
        labelWidth: '370px',
        inputSize: 'medium',
        urlid: '',
        form: {
          id: '',
          shop_keeper: '', //负责人
          shop_phone: '',//客服电话
          keeper_identity: '',//客服电话
          shop_name: '', //商户名
          keeper_phone: '',//负责人电话
          email: '',//电子邮箱
          shop_nickname: '',//简称
          licence_no: '',//营业执照号
          licence_begin_date: '',//营业执照起始
          licence_expire_date: '',//营业执照结束

          business_type: '', //商户类型

          artif_name: '', //法人姓名
          artif_phone: '', //法人手机号
          artif_identity: '', //法人身份证

          identity: '', //结算人身份证
          card_phone: '', //结算人手机号
          card_name: '', //结算人
          card: '', //结算人卡号
          bank_name: '', //银行
          bank_address: '', //结算开户行
          bank_add_no: '', //结算开户行行号


          type: '',//一级经营范围
          classify: '',//二级经营范围

          //payType
          pay_type: "",

          //额外收费
          extraFee: 0.0,
          rate_alipay: '',
          rate_wx: '',

          merchantHead: '', //门头照
          merchantCheck: '', //收银台照
          otherPhoto3: '', //经营场所照
          identityFace: '', //法人身份证正面照(面部)
          identityBack: '', //法人身份证反面照(国徽)
          bussinessCard: '', //开户许可证照
          bussiness: '', //营业执照照片
          identityFaceCopy: '', //结算人身份证正面照
          identityBackCopy: '', //结算人身份证反面照

          identity_start_time: '', //结算人身份证开始
          identity_expire_time: '', //结束

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
        //城市
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        //经营范围
        typeData: typeJson,
        classifyData: '',
        classifyIndex: '',


        dymForm: [],


        rules: {
          shop_phone: [
            {required: true, message: '请输入客服电话', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          order_id: [
            {required: true, message: '请输入订单编号', trigger: 'blur'},
            {min: 1, max: 32, message: '订单编号格式错误', trigger: 'blur'},
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'},
          ],
          area: [
            {required: true, message: '请选择区/县', trigger: 'change'},
          ],
          business_type: [
            {required: true, message: '请选择商户类型', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择商户经营范围', trigger: 'change'},
          ],
          pay_type: [
            {required: true, message: '请选择渠道', trigger: 'change'},
          ],
          classify: [
            {required: true, message: '请选择商户二级经营范围', trigger: 'change'},
          ],
          artif_phone: [
            {required: true, message: '请填写法人手机号', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          card_phone: [
            {required: true, message: '请填写结算人手机号', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          identity: [
            {required: true, message: '请填写结算人身份证号', trigger: 'blur'},
            {validator: checkIdNum, trigger: 'blur'}
          ],
          rate_wx: [
            {required: true, message: '请填写微信费率', trigger: 'blur'},
            {validator: rate, trigger: 'blur'}
          ],
          rate_alipay: [
            {required: true, message: '请填写支付宝费率', trigger: 'blur'},
            {validator: rate, trigger: 'blur'}
          ],
          extraFee: [
            {required: true, message: '请填写额外费率，不需要请填0', trigger: ['blur', 'change']},
          ]
        },//校验

        //applyId
        applyId: '',


      }
    },
    filters: {},
    mounted() {
      this.urlid = this.$route.query.id;  //接收ID


      //获取进件资料
      this.getMerchantDetail(this.urlid);

      //获取费率表单
      this.getPayType()


    },
    methods: {

      /**
       * 动态费率获取
       */
      getPayType: function () {

        if (this.mode === 'new') {
          //new
          let pw = this.payway;
          let pc = this.payChannel;
          findPayType(pw, pc).then(res => {
            let data = res.obj;
            this.dymForm = data;
            console.log(this.dymForm)
          }).catch(e => {

          })
        } else if (this.mode === 'add' || this.mode === 'verify' || this.mode === 'modify') {
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
       * 获取进件资料回显
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
        //新进件模式
        getHsfInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data);
        }).catch(e => {

        })
      },
      //编辑拉取已进件资料
      modifyMerchantInfo: function (id) {
        // 编辑模式
        getHsfInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data);
        }).catch(e => {

        })
      },
      //审核模式拉取资料
      verifyMerchantInfo: function (id) {
        // 编辑模式和审核模式
        getHsfInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data)
        }).catch(e => {

        })
      },

      /**
       * 数据赋值
       */
      dataAutoInput: function (row) {

        if (row.thirdInfoInit) {
          this.dataInputMER(row);
          this.dataInputPMI(row);
        } else {
          this.dataInputPMI(row);
          this.dataInputMER(row);
        }

      },


      /**
       * 回填pmi
       */
      dataInputPMI: function (row) {
        let data = row.plantMchtInto;

        if (row.thirdInfoInit) {
          this.form.id = data.id || '';
          //已经第三方进件 结算赋值
          this.form.card = data.card || '';
          this.form.bank_name = data.bank_name || '';
          this.form.bank_address = data.bank_address || '';
          this.form.bank_add_no = data.bank_add_no || '';
          this.form.card_name = data.card_name || '';
          this.form.card_phone = data.card_phone || '';
          this.form.identity = data.identity || '';

        } else {
          // delete this.form.id;
          //还未第三方进件 结算赋值
          this.form.card = data.priBankCardNum || '';
          this.form.bank_name = data.priBankName || '';
          this.form.bank_address = data.priBankOutlet || '';
          this.form.bank_add_no = data.priUnionpayNum || '';
          this.form.card_name = data.priName || '';
          this.form.card_phone = data.priPhone || '';
          this.form.identity = data.priIdNum || '';

        }

        this.form.extraFee = data.extraFee || 0.0; //额外手续费
        this.form.rate_wx = data.rate_wx || 0.0; //额外手续费
        this.form.rate_alipay = data.rate_alipay || 0.0; //额外手续费

        this.form.business_type = data.business_type || '';
        this.form.shop_name = data.shop_name || '';
        this.form.shop_phone = data.shop_phone || '';
        this.form.type = data.type || '';
        if (data.type) {
          this.getType(data.type)
        }
        this.form.classify = data.classify || '';


        this.form.pay_type = data.pay_type || 'xinhui'; //渠道 lb


        //商户与经营信息
        this.form.shop_keeper = data.shop_keeper || '';
        this.form.keeper_identity = data.keeper_identity || '';
        this.form.keeper_phone = data.keeper_phone || '';
        this.form.email = data.email || '';
        this.form.shop_address = data.shop_address || '';
        this.form.shop_nickname = data.shop_nickname || '';
        this.form.licence_no = data.licence_no || '';
        this.form.licence_begin_date = data.licence_begin_date || '';
        this.form.licence_expire_date = data.licence_expire_date || '';
        this.form.artif_name = data.artif_name || '';
        this.form.artif_identity = data.artif_identity || '';
        this.form.identity_start_time = data.identity_start_time || '';
        this.form.identity_expire_time = data.identity_expire_time || '';


        this.form.artif_phone = data.artif_phone || '';


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

      /**
       * 回填mer
       */
      dataInputMER: function (row) {
        let data = row.merchant;
        this.form.shop_keeper = data.contact;
        this.form.keeper_phone = data.customerPhone;
        this.form.email = data.email;
        this.form.shop_phone = data.customerPhone;
        this.form.shop_name = data.name;
        this.form.shop_nickname = data.shortName;

        this.form.licence_no = data.license;
        this.form.licence_begin_date = data.startLicenseTime;
        this.form.licence_expire_date = data.endLicenseTime;

        this.form.artif_name = data.legalName;
        this.form.artif_phone = data.legalPhone;
        this.form.artif_identity = data.legalIdNum;
        this.form.identity_start_time = data.startLegalTime;
        this.form.identity_expire_time = data.endLegalTime
      },


      /**
       * 尝试提示表单
       */
      dataCollation: function () {
        this.btnLoading = true;

        let id = this.urlid;
        this.form.merchantId = id; //附上id

        //费率插入至主表单
        let check = false;
        for (let i in this.dymForm) {
          if (this.dymForm[i].value === '' || this.dymForm[i].value == null) {
            check = true
          }
        }
        if (check) {
          this.$message.error('还有费率未填写');
          this.btnLoading = false;
          return false
        }


        //判断打开方式，调用不同保存。
        if (this.mode === 'new') {
          this.submitAddData()
        } else if (this.mode === 'add') {
          this.submitUpdateData()
        } else if (this.mode === 'modify') {
          this.submitUpdateData()
        } else if (this.mode === 'verify') {
          this.submitUpdateData()
        }

        //
        // this.$refs['form'].validate((valid) => {
        //   if (valid) {
        //     //提交
        //
        //
        //   } else {
        //
        //     this.$message.error('有表单还未填写');
        //     this.btnLoading = false;
        //     return false;
        //   }
        // });
      },

      /**
       * 提交新进件
       */
      submitAddData: function () {
        modifyMerchant(JSON.stringify(this.form), this.payChannel).then(res => {
          this.$message.success('保存进件资料成功');
          this.branching() //根据mode决定走向
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 修改商户进件
       */
      submitUpdateData: function () {
        modifyMerchant(JSON.stringify(this.form), this.payChannel).then(res => {
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
          this.submitRecord();
        } else if (this.mode === 'modify') {
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
            let str = `${data[i].payWay},${data[i].payType},${data[i].value}`;
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
        let applyid = this.applyId || '';
        this.$emit('rejest', applyid)
      },

      /**
       * 审核通过
       */
      verifyOK: function () {
        let that = this;
        this.$confirm('确认审核通过?', '提醒', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('check');
          let mid = this.urlid;
          let pc = this.payChannel;
          let reason = '';
          let fee = this.verifyFeeColl();
          checkVerify(pc, mid, reason, fee, this.applyId).then(res => {
            that.$message.success('审核通过');
            that.branching() //返回
          }).catch(e => {
            that.$message.error(e.msg);
            that.btnLoading = false
          })

        }).catch(() => {
          this.btnLoading = false
        });

      },

      /**
       * 经营范围
       */
      getType(data) {
        if (data === '' || data == null) {
          return
        }
        console.log(data);
        let json = this.typeData;
        for (let i in json) {
          if (json[i].value === data) {
            this.classifyData = json[i].children;
            break
          }
        }
        //清空
        this.form.classify = ''
      },

      /**
       * 省市区选择器
       */
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        //this.dialogForm.selectCity = this.dataCity[0]
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        //this.dialogForm.selectCountry = this.dataCountry[0]
        this.form.city = '';
        this.form.area = ''
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        // this.dialogForm.selectCountry = this.dataCountry[0]
        this.form.area = ''
      },


      /**
       * 图片
       */

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
        let isImageSize = file.size;
        console.log('图片大小:' + isImageSize);
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        if (isImageSize > 2048 * 1000) {
          this.$message.error('图片大小最大为2M');
          return false
        }
        return true
      },

      /**
       * 进件资料提交
       */
      fileSubmit: function (data) {
        let id = this.urlid; //获取本商户id
        this.btnLoading = true;
        hsfRegister(id).then(res => {
          this.$message.success('资料提交第三方成功');

          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 进件图片资料
       */
      imgFileSubmit: function (data) {

        this.$notify({
          title: '提示',
          type: 'warning',
          message: '提交图片资料可能需要1分钟，请耐心等待。'
        });


        let id = this.urlid; //获取本商户id
        this.btnLoading = true;
        hsfImageRegister(id).then(res => {
          this.$message.success('图片进件资料提交第三方成功');

          setTimeout(() => {
            this.btnLoading = false
          }, 1000)

        }).catch(e => {
          this.btnLoading = false
        })

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

  }

  .info {
    padding: 0px 16px;
    border-left: 5px solid #6c6fbf;
    margin: 20px 0;
  }

  .standard-form {
    width: 217px;
  }

  .btn-group {
    width: 100%;
    text-align: center;
  }

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

  .cus-title {
    width: 100%;
    max-width: 100%;
    font-size: 18px;
    font-weight: lighter;
    color: #8b8b8b;
    text-align: center;
  }
</style>
