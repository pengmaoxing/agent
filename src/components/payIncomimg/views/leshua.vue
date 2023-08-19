<template>
  <div v-loading="loading">
    <p class="cus-title">当前是{{payChannelName}}进件</p>
    <el-form ref="addForm" :model="addForm" :rules="addRules" :label-width="labelWidth" size="small">
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>{{payChannelName}}进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单-->
        <div divName="乐刷">

          <div class="info">
            <p>商户基本信息</p>
          </div>

          <el-form-item label="商户类型：" prop="merchantType">
            <!--乐刷自动识别商户类型，仅接受以下规则：<br/>-->
            <!--企业类型：有填写 <strong>营业执照注册号</strong> 并选择 <strong>对公结算</strong>；<br/>-->
            <!--个体类型：有填写 <strong>营业执照注册号</strong> 并选择 <strong>对私结算</strong>；<br/>-->
            <!--个人类型：未填写 <strong>营业执照注册号</strong> 并选择 <strong>对私结算</strong>。-->
            <el-radio-group v-model="addForm.merchantType">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">个体</el-radio>
              <el-radio :label="3">企业</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商户全称：" prop="merchantName">
            <el-input class="input-width" v-model.trim="addForm.merchantName"></el-input>
            <span class="tips">格式：商户全称。不允许使用特殊字符（!@*%_=+等）</span>
          </el-form-item>


          <el-form-item label="商户简称：" prop="merchantShortName">
            <el-input class="input-width" v-model.trim="addForm.merchantShortName"></el-input>
            <span class="tips">格式：地区+门头照名称。不允许使用特殊字符（!@*%_=+等）</span>
          </el-form-item>

          <el-form-item label="客服电话：" prop="servicePhone">
            <el-input v-model.trim="addForm.servicePhone" class="input-width"></el-input>
            <span class="tips">固定电话请加区号，禁止填入"-"、"~"及空格等非数字字符，不支持分机号</span>
          </el-form-item>

          <el-form-item label="MCC码：" prop="mccCode">
            <el-input class="input-width"
                      v-model.trim="addForm.mccCode"
                      placeholder="4位MCC码商户行业编号(银联标准)"></el-input>
            <span class="tips">MCC码(4位数字)需向银联查询，<a style="color: #1e6abc" @click="downloadFile('mcc')">前往查询</a></span>
          </el-form-item>

          <div class="info">
            <p>商户法人信息</p>
          </div>

          <el-form-item label="法人姓名：" prop="legalName">
            <el-input class="input-width"
                      v-model.trim="addForm.legalName"
                      placeholder="填写法人真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="法人手机号：" prop="mobile">
            <el-input class="input-width"
                      v-model.trim="addForm.mobile"
                      placeholder="法人实际在用手机号（11位）"></el-input>
            <span class="tips">仅接受11位手机号码，例如：13066668888</span>
          </el-form-item>

          <el-form-item label="证件类型：" prop="credentialType">
            <el-radio-group v-model="addForm.credentialType">
              <el-radio :label="1">身份证</el-radio>
              <el-radio :label="2">港澳台通行证</el-radio>
              <el-radio :label="3">台湾身份证</el-radio>
              <el-radio :label="4">香港身份证</el-radio>
              <el-radio :label="5">澳门身份证</el-radio>
              <el-radio :label="9">其它法定文件</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="证件号码：" prop="idCardNo">
            <el-input class="input-width"
                      v-model.trim="addForm.idCardNo"
                      placeholder="完整证件号码"></el-input>
          </el-form-item>


          <el-form-item label="证件有效期：" required>
            <el-form-item prop="idCardStart" class="block">
              <el-date-picker
                type="date"
                v-model="addForm.idCardStart"
                placeholder="选择开始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <span class="block">至</span>
            <el-form-item prop="idCardEnd" class="block"
                          v-if="!idCardExpMode">
              <el-date-picker
                type="date"
                v-model="addForm.idCardEnd"
                placeholder="选择结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-checkbox v-model="idCardExpMode">长期</el-checkbox>
          </el-form-item>

          <!--<div class="info">-->
          <!--<p>联系人信息</p>-->
          <!--</div>-->

          <!--<el-form-item label="联系人姓名：" prop="name">-->
          <!--<el-input class="input-width"-->
          <!--v-model.trim="addForm.name"-->
          <!--placeholder="联系人真实姓名"></el-input>-->
          <!--</el-form-item>-->


          <div class="info">
            <p>店铺地址信息</p>
          </div>

          <el-form-item label="省、市、区/县：" required="">
            <el-form-item class="block" prop="province">
              <el-select placeholder="请选择省份"
                         clearable
                         v-model="addForm.province"
                         @change="getCityArea($event,1,true)">
                <el-option v-for="item in provData"
                           :value="item.areaCode"
                           :key="item.areaCode"
                           :label="item.areaName">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item class="block" prop="city">
              <el-select placeholder="请选择城市"
                         v-model="addForm.city"
                         @change="getCityArea($event,2,true)">
                <el-option v-for="item in cityData"
                           :value="item.areaCode"
                           :key="item.areaCode"
                           :label="item.areaName">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="block" prop="area">
              <el-select placeholder="请选择区/县"
                         v-model="addForm.area">
                <el-option v-for="item in areaData"
                           :value="item.areaCode"
                           :key="item.areaCode"
                           :label="item.areaName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>

          <el-form-item prop="address" label="详细地址：">
            <el-input class="input-width"
                      v-model.trim="addForm.address"
                      placeholder="商户详细地址"></el-input>
          </el-form-item>

          <div class="info">
            <p>营业资质信息</p>
          </div>

          <el-form-item label="营业执照注册号：" prop="license">
            <el-input class="input-width"
                      v-model.trim="addForm.license"
                      placeholder="营业执照注册号"></el-input>
            <span class="tips" style="color: red">
              <el-tooltip class="item" effect="dark"
                          :content="`按照商户类型选择是否填写营业执照注册号。`"
                          placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </el-form-item>

          <el-form-item label="名称：" prop="licenseFullName">
            <el-input class="input-width"
                      v-model.trim="addForm.licenseFullName"
                      placeholder="请仔细阅读规范后再填写！"></el-input>
            <span class="tips">
              <el-tooltip class="item" effect="dark"
                          :content="`企业类填写：营业执照名称，执照如无名称，可填“个体户XXX”（执照上姓名）；小微商户填“商户_XXX”（身份证姓名）`"
                          placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </el-form-item>

          <el-form-item label="营业执照注册地址：" prop="licenseAddress">
            <el-input class="input-width"
                      v-model.trim="addForm.licenseAddress"
                      placeholder="完整填写营业执照注册地址"></el-input>
          </el-form-item>


          <el-form-item label="营业执照有效期：" required>
            <el-form-item prop="licenseStart" class="block">
              <el-date-picker
                type="date"
                :clearable="false"
                v-model="addForm.licenseStart"
                placeholder="选择开始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <span class="block">至</span>
            <el-form-item prop="licenseEnd" class="block"
                          v-if="!licenseExpMode">
              <el-date-picker
                v-model="addForm.licenseEnd"
                type="date"
                :clearable="false"
                placeholder="选择结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-checkbox v-model="licenseExpMode">长期</el-checkbox>
          </el-form-item>


          <div class="info">
            <p>结算信息</p>
          </div>

          <el-form-item label="结算人类型：" prop="legalFlag">
            <el-radio-group v-model="addForm.legalFlag">
              <el-radio :label="0">非法人</el-radio>
              <el-radio :label="1">法人</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算账户类型：" prop="type">
            <el-radio-group v-model="addForm.type">
              <el-radio :label="1">对私结算</el-radio>
              <el-radio :label="2">对公结算</el-radio>
            </el-radio-group>
            <span class="tips" style="color: red">
              <el-tooltip class="item" effect="dark"
                          :content="`请仔细阅读 商户类型 提示后再选择结算账户类型。`"
                          placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </el-form-item>

          <el-form-item label="开户行网点：" prop="branch">
            <el-autocomplete
              class="input-width"
              v-model.trim="addForm.branch"
              value-key="fullBankName"
              :fetch-suggestions="bankSearch"
              :highlight-first-item="true"
              placeholder="开户行网点名称，支持模糊查询，请输入尽可能准确的网点名"
              :trigger-on-focus="false"
              @input="getCode($event)"
            ></el-autocomplete>
            <span class="tips">网点非必填，联行号必填</span>
          </el-form-item>

          <el-form-item label="开户支行联行号：" prop="unionpay">
            <el-input class="input-width"
                      v-model.trim="addForm.unionpay"
                      placeholder="开户行网点名称（企业必填）"></el-input>
            <span class="tips"> 企业必填，行号参考<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 前往查询</a></span>
          </el-form-item>

          <el-form-item label="开户名：" prop="holder">
            <el-input class="input-width"
                      v-model.trim="addForm.holder"
                      placeholder="填写结算账户的开户名"></el-input>
            <span class="tips">
               <el-tooltip class="item" effect="dark"
                           :content="`法人结算：与法人姓名姓名一致；企业账户：与营业执照注册名称一致`"
                           placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </el-form-item>

          <el-form-item label="结算人身份证号：" prop="idCardNo2">
            <el-input class="input-width"
                      v-model.trim="addForm.idCardNo2"
                      placeholder="填写结算账户持有人的身份证号（个人必填）"></el-input>
            <span class="tips">个人账户必填</span>
          </el-form-item>

          <el-form-item label="银行预留号码：" prop="mobile2">
            <el-input class="input-width"
                      v-model.trim="addForm.mobile2"
                      placeholder="结算账户在银行预留的联系号码"></el-input>
          </el-form-item>

          <el-form-item label="银行卡号：" prop="bankCardNo">
            <el-input class="input-width"
                      v-model.trim="addForm.bankCardNo"
                      placeholder="银行卡号"></el-input>
          </el-form-item>

          <div class="info">
            <p>门店信息</p>
          </div>

          <el-form-item label="店铺类型：" prop="shopType">
            <el-radio-group v-model="addForm.shopType">
              <el-radio :label="1">总店</el-radio>
              <el-radio :label="0">分店</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="总店商户号：" prop="headMerchantId" v-if="addForm.shopType==0">
            <el-input class="input-width"
                      v-model.trim="addForm.headMerchantId"
                      placeholder="总店商户号"></el-input>
            <span class="tips">分店必填</span>
          </el-form-item>


          <el-form-item label="结算对象：" prop="settleTo" v-if="addForm.shopType==0">
            <el-radio-group v-model="addForm.settleTo">
              <el-radio :label="0">结算给当前商户</el-radio>
              <el-radio :label="1">结算给总店</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--<div class="info">-->
          <!--<p>微信信息（选填）</p>-->
          <!--</div>-->


          <!--<el-form-item label="联系人微信号：" prop="userWx">-->
          <!--<el-input class="input-width"-->
          <!--v-model.trim="addForm.userWx"-->
          <!--placeholder="联系人微信号"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="微信公众号支付appid：" prop="subAppid">-->
          <!--<el-input class="input-width"-->
          <!--v-model.trim="addForm.subAppid"-->
          <!--placeholder="微信公众号支付appid"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="支付后推荐关注appid：" prop="subscribeAppid">-->
          <!--<el-input class="input-width"-->
          <!--v-model.trim="addForm.subscribeAppid"-->
          <!--placeholder="微信公众号授权目录"></el-input>-->
          <!--<span class="tips">对应上方支付appid</span>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="微信公众号授权目录：" prop="jsapiPath">-->
          <!--<el-input class="input-width"-->
          <!--v-model.trim="jsapiPath"-->
          <!--placeholder="微信公众号授权目录"></el-input>-->
          <!--<span class="tips">最多5个，使用半角英文 ; 隔开(请按要求填写)</span>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="上报微信商户类目类型：" prop="">-->
          <!--<el-radio-group>-->
          <!--<el-radio :label="0">个体类</el-radio>-->
          <!--<el-radio :label="1">企业类</el-radio>-->
          <!--</el-radio-group>-->

          <!--<span class="tips">-->
          <!--<el-tooltip class="item" effect="dark"-->
          <!--:content="`个体类需个人微信认证；企业类需要对公打款认证`"-->
          <!--placement="top-start">-->
          <!--<i class="el-icon-question"></i>-->
          <!--</el-tooltip>-->
          <!--</span>-->
          <!--</el-form-item>-->


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
              <el-input-number v-model.trim="item.value" :min="0" :max="1" :precision="2" :step="0.01"
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
                  <span>经营场所内部照</span>
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
                  <span>法人证件正面</span>
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
                  <span>法人证件反面</span>
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

            <!--非法人身份证正面-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item"
                     v-if="addForm.legalFlag==0">
              <div>
                <div class="card-header-title">
                  <span>非法人身份证正面</span>
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

            <!--非法人身份证背面-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item"
                     v-if="addForm.legalFlag==0">
              <div>
                <div class="card-header-title">
                  <span>非法人身份证背面</span>
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


            <!--非法人对私授权函-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item"
                     v-if="addForm.legalFlag==0">
              <div>
                <div class="card-header-title">
                  <span>非法人结算授权函</span>
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


            <!--银行卡照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item" v-if="addForm.type==1">
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

            <!--开户许可证照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item" v-if="addForm.type==2">
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

            <!--&lt;!&ndash;商户协议照&ndash;&gt;-->
            <!--<el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">-->
            <!--<div>-->
            <!--<div class="card-header-title">-->
            <!--<span>商户协议照</span>-->
            <!--<span v-if="formImgUrl.protocolPagePic!=''">&nbsp</span>-->
            <!--<span v-if="formImgUrl.protocolPagePic!=''"-->
            <!--:class="{'up-success':formImgUrl.protocolPagePic!=''}">成功-->
            <!--</span>-->
            <!--</div>-->
            <!--<el-upload-->
            <!--class="logo-uploader"-->
            <!--:action="url"-->
            <!--accept="image/png,image/jpg,image/jpeg"-->
            <!--:data="filesData"-->
            <!--name="file"-->
            <!--:show-file-list="false"-->
            <!--:on-success="protocolPagePicUpload"-->
            <!--:on-error="handleImageFailed"-->
            <!--:before-upload="beforeLogoUpload"-->
            <!--:headers="headers">-->
            <!--<img v-if="formImgUrl.protocolPagePic" :src="formImgUrl.protocolPagePic" class="logo">-->
            <!--<i v-else class="el-icon-plus logo-uploader-icon"></i>-->
            <!--</el-upload>-->
            <!--</div>-->
            <!--</el-card>-->


            <!--*************-->
          </div>
        </div>

        <!--表结束-->
        <div class="submit-btn-group" v-if="mode==='new'">

          <el-button type="" @click="goQuit">退出</el-button>

          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">保存并下一步
          </el-button>
        </div>


        <div class="submit-btn-group" v-if="mode==='add'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">提交资料
          </el-button>
        </div>

        <div class="submit-btn-group" v-if="mode==='modify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">保存修改
          </el-button>
        </div>

        <div class="submit-btn-group" v-if="mode==='verify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button @click="submitRejest">驳回</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="uploadThirdImage">提交图片资料至乐刷
          </el-button>
          <el-button type="primary" v-show="infoSendSwitch" :loading="btnLoading"
                     @click="uploadThirdInfo">提交文字资料至乐刷
          </el-button>
          <el-button type="" :disabled="verifyClsoe" @click="findLsStatus">查询进件结果
          </el-button>

        </div>
      </el-card>


    </el-form>
    <p class="cus-title">当前是{{payChannelName}}进件</p>

  </div>
</template>

<script>
  import typeJson from '@/assets/merchantType/merchantType.json' //商户类型数据
  import cityJson from '@/assets/city/city.json' //地域数据
  import localCode from '@/assets/city/localCode.json' //地域代码数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  import {mixins} from "../../mixins/mixins";

  import {
    getPlantInfo,
    findPayType,
    findPayTypeByChannel,
    modifyMerchantJson,
    uploadThirdImage,
    uploadThirdInfo,
    findLsStatus,
    getBankName,
    getProvince,
    getCityArea
  } from '../api/leshua'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'


  export default {
    name: "addMerchant",
    mixins: [mixins],
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {

      var chinese_rule = (rule, value, callback) => {
        //支持括号
        // let reg =  /^[\u4e00-\u9fa5_a-zA-Z0-9]|[(]|[)]+$/;
        //没有任何特殊字符
        let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!reg.test(value)) {
          callback(new Error('禁止输入特殊符号'))
        } else {
          callback()
        }
      };

      var phone_rule = (rule, value, callback) => {
        let reg = /^((0\d{2,3}\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('号码格式错误'))
        } else {
          callback()
        }
      };

      var idNum_rule = (rule, value, callback) => {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('身份证号码格式错误'))
        } else {
          callback()
        }
      };
      var mcc_rule = (rule, value, callback) => {
        let reg = /^\d{4}$/;
        if (!reg.test(value)) {
          callback(new Error('MCC只限4位数字'))
        } else {
          callback()
        }
      };
      return {
        loading: false,
        labelWidth: '370px',
        btnLoading: false,
        addForm: {
          id: '',
          //乐刷基本数据
          merchantType: 1, // 商户类型 1个人 3企业
          merchantName: '', //商户全称
          merchantShortName: '', //商户简称
          servicePhone: '', //客服电话
          mccCode: '', //MCC码商户行业编号

          legalName: '',//法人姓名
          credentialType: 1,//证件类型：1-身份证；2-港澳台通行证；3-台湾身份证；4-香港身份证；5-澳门身份证；9-其它法定文件(不传默认身份证)
          idCardNo: '', //证件号
          idCardStart: '2019-01-01',//证件有效期开始日期
          idCardEnd: '2019-01-01',//证件有效期结束格式 永久有效:2099-12-30

          // name: '', //联系人姓名
          mobile: '',//手机号码


          province: '', //省
          city: '', //市
          area: '', //区
          address: '', //详细地址

          license: '', //营业执照注册号
          licenseFullName: '', //经营商户名称
          licenseAddress: '', //经营地址
          licenseStart: '2019-01-01', //开始
          licenseEnd: '2019-01-01',//结束


          legalFlag: 0,//结算人
          type: 0,//账户
          branch: '',//开户网点
          unionpay: '',//开户支行联行号
          holder: '',//开户名
          idCardNo2: '', //证件号2
          mobile2: '',//手机号码2
          bankCardNo: '',//银行卡号

          shopType: 1, //分店类型 1总 0分
          headMerchantId: '', //总店商户号
          settleTo: 0, //结算对象，分店必传；默认结算给当前商户，0表示结算给当前商户，1表示结算给总店

          // userWx: '', //微信
          // subAppid: '', //微信公众号支付appid
          // subscribeAppid: '', //微信公众号支付完成后推荐关注
          // jsapiPath: '',//授权目录


          //乐刷基本数据
          merchantHead: '', //门头照
          otherPhoto3: '', //经营场所内设照片
          merchantCheck: '', //收银台照片
          cardFace: '',
          bussinessCard: '', //银行卡正面（如是对公账户，开户许可证）
          priAuth: '', //非法人结算授权书(非法人结算模式必传)
          identityFaceCopy: '', //非法人身份证正面(非法人结算模式必传)
          identityBackCopy: '', //非法人身份证背面(非法人结算模式必传)
          bussiness: '', //营业执照照片
          identityFace: '', //法人身份证正面
          identityBack: '', //法人身份证反面
          identityBody: '', //手持身份证照

        },
        idCardExpMode: false, //法人或个人证件是否永久有效
        licenseExpMode: false, //营业执照是否永久有效


        //图片临时
        formImgUrl: {
          merchantHead: '', //门头照
          otherPhoto3: '', //经营场所内设照片
          merchantCheck: '', //收银台照片
          cardFace: '',
          bussinessCard: '', //银行卡正面（如是对公账户，开户许可证）
          priAuth: '', //非法人结算授权书(非法人结算模式必传)
          identityFaceCopy: '', //非法人身份证正面(非法人结算模式必传)
          identityBackCopy: '', //非法人身份证背面(非法人结算模式必传)
          bussiness: '', //营业执照照片
          identityFace: '', //法人身份证正面
          identityBack: '', //法人身份证反面
          identityBody: '', //手持身份证照
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

        //服务器地区选择
        provData: [],
        cityData: [],
        areaData: [],

        //银行

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


        //rules
        addRules: {
          merchantType: [
            {required: true, message: '请选择商户类型', trigger: 'change'},
          ],
          merchantName: [
            {required: true, message: '请输入商户全称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
            {validator: chinese_rule, trigger: 'blur'}
          ],
          merchantShortName: [
            {required: true, message: '请输入商户简称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
            {validator: chinese_rule, trigger: 'blur'}
          ],
          servicePhone: [
            {required: true, message: '请输入客服电话', trigger: 'blur'},
            {min: 8, max: 20, message: '客服电话长度在 8 到 20 个字符', trigger: 'blur'},
            {validator: phone_rule, trigger: 'blur'}
          ],
          mccCode: [
            {required: true, message: '请输入MCC码', trigger: 'blur'},
            {min: 4, max: 4, message: 'MCC码为4位字符', trigger: 'blur'},
            {validator: mcc_rule, trigger: 'blur'}
          ],
          legalName: [
            {required: true, message: '请输入法人姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '法人真实姓名长度在 2 到 20 位字符', trigger: 'blur'}
          ],
          credentialType: [
            {required: true, message: '请选择证件类型', trigger: 'change'},
          ],
          idCardNo: [
            {required: true, message: '请输入证件号码', trigger: 'blur'},
            {min: 0, max: 18, message: '证件号码长度在 1 到  18 位字符', trigger: 'blur'},
          ],
          idCardStart: [
            {required: true, message: '请输入证件开始日期', trigger: 'change'},
          ],
          idCardEnd: [
            {required: true, message: '请输入证件结束日期', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
            {min: 0, max: 20, message: '联系人姓名长度在 1 到  20 位字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '仅支持11位手机号码', trigger: 'blur'}
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
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            {min: 5, max: 40, message: '地址限制 5 至 40 位字符', trigger: 'blur'}
          ],
          license: [
            {required: false, message: '请输入营业执照注册号', trigger: 'blur'},
            {min: 0, max: 18, message: '仅支持最多18位长度号码', trigger: 'blur'},
          ],
          licenseFullName: [
            {required: true, message: '请输入营业执照注册名称', trigger: 'blur'},
            {min: 1, max: 40, message: '支持最多40位长度名称', trigger: 'blur'}
          ],
          licenseAddress: [
            {required: true, message: '完整填写营业执照注册地址', trigger: 'blur'},
          ],
          licenseStart: [
            {required: true, message: '请输入营业执照开始日期', trigger: 'change'},
          ],
          licenseEnd: [
            {required: true, message: '请输入营业执照结束日期', trigger: 'change'},
          ],
          legalFlag: [
            {required: true, message: '请选择结算人类型', trigger: 'change'},
          ],
          type: [
            {required: true, message: '请选择结算账户类型', trigger: 'change'},
          ],
          branch: [
            {required: false, message: '请输入完整开户行网点名称', trigger: 'blur'},
          ],
          unionpay: [
            {required: true, message: '请输入开户支行联行号', trigger: 'blur'},
          ],
          holder: [
            {required: true, message: '请输入开户名', trigger: 'blur'},
          ],
          idCardNo2: [
            {required: true, message: '请输入结算人身份证号', trigger: 'blur'},
            {min: 18, max: 18, message: '18位身份证号码', trigger: 'blur'},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          mobile2: [
            {required: true, message: '请输入银行预留号码', trigger: 'blur'},
          ],
          bankCardNo: [
            {required: true, message: '请输入银行卡号', trigger: 'blur'},
          ],
          headMerchantId: [
            {required: true, message: '请输入总店商户号', trigger: 'blur'},
          ],
          shopType: [
            {required: true, message: '请选择店铺类型', trigger: 'change'},
          ],
          settleTo: [
            {required: true, message: '请选择结算对象', trigger: 'change'},
          ],
        },

        //按钮锁定
        verifyClsoe: false,

        //地区代码
        localCode: localCode,
        showCode: '',

        //applyId
        applyId: '',

        //文字进件开关
        infoSendSwitch: true,//暂时默认显示

        //银行列表
        bankData: [],
        bankState: '',

      }
    },
    watch: {},
    mounted() {

      //经营选项赋值
      // this.businessTypes = typeJson;

      //获取url中的id
      this.urlid = this.$route.query.id;//接收ID

      //获取进件资料回显
      this.getMerchantDetail(this.urlid);

      //获取费率表单
      this.getPayType();

      //获取省
      this.getProvince()
      // console.log(this.localCode)
    },
    methods: {
      /**
       * 省获取
       */
      getProvince: function () {
        getProvince().then(res => {
          let data = res.obj;
          this.provData = data;
          console.log(this.provData)
        }).catch(e => {

        })
      },

      getCityArea: function (val, type, del = false) {
        if (val) {
          getCityArea(val).then(res => {
            let data = res.obj;
            if (type === 1) {
              this.cityData = data;
              del ? this.addForm.city = '' : false
              del ? this.addForm.area = '' : false

            } else if (type === 2) {
              this.areaData = data;
              del ? this.addForm.area = '' : false
            }
          }).catch(e => {

          })
        } else {
          this.addForm.city = '';
          this.addForm.area = '';
          this.cityData = [];
          this.areaData = []
        }

      },

      /**
       * 银行获取
       */
      bankSearch: function (queryString, cb) {
        if (queryString) {
          getBankName(queryString).then(res => {
            let data = res.obj;
            this.bankData = data;
            cb(data);
          }).catch(e => {

          })
        }
      },

      /**
       * 遍历结果，获取对应联行code
       */
      getCode: function (eve) {
        let data = this.bankData;
        if (data === '' || data.length == 0) {

        } else {
          // map银行结果
          data.map((value, index, arr) => {
            // console.log(value, index, arr);
            if (eve === value.fullBankName) {
              this.addForm.unionpay = value.fullBankCode
            }
          });
        }

      },


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
        getPlantInfo(id).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },
      //审核模式拉取资料
      verifyMerchantInfo: function (id) {
        getPlantInfo(id).then(res => {
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
      dataCollationBefore: function () {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.dataCollation()
          } else {
            this.$message.error('还有内容未填写');
            return false;
          }
        });
      },


      dataCollation: function () {
        let form;
        form = this.deepCopy(this.addForm);
        //基本表单检查

        //法人身份证有效期
        if (this.idCardExpMode) {
          form.idCardEnd = '2099-12-30';
        }

        //营业执照有效期
        if (this.licenseExpMode) {
          form.licenseEnd = '2099-12-30';
        }


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

        console.log(form);


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
       * 提交第三方
       */
      uploadThirdImage: function () {
        this.$notify({
          title: '提示',
          type: 'warning',
          message: '提交进件资料可能需要1分钟，请耐心等待。'
        });

        this.btnLoading = true;
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('没有商户id');
          this.btnLoading = false;
          return
        }
        this.$confirm('提交图片进件资料至乐刷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          uploadThirdImage(id).then(res => {
            this.$message.success('已提交');
            this.btnLoading = false;
          }).catch(e => {
            this.btnLoading = false
          });
          this.infoSendSwitch = true; //开启文字进件按钮
          this.btnLoading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          this.btnLoading = false
        });
      },

      uploadThirdInfo: function () {
        this.$notify({
          title: '提示',
          type: 'warning',
          message: '提交进件资料可能需要1分钟，请耐心等待。'
        });

        this.btnLoading = true;
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('没有商户id');
          this.btnLoading = false;
          return
        }
        this.$confirm('提交文字进件资料至乐刷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          uploadThirdInfo(id).then(res => {
            this.$message.success('已提交');
            this.btnLoading = false;
          }).catch(e => {
            this.btnLoading = false
          });
          this.btnLoading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          this.btnLoading = false
        });
      },
      /**
       * 回显资料
       */
      autoInputData: function (row) {
        console.log(row);
        if (row) {
          let data = row.lsMchInfo;
          console.log(data);
          this.addForm.id = data.id || '';
          this.addForm.merchantType = data.merchantType || 1;
          this.addForm.merchantName = data.merchantName || '';
          this.addForm.merchantShortName = data.merchantShortName || '';
          this.addForm.servicePhone = data.servicePhone || '';
          this.addForm.mccCode = data.mccCode || '';

          this.addForm.legalName = data.legalName || '';
          this.addForm.credentialType = data.credentialType || 1;
          this.addForm.idCardNo = data.idCardNo || '';
          this.addForm.idCardStart = data.idCardStart || '';
          this.addForm.idCardEnd = data.idCardEnd || '';
          //日期判断
          if (data.idCardEnd === '2099-12-30') {
            this.idCardExpMode = true
          }

          // this.addForm.name = data.name || '';
          this.addForm.mobile = data.mobile || '';

          /**
           * 省市判断
           * @type {RegExp}
           */

          try {
            let cityCheck = true;
            let cityCode = new RegExp("[0-9]+");
            if (data.province) {
              if (cityCode.test(data.province)) {
                this.addForm.province = data.province || '';
                this.getCityArea(data.province, 1)
              } else {
                cityCheck = false;
                this.addForm.province = ''
              }
            }
            if (data.city) {
              if (cityCode.test(data.city)) {
                this.addForm.city = data.city || '';
                this.getCityArea(data.city, 2)
              } else {
                cityCheck = false;
                this.addForm.city = ''
              }
            }
            if (data.area) {
              if (cityCode.test(data.area)) {
                this.addForm.area = data.area || '';
              } else {
                cityCheck = false;
                this.addForm.area = ''
              }
            }
            if (!cityCheck) {
              this.$message.info('乐刷系统升级，你的省/市/区资料无法继续使用，部分选项需重新选择')
            }
          } catch (e) {
            console.log(e)
          }


          this.addForm.address = data.address || '';


          this.addForm.license = data.license || '';

          this.addForm.licenseFullName = data.licenseFullName || '';
          this.addForm.licenseAddress = data.licenseAddress || '';
          this.addForm.licenseStart = data.licenseStart || '';
          this.addForm.licenseEnd = data.licenseEnd || '';
          //日期判断
          if (data.licenseEnd === '2099-12-30') {
            this.licenseExpMode = true
          }

          this.addForm.legalFlag = data.legalFlag || 0;
          this.addForm.type = data.type || 1;
          this.addForm.branch = data.branch || '';
          this.addForm.unionpay = data.unionpay || '';
          this.addForm.holder = data.holder || '';
          this.addForm.idCardNo2 = data.idCardNo2 || '';
          this.addForm.mobile2 = data.mobile2 || '';
          this.addForm.bankCardNo = data.bankCardNo || '';
          this.addForm.shopType = data.shopType || 1;
          this.addForm.headMerchantId = data.headMerchantId || '';
          this.addForm.settleTo = data.settleTo || 0;

          //图片
        }

        if (row) {
          let data = row.lsMchPhoto;

          this.addForm.merchantHead = data.merchantHead|| ''; //门头照
          this.addForm.otherPhoto3 = data.otherPhoto3|| ''; //经营场所内设照片
          this.addForm.merchantCheck = data.merchantCheck|| ''; //收银台照片
          this.addForm.cardFace = data.cardFace|| ''; //银行卡照
          this.addForm.bussinessCard = data.bussinessCard|| ''; //开户许可证
          this.addForm.priAuth = data.priAuth|| ''; //非法人结算授权书
          this.addForm.identityFaceCopy = data.identityFaceCopy|| ''; //非法人身份证正面
          this.addForm.identityBackCopy = data.identityBackCopy|| ''; //非法人身份证背面
          this.addForm.bussiness = data.bussiness|| ''; //营业执照照片
          this.addForm.identityFace = data.identityFace|| ''; //法人身份证正面
          this.addForm.identityBack = data.identityBack|| ''; //法人身份证反面
          this.addForm.identityBody = data.identityBody|| ''; //手持身份证照


          this.formImgUrl.merchantHead = this.imgFil(data.merchantHead); //门头照
          this.formImgUrl.otherPhoto3 = this.imgFil(data.otherPhoto3); //经营场所内设照片
          this.formImgUrl.merchantCheck = this.imgFil(data.merchantCheck); //收银台照片
          this.formImgUrl.cardFace = this.imgFil(data.cardFace); //银行卡照
          this.formImgUrl.bussinessCard = this.imgFil(data.bussinessCard); //开户许可证
          this.formImgUrl.priAuth = this.imgFil(data.priAuth); //非法人结算授权书
          this.formImgUrl.identityFaceCopy = this.imgFil(data.identityFaceCopy); //非法人身份证正面
          this.formImgUrl.identityBackCopy = this.imgFil(data.identityBackCopy); //非法人身份证背面
          this.formImgUrl.bussiness = this.imgFil(data.bussiness); //营业执照照片
          this.formImgUrl.identityFace = this.imgFil(data.identityFace); //法人身份证正面
          this.formImgUrl.identityBack = this.imgFil(data.identityBack); //法人身份证反面
          this.formImgUrl.identityBody = this.imgFil(data.identityBody); //手持身份证照


        }
      },
      //进件状态查询
      findLsStatus: function () {
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('id为空，无法查询');
          return false
        }
        //发起查询
        findLsStatus(id).then(res => {
          let msg = res.msg;
          if (msg) {
            this.$message.info(`${msg}`)
          } else {
            this.$message.info(`进度未知，请稍后查询。`)
          }

        }).catch(e => {

        })
      },


      /**
       * 下载
       */
      downloadFile: function (type) {
        if (type === 'localCode') {
          window.location.href = './static/file/localCode.xlsx'
        } else if (type === 'bankCode') {
          window.open("http://www.lianhanghao.com/");
        } else if (type === 'mcc') {
          window.open("http://www.lianhanghao.com/fl.html");
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
          message: '法人证件正面照上传成功',
          type: 'success'
        });
        this.addForm.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },
      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人证件反面照上传成功',
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
      //非法人身份证正面
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人身份证正面上传成功',
          type: 'success'
        });
        this.addForm.identityFaceCopy = response.obj.path;
        this.formImgUrl.identityFaceCopy = this.imgFil(response.obj.path)
      },
      //非法人身份证背面
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人身份证背面上传成功',
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
          message: '银行卡正面照上传成功',
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
      //商户协议照
      protocolPagePicUpload(response, file) {
        console.log(response);
        this.$message({
          message: '商户协议照上传成功',
          type: 'success'
        });
        this.addForm.protocolPagePic = response.obj.path;
        this.formImgUrl.protocolPagePic = this.imgFil(response.obj.path)
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
        if (isImageSize > 500 * 1000) {
          this.$message.error(`仅支持500KB以下图片！`);
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
        let applyid = this.applyId || '';
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
