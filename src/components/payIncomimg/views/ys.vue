<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>银盛进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单内容-->
        <div>

          <!--经营联系信息-->
          <div class="info">
            <p>营业信息</p>
          </div>
          <el-form-item label="商户模式：" prop="userType">
            <el-radio-group v-model.trim="form.userType">
              <el-radio label="0">个体商户</el-radio>
              <el-radio label="1">企业商户</el-radio>
              <el-radio label="3">小微商户</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-if="form.userType!=='3'">
            <el-form-item label="营业执照全称：" prop="businessLicence">
              <el-input v-model.trim="form.businessLicence" placeholder="营业执照全称" class="standard-form"></el-input>
            </el-form-item>

            <el-form-item label="商户简称：" prop="userShortName">
              <el-input v-model.trim="form.userShortName" placeholder="商户简称（小票）" class="standard-form"></el-input>
            </el-form-item>

            <el-form-item label="营业执照号：" prop="businessLicenceNo">
              <el-input v-model.trim="form.businessLicenceNo" placeholder="营业执照号" class="standard-form"></el-input>
            </el-form-item>

            <el-form-item label="营业执照有效期：" required>
              <el-form-item prop="businessLicenceSdate" class="block">
                <el-date-picker v-model.trim="form.businessLicenceSdate" type="date" placeholder="营业执照开始日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
              <span v-if="!businessLicenceEdateCheck">至</span>
              <el-form-item prop="businessLicenceEdate" class="block" v-if="!businessLicenceEdateCheck">
                <el-date-picker v-model.trim="form.businessLicenceEdate" type="date" placeholder="营业执照结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
              <el-checkbox v-model="businessLicenceEdateCheck">长期有效</el-checkbox>
            </el-form-item>

            <el-form-item label="注册地址：" prop="registeredAddress">
              <el-input v-model.trim="form.registeredAddress" placeholder="注册地址" class="standard-form"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="营业地址：" prop="businessAddress">
            <el-input v-model.trim="form.businessAddress" placeholder="营业地址" class="standard-form"></el-input>
          </el-form-item>

          <!--法人与非法人信息-->
          <div class="info">
            <p>法人/非法人信息</p>
          </div>

          <el-form-item label="法人姓名：" prop="legalPersonName">
            <el-input v-model.trim="form.legalPersonName" placeholder="法人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证：" prop="legalPersonId">
            <el-input v-model.trim="form.legalPersonId" placeholder="法人身份证号码" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证有效期：" required>
            <el-form-item prop="legalPersonIdSdate" class="block">
              <el-date-picker v-model.trim="form.legalPersonIdSdate" type="date" placeholder="法人身份证开始日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
            <span v-if="!legalPersonIdEdateCheck">至</span>
            <el-form-item prop="legalPersonIdEdate" class="block" v-if="!legalPersonIdEdateCheck">
              <el-date-picker v-model.trim="form.legalPersonIdEdate" type="date" placeholder="法人身份证结束日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
            <el-checkbox v-model="legalPersonIdEdateCheck">长期有效</el-checkbox>
          </el-form-item>

          <el-form-item label="法人电话：" prop="legalPersonPhone">
            <el-input v-model.trim="form.legalPersonPhone" placeholder="法人常用联系电话" class="standard-form"></el-input>
            <span class="tips">如果填写固话号码，请勿使用任何符号</span>
          </el-form-item>

          <el-form-item label="非法人姓名：" prop="unincorporatedName">
            <el-input v-model.trim="form.unincorporatedName" placeholder="非法人姓名" class="standard-form"></el-input>
            <span class="tips tips-warning">如无“非法人”，可填联系人信息，不能留空</span>
          </el-form-item>

          <el-form-item label="非法人身份证：" prop="unincorporatedId">
            <el-input v-model.trim="form.unincorporatedId" placeholder="非法人身份证号码" class="standard-form"></el-input>
            <span class="tips tips-warning">如无“非法人”，可填联系人信息，不能留空</span>
          </el-form-item>

          <el-form-item label="实际控制人：" prop="actualManager">
            <el-input v-model.trim="form.actualManager" placeholder="实际控制人" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="证件类型：" prop="certType">
            <el-radio-group v-model.trim="form.certType">
              <el-radio label="00">身份证</el-radio>
            </el-radio-group>
            <span class="tips">（目前只支持身份证）</span>
          </el-form-item>

          <!--结算信息-->
          <div class="info">
            <p>结算/开户信息</p>
          </div>

          <el-form-item label="结算账户卡号：" prop="balanceAccCardno">
            <el-input v-model.trim="form.balanceAccCardno" placeholder="结算账户卡号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="结算账户户名：" prop="balanceAccName">
            <el-input v-model.trim="form.balanceAccName" placeholder="结算账户户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="银行预留手机号：" prop="bankMobile">
            <el-input v-model.trim="form.bankMobile" placeholder="银行预留手机号" class="standard-form"></el-input>
            <span class="tips">号码中请勿使用任何符号</span>
          </el-form-item>

          <!--注意，目前没有文档，无法制作下拉框-->
          <el-form-item label="开户行省：" prop="openAccProvince">
            <el-select v-model.trim="form.openAccProvince" placeholder="开户行所属省(例:福建省)" @change="getProv($event)"
                       clearable class="standard-form">
              <el-option :value="n" :key="index" :label="n" v-for="(n,index) in dataProv[0]['prov']">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户行市：" prop="openAccCity">
            <el-select v-model.trim="form.openAccCity" placeholder="开户行所属市(例:福州市)" class="standard-form" clearable
                       @change="getCity($event)">
              <el-option :value="n" :key="index" :label="n" v-for="(n,index) in dataCity">
              </el-option>
            </el-select>
            <span class="tips">如果显示无数据，请先选择“开户行省”</span>
          </el-form-item>

          <el-form-item label="开户行区/县：" prop="openAccArea">
            <el-select v-model.trim="form.openAccArea" placeholder="开户行所属区/县(例:鼓楼区)" clearable class="standard-form">
              <el-option :value="n" :key="index" :label="n" v-for="(n,index) in dataCountry">
              </el-option>
            </el-select>
            <span class="tips tips-warning">非必填</span>
          </el-form-item>

          <el-form-item>
            <div class="bank-search">
              <el-divider content-position="left">银行信息搜索工具</el-divider>
            </div>
            <!--模糊查询-->
            <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="openAccBankName" :debounce="1000"
                             value-key="openAccBankname" clearable :fetch-suggestions="ysFindAccBankName"
                             placeholder="银行模糊查询，请输入有高辨识度的关键词(>2字)，如“高新区支行”"
                             :trigger-on-focus="false" @select="ysFindAccBankNameSelect"></el-autocomplete>
            <span class="tips tips-warning">选中后会自动填充开户行资料（以下四项）</span>
          </el-form-item>

          <el-form-item label="开户行行别名称：" prop="bankName">
            <el-input v-model.trim="form.bankName" placeholder="开户行行别名称" class="standard-form"
                      style="width: 480px"></el-input>
            <span class="tips">请使用上方搜索工具查询银行信息</span>
          </el-form-item>

          <el-form-item label="开户行行别编号：" prop="bankType">
            <el-input v-model.trim="form.bankType" placeholder="开户行行别编号" class="standard-form"
                      style="width: 480px"></el-input>
            <span class="tips">请使用上方搜索工具查询银行信息</span>
          </el-form-item>

          <el-form-item label="开户行名称（支行）：" prop="openAccBankname">
            <el-input v-model.trim="form.openAccBankname" placeholder="开户行名称（支行）" class="standard-form"
                      style="width: 480px"></el-input>
            <span class="tips">请使用上方搜索工具查询银行信息</span>
          </el-form-item>

          <el-form-item label="开户行编号（支行）：" prop="openAccBanktype">
            <el-input v-model.trim="form.openAccBanktype" placeholder="开户行编号（支行）" class="standard-form"
                      style="width: 480px"></el-input>
            <span class="tips">请使用上方搜索工具查询银行信息</span>
          </el-form-item>

          <el-form-item label="账户类型：" prop="balanceAccType">
            <el-radio-group v-model.trim="form.balanceAccType">
              <el-radio label="11">对私账户</el-radio>
              <el-radio label="21">对公账户</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--联系人信息-->
          <div class="info">
            <p>联系人信息</p>
          </div>

          <el-form-item label="联系人姓名：" prop="contactsName">
            <el-input v-model.trim="form.contactsName" placeholder="联系人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话：" prop="contactsPhone">
            <el-input v-model.trim="form.contactsPhone" placeholder="联系人电话" class="standard-form"></el-input>
            <span class="tips">号码中请勿使用任何符号</span>
          </el-form-item>

          <el-form-item label="联系人邮箱：" prop="contactsEmail">
            <el-input v-model.trim="form.contactsEmail" placeholder="联系人邮箱" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="联系人住址：" prop="contactsAddr">
            <el-input v-model.trim="form.contactsAddr" placeholder="联系人住址（通讯地址）" class="standard-form"></el-input>
          </el-form-item>

          <!--费率信息-->
          <div class="info">
            <p>费率信息</p>
          </div>

          <el-form-item label="微信签约费率：" prop="wechatSignRate">
            <el-input-number v-model.trim="form.wechatSignRate" :min="1" :max="99" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">单位：万分之</span>
          </el-form-item>

          <el-form-item label="微信签约费率封底：" prop="wechatSignMin">
            <el-input-number v-model.trim="form.wechatSignMin" :min="1" :max="9999" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">分（1-9999）</span>
          </el-form-item>

          <el-form-item label="微信签约费率封顶：" prop="wechatSignMax">
            <el-input-number v-model.trim="form.wechatSignMax" :min="1" :max="9999" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">分（1-9999）</span>
          </el-form-item>

          <el-form-item label="支付宝签约费率：" prop="alipaySignRate">
            <el-input-number v-model.trim="form.alipaySignRate" :min="1" :max="99" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">单位：万分之</span>
          </el-form-item>

          <el-form-item label="支付宝签约费率封底：" prop="alipaySignMin">
            <el-input-number v-model.trim="form.alipaySignMin" :min="1" :max="9999" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">分（1-9999）</span>
          </el-form-item>

          <el-form-item label="支付宝签约费率封顶：" prop="alipaySignMax">
            <el-input-number v-model.trim="form.alipaySignMax" :min="1" :max="9999" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">分（1-9999）</span>
          </el-form-item>

          <!--其他-->
          <div class="info">
            <p>其他</p>
          </div>

          <el-form-item label="结算起始金额：" prop="lowestStlAmt">
            <el-input-number v-model.trim="form.lowestStlAmt" :min="0" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">分</span>
          </el-form-item>

          <el-form-item label="商户级别：" prop="mercLvl">
            <el-radio-group v-model.trim="form.mercLvl">
              <el-radio label="1">总店</el-radio>
              <el-radio label="2">分店</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="总店商户号：" prop="mercUpId" v-if="form.mercLvl=='2'">
            <el-input v-model.trim="form.mercUpId" placeholder="总店商户号" class="standard-form"></el-input>
            <span class="tips tips-warning">分店必填</span>
          </el-form-item>

          <!--备注-->
          <div class="info">
            <p>备注</p>
          </div>

          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="form.remark" type="textarea" :rows="2" placeholder="备注"
                      class="standard-form"></el-input>
            <span class="tips tips-warning">非必填</span>
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
            <el-form-item :label="payChannelName + item.name+'结算费率：'" v-for="(item,index) in dymForm" :key="index"
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
      <!--图片-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>图片进件资料（非强制必填，不需要的照片可不上传！）</span>
        </div>
        <!--表单内容-->
        <div>
          <div class="image-upload-box">
            <!--*************-->

            <!--营业执照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item"
                     v-if="form.userType!=='3'">
              <div>
                <div class="card-header-title">
                  <span>营业执照</span>
                  <span v-if="formImgUrl.bussiness!=''" :class="{'up-success':formImgUrl.bussiness!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="businessUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.bussiness" :src="formImgUrl.bussiness" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证正面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证正面照</span>
                  <span v-if="formImgUrl.identityFace!=''" :class="{'up-success':formImgUrl.identityFace!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityFaceUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.identityFace" :src="formImgUrl.identityFace" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证反面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证反面照</span>
                  <span v-if="formImgUrl.identityBack!=''" :class="{'up-success':formImgUrl.identityBack!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBackUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.identityBack" :src="formImgUrl.identityBack" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--结算银行卡正面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算银行卡正面照</span>
                  <span v-if="formImgUrl.cardFace!=''" :class="{'up-success':formImgUrl.cardFace!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="cardFaceUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.cardFace" :src="formImgUrl.cardFace" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--结算银行卡反面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算银行卡反面照</span>
                  <span v-if="formImgUrl.cardBack!=''" :class="{'up-success':formImgUrl.cardBack!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="cardBackUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.cardBack" :src="formImgUrl.cardBack" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--门头照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照</span>
                  <span v-if="formImgUrl.merchantHead!=''" :class="{'up-success':formImgUrl.merchantHead!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merchantHeadUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.merchantHead" :src="formImgUrl.merchantHead" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--经营场所照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>经营场所照</span>
                  <span v-if="formImgUrl.otherPhoto3!=''" :class="{'up-success':formImgUrl.otherPhoto3!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="otherPhoto3Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.otherPhoto3" :src="formImgUrl.otherPhoto3" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--收银台照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>收银台照</span>
                  <span v-if="formImgUrl.merchantCheck!=''" :class="{'up-success':formImgUrl.merchantCheck!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merchantCheckUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.merchantCheck" :src="formImgUrl.merchantCheck" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--手持身份证照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证照片</span>
                  <span v-if="formImgUrl.identityBody!=''" :class="{'up-success':formImgUrl.identityBody!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBodyUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.identityBody" :src="formImgUrl.identityBody" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--收单业务协议-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>收单业务协议</span>
                  <span v-if="formImgUrl.receiptBusiness!=''" :class="{'up-success':formImgUrl.receiptBusiness!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="receiptBusinessUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.receiptBusiness" :src="formImgUrl.receiptBusiness" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--开户许可证照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item"
                     v-if="form.userType==='1'">
              <div>
                <div class="card-header-title">
                  <span>开户许可证照</span>
                  <span v-if="formImgUrl.bussinessCard!=''" :class="{'up-success':formImgUrl.bussinessCard!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="bussinessCardUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.bussinessCard" :src="formImgUrl.bussinessCard" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人/非法人结算授权书-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人/非法人结算授权书</span>
                  <span v-if="formImgUrl.priauth!=''" :class="{'up-success':formImgUrl.priauth!=''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="priauthUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.priauth" :src="formImgUrl.priauth" class="logo">
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
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">保存并下一步
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='modify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">保存修改
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='add'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">提交资料
          </el-button>
        </div>

        <div class="btn-group" v-if="mode==='verify'">
          <el-button type="" @click="goQuit">退出</el-button>
          <el-button @click="submitRejest">驳回</el-button>
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">银盛保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="ysRegisterStatus">查询进件状态
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="fileSubmit">提交文字资料
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
  // import cityJson from '@/assets/city/city.json'
  import cityJson from '@/assets/city/city_ys.json' // 地域数据
  import typeJson from '@/assets/businessClass/business.json'
  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    url
  } from '@/utils/request'
  import {
    findPayType,
    findPayTypeByChannel,
    getYsInfo,
    ysImageRegister,
    ysRegister,
    modifyMerchant,
    ysRegisterStatus,
    ysFindAccBankName
  } from '../api/ys'

  import {
    checkVerify,
    saveRrecord
  } from '../api/public'

  export default {
    name: 'hsf',
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {
      var checkShopPhone = (rule, value, callback) => {
        let reg = /^((0\d{2,3}\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('手机或电话号码格式错误'))
        } else {
          callback()
        }
      };
      var checkIdNum = (rule, value, callback) => {
        let reg =
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('身份证号格式错误'))
        } else {
          callback()
        }
      };

      return {
        loading: false,
        btnLoading: false,
        labelWidth: '370px',
        inputSize: 'medium',
        urlid: '',
        form: {
          userType: '0', // 商户模式

          businessLicence: '', // 营业执照全称必填（商户模式为3时不用填）
          userShortName: '', // 商户简称（小票）必填（商户模式为3时不用填）
          businessLicenceNo: '', // 营业执照号码必填（商户模式为3时不用填）
          businessLicenceSdate: '', // 营业执照开始日期必填（商户模式为3时不用填）
          businessLicenceEdate: '', // 营业执照结束日期必填（商户模式为3时不用填）
          registeredAddress: '', // 注册地址必填（商户模式为3时不用填）
          businessAddress: '', // 营业地址必填

          legalPersonName: '', // 法人姓名
          legalPersonId: '', // 法人身份证
          legalPersonIdSdate: '', // 法人身份证开始日期必填
          legalPersonIdEdate: '', // 法人身份证结束日期必填
          legalPersonPhone: '', // 法人电话必填

          unincorporatedName: '', // 非法人姓名必填
          unincorporatedId: '', // 非法人身份证号码必填

          balanceAccCardno: '', // 结算账户卡号必填
          balanceAccName: '', // 结算账户户名必填
          openAccProvince: '', // 开户行所属省
          openAccCity: '', // 开户行所市
          openAccArea: '', // 开户行区县

          bankName: '', // 开户行行别名称必填
          bankType: '', // 开户行行别编号必填
          openAccBanktype: '', // 开户行编号（支行）必填
          openAccBankname: '', // 开户行名称（支行）必填
          bankMobile: '', // 银行预留手机号必填

          balanceAccType: '11', // 借记卡类型11对私借记卡需要正反照片 21对公借记卡只需正面照片必填

          contactsName: '', // 联系人姓名
          contactsPhone: '', // 联系人电话
          contactsEmail: '', // 联系人邮箱
          contactsAddr: '', // 联系人地址

          wechatSignRate: 0, // 微信签约费率必填（ 如 ：1表示1%）
          wechatSignMin: 0, // 微信签约费率封底（ 单位分）
          wechatSignMax: 0, // 微信签约费率封顶（ 单位分）

          alipaySignRate: 0, // 支付宝签约费率必填（ 如 ：1表示1%）
          alipaySignMin: 0, // 支付宝签约费率封底（单位:分)必填
          alipaySignMax: 0, // 支付宝签约费率封顶（单位:分)必填

          remark: '', // 备注

          lowestStlAmt: '', // 结算起始金额，单位(单位:分)必填
          actualManager: '', // 实际控制人必填

          certType: '00', // 证件类型

          mercLvl: '1', // 商户级别
          mercUpId: '', // 总店商户号

          bussiness: '', // 营业执照照片
          identityFace: '', // 法人身份证正面照
          identityBack: '', // 法人身份证反面照
          cardFace: '', // 结算银行卡正面照
          cardBack: '', // 结算银行卡反面照
          merchantHead: '', // 门头照
          otherPhoto3: '', // 经营场所照
          merchantCheck: '', // 收银台照
          identityBody: '', // 手持身份证照片
          receiptBusiness: '', // 收单业务协议照片
          bussinessCard: '', // 开户许可证
          priauth: '', // 法人/非法人结算授权书

        },
        formImgUrl: {
          bussiness: '', // 营业执照照片
          identityFace: '', // 法人身份证正面照
          identityBack: '', // 法人身份证反面照
          cardFace: '', // 结算银行卡正面照
          cardBack: '', // 结算银行卡反面照
          merchantHead: '', // 门头照
          otherPhoto3: '', // 经营场所照
          merchantCheck: '', // 收银台照
          identityBody: '', // 手持身份证照片
          receiptBusiness: '', // 收单业务协议照片
          bussinessCard: '', // 开户许可证
          priauth: '', // 法人/非法人结算授权书
        },

        businessLicenceEdateCheck: false, // 营业执照是否长期
        legalPersonIdEdateCheck: false, // 法人身份证是否长期

        bank: [],
        bankName: '',
        openAccBank: [],
        openAccBankName: '',
        // 图片上传-------------------
        filesData: {
          module: 'image'
        },
        url: hsfuploadUrl,
        headers: {
          authorized: sessionStorage.token
        },
        // 地域选择
        dataProv: cityJson['selectProv'],
        dataCity: '', // 城市
        dataCountry: '', // 区域
        provIndex: '',
        cityIndex: '',

        // 经营范围
        typeData: typeJson,
        classifyData: '',
        classifyIndex: '',

        dymForm: [],

        rules: {
          userType: [{
            required: true,
            message: '必须选择商户模式',
            trigger: 'change'
          }],
          businessLicence: [{
            required: true,
            message: '必须填写营业执照全称',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          userShortName: [{
            required: true,
            message: '必须填写商户简称',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          businessLicenceNo: [{
            required: true,
            message: '必须填写营业执照号',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          businessLicenceSdate: [{
            required: true,
            message: '必须填写营业执照开始日期',
            trigger: ['change', 'blur']
          }],
          businessLicenceEdate: [{
            required: true,
            message: '必须填写营业执照结束日期',
            trigger: ['change', 'blur']
          }],
          registeredAddress: [{
            required: true,
            message: '必须填写注册地址',
            trigger: ['change', 'blur']
          },
            {
              min: 1,
              max: 500,
              message: '仅支持500位中文字符长度'
            }
          ],
          businessAddress: [{
            required: true,
            message: '必须填写营业地址',
            trigger: ['change', 'blur']
          },
            {
              min: 1,
              max: 500,
              message: '仅支持500位中文字符长度'
            }
          ],
          legalPersonName: [{
            required: true,
            message: '必须填写法人姓名',
            trigger: ['change', 'blur']
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          legalPersonId: [{
            required: true,
            message: '请填写法人身份证',
            trigger: 'blur'
          },
            {
              validator: checkIdNum,
              trigger: 'blur'
            }
          ],
          legalPersonIdSdate: [{
            required: true,
            message: '必须填写法人身份证开始日期',
            trigger: ['change', 'blur']
          }],
          legalPersonIdEdate: [{
            required: true,
            message: '必须填写法人身份证结束日期',
            trigger: ['change', 'blur']
          }],
          legalPersonPhone: [{
            required: true,
            message: '请填写法人电话',
            trigger: 'blur'
          },
            {
              validator: checkShopPhone,
              trigger: 'blur'
            }
          ],
          unincorporatedName: [{
            required: true,
            message: '必须填写非法人姓名',
            trigger: ['change', 'blur']
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          unincorporatedId: [{
            required: true,
            message: '请填写非法人身份证',
            trigger: 'blur'
          },
            {
              validator: checkIdNum,
              trigger: 'blur'
            }
          ],
          actualManager: [{
            required: true,
            message: '必须填写实际控制人',
            trigger: ['change', 'blur']
          },
            {
              min: 1,
              max: 200,
              message: '仅支持200位中文字符长度'
            }
          ],
          certType: [{
            required: true,
            message: '必须选择证件类型',
            trigger: 'change'
          }],
          balanceAccCardno: [{
            required: true,
            message: '必须填写结算账户卡号',
            trigger: ['change', 'blur']
          }],
          balanceAccName: [{
            required: true,
            message: '必须填写结算账户户名',
            trigger: ['change', 'blur']
          }],
          bankMobile: [{
            required: true,
            message: '必须填写银行预留手机号',
            trigger: ['change', 'blur']
          },
            {
              validator: checkShopPhone,
              trigger: 'blur'
            }
          ],
          openAccProvince: [{
            required: true,
            message: '必须填写开户行省',
            trigger: ['change', 'blur']
          }],
          openAccCity: [{
            required: true,
            message: '必须填写开户行市',
            trigger: ['change', 'blur']
          }],
          openAccArea: [{
            required: false,
            message: '必须填写开户行区/县',
            trigger: ['change', 'blur']
          },
            {
              min: 2,
              max: 100,
              message: '请完整填写区/县'
            }
          ],
          bankName: [{
            required: true,
            message: '必须填写开户行行别名称',
            trigger: ['change', 'blur']
          }],
          bankType: [{
            required: true,
            message: '必须填写开户行行别编号',
            trigger: ['change', 'blur']
          }],
          openAccBankname: [{
            required: true,
            message: '必须填写开户行名称（支行）',
            trigger: ['change', 'blur']
          }],
          openAccBanktype: [{
            required: true,
            message: '必须填写开户行编号（支行）',
            trigger: ['change', 'blur']
          }],
          balanceAccType: [{
            required: true,
            message: '必须选择账户类型',
            trigger: ['change', 'blur']
          }],
          contactsName: [{
            required: true,
            message: '必须填写联系人姓名',
            trigger: ['change', 'blur']
          }],
          contactsPhone: [{
            required: true,
            message: '必须填写联系人电话',
            trigger: ['change', 'blur']
          }],
          contactsEmail: [{
            required: true,
            message: '必须填写联系人邮箱',
            trigger: ['change', 'blur']
          }],
          contactsAddr: [{
            required: true,
            message: '必须填写联系人住址',
            trigger: ['change', 'blur']
          }],
          wechatSignRate: [{
            required: true,
            message: '必须填写微信签约费率',
            trigger: ['change', 'blur']
          }],
          wechatSignMin: [{
            required: true,
            message: '必须填写微信签约费率封底',
            trigger: ['change', 'blur']
          }],
          wechatSignMax: [{
            required: true,
            message: '必须填写微信签约费率封顶',
            trigger: ['change', 'blur']
          }],
          alipaySignRate: [{
            required: true,
            message: '必须填写支付宝签约费率',
            trigger: ['change', 'blur']
          }],
          alipaySignMin: [{
            required: true,
            message: '必须填写支付宝签约费率封底',
            trigger: ['change', 'blur']
          }],
          alipaySignMax: [{
            required: true,
            message: '必须填写支付宝签约费率封顶',
            trigger: ['change', 'blur']
          }],
          lowestStlAmt: [{
            required: true,
            message: '必须填写结算起始金额',
            trigger: ['change', 'blur']
          }],
          mercLvl: [{
            required: true,
            message: '必须填写商户级别',
            trigger: ['change', 'blur']
          }],
          mercUpId: [{
            required: true,
            message: '选择分店则必须填写总店商户号',
            trigger: ['change', 'blur']
          }]
        }, // 校验

        // applyId
        applyId: '',

        // loading
        searchLoading: false

      }
    },
    filters: {},
    watch: {
      //营业执照有效期长期
      businessLicenceEdateCheck: function (nVal, oVal) {
        if (nVal) {
          this.form.businessLicenceEdate = '20991231'
        }
      },
      //法人身份证有效期长期
      legalPersonIdEdateCheck: function (nVal, oVal) {
        if (nVal) {
          this.form.legalPersonIdEdate = '20991231'
        }
      }
    },
    mounted: function () {
      this.urlid = this.$route.query.id; // 接收ID
      // 获取进件资料
      this.getMerchantDetail(this.urlid);
      // 获取费率表单
      this.getPayType()
    },
    methods: {
      /**
       * 支行获取
       */
      ysFindAccBankName: function (queryString, cb) {
        if (queryString.length > 2) {
          ysFindAccBankName(queryString).then(res => {
            let data = res.obj;
            let arr = data.slice(0, 500);
            this.openAccBank = arr;
            cb(arr)
          }).catch(e => {

          })
        }
      },
      ysFindAccBankNameSelect: function (item) {
        if (item) {
          this.form.bankName = item.bankName;
          this.form.bankType = item.bankType;
          this.form.openAccBankname = item.openAccBankname;
          this.form.openAccBanktype = item.openAccBanktype
        }
      },

      /**
       * 状态查询
       */
      ysRegisterStatus: function () {
        let id = this.urlid;
        ysRegisterStatus(id).then(res => {
          this.$message.success(res.msg)
        }).catch(e => {

        })
      },
      /**
       * 动态费率获取
       */
      getPayType: function () {
        if (this.mode === 'new') {
          // new
          let pw = this.payway;
          let pc = this.payChannel;
          findPayType(pw, pc).then(res => {
            let data = res.obj;
            this.dymForm = data;
            console.log(this.dymForm)
          }).catch(e => {

          })
        } else if (this.mode === 'add' || this.mode === 'verify' || this.mode === 'modify') {
          // 申请开通并提交审核
          let pc = this.payChannel;
          let id = this.urlid;
          findPayTypeByChannel(pc, id).then(res => {
            let data = res.obj;
            console.log(data);
            this.applyId = data.applyId; // applyid赋值
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
            this.dymForm = tmp
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
      // 新进件拉取平台资料
      newAddMerchantInfo: function (id) {
        // 新进件模式
        getYsInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data)
        }).catch(e => {

        })
      },
      // 编辑拉取已进件资料
      modifyMerchantInfo: function (id) {
        // 编辑模式
        getYsInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data)
        }).catch(e => {

        })
      },
      // 审核模式拉取资料
      verifyMerchantInfo: function (id) {
        // 编辑模式和审核模式
        getYsInfo(id, this.payChannel).then(res => {
          let data = res.obj;
          this.dataAutoInput(data)
        }).catch(e => {

        })
      },

      /**
       * 数据赋值
       */
      dataAutoInput: function (raw) {
        // 数据回显
        this.infoDataFill(raw);
        this.photoDataFill(raw)
      },

      infoDataFill: function (raw) {
        let data = raw.oldYSMchInfo; // 基本数据

        this.form.id = data.id || ''; // 数据id
        this.form.userType = data.userType || '0';
        this.form.businessLicence = data.businessLicence || '';
        this.form.userShortName = data.userShortName || '';
        this.form.businessLicenceNo = data.businessLicenceNo || '';
        this.form.businessLicenceSdate = data.businessLicenceSdate || '';
        this.form.businessLicenceEdate = data.businessLicenceEdate || '';

        if (data.businessLicenceEdate === '20991231') {
          this.businessLicenceEdateCheck = true
        }

        this.form.registeredAddress = data.registeredAddress || '';
        this.form.businessAddress = data.businessAddress || '';

        this.form.legalPersonName = data.legalPersonName || '';
        this.form.legalPersonId = data.legalPersonId || '';
        this.form.legalPersonIdSdate = data.legalPersonIdSdate || '';
        this.form.legalPersonIdEdate = data.legalPersonIdEdate || '';

        if (data.legalPersonIdEdate === '20991231') {
          this.legalPersonIdEdateCheck = true
        }

        this.form.legalPersonPhone = data.legalPersonPhone || '';

        this.form.unincorporatedName = data.unincorporatedName || '';
        this.form.unincorporatedId = data.unincorporatedId || '';

        this.form.balanceAccCardno = data.balanceAccCardno || '';
        this.form.balanceAccName = data.balanceAccName || '';
        // 后面回填
        // this.form.openAccProvince = data.openAccProvince || '';
        // this.form.openAccCity = data.openAccCity || '';
        // this.form.openAccArea = data.openAccArea || '';

        this.form.bankName = data.bankName || '';
        this.form.bankType = data.bankType || '';
        this.form.openAccBanktype = data.openAccBanktype || '';
        this.form.openAccBankname = data.openAccBankname || '';
        this.form.bankMobile = data.bankMobile || '';

        this.form.balanceAccType = data.balanceAccType || '11';

        this.form.contactsName = data.contactsName || '';
        this.form.contactsPhone = data.contactsPhone || '';
        this.form.contactsEmail = data.contactsEmail || '';
        this.form.contactsAddr = data.contactsAddr || '';

        this.form.wechatSignRate = data.wechatSignRate || 0;
        this.form.wechatSignMin = data.wechatSignMin || 0;
        this.form.wechatSignMax = data.wechatSignMax || 0;

        this.form.alipaySignRate = data.alipaySignRate || 0;
        this.form.alipaySignMin = data.alipaySignMin || 0;
        this.form.alipaySignMax = data.alipaySignMax || 0;

        this.form.remark = data.remark || '';
        this.form.lowestStlAmt = data.lowestStlAmt || '';
        this.form.actualManager = data.actualManager || '';

        this.form.certType = data.certType || '00';

        this.form.mercLvl = data.mercLvl || '1';
        this.form.mercUpId = data.mercUpId || '';

        try {
          // 省
          setTimeout(() => {
            this.form.openAccProvince = data.openAccProvince || '';
            if (data.openAccProvince) {
              this.getProv(data.openAccProvince)
            }
          }, 100);
          // 市
          setTimeout(() => {
            this.form.openAccCity = data.openAccCity || '';
            if (data.openAccCity) {
              this.getCity(data.openAccCity)
            }
          }, 200);
          // 区县
          setTimeout(() => {
            this.form.openAccArea = data.openAccArea || ''
          }, 300);
          console.log('城市填充正常')
        } catch (err) {
          console.warn('城市数据可以异常，如果不影响页面显示，可以忽略', err)
        }
      },
      photoDataFill: function (raw) {
        let data = raw.oldYSMchPhoto; // 照片数据

        // 回填ID
        this.form.bussiness = data.bussiness || '';
        this.form.identityFace = data.identityFace || '';
        this.form.identityBack = data.identityBack || '';
        this.form.cardFace = data.cardFace || '';
        this.form.cardBack = data.cardBack || '';
        this.form.merchantHead = data.merchantHead || '';
        this.form.otherPhoto3 = data.otherPhoto3 || '';
        this.form.merchantCheck = data.merchantCheck || '';
        this.form.identityBody = data.identityBody || '';
        this.form.receiptBusiness = data.receiptBusiness || '';
        this.form.bussinessCard = data.bussinessCard || '';
        this.form.priauth = data.priauth || '';

        // 获取链接
        this.formImgUrl.bussiness = this.imgFil(data.bussiness);
        this.formImgUrl.identityFace = this.imgFil(data.identityFace);
        this.formImgUrl.identityBack = this.imgFil(data.identityBack);
        this.formImgUrl.cardFace = this.imgFil(data.cardFace);
        this.formImgUrl.cardBack = this.imgFil(data.cardBack);
        this.formImgUrl.merchantHead = this.imgFil(data.merchantHead);
        this.formImgUrl.otherPhoto3 = this.imgFil(data.otherPhoto3);
        this.formImgUrl.merchantCheck = this.imgFil(data.merchantCheck);
        this.formImgUrl.identityBody = this.imgFil(data.identityBody);
        this.formImgUrl.receiptBusiness = this.imgFil(data.receiptBusiness);
        this.formImgUrl.bussinessCard = this.imgFil(data.bussinessCard);
        this.formImgUrl.priauth = this.imgFil(data.priauth);
      },

      /**
       * 提交前数据整理
       */
      dataCollationBefore: function () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dataCollation()
          } else {
            this.$message.error('还有内容未正确填写');
            return false
          }
        })
      },

      /**
       * 尝试提示表单
       */
      dataCollation: function () {
        this.btnLoading = true;

        let id = this.urlid;
        this.form.merchantId = id; // 附上id

        // 费率插入至主表单
        let check = false;
        for (let i in this.dymForm) {
          if (this.dymForm[i].value === '' || this.dymForm[i].value == null) {
            check = true
          }
        }

        //长期营业执照
        if (this.businessLicenceEdateCheck) {
          this.form.businessLicenceEdate = '20991231'
        }

        //长期法人身份证
        if (this.legalPersonIdEdateCheck) {
          this.form.legalPersonIdEdate = 20991231
        }


        if (check) {
          this.$message.error('还有费率未填写');
          this.btnLoading = false;
          return false
        }

        // 判断打开方式，调用不同保存。
        if (this.mode === 'new') {
          this.submitAddData()
        } else if (this.mode === 'add') {
          this.submitUpdateData()
        } else if (this.mode === 'modify') {
          this.submitUpdateData()
        } else if (this.mode === 'verify') {
          this.submitUpdateData()
        }
      },

      /**
       * 提交新进件
       */
      submitAddData: function () {
        modifyMerchant(JSON.stringify(this.form), this.payChannel).then(res => {
          this.$message.success('保存进件资料成功');
          this.branching() // 根据mode决定走向
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
            this.verifyOK()
          } else {
            this.branching() // 根据mode决定走向
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
          // 第三方进件后直接下一步并保存当前的费率信息 dymForm
          this.$emit('next', this.dymForm)
        } else if (this.mode === 'add') {
          this.submitRecord()
        } else if (this.mode === 'modify') {
          this.submitRecord();
          this.$emit('next')
        } else if (this.mode === 'verify') {
          if(this.status == 2){
            this.submitRecord();
          }
          this.$emit('next')
        }
        this.btnLoading = false
      },

      /**
       * 提交记录
       */
      submitRecord: function () {
        let form = this.dymForm;
        // 费率汇集
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

        let data = tmpArr; // 源数组
        if (tmpArr) {
          let tempArrToStr = [];
          for (let i in data) {
            let str = `${data[i].payWay},${data[i].payType},${data[i].value}`;
            tempArrToStr.push(str)
          }
          let feeStr = tempArrToStr.join(';'); // 转字符串编组

          console.log(feeStr);

          // 提交费率信息
          saveRrecord(this.urlid, feeStr, this.payChannel).then(res => {
            this.$emit('next')
          }).catch(e => {

          })
        }
      },

      /**
       * 审核费率汇集
       */
      verifyFeeColl: function () {
        let form = this.dymForm;
        // 费率汇集
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
          this.$emit('next')
        }).catch(() => {
        })
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
            that.branching() // 返回
          }).catch(e => {
            that.$message.error(e.msg);
            that.btnLoading = false
          })
        }).catch(() => {
          this.btnLoading = false
        })
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
        // 清空
        this.form.classify = ''
      },

      /**
       * 省市区选择器
       */
      getProv: function (prov) {
        // 清空下级表单
        this.form.openAccCity = '';
        this.form.openAccArea = '';
        if (!prov) return;
        // 获取下级数据
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2']
      },
      getCity: function (city) {
        // 清空下级表单
        this.form.openAccArea = '';
        if (!city) return;
        // 获取下级数据
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2']
      },

      /**
       * 图片
       */

      imgFil: function (val) {
        // resource
        // C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
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
       * 照片上传 function 组
       */

      // 营业执照
      businessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照上传成功',
          type: 'success'
        });
        this.form.bussiness = response.obj.path;
        this.formImgUrl.bussiness = this.imgFil(response.obj.path)
      },

      // 法人身份证正面照
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面照上传成功',
          type: 'success'
        });
        this.form.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },

      // 法人身份证反面照
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面照上传成功',
          type: 'success'
        });
        this.form.identityBack = response.obj.path;
        this.formImgUrl.identityBack = this.imgFil(response.obj.path)
      },

      // 结算银行卡正面照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算银行卡正面照上传成功',
          type: 'success'
        });
        this.form.cardFace = response.obj.path;
        this.formImgUrl.cardFace = this.imgFil(response.obj.path)
      },

      // 结算银行卡反面照
      cardBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算银行卡反面照上传成功',
          type: 'success'
        });
        this.form.cardBack = response.obj.path;
        this.formImgUrl.cardBack = this.imgFil(response.obj.path)
      },

      // 门头照
      merchantHeadUpload(response, file) {
        console.log(response);
        this.$message({
          message: '门头照上传成功',
          type: 'success'
        });
        this.form.merchantHead = response.obj.path;
        this.formImgUrl.merchantHead = this.imgFil(response.obj.path)
      },

      // 经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所照上传成功',
          type: 'success'
        });
        this.form.otherPhoto3 = response.obj.path;
        this.formImgUrl.otherPhoto3 = this.imgFil(response.obj.path)
      },

      // 收银台照
      merchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收银台照上传成功',
          type: 'success'
        });
        this.form.merchantCheck = response.obj.path;
        this.formImgUrl.merchantCheck = this.imgFil(response.obj.path)
      },

      // 手持身份证照片
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照片上传成功',
          type: 'success'
        });
        this.form.identityBody = response.obj.path;
        this.formImgUrl.identityBody = this.imgFil(response.obj.path)
      },

      // 收单业务协议照片
      receiptBusinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收单业务协议照片上传成功',
          type: 'success'
        });
        this.form.receiptBusiness = response.obj.path;
        this.formImgUrl.receiptBusiness = this.imgFil(response.obj.path)
      },

      // 开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照上传成功',
          type: 'success'
        });
        this.form.bussinessCard = response.obj.path;
        this.formImgUrl.bussinessCard = this.imgFil(response.obj.path)
      },
      // 结算授权书
      priauthUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算授权书照上传成功',
          type: 'success'
        });
        this.form.priauth = response.obj.path;
        this.formImgUrl.priauth = this.imgFil(response.obj.path)
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
          this.$message.error('只允许图片格式 如jpg / jpeg / png');
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
        let id = this.urlid; // 获取本商户id
        this.btnLoading = true;
        ysRegister(id).then(res => {
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

        let id = this.urlid; // 获取本商户id
        this.btnLoading = true;
        ysImageRegister(id).then(res => {
          this.$message.success('图片进件资料提交第三方成功');

          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
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
  }

  .info {
    padding: 0 16px;
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

  .tips {
    padding: 0 0 0 8px;
    font-size: 12px;
    color: #8f8f8f;
  }

  .tips-warning {
    color: #E6A23C;
  }

  .bank-search {
    width: 200px;
    max-width: 100%;
  }
</style>
