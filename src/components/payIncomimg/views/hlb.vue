<template>
  <div v-loading="loading">
    <p class="cus-title">当前是{{payChannelName}}进件</p>
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-suffix="：" :label-width="labelWidth" size="small">
      <!--结算信息-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>{{payChannelName}}进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单start-->
        <div divName="合利宝进件">

          <div class="info">
            <p>商户基本信息</p>
          </div>


          <el-form-item label="商户类型" prop="merchantType">
            <el-select v-model="addForm.merchantType" placeholder="请选择商户类型" class="input-width">
              <el-option label="企业商户" value="ENTERPRISE"></el-option>
              <el-option label="事业单位商户" value="INSTITUTION"></el-option>
              <el-option label="个体工商户" value="INDIVIDUALBISS"></el-option>
              <el-option label="个人商户(小微商户)" value="PERSON"></el-option>
              <el-option label="其他组织" value="SUBJECT_TYPE_OTHERS"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商户签约名" prop="signName">
            <el-input v-model.trim="addForm.signName" placeholder="按右侧提示要求填写， 5 到 150 个字符"
                      class="input-width"></el-input>
            <!--<el-tooltip class="item" effect="light" content="营业执照上的工商注册名称（个人商户除外）；个人商户请传“店铺名”，至少5个汉字。" placement="top">-->
            <el-tooltip class="item" effect="light" content="1）商户名称必须与商家营业执照上的名称一致
2）若个体工商户营业执照没有商家名称或者名称为“*”或者“***”，则商户名称应填 “个体户XXX”（XXX为营业执照上经营者姓名）
3）若商家为小微商户，则商户名称应填 “商户_XXX”（XXX为小微商户身份证上的姓名）" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="展示名" prop="showName">
            <el-input v-model.trim="addForm.showName" placeholder="用于收银台的展示名， 2 到 20 个字符"
                      class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="商户网站地址" prop="webSite">
            <el-input v-model.trim="addForm.webSite" placeholder="商户网站地址，非必填" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="接入地址" prop="accessUrl">
            <el-input v-model.trim="addForm.accessUrl" placeholder="接入地址，非必填" class="input-width"></el-input>
          </el-form-item>

          <!--          <el-form-item label="是否优质商户" prop="qualityMerchant">-->
          <!--            <el-switch-->
          <!--              v-model="addForm.qualityMerchant"-->
          <!--              active-text="是"-->
          <!--              inactive-text="否">-->
          <!--            </el-switch>-->
          <!--          </el-form-item>-->

          <el-form-item label="商户类别" prop="distinguishMerchant">
            <el-radio-group v-model="addForm.distinguishMerchant">
              <el-radio :label="1">普通商户</el-radio>
              <el-radio :label="2">优质商户</el-radio>
              <el-radio :label="3">刷脸优质商户</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否需要特殊处理商户名" required>


            <el-select v-model="addForm.specialSignName"  class="input-width">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
            <el-tooltip class="item" effect="light" content="营业执照为*或个人商户才选是"
                        placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <div class="info">
            <p>法人或经营者信息</p>
          </div>

          <el-form-item label="法人/经营者姓名" prop="legalPerson">
            <el-input v-model.trim="addForm.legalPerson" placeholder="真实姓名" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="法人/经营者身份证" prop="legalPersonID">
            <el-input v-model.trim="addForm.legalPersonID" placeholder="公民身份证号码" class="input-width"></el-input>
          </el-form-item>

          <div class="info">
            <p>营业证照信息</p>
          </div>

          <el-form-item label="组织机构号" prop="orgNum">
            <el-input v-model.trim="addForm.orgNum" placeholder="注意按规则填写" class="input-width"></el-input>
            <el-tooltip class="item" effect="light" content="若为个人商户，统一填写身份证号；若为三证合一商户，则统一填营业执照号；其他类型商户则填写组织机构号"
                        placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="营业执照号" prop="businessLicense">
            <el-input v-model.trim="addForm.businessLicense" placeholder="营业执照号" class="input-width"></el-input>
          </el-form-item>

          <div class="info">
            <p>联系信息</p>
          </div>

          <el-form-item label="省份" prop="province">
            <el-select placeholder="请选择省份" class="input-width"
                       v-model="addForm.province"
                       @change="setProv($event)">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in provOption">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="市" prop="city">
            <el-select placeholder="请选择城市" class="input-width"
                       @change="setCity()"
                       v-model="addForm.city">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in cityOption">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="区县" prop="regionCode">
            <el-select placeholder="请选择区县" class="input-width"
                       v-model="addForm.regionCode">
              <el-option
                v-for="(n,index) in areaOption"
                :value="n.areaCode"
                :key="index"
                :label="n.area">
                <span style="float: left">{{ n.area }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ n.areaCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="区县编码" prop="regionCode">
            <el-input v-model.trim="addForm.regionCode" placeholder="区县级编码" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="通讯地址" prop="address">
            <el-input v-model.trim="addForm.address" placeholder="通讯地址，精确到门牌号" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系人" prop="linkman">
            <el-input v-model.trim="addForm.linkman" placeholder="联系人姓名" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系人手机号" prop="linkPhone">
            <el-input v-model.trim="addForm.linkPhone" placeholder="联系人手机号码" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系人电子邮箱" prop="email">
            <el-input v-model.trim="addForm.email" placeholder="电子邮箱地址（唯一）" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系人身份证号" prop="linkManId">
            <el-input v-model.trim="addForm.linkManId" placeholder="联系人身份证号，开通微信产品必填" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="绑定手机号" prop="bindMobile">
            <el-input v-model.trim="addForm.bindMobile" placeholder="绑定手机号，非必填" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="客服联系电话" prop="servicePhone">
            <el-input v-model.trim="addForm.servicePhone" placeholder="客服联系电话，非必填" class="input-width"></el-input>
          </el-form-item>

          <div class="info">
            <p>结算信息</p>
          </div>

          <el-form-item label="结算卡类型" prop="settleBankType">
            <el-radio-group v-model="addForm.settleBankType">
              <el-radio label="TOPRIVATE">对私</el-radio>
              <el-radio label="TOPUBLIC">对公</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="联行号" prop="bankCode">
            <el-input v-model.trim="addForm.bankCode" placeholder="结算账户联行号" class="input-width"></el-input>
            <span class="tips"> 联行号参考<a style="color: #1e6abc" @click="downloadFile('bankCode')"> 查询</a></span>
          </el-form-item>

          <el-form-item label="开户姓名" prop="accountName">
            <el-input v-model.trim="addForm.accountName" placeholder="结算账户开户姓名" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="开户账号" prop="accountNo">
            <el-input v-model.trim="addForm.accountNo" placeholder="结算账户的账号" class="input-width"></el-input>
          </el-form-item>


          <el-form-item label="结算类型" prop="settlementPeriod">
            <el-radio-group v-model="addForm.settlementPeriod">
              <el-radio label="T1">T1：工作日隔天结算</el-radio>
              <el-radio label="D1">D1：自然日隔天结算</el-radio>
              <el-radio label="D0" :disabled="true">D0：当日结算（目前不支持）</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算方式" prop="settlementMode">
            <el-radio-group v-model="addForm.settlementMode">
              <el-radio label="AUTO">自动结算</el-radio>
              <el-radio label="NOTOPEN" :disabled="true">不开通</el-radio>
              <el-radio label="SELF" :disabled="true">自主结算</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算备注" prop="settlementRemark">
            <el-input v-model.trim="addForm.settlementRemark" placeholder="自动结算 / 自主结算所使用的备注信息，非必填"
                      class="input-width"></el-input>
          </el-form-item>

          <div class="info">
            <p>经营信息与扩展信息</p>
          </div>

          <el-form-item label="经营类别" prop="merchantCategory">
            <el-select v-model="addForm.merchantCategory" @change="setCategory($event)" placeholder="请选择经营类别"
                       class="input-width">
              <el-option
                v-for="item in merchantCategoryOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="行业类型" prop="industryTypeCode">
            <el-select placeholder="请选择行业类型换区编码" class="input-width"
                       v-model="addForm.industryTypeCode">
              <el-option
                v-for="(n,index) in categoryOption"
                :value="n.industryTypeCode"
                :key="index"
                :label="n.categoryName">
                <span style="float: left">{{ n.categoryName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ n.industryTypeCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="行业类型编码" prop="industryTypeCode">
            <el-input v-model.trim="addForm.industryTypeCode" placeholder="行业类型编码，非必填" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="是否需要开通 POS 功能" prop="needPosFunction">
            <el-switch
              v-model="addForm.needPosFunction"
              active-text="开通"
              inactive-text="不开通">
            </el-switch>
          </el-form-item>

          <el-form-item label="是否需要开通微信产品" prop="needOpenWX">
            <el-switch
              v-model="addForm.needOpenWX"
              active-text="开通"
              inactive-text="不开通">
            </el-switch>
          </el-form-item>


          <el-form-item label="法人身份证有效期" v-if="addForm.needOpenWX">

            <div class="block">
              <el-form-item label="开始日期" label-width="100px" prop="idCardStartDate">
                <el-date-picker
                  v-model="addForm.idCardStartDate"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="block">
              <el-form-item label="结束日期" label-width="100px" prop="idCardEndDate" v-if="!idCardExpMode">
                <el-date-picker
                  v-model="addForm.idCardEndDate"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyyMMdd">
                </el-date-picker>
              </el-form-item>
            </div>

            <el-form-item class="block" :required="false">
              <el-checkbox class="block" v-model="idCardExpMode">长期</el-checkbox>
            </el-form-item>
          </el-form-item>

          <el-form-item label="经营起始日期"
                        v-if="addForm.needOpenWX && addForm.merchantType!=='PERSON' && addForm.merchantType!==''">
            <!--开通微信功能,且非个人-->
            <el-form-item label="开始日期" label-width="100px" class="block" prop="businessDateStart">
              <el-date-picker
                v-model="addForm.businessDateStart"
                type="date"
                placeholder="开始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="结束日期" label-width="100px" class="block" prop="businessDateLimit">
              <el-date-picker
                v-model="addForm.businessDateLimit"
                type="date"
                placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>


          <el-form-item label="开户人身份证" prop="accountIdCard" v-if="addForm.needPosFunction">
            <!--开通pos功能才会显示-->
            <el-input v-model.trim="addForm.accountIdCard" placeholder="开户人身份证" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="银联 mcc 码" prop="mcc" v-if="addForm.needPosFunction">
            <!--开通pos功能才会显示-->
            <el-input v-model.trim="addForm.mcc" placeholder="银联 mcc 码" class="input-width"></el-input>
            <span class="tips">MCC码(4位数字)需向银联查询，<a style="color: #1e6abc" @click="downloadFile('mcc')">前往查询</a></span>
          </el-form-item>

          <el-form-item label="结算模式" prop="settleMode">
            <el-select v-model="addForm.settleMode" placeholder="请选择结算模式" class="input-width">
              <el-option label="按商户结算，正常结算" value="MERCHANT"></el-option>
              <el-option label="按结算人结算，支持同平台商下，结算卡号一致的结算单合并成一笔出款" value="MERGE"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业执照中注册地址" prop="postalAddress">
            <el-input v-model.trim="addForm.postalAddress" placeholder="营业执照中注册地址" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="小微经营类型" prop="microBizType" v-if="addForm.merchantType==='PERSON'">
            <!--个人商户才会显示-->
            <el-select v-model="addForm.microBizType" placeholder="小微经营类型" class="input-width">
              <el-option label="门店场所" value="MICRO_TYPE_STORE"></el-option>
              <el-option label="流动经营/便民服务" value="MICRO_TYPE_MOBILE"></el-option>
              <el-option label="线上商品/服务交易" value="MICRO_TYPE_ONLINE"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="证书类型" prop="certType" v-if="addForm.merchantType==='INSTITUTION'">
            <!--事业单位才会显示-->
            <el-select v-model="addForm.certType" placeholder="请选择证书类型" class="input-width">
              <el-option
                v-for="item in certTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


        </div>
        <!--表单end-->
      </el-card>

      <!--费率start-->
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
                               :disabled="addForm.distinguishMerchant!=1"
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
      <!--费率end-->

      <!--图片资料-->
      <el-card class="box-card" style="margin-top: 14px">
        <div slot="header" class="clearfix">
          <span>相关资质照片</span>
        </div>
        <!--图片表单start-->
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
                  :accept="accept"
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

            <!--经营场所内设照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>经营场所内设照片</span>
                  <span v-if="formImgUrl.otherPhoto3!=''">&nbsp</span>
                  <span v-if="formImgUrl.otherPhoto3!=''"
                        :class="{'up-success':formImgUrl.otherPhoto3!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--收银台照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>收银台照片</span>
                  <span v-if="formImgUrl.merchantCheck!=''">&nbsp</span>
                  <span v-if="formImgUrl.merchantCheck!=''"
                        :class="{'up-success':formImgUrl.merchantCheck!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--银行卡正面照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>银行卡正面照</span>
                  <span v-if="formImgUrl.cardFace!=''">&nbsp</span>
                  <span v-if="formImgUrl.cardFace!=''"
                        :class="{'up-success':formImgUrl.cardFace!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--手持银行卡照-->
            <el-card v-if="ENTERPRISE_TOPRIVATE||INDIVIDUALBISS_TOPRIVATE"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持银行卡照</span>
                  <span v-if="formImgUrl.cardFaceBody!=''">&nbsp</span>
                  <span v-if="formImgUrl.cardFaceBody!=''"
                        :class="{'up-success':formImgUrl.cardFaceBody!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="cardFaceBodyUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.cardFaceBody" :src="formImgUrl.cardFaceBody" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--开户许可证,-->
            <el-card  v-if="ENTERPRISE_TOPRIVATE||INDIVIDUALBISS_TOPRIVATE"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>开户许可</span>
                  <span v-if="formImgUrl.bussinessCard!=''">&nbsp</span>
                  <span v-if="formImgUrl.bussinessCard!=''"
                        :class="{'up-success':formImgUrl.bussinessCard!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--结算人结算授权书-->
            <el-card
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算人结算授权书</span>
                  <span v-if="formImgUrl.priAuth!=''">&nbsp</span>
                  <span v-if="formImgUrl.priAuth!=''"
                        :class="{'up-success':formImgUrl.priAuth!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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


            <!--结算人身份证正面-->
            <el-card
              :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算人身份证正面</span>
                  <span v-if="formImgUrl.identityFaceCopy!=''">&nbsp</span>
                  <span v-if="formImgUrl.identityFaceCopy!=''"
                        :class="{'up-success':formImgUrl.identityFaceCopy!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--结算人身份证背面-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>结算人身份证背面</span>
                  <span v-if="formImgUrl.identityBackCopy!=''">&nbsp</span>
                  <span v-if="formImgUrl.identityBackCopy!=''"
                        :class="{'up-success':formImgUrl.identityBackCopy!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--营业执照照片（三证合一）-->
            <el-card v-if="ENTERPRISE_TOPRIVATE||ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPRIVATE||INDIVIDUALBISS_TOPUBLIC"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业执照（三证合一）</span>
                  <span v-if="formImgUrl.bussiness!=''">&nbsp</span>
                  <span v-if="formImgUrl.bussiness!=''"
                        :class="{'up-success':formImgUrl.bussiness!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--营业执照照片-->
            <el-card v-if="ENTERPRISE_TOPRIVATE||ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPRIVATE||INDIVIDUALBISS_TOPUBLIC"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业执照</span>
                  <span v-if="formImgUrl.bussiness2!=''">&nbsp</span>
                  <span v-if="formImgUrl.bussiness2!=''"
                        :class="{'up-success':formImgUrl.bussiness2!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="bussiness2Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.bussiness2" :src="formImgUrl.bussiness2" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证正面-->
            <el-card
              v-if="ENTERPRISE_TOPRIVATE||ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPRIVATE||INDIVIDUALBISS_TOPUBLIC||PERSON"
              :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
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
                  :accept="accept"
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

            <!--法人身份证反面-->
            <el-card
              v-if="ENTERPRISE_TOPRIVATE||ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPRIVATE||INDIVIDUALBISS_TOPUBLIC||PERSON"
              :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
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
                  :accept="accept"
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

            <!--手持身份证照-->
            <el-card v-if="ENTERPRISE_TOPRIVATE||INDIVIDUALBISS_TOPRIVATE"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证照</span>
                  <span v-if="formImgUrl.identityBody!=''">&nbsp</span>
                  <span v-if="formImgUrl.identityBody!=''"
                        :class="{'up-success':formImgUrl.identityBody!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--组织机构代码证-->
            <el-card v-if="ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPUBLIC"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>组织机构代码证</span>
                  <span v-if="formImgUrl.organizationCodeId!=''">&nbsp</span>
                  <span v-if="formImgUrl.organizationCodeId!=''"
                        :class="{'up-success':formImgUrl.organizationCodeId!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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

            <!--税务登记证-->
            <el-card v-if="ENTERPRISE_TOPUBLIC||INDIVIDUALBISS_TOPUBLIC"
                     :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>税务登记证</span>
                  <span v-if="formImgUrl.taxRegistrationCertificate!=''">&nbsp</span>
                  <span v-if="formImgUrl.taxRegistrationCertificate!=''"
                        :class="{'up-success':formImgUrl.taxRegistrationCertificate!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="taxRegistrationCertificateUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.taxRegistrationCertificate" :src="formImgUrl.taxRegistrationCertificate"
                       class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--报名蓝海绿洲-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>报名蓝海绿洲</span>
                  <span v-if="formImgUrl.other!=''">&nbsp</span>
                  <span v-if="formImgUrl.other!=''"
                        :class="{'up-success':formImgUrl.other!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="otherUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other" :src="formImgUrl.other" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--其他图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他图片-2</span>
                  <span v-if="formImgUrl.other2!=''">&nbsp</span>
                  <span v-if="formImgUrl.other2!=''"
                        :class="{'up-success':formImgUrl.other2!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
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
            <!--其他图片3-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他图片-3</span>
                  <span v-if="formImgUrl.other3!=''">&nbsp</span>
                  <span v-if="formImgUrl.other3!=''"
                        :class="{'up-success':formImgUrl.other3!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="other3Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other3" :src="formImgUrl.other3" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--其他图片4-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他图片-4</span>
                  <span v-if="formImgUrl.other4!=''">&nbsp</span>
                  <span v-if="formImgUrl.other4!=''"
                        :class="{'up-success':formImgUrl.other4!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="other4Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other4" :src="formImgUrl.other4" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--其他图片5-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他图片-5</span>
                  <span v-if="formImgUrl.other5!=''">&nbsp</span>
                  <span v-if="formImgUrl.other5!=''"
                        :class="{'up-success':formImgUrl.other5!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="other5Upload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.other5" :src="formImgUrl.other5" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--活动收银台照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>活动收银台照</span>
                  <span v-if="formImgUrl.activityMerchantCheck!=''">&nbsp</span>
                  <span v-if="formImgUrl.activityMerchantCheck!=''"
                        :class="{'up-success':formImgUrl.activityMerchantCheck!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="activityMerchantCheckUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.activityMerchantCheck" :src="formImgUrl.activityMerchantCheck" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--转租证明-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>转租证明</span>
                  <span v-if="formImgUrl.rentPhoto!=''">&nbsp</span>
                  <span v-if="formImgUrl.rentPhoto!=''"
                        :class="{'up-success':formImgUrl.rentPhoto!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="rentPhotoUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.rentPhoto" :src="formImgUrl.rentPhoto" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--财务室照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>财务室照</span>
                  <span v-if="formImgUrl.accountOffice!=''">&nbsp</span>
                  <span v-if="formImgUrl.accountOffice!=''"
                        :class="{'up-success':formImgUrl.accountOffice!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="accountOfficeUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.accountOffice" :src="formImgUrl.accountOffice" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--办学资质证明照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>办学资质证明</span>
                  <span v-if="formImgUrl.schoolLicense!=''">&nbsp</span>
                  <span v-if="formImgUrl.schoolLicense!=''"
                        :class="{'up-success':formImgUrl.schoolLicense!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="schoolLicenseUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.schoolLicense" :src="formImgUrl.schoolLicense" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--收费样本-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>收费样本</span>
                  <span v-if="formImgUrl.chargeSample!=''">&nbsp</span>
                  <span v-if="formImgUrl.chargeSample!=''"
                        :class="{'up-success':formImgUrl.chargeSample!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="chargeSampleUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.chargeSample" :src="formImgUrl.chargeSample" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--民办非企业单位登记证书图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>民办非企登记证</span>
                  <span v-if="formImgUrl.nonenterpriseUnits!=''">&nbsp</span>
                  <span v-if="formImgUrl.nonenterpriseUnits!=''"
                        :class="{'up-success':formImgUrl.nonenterpriseUnits!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="nonenterpriseUnitsUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.nonenterpriseUnits" :src="formImgUrl.nonenterpriseUnits" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--照会-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>照会</span>
                  <span v-if="formImgUrl.diplomaticNote!=''">&nbsp</span>
                  <span v-if="formImgUrl.diplomaticNote!=''"
                        :class="{'up-success':formImgUrl.diplomaticNote!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="diplomaticNoteUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.diplomaticNote" :src="formImgUrl.diplomaticNote" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--证明文件图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>证明文件图片</span>
                  <span v-if="formImgUrl.certificateFile!=''">&nbsp</span>
                  <span v-if="formImgUrl.certificateFile!=''"
                        :class="{'up-success':formImgUrl.certificateFile!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="certificateFileUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.certificateFile" :src="formImgUrl.certificateFile" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
            <!--医疗执业许可证图片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>医疗执业许可证</span>
                  <span v-if="formImgUrl.medicalInstrumentPracticeLicense!=''">&nbsp</span>
                  <span v-if="formImgUrl.medicalInstrumentPracticeLicense!=''"
                        :class="{'up-success':formImgUrl.medicalInstrumentPracticeLicense!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="medicalInstrumentPracticeLicenseUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.medicalInstrumentPracticeLicense"
                       :src="formImgUrl.medicalInstrumentPracticeLicense" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>(修改结算卡时)结算指定书</span>
                  <span v-if="formImgUrl.authorizationForSettlement!=''">&nbsp</span>
                  <span v-if="formImgUrl.authorizationForSettlement!=''"
                        :class="{'up-success':formImgUrl.authorizationForSettlement!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="authorizationForSettlementUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.authorizationForSettlement"
                       :src="formImgUrl.authorizationForSettlement" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>(修改结算卡时)银行开户证明</span>
                  <span v-if="formImgUrl.accountOpeningCertificate!=''">&nbsp</span>
                  <span v-if="formImgUrl.accountOpeningCertificate!=''"
                        :class="{'up-success':formImgUrl.accountOpeningCertificate!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  :accept="accept"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="accountOpeningCertificateUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.accountOpeningCertificate"
                       :src="formImgUrl.accountOpeningCertificate" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>


            <!--*************-->
          </div>
        </div>
        <!--图片表单end-->
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
          <el-button type="primary" v-if="comStatus===2" :loading="btnLoading" @click="uploadThirdInfo">提交文字资料至合利宝
          </el-button>
          <el-button type="primary" v-if="comStatus===4" :loading="btnLoading" @click="uploadThirdImage">提交图片资料至合利宝
          </el-button>
          <el-button type="" :disabled="verifyClsoe" @click="findHlbStatus">查询基本信息审核结果(文字资料)
          </el-button>
          <el-button type="primary"  :loading="btnLoading" @click="updateMerchantBasicInfo2">修改基础信息
          </el-button>
          <el-button type="primary"  :loading="btnLoading" @click="updateMerchantAccountInfo2">修改结算卡信息
          </el-button>
        </div>
      </el-card>


    </el-form>
    <p class="cus-title">当前是{{payChannelName}}进件</p>

  </div>
</template>

<script>
  import typeJson from '@/assets/merchantType/merchantType.json' //商户类型数据
  import localCode from '@/assets/city/localCode.json' //地域代码数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {findHsfentryImg, hsfImgUpdate} from '@/modules/thirdMchInfo/other/api/hsfMerchantInfo'
  import {url} from '@/utils/request'

  import {
    getPlantInfo,
    findPayType,
    findPayTypeByChannel,
    modifyMerchantJson,
    uploadThirdImage,
    uploadThirdInfo,
    findHlbStatus,
    findProvince,
    findCity,
    findArea,
    findCategory,
    updateMerchantBasicInfo,
    updateMerchantAccountInfo
  } from '../api/hlb'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'

  import {mixins} from "../../mixins/mixins";


  export default {
    name: "addMerchant",
    mixins: [mixins],//混入
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
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
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
      var url_rule = (rule, value, callback) => {
        let reg = /^(http|https)+:\/\/[^\s]*$/;
        if (value === '') {
          callback()
        } else {
          if (!reg.test(value)) {
            return callback(new Error('URL不合法，https://www.example.com/'))
          } else {
            callback()
          }
        }
      };
      var email_rule = (rule, value, callback) => {
        let reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
        if (!reg.test(value)) {
          callback(new Error('email地址不合法，example@domain.com'))
        } else {
          callback()
        }

      };
      return {
        loading: false,
        labelWidth: '270px',
        btnLoading: false,
        addForm: {
          id: '',
          //合利宝基本文字数据
          signName: '', //商户签约名
          showName: '', //商户签约名
          webSite: '', //商户网站地址
          accessUrl: '', ///接入地址
          // qualityMerchant: false,//优质商户
          distinguishMerchant: 1,//优质商户区别
          specialSignName: '',//优质商户区别

          merchantType: '', ///商户类型

          legalPerson: '',//法人姓名
          legalPersonID: '',//法人身份证
          orgNum: '',//组织机构号 若是个人商户，统一填写身份证号；2.三证合一，则统一填营业执照号
          businessLicense: '', //营业执照号

          province: '', //省
          city: '', //市
          regionCode: '', //区县编码
          address: '', //通讯地址
          linkman: '', //联系人
          linkPhone: '', //联系人电话号码
          email: '', //商户邮箱

          bindMobile: '',//绑定手机号
          servicePhone: '',//客服联系电话

          settleBankType: '', //结算卡类型
          bankCode: '',//联行号
          accountName: '',//结算卡开卡姓名
          accountNo: '',//结算卡开户账号

          settlementPeriod: '',//结算类型
          settlementMode: 'AUTO',//结算方式
          settlementRemark: '',//结算备注

          merchantCategory: '',//经营类别
          industryTypeCode: '',//行业类型编码

          needPosFunction: false,//是否需要开通 POS 功能
          needOpenWX: false,//是否需要开通微信

          idCardStartDate: '',//法人身份证开始日期
          idCardEndDate: '',//法人身份证结束日期

          businessDateStart: '', //经营起始日期
          businessDateLimit: '', //经营期限

          accountIdCard: '', //开户人身份证
          mcc: '', //mcc

          settleMode: '', //结算模式

          postalAddress: '', //营业执照中注册地址

          microBizType: '', //小微经营类型 个人M
          certType: '', //证书类型 事业M

          linkManId: '', //联系人身份证 开通微信产品M


          //合利宝基本图片文字
          merchantHead: '', //门头照
          otherPhoto3: '', //经营场所内设照片
          merchantCheck: '', //收银台照片
          cardFace: '', //银行卡正面照
          cardFaceBody: '',//手持银行卡照
          bussinessCard: '', //开户许可证照（如是对公账户，开户许可证）
          priAuth: '', //结算人结算授权书(结算人结算模式必传)
          identityFaceCopy: '', //结算人身份证正面(结算人结算模式必传)
          identityBackCopy: '', //结算人身份证背面(结算人结算模式必传)
          bussiness: '', //营业执照照片（三证合一）
          bussiness2: '', //营业执照照片
          identityFace: '', //法人身份证正面
          identityBack: '', //法人身份证反面
          identityBody: '', //手持身份证照
          organizationCodeId: '', //组织机构代码证
          taxRegistrationCertificate: '', //税务登记证

          other: '', //报名蓝海绿洲提供证明图片
          other2: '',
          other3: '',
          other4: '',
          other5: '',

          activityMerchantCheck: '', //活动收银台照 绿洲报名使用
          rentPhoto: '', //转租证明
          accountOffice: '', //财务室
          schoolLicense: '', //办学资质图片
          chargeSample: '', //收费样本
          nonenterpriseUnits: '', //民办非企业单位登记证书图片
          diplomaticNote: '', //照会
          certificateFile: '', //证明文件图片
          medicalInstrumentPracticeLicense: '', //医疗执业许可证图片
          authorizationForSettlement: '',//组织机构号 若是个人商户，统一填写身份证号
          accountOpeningCertificate: '',//组织机构号 若是个人商户，统一填写身份证号

        },
        idCardExpMode: false, //法人或个人证件是否永久有效
        licenseExpMode: false, //营业执照是否永久有效


        //图片临时
        formImgUrl: {
          //合利宝基本图片文字
          merchantHead: '', //门头照
          otherPhoto3: '', //经营场所内设照片
          merchantCheck: '', //收银台照片
          cardFace: '', //银行卡正面照
          cardFaceBody: '',//手持银行卡照
          bussinessCard: '', //开户许可证照（如是对公账户，开户许可证）
          priAuth: '', //结算人结算授权书(结算人结算模式必传)
          identityFaceCopy: '', //结算人身份证正面(结算人结算模式必传)
          identityBackCopy: '', //结算人身份证背面(结算人结算模式必传)
          bussiness: '', //营业执照照片（三证合一）
          bussiness2: '', //营业执照照片
          identityFace: '', //法人身份证正面
          identityBack: '', //法人身份证反面
          identityBody: '', //手持身份证照
          organizationCodeId: '', //组织机构代码证
          taxRegistrationCertificate: '', //税务登记证

          other: '', //报名蓝海绿洲提供证明图片
          other2: '',
          other3: '',
          other4: '',
          other5: '',

          activityMerchantCheck: '', //活动收银台照 绿洲报名使用
          rentPhoto: '', //转租证明
          accountOffice: '', //财务室
          schoolLicense: '', //办学资质图片
          chargeSample: '', //收费样本
          nonenterpriseUnits: '', //民办非企业单位登记证书图片
          diplomaticNote: '', //照会
          certificateFile: '', //证明文件图片
          medicalInstrumentPracticeLicense: '', //医疗执业许可证图片

          authorizationForSettlement: '',//组织机构号 若是个人商户，统一填写身份证号
          accountOpeningCertificate: '',//组织机构号 若是个人商户，统一填写身份证号
        },

        dymForm: [],
        //rules
        addRules: {
          merchantType: [
            {required: true, message: '必须选择商户类型', trigger: 'change'}
          ],
          signName: [
            {required: true, message: '请输入商户签约名', trigger: 'blur'},
            {min: 5, max: 150, message: '长度在 5 到 150 个字符', trigger: 'blur'}
          ],
          showName: [
            {required: true, message: '请输入展示名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          // webSite: [
          //   {required: false, message: '商户网站地址（非必填）', trigger: 'blur'},
          //   {validator: url_rule, trigger: 'blur'}
          // ],
          // accessUrl: [
          //   {required: false, message: '接入地址（非必填）', trigger: 'blur'},
          //   {validator: url_rule, trigger: 'blur'}
          // ],
          // qualityMerchant: [
          //   {required: true, message: '必须选择是否优质商户', trigger: 'change'},
          // ],
          distinguishMerchant: [
            {required: true, message: '必须选择商户类型', trigger: 'change'},
          ],
          legalPerson: [
            {required: true, message: '必须输入法人/经营者姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          legalPersonID: [
            {required: true, message: '必须输入法人/经营者姓名', trigger: 'blur'},
            {min: 18, max: 18, message: '身份证号码长度不合法', trigger: 'blur'},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          orgNum: [
            {required: true, message: '必须输入组织机构号', trigger: 'blur'},
            {min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur'},
          ],
          businessLicense: [
            {required: true, message: '必须输入营业执照号', trigger: 'blur'},
            {min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur'},
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'},
          ],
          regionCode: [
            {required: true, message: '请使用系统“区县”选择器填入编码', trigger: ['blur', 'change']},
            {max: 8, message: '编码错误', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入通讯地址', trigger: ['blur', 'change']},
            {max: 150, message: '地址长度超限，最大150字符', trigger: ['blur', 'change']},
          ],
          linkman: [
            {required: true, message: '请输入联系人姓名', trigger: ['blur', 'change']},
            {max: 15, message: '姓名字符长度超限，最大15字符', trigger: ['blur', 'change']},
          ],
          linkPhone: [
            {required: true, message: '联系人手机号', trigger: ['blur', 'change']},
            {validator: phone_rule, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '联系人电子邮箱', trigger: ['blur', 'change']},
            {validator: email_rule, trigger: 'blur'}
          ],
          linkManId: [
            {required: true, message: '联系人身份证号', trigger: ['blur', 'change']},
            {validator: idNum_rule, trigger: 'blur'}
          ],
          bindMobile: [
            {required: false, message: '绑定手机号', trigger: ['blur']},
            {max: 25, message: '绑定手机号长度超限，最大25字符', trigger: ['blur']},
          ],
          servicePhone: [
            {required: false, message: '客服联系电话', trigger: ['blur']},
            {max: 25, message: '客服联系电话长度超限，最大25字符', trigger: ['blur']},
          ],
          settleBankType: [
            {required: true, message: '选择结算卡类型', trigger: ['blur', 'change']},
          ],
          bankCode: [
            {required: true, message: '输入联行号', trigger: ['blur', 'change']},
          ],
          accountName: [
            {required: true, message: '输入开户姓名', trigger: ['blur']},
            {max: 50, message: '开户姓名长度超限，最大50字符', trigger: ['blur']},
          ],
          accountNo: [
            {required: true, message: '输入开户账号', trigger: ['blur']},
            {max: 30, message: '开户账号长度超限，最大30字符', trigger: ['blur']},
          ],
          settlementPeriod: [
            {required: true, message: '选择结算类型', trigger: ['blur', 'change']},
          ],
          settlementMode: [
            {required: true, message: '选择结算方式', trigger: ['blur', 'change']},
          ],
          settlementRemark: [
            {required: false, message: '结算备注', trigger: ['blur']},
            {max: 30, message: '结算备注长度超限，最大20字符', trigger: ['blur']},
          ],
          merchantCategory: [
            {required: true, message: '选择经营类别', trigger: ['blur', 'change']},
          ],
          industryTypeCode: [
            {required: true, message: '请选择行业类型换区编码', trigger: ['blur', 'change']},
            {max: 10, message: '请勿自行填写错误的行业类型编码', trigger: ['blur']},
          ],
          needPosFunction: [
            {required: true, message: '请选择是否需要开通 POS 功能', trigger: ['blur', 'change']},
          ],
          needOpenWX: [
            {required: true, message: '请选择是否需要开通微信产品', trigger: ['blur', 'change']},
          ],
          idCardStartDate: [
            {required: true, message: '请选择开始日期', trigger: ['blur', 'change']},
          ],
          idCardEndDate: [
            {required: true, message: '请选择结束日期', trigger: ['blur', 'change']},
          ],
          businessDateStart: [
            {required: true, message: '请选择经营起始日期', trigger: ['blur', 'change']},
          ],
          businessDateLimit: [
            {required: true, message: '请选择经营结束日期', trigger: ['blur', 'change']},
          ],
          accountIdCard: [
            {required: true, message: '开户人身份证', trigger: ['blur']},
            {min: 18, max: 18, message: '开户人身份证格式错误', trigger: ['blur']},
          ],
          mcc: [
            {required: true, message: '输入银联 mcc 码', trigger: ['blur']},
            {validator: mcc_rule, trigger: 'blur'}
          ],
          settleMode: [
            {required: true, message: '请选择结算模式', trigger: ['blur', 'change']},
          ],
          postalAddress: [
            {required: true, message: '营业执照中注册地址', trigger: ['blur']},
          ],
          microBizType: [
            {required: true, message: '请选择小微经营类型', trigger: ['blur', 'change']},
          ],
          certType: [
            {required: true, message: '请选择证书类型', trigger: ['blur', 'change']},
          ],

        },

        //合利宝进件状态
        comStatus: null,

        //选项
        merchantCategoryOption: [
          {value: 'OFFLINE_RETAIL', label: '线下零售'},
          {value: 'FOOD_BEVERAGE', label: '餐饮/食品'},
          {value: 'TICKETING_TRAVEL', label: '票务/旅游'},
          {value: 'EDUCATION_TRAINING', label: '教育/培训'},
          {value: 'LIFE_ADVISORY_SERVICE', label: '生活/咨询服务'},
          {value: 'ENTERTAINMENT_FITNESS_SERVICES', label: '娱乐/健身服务'},
          {value: 'MEDICAL_CARE', label: '医疗'},
          {value: 'COLLECTION_AUCTION', label: '收藏/拍卖'},
          {value: 'LOGISTICS_EXPRESS', label: '物流/快递'},
          {value: 'PUBLIC_WELFARE', label: '公益'},
          {value: 'COMMUNICATION', label: '通讯'},
          {value: 'FINANCE_INSURANCE', label: '金融/保险'},
          {value: 'NETWORK_VIRTUAL_SERVICE', label: '网络虚拟服务'},
          {value: 'LIVING_PAYMENT', label: '生活缴费'},
          {value: 'HOTEL', label: '酒店'},
          {value: 'HOME_FURNISHING', label: '家居'},
          {value: 'GROUP_PURCHASE', label: '电商团购'},
          {value: 'LOTTERY', label: '彩票'},
          {value: 'FASHION', label: '时尚'},
          {value: 'UTILITIES_EXPENSE', label: '公共事业缴费'},
          {value: 'REAL_ESTATE', label: '房地产'},
          {value: 'TRANSPORTATION_SERVICE', label: '交通运输服务类'},
          {value: 'MACHINE_ELECTRON', label: '机械/电子'},
          {value: 'SOFTWARE', label: '软件'},
          {value: 'DECORATION', label: '装饰'},
          {value: 'GREEN_SEEDLING', label: '苗木/绿化'},
          {value: 'MATERNAL_CHILD_PRODUCT', label: '母婴/玩具'},
          {value: 'COLLECTION_PET', label: '收藏/宠物'},
          {value: 'BOOK_STATIONERY_AUDIO_VIDEO', label: '书籍/音像/文具'},
          {value: 'BUSINESS_PLATFORM', label: '平台商'},
          {value: 'DIGITAL', label: '数码'},
          {value: 'DIGITAL_ENTERTAINMENT', label: '数字娱乐'},
          {value: 'ABROAD', label: '境外'},
          {value: 'PREPAID_CARD', label: '预付卡'},
          {value: 'DIRECT_SELLING', label: '直销'},
          {value: 'CROWD_FUNDING', label: '众筹'},
          {value: 'OTHER', label: '其他'}
        ], //经营类别选项
        certTypeOption: [
          {value: 'CERTIFICATE_TYPE_2388', label: '事业单位法人证书'},
          {value: 'CERTIFICATE_TYPE_2389', label: '统一社会信用代码证书'},
          {value: 'CERTIFICATE_TYPE_2390', label: '有偿服务许可证（军队医院适用）'},
          {value: 'CERTIFICATE_TYPE_2391', label: '医疗机构执业许可证（军队医院适用）'},
          {value: 'CERTIFICATE_TYPE_2392', label: '企业营业执照（挂靠企业的党组织适用）'},
          {value: 'CERTIFICATE_TYPE_2393', label: '组织机构代码证（政府机关适用）'},
          {value: 'CERTIFICATE_TYPE_2394', label: '社会团体法人登记证书'},
          {value: 'CERTIFICATE_TYPE_2395', label: '民办非企业单位登记证书'},
          {value: 'CERTIFICATE_TYPE_2396', label: '基金会法人登记证书'},
          {value: 'CERTIFICATE_TYPE_2397', label: '慈善组织公开募捐资格证书'},
          {value: 'CERTIFICATE_TYPE_2398', label: '农民专业合作社法人营业执照'},
          {value: 'CERTIFICATE_TYPE_2399', label: '宗教活动场所登记证'},
          {value: 'CERTIFICATE_TYPE_2400', label: '其他证书/批文/证明'}
        ], //证书类型

        //地域选择
        provOption: [],
        cityOption: [],
        areaOption: [],
        areaName: '',
        currArea: {},

        //行业编码
        categoryOption: [],
        //地区代码
        localCode: localCode,
        showCode: '',

        //applyId
        applyId: '',

        //图片上传
        accept: 'image/png,image/jpg,image/jpeg',
        filesData: {
          module: 'image'
        },
        url: newUploadUrl,
        headers: {
          authorized: sessionStorage.token
        },

        //id
        urlid: '',


        //按钮锁定
        verifyClsoe: false,
        infoSendSwitch: false,

        //图片上传判断必填
        ENTERPRISE_TOPRIVATE: false,
        ENTERPRISE_TOPUBLIC: false,
        INDIVIDUALBISS_TOPRIVATE: false,
        INDIVIDUALBISS_TOPUBLIC: false,
        PERSON: false,


      }
    },
    watch: {
      'addForm.merchantType': {
        handler(nv, ov) {
          if (nv !== ov) {
            this.watchChangeType()
          }
        },
        immediate: true,
      },
      'addForm.settleBankType': {
        handler(nv, ov) {
          if (nv !== ov) {
            this.watchChangeType()
          }
        },
        immediate: true,
      },
      'addForm.distinguishMerchant': {
        handler(nv, ov) {
          console.log(`优质商户${nv}`);
          this.goodMerchantFeeSet(nv)
        }
      }
    },
    mounted() {

      //经营选项赋值
      // this.businessTypes = typeJson;

      //获取url中的id
      this.urlid = this.$route.query.id;//接收ID

      //获取进件资料回显
      this.getMerchantDetail(this.urlid);

      //获取费率表单
      this.getPayType();

      this.findProvince()
    },
    methods: {
      /*
       *如果是优质商户，则全部0.38费率
       */
      goodMerchantFeeSet: function (type) {
        if (type === 3 || type === 2) {
          this.dymForm.forEach((item, index) => {
            item.value = 0.38 //设置为0.38
          })
        } else {
          this.dymForm.forEach((item, index) => {
            item.value = 0.00
          })
        }

      },


      watchChangeType: function () {
        console.log(1)
        let mt = this.addForm.merchantType; //商户类型
        let st = this.addForm.settleBankType; //结算类型
        if (this.watchChangeTypeCloseAll()) {
          if (mt === 'ENTERPRISE' && st === 'TOPRIVATE') {
            this.ENTERPRISE_TOPRIVATE = true
          } else if (mt === 'ENTERPRISE' && st === 'TOPUBLIC') {
            this.ENTERPRISE_TOPUBLIC = true
          } else if (mt === 'INDIVIDUALBISS' && st === 'TOPRIVATE') {
            this.INDIVIDUALBISS_TOPRIVATE = true
          } else if (mt === 'INDIVIDUALBISS' && st === 'TOPUBLIC') {
            this.INDIVIDUALBISS_TOPUBLIC = true
          } else if (mt === 'PERSON') {
            this.PERSON = true
          }

          console.log(this.ENTERPRISE_TOPRIVATE)
          console.log(this.ENTERPRISE_TOPUBLIC)
          console.log(this.INDIVIDUALBISS_TOPRIVATE)
          console.log(this.INDIVIDUALBISS_TOPUBLIC)
          console.log(this.PERSON)

        } else {
          this.$message.error('状态值未清空。')
        }

        return true
      },

      watchChangeTypeCloseAll: function () {
        try {
          this.ENTERPRISE_TOPRIVATE = false;
          this.ENTERPRISE_TOPUBLIC = false;
          this.INDIVIDUALBISS_TOPRIVATE = false;
          this.INDIVIDUALBISS_TOPUBLIC = false;
          this.PERSON = false;

          return true
        } catch (e) {
          return false
        }

      },
      /**
       * 发起获取资料
       */
      getMerchantDetail: function (id) {
        //唯一接口，不区分状态，直接抓取数据
        this.merchantGetPlantInfo(id)
      },
      //获取资料接口
      merchantGetPlantInfo: function (id) {
        getPlantInfo(id).then(res => {
          this.autoInputData(res.obj)
        }).catch(e => {

        })
      },

      /**
       *获取动态费率表单
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
       * 回显所有存储或抓取的资料
       */
      autoInputData: function (row) {
        let hlbMchInfo = row.hlbMchInfo || '';
        let hlbMchPhoto = row.hlbMchPhoto || '';

        this.comStatus = hlbMchInfo.hlbStatus || '';

        this.addForm.signName = hlbMchInfo.signName || '';
        this.addForm.showName = hlbMchInfo.showName || '';
        this.addForm.webSite = hlbMchInfo.webSite || '';
        this.addForm.accessUrl = hlbMchInfo.accessUrl || '';

        // this.addForm.qualityMerchant = hlbMchInfo.qualityMerchant || false;
        this.addForm.distinguishMerchant = hlbMchInfo.distinguishMerchant || 1;
        this.addForm.specialSignName = hlbMchInfo.specialSignName || '';

        this.addForm.merchantType = hlbMchInfo.merchantType || '';

        this.addForm.legalPerson = hlbMchInfo.legalPerson || '';
        this.addForm.legalPersonID = hlbMchInfo.legalPersonID || '';
        this.addForm.orgNum = hlbMchInfo.orgNum || '';
        this.addForm.businessLicense = hlbMchInfo.businessLicense || '';

        this.addForm.province = hlbMchInfo.province || '';
        this.setProv(hlbMchInfo.province);

        this.addForm.city = hlbMchInfo.city || '';
        this.setCity();

        this.addForm.regionCode = hlbMchInfo.regionCode || '';
        this.addForm.address = hlbMchInfo.address || '';
        this.addForm.linkman = hlbMchInfo.linkman || '';
        this.addForm.linkPhone = hlbMchInfo.linkPhone || '';
        this.addForm.email = hlbMchInfo.email || '';

        this.addForm.bindMobile = hlbMchInfo.bindMobile || '';
        this.addForm.servicePhone = hlbMchInfo.servicePhone || '';

        this.addForm.settleBankType = hlbMchInfo.settleBankType || '';
        this.addForm.bankCode = hlbMchInfo.bankCode || '';
        this.addForm.accountName = hlbMchInfo.accountName || '';
        this.addForm.accountNo = hlbMchInfo.accountNo || '';

        this.addForm.settlementPeriod = hlbMchInfo.settlementPeriod || '';
        // this.addForm.settlementMode = hlbMchInfo.settlementMode;
        this.addForm.settlementMode = 'AUTO';
        this.addForm.settlementRemark = hlbMchInfo.settlementRemark || '';

        this.addForm.merchantCategory = hlbMchInfo.merchantCategory || '';

        this.findCategory(hlbMchInfo.merchantCategory);

        this.addForm.industryTypeCode = hlbMchInfo.industryTypeCode || '';

        this.addForm.needPosFunction = hlbMchInfo.needPosFunction || false;
        this.addForm.needOpenWX = hlbMchInfo.needOpenWX || false;

        this.addForm.idCardStartDate = hlbMchInfo.idCardStartDate || '';

        if (hlbMchInfo.idCardEndDate === '长期有效') {
          this.addForm.idCardEndDate = hlbMchInfo.idCardEndDate || ''
          this.idCardExpMode = true
        } else {
          this.addForm.idCardEndDate = hlbMchInfo.idCardEndDate || ''
        }

        this.addForm.businessDateStart = hlbMchInfo.businessDateStart || '';
        this.addForm.businessDateLimit = hlbMchInfo.businessDateLimit || '';

        this.addForm.accountIdCard = hlbMchInfo.accountIdCard || '';
        this.addForm.mcc = hlbMchInfo.mcc || '';

        this.addForm.settleMode = hlbMchInfo.settleMode || '';

        this.addForm.postalAddress = hlbMchInfo.postalAddress || '';

        this.addForm.microBizType = hlbMchInfo.microBizType || '';
        this.addForm.certType = hlbMchInfo.certType || '';

        this.addForm.linkManId = hlbMchInfo.linkManId || '';

        //图片
        this.addForm.merchantHead = hlbMchPhoto.merchantHead;
        this.addForm.otherPhoto3 = hlbMchPhoto.otherPhoto3;
        this.addForm.merchantCheck = hlbMchPhoto.merchantCheck;
        this.addForm.cardFace = hlbMchPhoto.cardFace;
        this.addForm.cardFaceBody = hlbMchPhoto.cardFaceBody;
        this.addForm.bussinessCard = hlbMchPhoto.bussinessCard;
        this.addForm.priAuth = hlbMchPhoto.priAuth;
        this.addForm.identityFaceCopy = hlbMchPhoto.identityFaceCopy;
        this.addForm.identityBackCopy = hlbMchPhoto.identityBackCopy;
        this.addForm.bussiness = hlbMchPhoto.bussiness;
        this.addForm.bussiness2 = hlbMchPhoto.bussiness2;
        this.addForm.identityFace = hlbMchPhoto.identityFace;
        this.addForm.identityBack = hlbMchPhoto.identityBack;
        this.addForm.identityBody = hlbMchPhoto.identityBody;
        this.addForm.organizationCodeId = hlbMchPhoto.organizationCodeId;
        this.addForm.taxRegistrationCertificate = hlbMchPhoto.taxRegistrationCertificate;

        this.addForm.other = hlbMchPhoto.other;
        this.addForm.other2 = hlbMchPhoto.other2;
        this.addForm.other3 = hlbMchPhoto.other3;
        this.addForm.other4 = hlbMchPhoto.other4;
        this.addForm.other5 = hlbMchPhoto.other5;

        this.addForm.activityMerchantCheck = hlbMchPhoto.activityMerchantCheck;
        this.addForm.rentPhoto = hlbMchPhoto.rentPhoto;
        this.addForm.accountOffice = hlbMchPhoto.accountOffice;
        this.addForm.schoolLicense = hlbMchPhoto.schoolLicense;
        this.addForm.chargeSample = hlbMchPhoto.chargeSample;
        this.addForm.nonenterpriseUnits = hlbMchPhoto.nonenterpriseUnits;
        this.addForm.diplomaticNote = hlbMchPhoto.diplomaticNote;
        this.addForm.certificateFile = hlbMchPhoto.certificateFile;
        this.addForm.medicalInstrumentPracticeLicense = hlbMchPhoto.medicalInstrumentPracticeLicense;


        this.formImgUrl.merchantHead = this.imgFil(hlbMchPhoto.merchantHead);
        this.formImgUrl.otherPhoto3 = this.imgFil(hlbMchPhoto.otherPhoto3);
        this.formImgUrl.merchantCheck = this.imgFil(hlbMchPhoto.merchantCheck);
        this.formImgUrl.cardFace = this.imgFil(hlbMchPhoto.cardFace);
        this.formImgUrl.cardFaceBody = this.imgFil(hlbMchPhoto.cardFaceBody);
        this.formImgUrl.bussinessCard = this.imgFil(hlbMchPhoto.bussinessCard);
        this.formImgUrl.priAuth = this.imgFil(hlbMchPhoto.priAuth);
        this.formImgUrl.identityFaceCopy = this.imgFil(hlbMchPhoto.identityFaceCopy);
        this.formImgUrl.identityBackCopy = this.imgFil(hlbMchPhoto.identityBackCopy);
        this.formImgUrl.bussiness = this.imgFil(hlbMchPhoto.bussiness);
        this.formImgUrl.bussiness2 = this.imgFil(hlbMchPhoto.bussiness2);
        this.formImgUrl.identityFace = this.imgFil(hlbMchPhoto.identityFace);
        this.formImgUrl.identityBack = this.imgFil(hlbMchPhoto.identityBack);
        this.formImgUrl.identityBody = this.imgFil(hlbMchPhoto.identityBody);
        this.formImgUrl.organizationCodeId = this.imgFil(hlbMchPhoto.organizationCodeId);
        this.formImgUrl.taxRegistrationCertificate = this.imgFil(hlbMchPhoto.taxRegistrationCertificate);
        this.formImgUrl.other = this.imgFil(hlbMchPhoto.other);
        this.formImgUrl.other2 = this.imgFil(hlbMchPhoto.other2);
        this.formImgUrl.other3 = this.imgFil(hlbMchPhoto.other3);
        this.formImgUrl.other4 = this.imgFil(hlbMchPhoto.other4);
        this.formImgUrl.other5 = this.imgFil(hlbMchPhoto.other5);
        this.formImgUrl.activityMerchantCheck = this.imgFil(hlbMchPhoto.activityMerchantCheck);
        this.formImgUrl.rentPhoto = this.imgFil(hlbMchPhoto.rentPhoto);
        this.formImgUrl.accountOffice = this.imgFil(hlbMchPhoto.accountOffice);
        this.formImgUrl.schoolLicense = this.imgFil(hlbMchPhoto.schoolLicense);
        this.formImgUrl.chargeSample = this.imgFil(hlbMchPhoto.chargeSample);
        this.formImgUrl.nonenterpriseUnits = this.imgFil(hlbMchPhoto.nonenterpriseUnits);
        this.formImgUrl.diplomaticNote = this.imgFil(hlbMchPhoto.diplomaticNote);
        this.formImgUrl.certificateFile = this.imgFil(hlbMchPhoto.certificateFile);
        this.formImgUrl.medicalInstrumentPracticeLicense = this.imgFil(hlbMchPhoto.medicalInstrumentPracticeLicense);

      },




      //------------------------------------保存------------------------------------------
      /**
       * 提交前校验表单
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

      /**
       * 提交前数据预先处理
       */
      dataCollation: function () {
        let form;

        //表单拷贝
        form = JSON.parse(JSON.stringify(this.addForm));

        //判断是否长期有身份证
        if (this.idCardExpMode || form.idCardEndDate === '') {
          form.idCardEndDate = '长期有效'
        }

        //检查结束，赋值id
        let id = this.urlid;
        form.merchantId = id; //附上id

        //判断打开方式，调用不同保存。
        if (this.mode === 'new') {
          //如果是新平台
          this.submitAddData(form, 'new')
        } else {
          //其他类型
          this.submitAddData(form, 'other')
        }
      },
      /**
       * 提交进件资料
       */
      submitAddData: function (form, save_status) {

        if (save_status === 'other') {//非new时，删除status,遗留问题，不动
          if (form.status) {//如果有status，则删除状态，不要改变这个
            delete form.status
          }
        }

        this.btnLoading = true; //按钮小菊花 *
        modifyMerchantJson(JSON.stringify(form), this.payChannel).then(res => {
          this.$message.success('保存进件资料成功');
          //断进件模式，如果是审核，则询问是否通过，并强制刷新一遍数据
          if (this.mode === 'verify') {
            this.getMerchantDetail(this.urlid);   //审核模式强制刷新一遍数据
            this.verifyOK();  //询问是否刷新
          } else {
            this.branching() //其他模式则进入收尾分支
          }
        }).catch(e => {
          this.btnLoading = false //按钮小菊花 0
        })
      },


      /**
       *收尾不同操作
       */
      branching: function () {
        if (this.mode === 'new') {
          this.$emit('next', this.dymForm);//第三方进件后直接下一步并保存当前的费率信息 dymForm
        } else if (this.mode === 'add') {
          this.submitRecord();//提交记录
        } else if (this.mode === 'modify') {
          this.submitRecord();//提交记录
          this.$emit('next'); //跳回前一页
        } else if (this.mode === 'verify') {
          if(this.status == 2){
            this.submitRecord();
          }
          this.$emit('next');//提交记录
        }

        //保险再解除一次按钮锁定
        this.btnLoading = false
      },


      /**
       * 费率记录收集
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

          this.saveRrecord(this.urlid, feeStr, this.payChannel)

        }
      },
      /**

       * 提交费率记录
       */
      saveRrecord: function (urlid, feeStr, payChannel) {
        //提交费率信息
        saveRrecord(urlid, feeStr, payChannel).then(res => {
          this.$emit('next');
        }).catch(e => {

        })
      },

      /**
       * 询问是否审核通过
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
       * 审核调用 审核费率汇集
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
       * 提交第三方文字
       */
      uploadThirdInfo: function () {
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('没有商户id');
          return
        }
        this.$confirm('提交文字进件资料至合利宝, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.btnLoading = true;
          uploadThirdInfo(id).then(res => {
            this.$message.success('已提交');
            this.infoSendSwitch = true;
            this.btnLoading = false;
          }).catch(e => {
            this.btnLoading = false
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      /**
       * 提交第三方图片
       */
      uploadThirdImage: function () {

        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('没有商户id');
          return
        }

        this.$confirm('提交图片进件资料至合利宝, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            title: '提示',
            type: 'warning',
            message: '提交进件资料可能需要1分钟，请耐心等待。'
          });

          this.btnLoading = true;

          uploadThirdImage(id).then(res => {
            this.$message.success('已提交');
            this.btnLoading = false;
          }).catch(e => {
            this.btnLoading = false
          });

        }).catch(() => {

        });
      },

      /**
       * 进件状态查询
       */
      findHlbStatus: function () {
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('id为空，无法查询');
          return false
        }
        //发起查询
        findHlbStatus(id).then(res => {
          let msg = res.msg;
          if (msg) {
            this.$message.success(`${msg}`)
          } else {
            this.$message.info(`进度未知，请稍后查询。`)
          }

        }).catch(e => {

        })
      },


      updateMerchantBasicInfo2: function () {
        let form={};
        let id = this.urlid;
        form.merchantId = id; //附上id
        form.updateShowName=this.addForm.showName;
        form.updateLinkPhone=this.addForm.linkPhone;
        form.linkman=this.addForm.linkman;
        form.linkPhone=this.addForm.linkPhone;
        form.businessLicense=this.addForm.businessLicense;
        form.legalPersonID=this.addForm.legalPersonID;
        form.address=this.addForm.address;
        form.merchantCategory=this.addForm.merchantCategory;
        form.regionCode=this.addForm.regionCode;
        form.province=this.addForm.province;
        form.city=this.addForm.city;
        updateMerchantBasicInfo(form).then(res => {
          let msg = res.msg;
          if (msg) {
            this.$message.success(`${msg}`)
          } else {
            this.$message.success(`请求失败`)
          }
        }).catch(e => {

        })
      },

      updateMerchantAccountInfo2: function () {
        let form={};
        form.merchantId = this.urlid; //附上id

        form.updateAccountName=this.addForm.accountName;
        form.updateAccountNo=this.addForm.accountNo;
        form.updateSettleBankType=this.addForm.settleBankType;
        form.updateBankCode=this.addForm.bankCode;
//        form.settlementIdCardStartDate=this.regionCode.settlementIdCardStartDate;
//        form.settlementIdCardEndDate=this.form.settlementIdCardEndDate;
//        form.settlementIdCardNo=this.form.settlementIdCardNo;

        form.authorizationForSettlement = this.addForm.authorizationForSettlement;
        form.accountOpeningCertificate =this.addForm.accountOpeningCertificate;

        updateMerchantAccountInfo(form).then(res => {
          let msg = res.msg;
          if (msg) {
            this.$message.success(`${msg}`)
          } else {
            this.$message.success(`请求失败`)
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
       * 省市区
       */
      setProv: function (eve) {
        this.findCity(eve);
        this.addForm.city = '';
        this.areaName = '';//不进入表单
        this.addForm.regionCode = ''
      },
      setCity: function () {
        this.findArea();
        this.areaName = '';//不进入表单

        this.addForm.regionCode = ''
      },
      /**
       * 获取省份
       */
      findProvince: function () {
        findProvince().then(res => {
          let data = res.obj;
          this.provOption = data
        }).catch(e => {

        })
      },
      /**
       * 获取城市
       */
      findCity: function (eve) {
        findCity(eve).then(res => {
          let data = res.obj;
          this.cityOption = data
        }).catch(e => {

        })
      },
      /**
       * 获取区县
       */
      findArea: function () {
        let pn = this.addForm.province;
        let cn = this.addForm.city;
        findArea(pn, cn).then(res => {
          let data = res.obj;
          this.areaOption = data
        }).catch(e => {

        })
      },

      /**
       * 获取行业编码
       */
      findCategory: function () {
        let eve = this.addForm.merchantCategory;
        findCategory(eve).then(res => {
          let data = res.obj;
          this.categoryOption = data
        }).catch(e => {

        })
      },
      setCategory: function () {
        this.findCategory();

        this.addForm.industryTypeCode = ''
      },


      /**
       * 照片上传 function 组
       */

      //门头照
      merchantHeadUpload(response, file) {
        console.log(response);
        this.$message({
          message: '门头照' + '上传成功',
          type: 'success'
        });
        this.addForm.merchantHead = response.obj.path;
        this.formImgUrl.merchantHead = this.imgFil(response.obj.path)
      },
      //经营场所内设照片
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '经营场所内设照片' + '上传成功',
          type: 'success'
        });
        this.addForm.otherPhoto3 = response.obj.path;
        this.formImgUrl.otherPhoto3 = this.imgFil(response.obj.path)
      },
      //收银台照片
      merchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收银台照' + '上传成功',
          type: 'success'
        });
        this.addForm.merchantCheck = response.obj.path;
        this.formImgUrl.merchantCheck = this.imgFil(response.obj.path)
      },
      //银行卡正面照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡正面照' + '上传成功',
          type: 'success'
        });
        this.addForm.cardFace = response.obj.path;
        this.formImgUrl.cardFace = this.imgFil(response.obj.path)
      },
      //手持银行卡照
      cardFaceBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持银行卡照' + '上传成功',
          type: 'success'
        });
        this.addForm.cardFaceBody = response.obj.path;
        this.formImgUrl.cardFaceBody = this.imgFil(response.obj.path)
      },
      //开户许可证照
      bussinessCardUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可证照' + '上传成功',
          type: 'success'
        });
        this.addForm.bussinessCard = response.obj.path;
        this.formImgUrl.bussinessCard = this.imgFil(response.obj.path)
      },
      //结算人结算授权书
      priAuthUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人结算授权书' + '上传成功',
          type: 'success'
        });
        this.addForm.priAuth = response.obj.path;
        this.formImgUrl.priAuth = this.imgFil(response.obj.path)
      },
      //结算人身份证正面
      identityFaceCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证正面' + '上传成功',
          type: 'success'
        });
        this.addForm.identityFaceCopy = response.obj.path;
        this.formImgUrl.identityFaceCopy = this.imgFil(response.obj.path)
      },
      //结算人身份证背面
      identityBackCopyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算人身份证背面' + '上传成功',
          type: 'success'
        });
        this.addForm.identityBackCopy = response.obj.path;
        this.formImgUrl.identityBackCopy = this.imgFil(response.obj.path)
      },
      //营业执照（三证合一）
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照照片（三证合一）' + '上传成功',
          type: 'success'
        });
        this.addForm.bussiness = response.obj.path;
        this.formImgUrl.bussiness = this.imgFil(response.obj.path)
      },

      //营业执照
      bussiness2Upload(response, file) {
        console.log(response);
        this.$message({
          message: '营业执照照片' + '上传成功',
          type: 'success'
        });
        this.addForm.bussiness2 = response.obj.path;
        this.formImgUrl.bussiness2 = this.imgFil(response.obj.path)
      },

      //法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证正面' + '上传成功',
          type: 'success'
        });
        this.addForm.identityFace = response.obj.path;
        this.formImgUrl.identityFace = this.imgFil(response.obj.path)
      },

      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人身份证反面' + '上传成功',
          type: 'success'
        });
        this.addForm.identityBack = response.obj.path;
        this.formImgUrl.identityBack = this.imgFil(response.obj.path)
      },

      //手持身份证照
      identityBodyUpload(response, file) {
        console.log(response);
        this.$message({
          message: '手持身份证照' + '上传成功',
          type: 'success'
        });
        this.addForm.identityBody = response.obj.path;
        this.formImgUrl.identityBody = this.imgFil(response.obj.path)
      },

      //组织机构代码证
      organizationCodeIdUpload(response, file) {
        console.log(response);
        this.$message({
          message: '组织机构代码证' + '上传成功',
          type: 'success'
        });
        this.addForm.organizationCodeId = response.obj.path;
        this.formImgUrl.organizationCodeId = this.imgFil(response.obj.path)
      },
      //税务登记证
      taxRegistrationCertificateUpload(response, file) {
        console.log(response);
        this.$message({
          message: '税务登记证' + '上传成功',
          type: 'success'
        });
        this.addForm.taxRegistrationCertificate = response.obj.path;
        this.formImgUrl.taxRegistrationCertificate = this.imgFil(response.obj.path)
      },

      //报名蓝海绿洲
      otherUpload(response, file) {
        console.log(response);
        this.$message({
          message: '报名蓝海绿洲证明图片' + '上传成功',
          type: 'success'
        });
        this.addForm.other = response.obj.path;
        this.formImgUrl.other = this.imgFil(response.obj.path)
      },
      //其他图片2
      other2Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他图片2' + '上传成功',
          type: 'success'
        });
        this.addForm.other2 = response.obj.path;
        this.formImgUrl.other2 = this.imgFil(response.obj.path)
      },
      //其他图片3
      other3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他图片3' + '上传成功',
          type: 'success'
        });
        this.addForm.other3 = response.obj.path;
        this.formImgUrl.other3 = this.imgFil(response.obj.path)
      },
      //其他图片4
      other4Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他图片4' + '上传成功',
          type: 'success'
        });
        this.addForm.other4 = response.obj.path;
        this.formImgUrl.other4 = this.imgFil(response.obj.path)
      },
      //其他图片5
      other5Upload(response, file) {
        console.log(response);
        this.$message({
          message: '其他图片5' + '上传成功',
          type: 'success'
        });
        this.addForm.other5 = response.obj.path;
        this.formImgUrl.other5 = this.imgFil(response.obj.path)
      },
      //活动收银台照
      activityMerchantCheckUpload(response, file) {
        console.log(response);
        this.$message({
          message: '活动收银台照' + '上传成功',
          type: 'success'
        });
        this.addForm.activityMerchantCheck = response.obj.path;
        this.formImgUrl.activityMerchantCheck = this.imgFil(response.obj.path)
      },
      //转租证明
      rentPhotoUpload(response, file) {
        console.log(response);
        this.$message({
          message: '转租证明' + '上传成功',
          type: 'success'
        });
        this.addForm.rentPhoto = response.obj.path;
        this.formImgUrl.rentPhoto = this.imgFil(response.obj.path)
      },
      //转租证明
      accountOfficeUpload(response, file) {
        console.log(response);
        this.$message({
          message: '财务室照片' + '上传成功',
          type: 'success'
        });
        this.addForm.accountOffice = response.obj.path;
        this.formImgUrl.accountOffice = this.imgFil(response.obj.path)
      },
      //办学资质图片
      schoolLicenseUpload(response, file) {
        console.log(response);
        this.$message({
          message: '办学资质证明照' + '上传成功',
          type: 'success'
        });
        this.addForm.schoolLicense = response.obj.path;
        this.formImgUrl.schoolLicense = this.imgFil(response.obj.path)
      },
      //收费样本
      chargeSampleUpload(response, file) {
        console.log(response);
        this.$message({
          message: '收费样本照' + '上传成功',
          type: 'success'
        });
        this.addForm.chargeSample = response.obj.path;
        this.formImgUrl.chargeSample = this.imgFil(response.obj.path)
      },

      //民办非企业单位登记证书图片
      nonenterpriseUnitsUpload(response, file) {
        console.log(response);
        this.$message({
          message: '民办非企登记证' + '上传成功',
          type: 'success'
        });
        this.addForm.nonenterpriseUnits = response.obj.path;
        this.formImgUrl.nonenterpriseUnits = this.imgFil(response.obj.path)
      },
      //照会
      diplomaticNoteUpload(response, file) {
        console.log(response);
        this.$message({
          message: '照会' + '上传成功',
          type: 'success'
        });
        this.addForm.diplomaticNote = response.obj.path;
        this.formImgUrl.diplomaticNote = this.imgFil(response.obj.path)
      },
      //证明文件图片
      certificateFileUpload(response, file) {
        console.log(response);
        this.$message({
          message: '证明文件图片' + '上传成功',
          type: 'success'
        });
        this.addForm.certificateFile = response.obj.path;
        this.formImgUrl.certificateFile = this.imgFil(response.obj.path)
      },
      //医疗执业许可证图片
      medicalInstrumentPracticeLicenseUpload(response, file) {
        console.log(response);
        this.$message({
          message: '医疗执业许可证图片' + '上传成功',
          type: 'success'
        });
        this.addForm.medicalInstrumentPracticeLicense = response.obj.path;
        this.formImgUrl.medicalInstrumentPracticeLicense = this.imgFil(response.obj.path)
      },

      authorizationForSettlementUpload(response, file) {
        console.log(response);
        this.$message({
          message: '结算指定书图片' + '上传成功',
          type: 'success'
        });
        this.addForm.authorizationForSettlement = response.obj.path;
        this.formImgUrl.authorizationForSettlement = this.imgFil(response.obj.path)
      },

      accountOpeningCertificateUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行开户证明图片' + '上传成功',
          type: 'success'
        });
        this.addForm.accountOpeningCertificate = response.obj.path;
        this.formImgUrl.accountOpeningCertificate = this.imgFil(response.obj.path)
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
