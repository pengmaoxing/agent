<template>
  <div v-loading="loading">
    <p class="cus-title">当前是{{payChannelName}}进件</p>
    <el-form ref="addForm" :rules="rules" :model="addForm" :label-width="labelWidth" size="small">
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>结算信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单-->
        <!--<div>
                    <el-form-item label="进件情况：" prop="licenseType">
                      <el-radio v-model="isIncoming" :label="'0'">未进件</el-radio>
                      <el-radio v-model="isIncoming" :label="'1'">已进件</el-radio>
                    </el-form-item>
                </div>-->
        <div v-if="isIncoming == '0'"><!-- 未进件时显示表单 -->
          <div class="info">
            <p>基本信息</p>
          </div>
          <el-form-item label="证件类型：" prop="licenseType">
            <el-radio v-model="addForm.licenseType" :label="'1'">企业（三证合一）</el-radio>
            <el-radio v-model="addForm.licenseType" :label="'B'">个体户（三证合一）</el-radio>
            <el-radio v-model="addForm.licenseType" :label="'A'">个人</el-radio>
            <el-radio v-model="addForm.licenseType" :label="'0'">
              营业执照
              <el-tooltip class="item" effect="dark" content="企业或个体不是三证合一的营业执照" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </el-radio>
            <el-radio v-model="addForm.licenseType" :label="'2'">事业单位</el-radio>
          </el-form-item>

          <el-form-item label="证件号码：" prop="licenseNo">
            <el-input v-model="addForm.licenseNo"
                      placeholder="有营业执照填写注册号，无营业执照填写身份证号"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="证件有效期：">
            <template v-if="!licenseTimeMode">
              <el-form-item prop="licenseStartDt" class="block">
                <el-date-picker
                  v-model="addForm.licenseStartDt"
                  type="date"
                  placeholder="选择证件起始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
              至
              <el-form-item prop="licenseExpireDt" class="block">
                <el-date-picker
                  v-model="addForm.licenseExpireDt"
                  type="date"
                  placeholder="选择证件到期日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </template>
            <el-checkbox v-model="licenseTimeMode">长期</el-checkbox>
          </el-form-item>
          <el-form-item label="营业执照注册地址：" prop="licRegisAddr">
            <el-input v-model="addForm.licRegisAddr"
                      placeholder="营业执照注册地址"
                      class="input-width">
            </el-input>
          </el-form-item>
          <el-form-item label="商户名：" prop="mchntName">
            <el-input v-model="addForm.mchntName"
                      placeholder="商户名"
                      class="input-width">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人身份证：" prop="contactCertNo">
            <el-input v-model="addForm.contactCertNo"
                      placeholder="联系人身份证"
                      class="input-width">
            </el-input>
          </el-form-item>
          <el-form-item label="经营范围代码：" prop="business">
            <el-input v-model="addForm.business"
                      placeholder="经营范围代码"
                      class="input-width">
            </el-input>
            <span class="tips">查询经营范围代码：</span>
            <el-select
              v-model="businessTempCode"
              filterable
              @change="setBusinessCode"
              :clearable="true"
              remote
              reserve-keyword
              placeholder="请输入经营范围搜索"
              :remote-method="businessRemoteMethod"
              :loading="btnLoading">
              <el-option
                v-for="(item,index) in businessCode"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="tips"> 完整参考附件<a style="color: #1e6abc" @click="downloadFile('fyBusiness')"> 下载</a></span>
          </el-form-item>

          <el-form-item label="市代码：" prop="cityCd">
            <el-input v-model="addForm.cityCd"
                      placeholder="市代码"
                      class="input-width">
            </el-input>
            <span class="tips">查询市代码：</span>
            <el-select
              v-model="cityTempCode"
              filterable
              @change="setCityCode"
              :clearable="true"
              remote
              reserve-keyword
              placeholder="请输入市名搜索"
              :remote-method="cityRemoteMethod"
              :loading="btnLoading">
              <el-option
                v-for="(item,index) in cityCode"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>

            <!--<span class="tips"> 市代码参考附件<a style="color: #1e6abc" @click="downloadFile('fyLocal')"> 下载</a></span>-->
          </el-form-item>

          <el-form-item label="区县代码：" prop="countyCd">
            <el-input v-model="addForm.countyCd"
                      placeholder="区县代码"
                      class="input-width">
            </el-input>
            <span class="tips">查询区县代码：</span>
            <el-select
              v-model="countyTempCode"
              filterable
              @change="setCountyCode"
              :clearable="true"
              remote
              reserve-keyword
              :disabled="!cityTempCode"
              placeholder="先搜索市，再搜索区县"
              :remote-method="countyRemoteMethod"
              :loading="btnLoading">
              <el-option
                v-for="(item,index) in countyCode"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<span class="tips"> 区县代码参考附件<a style="color: #1e6abc" @click="downloadFile('fyLocal')"> 下载</a></span>-->
          </el-form-item>

          <div class="info">
            <p>法人信息</p>
          </div>
          <el-form-item label="法人姓名：" prop="artifNm">
            <el-input v-model="addForm.artifNm"
                      placeholder="法人姓名"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="法人身份证号：" prop="certifId">
            <el-input v-model="addForm.certifId"
                      placeholder="法人身份证号"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="法人身份证到期时间：">
            <template v-if="!LegalTimeMode">
              <el-form-item prop="cardStartDt" class="block">
                <el-date-picker
                  v-model="addForm.cardStartDt"
                  type="date"
                  placeholder="选择证件起始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
              至
              <el-form-item prop="certifIdExpireDt" class="block">
                <el-date-picker
                  v-model="addForm.certifIdExpireDt"
                  type="date"
                  placeholder="选择证件到期日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </template>
            <el-checkbox v-model="LegalTimeMode">长期</el-checkbox>
          </el-form-item>

          <div class="info">
            <p>结算信息</p>
          </div>
          <el-form-item label="对公对私：" prop="acntType">
            <el-radio v-model="addForm.acntType" :label="'1'">对公</el-radio>
            <el-radio v-model="addForm.acntType" :label="'2'">对私</el-radio>
          </el-form-item>
          <el-form-item label="行别：" prop="bankType">
            <!--<el-input v-model="addForm.bankType"-->
            <!--placeholder="行别,对公必填"-->
            <!--class="input-width">-->
            <!--</el-input>-->
            <el-select v-model="addForm.bankType" placeholder="行别,对公必填">
              <el-option
                v-for="item in backNameCode"
                :key="item.bankcode"
                :label="item.bankname"
                :value="item.bankcode">
              </el-option>
            </el-select>
            <span class="tips" v-show="addForm.bankType">当前行别代码：{{addForm.bankType}}</span>
            <!--<span class="tips"> 行别参考附件<a style="color: #1e6abc" @click="downloadFile('fyBankNickname')"> 下载</a></span>-->
          </el-form-item>

          <el-form-item label="入账卡开户行联行号：" prop="interBankNo">
            <el-input v-model="addForm.interBankNo"
                      placeholder="入账卡开户行联行号,参考附件或咨询您的开户行"
                      class="input-width">
            </el-input>
            <span class="tips"> 联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 下载</a></span>
          </el-form-item>

          <el-form-item label="入账卡开户行名称：" prop="issBankNm">
            <el-input v-model="addForm.issBankNm"
                      placeholder="入账卡开户行名称"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="入账卡户名：" prop="acntNm">
            <el-input v-model="addForm.acntNm"
                      placeholder="入账卡户名"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="入账卡号：" prop="acntNo">
            <el-input v-model="addForm.acntNo"
                      placeholder="开户银行"
                      class="input-width">
            </el-input>
          </el-form-item>


          <el-form-item label="法人入账标识：" prop="acntArtifFlag">
            <el-radio v-model="addForm.acntArtifFlag" :label="'0'">非法人入账</el-radio>
            <el-radio v-model="addForm.acntArtifFlag" :label="'1'">法人入账</el-radio>
          </el-form-item>
          <el-form-item label="入账证件类型：" prop="acntCertifTp">
            <el-radio v-model="addForm.acntCertifTp" :label="'0'">身份证</el-radio>
          </el-form-item>

          <el-form-item label="入账证件号：" prop="acntCertifId">
            <el-input v-model="addForm.acntCertifId"
                      placeholder="入账证件号,非法人必填"
                      class="input-width">
            </el-input>
          </el-form-item>

          <el-form-item label="入账证件到期日：">
            <el-form-item prop="acntCertifExpireDt" class="block" v-if="!accountEntryTimeMode">
              <el-date-picker
                v-model="addForm.acntCertifExpireDt"
                type="date"
                placeholder="选择证件到期日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
            <el-checkbox v-model="accountEntryTimeMode">长期</el-checkbox>
          </el-form-item>

          <el-form-item label="是否开通微信：" prop="wxFlag">
            <el-radio v-model="addForm.wxFlag" :label="'0'">不开通</el-radio>
            <el-radio v-model="addForm.wxFlag" :label="'1'">开通</el-radio>
          </el-form-item>
          <div divName="开通" v-if="addForm.wxFlag=='1'">
            <!--<el-form-item label="微信扣率代码：" prop="wxSetCd">-->
            <!--<el-input v-model="addForm.wxSetCd"-->
            <!--placeholder="微信扣率代码"-->
            <!--class="input-width">-->
            <!--</el-input>-->
            <!--<span class="tips"> 扣率参考附件<a style="color: #1e6abc"-->
            <!--@click="downloadFile('fyDeductionRate')"> 下载</a></span>-->
            <!--</el-form-item>-->
            <el-form-item label="微信扣率代码：" prop="wxSetCd">
              <el-select v-model="addForm.wxSetCd" clearable filterable placeholder="请选择或搜索扣率模板">
                <el-option
                  v-for="item in cdSelect"
                  :key="item.TEMPLATE_CD"
                  :label="item.TEMPLATE_NM"
                  :value="item.TEMPLATE_CD">
                  <span style="float: left">{{ item.TEMPLATE_NM }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px;padding:0 5px ">{{ item.TEMPLATE_CD }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="是否开通支付宝：" prop="aliFlag">
            <el-radio v-model="addForm.aliFlag" :label="'0'">不开通</el-radio>
            <el-radio v-model="addForm.aliFlag" :label="'1'">开通</el-radio>
          </el-form-item>
          <div divName="开通" v-if="addForm.aliFlag=='1'">
            <!--<el-form-item label="支付宝扣率代码：" prop="aliSetCd">-->
            <!--<el-input v-model="addForm.aliSetCd"-->
            <!--placeholder="支付宝扣率代码"-->
            <!--class="input-width">-->
            <!--</el-input>-->
            <!--<span class="tips"> 扣率参考附件<a style="color: #1e6abc"-->
            <!--@click="downloadFile('fyDeductionRate')"> 下载</a></span>-->
            <!--</el-form-item>-->
            <el-form-item label="支付宝扣率代码：" prop="aliSetCd">
              <el-select v-model="addForm.aliSetCd" clearable filterable placeholder="请选择或搜索扣率模板">
                <el-option
                  v-for="item in cdSelect"
                  :key="item.TEMPLATE_CD"
                  :label="item.TEMPLATE_NM"
                  :value="item.TEMPLATE_CD">
                  <span style="float: left">{{ item.TEMPLATE_NM }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px;padding:0 5px ">{{ item.TEMPLATE_CD }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- <el-form-item label="是否开通qq钱包：" prop="qpayFlag">
                      <el-radio v-model="addForm.qpayFlag" :label="'0'">不开通</el-radio>
                      <el-radio v-model="addForm.qpayFlag" :label="'1'">开通</el-radio>
                    </el-form-item>
                    <div divName="开通" v-if="addForm.qpayFlag=='1'">
                        <el-form-item label="qq钱包扣率：" prop="qpaySetCd">
                          <el-input v-model="addForm.qpaySetCd"
                                    placeholder="qq钱包扣率"
                                    class="input-width">
                          </el-input>
                            <span class="tips"> 扣率参考附件<a style="color: #1e6abc" @click="downloadFile('fyDeductionRate')"> 下载</a></span>
                        </el-form-item>
                    </div>

                    <el-form-item label="是否开通京东钱包：" prop="jdpayFlag">
                      <el-radio v-model="addForm.jdpayFlag" :label="'0'">不开通</el-radio>
                      <el-radio v-model="addForm.jdpayFlag" :label="'1'">开通</el-radio>
                    </el-form-item>
                    <div divName="开通" v-if="addForm.jdpayFlag=='1'">
                        <el-form-item label="京东扣率代码：" prop="jdpaySetCd">
                          <el-input v-model="addForm.jdpaySetCd"
                                    placeholder="京东扣率代码"
                                    class="input-width">
                          </el-input>
                            <span class="tips"> 扣率参考附件<a style="color: #1e6abc" @click="downloadFile('fyDeductionRate')"> 下载</a></span>
                        </el-form-item>
                    </div> -->

          <el-form-item label="清算类型：" prop="settleTp">
            <el-radio v-model="addForm.settleTp" :label="'1'">自动结算(T1)</el-radio>
            <el-radio v-model="addForm.settleTp" :disabled="true" :label="'2'">手动结算</el-radio>
            <el-radio v-model="addForm.settleTp" :disabled="true" :label="'3'">自动结算(D1)</el-radio>
            <el-radio v-model="addForm.settleTp" :disabled="true" :label="'4'">定时结算</el-radio>
          </el-form-item>

          <el-form-item label="清算扣率：" prop="settleTpCd" v-if="addForm.settleTp == '3' || addForm.settleTp == '4'">
            <el-input v-model="addForm.settleTpCd"
                      placeholder="d0扣率模板,自动结算(D1)与定时结算必填"
                      class="input-width">
            </el-input>
            <span class="tips"> 扣率参考附件<a style="color: #1e6abc" @click="downloadFile('fyDeductionRate')"> 下载</a></span>
          </el-form-item>

          <el-form-item label="清算时间：" v-if="addForm.settleTp == '4'">
            <el-form-item prop="settleTs" class="block">
              <el-date-picker
                v-model="addForm.settleTs"
                type="date"
                placeholder="选择清算日期,定时结算必填"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <div v-if="(addForm.licenseType == '0' || addForm.licenseType == '1') && addForm.acntType == '2'">

            <el-form-item label="双账户:" prop="bankType">
              <el-checkbox v-model="addForm.hasReserveAcnt" :true-label="'1'" :false-label="'0'">启用</el-checkbox>
            </el-form-item>
            <div v-if="addForm.hasReserveAcnt == '1'">
              <el-form-item label="行别：" prop="reserveBankType">
                <el-input v-model="addForm.reserveBankType"
                          placeholder="行别"
                          class="input-width">
                </el-input>
                <span class="tips"> 行别参考附件<a style="color: #1e6abc"
                                             @click="downloadFile('fyBankNickname')"> 下载</a></span>
              </el-form-item>

              <el-form-item label="对公开户行联行号：" prop="reserveInterBankNo">
                <el-input v-model="addForm.reserveInterBankNo"
                          placeholder="对公开户行联行号,参考附件或咨询您的开户行"
                          class="input-width">
                </el-input>
                <span class="tips"> 联行号参考附件<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 下载</a></span>
              </el-form-item>

              <el-form-item label="对公开户行名称：" prop="reserveIssBankNm">
                <el-input v-model="addForm.reserveIssBankNm"
                          placeholder="对公开户行名称"
                          class="input-width">
                </el-input>
              </el-form-item>

              <el-form-item label="对公户名：" prop="reserveAcntNm">
                <el-input v-model="addForm.reserveAcntNm"
                          placeholder="对公户名"
                          class="input-width">
                </el-input>
              </el-form-item>

              <el-form-item label="对公账号：" prop="reserveAcntNo">
                <el-input v-model="addForm.reserveAcntNo"
                          placeholder="开户银行"
                          class="input-width">
                </el-input>
              </el-form-item>
            </div>
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
              <!--增加提示 包围-->
              <el-tooltip :content="`建议费率 例如：0.38`" effect="light" placement="top">
                <el-input-number v-model="item.value" :min="0" :max="50" :precision="2" :step="0.01"
                                 :placeholder="payChannelName + item.name+'结算费率 例如：0.38'"
                                 class="input-width">
                  <!--<template slot="append"></template>-->
                </el-input-number>
                %
              </el-tooltip>

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

            <!--结算人身份证正面照(非法人入账)-->
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

            <!--结算人身份证反面照(非法人入账)-->
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

            <!--组织机构代码证图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>组织机构代码证图片</span>
                  <span v-if="formImgUrl.organizationCodeId!=''">&nbsp</span>
                  <span v-if="formImgUrl.organizationCodeId!=''"
                        :class="{'up-success':formImgUrl.organizationCodeId!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="organizationCodeIdUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.organizationCodeId" :src="formImgUrl.organizationCodeId" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--税务登记证图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>税务登记证图片</span>
                  <span v-if="formImgUrl.registrationCodeId!=''">&nbsp</span>
                  <span v-if="formImgUrl.registrationCodeId!=''"
                        :class="{'up-success':formImgUrl.registrationCodeId!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="registrationCodeIdUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.registrationCodeId" :src="formImgUrl.registrationCodeId" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--事业单位证明函图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>事业单位证明函图片</span>
                  <span v-if="formImgUrl.certificateInstitution!=''">&nbsp</span>
                  <span v-if="formImgUrl.certificateInstitution!=''"
                        :class="{'up-success':formImgUrl.certificateInstitution!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="certificateInstitutionUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.certificateInstitution" :src="formImgUrl.certificateInstitution" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--经营许可证图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>经营许可证图片</span>
                  <span v-if="formImgUrl.businessLicense!=''">&nbsp</span>
                  <span v-if="formImgUrl.businessLicense!=''"
                        :class="{'up-success':formImgUrl.businessLicense!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="businessLicenseUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.businessLicense" :src="formImgUrl.businessLicense" class="logo">
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
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">保存并审核通过
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="fileSubmit">提交文字资料
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="imgFileSubmit">提交图片资料
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="categorySubmit">修改经营范围代码</el-button>
        </div>
      </el-card>


    </el-form>
    <p class="cus-title">当前是{{payChannelName}}进件</p>

  </div>
</template>

<script>
  import typeJson from '@/assets/merchantType/merchantType.json' //商户类型数据
  import cityJson from '@/assets/city/city.json' //地域数据
  import feecode from '@/assets/feeModel/feecode.json' //扣率数据
  import bankNameCode from '@/assets/fy_bank_main_code/code.json' //行别数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  import {
    getPlantInfo,
    getFyInfo,
    updateMerchant,
    findPayType,
    modifyMerchant,
    findPayTypeByChannel,
    getFyIncomingInfo,
    saveFyIncomingInfo,
    uploadFyIncomingTextInfo,
    uploadFyIncomingPhotoInfo,
    getCityCode,
    getCountyCode,
    getBusinessCode, updateCategoryCode
  } from '../api/fy'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'
  import {mixins} from "../../mixins/mixins";


  export default {
    name: "addMerchant",
    mixins: [mixins],
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {
      var checkLicenseNo = (rule, value, callback) => {
        if (this.addForm.licenseType == 'A') {
          let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
          if (!reg.test(value)) {
            callback(new Error('身份证号格式错误'))
          } else {
            callback()
          }
        } else {
          callback()
        }

      };
      var checkLicRegisAddr = (rule, value, callback) => {
        if (this.addForm.licenseType == 'A') {//身份证选填
          callback()
        } else {
          if (this.addForm.licRegisAddr == '') {
            callback(new Error('请填写营业执照注册地址'))
          } else {
            callback()
          }
        }
      };
      var checkBankType = (rule, value, callback) => {
        if (this.addForm.acntType == '1' && this.addForm.bankType.trim() == '') {
          callback(new Error('请填写行别'))
        } else {
          callback()
        }

      };
      var checkCertifId = (rule, value, callback) => {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('身份证号格式错误'))
        } else {
          callback()
        }
      };
      var checkAcntNo = (rule, value, callback) => {
        let reg = /^[0-9]*$/;
        if (!reg.test(value)) {
          callback(new Error('入账卡号含数字外字符'))
        } else {
          callback()
        }

      };
      var checkAcntCertifId = (rule, value, callback) => {
        //身份证号验证
        if (this.addForm.acntCertifTp != '0') {
          callback()
        }
        if (this.addForm.acntCertifId.trim() == '') {
          callback('请填写证件号')
        }
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('证件号格式错误'))
        } else {
          callback()
        }

      };
      var checkAacntCertifExpireDt = (rule, value, callback) => {
        if (this.addForm.acntCertifTp != '0') {
          callback()
        }
        if (this.addForm.acntArtifFlag != '0') {
          callback()
        }
        if (this.addForm.acntCertifExpireDt.trim() == '') {
          callback('请填写入账证件到期日')
        } else {
          callback()
        }

      };
      var checkWxSetCd = (rule, value, callback) => {
        if (this.addForm.wxFlag == '1' && this.addForm.wxSetCd.trim() == '') {
          callback(new Error('请填写微信扣率代码'))
        } else {
          callback()
        }

      };
      var checkAliSetCd = (rule, value, callback) => {
        if (this.addForm.aliFlag == '1' && this.addForm.aliSetCd.trim() == '') {
          callback(new Error('请填写支付宝扣率代码'))
        } else {
          callback()
        }

      };
      var checkQpaySetCd = (rule, value, callback) => {
        if (this.addForm.qpayFlag == '1' && this.addForm.qpaySetCd.trim() == '') {
          callback(new Error('请填写qq钱包扣率代码'))
        } else {
          callback()
        }

      };
      var checkJdpaySetCd = (rule, value, callback) => {
        if (this.addForm.jdpayFlag == '1' && this.addForm.jdpaySetCd.trim() == '') {
          callback(new Error('请填写京东扣率代码'))
        } else {
          callback()
        }

      };
      var checkSettleTpCd = (rule, value, callback) => {
        if ((this.addForm.settleTp == '3' || this.addForm.settleTp == '4') && this.addForm.settleTpCd.trim() == '') {
          callback(new Error('请填写清算扣率'))
        } else {
          callback()
        }

      };
      var checkSettleTs = (rule, value, callback) => {
        if (this.addForm.settleTp == '4' && this.addForm.settleTs.trim() == '') {
          callback(new Error('请填写清算时间'))
        } else {
          callback()
        }
      };
      return {
        loading: false,
        labelWidth: '370px',
        btnLoading: false,
        isIncoming: '0', // 商户进件情况 0-未进件 1-已进件  已进件情况下无需填写进件信息
        addForm: {
          id: '',

          /* 张昊天修改 2019.8.19~ */

          mchntName: '', //商户名
          contactCertNo: '', //联系人身份证号码
          licRegisAddr: '', //营业执照注册地址

          //
          licenseType: '0', // 证件类型 0 1 A B
          licenseNo: '', // 证件号码（根据证件类型填写相应的号码）
          licenseStartDt: '', // 证件开始日期（根据证件类型填写相应的日期）
          licenseExpireDt: '', // 证件到期日期（根据证件类型填写相应的日期）

          //
          business: '', // 经营范围代码
          cityCd: '', // 市代码
          countyCd: '', // 区县代码

          //
          acntType: '1', //入账卡类型 1对公 2对私
          bankType: '', // 行别（对公必填）
          interBankNo: '', // 入账卡开户行联行号
          issBankNm: '', // 入账卡开户行名称
          acntNm: '', // 入账卡户名
          acntNo: '', // 入账卡号
          artifNm: '', // 法人姓名
          acntArtifFlag: '0', // 法人入账标识 0非法人 1法人
          certifId: '', // 法人身份证号
          cardStartDt: '', // 法人身份证开始时间
          certifIdExpireDt: '', // 法人身份证到期时间
          acntCertifTp: '0', // 入账证件类型("0"身份证)
          acntCertifId: '', // 入账证件号
          acntCertifExpireDt: '', // 入账证件到期日

          wxFlag: '0', // 是否开通微信
          wxSetCd: '', // 微信扣率代码

          aliFlag: '0', // 是否开通支付宝
          aliSetCd: '', // 支付宝扣率代码

          qpayFlag: '0', // 是否开通qq钱包
          qpaySetCd: '', // 条件填写qq钱包扣率

          jdpayFlag: '0', // 是否开通京东钱包
          jdpaySetCd: '', // 京东扣率代码

          settleTp: '1', // 清算类型
          settleTpCd: '', // 清算类型3或者4必填     清算扣率 d0扣率模板
          settleTs: '', // 清算类型4时必填清算时间

          hasReserveAcnt: '0', //双账户，仅可在企业营业执照且对私时启用 0不启用 1启用
          reserveBankType: '', //双账户-行别
          reserveInterBankNo: '', //双账户-入账卡联行号
          reserveIssBankNm: '', //双账户-入账卡开户行名
          reserveAcntNo: '', //双账户-入账卡户名
          reserveAcntNm: '', //双账户-入账卡卡号

          /* ~张昊天修改 2019.8.19 */

          // intoType: 1,//对公对私 1公 2私

//         //对公
//         pubOutletName: '', //对公账户名
//         pubOutletCity: '', //对公开户城市
//         pubOutletBank: '',
//         pubOutlet: '',
//         pubBankAcct: '',
//         pubUnionpayNum: '',
//
//         //对私
//         priName: '', //对私账户名
//         priPhone: '', //结算手机号
//         priIdNum: '', //结算身份证
//         priBankCardNum: '', //结算卡号
//         priBankName: '', //结算银行
//         priBankOutlet: '', //结算支行
//         priUnionpayNum: '', //结算联行号

          // 图片id
          merchantHead: '', //门头照
          otherPhoto3: '', //经营场所照
          identityFace: '', //法人身份证正面照(面部)
          identityBack: '', //法人身份证反面照(国徽)
          bussinessCard: '', //开户许可证照
          bussiness: '', //营业执照照片
          identityFaceCopy: '', //结算人身份证正面照
          identityBackCopy: '', //结算人身份证反面照
          identityBody: '', //手持身份证照片
          priAuth: '', //非法人对私授权函
          cardFace: '', //银行卡
          other1: '', //其他资料1
          organizationCodeId: '', //组织机构代码证图片
          registrationCodeId: '', //税务登记证图片
          certificateInstitution: '', // 事业单位证明函
          businessLicense: '', // 经营许可证

          merchantId: '',
          // companyId: '', //运营商或者渠道商id
          // managerId: '', //业务员id
          status: '1', //正常状态

        },
        LegalTimeMode: false, //法人身份证有效期模式 0非长期 1长期
        licenseTimeMode: false, //营业执照有效期模式 0非长期 1长期
        accountEntryTimeMode: false, //入账证件有效期模式 0非长期 1长期


        // 图片临时
        formImgUrl: {
          merchantHead: '',
          otherPhoto3: '',
          identityFace: '',
          identityBack: '',
          bussinessCard: '',
          bussiness: '',
          identityFaceCopy: '',
          identityBackCopy: '',
          identityBody: '',
          priAuth: '',
          cardFace: '',
          other1: '', //其他资料
          organizationCodeId: '',
          registrationCodeId: '',
          certificateInstitution: '',
          businessLicense: '',

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


        //test
        fee: '',

        //校验
        rules: {
          mchntName: [
            {required: true, message: '请填写商户名', trigger: 'blur'},
          ],
          contactCertNo: [
            {required: true, message: '请填写联系人身份证号码', trigger: 'blur'},
            {validator: checkCertifId, trigger: 'blur'}
          ],
          licenseNo: [
            {required: true, message: '请填写证件号码', trigger: 'blur'},
            {validator: checkLicenseNo, trigger: 'blur'}
          ],
          licRegisAddr: [
            {validator: checkLicRegisAddr, trigger: 'blur'}
          ],
          licenseStartDt: [
            {required: true, message: '请选择证件开始日期', trigger: 'blur'},
          ],
          licenseExpireDt: [
            {required: true, message: '请选择证件到期日期', trigger: 'blur'},
          ],
          business: [
            {required: true, message: '请填写经营范围代码', trigger: 'blur'},
          ],
          cityCd: [
            {required: true, message: '请填写市代码', trigger: 'blur'},
          ],
          countyCd: [
            {required: true, message: '请填写区县代码', trigger: 'blur'},
          ],
          bankType: [
            {validator: checkBankType, trigger: 'blur'}
          ],
          interBankNo: [
            {required: true, message: '请填写入账卡开户行联行号', trigger: 'blur'},
          ],
          issBankNm: [
            {required: true, message: '请填写入账卡开户行名称', trigger: 'blur'},
          ],
          acntNm: [
            {required: true, message: '请填写入账卡户名', trigger: 'blur'},
          ],
          acntNo: [
            {required: true, message: '请填写入账卡号', trigger: 'blur'},
            {validator: checkAcntNo, trigger: 'blur'}
          ],
          artifNm: [
            {required: true, message: '请填写法人姓名', trigger: 'blur'},
          ],
          certifId: [
            {required: true, message: '请填写法人身份证号', trigger: 'blur'},
            {validator: checkCertifId, trigger: 'blur'}
          ],
          cardStartDt: [
            {required: true, message: '请选择法人身份证开始时间', trigger: 'blur'},
          ],
          certifIdExpireDt: [
            {required: true, message: '请选择法人身份证到期时间', trigger: 'blur'},
          ],
          acntCertifId: [
            {validator: checkAcntCertifId, trigger: 'blur'}
          ],
          acntCertifExpireDt: [
            {required: true, message: '请选择入账证明到期时间', trigger: 'blur'},
            // {validator: checkAacntCertifExpireDt, trigger: 'blur'},
          ],
          wxSetCd: [
            {validator: checkWxSetCd, trigger: 'blur'},
          ],
          aliSetCd: [
            {validator: checkAliSetCd, trigger: 'blur'},
          ],
          qpaySetCd: [
            {validator: checkQpaySetCd, trigger: 'blur'},
          ],
          jdpaySetCd: [
            {validator: checkJdpaySetCd, trigger: 'blur'},
          ],
          settleTpCd: [
            {validator: checkSettleTpCd, trigger: 'blur'},
          ],
          settleTs: [
            {validator: checkSettleTs, trigger: 'blur'},
          ],
          reserveBankType: [
            {required: true, message: '请输入行别', trigger: 'blur'},
          ],
          reserveInterBankNo: [
            {required: true, message: '请输入请填写入账卡开户行联行号', trigger: 'blur'},
          ],
          reserveIssBankNm: [
            {required: true, message: '请选择请填写入账卡开户行名称', trigger: 'blur'},
          ],
          reserveAcntNo: [
            {required: true, message: '请选择请填写入账卡户名', trigger: 'blur'},
          ],
          reserveAcntNm: [
            {required: true, message: '请选择请填写入账卡号', trigger: 'blur'},
          ],
        },

        //applyId
        applyId: '',

        //扣率模板
        cdSelect: feecode,
        //银行行别模板
        backNameCode: bankNameCode,

        //市县区代码
        cityCode: [],
        countyCode: [],
        cityTempCode: '',
        countyTempCode: '',

        //经营代码
        businessCode: [],
        businessTempCode: '',


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
       * 代码搜索
       */
      cityRemoteMethod: function (query) {
        if (query !== '') {
          this.btnLoading = true;
          getCityCode(query).then(res => {
            let data = res.obj;
            this.cityCode = data.filter(item => {
              return item //无需再过滤一遍
            });
            this.countyCode = [];
            this.countyTempCode = '';
            this.btnLoading = false
          }).catch(e => {
            this.btnLoading = false
          })
        } else {
          this.countyTempCode = '';
          this.cityCode = [];
        }
      },
      setCityCode: function () {
        let code = this.cityTempCode;
        if (code) {
          this.addForm.cityCd = code
        }
      },
      countyRemoteMethod: function (query) {
        let cityCode = this.cityTempCode;
        if (query !== '' && cityCode) {
          this.btnLoading = true;
          getCountyCode(query, cityCode).then(res => {
            let data = res.obj;
            this.countyCode = data.filter(item => {
              return item //无需再过滤一遍
            });
            this.btnLoading = false
          }).catch(e => {
            this.btnLoading = false
          })
        } else {
          this.countyCode = [];
        }
      },
      setCountyCode: function () {
        let code = this.countyTempCode;
        if (code) {
          this.addForm.countyCd = code
        }
      },

      /**
       * 经营代码
       */
      businessRemoteMethod: function (query) {
        if (query !== '') {
          this.btnLoading = true;
          getBusinessCode(query).then(res => {
            let data = res.obj;
            this.businessCode = data.filter(item => {
              return item //无需再过滤一遍
            });
            this.btnLoading = false
          }).catch(e => {
            this.btnLoading = false
          })
        } else {
          this.businessCode = [];
        }
      },
      setBusinessCode: function () {
        let code = this.businessTempCode;
        if (code) {
          this.addForm.business = code
        }
      },


      /**
       * 获取资料
       */
      getMerchantDetail: function (id) {
        if (this.mode === 'new') {
          this.newAddMerchantInfo(id)
        } else if (this.mode === 'add') {
          if (this.status !== 2) {
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
        /* 张昊天修改 2019.8.19~ */
        getFyIncomingInfo(this.urlid).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        });
        return;
        /* ~张昊天修改 2019.8.19 */
        getPlantInfo(this.urlid).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },
      //编辑拉取已进件资料
      modifyMerchantInfo: function (id) {
        /* 张昊天修改 2019.8.19~ */
        getFyIncomingInfo(this.urlid).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        });
        return;
        /* ~张昊天修改 2019.8.19 */
        getFyInfo(this.urlid, this.payChannel).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },
      //审核模式拉取资料
      verifyMerchantInfo: function (id) {
        /* 张昊天修改 2019.8.19~ */
        getFyIncomingInfo(this.urlid).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        });
        return;
        /* ~张昊天修改 2019.8.19 */
        getFyInfo(this.urlid, this.payChannel).then(res => {
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
      dataCollationBefore: function () {
        this.btnLoading = true;
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.dataCollation()
          } else {
            this.btnLoading = false;
            this.$message.error('还有内容未填写');
            return false;
          }
        });
      },
      dataCollation: function () {
        try {
          let form;
          form = this.deepCopy(this.addForm);

          //处理日期为长期的情况
          if (this.LegalTimeMode) {
            form.cardStartDt = '19000101'
          }
          if (this.LegalTimeMode) {
            form.certifIdExpireDt = '20991231'
          }
          if (this.licenseTimeMode) {
            form.licenseStartDt = '19000101'
          }
          if (this.licenseTimeMode) {
            form.licenseExpireDt = '20991231'
          }
          if (this.accountEntryTimeMode) {
            form.acntCertifExpireDt = '20991231'
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

        } catch (e) {
          console.log(e)
          this.btnLoading = false;
        }

      },
      /**
       * 提交新进件资料
       */
      submitAddData: function (form) {
        if (this.isIncoming == '1') { // 无需进件，只修改费率
          this.branching();
          return
        }
        this.btnLoading = true;
        saveFyIncomingInfo(JSON.stringify(form)).then(res => {
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

        if (this.isIncoming == '1') { // 无需进件，只修改费率
          if (this.mode === 'verify') {
            this.verifyOK();
          } else {
            this.branching() //根据mode决定走向
          }
          return
        }
        saveFyIncomingInfo(JSON.stringify(form), this.payChannel).then(res => {
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
          this.$emit('next');
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
       * 回显资料
       * 张昊天于2019.8.20修改
       */
      autoInputData: function (data) {

        let fuiouMchInfo = data.fuiouMchInfo;
        let fuiouMchPhoto = data.fuiouMchPhoto;

        if (fuiouMchInfo != null && fuiouMchInfo != '') {
          let data = fuiouMchInfo;

          this.addForm.merchantId = data.merchantId;
          this.addForm.id = data.id || '';

          //
          // this.addForm.name = data.name || '';
          // this.addForm.shortName = data.shortName || '';
          // this.addForm.customerPhone = data.customerPhone || '';
          // this.addForm.email = data.email || '';
          // this.addForm.businessLevOne = data.businessLevOne || '';
          // this.getType1(data.businessLevOne);
          // this.addForm.businessLevTwo = data.businessLevTwo || '';
          // this.getType2(data.businessLevTwo);
          // this.addForm.businessLevThree = data.businessLevThree || '';
          //
          // this.addForm.province = data.province || '';
          // this.getProv(data.province);
          // this.addForm.city = data.city || '';
          // this.getCity(data.city);
          // this.addForm.area = data.area || '';
          // this.addForm.address = data.address || '';
          //
          //
          // this.addForm.contact = data.contact || '';
          // this.addForm.phone = data.phone || '';
          // this.addForm.legalName = data.legalName || '';
          // this.addForm.legalPhone = data.legalPhone || '';
          // this.addForm.legalIdNum = data.legalIdNum || '';
          // this.addForm.startLegalTime = data.startLegalTime || '';
          // this.addForm.endLegalTime = data.endLegalTime || '';
          if (data.certifIdExpireDt === '20991231') {
            this.LegalTimeMode = true
          }
          //
          // this.addForm.license = data.license || '';
          // this.addForm.startLicenseTime = data.startLicenseTime || '';
          // this.addForm.endLicenseTime = data.endLicenseTime || '';
          if (data.licenseExpireDt === '20991231') {
            this.licenseTimeMode = true
          }
          if (data.acntCertifExpireDt === '20991231') {
            this.accountEntryTimeMode = true
          }
          //
          // this.addForm.companyId = data.companyId;
          // this.addForm.managerId = data.managerId;


          //         this.addForm.intoType = data.intoType || '';
          //
          //         if (data.intoType == 1) {
          //           this.addForm.pubOutletName = data.pubOutletName || '';
          //           this.addForm.pubOutletCity = data.pubOutletCity || '';
          //           this.addForm.pubOutletBank = data.pubOutletBank || '';
          //           this.addForm.pubOutlet = data.pubOutlet || '';
          //           this.addForm.pubBankAcct = data.pubBankAcct || '';
          //           this.addForm.pubUnionpayNum = data.pubUnionpayNum || ''
          //         } else if (data.intoType == 2) {
          //           this.addForm.priName = data.priName || '';
          //           this.addForm.priPhone = data.priPhone || '';
          //           this.addForm.priIdNum = data.priIdNum || '';
          //           this.addForm.priBankCardNum = data.priBankCardNum || '';
          //           this.addForm.priBankName = data.priBankName || '';
          //           this.addForm.priBankOutlet = data.priBankOutlet || '';
          //           this.addForm.priUnionpayNum = data.priUnionpayNum || ''
          //         }

          this.addForm.mchntName = data.mchntName || '';
          this.addForm.licRegisAddr = data.licRegisAddr || '';
          this.addForm.contactCertNo = data.contactCertNo || '';
          this.addForm.licenseType = data.licenseType || '0';
          this.addForm.licenseNo = data.licenseNo || '';
          this.addForm.licenseStartDt = data.licenseStartDt || '';
          this.addForm.licenseExpireDt = data.licenseExpireDt || '';
          this.addForm.business = data.business || '';
          this.addForm.cityCd = data.cityCd || '';
          this.addForm.countyCd = data.countyCd || '';
          this.addForm.acntType = data.acntType || '1';
          this.addForm.bankType = data.bankType || '';
          this.addForm.interBankNo = data.interBankNo || '';
          this.addForm.issBankNm = data.issBankNm || '';
          this.addForm.acntNm = data.acntNm || '';
          this.addForm.acntNo = data.acntNo || '';
          this.addForm.artifNm = data.artifNm || '';
          this.addForm.acntArtifFlag = data.acntArtifFlag || '1';
          this.addForm.certifId = data.certifId || '';
          this.addForm.cardStartDt = data.cardStartDt || '';
          this.addForm.certifIdExpireDt = data.certifIdExpireDt || '';
          this.addForm.acntCertifTp = data.acntCertifTp || '0';
          this.addForm.acntCertifId = data.acntCertifId || '';
          this.addForm.acntCertifExpireDt = data.acntCertifExpireDt || '';
          this.addForm.wxFlag = data.wxFlag || '0';
          this.addForm.wxSetCd = data.wxSetCd || '';
          this.addForm.aliFlag = data.aliFlag || '0';
          this.addForm.aliSetCd = data.aliSetCd || '';
          this.addForm.qpayFlag = data.qpayFlag || '0';
          this.addForm.qpaySetCd = data.qpaySetCd || '';
          this.addForm.jdpayFlag = data.jdpayFlag || '0';
          this.addForm.jdpaySetCd = data.jdpaySetCd || '';
          this.addForm.settleTp = data.settleTp || '1';
          this.addForm.settleTpCd = data.settleTpCd || '';
          this.addForm.settleTs = data.settleTs || '';
          this.addForm.hasReserveAcnt = data.hasReserveAcnt || '0';
          this.addForm.reserveBankType = data.reserveBankType || '';
          this.addForm.reserveInterBankNo = data.reserveInterBankNo || '';
          this.addForm.reserveIssBankNm = data.reserveIssBankNm || '';
          this.addForm.reserveAcntNo = data.reserveAcntNo || '';
          this.addForm.reserveAcntNm = data.reserveAcntNm || '';
        }

        if (fuiouMchPhoto != null && fuiouMchPhoto != '') {
          let data = fuiouMchPhoto;

          this.addForm.merchantHead = data.merchantHead || '';
          this.addForm.otherPhoto3 = data.otherPhoto3 || '';
          this.addForm.identityFace = data.identityFace || '';
          this.addForm.identityBack = data.identityBack || '';
          this.addForm.bussinessCard = data.bussinessCard || '';
          this.addForm.bussiness = data.bussiness || '';
          this.addForm.identityFaceCopy = data.identityFaceCopy || '';
          this.addForm.identityBackCopy = data.identityBackCopy || '';
          this.addForm.identityBody = data.identityBody || '';
          this.addForm.priAuth = data.priAuth || '';
          this.addForm.cardFace = data.cardFace || '';
          this.addForm.other1 = data.other1 || '';
          this.addForm.organizationCodeId = data.organizationCodeId || '';
          this.addForm.registrationCodeId = data.registrationCodeId || '';
          this.addForm.certificateInstitution = data.certificateInstitution || '';
          this.addForm.businessLicense = data.businessLicense || '';

          this.formImgUrl.merchantHead = this.imgFil(data.merchantHead);
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
          this.formImgUrl.cardFace = this.imgFil(data.cardFace);
          this.formImgUrl.other1 = this.imgFil(data.other1);
          this.formImgUrl.organizationCodeId = this.imgFil(data.organizationCodeId);
          this.formImgUrl.registrationCodeId = this.imgFil(data.registrationCodeId);
          this.formImgUrl.certificateInstitution = this.imgFil(data.certificateInstitution);
          this.formImgUrl.businessLicense = this.imgFil(data.businessLicense);
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
        } else if (type == 'fyBusiness') {
          window.location.href = './static/file/fyBusinessCode.xlsx'
        } else if (type == 'fyLocal') {
          window.location.href = './static/file/fyLocalCode.xlsx'
        } else if (type == 'fyDeductionRate') {
          window.location.href = './static/file/fyDeductionRateTemplate.xls'
        } else if (type == 'fyBankNickname') {
          window.location.href = './static/file/fyBankNickname.xlsx'
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
      // 门头照
      merchantHeadUpload(response, file) {
        console.log(response);
        this.$message({
          message: '门头照上传成功',
          type: 'success'
        });
        this.addForm.merchantHead = response.obj.path;
        this.formImgUrl.merchantHead = this.imgFil(response.obj.path)
      },
      // 经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所照上传成功',
          type: 'success'
        });
        this.addForm.otherPhoto3 = response.obj.path;
        this.formImgUrl.otherPhoto3 = this.imgFil(response.obj.path)
      },

      // 法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面照上传成功',
          type: 'success'
        });
        this.addForm.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },
      // 法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面照上传成功',
          type: 'success'
        });
        this.addForm.identityBack = response.obj.path;
        this.formImgUrl.identityBack = this.imgFil(response.obj.path)
      },
      // 开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照上传成功',
          type: 'success'
        });
        this.addForm.bussinessCard = response.obj.path;
        this.formImgUrl.bussinessCard = this.imgFil(response.obj.path)
      },
      // 营业执照
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照上传成功',
          type: 'success'
        });
        this.addForm.bussiness = response.obj.path;
        this.formImgUrl.bussiness = this.imgFil(response.obj.path)
      },
      // 结算人身份证正面照
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证正面上传成功',
          type: 'success'
        });
        this.addForm.identityFaceCopy = response.obj.path;
        this.formImgUrl.identityFaceCopy = this.imgFil(response.obj.path)
      },
      // 结算人身份证反面照
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证反面上传成功',
          type: 'success'
        });
        this.addForm.identityBackCopy = response.obj.path;
        this.formImgUrl.identityBackCopy = this.imgFil(response.obj.path)
      },
      // 手持身份证照片
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照片上传成功',
          type: 'success'
        });
        this.addForm.identityBody = response.obj.path;
        this.formImgUrl.identityBody = this.imgFil(response.obj.path)
      },
      // 银行卡照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡照上传成功',
          type: 'success'
        });
        this.addForm.cardFace = response.obj.path;
        this.formImgUrl.cardFace = this.imgFil(response.obj.path)
      },
      // 非法人对私授权函
      priAuthUpload(response, file) {
        console.log(response);
        this.$message({
          message: '非法人对私授权函上传成功',
          type: 'success'
        });
        this.addForm.priAuth = response.obj.path;
        this.formImgUrl.priAuth = this.imgFil(response.obj.path)
      },
      // 其他资料1
      other1Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他补充资料1 上传成功',
          type: 'success'
        });
        this.addForm.other1 = response.obj.path;
        this.formImgUrl.other1 = this.imgFil(response.obj.path)
      },
      // 组织机构代码证图片
      organizationCodeIdUpload(response, file) {
        console.log(response);
        this.$message({
          message: '组织机构代码证图片上传成功',
          type: 'success'
        });
        this.addForm.organizationCodeId = response.obj.path;
        this.formImgUrl.organizationCodeId = this.imgFil(response.obj.path)
      },
      // 税务登记证照片
      registrationCodeIdUpload(response, file) {
        console.log(response);
        this.$message({
          message: '税务登记证图片 上传成功',
          type: 'success'
        });
        this.addForm.registrationCodeId = response.obj.path;
        this.formImgUrl.registrationCodeId = this.imgFil(response.obj.path)
      },
      // 事业单位证明函照片
      certificateInstitutionUpload(response, file) {
        console.log(response);
        this.$message({
          message: '事业单位证明函图片 上传成功',
          type: 'success'
        });
        this.addForm.certificateInstitution = response.obj.path;
        this.formImgUrl.certificateInstitution = this.imgFil(response.obj.path)
      },
      //经营许可证照片
      businessLicenseUpload(response, file) {
        console.log(response);
        this.$message({
          message: '事业单位证明函图片 上传成功',
          type: 'success'
        });
        this.addForm.businessLicense = response.obj.path;
        this.formImgUrl.businessLicense = this.imgFil(response.obj.path)
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
        if (isImageSize > 4096 * 1000) {
          this.$message.error('图片大小最大为4M');
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
      },

      /**
       * 进件资料提交
       */

      fileSubmit: function (data) {
        let id = this.urlid; //获取本商户id
        this.btnLoading = true;
        uploadFyIncomingTextInfo(id).then(res => {
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

        uploadFyIncomingPhotoInfo(id).then(res => {
          this.$message.success('图片进件资料提交第三方成功');

          setTimeout(() => {
            this.btnLoading = false
          }, 1000)

        }).catch(e => {
          this.btnLoading = false
        })

      },

      /**
       * 修改微信经营范围代码
       */
      categorySubmit: function (data) {

        let id = this.urlid;//获取本商户Id
        this.btnLoading = true;
        updateCategoryCode(id).then(res => {
          this.$message.success('经营范围代码修改成功');
          setTimeout(() => {
            this.btnLoading = false;
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

  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }


</style>
