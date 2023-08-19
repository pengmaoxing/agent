<template>
  <div v-loading="loading">
    <p class="cus-title">当前是{{payChannelName}}进件</p>
    <el-form ref="addForm" :model="addForm" :rules="formRules" :label-width="labelWidth" size="small">
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>结算信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单-->
        <div divName="易融码进件">

          <el-form-item label="登录手机号：" prop="hybPhone">
            <el-input v-model.trim="addForm.hybPhone" class="input-width"></el-input>
            <span class="tips">例：13066668888</span>
          </el-form-item>

          <el-form-item label="入账人姓名：" prop="bankAccName">
            <el-input v-model.trim="addForm.bankAccName" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="入账人身份证号：" prop="accNum">
            <el-input v-model.trim="addForm.accNum" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="结算银行卡号：" prop="bankAccNo">
            <el-input v-model.trim="addForm.bankAccNo" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="开户行：" prop="bankBranch">
            <el-input v-model.trim="addForm.bankBranch" class="input-width"></el-input>
            <span class="tips">例：中国银行股份有限公司</span>
          </el-form-item>

          <el-form-item label="开户支行：" prop="bankSubbranch">
            <el-input v-model.trim="addForm.bankSubbranch" class="input-width"></el-input>
            <span class="tips">例：福州高新区支行</span>
          </el-form-item>

          <el-form-item label="系统行号：" prop="payBankId">
            <el-input v-model.trim="addForm.payBankId" class="input-width"></el-input>
            <span class="tips"> 行号参考<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 前往查询</a></span>
          </el-form-item>

          <el-form-item label="对公/私：" prop="accType">
            <el-radio-group v-model="addForm.accType">
              <el-radio :label="1">对公</el-radio>
              <el-radio :label="2">对私</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="销售ID：" prop="saleId">
            <el-input v-model.trim="addForm.saleId" class="input-width" :disabled="true"></el-input>
            <span class="tips"> 由后台配置，如果为空则无法提交，需要先配置</span>
          </el-form-item>

          <el-form-item label="商户名称：" prop="rname">
            <el-input v-model.trim="addForm.rname" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="商户类型：" prop="areaType">
            <el-radio-group v-model="addForm.areaType">
              <el-radio :label="4">企业</el-radio>
              <el-radio :label="5" :disabled="addForm.accType===1">个体工商户</el-radio>
              <el-radio :label="6" :disabled="addForm.accType===1">个人</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="经营地址：" prop="baddr">
            <el-input v-model.trim="addForm.baddr" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="详细经营地址：" prop="raddr">
            <el-input v-model.trim="addForm.raddr" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="门店所在地地区代码：" prop="localCode">
            <el-input v-model.trim="addForm.localCode" class="input-width"></el-input>
            <span class="tips"> 地区代码查询</span>
            <!--<el-form-item class="block">-->
            <!--<el-autocomplete-->
            <!--class="inline-input"-->
            <!--v-model.trim="showCode"-->
            <!--:fetch-suggestions="codeSearch"-->
            <!--placeholder="请按“福建福州”格式输入"-->
            <!--style="width: 250px"-->
            <!--:trigger-on-focus="false"-->
            <!--@select="codeSelect"-->
            <!--value-key="drName"-->
            <!--&gt;</el-autocomplete>-->
            <!--</el-form-item>-->

            <el-select
              v-model="selectCode"
              filterable
              @change="setCode"
              :clearable="true"
              remote
              reserve-keyword
              placeholder="请输入区名搜索"
              :remote-method="remoteMethod"
              :loading="btnLoading">
              <el-option
                v-for="(item,index) in onLineCode"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <!--<span class="tips"> 地区代码文件<a style="color: #1e6abc" @click="downloadFile('localCode')"> 下载查询</a></span>-->
          </el-form-item>

          <el-form-item label="结算类型：" prop="settleType">
            <el-radio-group v-model="addForm.settleType" :disabled="true">
              <el-radio label="T">T+1结算</el-radio>
              <el-radio label="D">D+1结算</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="法人姓名：" prop="legalName">
            <el-input v-model.trim="addForm.legalName" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证号：" prop="legalIdNum">
            <el-input v-model.trim="addForm.legalIdNum" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="注册来源：" required>
            <el-radio-group v-model="addForm.remarks" :disabled="true">
              <el-radio :label="3">默认</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="联系人：" prop="contact">
            <el-input v-model.trim="addForm.contact" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系人手机号：" prop="phone">
            <el-input v-model.trim="addForm.phone" class="input-width"></el-input>
          </el-form-item>

          <!--<el-form-item label="联系人身份证号：" prop="idCardNumber">-->
            <!--<el-input v-model.trim="addForm.idCardNumber" class="input-width"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="行业范围：" prop="businessScope">
            <el-input v-model.trim="addForm.businessScope" class="input-width"
                      placeholder="简要说明实际经营行业【24个(含)字符以内】"></el-input>
            <span class="tips"> 简要说明实际经营行业</span>
          </el-form-item>


          <el-form-item label="是否开通储值卡：" required v-show="false">
            <el-radio-group v-model="addForm.isForeign">
              <el-radio :label="1" :disabled="true">否</el-radio>
              <el-radio :label="0" :disabled="true">是</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="是否优质客户：" required>
            <el-radio-group v-model="addForm.isHighQualityMer" :disabled="true">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="0">是</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="费率：" prop="scanRate">
            <el-input-number v-model.trim="addForm.scanRate" :disabled="addForm.isHighQualityMer==0"
                             :step="0.0001"
                             :min="addForm.isHighQualityMer==1?0.0025:0.0038"
                             :max="addForm.isHighQualityMer==1?0.0060:0.0038"
                             :precision="4" class="input-width">
            </el-input-number>
          </el-form-item>

          <el-form-item label="所属行业：" prop="industryId">
            <el-select v-model.trim="addForm.industryId" filterable placeholder="请选择所属行业">
              <el-option
                v-for="item in industryOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业执照号：" prop="license" v-if="addForm.areaType===4 || addForm.areaType==5">
            <el-input v-model.trim="addForm.license" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="营业执照注册名称：" prop="shortName" v-if="addForm.areaType===4 || addForm.areaType==5">
            <el-input v-model.trim="addForm.shortName" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="营业执照有效期：" prop="licenceExp" v-if="addForm.areaType===4 || addForm.areaType==5">
            <el-date-picker
              v-if="!licenseTimeMode"
              v-model="addForm.licenceExp"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-checkbox v-model="licenseTimeMode">长期</el-checkbox>
          </el-form-item>

          <el-form-item label="入账人身份证有效期：" prop="idNumExp" v-if="addForm.accType===2">
            <el-date-picker
              v-if="!idNumTimeMode"
              v-model="addForm.idNumExp"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-checkbox v-model="idNumTimeMode">长期</el-checkbox>
          </el-form-item>

          <el-form-item label="法人身份证有效期：" prop="legalIdExp" v-if="addForm.areaType===4">
            <el-date-picker
              v-if="!legalTimeMode"
              v-model="addForm.legalIdExp"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-checkbox v-model="legalTimeMode">长期</el-checkbox>
          </el-form-item>

          <el-form-item label="业务类型：" required>
            <el-radio-group v-model="addForm.businessType" :disabled="true">
              <el-radio :label="0">默认</el-radio>
            </el-radio-group>
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
                  <span>其他资料</span>
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
            <el-card :body-style="{ padding: '20px' }"
                     v-if="addForm.industryId==19"
                     shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>快递行业资质</span>
                  <span v-if="formImgUrl.materialUpLoad9File!=''">&nbsp</span>
                  <span v-if="formImgUrl.materialUpLoad9File!=''"
                        :class="{'up-success':formImgUrl.materialUpLoad9File!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="materialUpLoad9FileUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.materialUpLoad9File" :src="formImgUrl.materialUpLoad9File" class="logo">
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
          <el-button type="primary" :loading="btnLoading" @click="dataCollationBefore">保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" :disabled="verifyClsoe" @click="uploadThirdVerify">提交进件至易融码

          </el-button>
          <el-button type="success" :loading="btnLoading" @click="findYrmStatus" plain>查询进件状态</el-button>

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

  import {
    getPlantInfo,
    findPayType,
    findPayTypeByChannel,
    modifyMerchantJson,
    uploadThirdVerify,
    findYrmStatus,
    getCityCode
  } from '../api/yrm'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'
  import {mixins} from "../../mixins/mixins";

  export default {
    name: "addMerchant",
    mixins:[mixins],
    props: ['status', 'payway', 'paywayname', 'payChannel', 'payChannelName', 'mode'],
    data() {
      var phone_rule = (rule, value, callback) => {
        let reg = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('手机号码格式错误'))
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
      return {
        loading: false,
        labelWidth: '370px',
        btnLoading: false,
        addForm: {
          id: '',
          merchantId: '', //merchantId
          hybPhone: '', //登录手机号
          bankAccName: '', //入账人姓名
          accNum: '', //店主身份证号
          bankAccNo: '', //结算银行卡号
          bankBranch: '', //开户行
          bankSubbranch: '', //开户支行
          payBankId: '', //系统行号
          accType: 1, //对公/私
          saleId: '', //销售ID
          rname: '', //商户名称
          areaType: 4, //商户类型
          baddr: '', //经营地址
          raddr: '', //详细经营地址
          localCode: '', //门店所在地地区代码

          settleType: 'D', //结算类型

          remarks: 3, //注册来源
          contact: '', //联系人
          phone: '', //联系手机号
          idCardNumber:'',//联系人身份证

          businessScope: '', //行业范围
          isForeign: 0, //是否开通储值卡

          isHighQualityMer: 1, //是否优质客户
          scanRate: 0.0038, //是否优质客户费率

          industryId: '', //所属行业

          license: '', //营业执照号
          shortName: '', //营业执照注册名称
          licenceExp: [], //营业执照有效期
          idNumExp: [], //入账人身份证有效期
          legalName: '', //法人
          legalIdNum: '', //法人身份证ID
          legalIdExp: [], //法人身份证有效期

          businessType: 0, //业务类型


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
          materialUpLoad9File: '', //其他资料

        },
        legalTimeMode: false, //法人身份证有效期模式 0非长期 1长期
        licenseTimeMode: false, //营业执照有效期模式 0非长期 1长期
        idNumTimeMode: false, //入账人身份证有效期模式 0非长期 1长期


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
          materialUpLoad9File: '', //快递资质

        },
        dymForm: [],
        //经营类型选择器
        businessTypes: [], //经营类型数据
        businessTypes2: [], //经营类型数据2 选中1后出现
        businessTypes3: [], //经营类型数据3 选中2后出现
        selectedBusinessType1: null,
        selectedBusinessType2: null,
        selectedBusinessType3: null,
        //行业
        industryOptions: [
          {value: '8', name: '小型超市/便利店/零售商店'},
          {value: '9', name: '小吃/快餐/美食城'},
          {value: '10', name: '水果零售/蔬菜零售'},
          {value: '11', name: '水吧/饮料/冷饮'},
          {value: '12', name: '药品/医疗/保健'},
          {value: '13', name: '美发/美容/足疗保健'},
          {value: '14', name: '网吧/KTV/酒吧休闲娱乐类'},
          {value: '15', name: '大中型餐饮'},
          {value: '16', name: '大中型连锁超市'},
          {value: '17', name: '校园内食堂/餐饮'},
          {value: '18', name: '校园内超市/便利店/零售'},
          {value: '19', name: '快递'},
          {value: '20', name: '彩票'},
          {value: '21', name: '交通运输/票务旅游'},
          {value: '22', name: '教育'},
          {value: '23', name: '烟酒零食'},
          {value: '24', name: '其他'}
        ],
        //地域选择
        dataProv: cityJson['selectProv'],
        dataCity: '',  //城市
        dataCountry: '', //区域
        provIndex: '',
        cityIndex: '',
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
        formRules: {
          hybPhone: [
            {required: true, message: '请输入登录手机号', trigger: 'blur'},
            {validator: phone_rule, trigger: 'blur'}
          ],
          bankAccName: [
            {required: true, message: '请输入入账人姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          accNum: [
            {required: true, message: '请输入入账人身份证号码', trigger: 'blur'},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          bankAccNo: [
            {required: true, message: '请输入结算银行卡号', trigger: 'blur'},
          ],
          bankBranch: [
            {required: true, message: '开户行的完整银行名 如：中国银行股份有限公司', trigger: 'blur'},
          ],
          bankSubbranch: [
            {required: true, message: '开户支行的完整支行名 如：福州高新区支行，具体查询银行表', trigger: 'blur'},
          ],
          payBankId: [
            {required: true, message: '开户支行的完整系统行号', trigger: 'blur'},
          ],
          accType: [
            {required: true, message: '请选择对公/私', trigger: 'change'},
          ],
          areaType: [
            {required: true, message: '请选择商户类型', trigger: 'change'},
          ],
          settleType: [
            {required: true, message: '请选择结算类型', trigger: 'change'},
          ],
          saleId: [
            {required: true, message: '请输入销售ID', trigger: 'blur'},
          ],
          rname: [
            {required: true, message: '请输入完整真实的商户名称', trigger: 'blur'},
          ],
          baddr: [
            {required: true, message: '请输入实际经营地址', trigger: 'blur'},
          ],
          raddr: [
            {required: true, message: '请输入实际详细经营地址', trigger: 'blur'},
          ],
          localCode: [
            {required: true, message: '请输入门店所在地地区代码,可下载附件参考', trigger: 'blur'},
          ],
          legalName: [
            {required: true, message: '请输真实的法人姓名', trigger: 'blur'},
          ],
          legalIdNum: [
            {required: true, message: '请输入法人身份证号码', trigger: 'blur'},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系人手机号', trigger: 'blur'},
            {validator: phone_rule, trigger: 'blur'}
          ],
          idCardNumber:[
            {required: true, message: '请输入联系人身份证号码', trigger: 'blur'},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          businessScope: [
            {required: true, message: '请输入行业范围', trigger: 'blur'},
            {min: 1, max: 24, message: '长度在 1 到 24 个字符', trigger: 'blur'}
          ],
          scanRate: [
            {required: true, message: '请合理填写费率', trigger: 'blur'},
          ],
          industryId: [
            {required: true, message: '请选择所属行业', trigger: 'change'},
          ],
          license: [
            {
              required: true,
              message: '请输入真实营业执照号',
              trigger: 'blur'
            },
          ],
          shortName: [
            {required: true, message: '请输入真实营业执照注册名称', trigger: 'blur'},
          ],
          licenceExp: [
            {required: true, message: '请选择营业执照有效期区间', trigger: 'change'},
          ],
          idNumExp: [
            {required: true, message: '请选择入账人身份证有效期区间', trigger: 'change'},
          ],
          legalIdExp: [
            {required: true, message: '请选择法人身份证有效期区间', trigger: 'change'},
          ],

        },

        //按钮锁定
        verifyClsoe: false,

        //地区代码
        // localCode: localCode,
        showCode: '',
        onLineCode: [],
        selectCode: '',

        //applyId
        applyId: '',

      }
    },
    watch: {
      //对公（1）时，商户类型必须为企业（4）
      'addForm.accType': {
        handler(nval, oval) {
          if (nval === 1) {
            this.addForm.areaType = 4
          }
        }
      },
      //优质客户固定费率
      'addForm.isHighQualityMer': {
        handler(nval, oval) {
          if (nval === 0) {
            this.addForm.scanRate = 0.0038
          } else {
            this.addForm.scanRate = 0.0025
          }
        }
      },
      //营业执照有效期长期
      'licenseTimeMode': {
        handler(nval, oval) {
          if (nval) {
            this.addForm.licenceExp = ['长期', '长期']
          } else {
            this.addForm.licenceExp = ['', '']
          }
        }
      },
      //入账人身份证有效期长期
      'idNumTimeMode': {
        handler(nval, oval) {
          if (nval) {
            this.addForm.idNumExp = ['长期', '长期']
          } else {
            this.addForm.idNumExp = ['', '']
          }
        }
      },
      //法人身份证有效期长期
      'legalTimeMode': {
        handler(nval, oval) {
          if (nval) {
            this.addForm.legalIdExp = ['长期', '长期']
          } else {
            this.addForm.legalIdExp = ['', '']
          }
        }
      },
      //baddr
      'addForm.baddr': {
        handler(nval, oval) {
          this.addForm.raddr = nval;
        }
      },
      //raddr
      'addForm.raddr': {
        handler(nval, oval) {
          this.addForm.baddr = nval;
        }
      },
      //bankAccName
      'addForm.bankAccName': {
        handler(nval, oval) {
          this.addForm.contact = nval;
        }
      },
      //contactPerson
      'addForm.contact': {
        handler(nval, oval) {
          this.addForm.bankAccName = nval;
        }
      },
      //contactPhone
      'addForm.phone': {
        handler(nval, oval) {
          this.addForm.hybPhone = nval;
        }
      },
      //hybPhone
      'addForm.hybPhone': {
        handler(nval, oval) {
          this.addForm.phone = nval;
        }
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
      this.getPayType();

      // console.log(this.localCode)
    },
    methods: {
      /**
       * 在线搜索
       */
      remoteMethod: function (query) {
        if (query !== '') {
          this.btnLoading = true;
          getCityCode(query).then(res => {
            let data = res.obj;
            this.onLineCode = data.filter(item => {

              // return item.name.toLowerCase()
              //   .indexOf(query.toLowerCase()) > -1;
              return item //无需再过滤一遍
            });
            this.btnLoading = false
          }).catch(e => {
            this.btnLoading = false
          })
        } else {
          this.onLineCode = [];
        }
      },
      //给表单赋值
      setCode: function () {
        let code = this.selectCode;
        if (code) {
          this.addForm.localCode = code
        }
      },


      // /**
      //  * 搜索地区代码
      //  */
      // codeSearch(queryString, cb) {
      //   if (!queryString) {
      //     return false
      //   }
      //   var restaurants = this.localCode;
      //   queryString = queryString.replace('省', '');
      //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      //   // 调用 callback 返回建议列表的数据
      //   cb(results);
      // },
      // createFilter(queryString) {
      //   return (restaurant) => {
      //     return ((restaurant.prName + restaurant.ciName + restaurant.drName).toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      //   };
      // },
      // codeSelect(item) {
      //   if (item) {
      //     this.addForm.localCode = item.drCode || ''
      //   }
      // },

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
        if (this.legalTimeMode && form.legalIdExp.length === 2) {
          //非长期
          if (form.legalIdExp[0] === '' || form.legalIdExp[0] === null || form.legalIdExp[1] === '' || form.legalIdExp[1] === null) {
            this.$message.error('还有日期没有填写');
            return false
          } else {
            form.legalIdExp = form.legalIdExp.join(',');
          }
        } else {
          //长期
          form.legalIdExp = form.legalIdExp.join(',')
        }

        //营业执照有效期
        if (this.licenseTimeMode && form.licenceExp.length === 2) {
          //非长期
          if (form.licenceExp[0] === '' || form.licenceExp[0] === null || form.licenceExp[1] === '' || form.licenceExp[1] === null) {
            this.$message.error('还有日期没有填写');
            return false
          } else {
            form.licenceExp = form.licenceExp.join(',')
          }
        } else {
          //长期
          form.licenceExp = form.licenceExp.join(',')
        }

        //收款人身份证有效期
        if (this.idNumTimeMode && form.idNumExp.length === 2) {
          //非长期
          if (form.idNumExp[0] === '' || form.idNumExp[0] === null || form.idNumExp[1] === '' || form.idNumExp[1] === null) {
            this.$message.error('还有日期没有填写');
            return false
          } else {
            form.idNumExp = form.idNumExp.join(',')
          }
        } else {
          //长期
          form.idNumExp = form.idNumExp.join(',')
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
       * 审核前查询状态
       */
      findYrmStatus: function () {
        this.btnLoading = true;
        let id = this.urlid;
        findYrmStatus(id).then(res => {
          let msg = res.msg;
          this.$message.warning(msg);
          this.btnLoading = false
        }).catch(e => {
          this.btnLoading = false
        })
      },


      /**
       * 提交第三方
       */
      uploadThirdVerify: function () {

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
        this.$confirm('提交进件资料至易融码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          uploadThirdVerify(id).then(res => {
            this.$message.success('已提交审核');
            this.btnLoading = false;
            this.verifyClsoe = true
          }).catch(e => {
            this.btnLoading = false
          })
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
      autoInputData: function (data) {
        let yrmMchInfo = data.yrmMchInfo; //进件信息
        let yrmMchPhoto = data.yrmMchPhoto; //进件图片信息


        //普通表单处理
        this.addForm.id = yrmMchInfo.id || '';  //id
        this.addForm.merchantId = yrmMchInfo.merchantId || '';  //merchantId
        this.addForm.accNum = yrmMchInfo.accNum || '';  //店主身份证号
        this.addForm.accType = parseInt(yrmMchInfo.accType) || 1; //对公/私
        this.addForm.areaType = parseInt(yrmMchInfo.areaType) || 4; //商户类型
        this.addForm.baddr = yrmMchInfo.baddr || ''; //商户类型
        this.addForm.bankAccName = yrmMchInfo.bankAccName || ''; //入账人姓名
        this.addForm.bankAccNo = yrmMchInfo.bankAccNo || ''; //结算银行卡号
        this.addForm.bankBranch = yrmMchInfo.bankBranch || ''; //开户行
        this.addForm.bankSubbranch = yrmMchInfo.bankSubbranch || ''; //开户支行
        this.addForm.businessScope = yrmMchInfo.businessScope || ''; //行业范围
        this.addForm.businessType = parseInt(yrmMchInfo.businessType) || 0; //业务类型
        this.addForm.hybPhone = yrmMchInfo.hybPhone || ''; //登录手机号
        this.addForm.industryId = yrmMchInfo.industryId || ''; //所属行业
        this.addForm.isForeign = parseInt(yrmMchInfo.isForeign) || 0; //是否开通储值卡
        this.addForm.isHighQualityMer = parseInt(yrmMchInfo.isHighQualityMer) || 1; //是否优质客户
        this.addForm.legalIdNum = yrmMchInfo.legalIdNum || ''; //法人身份证
        this.addForm.legalName = yrmMchInfo.legalName || ''; //法人姓名
        this.addForm.license = yrmMchInfo.license || ''; //法人姓名
        this.addForm.localCode = yrmMchInfo.localCode || ''; //门店所在地地区代码
        this.addForm.payBankId = yrmMchInfo.payBankId || ''; //系统行号
        this.addForm.raddr = yrmMchInfo.raddr || ''; //详细经营地址
        this.addForm.rname = yrmMchInfo.rname || ''; //商户名称
        this.addForm.saleId = yrmMchInfo.saleId || ''; //销售ID
        // this.addForm.settleType = yrmMchInfo.settleType || 'D'; //结算类型
        this.addForm.settleType = 'D'; //结算类型 强制设置D
        this.addForm.shortName = yrmMchInfo.shortName || ''; //营业执照注册名称
        this.addForm.contact = yrmMchInfo.contact || ''; //联系人
        this.addForm.phone = yrmMchInfo.phone || ''; //联系人号码

        // this.addForm.idCardNumber = yrmMchInfo.idCardNumber || ''; //联系人身份证号

        setTimeout(() => {
          this.addForm.scanRate = parseFloat(yrmMchInfo.scanRate) || 0.0038; //是否优质客户费率
        }, 200);

        //日期处理
        if (yrmMchInfo.licenceExp) {
          if (yrmMchInfo.licenceExp === '长期,长期') {
            this.licenseTimeMode = true
          } else {
            this.licenseTimeMode = false;
            this.addForm.licenceExp = yrmMchInfo.licenceExp.split(',')
          }
        }
        if (yrmMchInfo.legalIdExp) {
          if (yrmMchInfo.legalIdExp === '长期,长期') {
            this.legalTimeMode = true
          } else {
            this.legalTimeMode = false;
            this.addForm.legalIdExp = yrmMchInfo.legalIdExp.split(',')
          }

        }
        if (yrmMchInfo.idNumExp) {
          if (yrmMchInfo.idNumExp === '长期,长期') {
            this.idNumTimeMode = true
          } else {
            this.idNumTimeMode = false;
            this.addForm.idNumExp = yrmMchInfo.idNumExp.split(',')
          }
        }

        //图片处理
        this.addForm.merchantHead = yrmMchPhoto.merchantHead || '';
        this.addForm.merchantCheck = yrmMchPhoto.merchantCheck || '';
        this.addForm.otherPhoto3 = yrmMchPhoto.otherPhoto3 || '';
        this.addForm.identityFace = yrmMchPhoto.identityFace || '';
        this.addForm.identityBack = yrmMchPhoto.identityBack || '';
        this.addForm.bussinessCard = yrmMchPhoto.bussinessCard || '';
        this.addForm.bussiness = yrmMchPhoto.bussiness || '';
        this.addForm.identityFaceCopy = yrmMchPhoto.identityFaceCopy || '';
        this.addForm.identityBackCopy = yrmMchPhoto.identityBackCopy || '';
        this.addForm.identityBody = yrmMchPhoto.identityBody || '';
        this.addForm.priAuth = yrmMchPhoto.priAuth || '';
        this.addForm.rentHouse = yrmMchPhoto.rentHouse || '';
        this.addForm.cardFace = yrmMchPhoto.cardFace || '';
        this.addForm.other1 = yrmMchPhoto.other1 || '';
        this.addForm.materialUpLoad9File = yrmMchPhoto.materialUpLoad9File || '';

        this.formImgUrl.merchantHead = this.imgFil(yrmMchPhoto.merchantHead);
        this.formImgUrl.merchantCheck = this.imgFil(yrmMchPhoto.merchantCheck);
        this.formImgUrl.otherPhoto3 = this.imgFil(yrmMchPhoto.otherPhoto3);
        this.formImgUrl.identityFace = this.imgFil(yrmMchPhoto.identityFace);
        this.formImgUrl.identityBack = this.imgFil(yrmMchPhoto.identityBack);
        this.formImgUrl.bussinessCard = this.imgFil(yrmMchPhoto.bussinessCard);
        this.formImgUrl.bussiness = this.imgFil(yrmMchPhoto.bussiness);
        this.formImgUrl.identityFaceCopy = this.imgFil(yrmMchPhoto.identityFaceCopy);
        this.formImgUrl.identityBackCopy = this.imgFil(yrmMchPhoto.identityBackCopy);
        this.formImgUrl.identityBody = this.imgFil(yrmMchPhoto.identityBody);
        this.formImgUrl.cardFace = this.imgFil(yrmMchPhoto.cardFace);
        this.formImgUrl.priAuth = this.imgFil(yrmMchPhoto.priAuth);
        this.formImgUrl.rentHouse = this.imgFil(yrmMchPhoto.rentHouse);
        this.formImgUrl.cardFace = this.imgFil(yrmMchPhoto.cardFace);
        this.formImgUrl.other1 = this.imgFil(yrmMchPhoto.other1);
        this.formImgUrl.materialUpLoad9File = this.imgFil(yrmMchPhoto.materialUpLoad9File)

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
          message: '其他补充资料 上传成功',
          type: 'success'
        });
        this.addForm.other1 = response.obj.path;
        this.formImgUrl.other1 = this.imgFil(response.obj.path)
      },
      //其他资料2
      materialUpLoad9FileUpload(response, file) {
        console.log(response);
        this.$message({
          message: '快递资质 上传成功',
          type: 'success'
        });
        this.addForm.materialUpLoad9File = response.obj.path;
        this.formImgUrl.materialUpLoad9File = this.imgFil(response.obj.path)
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


</style>
