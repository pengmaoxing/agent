<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>电信进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单内容-->
        <div>

          <el-form-item label="商户性质：" prop="businessType">
            <el-radio-group v-model.trim="form.businessType">
              <el-radio label="1">企业</el-radio>
              <el-radio label="2">个体工商户</el-radio>
              <el-radio label="3">小微商户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商户全称：" required>
            <el-input v-model.trim="form.merchantName" placeholder="商户全称" class="standard-form"></el-input>
            <span class="tips tips-warning">小微商户命名格式：地区+行业类型;如：福州市爱时尚化妆品店</span>
          </el-form-item>
          <el-form-item label="商户简称："required>
            <el-input v-model.trim="form.merchantAlias" placeholder="商户简称" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户注册名称：" required>
            <el-input v-model.trim="form.merchantCompany" placeholder="商户注册名称" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="地区编码：" required>

          <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="form.admDivCode" :debounce="1000"
                           value-key="value" clearable :fetch-suggestions="dxFindAreaInfo"
                           placeholder="行政区域，请输入有高辨识度的关键词(>2字)，如“鼓楼”"
                           :trigger-on-focus="false" @select="dxFindAreaInfoSelect"></el-autocomplete>
          <span class="tips tips-warning">选中后会自动填充地区</span>
          </el-form-item>


          <el-form-item label="商户注册地址：" required >
            <el-input v-model.trim="form.businessAddress" placeholder="商户注册地址" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="商户联系人姓名："  required>
            <el-input v-model.trim="form.contactPersonName" placeholder="商户联系人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="商户联系人身份证号码：" required >
            <el-input v-model.trim="form.contactPersonIdCardNo" placeholder="商户联系人身份证号码" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="商户联系人邮箱：" required >
          <el-input v-model.trim="form.contactPersonEmail" placeholder="商户联系人邮箱" class="standard-form"></el-input>
        </el-form-item>

          <el-form-item label="联系人手机号：" required>
            <el-input v-model.trim="form.contactPersonPhone" placeholder="联系人手机号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="客服电话：" required>
            <el-input v-model.trim="form.servicePhone" placeholder="客服电话" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="行业分类：" required>
            <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="form.mccCode" :debounce="1000"
                             value-key="value" clearable :fetch-suggestions="dxFindhyInfo"
                             placeholder="行业分类，请输入有高辨识度的关键词"
                             :trigger-on-focus="false" @select="dxFindhyInfoSelect"></el-autocomplete>
            <span class="tips tips-warning">选中后会自动填充分类编号</span>
          </el-form-item>


          <el-form-item label="账户类型：" required>
            <el-radio-group v-model.trim="form.accountType">
              <el-radio label="1">对公</el-radio>
              <el-radio label="2">对私</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="法人姓名："required>
            <el-input v-model.trim="form.legalPersonName" placeholder="法人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证号：" required>
            <el-input v-model.trim="form.legalPersonIdCardNo" placeholder="法人身份证号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证起始有效期：" required>
            <el-date-picker v-model.trim="form.legalPersonIdCardEffectDate" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" v-if="!legalPersonIdCardEffectDate">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="法人身份证截止有效期：" >
            <el-date-picker v-model.trim="form.legalPersonIdCardExpiryDate" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" v-if="!legalPersonIdCardExpiryDate">
            </el-date-picker>
            <span class="tips tips-warning">不填为长期</span>
          </el-form-item>

          <el-form-item label="结算账户号：" required>
            <el-input v-model.trim="form.settlementAccountNo" placeholder="账户号" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="结算账户名：" required>
            <el-input v-model.trim="form.settlementAccountName" placeholder="账户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="账户绑定手机号：" required>
            <el-input v-model.trim="form.settlementAccountPhone" placeholder="账户绑定手机号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="bank-search">
              <el-divider content-position="left">银行信息搜索工具</el-divider>

            <!--模糊查询--></div>
            <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="branchBankName" :debounce="1000"
                             value-key="fullBankName" clearable :fetch-suggestions="dxFindBankInfo"
                             placeholder="银行模糊查询，请输入有高辨识度的关键词(>2字)，如“高新区支行”"
                             :trigger-on-focus="false" @select="dxFindBankInfoSelect"></el-autocomplete>
            <span class="tips tips-warning">选中后会自动填充开户行资料（以下两项）</span>
          </el-form-item>

          <el-form-item label="开户支行名称：" required>
            <el-input v-model.trim="form.settlementAccountBankBranchName" placeholder="账户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="开户支行12位联行号：" required>
            <el-input v-model.trim="form.settlementAccountBankBranchNo" placeholder="账户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="费率：" required>
            <el-input-number v-model.trim="form.standardRate" :min="0" :max="9999" :step="1" :precision="0"
                             class="standard-form"></el-input-number>
            <span class="tips">万分之</span>
          </el-form-item>

          <el-form-item label="营业证件类型：" required>
            <el-radio-group v-model.trim="form.licenseType">
              <el-radio label="0">营业执照</el-radio>
              <el-radio label="1">三证合一</el-radio>
              <el-radio label="2">手持身份证</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="营业执照号：">
            <el-input v-model.trim="form.licenseNo" placeholder="营业执照号" class="standard-form"></el-input>
            <span class="tips">非小微商户必填</span>
          </el-form-item>

          <el-form-item label="营业执照起始有效期：" >
            <el-date-picker v-model.trim="form.licenseEffectDate" type="date" placeholder="营业执照起始有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" v-if="!licenseEffectDate">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="营业执照截止有效期：">
            <el-date-picker v-model.trim="form.licenseExpiryDate" type="date" placeholder="营业执照截止有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" >
            </el-date-picker>
            <!--<el-checkbox v-model="licenseTimeMode">长期</el-checkbox>-->
            <span class="tips tips-warning">不填为长期</span>
          </el-form-item>


          <el-form-item label="结算类型：" prop="thrcertflag">
            <el-radio-group v-model.trim="form.settlementType">
              <el-radio label="1">法人结算</el-radio>
              <!--<el-radio label="2">非法人结算</el-radio>-->
            </el-radio-group>
          </el-form-item>

          <!--<el-form-item label="（非法人结算必填）结算人身份证号：" >-->
            <!--<el-input v-model.trim="form.settlementPersonIdCardNo" placeholder="结算人身份证号" class="standard-form"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="（非法人结算必填）结算人身份证起始有效期：">-->
            <!--<el-date-picker v-model.trim="form.settlementPersonIdCardEffectDate" type="date" placeholder="结算人身份证起始有效期"-->
                            <!--format="yyyy 年 MM 月 dd 日"-->
                            <!--value-format="yyyy-MM-dd" v-if="!settlementPersonIdCardEffectDate">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="（非法人结算必填）结算人身份证截止有效期：" >-->
            <!--<el-date-picker v-model.trim="form.settlementPersonIdCardExpiryDate" type="date" placeholder="结算人身份证截止有效期"-->
                            <!--format="yyyy 年 MM 月 dd 日"-->
                            <!--value-format="yyyy-MM-dd" v-if="!settlementPersonIdCardExpiryDate">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
        </div>
      </el-card>

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

      <!--图片-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>图片进件资料</span>
        </div>
        <!--表单内容-->
        <div>
          <div class="image-upload-box">
            <!--营业执照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业执照</span>
                  <span v-if="formImgUrl.licensePic_picurl!==''" :class="{'up-success':formImgUrl.licensePic_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="businessUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.licensePic_picurl" :src="formImgUrl.licensePic_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>税务登记证件照</span>
                  <span v-if="formImgUrl.taxRegistrationCertificate_picurl!==''" :class="{'up-success':formImgUrl.licensePic_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="taxRegistrationCertificateUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.taxRegistrationCertificate_picurl" :src="formImgUrl.taxRegistrationCertificate_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>组织机构证件照</span>
                  <span v-if="formImgUrl.organizationCodeCertificate_picurl!==''" :class="{'up-success':formImgUrl.organizationCodeCertificate_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="organizationCodeCertificateUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.organizationCodeCertificate_picurl" :src="formImgUrl.organizationCodeCertificate_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--手持身份证照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证照片</span>
                  <span v-if="formImgUrl.legalPersonHoldingIdCard_picurl!==''" :class="{'up-success':formImgUrl.legalPersonHoldingIdCard_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBodyUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalPersonHoldingIdCard_picurl" :src="formImgUrl.legalPersonHoldingIdCard_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证正面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证正面照</span>
                  <span v-if="formImgUrl.legalPersonIdCardFront_picurl!==''" :class="{'up-success':formImgUrl.legalPersonIdCardFront_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityFaceUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalPersonIdCardFront_picurl" :src="formImgUrl.legalPersonIdCardFront_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--法人身份证反面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证反面照</span>
                  <span v-if="formImgUrl.legalPersonIdCardReverse_picurl!==''" :class="{'up-success':formImgUrl.legalPersonIdCardReverse_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBackUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalPersonIdCardReverse_picurl" :src="formImgUrl.legalPersonIdCardReverse_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>联系人身份证正面照</span>
                  <span v-if="formImgUrl.contactPersonIdCardFront_picurl!==''" :class="{'up-success':formImgUrl.contactPersonIdCardFront_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="contactPersonIdCardFrontUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.contactPersonIdCardFront_picurl" :src="formImgUrl.contactPersonIdCardFront_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>银行卡正面照(对私结算必填)</span>
                  <span v-if="formImgUrl.settlementCardFront_picurl!==''" :class="{'up-success':formImgUrl.settlementCardFront_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settlementCardFrontUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settlementCardFront_picurl" :src="formImgUrl.settlementCardFront_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>银行卡反面照(对私结算必填)</span>
                  <span v-if="formImgUrl.settlementCardReverse_picurl!==''" :class="{'up-success':formImgUrl.settlementCardReverse_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settlementCardReverseUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settlementCardReverse_picurl" :src="formImgUrl.settlementCardReverse_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--门头照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照</span>
                  <span v-if="formImgUrl.storeHeader_picurl!==''" :class="{'up-success':formImgUrl.storeHeader_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merchantHeadUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.storeHeader_picurl" :src="formImgUrl.storeHeader_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>内部前台照</span>
                  <span v-if="formImgUrl.storeCashier_picurl!==''" :class="{'up-success':formImgUrl.storeCashier_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="storeCashierUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.storeCashier_picurl" :src="formImgUrl.storeCashier_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>店内环境照</span>
                  <span v-if="formImgUrl.storeIndoor_picurl!==''" :class="{'up-success':formImgUrl.storeIndoor_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="storeIndoorUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.storeIndoor_picurl" :src="formImgUrl.storeIndoor_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>开户许可证照片</span>
                  <span v-if="formImgUrl.permitForOpeningBankAccount_picurl!==''" :class="{'up-success':formImgUrl.permitForOpeningBankAccount_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="bizplacepicUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.permitForOpeningBankAccount_picurl" :src="formImgUrl.permitForOpeningBankAccount_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>对私非法人证明照片(对私非法人结算必填)</span>
                  <span v-if="formImgUrl.authorizationLetter_picurl!==''" :class="{'up-success':formImgUrl.authorizationLetter_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="authorizationLetterUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.authorizationLetter_picurl" :src="formImgUrl.authorizationLetter_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>对私身份证正面照(对私非法人结算必填)</span>
                  <span v-if="formImgUrl.settlementPersonIdCardFront_picurl!==''" :class="{'up-success':formImgUrl.settlementPersonIdCardFront_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settlementPersonIdCardFrontUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settlementPersonIdCardFront_picurl" :src="formImgUrl.settlementPersonIdCardFront_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>对私身份证反面(对私非法人结算必填)</span>
                  <span v-if="formImgUrl.settlementPersonIdCardReverse_picurl!==''" :class="{'up-success':formImgUrl.settlementPersonIdCardReverse_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settlementPersonIdCardReverseUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settlementPersonIdCardReverse_picurl" :src="formImgUrl.settlementPersonIdCardReverse_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

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
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">电信保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="dxInfoSubmit">提交资料到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="dxPicSubmit">提交图片到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="dxRegisterStatus">查询进件状态
          </el-button>
        </div>
      </el-card>

    </el-form>
  </div>
</template>

<script>

  import area from '@/assets/dx/area.json' //地域数据
  import hangye from '@/assets/dx/hangye.json' //地域数据

  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    url
  } from '@/utils/request'

  import {
    modifyMerchant,
    getDxInfo,
    dxRegister,
    dxPic,
    dxRegisterStatus,
    getProvince,
    getCityArea,
    findPayTypeByChannel,
    dxFindBankInfo
  } from '../api/dx'
  import {
    checkVerify,
    saveRrecord
  } from '../api/public'

    export default {
      name: "dx",
      props: ['status','payway','paywayname','payChannel','payChannelName','mode'],
      data(){
        return {
          creditcodeexpireCheck: false,
          legalidexpireCheck: false,
          branchBankName: '',
          bankInfo: [],
          //图片上传
          filesData: {
            module: 'image'
          },
          provinceData: [],
          cityData: [],
          loading: false,
          btnLoading: false,
          labelWidth: '370px',
          inputSize: 'medium',
          dymForm: [],
          // applyId
          applyId: '',
          urlid: '',
          url: hsfuploadUrl,
          headers: {
            authorized: sessionStorage.token
          },
          licenseTimeMode: false, //营业执照有效期模式 0非长期 1长期

          form: {
            admDivCode: '',//商户性质
            merchantName: '',//商户全称
            merchantAlias: '',//商户简称
            merchantCompany: '',//所在省
            businessAddress: '',//所在市
            contactPersonName: '',//客服电话
            contactPersonIdCardNo: '',//所属行业
            contactPersonEmail: '',//营业执照名称
            contactPersonPhone: '',//统一社会信用代码证
            servicePhone: '',//社会信用代码证有效期

            mccCode: '',//法人姓名
            accountType: '1',//法人代表证件类型 01 04 05
            legalPersonName: '',//法人代表证件号
            legalPersonIdCardNo: '',//法人身份证有效期 yyyy-mm-dd
            legalPersonIdCardEffectDate: '',//注册地址
            legalPersonIdCardExpiryDate: '',//商户负责人
            settlementAccountNo: '',//商户负责人电话
            settlementAccountName: '',//结算方式 0自主提现 1结算到银行卡
            settlementAccountPhone: '',//账户号
            settlementAccountBankBranchName: '',//账户名
            settlementAccountBankBranchNo: '',//账户类型 0对私 1对公
            standardRate: '',//结算人身份证号 对私结算必填
            licenseType: '',//法人结算对私必填
            licenseNo: '',//卡折类型 00借记卡 01存折
            licenseEffectDate: '',//卡折类型 00借记卡 01存折
            licenseExpiryDate: '',//所属银行
            businessType: '',//支付行号
            settlementType: '1',//扩展人
            settlementPersonIdCardNo: '',//合同有效期
            settlementPersonIdCardEffectDate: '1',//是否三证合一 1是0否
            settlementPersonIdCardExpiryDate: '',//组织机构代码证号
            licensePic_picurl: '',//组织机构代码证有效期
            taxRegistrationCertificate_picurl: '',//法人手机号
            organizationCodeCertificate_picurl: '',//法人手机号
            legalPersonHoldingIdCard_picurl: '',//法人手机号
            legalPersonIdCardFront_picurl: '',//法人手机号
            legalPersonIdCardReverse_picurl: '',//法人手机号
            contactPersonIdCardFront_picurl: '',//法人手机号
            settlementCardFront_picurl: '',//法人手机号
            settlementCardReverse_picurl: '',//法人手机号
            storeHeader_picurl: '',//法人手机号
            storeCashier_picurl: '',//法人手机号
            storeIndoor_picurl: '',//法人手机号
            permitForOpeningBankAccount_picurl: '',//法人手机号
            authorizationLetter_picurl: '',//法人手机号
            settlementPersonIdCardFront_picurl: '',//法人手机号
            settlementPersonIdCardReverse_picurl: '',//法人手机号
          },
          formImgUrl: {

            licensePic_picurl: '',//组织机构代码证有效期
            taxRegistrationCertificate_picurl: '',//法人手机号
            organizationCodeCertificate_picurl: '',//法人手机号
            legalPersonHoldingIdCard_picurl: '',//法人手机号
            legalPersonIdCardFront_picurl: '',//法人手机号
            legalPersonIdCardReverse_picurl: '',//法人手机号
            contactPersonIdCardFront_picurl: '',//法人手机号
            settlementCardFront_picurl: '',//法人手机号
            settlementCardReverse_picurl: '',//法人手机号
            storeHeader_picurl: '',//法人手机号
            storeCashier_picurl: '',//法人手机号
            storeIndoor_picurl: '',//法人手机号
            permitForOpeningBankAccount_picurl: '',//法人手机号
            authorizationLetter_picurl: '',//法人手机号
            settlementPersonIdCardFront_picurl: '',//法人手机号
            settlementPersonIdCardReverse_picurl: '',//法人手机号
          },

          rules: {
            comproperty: [{
              required: true,
              message: '必须选择商户性质',
              trigger: 'change'
            }],
            merchantname: [{
              required: true,
              message: '必须填写商户全称',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 100,
                message: '仅支持100位中文字符长度'
              }
            ],
            shortname: [{
              required: true,
              message: '必须填写商户简称',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 40,
                message: '仅支持40位中文字符长度'
              }
            ],
            province: [{
              required: true,
              message: '必须填写省份代码',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 8,
                message: '仅支持8位字符长度'
              }
            ],
            city: [{
              required: true,
              message: '必须填写市代码',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 8,
                message: '仅支持8位字符长度'
              }
            ],
            servicephone: [{
              required: true,
              message: '必须填写客服电话',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 32,
                message: '仅支持32位字符长度'
              }
            ],
            mccid: [{
              required: true,
              message: '必须填写行业代码',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 8,
                message: '仅支持8位字符长度'
              }
            ],
            legal: [{
              required: true,
              message: '必须填写法人姓名',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 20,
                message: '仅支持20位字符长度'
              }
            ],
            legalidtype: [{
              required: true,
              message: '必须选择法人证件类型',
              trigger: 'change'
            }],
            legalidno: [{
              required: true,
              message: '必须填写法人证件号',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 50,
                message: '仅支持50位字符长度'
              }
            ],
            legalidexpire: [{
              required: true,
              message: '必须填写法人证件有效期',
              trigger: ['change', 'blur']
            }],
            address: [{
              required: true,
              message: '必须填写注册地址',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 200,
                message: '仅支持200位字符长度'
              }
            ],
            contactperson: [{
              required: true,
              message: '必须填写商户负责人',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 32,
                message: '仅支持32位字符长度'
              }
            ],
            contactphone: [{
              required: true,
              message: '必须填写商户负责人电话',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 32,
                message: '仅支持32位字符长度'
              }
            ],
            clearmode: [{
              required: true,
              message: '必须选择结算方式',
              trigger: 'change'
            }],
            acctid: [{
              required: true,
              message: '必须填写账户号',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 32,
                message: '仅支持32位字符长度'
              }
            ],
            acctname: [{
              required: true,
              message: '必须填写账户名',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 80,
                message: '仅支持80位字符长度'
              }
            ],
            accttype: [{
              required: true,
              message: '必须选择账户类型',
              trigger: 'change'
            }],
            accttp: [{
              required: true,
              message: '必须选择卡折类型',
              trigger: 'change'
            }],
            bankcode: [{
              required: true,
              message: '必须填写所属银行',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 8,
                message: '仅支持8位字符长度'
              }
            ],
            cnapsno: [{
              required: true,
              message: '必须填写支付行号',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 30,
                message: '仅支持30位字符长度'
              }
            ],
            expanduser: [{
              required: true,
              message: '必须填写扩展人',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 50,
                message: '仅支持50位字符长度'
              }
            ],
            contractdate: [{
              required: true,
              message: '必须填写合同有效期',
              trigger: ['change', 'blur']
            }],
            legalphone: [{
              required: true,
              message: '必须填写法人手机号',
              trigger: 'blur'
            },
              {
                min: 1,
                max: 32,
                message: '仅支持32位字符长度'
              }
            ],
            wxFeeRate: [{
              required: true,
              message: '必须填写微信费率',
              trigger: 'change'
            }],
            ysfFeeRate: [{
              required: true,
              message: '必须填写云闪付费率',
              trigger: 'change'
            }],
            alFeeRate: [{
              required: true,
              message: '必须填写支付宝费率',
              trigger: 'change'
            }],
            preFeeRate: [{
              required: true,
              message: '必须填写预授权费率',
              trigger: 'change'
            }],

          }


        }
      },
      mounted: function () {
        this.urlid = this.$route.query.id; // 接收ID
        // 获取进件资料
        this.getMerchantDetail(this.urlid);
        // 获取费率表单
        this.getPayType();
      },


      watch: {
        //社会信用代码证有效期长期
//        creditcodeexpireCheck: function (nVal,oVal) {
//          if (nVal) {
//            this.form.creditcodeexpire = '2099-12-31'
//          }
//        },
//        //法人身份证有效期
        licenseTimeMode: function (nVal,oVal) {
          if (nVal) {
             this.form.licenseExpiryDate = '长期'
          }
        }
//        'licenseTimeMode': {
//          handler(nval, oval) {
//            if (nval) {
//              this.addForm.licenseExpiryDate = '长期'
//            }
//          }
//        },
      },

      methods: {
        dxFindBankInfo: function (queryString, cb) {
          if (queryString.length > 1) {
            dxFindBankInfo(queryString).then(res => {
              this.bankInfo = res.obj;
              cb(res.obj)
            }).catch(e => {

            })
          }
        },
        dxFindBankInfoSelect: function (item) {
          if (item) {
            this.form.settlementAccountBankBranchName   = item.fullBankName;
            this.form.settlementAccountBankBranchNo = item.fullBankCode;
          }
        },

        dxFindhyInfo: function (queryString, cb) {
          let temp= [];
          hangye.forEach((item, index) => {
            if(item.first_name.indexOf(queryString)> -1||item.second_name.indexOf(queryString)> -1||item.third_name.indexOf(queryString)> -1){
              let aa={};
              aa.id=item.third_code;
              aa.value=item.first_name+" | "+item.second_name+" | "+item.third_name;
              temp.push(aa);
            }
          })
          cb(temp)
        },
        dxFindhyInfoSelect: function (item) {
          if (item) {
            this.form.mccCode = item.id;
          }
        },


        dxFindAreaInfo: function (queryString, cb) {
          if (queryString.length > 1) {
            let temp = [];
            area.forEach((item, index) => {
              if (item.province_name.indexOf(queryString) > -1 || item.city_name.indexOf(queryString) > -1 || item.county_name.indexOf(queryString) > -1) {
                let aa={};
                aa.id = item.county_code;
                aa.value = item.province_name + " | " + item.city_name + " | " + item.county_name;
                temp.push(aa);
              }
            })
            cb(temp);
          }
        },
        dxFindAreaInfoSelect: function (item) {
          if (item) {
            this.form.admDivCode = item.id;
          }
        },


        /**
         * 支行获取
         */
        tlFindBankInfo: function (queryString, cb) {
          if (queryString.length > 2) {
            tlFindBankInfo(queryString).then(res => {
              this.bankInfo = res.obj;
              cb(res.obj)
            }).catch(e => {

            })
          }
        },
        tlFindBankInfoSelect: function (item) {
          if (item) {
            this.form.bankcode = item.bankCode;
            this.form.cnapsno = item.branchBankCode;
          }
        },


        /**
         * 下载
         */
        downloadFile: function (type) {
          if (type === 'localCode') {
            window.open("https://aipboss.allinpay.com/know/devhelp/main.php?pid=37")
          } else if (type === 'bankCode') {
            window.location.href = './static/file/tlbank.xlsx'
          } else if (type === 'mcc') {
            window.open("http://www.lianhanghao.com/fl.html");
          }
        },
        /**
         * 提交资料到第三方
         */
        dxInfoSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          dxRegister(id).then(res => {
            this.$message.success('资料提交第三方成功');
            setTimeout(() => {
              this.btnLoading = false
            }, 1000)
          }).catch(e => {
            this.btnLoading = false
          })

        },


        dxPicSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          dxPic(id).then(res => {
            this.$message.success('图片提交第三方成功');
            setTimeout(() => {
              this.btnLoading = false
            }, 1000)
          }).catch(e => {
            this.btnLoading = false
          })

        },
        /**
         * 状态查询
         */
        dxRegisterStatus: function () {
          let id = this.urlid;
          dxRegisterStatus(id).then(res => {
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
          getDxInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 编辑拉取已进件资料
        modifyMerchantInfo: function (id) {
          // 编辑模式
          getDxInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 审核模式拉取资料
        verifyMerchantInfo: function (id) {
          // 编辑模式和审核模式
          getDxInfo(id, this.payChannel).then(res => {
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
          this.getCityArea(this.form.province);
        },

        infoDataFill: function (raw) {
          let data = raw.dxMchInfo; // 基本数据

          this.form.id = data.id || ''; // 数据id
          this.form.admDivCode= data.admDivCode|| '';
          this.form.merchantName= data.merchantName|| '';
          this.form.merchantAlias= data.merchantAlias|| '';
          this.form.merchantCompany= data.merchantCompany|| '';
          this.form.businessAddress= data.businessAddress|| '';
          this.form.contactPersonName= data.contactPersonName|| '';
          this.form.contactPersonIdCardNo= data.contactPersonIdCardNo|| '';
          this.form.contactPersonEmail= data.contactPersonEmail|| '';
          this.form.contactPersonPhone= data.contactPersonPhone|| '';
          this.form.servicePhone= data.servicePhone|| '';
          this.form.mccCode= data.mccCode|| '';
          this.form.accountType= data.accountType+''|| '1';
          this.form.legalPersonName= data.legalPersonName|| '';
          this.form.legalPersonIdCardNo= data.legalPersonIdCardNo|| '';
          this.form.legalPersonIdCardEffectDate= data.legalPersonIdCardEffectDate|| '';
          this.form.legalPersonIdCardExpiryDate= data.legalPersonIdCardExpiryDate|| '';
          this.form.settlementAccountNo= data.settlementAccountNo|| '';
          this.form.settlementAccountName= data.settlementAccountName|| '';
          this.form.settlementAccountPhone= data.settlementAccountPhone|| '';
          this.form.settlementAccountBankBranchName= data.settlementAccountBankBranchName|| '';
          this.form.settlementAccountBankBranchNo= data.settlementAccountBankBranchNo|| '';
          this.form.standardRate= data.standardRate|| '';
          this.form.licenseType= data.licenseType+''|| '1';
          this.form.licenseNo= data.licenseNo|| '';
          this.form.licenseEffectDate= data.licenseEffectDate|| '';

          if(data.licenseExpiryDate=='长期'){
            this.licenseTimeMode=true;

          }else{
            this.form.licenseExpiryDate= data.licenseExpiryDate|| '';
          }
          this.form.businessType= data.businessType+''|| '1';
          this.form.settlementType= data.settlementType+''|| '1';
          this.form.settlementPersonIdCardNo= data.settlementPersonIdCardNo|| '';
          this.form.settlementPersonIdCardEffectDate= data.settlementPersonIdCardEffectDate|| '';
          this.form.settlementPersonIdCardExpiryDate= data.settlementPersonIdCardExpiryDate|| '';

          this.form.licensePic_picurl = data.licensePic_picurl || '';
          this.form.taxRegistrationCertificate_picurl = data.taxRegistrationCertificate_picurl || '';
          this.form.organizationCodeCertificate_picurl = data.organizationCodeCertificate_picurl || '';
          this.form.legalPersonHoldingIdCard_picurl = data.legalPersonHoldingIdCard_picurl || '';
          this.form.legalPersonIdCardFront_picurl = data.legalPersonIdCardFront_picurl || '';
          this.form.legalPersonIdCardReverse_picurl = data.legalPersonIdCardReverse_picurl || '';
          this.form.contactPersonIdCardFront_picurl = data.contactPersonIdCardFront_picurl || '';
          this.form.settlementCardFront_picurl = data.settlementCardFront_picurl || '';
          this.form.settlementCardReverse_picurl = data.settlementCardReverse_picurl || '';
          this.form.storeHeader_picurl = data.storeHeader_picurl || '';
          this.form.storeCashier_picurl = data.storeCashier_picurl || '';
          this.form.storeIndoor_picurl = data.storeIndoor_picurl || '';
          this.form.permitForOpeningBankAccount_picurl = data.permitForOpeningBankAccount_picurl || '';
          this.form.authorizationLetter_picurl = data.authorizationLetter_picurl || '';
          this.form.settlementPersonIdCardFront_picurl = data.settlementPersonIdCardFront_picurl || '';
          this.form.settlementPersonIdCardReverse_picurl = data.settlementPersonIdCardReverse_picurl || '';

          // 获取链接
          this.formImgUrl.licensePic_picurl = this.imgFil(data.licensePic_picurl);
          this.formImgUrl.taxRegistrationCertificate_picurl = this.imgFil(data.taxRegistrationCertificate_picurl);
          this.formImgUrl.organizationCodeCertificate_picurl = this.imgFil(data.organizationCodeCertificate_picurl);
          this.formImgUrl.legalPersonHoldingIdCard_picurl = this.imgFil(data.legalPersonHoldingIdCard_picurl);
          this.formImgUrl.legalPersonIdCardFront_picurl = this.imgFil(data.legalPersonIdCardFront_picurl);
          this.formImgUrl.legalPersonIdCardReverse_picurl = this.imgFil(data.legalPersonIdCardReverse_picurl);
          this.formImgUrl.contactPersonIdCardFront_picurl = this.imgFil(data.contactPersonIdCardFront_picurl);
          this.formImgUrl.settlementCardFront_picurl = this.imgFil(data.settlementCardFront_picurl);
          this.formImgUrl.settlementCardReverse_picurl = this.imgFil(data.settlementCardReverse_picurl);
          this.formImgUrl.storeHeader_picurl = this.imgFil(data.storeHeader_picurl);
          this.formImgUrl.storeCashier_picurl = this.imgFil(data.storeCashier_picurl);
          this.formImgUrl.permitForOpeningBankAccount_picurl = this.imgFil(data.permitForOpeningBankAccount_picurl);
          this.formImgUrl.authorizationLetter_picurl = this.imgFil(data.authorizationLetter_picurl);
          this.formImgUrl.settlementPersonIdCardFront_picurl = this.imgFil(data.settlementPersonIdCardFront_picurl);
          this.formImgUrl.settlementPersonIdCardReverse_picurl = this.imgFil(data.settlementPersonIdCardReverse_picurl);
          this.formImgUrl.storeIndoor_picurl =this.imgFil(data.storeIndoor_picurl);

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
          this.form.licensePic_picurl = response.obj.path;
          this.formImgUrl.licensePic_picurl = this.imgFil(response.obj.path)
        },

        taxRegistrationCertificateUpload(response, file) {
          console.log(response);
          this.$message({
            message: '税务登记照上传成功',
            type: 'success'
          });
          this.form.taxRegistrationCertificate_picurl = response.obj.path;
          this.formImgUrl.taxRegistrationCertificate_picurl = this.imgFil(response.obj.path)
        },

        organizationCodeCertificateUpload(response, file) {
          console.log(response);
          this.$message({
            message: '组织机构证件照上传成功',
            type: 'success'
          });
          this.form.organizationCodeCertificate_picurl = response.obj.path;
          this.formImgUrl.organizationCodeCertificate_picurl = this.imgFil(response.obj.path)
        },

        identityBodyUpload(response, file) {
          console.log(response);
          this.$message({
            message: '手持身份证照片上传成功',
            type: 'success'
          });
          this.form.legalPersonHoldingIdCard_picurl = response.obj.path;
          this.formImgUrl.legalPersonHoldingIdCard_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证正面照
        identityFaceUpload(response, file) {
          console.log(response);
          this.$message({
            message: '法人身份证正面照上传成功',
            type: 'success'
          });
          this.form.legalPersonIdCardFront_picurl = response.obj.path;
          this.formImgUrl.legalPersonIdCardFront_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证正面照
        contactPersonIdCardFrontUpload(response, file) {
          console.log(response);
          this.$message({
            message: '联系人身份证正面照上传成功',
            type: 'success'
          });
          this.form.contactPersonIdCardFront_picurl = response.obj.path;
          this.formImgUrl.contactPersonIdCardFront_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证反面照
        identityBackUpload(response, file) {
          console.log(response);
          this.$message({
            message: '法人身份证反面照上传成功',
            type: 'success'
          });
          this.form.legalPersonIdCardReverse_picurl = response.obj.path;
          this.formImgUrl.legalPersonIdCardReverse_picurl = this.imgFil(response.obj.path)
        },


        // 法人身份证反面照
        settlementCardFrontUpload(response, file) {
          console.log(response);
          this.$message({
            message: '银行卡正面照上传成功',
            type: 'success'
          });
          this.form.settlementCardFront_picurl = response.obj.path;
          this.formImgUrl.settlementCardFront_picurl = this.imgFil(response.obj.path)
        },

        settlementCardReverseUpload(response, file) {
          console.log(response);
          this.$message({
            message: '银行卡反面照上传成功',
            type: 'success'
          });
          this.form.settlementCardReverse_picurl = response.obj.path;
          this.formImgUrl.settlementCardReverse_picurl = this.imgFil(response.obj.path)
        },

        // 门头照
        merchantHeadUpload(response, file) {
          console.log(response);
          this.$message({
            message: '门头照上传成功',
            type: 'success'
          });
          this.form.storeHeader_picurl = response.obj.path;
          this.formImgUrl.storeHeader_picurl = this.imgFil(response.obj.path)
        },

        storeCashierUpload(response, file) {
          console.log(response);
          this.$message({
            message: '内部前台照上传成功',
            type: 'success'
          });
          this.form.storeCashier_picurl = response.obj.path;
          this.formImgUrl.storeCashier_picurl = this.imgFil(response.obj.path)
        },

        storeIndoorUpload(response, file) {
          console.log(response);
          this.$message({
            message: '店内环境照片上传成功',
            type: 'success'
          });
          this.form.storeIndoor_picurl = response.obj.path;
          this.formImgUrl.storeIndoor_picurl = this.imgFil(response.obj.path)
        },

        bizplacepicUpload(response,file){
          console.log(response);
          this.$message({
            message: '开户许可照片上传成功',
            type: 'success'
          });
          this.form.permitForOpeningBankAccount_picurl = response.obj.path;
          this.formImgUrl.permitForOpeningBankAccount_picurl = this.imgFil(response.obj.path)
        },

        authorizationLetterUpload(response,file){
          console.log(response);
          this.$message({
            message: '入账非法人证明照片上传成功',
            type: 'success'
          });
          this.form.authorizationLetter_picurl = response.obj.path;
          this.formImgUrl.authorizationLetter_picurl = this.imgFil(response.obj.path)
        },

        settlementPersonIdCardFrontUpload(response,file){
          console.log(response);
          this.$message({
            message: '对私账户身份证正面照片上传成功',
            type: 'success'
          });
          this.form.settlementPersonIdCardFront_picurl = response.obj.path;
          this.formImgUrl.settlementPersonIdCardFront_picurl = this.imgFil(response.obj.path)
        },

        settlementPersonIdCardReverseUpload(response,file){
          console.log(response);
          this.$message({
            message: '对私账户身份证反面照片上传成功',
            type: 'success'
          });
          this.form.settlementPersonIdCardReverse_picurl = response.obj.path;
          this.formImgUrl.settlementPersonIdCardReverse_picurl = this.imgFil(response.obj.path)
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
         *上传大小限制
         **/
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
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
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
