<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>汇收钱进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单内容-->
        <div>
          <el-form-item label="商户性质：" required>
            <el-radio-group v-model.trim="form.userType">
              <el-radio label="E">企业</el-radio>
              <el-radio label="INDIVIDUAL">个体工商户</el-radio>
              <el-radio label="SM">小微商户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="店铺名称："required>
            <el-input v-model.trim="form.realName" placeholder="店铺名称" class="standard-form"></el-input>
          </el-form-item>


          <el-form-item label="MCC码："   >
            <el-select placeholder="请选择MCC码"
                       v-model="form.mccCode"
                       >
              <el-option :value="item.mcc_code"
                         :key="item.mcc_code"
                         :label="item.mcc_name"
                         v-for="item  in mcc">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营地址省编码："   >
            <el-select placeholder="请选择经营地址省编码"
                       v-model="form.provinceCode"
                       @change="getCityjy($event)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in area[86]">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营地址市区编码："   >
            <el-select placeholder="请选择经营地址市区编码"
                       v-model="form.cityCode"
                       @change="getCountryjy($event)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in cityjy">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营地址县区编码："   >
            <el-select placeholder="请选择经营地址县区编码"
                       v-model="form.areaCode"
                       >
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in countryjy">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="地址：" required >
            <el-input v-model.trim="form.address" placeholder="地址" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="店内联系电话：" required>
            <el-input v-model.trim="form.telNo" placeholder="店内联系电话" class="standard-form"></el-input>
          </el-form-item>


          <el-form-item label="法人姓名："  required>
            <el-input v-model.trim="form.legalPersonName" placeholder="法人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人证件类型：" required>
            <el-radio-group v-model.trim="form.legalCertType">
              <el-radio label="IDC">身份证</el-radio>
              <el-radio label="PSRT">护照</el-radio>
              <el-radio label="BLC">营业执照</el-radio>
              <el-radio label="USCC">统一社会信用代码</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="法人身份证号：" required>
            <el-input v-model.trim="form.legalCertNo" placeholder="法人身份证号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人身份证起始有效期：" required>
            <el-date-picker v-model.trim="form.legalCertValidStartDate" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="法人身份证截止有效期：" >
            <el-date-picker v-model.trim="form.legalCertValidEndDate" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="法人手机号：" required>
            <el-input v-model.trim="form.legalPersonCell" placeholder="法人手机号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人邮箱：" required >
            <el-input v-model.trim="form.legalPersonEmail" placeholder="法人邮箱" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="联系人手机号：" required>
            <el-input v-model.trim="form.contactCell" placeholder="联系人手机号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="联系人邮箱：" required >
            <el-input v-model.trim="form.contactEmail" placeholder="商户联系人邮箱" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="账户类型：" required>
            <el-radio-group v-model.trim="form.accountType">
              <el-radio label="PUBLIC">对公</el-radio>
              <el-radio label="PRIVATE">对私</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="卡类型：" required>
            <el-radio-group v-model.trim="form.cardType">
              <el-radio label="DC">借记卡</el-radio>
              <el-radio label="CC">信用卡</el-radio>
              <el-radio label="PA">对公账户</el-radio>
              <el-radio label="PC">预付卡</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="结算类型：" required>
            <el-radio-group v-model.trim="form.settleType">
              <el-radio label="T+1">T+1</el-radio>
              <el-radio label="D+1">D+1</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="账户名：" required>
            <el-input v-model.trim="form.cardUserName" placeholder="账户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="账户号：" required>
            <el-input v-model.trim="form.bankCardNo" placeholder="账户号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="开户行："   prop="mcc_code">
            <el-select placeholder="请选择开户行"
                       v-model="form.bankId"
                       @change="getSubmcc($event)">
              <el-option :value="item.dicCode"
                         :key="item.dicCode"
                         :label="item.dicName"
                         v-for="item  in bank">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="bank-search">
              <el-divider content-position="left">银行信息搜索工具</el-divider>

              <!--模糊查询--></div>
            <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="branchBankName" :debounce="1000"
                             value-key="fullBankName" clearable :fetch-suggestions="hsqFindBankInfo"
                             placeholder="银行模糊查询，请输入有高辨识度的关键词(>2字)，如“高新区支行”"
                             :trigger-on-focus="false" @select="hsqFindBankInfoSelect"></el-autocomplete>
            <span class="tips tips-warning">选中后会自动填充开户行资料（以下两项）</span>
          </el-form-item>

          <el-form-item label="支行联行行号：" required>
            <el-input v-model.trim="form.subBranchNo" placeholder="支行联行行号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="支行名称：" required>
            <el-input v-model.trim="form.subBranchName" placeholder="支行名称" class="standard-form"></el-input>
          </el-form-item>


          <el-form-item label="银行预留手机号：" required>
            <el-input v-model.trim="form.bankReserveCell" placeholder="银行预留手机号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="开户行省编码："   >
            <el-select placeholder="请选择开户行省编码"
                       v-model="form.bankProvinceCode"
                       @change="getCitykh($event)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in area[86]">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户行市区编码："   >
            <el-select placeholder="请选择开户行市区编码"
                       v-model="form.bankCityCode"
                       @change="getCountrykh($event)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in citykh">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户行县区编码："  >
            <el-select placeholder="请选择开户行县区编码"
                       v-model="form.bankAreaCode"
            >
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in countrykh">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业证件类型：" >
            <el-radio-group v-model.trim="form.certType">
              <el-radio label="IDC">身份证</el-radio>
              <el-radio label="PSRT">护照</el-radio>
              <el-radio label="BLC">营业执照</el-radio>
              <el-radio label="USCC">统一社会信用代码</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="营业执照号：">
            <el-input v-model.trim="form.certNo" placeholder="营业执照号" class="standard-form"></el-input>
            <span class="tips">非小微商户必填</span>
          </el-form-item>

          <el-form-item label="营业执照注册名称：" required>
            <el-input v-model.trim="form.regMerName" placeholder="营业执照注册名称" class="standard-form"></el-input>
          </el-form-item>


          <el-form-item label="营业执照省编码："   >
            <el-select placeholder="请选择营业执照省编码"
                       v-model="form.regProvinceCode"
                       @change="getCityyy($event,item)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in area[86]">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业执照市区编码："   >
            <el-select placeholder="请选择营业执照市区编码"
                       v-model="form.regCityCode"
                       @change="getCountryyy($event,item)">
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in cityyy">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业执照县区编码："  >
            <el-select placeholder="请选择营业执照县区编码"
                       v-model="form.regAreaCode"  @change="setCountryy($event,item)"
            >
              <el-option :value="key"
                         :key="key"
                         :label="item"
                         v-for="(item, key, index)   in countryyy">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注册地址：" required>
            <el-input v-model.trim="form.regAddress" placeholder="注册地址" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="营业执照起始有效期：" >
            <el-date-picker v-model.trim="form.certValidStartDate" type="date" placeholder="营业执照起始有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="营业执照截止有效期：">
            <el-date-picker v-model.trim="form.certValidEndDate" type="date" placeholder="营业执照截止有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" >
            </el-date-picker>
          </el-form-item>

        </div>


      <div class="info">
        <p>手续费</p>
      </div>

      <el-form-item label="微信费率：">
        <el-input-number v-model="form.wxcalculateRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="微信费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="微信计费最小值：">
        <el-input-number v-model="form.wxcalculateMinAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="微信计费最小值">
        </el-input-number>
      </el-form-item>


      <el-form-item label="支付宝费率：">
        <el-input-number v-model="form.alcalculateRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="支付宝费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="支付宝计费最小值：">
        <el-input-number v-model="form.alcalculateMinAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="支付宝计费最小值">
        </el-input-number>
      </el-form-item>


      <el-form-item label="银联费率：">
        <el-input-number v-model="form.uncalculateRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="银联费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="银联折扣费率：">
        <el-input-number v-model="form.unpreferredRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="银联折扣费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="银联计费最小值：">
        <el-input-number v-model="form.uncalculateMinAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="银联计费最小值">
        </el-input-number>
      </el-form-item>

      <el-form-item label="云闪付借记卡费率：">
        <el-input-number v-model="form.ysfcalculateRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付借记卡费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="云闪付借记卡折扣费率：">
        <el-input-number v-model="form.ysfpreferredRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付借记卡折扣费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="云闪付借记卡计费最小值：">
        <el-input-number v-model="form.ysfcalculateMinAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付借记卡计费最小值">
        </el-input-number>
      </el-form-item>

      <el-form-item label="云闪付借记卡计费最大值：">
        <el-input-number v-model="form.ysfcalculateMaxAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付借记卡计费最大值">
        </el-input-number>
      </el-form-item>

      <el-form-item label="云闪付贷记卡费率：">
        <el-input-number v-model="form.ysf2calculateRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付贷记卡费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="云闪付贷记卡折扣费率：">
        <el-input-number v-model="form.ysf2preferredRate" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付贷记卡折扣费率">
        </el-input-number>百分之
      </el-form-item>

      <el-form-item label="云闪付贷记卡计费最小值：">
        <el-input-number v-model="form.ysf2calculateMinAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付贷记卡计费最小值">
        </el-input-number>
      </el-form-item>

      <el-form-item label="云闪付贷记卡计费最大值：">
        <el-input-number v-model="form.ysf2calculateMaxAmount" required
                         controls-position="right" :precision="2" :step="1" :min="0" :max="100"
                         label="云闪付贷记卡计费最大值">
        </el-input-number>
      </el-form-item>
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
                  <span v-if="formImgUrl.busLicImg_picurl!==''" :class="{'up-success':formImgUrl.busLicImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="businessUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.busLicImg_picurl" :src="formImgUrl.busLicImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>


            <!--手持身份证照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证照片</span>
                  <span v-if="formImgUrl.legalCertImg_picurl!==''" :class="{'up-success':formImgUrl.legalCertImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBodyUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalCertImg_picurl" :src="formImgUrl.legalCertImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证正面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证正面照</span>
                  <span v-if="formImgUrl.legalCertFrontImg_picurl!==''" :class="{'up-success':formImgUrl.legalCertFrontImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityFaceUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalCertFrontImg_picurl" :src="formImgUrl.legalCertFrontImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--法人身份证反面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>法人身份证反面照</span>
                  <span v-if="formImgUrl.legalCertReverseImg_picurl!==''" :class="{'up-success':formImgUrl.legalCertReverseImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="identityBackUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.legalCertReverseImg_picurl" :src="formImgUrl.legalCertReverseImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>


            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>银行卡正面照</span>
                  <span v-if="formImgUrl.bankCardImg_picurl!==''" :class="{'up-success':formImgUrl.bankCardImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settlementCardFrontUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.bankCardImg_picurl" :src="formImgUrl.bankCardImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--门头照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照</span>
                  <span v-if="formImgUrl.doorImg_picurl!==''" :class="{'up-success':formImgUrl.doorImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merchantHeadUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.doorImg_picurl" :src="formImgUrl.doorImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>内部前台照</span>
                  <span v-if="formImgUrl.cashierImg_picurl!==''" :class="{'up-success':formImgUrl.cashierImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="storeCashierUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.cashierImg_picurl" :src="formImgUrl.cashierImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>店内环境照</span>
                  <span v-if="formImgUrl.sceneImg_picurl!==''" :class="{'up-success':formImgUrl.sceneImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="storeIndoorUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.sceneImg_picurl" :src="formImgUrl.sceneImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>开户许可证照片</span>
                  <span v-if="formImgUrl.openBankImg_picurl!==''" :class="{'up-success':formImgUrl.openBankImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="bizplacepicUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.openBankImg_picurl" :src="formImgUrl.openBankImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>



            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>税务登记证照片</span>
                  <span v-if="formImgUrl.taxRegImg_picurl!==''" :class="{'up-success':formImgUrl.taxRegImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="taxRegImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.taxRegImg_picurl" :src="formImgUrl.taxRegImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>组织机构照/单位证明函</span>
                  <span v-if="formImgUrl.orgImg_picurl!==''" :class="{'up-success':formImgUrl.orgImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="orgImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.orgImg_picurl" :src="formImgUrl.orgImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>


            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算人身份证正面照</span>
                  <span v-if="formImgUrl.settleCertFrontImg_picurl!==''" :class="{'up-success':formImgUrl.settleCertFrontImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settleCertFrontImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settleCertFrontImg_picurl" :src="formImgUrl.settleCertFrontImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算人身份证反面照</span>
                  <span v-if="formImgUrl.settleCertReverseImg_picurl!==''" :class="{'up-success':formImgUrl.settleCertReverseImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="settleCertReverseImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.settleCertReverseImg_picurl" :src="formImgUrl.settleCertReverseImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>商户协议照</span>
                  <span v-if="formImgUrl.merAgreeImg_picurl!==''" :class="{'up-success':formImgUrl.merAgreeImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merAgreeImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.merAgreeImg_picurl" :src="formImgUrl.merAgreeImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>商户信息照</span>
                  <span v-if="formImgUrl.merInfoImg_picurl!==''" :class="{'up-success':formImgUrl.merInfoImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="merInfoImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.merInfoImg_picurl" :src="formImgUrl.merInfoImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>非法人结算授权书</span>
                  <span v-if="formImgUrl.authSettleImg_picurl!==''" :class="{'up-success':formImgUrl.authSettleImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="authSettleImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.authSettleImg_picurl" :src="formImgUrl.authSettleImg_picurl" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>非法人结算授权书</span>
                  <span v-if="formImgUrl.otherImg_picurl!==''" :class="{'up-success':formImgUrl.otherImg_picurl!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="otherImgUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.otherImg_picurl" :src="formImgUrl.otherImg_picurl" class="logo">
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
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">汇收钱保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="hsqInfoSubmit">提交资料到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="hsqPicSubmit">提交图片到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="hsqRegisterStatus">查询进件状态
          </el-button>
        </div>
      </el-card>

    </el-form>
  </div>
</template>

<script>

  import addresss from '@/assets/hsq/address.json' //地域数据
  import bank from '@/assets/hsq/bankcc.json' //地域数据
  import mcc from '@/assets/hsq/mcc.json' //地域数据

  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    url
  } from '@/utils/request'

  import {
    modifyMerchant,
    getHsqInfo,
    hsqRegister,
    hsqPic,
    hsqRegisterStatus,
    findPayTypeByChannel,
    hsqFindBankInfo
  } from '../api/hsq'
  import {
    checkVerify,
    saveRrecord
  } from '../api/public'

    export default {
      name: "hsq",
      props: ['status','payway','paywayname','payChannel','payChannelName','mode'],
      data(){
        return {
          area:addresss,
          bank:bank,
          mcc:mcc,
          creditcodeexpireCheck: false,
          legalidexpireCheck: false,
          branchBankName: '',
          bankInfo: [],
          cityjy:"",
          citykh:"",
          cityyy:"",
          countryjy:"",
          countrykh:"",
          countryyy:"",
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
            id:'',
            userType: '',//商户性质
            realName: '',//商户全称
            mccCode: '',//商户简称
            provinceCode: '',//所在省
            cityCode: '',//所在市
            areaCode: '',//客服电话
            address: '',//所属行业
            telNo: '',//营业执照名称

            legalPersonName: '',//法人代表证件类型 01 04 05
            legalCertType: '',//法人代表证件号
            legalCertNo: '',//法人身份证有效期 yyyy-mm-dd
            legalCertValidStartDate: '',//注册地址
            legalCertValidEndDate: '',//商户负责人
            legalPersonCell: '',//商户负责人电话
            legalPersonEmail: '',//结算方式 0自主提现 1结算到银行卡
            contactCell: '',//账户号
            contactEmail: '',//账户名

            accountType: '',//账户类型 0对私 1对公
            cardType: '',//账户类型 0对私 1对公
            settleType: '',//账户类型 0对私 1对公

            cardUserName: '',//结算人身份证号 对私结算必填
            bankId: '',//法人结算对私必填
            bankCardNo: '',//卡折类型 00借记卡 01存折
            subBranchNo: '',//卡折类型 00借记卡 01存折
            subBranchName: '',//所属银行
            bankProvinceCode: '',//支付行号
            bankCityCode: '',//扩展人
            bankAreaCode: '',//合同有效期
            bankReserveCell: '',//是否三证合一 1是0否

            certType: '',
            certNo: '',
            regMerName: '',
            regProvinceCode: '',
            regProvinceName: '',
            regCityCode: '',
            regCityName: '',
            regAreaCode: '',
            regAreaName: '',

            regAddress: '',
            certValidStartDate: '',
            certValidEndDate: '',
            paymentFees: '',

            legalCertFrontImg_picurl: '',//组织机构代码证有效期
            legalCertReverseImg_picurl: '',//法人手机号
            legalCertImg_picurl: '',//法人手机号
            bankCardImg_picurl: '',//法人手机号
            sceneImg_picurl: '',//法人手机号
            cashierImg_picurl: '',//法人手机号
            doorImg_picurl: '',//法人手机号
            busLicImg_picurl: '',//法人手机号
            openBankImg_picurl: '',//法人手机号
            otherImg_picurl: '',//法人手机号

            taxRegImg_picurl: '',//法人手机号
            orgImg_picurl: '',//法人手机号
            settleCertFrontImg_picurl: '',//法人手机号
            settleCertReverseImg_picurl: '',//法人手机号
            merAgreeImg_picurl: '',//法人手机号
            merInfoImg_picurl: '',//法人手机号
            authSettleImg_picurl: '',//法人手机号

            wxcalculateRate: '',
            wxcalculateMinAmount: '',
            alcalculateRate: '',
            alcalculateMinAmount: '',
            uncalculateRate: '',
            unpreferredRate: '',
            uncalculateMinAmount: '',
            ysfcalculateRate: '',
            ysfpreferredRate: '',
            ysfcalculateMinAmount: '',
            ysfcalculateMaxAmount: '',
            ysf2calculateRate: '',
            ysf2preferredRate: '',
            ysf2calculateMinAmount: '',
            ysf2calculateMaxAmount: '',

          },
          formImgUrl: {
            legalCertFrontImg_picurl: '',//组织机构代码证有效期
            legalCertReverseImg_picurl: '',//法人手机号
            legalCertImg_picurl: '',//法人手机号
            bankCardImg_picurl: '',//法人手机号
            sceneImg_picurl: '',//法人手机号
            cashierImg_picurl: '',//法人手机号
            doorImg_picurl: '',//法人手机号
            busLicImg_picurl: '',//法人手机号
            openBankImg_picurl: '',//法人手机号
            otherImg_picurl: '',//法人手机号

            taxRegImg_picurl: '',//法人手机号
            orgImg_picurl: '',//法人手机号
            settleCertFrontImg_picurl: '',//法人手机号
            settleCertReverseImg_picurl: '',//法人手机号
            merAgreeImg_picurl: '',//法人手机号
            merInfoImg_picurl: '',//法人手机号
            authSettleImg_picurl: '',//法人手机号
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
//        licenseTimeMode: function (nVal,oVal) {
//          if (nVal) {
//             this.form.licenseExpiryDate = '长期'
//          }
//        }
//        'licenseTimeMode': {
//          handler(nval, oval) {
//            if (nval) {
//              this.addForm.licenseExpiryDate = '长期'
//            }
//          }
//        },
      },

      methods: {

        getCityjy: function (city) {
          this.cityjy = this.area[city];
          this.countryjy ="";
          this.form.cityCode = ''
          this.form.areaCode = ''
        },
        getCitykh: function (city) {
          this.citykh = this.area[city];
          this.countrykh ="";
          this.form.bankCityCode = ''
          this.form.bankAreaCode = ''
        },
        getCityyy: function (city,item) {
          this.cityyy = this.area[city];
          this.countryyy ="";
          this.form.regProvinceName=item;
          this.form.regCityCode = ''
          this.form.regAreaCode = ''
        },

        getCountryjy: function (city) {
          this.countryjy = this.area[city];
          this.form.areaCode = ''
        },
        getCountrykh: function (city) {
          this.countrykh = this.area[city];
          this.form.bankAreaCode = ''
        },
        getCountryyy: function (city,item) {
          this.countryyy = this.area[city];
          this.form.regAreaCode = '';
          this.form.regCityName=item;
        },

        setCountryyy: function (city,item) {
          this.form.regAreaName=item;
        },


        hsqFindBankInfo: function (queryString, cb) {
          if (queryString.length > 1) {
            hsqFindBankInfo(queryString).then(res => {
              this.bankInfo = res.obj;
              cb(res.obj)
            }).catch(e => {

            })
          }
        },
        hsqFindBankInfoSelect: function (item) {
          if (item) {
            this.form.subBranchName   = item.fullBankName;
            this.form.subBranchNo = item.fullBankCode;
          }
        },

//        dxFindhyInfo: function (queryString, cb) {
//          let temp= [];
//          hangye.forEach((item, index) => {
//            if(item.first_name.indexOf(queryString)> -1||item.second_name.indexOf(queryString)> -1||item.third_name.indexOf(queryString)> -1){
//              let aa={};
//              aa.id=item.third_code;
//              aa.value=item.first_name+" | "+item.second_name+" | "+item.third_name;
//              temp.push(aa);
//            }
//          })
//          cb(temp)
//        },
//        dxFindhyInfoSelect: function (item) {
//          if (item) {
//            this.form.mccCode = item.id;
//          }
//        },


//        dxFindAreaInfo: function (queryString, cb) {
//          if (queryString.length > 1) {
//            let temp = [];
//            area.forEach((item, index) => {
//              if (item.province_name.indexOf(queryString) > -1 || item.city_name.indexOf(queryString) > -1 || item.county_name.indexOf(queryString) > -1) {
//                let aa={};
//                aa.id = item.county_code;
//                aa.value = item.province_name + " | " + item.city_name + " | " + item.county_name;
//                temp.push(aa);
//              }
//            })
//            cb(temp);
//          }
//        },
//
//        dxFindAreaInfoSelect: function (item) {
//          if (item) {
//            this.form.admDivCode = item.id;
//          }
//        },



        /**
         * 提交资料到第三方
         */
        hsqInfoSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          hsqRegister(id).then(res => {
            this.$message.success('资料提交第三方成功');
            setTimeout(() => {
              this.btnLoading = false
            }, 1000)
          }).catch(e => {
            this.btnLoading = false
          })

        },


        hsqPicSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          hsqPic(id).then(res => {
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
        hsqRegisterStatus: function () {
          let id = this.urlid;
          hsqRegisterStatus(id).then(res => {
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
          getHsqInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 编辑拉取已进件资料
        modifyMerchantInfo: function (id) {
          // 编辑模式
          getHsqInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 审核模式拉取资料
        verifyMerchantInfo: function (id) {
          // 编辑模式和审核模式
          getHsqInfo(id, this.payChannel).then(res => {
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
          let data = raw.hsqMchInfo; // 基本数据

          this.form.id = data.id || ''; // 数据id


          if( data.provinceCode!=""){
            this.cityjy = this.area[data.provinceCode];
          }
          if( data.cityCode!=""){
            this.countryjy = this.area[data.cityCode];
          }

          if( data.bankProvinceCode!=""){
            this.citykh = this.area[data.bankProvinceCode];
          }
          if( data.bankCityCode!=""){
            this.countrykh = this.area[data.bankCityCode];
          }

          if( data.regProvinceCode!=""){
            this.cityyy = this.area[data.bankProvinceCode];
          }
          if( data.regCityCode!=""){
            this.countryyy = this.area[data.bankCityCode];
          }
          this.form.userType= data.userType|| '';
          this.form.realName= data.realName|| '';
          this.form.mccCode= data.mccCode|| '';
          this.form.provinceCode= data.provinceCode|| '';
          this.form.cityCode= data.cityCode|| '';
          this.form.areaCode= data.areaCode|| '';
          this.form.address= data.address|| '';
          this.form.telNo= data.telNo|| '';

          this.form.legalPersonName= data.legalPersonName|| '';
          this.form.legalCertType= data.legalCertType|| '';
          this.form.legalCertNo= data.legalCertNo|| '';
          this.form.legalCertValidStartDate= data.legalCertValidStartDate||'';
          this.form.legalCertValidEndDate= data.legalCertValidEndDate|| '';
          this.form.legalPersonCell= data.legalPersonCell|| '';
          this.form.legalPersonEmail= data.legalPersonEmail|| '';
          this.form.contactCell= data.contactCell|| '';
          this.form.contactEmail= data.contactEmail|| '';


          this.form.certType= data.certType|| '';
          this.form.certNo= data.certNo|| '';
          this.form.regMerName= data.regMerName|| '';
          this.form.regProvinceCode= data.regProvinceCode||'';
          this.form.regProvinceName= data.regProvinceName|| '';
          this.form.regCityCode= data.regCityCode|| '';
          this.form.regCityName= data.regCityName|| '';
          this.form.regAreaCode= data.regAreaCode|| '';
          this.form.regAreaName= data.regAreaName|| '';


          this.form.accountType= data.accountType|| '';
          this.form.bankCardNo= data.bankCardNo|| '';
          this.form.settleType= data.settleType|| '';
          this.form.cardType= data.cardType|| '';
          this.form.cardUserName= data.cardUserName|| '';
          this.form.bankId= data.bankId|| '';
          this.form.subBranchNo= data.subBranchNo|| '';
          this.form.subBranchName= data.subBranchName|| '';
          this.form.bankProvinceCode= data.bankProvinceCode|| '';
          this.form.bankCityCode= data.bankCityCode|| '';
          this.form.bankAreaCode= data.bankAreaCode|| '';
          this.form.bankReserveCell= data.bankReserveCell|| '';

          this.form.regAddress= data.regAddress|| '';
          this.form.certValidStartDate= data.certValidStartDate|| '';
          this.form.certValidEndDate= data.certValidEndDate|| '';

          this.form.wxcalculateRate= data.wxcalculateRate|| '';
          this.form.wxcalculateMinAmount= data.wxcalculateMinAmount|| '';

          this.form.alcalculateRate= data.alcalculateRate|| '';
          this.form.alcalculateMinAmount= data.alcalculateMinAmount|| '';

          this.form.uncalculateRate= data.uncalculateRate|| '';
          this.form.unpreferredRate= data.unpreferredRate|| '';
          this.form.uncalculateMinAmount= data.uncalculateMinAmount|| '';

          this.form.ysfcalculateRate= data.ysfcalculateRate|| '';
          this.form.ysfpreferredRate= data.ysfpreferredRate|| '';
          this.form.ysfcalculateMinAmount= data.ysfcalculateMinAmount|| '';
          this.form.ysfcalculateMaxAmount= data.ysfcalculateMaxAmount|| '';

          this.form.ysf2calculateRate= data.ysf2calculateRate|| '';
          this.form.ysf2preferredRate= data.ysf2preferredRate|| '';
          this.form.ysf2calculateMinAmount= data.ysf2calculateMinAmount|| '';
          this.form.ysf2calculateMaxAmount= data.ysf2calculateMaxAmount|| '';

          this.form.legalCertFrontImg_picurl = data.legalCertFrontImg_picurl || '';
          this.form.legalCertReverseImg_picurl = data.legalCertReverseImg_picurl || '';
          this.form.legalCertImg_picurl = data.legalCertImg_picurl || '';
          this.form.bankCardImg_picurl = data.bankCardImg_picurl || '';
          this.form.sceneImg_picurl = data.sceneImg_picurl || '';
          this.form.cashierImg_picurl = data.cashierImg_picurl || '';
          this.form.doorImg_picurl = data.doorImg_picurl || '';
          this.form.busLicImg_picurl = data.busLicImg_picurl || '';
          this.form.openBankImg_picurl = data.openBankImg_picurl || '';
          this.form.otherImg_picurl = data.otherImg_picurl || '';

          this.form.taxRegImg_picurl = data.taxRegImg_picurl || '';
          this.form.orgImg_picurl = data.orgImg_picurl || '';
          this.form.settleCertFrontImg_picurl = data.settleCertFrontImg_picurl || '';
          this.form.settleCertReverseImg_picurl = data.settleCertReverseImg_picurl || '';
          this.form.merAgreeImg_picurl = data.merAgreeImg_picurl || '';
          this.form.merInfoImg_picurl = data.merInfoImg_picurl || '';
          this.form.authSettleImg_picurl = data.authSettleImg_picurl || '';

          this.formImgUrl.taxRegImg_picurl = this.imgFil(data.taxRegImg_picurl);
          this.formImgUrl.orgImg_picurl = this.imgFil(data.orgImg_picurl);
          this.formImgUrl.settleCertFrontImg_picurl = this.imgFil(data.settleCertFrontImg_picurl);
          this.formImgUrl.settleCertReverseImg_picurl = this.imgFil(data.settleCertReverseImg_picurl);
          this.formImgUrl.merAgreeImg_picurl = this.imgFil(data.merAgreeImg_picurl);
          this.formImgUrl.merInfoImg_picurl = this.imgFil(data.merInfoImg_picurl);
          this.formImgUrl.authSettleImg_picurl = this.imgFil(data.authSettleImg_picurl);

          // 获取链接
          this.formImgUrl.legalCertFrontImg_picurl = this.imgFil(data.legalCertFrontImg_picurl);
          this.formImgUrl.legalCertReverseImg_picurl = this.imgFil(data.legalCertReverseImg_picurl);
          this.formImgUrl.legalCertImg_picurl = this.imgFil(data.legalCertImg_picurl);
          this.formImgUrl.bankCardImg_picurl = this.imgFil(data.bankCardImg_picurl);
          this.formImgUrl.sceneImg_picurl = this.imgFil(data.sceneImg_picurl);
          this.formImgUrl.cashierImg_picurl = this.imgFil(data.cashierImg_picurl);
          this.formImgUrl.doorImg_picurl = this.imgFil(data.doorImg_picurl);
          this.formImgUrl.busLicImg_picurl = this.imgFil(data.busLicImg_picurl);
          this.formImgUrl.openBankImg_picurl = this.imgFil(data.openBankImg_picurl);
          this.formImgUrl.otherImg_picurl = this.imgFil(data.otherImg_picurl);

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
          this.form.busLicImg_picurl = response.obj.path;
          this.formImgUrl.busLicImg_picurl = this.imgFil(response.obj.path)
        },

        taxRegImgUpload(response, file) {
          console.log(response);
          this.$message({
            message: '税务登记照上传成功',
            type: 'success'
          });
          this.form.taxRegImg_picurl = response.obj.path;
          this.formImgUrl.taxRegImg_picurl = this.imgFil(response.obj.path)
        },

        orgImgUpload(response, file) {
          console.log(response);
          this.$message({
            message: '组织机构证件照上传成功',
            type: 'success'
          });
          this.form.orgImg_picurl = response.obj.path;
          this.formImgUrl.orgImg_picurl = this.imgFil(response.obj.path)
        },

        identityBodyUpload(response, file) {
          console.log(response);
          this.$message({
            message: '手持身份证照片上传成功',
            type: 'success'
          });
          this.form.legalCertImg_picurl = response.obj.path;
          this.formImgUrl.legalCertImg_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证正面照
        identityFaceUpload(response, file) {
          console.log(response);
          this.$message({
            message: '法人身份证正面照上传成功',
            type: 'success'
          });
          this.form.legalCertFrontImg_picurl = response.obj.path;
          this.formImgUrl.legalCertFrontImg_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证正面照
        contactPersonIdCardFrontUpload(response, file) {
          console.log(response);
          this.$message({
            message: '联系人身份证正面照上传成功',
            type: 'success'
          });
          this.form.settleCertFrontImg_picurl = response.obj.path;
          this.formImgUrl.settleCertFrontImg_picurl = this.imgFil(response.obj.path)
        },

        // 法人身份证反面照
        identityBackUpload(response, file) {
          console.log(response);
          this.$message({
            message: '法人身份证反面照上传成功',
            type: 'success'
          });
          this.form.legalCertReverseImg_picurl = response.obj.path;
          this.formImgUrl.legalCertReverseImg_picurl = this.imgFil(response.obj.path)
        },


        // 法人身份证反面照
        settlementCardFrontUpload(response, file) {
          console.log(response);
          this.$message({
            message: '银行卡正面照上传成功',
            type: 'success'
          });
          this.form.bankCardImg_picurl = response.obj.path;
          this.formImgUrl.bankCardImg_picurl = this.imgFil(response.obj.path)
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
          this.form.cashierImg_picurl = response.obj.path;
          this.formImgUrl.cashierImg_picurl = this.imgFil(response.obj.path)
        },

        storeIndoorUpload(response, file) {
          console.log(response);
          this.$message({
            message: '经营场所照片上传成功',
            type: 'success'
          });
          this.form.sceneImg_picurl = response.obj.path;
          this.formImgUrl.sceneImg_picurl = this.imgFil(response.obj.path)
        },

        bizplacepicUpload(response,file){
          console.log(response);
          this.$message({
            message: '开户许可照片上传成功',
            type: 'success'
          });
          this.form.openBankImg_picurl = response.obj.path;
          this.formImgUrl.openBankImg_picurl = this.imgFil(response.obj.path)
        },

        authSettleImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '非法人结算授权书照片上传成功',
            type: 'success'
          });
          this.form.authSettleImg_picurl = response.obj.path;
          this.formImgUrl.authSettleImg_picurl = this.imgFil(response.obj.path)
        },

        settleCertFrontImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '结算人身份证正面照片上传成功',
            type: 'success'
          });
          this.form.settleCertFrontImg_picurl = response.obj.path;
          this.formImgUrl.settleCertFrontImg_picurl = this.imgFil(response.obj.path)
        },

        settleCertReverseImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '结算人身份证反面照片上传成功',
            type: 'success'
          });
          this.form.settleCertReverseImg_picurl = response.obj.path;
          this.formImgUrl.settleCertReverseImg_picurl = this.imgFil(response.obj.path)
        },

        merAgreeImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '商户协议照片上传成功',
            type: 'success'
          });
          this.form.merAgreeImg_picurl = response.obj.path;
          this.formImgUrl.merAgreeImg_picurl = this.imgFil(response.obj.path)
        },

        merInfoImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '商户信息照照片上传成功',
            type: 'success'
          });
          this.form.merInfoImg_picurl = response.obj.path;
          this.formImgUrl.merInfoImg_picurl = this.imgFil(response.obj.path)
        },

        otherImgUpload(response,file){
          console.log(response);
          this.$message({
            message: '其他凭证照片上传成功',
            type: 'success'
          });
          this.form.otherImg_picurl = response.obj.path;
          this.formImgUrl.otherImg_picurl = this.imgFil(response.obj.path)
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
