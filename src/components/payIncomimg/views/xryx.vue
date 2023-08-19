<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>瑞银信进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>

          <!--<el-form-item label="机构Id：" required>-->
            <!--<el-input v-model.trim="form.orgId" placeholder="机构Id" class="standard-form"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="商户性质：" >
            <el-radio-group v-model.trim="form.merProp">
              <el-radio label="2">企业</el-radio>
              <el-radio label="1">个体</el-radio>
              <el-radio label="7">小微</el-radio>
              <el-radio label="6">其他</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商户名称：" required>
            <el-input v-model.trim="form.merName" placeholder="商户名称" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户全称：" required>
            <el-input v-model.trim="form.orgMerName" placeholder="商户全称" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户简称：" required>
            <el-input v-model.trim="form.merNameAbbr" placeholder="商户简称" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="经营证件类型：" required>
            <el-radio-group v-model.trim="form.licType">
              <el-radio label="">小微商户</el-radio>
              <el-radio label="1">营业执照</el-radio>
              <el-radio label="2388">事业单位法人证书</el-radio>
              <el-radio label="2389">统一社会信用代码证书</el-radio>
              <el-radio label="2393">组织机构代码证</el-radio>
              <el-radio label="2397">慈善组织公开募捐资格证书</el-radio>
              <el-radio label="2399">宗教活动场所登记证</el-radio>
              <el-radio label="2400">其他</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="经营证件号码：" >
            <el-input v-model.trim="form.licNum" placeholder="统一社会信用代码证" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="经营证件号码有效期开始：" >
            <el-date-picker v-model.trim="form.licNumStartTime" type="date" placeholder="社会信用代码证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="社会信用代码证有效期结束（不填为长期）：" >
            <el-date-picker v-model.trim="form.licNumTime" type="date" placeholder="社会信用代码证有效期结束"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>


          <el-form-item label="法人姓名：" >
            <el-input v-model.trim="form.credPeople" placeholder="法人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人代表证件类型：" >
            <el-radio-group v-model.trim="form.credType">
              <el-radio label="0105">身份证</el-radio>
              <el-radio label="0202">护照</el-radio>
              <el-radio label="0114">香港居民身份证</el-radio>
              <el-radio label="0115">澳门居民身份证</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="法人代表证件号：" >
            <el-input v-model.trim="form.credNo" placeholder="法人代表证件号" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证有效期开始：">
            <el-date-picker v-model.trim="form.credStartTime" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="法人身份证有效期结束（不填为长期）：" >
            <el-date-picker v-model.trim="form.credTime" type="date" placeholder="法人身份证有效期结束"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>


        <el-form-item label="商户入网县编码：">

          <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="form.cityArea" :debounce="1000"
                           value-key="value" clearable :fetch-suggestions="xryxFindAreaInfo"
                           placeholder="行政区域，请输入有高辨识度的关键词(>2字)，如“鼓楼”"
                           :trigger-on-focus="false" @select="xryxFindAreaInfoSelect"></el-autocomplete>
          <span class="tips tips-warning">选中后会自动填充地区</span>
        </el-form-item>


          <el-form-item label="联系人：" required>
            <el-input v-model.trim="form.contactPerson" placeholder="联系人" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话：" required>
            <el-input v-model.trim="form.contactPhone " placeholder="联系人电话" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="结算卡号：" required>
            <el-input v-model.trim="form.bankCard " placeholder="结算卡号" class="standard-form"></el-input>
          </el-form-item>


          <el-form-item label="账户性质：" required>
            <el-radio-group v-model.trim="form.accountProp">
              <el-radio label="00">对公</el-radio>
              <el-radio label="01">对私</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算类型：" required>
            <el-radio-group v-model.trim="form.settleType">
              <el-radio label="1">法人</el-radio>
              <el-radio label="2">非法人</el-radio>
              <el-radio label="3">对公</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算户名：" required>
            <el-input v-model.trim="form.bankCardName" placeholder="结算户名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="结算证件类型：" required>
            <el-radio-group v-model.trim="form.settleCredType">
              <el-radio label="0105">身份证</el-radio>
              <el-radio label="0202">护照</el-radio>
              <el-radio label="0114">香港居民身份证</el-radio>
              <el-radio label="0115">澳门居民身份证</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="结算证件号码：" required>
            <el-input v-model.trim="form.settleCredNo" placeholder="结算证件号码" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="结算证有效期开始：" required>
            <el-date-picker v-model.trim="form.settleCredStartTime" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结算证有效期结束（不填为长期）：" required>
            <el-date-picker v-model.trim="form.settleCredTime" type="date" placeholder="结算证有效期结束"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyyMMdd" >
            </el-date-picker>
          </el-form-item>


        <el-form-item label="开户县编码：" required>

          <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="form.bankCityArea" :debounce="1000"
                           value-key="value" clearable :fetch-suggestions="xryxFindAreaInfo"
                           placeholder="开户县编码，请输入有高辨识度的关键词(>2字)，如“鼓楼”"
                           :trigger-on-focus="false" @select="xryxFindAreaInfoSelect2"></el-autocomplete>
          <span class="tips tips-warning">选中后会自动填充地区</span>
        </el-form-item>

          <el-form-item label="开户行编码：" required>
            <el-select v-model="form.headBankNo" placeholder="开户行编码" class="formItem">
              <el-option
                v-for="item in bank"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]">
              </el-option>
            </el-select>
          </el-form-item>

        <el-form-item>
          <div class="bank-search">
            <el-divider content-position="left">银行信息搜索工具</el-divider>

            <!--模糊查询--></div>
          <el-autocomplete class="standard-form" style="width: 480px"   :debounce="1000" v-model.trim="form.openBankName"
                           value-key="fullBankName" clearable :fetch-suggestions="xryxFindBankInfo"
                           placeholder="银行模糊查询，请输入有高辨识度的关键词(>2字)，如“高新区支行”"
                           :trigger-on-focus="false" @select="xryxFindBankInfoSelect"></el-autocomplete>
          <span class="tips tips-warning">选中后会自动填充开户行资料（以下两项）</span>
        </el-form-item>

          <el-form-item label="开户支行名：" required>
            <el-input v-model.trim="form.openBankName" placeholder="开户支行名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="开户支行号：" required>
            <el-input v-model.trim="form.openBankChild" placeholder="开户支行号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="实际经营地址：" required>
            <el-input v-model.trim="form.operateAddr" placeholder="实际经营地址" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="注册地址：" required>
            <el-input v-model.trim="form.regAddr" placeholder="注册地址" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="经营范围：" required>
            <el-input v-model.trim="form.manaScop" placeholder="经营范围" class="standard-form"></el-input>
          </el-form-item>

          <!--<el-form-item label="结算卡信息id：" required>-->
            <!--<el-input v-model.trim="form.settleId" placeholder="结算卡信息id" class="standard-form"></el-input>-->
          <!--</el-form-item>-->


          <!--<el-form-item label="mcc：" required>-->
            <!--<el-select v-model="form.mcc" placeholder="mcc" class="formItem">-->
              <!--<el-option-->
                <!--v-for="item in mcc"-->
                <!--:key="item[0]"-->
                <!--:label="item[1]"-->
                <!--:value="item[0]">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->

        <el-form-item label="mcc：" required>
          <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="form.mcc" :debounce="1000"
                           value-key="value" clearable :fetch-suggestions="FindhyInfo"
                           placeholder="mcc，请输入有高辨识度的关键词"
                           :trigger-on-focus="false" @select="FindhyInfoSelect"></el-autocomplete>
          <span class="tips tips-warning">选中后会自动填充分类编号</span>
        </el-form-item>

        <!--<el-form-item label="借记封顶额：" required>-->
          <!--<el-input v-model.trim="form.debitTop" placeholder="借记封顶额" class="standard-form"></el-input>-->
        <!--</el-form-item>-->

          <!--<el-form-item label="借记费率：" required>-->
            <!--<el-input-number v-model.trim="form.debitRate" :min="0" :max="1" :step="0.01" :precision="2"-->
                             <!--class="standard-form"></el-input-number>-->
            <!--<span class="tips">百分之</span>-->
          <!--</el-form-item>-->



          <!--<el-form-item label="贷记费率：" prop="wxFeeRate">-->
            <!--<el-input-number v-model.trim="form.creditRate" :min="0" :max="1" :step="0.01" :precision="2"-->
                             <!--class="standard-form"></el-input-number>-->
            <!--<span class="tips">百分之</span>-->
          <!--</el-form-item>-->

          <el-form-item label="银联云闪付借记费率：" prop="wxFeeRate">
            <el-input-number v-model.trim="form.qrDebitRate" :min="0" :max="1" :step="0.01" :precision="2"
                             class="standard-form"></el-input-number>
            <span class="tips">百分之</span>
          </el-form-item>

          <el-form-item label="银联云闪付贷记费率：" required>
            <el-input-number v-model.trim="form.qrCreditRate" :min="0" :max="1" :step="0.01" :precision="2"
                             class="standard-form"></el-input-number>
            <span class="tips">百分之</span>
          </el-form-item>

          <el-form-item label="微信交易费率：" prop="wxFeeRate">
            <el-input-number v-model.trim="form.wxDebitRate" :min="0" :max="1" :step="0.01" :precision="2"
                             class="standard-form"></el-input-number>
            <span class="tips">百分之</span>
          </el-form-item>

          <el-form-item label="支付宝交易费率：" prop="wxFeeRate">
            <el-input-number v-model.trim="form.zfbDebitRate" :min="0" :max="1" :step="0.01" :precision="2"
                             class="standard-form"></el-input-number>
            <span class="tips">百分之</span>
          </el-form-item>

          <!--<el-form-item label="终端数量：" required>-->
            <!--<el-input v-model.trim="form.termNum " placeholder="终端数量" class="standard-form"></el-input>-->
          <!--</el-form-item>-->


          <el-form-item label="联系人身份证号：" >
            <el-input v-model.trim="form.contactPersonCred " placeholder="联系人身份证号" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="经营类型：" >
            <el-radio-group v-model.trim="form.microBizType">
              <el-radio label="1">门店场所</el-radio>
              <el-radio label="2">流动经营/便民服务</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--<el-form-item label="支付授权目录（英文逗号分隔）：" >-->
            <!--<el-input v-model.trim="form.jsapiPath " placeholder="支付授权目录" class="standard-form"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="子商户号appid（英文逗号分隔）：" >
            <el-input v-model.trim="form.subAppid " placeholder="子商户号appid" class="standard-form"></el-input>
            <span class="tips tips-warning">若商户有公众号可修改，若无无需修改</span>
          </el-form-item>

          <el-form-item label="绑定商户号appid（英文逗号分隔）：" >
            <el-input v-model.trim="form.subscribeAppid " placeholder="绑定商户号appid" class="standard-form"></el-input>
            <span class="tips tips-warning">若商户有公众号可修改，若无无需修改</span>
          </el-form-item>

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
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>商户协议</span>
                  <span v-if="formImgUrl.pic0101!==''" :class="{'up-success':formImgUrl.pic0101!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0101Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0101" :src="formImgUrl.pic0101" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业场景照片</span>
                  <span v-if="formImgUrl.pic0117!==''" :class="{'up-success':formImgUrl.pic0117!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0117Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0117" :src="formImgUrl.pic0117" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>收银台图片</span>
                  <span v-if="formImgUrl.pic0217!==''" :class="{'up-success':formImgUrl.pic0217!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0217Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0217" :src="formImgUrl.pic0217" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>开户许可证</span>
                  <span v-if="formImgUrl.pic0109!==''" :class="{'up-success':formImgUrl.pic0109!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0109Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0109" :src="formImgUrl.pic0109" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证</span>
                  <span v-if="formImgUrl.pic0105!==''" :class="{'up-success':formImgUrl.pic0105!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0105Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0105" :src="formImgUrl.pic0105" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>身份证正面</span>
                  <span v-if="formImgUrl.pic0111!==''" :class="{'up-success':formImgUrl.pic0111!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0111Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0111" :src="formImgUrl.pic0111" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>身份证反面</span>
                  <span v-if="formImgUrl.pic0112!==''" :class="{'up-success':formImgUrl.pic0112!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0112Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0112" :src="formImgUrl.pic0112" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业执照</span>
                  <span v-if="formImgUrl.pic0103!==''" :class="{'up-success':formImgUrl.pic0103!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0103Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0103" :src="formImgUrl.pic0103" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照片</span>
                  <span v-if="formImgUrl.pic0211!==''" :class="{'up-success':formImgUrl.pic0211!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0211Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0211" :src="formImgUrl.pic0211" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业执照合影</span>
                  <span v-if="formImgUrl.pic0113!==''" :class="{'up-success':formImgUrl.pic0113!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0113Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0113" :src="formImgUrl.pic0113" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>银行卡正面</span>
                  <span v-if="formImgUrl.pic0206!==''" :class="{'up-success':formImgUrl.pic0206!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0206Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0206" :src="formImgUrl.pic0206" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>授权书</span>
                  <span v-if="formImgUrl.pic0205!==''" :class="{'up-success':formImgUrl.pic0205!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0205Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0205" :src="formImgUrl.pic0205" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>营业场景照片二</span>
                  <span v-if="formImgUrl.pic0118!==''" :class="{'up-success':formImgUrl.pic0118!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="pic0118Upload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.pic0118" :src="formImgUrl.pic0118" class="logo">
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
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">瑞银信保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="xryxInfoSubmit">提交资料到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="xryxRegisterStatus">查询进件状态
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="xryxSetpath">设置支付地址
          </el-button>
        </div>

      </el-card>
      </el-card>
    </el-form>
    <p class="cus-title">{{payChannelName}}进件</p>
  </div>
</template>

<script>

  import area from '@/assets/xryx/area.json' //地域数据
  import mcc from '@/assets/xryx/mcc.json' //地域数据
  import bank from '@/assets/xryx/bank.json' //地域数据

  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    url
  } from '@/utils/request'

  import {
    modifyMerchant,
    getXryxInfo,
    xryxRegister,
    xryxRegisterStatus,
    findPayTypeByChannel,
    xryxSetpath,
    xryxFindBankInfo
  } from '../api/xryx'
  import {
    checkVerify,
    saveRrecord
  } from '../api/public'

    export default {
      name: "xryx",
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
          area: area,
          bank: bank,
          mcc: mcc,
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
          form: {
            accessMode: '1',//商户性质
            orgId: '',//商户全称
            merProp: '2',//商户简称
            merName: '',//所在省
            orgMerName: '',//所在市
            merNameAbbr: '',//客服电话
            licType: '',//所属行业
            licNum: '',//营业执照名称
            licNumStartTime: '',//统一社会信用代码证
            licNumTime: '',//社会信用代码证有效期

            credPeople: '',//法人姓名
            credType: '01',//法人代表证件类型 01 04 05
            credNo: '',//法人代表证件号
            credStartTime: '',//法人身份证有效期 yyyy-mm-dd
            credTime: '',//注册地址
            cityArea: '',//商户负责人
            contactPerson: '',//商户负责人电话
            contactPhone: '1',//结算方式 0自主提现 1结算到银行卡
            bankCard: '',//账户号
            accountProp: '',//账户名
            settleType: '',//账户类型 0对私 1对公
            bankCardName: '',//结算人身份证号 对私结算必填
            settleCredType: '',//法人结算对私必填
            settleCredNo: '',//卡折类型 00借记卡 01存折
            settleCredStartTime: '',//卡折类型 00借记卡 01存折
            settleCredTime: '',//所属银行
            bankCityArea: '',//支付行号
            headBankNo: '',//扩展人
            openBankName: '',//合同有效期
            openBankChild: '',//是否三证合一 1是0否
            operateAddr: '',//组织机构代码证号
            regAddr: '',//组织机构代码证有效期
            manaScop: '',//法人手机号

            settleId: '',//微信费率
            settleWay: '',//支付宝费率
            mcc: '',//支付宝费率
            modelType: '1',//支付宝费率

            debitRate: '',//微信费率
            debitTop: '',//支付宝费率
            creditRate: '',//支付宝费率
            qrDebitRate: '',//支付宝费率
            qrCreditRate: '',//支付宝费率
            wxDebitRate: '',//支付宝费率
            zfbDebitRate: '',//支付宝费率
            termNum: '',//支付宝费率
            serviceType: '',//支付宝费率
            tradeTypeReimburse: '',//支付宝费率
            certificationType: '',//支付宝费率
            contactPersonCred: '',//支付宝费率
            microBizType: '',//支付宝费率
            jsapiPath: '',//支付宝费率
            subAppid: 'wxc43f2ba36545682a',//支付宝费率
            subscribeAppid: 'wxc43f2ba36545682a',//支付宝费率

            pic0101: '',//营业执照照片
            pic0117: '',//法人身份证正面照
            pic0217: '',//法人身份证反面照
            pic0109: '',//手持身份证照片
            pic0111: '',//门头照
            pic0112: '',//经营场所证明文件
            pic0103: '',//经营场所证明文件
            pic0211: '',//经营场所证明文件
            pic0113: '',//经营场所证明文件
            pic0206: '',//经营场所证明文件
            pic0205: '',//经营场所证明文件
            pic0118: '',//经营场所证明文件
            pic0105: '',//经营场所证明文件
          },

          formImgUrl: {
            pic0101: '',//营业执照照片
            pic0117: '',//法人身份证正面照
            pic0217: '',//法人身份证反面照
            pic0109: '',//手持身份证照片
            pic0111: '',//门头照
            pic0112: '',//经营场所证明文件
            pic0103: '',//经营场所证明文件
            pic0211: '',//经营场所证明文件
            pic0113: '',//经营场所证明文件
            pic0206: '',//经营场所证明文件
            pic0205: '',//经营场所证明文件
            pic0118: '',//经营场所证明文件
            pic0105: '',//经营场所证明文件
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
            }]
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
//            this.form.creditcodeexpire = ''
//          }
//        },
//        //法人身份证有效期
//        legalidexpireCheck: function (nVal,oVal) {
//          if (nVal) {
//            this.form.legalidexpire = ''
//          }
//        }
      },


      methods: {

        FindhyInfo: function (queryString, cb) {
          let temp= [];
          mcc.forEach((item, index) => {
            if(item[1].indexOf(queryString)>-1){
              let aa={};
              aa.id=item[0];
              aa.value=item[1];
              temp.push(aa);
            }
          })
          cb(temp)
        },
        FindhyInfoSelect: function (item) {
          if (item) {
            this.form.mcc = item.id;
          }
        },

        /**
         * 支行获取
         */
        xryxFindBankInfo: function (queryString, cb) {
          if (queryString.length >= 2) {
            xryxFindBankInfo(queryString).then(res => {
              this.bankInfo = res.obj;
              cb(res.obj)
            }).catch(e => {

            })
          }
        },
        xryxFindBankInfoSelect: function (item) {
          if (item) {
            this.form.openBankName = item.fullBankName;
            this.form.openBankChild = item.fullBankCode;
          }
        },


        xryxFindAreaInfo: function (queryString, cb) {
          if (queryString.length > 1) {
            let temp = [];
            area.forEach((item, index) => {
              if (item[1].indexOf(queryString) > -1 || item[3].indexOf(queryString) > -1 ) {
                let aa={};
                aa.id =item[2];
                aa.value = item[1] + " | " + item[3] ;
                temp.push(aa);
              }
            })
            cb(temp);
          }
        },
        xryxFindAreaInfoSelect: function (item) {
          if (item) {
            this.form.cityArea = item.id;
          }
        },
        xryxFindAreaInfoSelect2: function (item) {
          if (item) {
            this.form.bankCityArea = item.id;
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
        xryxInfoSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          xryxRegister(id).then(res => {
            this.$message.success('资料提交第三方成功');
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
        xryxRegisterStatus: function () {
          let id = this.urlid;
          xryxRegisterStatus(id).then(res => {
            this.$message.success(res.msg)
          }).catch(e => {

          })
        },


        xryxSetpath: function () {
          let id = this.urlid;
          xryxSetpath(id,this.form.jsapiPath).then(res => {
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
          getXryxInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 编辑拉取已进件资料
        modifyMerchantInfo: function (id) {
          // 编辑模式
          getXryxInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 审核模式拉取资料
        verifyMerchantInfo: function (id) {
          // 编辑模式和审核模式
          getXryxInfo(id, this.payChannel).then(res => {
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
        },

        infoDataFill: function (raw) {
          let data = raw.oldXryxMchInfo; // 基本数据

          this.form.id = data.id || ''; // 数据id
          this.form.accessMode = data.accessMode || '';
          this.form.orgId = data.orgId || '';
          this.form.merProp = data.merProp || '';
          this.form.merName = data.merName || '';
          this.form.orgMerName = data.orgMerName || '';
          this.form.merNameAbbr = data.merNameAbbr || '';
          this.form.licType = data.licType || '';
          this.form.licNum = data.licNum || '';
          this.form.licNumStartTime = data.licNumStartTime || '';
          this.form.licNumTime = data.licNumTime || '';

          this.form.credPeople = data.credPeople || '';
          this.form.credType = data.credType || '';
          this.form.credNo = data.credNo || '';
          this.form.credStartTime = data.credStartTime || '';

          this.form.credTime = data.credTime || '';
          this.form.cityArea = data.cityArea || '';
          this.form.contactPerson = data.contactPerson || '';

          this.form.contactPhone = data.contactPhone || '';
          this.form.bankCard = data.bankCard || '';
          this.form.accountProp = data.accountProp || '';
          this.form.settleType = data.settleType || '0';
          this.form.bankCardName = data.bankCardName || '';
          this.form.settleCredType = data.settleCredType || '';
          this.form.settleCredNo = data.settleCredNo || '';
          this.form.settleCredStartTime = data.settleCredStartTime || '';
          this.form.settleCredTime = data.settleCredTime || '';
          this.form.bankCityArea = data.bankCityArea || '';
          this.form.headBankNo = data.headBankNo || '';
          this.form.openBankName = data.openBankName || '';
          this.form.openBankChild = data.openBankChild || '';
          this.form.operateAddr = data.operateAddr || '';
          this.form.regAddr = data.regAddr || '';
          this.form.manaScop = data.manaScop || '';

          this.form.settleId = data.settleId || '';
          this.form.settleWay = data.settleWay || '';
          this.form.mcc = data.mcc || '';
          this.form.modelType = data.modelType || '';


          this.form.debitRate = data.debitRate || '0';
          this.form.debitTop = data.debitTop || '0';
          this.form.creditRate = data.creditRate || '0';
          this.form.qrDebitRate = data.qrDebitRate || '0';
          this.form.qrCreditRate = data.qrCreditRate || '0';
          this.form.wxDebitRate = data.wxDebitRate || '0';
          this.form.zfbDebitRate = data.zfbDebitRate || '0';
          this.form.termNum = data.termNum || 0;

          this.form.serviceType = data.serviceType || '';
          this.form.tradeTypeReimburse = data.tradeTypeReimburse || '';
          this.form.certificationType = data.certificationType || '';
          this.form.contactPersonCred = data.contactPersonCred || '';
          this.form.microBizType = data.microBizType || '';
          this.form.jsapiPath = data.jsapiPath || '';
          this.form.subAppid = data.subAppid || 'wxc43f2ba36545682a';
          this.form.subscribeAppid = data.subscribeAppid || 'wxc43f2ba36545682a';

          this.form.pic0101 = data.pic0101 || '';
          this.form.pic0117 = data.pic0117 || '';
          this.form.pic0217 = data.pic0217 || '';
          this.form.pic0109 = data.pic0109 || '';
          this.form.pic0111 = data.pic0111 || '';
          this.form.pic0112 = data.pic0112 || '';
          this.form.pic0103 = data.pic0103 || '';
          this.form.pic0211 = data.pic0211 || '';
          this.form.pic0113 = data.pic0113 || '';
          this.form.pic0206 = data.pic0206 || '';
          this.form.pic0205 = data.pic0205 || '';
          this.form.pic0118 = data.pic0118 || '';
          this.form.pic0105 = data.pic0105 || '';

          this.formImgUrl.pic0101 = this.imgFil(data.pic0101);
          this.formImgUrl.pic0117 = this.imgFil(data.pic0117);
          this.formImgUrl.pic0217 = this.imgFil(data.pic0217);
          this.formImgUrl.pic0109 = this.imgFil(data.pic0109);
          this.formImgUrl.pic0111 = this.imgFil(data.pic0111);
          this.formImgUrl.pic0112 = this.imgFil(data.pic0112);
          this.formImgUrl.pic0103 = this.imgFil(data.pic0103);
          this.formImgUrl.pic0211 = this.imgFil(data.pic0211);
          this.formImgUrl.pic0113 = this.imgFil(data.pic0113);
          this.formImgUrl.pic0206 = this.imgFil(data.pic0206);
          this.formImgUrl.pic0205 = this.imgFil(data.pic0205);
          this.formImgUrl.pic0118 = this.imgFil(data.pic0118);
          this.formImgUrl.pic0105 = this.imgFil(data.pic0105);
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
        pic0101Upload(response, file) {
          console.log(response);
          this.$message({
            message: '商户协议照上传成功',
            type: 'success'
          });
          this.form.pic0101 = response.obj.path;
          this.formImgUrl.pic0101 = this.imgFil(response.obj.path)
        },
        // 法人身份证正面照
        pic0117Upload(response, file) {
          console.log(response);
          this.$message({
            message: '营业场景照上传成功',
            type: 'success'
          });
          this.form.pic0117 = response.obj.path;
          this.formImgUrl.pic0117 = this.imgFil(response.obj.path)
        },

        // 法人身份证反面照
        pic0217Upload(response, file) {
          console.log(response);
          this.$message({
            message: '收银台照上传成功',
            type: 'success'
          });
          this.form.pic0217 = response.obj.path;
          this.formImgUrl.pic0217 = this.imgFil(response.obj.path)
        },
        // 门头照
        pic0109Upload(response, file) {
          console.log(response);
          this.$message({
            message: '开户许可照上传成功',
            type: 'success'
          });
          this.form.pic0109 = response.obj.path;
          this.formImgUrl.pic0109 = this.imgFil(response.obj.path)
        },
        // 手持身份证照片
        pic0111Upload(response, file) {
          console.log(response);
          this.$message({
            message: '身份证正面照片上传成功',
            type: 'success'
          });
          this.form.pic0111 = response.obj.path;
          this.formImgUrl.pic0111 = this.imgFil(response.obj.path)
        },
        //经营场所证明文件
        pic0112Upload(response,file){
          console.log(response);
          this.$message({
            message: '手持身份证反面照片上传成功',
            type: 'success'
          });
          this.form.pic0112 = response.obj.path;
          this.formImgUrl.pic0112 = this.imgFil(response.obj.path)
        },

        pic0103Upload(response,file){
          console.log(response);
          this.$message({
            message: '营业执照上传成功',
            type: 'success'
          });
          this.form.pic0103 = response.obj.path;
          this.formImgUrl.pic0103 = this.imgFil(response.obj.path)
        },

        pic0211Upload(response,file){
          console.log(response);
          this.$message({
            message: '门头照上传成功',
            type: 'success'
          });
          this.form.pic0211 = response.obj.path;
          this.formImgUrl.pic0211 = this.imgFil(response.obj.path)
        },
        pic0113Upload(response,file){
          console.log(response);
          this.$message({
            message: '营业执照合影上传成功',
            type: 'success'
          });
          this.form.pic0113 = response.obj.path;
          this.formImgUrl.pic0113 = this.imgFil(response.obj.path)
        },
        pic0206Upload(response,file){
          console.log(response);
          this.$message({
            message: '银行卡照上传成功',
            type: 'success'
          });
          this.form.pic0206 = response.obj.path;
          this.formImgUrl.pic0206 = this.imgFil(response.obj.path)
        },
        pic0205Upload(response,file){
          console.log(response);
          this.$message({
            message: '授权书上传成功',
            type: 'success'
          });
          this.form.pic0205 = response.obj.path;
          this.formImgUrl.pic0205 = this.imgFil(response.obj.path)
        },
        pic0118Upload(response,file){
          console.log(response);
          this.$message({
            message: '营业场景照片二上传成功',
            type: 'success'
          });
          this.form.pic0118 = response.obj.path;
          this.formImgUrl.pic0118 = this.imgFil(response.obj.path)
        },

        pic0105Upload(response,file){
          console.log(response);
          this.$message({
            message: '手持身份证上传成功',
            type: 'success'
          });
          this.form.pic0105 = response.obj.path;
          this.formImgUrl.pic0105 = this.imgFil(response.obj.path)
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
