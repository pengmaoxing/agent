<template>
  <div v-loading="loading">
    <p class="cus-title">{{payChannelName}}进件</p>
    <!--卡片-->
    <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>通联进件资料</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="goQuit">返回</el-button>
        </div>
        <!--表单内容-->
        <div>
          <!--经营联系信息-->
          <div class="info">
            <p>营业信息</p>
          </div>
          <el-form-item label="商户性质：" prop="comproperty">
            <el-radio-group v-model.trim="form.comproperty">
              <el-radio label="1">企业商户</el-radio>
              <el-radio label="3">个体商户</el-radio>
              <el-radio label="4">个人商户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商户全称：" prop="merchantname">
            <el-input v-model.trim="form.merchantname" placeholder="商户全称" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户简称：" prop="shortname">
            <el-input v-model.trim="form.shortname" placeholder="商户简称" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="省、市：" required="">
            <el-form-item class="block" prop="province">
              <el-select placeholder="请选择省份"
                         clearable
                         v-model="form.province"
                         @change="getCityArea($event)">
                <el-option v-for="item in provinceData"
                           :value="item.areaCode"
                           :key="item.areaCode"
                           :label="item.areaName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="block" prop="city">
              <el-select placeholder="请选择城市"
                         v-model="form.city">
                <el-option v-for="item in cityData"
                           :value="item.areaCode"
                           :key="item.areaCode"
                           :label="item.areaName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>

<!--          <el-form-item label="所在省代码：" prop="province">-->
<!--            <el-input v-model.trim="form.province" placeholder="所在省" class="standard-form"></el-input>-->
<!--            <span class="tips">省市代码查询附录7.2，<a style="color: #1e6abc" @click="downloadFile('localCode')">前往查询</a></span>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="所在市代码：" prop="city">-->
<!--            <el-input v-model.trim="form.city" placeholder="所在省" class="standard-form"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="客服电话：" prop="servicephone">
            <el-input v-model.trim="form.servicephone" placeholder="客服电话" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：" prop="mccid">
            <el-input v-model.trim="form.mccid" placeholder="所属行业" class="standard-form"></el-input>
            <span class="tips">MCC码(4位数字)需向银联查询，<a style="color: #1e6abc" @click="downloadFile('mcc')">前往查询</a></span>
          </el-form-item>

          <div v-if="form.comproperty!=='4'">
            <el-form-item label="营业执照名称：" prop="corpbusname">
              <el-input v-model.trim="form.corpbusname" placeholder="营业执照名称" class="standard-form"></el-input>
              <span class="tips">商户性质非个人时需要填写</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码证：" prop="creditcode">
              <el-input v-model.trim="form.creditcode" placeholder="统一社会信用代码证" class="standard-form"></el-input>
              <span class="tips">商户性质非个人时需要填写</span>
            </el-form-item>
            <el-form-item label="社会信用代码证有效期：" prop="creditcodeexpire">
              <el-date-picker v-model.trim="form.creditcodeexpire" type="date" placeholder="社会信用代码证有效期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd" v-if="!creditcodeexpireCheck">
              </el-date-picker>
              <el-checkbox v-model="creditcodeexpireCheck">长期有效</el-checkbox>
              <span class="tips">商户性质非个人时需要填写</span>
            </el-form-item>
          </div>

          <el-form-item label="是否三证合一：" prop="thrcertflag">
            <el-radio-group v-model.trim="form.thrcertflag">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-if="form.thrcertflag==='0'">
            <el-form-item label="组织机构代码证号：" prop="organcode">
              <el-input v-model.trim="form.organcode" placeholder="组织机构代码证号" class="standard-form"></el-input>
              <span class="tips">非三证合一需要填写</span>
            </el-form-item>
            <el-form-item label="组织机构代码证有效期：" prop="organexpire">
              <el-date-picker v-model.trim="form.organexpire" type="date" placeholder="社会信用代码证有效期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
              <span class="tips">非三证合一需要填写</span>
            </el-form-item>
          </div>


          <!--法人信息-->
          <div class="info">
            <p>法人信息</p>
          </div>

          <el-form-item label="法人姓名：" prop="legal">
            <el-input v-model.trim="form.legal" placeholder="法人姓名" class="standard-form"></el-input>
          </el-form-item>

          <el-form-item label="法人代表证件类型：" prop="legalidtype">
            <el-radio-group v-model.trim="form.legalidtype">
              <el-radio label="01">身份证</el-radio>
              <el-radio label="04">港澳台通行证</el-radio>
              <el-radio label="05">台湾通行证</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="法人代表证件号：" prop="legalidno">
            <el-input v-model.trim="form.legalidno" placeholder="法人代表证件号" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证有效期：" prop="legalidexpire">
            <el-date-picker v-model.trim="form.legalidexpire" type="date" placeholder="法人身份证有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" v-if="!legalidexpireCheck">
            </el-date-picker>
            <el-checkbox v-model="legalidexpireCheck">长期有效</el-checkbox>

          </el-form-item>
          <el-form-item label="法人手机号：" prop="legalphone">
            <el-input v-model.trim="form.legalphone" placeholder="法人手机号" class="standard-form"></el-input>
              <span class="tips">用于接收商户签约验证码，必须真实有效</span>
          </el-form-item>
          <el-form-item label="注册地址：" prop="address">
            <el-input v-model.trim="form.address" placeholder="注册地址" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户负责人：" prop="contactperson">
            <el-input v-model.trim="form.contactperson" placeholder="商户负责人" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="商户负责人电话：" prop="contactphone">
            <el-input v-model.trim="form.contactphone" placeholder="商户负责人电话" class="standard-form"></el-input>
          </el-form-item>

          <div class="info">
            <p>门店</p>
          </div>

          <el-form-item label="门店名称：" required>
            <el-input v-model.trim="form.mdbranchname" placeholder="门店名称" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="门店地址：" required>
            <el-input v-model.trim="form.mdbranchaddr" placeholder="门店地址" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="门店负责人：" required>
            <el-input v-model.trim="form.mdcontactperson" placeholder="门店负责人" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="门店负责人电话：" required>
            <el-input v-model.trim="form.mdcontactphone" placeholder="门店负责人电话" class="standard-form"></el-input>
          </el-form-item>

          <!--结算信息-->
          <div class="info">
            <p>结算/开户信息</p>
          </div>

          <el-form-item label="结算方式：" prop="clearmode">
            <el-radio-group v-model.trim="form.clearmode">
              <el-radio label="0">自主提现</el-radio>
              <el-radio label="1">结算到银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账户号：" prop="acctid">
            <el-input v-model.trim="form.acctid" placeholder="账户号" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="账户名：" prop="acctname">
            <el-input v-model.trim="form.acctname" placeholder="账户名" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="账户类型：" prop="accttype">
            <el-radio-group v-model.trim="form.accttype">
              <el-radio label="0">对私</el-radio>
              <el-radio label="1">对公</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="结算人身份证号：" prop="settidno">
            <el-input v-model.trim="form.settidno" placeholder="结算人身份证号" class="standard-form"></el-input>
            <span class="tips">对私结算时需填</span>
          </el-form-item>
          <el-form-item label="企业对私必填：" prop="pubacctinfo">
            <el-input v-model.trim="form.pubacctinfo" placeholder="企业对私必填" class="standard-form"></el-input>
            <span class="tips">格式如下：对公账户号#对公账户开户省#对公账户开户市#所属银行#支付行号</span>
          </el-form-item>
          <el-form-item label="卡折类型：" prop="accttp">
            <el-radio-group v-model.trim="form.accttp">
              <el-radio label="00">借记卡</el-radio>
              <el-radio label="01">存折</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到账模式：" required>
            <el-radio-group v-model.trim="form.dztype">
              <el-radio label="D1">D1</el-radio>
              <el-radio label="D0">D0</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <div class="bank-search">
              <el-divider content-position="left">银行信息搜索工具</el-divider>
            </div>
            <!--模糊查询-->
            <el-autocomplete class="standard-form" style="width: 480px" v-model.trim="branchBankName" :debounce="1000"
                             value-key="branchBankName" clearable :fetch-suggestions="tlFindBankInfo"
                             placeholder="银行模糊查询，请输入有高辨识度的关键词(>2字)，如“高新区支行”"
                             :trigger-on-focus="false" @select="tlFindBankInfoSelect"></el-autocomplete>
            <span class="tips tips-warning">选中后会自动填充开户行资料（以下两项）</span>
          </el-form-item>



          <el-form-item label="所属银行代码：" prop="bankcode">
            <el-input v-model.trim="form.bankcode" placeholder="所属银行" class="standard-form"></el-input>
<!--            <span class="tips">银行代码以及支付行号代码，<a style="color: #1e6abc" @click="downloadFile('bankCode')">前往下载</a></span>-->
          </el-form-item>
          <el-form-item label="支付行号：" prop="cnapsno">
            <el-input v-model.trim="form.cnapsno" placeholder="支付行号" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="扩展人：" prop="expanduser">
            <el-input v-model.trim="form.expanduser" placeholder="扩展人" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="合同有效期：" prop="contractdate">
            <el-date-picker v-model.trim="form.contractdate" type="date" placeholder="合同有效期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <!--费率信息-->
          <div class="info">
            <p>通联进件信息</p>
          </div>

          <el-form-item label="微信费率：" prop="wxFeeRate">
            <el-input-number v-model.trim="form.wxFeeRate" :min="0" :max="9999" :step="0.1" :precision="1"
                             class="standard-form"></el-input-number>
            <span class="tips">千分之</span>
          </el-form-item>
          <el-form-item label="支付宝费率：" prop="alFeeRate">
            <el-input-number v-model.trim="form.alFeeRate" :min="0" :max="9999" :step="0.1" :precision="1"
                             class="standard-form"></el-input-number>
            <span class="tips">千分之</span>
          </el-form-item>
          <el-form-item label="云闪付费率：" prop="ysfFeeRate">
            <el-input-number v-model.trim="form.ysfFeeRate" :min="0" :max="9999" :step="0.1" :precision="1"
                             class="standard-form"></el-input-number>
            <span class="tips">千分之</span>
          </el-form-item>
          <el-form-item label="预授权费率：" prop="preFeeRate">
            <el-input-number v-model.trim="form.preFeeRate" :min="0" :max="9999" :step="0.1" :precision="1"
                             class="standard-form"></el-input-number>
            <span class="tips">千分之</span>
          </el-form-item>
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
                  <span v-if="formImgUrl.bussiness!==''" :class="{'up-success':formImgUrl.bussiness!==''}">成功
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
                  <span v-if="formImgUrl.identityFace!==''" :class="{'up-success':formImgUrl.identityFace!==''}">成功
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
                  <span v-if="formImgUrl.identityBack!==''" :class="{'up-success':formImgUrl.identityBack!==''}">成功
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
            <!--门头照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照</span>
                  <span v-if="formImgUrl.merchantHead!==''" :class="{'up-success':formImgUrl.merchantHead!==''}">成功
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

            <!--手持身份证照片-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>手持身份证照片</span>
                  <span v-if="formImgUrl.identityBody!==''" :class="{'up-success':formImgUrl.identityBody!==''}">成功
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

            <!--经营场所证明文件-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>经营场所证明文件</span>
                  <span v-if="formImgUrl.bizplacepic!==''" :class="{'up-success':formImgUrl.bizplacepic!==''}">成功
                  </span>
                </div>
                <el-upload class="logo-uploader" :action="url" accept="image/png,image/jpg,image/jpeg" :data="filesData"
                           name="file" :show-file-list="false" :on-success="bizplacepicUpload"
                           :on-error="handleImageFailed"
                           :before-upload="beforeLogoUpload" :headers="headers">
                  <img v-if="formImgUrl.bizplacepic" :src="formImgUrl.bizplacepic" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>其他文件(zip，限制5M)</span>
                  <span v-if="formImgUrl.otherfile!==''" :class="{'up-success':formImgUrl.otherfile!==''}">成功
                  </span>
                  <a v-if="formImgUrl.otherfile" :href="formImgUrl.otherfile" >下载</a>
                </div>
                <el-upload class="logo-uploader" :action="url" :data="filesData"
                           name="file" :show-file-list="false" :on-success="otherfileUpload"
                           :on-error="handleImageFailed"
                            :headers="headers">
                  <i class="el-icon-plus logo-uploader-icon"></i>
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
          <el-button type="primary" @click="dataCollationBefore" :loading="btnLoading">通联保存并审核通过</el-button>
          <el-button type="primary" :loading="btnLoading" @click="tlInfoSubmit">提交资料到第三方
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="tlRegisterStatus">查询进件状态
          </el-button>

        </div>

      </el-card>




    </el-form>
    <p class="cus-title">{{payChannelName}}进件</p>
  </div>
</template>

<script>

  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    url
  } from '@/utils/request'

  import {
    modifyMerchant,
    getTLInfo,
    tlRegister,
    tlRegisterStatus,
    getProvince,
    getCityArea,
    findPayTypeByChannel,
    tlFindBankInfo
  } from '../api/tl'
  import {
    checkVerify,
    saveRrecord
  } from '../api/public'

    export default {
      name: "tl",
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
          form: {
            comproperty: '1',//商户性质
            merchantname: '',//商户全称
            shortname: '',//商户简称
            province: '',//所在省
            city: '',//所在市
            servicephone: '',//客服电话
            mccid: '',//所属行业
            corpbusname: '',//营业执照名称
            creditcode: '',//统一社会信用代码证
            creditcodeexpire: '',//社会信用代码证有效期

            legal: '',//法人姓名
            legalidtype: '01',//法人代表证件类型 01 04 05
            legalidno: '',//法人代表证件号
            legalidexpire: '',//法人身份证有效期 yyyy-mm-dd
            address: '',//注册地址
            contactperson: '',//商户负责人
            contactphone: '',//商户负责人电话
            clearmode: '1',//结算方式 0自主提现 1结算到银行卡
            acctid: '',//账户号
            acctname: '',//账户名
            accttype: '0',//账户类型 0对私 1对公
            settidno: '',//结算人身份证号 对私结算必填
            pubacctinfo: '',//法人结算对私必填
            accttp: '00',//卡折类型 00借记卡 01存折
            dztype: 'D1',//卡折类型 00借记卡 01存折
            bankcode: '',//所属银行
            cnapsno: '',//支付行号
            expanduser: '',//扩展人
            contractdate: '',//合同有效期
            thrcertflag: '1',//是否三证合一 1是0否
            organcode: '',//组织机构代码证号
            organexpire: '',//组织机构代码证有效期
            legalphone: '',//法人手机号

            wxFeeRate: '',//微信费率
            alFeeRate: '',//支付宝费率
            ysfFeeRate: '',//支付宝费率
            preFeeRate: '',//支付宝费率

            mdbranchname: '',//微信费率
            mdbranchaddr: '',//支付宝费率
            mdcontactperson: '',//支付宝费率
            mdcontactphone: '',//支付宝费率
          },

          formImgUrl: {

            bussiness: '',//营业执照照片
            identityFace: '',//法人身份证正面照
            identityBack: '',//法人身份证反面照
            identityBody: '',//手持身份证照片
            merchantHead: '',//门头照
            bizplacepic: '',//经营场所证明文件
            otherfile: '',//经营场所证明文件

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
        //获取省份
        this.getProvince();
      },


      watch: {
        //社会信用代码证有效期长期
        creditcodeexpireCheck: function (nVal,oVal) {
          if (nVal) {
            this.form.creditcodeexpire = '2099-12-31'
          }
        },
        //法人身份证有效期
        legalidexpireCheck: function (nVal,oVal) {
          if (nVal) {
            this.form.legalidexpire = '2099-12-31'
          }
        }
      },


      methods: {

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

        getCityArea: function (val) {
          if (val) {
            getCityArea(val).then(res => {
              let data = res.obj;
              this.cityData = data;
            }).catch(e => {

            })
          } else {
            this.form.city = '';
            this.cityData = [];
          }

        },
        /**
         * 省获取
         */
        getProvince: function () {
          getProvince().then(res => {
            let data = res.obj;
            this.provinceData = data;
          }).catch(e => {

          })
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
        tlInfoSubmit: function(){

          let id=this.urlid;
          this.btnLoading=true;
          tlRegister(id).then(res => {
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
        tlRegisterStatus: function () {
          let id = this.urlid;
          tlRegisterStatus(id).then(res => {
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
          getTLInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 编辑拉取已进件资料
        modifyMerchantInfo: function (id) {
          // 编辑模式
          getTLInfo(id, this.payChannel).then(res => {
            let data = res.obj;
            this.dataAutoInput(data)
          }).catch(e => {

          })
        },
        // 审核模式拉取资料
        verifyMerchantInfo: function (id) {
          // 编辑模式和审核模式
          getTLInfo(id, this.payChannel).then(res => {
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
          this.photoDataFill(raw);
          this.getCityArea(this.form.province);
        },

        infoDataFill: function (raw) {
          let data = raw.oldTLMchInfo; // 基本数据

          this.form.id = data.id || ''; // 数据id
          this.form.comproperty = data.comproperty || '1';
          this.form.merchantname = data.merchantname || '';
          this.form.shortname = data.shortname || '';
          this.form.province = data.province || '';
          this.form.city = data.city || '';
          this.form.servicephone = data.servicephone || '';
          this.form.mccid = data.mccid || '';
          this.form.corpbusname = data.corpbusname || '';
          this.form.creditcode = data.creditcode || '';
          this.form.creditcodeexpire = data.creditcodeexpire || '';

          if (data.creditcodeexpire === '2099-12-31') {
            this.creditcodeexpireCheck=true;
          }


          this.form.legal = data.legal || '';
          this.form.legalidtype = data.legalidtype || '01';
          this.form.legalidno = data.legalidno || '';
          this.form.legalidexpire = data.legalidexpire || '';
          if (data.legalidexpire === '2099-12-31') {
            this.legalidexpireCheck=true;
          }

          this.form.address = data.address || '';
          this.form.contactperson = data.contactperson || '';
          this.form.contactphone = data.contactphone || '';

          this.form.clearmode = data.clearmode || '1';
          this.form.acctid = data.acctid || '';
          this.form.acctname = data.acctname || '';
          this.form.accttype = data.accttype || '0';
          this.form.settidno = data.settidno || '';
          this.form.pubacctinfo = data.pubacctinfo || '';
          this.form.accttp = data.accttp || '00';
          this.form.dztype = data.dztype || 'D1';
          this.form.bankcode = data.bankcode || '';
          this.form.cnapsno = data.cnapsno || '';
          this.form.expanduser = data.expanduser || '';
          this.form.contractdate = data.contractdate || '';
          this.form.thrcertflag = data.thrcertflag || '1';
          this.form.organcode = data.organcode || '';
          this.form.organexpire = data.organexpire || '';
          this.form.legalphone = data.legalphone || '';

          this.form.mdbranchname = data.mdbranchname || '';
          this.form.mdbranchaddr = data.mdbranchaddr || '';
          this.form.mdcontactperson = data.mdcontactperson || '';
          this.form.mdcontactphone = data.mdcontactphone || '';

          this.form.wxFeeRate = data.wxFeeRate || '0';
          this.form.alFeeRate = data.alFeeRate || '0';
          this.form.ysfFeeRate = data.ysfFeeRate || '0';
          this.form.preFeeRate = data.preFeeRate || '0';

        },
        photoDataFill: function (raw) {
          let data = raw.oldTLMchPhoto; // 照片数据

          // 回填ID
          this.form.bussiness = data.bussiness || '';
          this.form.identityFace = data.identityFace || '';
          this.form.identityBack = data.identityBack || '';
          this.form.merchantHead = data.merchantHead || '';
          this.form.identityBody = data.identityBody || '';
          this.form.bizplacepic = data.bizplacepic || '';
          this.form.otherfile = data.otherfile || '';

          // 获取链接
          this.formImgUrl.bussiness = this.imgFil(data.bussiness);
          this.formImgUrl.identityFace = this.imgFil(data.identityFace);
          this.formImgUrl.identityBack = this.imgFil(data.identityBack);
          this.formImgUrl.merchantHead = this.imgFil(data.merchantHead);
          this.formImgUrl.identityBody = this.imgFil(data.identityBody);
          this.formImgUrl.bizplacepic = this.imgFil(data.bizplacepic);
          this.formImgUrl.otherfile = this.imgFil(data.otherfile);
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
        //经营场所证明文件
        bizplacepicUpload(response,file){
          console.log(response);
          this.$message({
            message: '手持身份证照片上传成功',
            type: 'success'
          });
          this.form.bizplacepic = response.obj.path;
          this.formImgUrl.bizplacepic = this.imgFil(response.obj.path)
        },

        otherfileUpload(response,file){
          console.log(response);
          this.$message({
            message: '其他附件上传成功',
            type: 'success'
          });
          this.form.otherfile = response.obj.path;
          this.formImgUrl.otherfile = this.imgFil(response.obj.path)
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
