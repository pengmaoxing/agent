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
        <div divName="传化">

          <div class="info">
            <p>商户基本信息</p>
          </div>

          <el-form-item label="商户类型："   prop="organization_type">
            <el-radio-group v-model="addForm.wgcstatus">
              <el-radio label="1">商户</el-radio>
              <el-radio label="2">小微商户</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="商户名称："   prop="merchName" >
            <el-input class="input-width" v-model.trim="addForm.merchName"></el-input>
            <span class="tips">不允许使用特殊字符（!@*%_=+等）</span>
          </el-form-item>


          <el-form-item label="姓名："  prop="certName">
            <el-input class="input-width"
                      v-model.trim="addForm.certName"
                      placeholder="填写真实姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机号："  prop="mobile">
            <el-input class="input-width"
                      v-model.trim="addForm.mobile"
                      placeholder="法人实际在用手机号（11位）"></el-input>
            <span class="tips">仅接受11位手机号码，例如：13066668888</span>
          </el-form-item>

          <el-form-item label="证件号码：" prop="certNo" >
            <el-input class="input-width"
                      v-model.trim="addForm.certNo"
                      placeholder="完整证件号码"></el-input>
          </el-form-item>

          <el-form-item label="证件有效期开始：" required="">
            <el-date-picker
              v-model="addForm.certStartDate"
              type="date"
              placeholder="选择证件有效期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="证件有效期结束：" required="">
            <el-date-picker
              v-model="addForm.certExpireDate"
              type="date"
              placeholder="选择证件有效期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="商户证件号：" prop="licenseNo" >
            <el-input class="input-width"
                      v-model.trim="addForm.licenseNo"
                      placeholder="营业执照注册号"></el-input>
          </el-form-item>

          <el-form-item label="MCC码："   prop="mccCode">
            <el-select placeholder="请选择MCC码"
                       v-model="addForm.mccCode"
                       @change="getSubmcc($event)">
              <el-option :value="item.mcc"
                         :key="item.mcc"
                         :label="item.mccname"
                         v-for="item  in mccJsons">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营范围：">
            <el-input class="input-width"
                      v-model.trim="addForm.scopeArea"
                      placeholder="填写经营范围"></el-input>
          </el-form-item>


            <el-form-item label="省份编码：" required="" >
              <el-select placeholder="请选择省份"
                         v-model="addForm.provCode"
                         @change="getProv($event)">
                <el-option :value="key"
                           :key="i"
                           :label="val"
                           v-for="(val,key,i) in dataProv">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="城市编码：" required="" >
              <el-select placeholder="请选择城市"
                         v-model="addForm.cityCode"
                         @change="getCity($event)">
                <el-option :value="key"
                           :key="i"
                           :label="val"
                           v-for="(val,key,i) in dataCity">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="县区编码：" required="" >
              <el-select placeholder="请选择县区"
                         v-model="addForm.areaCode"
                         >
                <el-option :value="key"
                           :key="i"
                           :label="val"
                           v-for="(val,key,i) in dataCountry">
                </el-option>
              </el-select>
            </el-form-item>

          <el-form-item prop="detAddress" label="详细地址："  required="">
            <el-input class="input-width"
                      v-model.trim="addForm.detAddress"
                      placeholder="商户详细地址"></el-input>
          </el-form-item>


          <el-form-item label="银行卡账户类型类型："  required="">
            <el-radio-group v-model="addForm.accountType">
              <el-radio label="0">私账</el-radio>
              <el-radio label="1">公账</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="银行卡号户名：" required="" >
            <el-input class="input-width"
                      v-model.trim="addForm.accountNo"
                      placeholder="银行卡号户名"></el-input>
          </el-form-item>

          <el-form-item label="银行卡号：" required="" >
            <el-input class="input-width"
                      v-model.trim="addForm.accountName"
                      placeholder="银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="银行类型(对公必填)：" >
            <el-input class="input-width"
                      v-model.trim="addForm.bankCode"
                      placeholder="银行类型"></el-input>
          </el-form-item>
          <el-form-item label="联行号，对公必填："  >
            <el-input class="input-width"
                      v-model.trim="addForm.unionBankNo"
                      placeholder="联行号"></el-input>
          </el-form-item>
          <el-form-item label="分支行名称：" required="" >
            <el-input class="input-width"
                      v-model.trim="addForm.unionBankName"
                      placeholder="银行卡号"></el-input>
          </el-form-item>

          <el-form-item label="支付宝手续费："  required="" >
            <el-input class="input-width"
                      v-model.trim="addForm.alipay"
                      placeholder="联行号"></el-input>
            <span class="tips">如：0.002是千二</span>
          </el-form-item>

          <el-form-item label="微信手续费："  required="" >
            <el-input class="input-width"
                      v-model.trim="addForm.wxpay"
                      placeholder="联行号"></el-input>
            <span class="tips">如：0.002是千二</span>
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
              </el-input-number>
              %
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
            <!--门头照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>门头照</span>
                  <span v-if="formImgUrl.shjymtz_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.shjymtz_image!=''"
                        :class="{'up-success':formImgUrl.shjymtz_image!=''}">成功
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
                  <img v-if="formImgUrl.shjymtz_image" :src="formImgUrl.shjymtz_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--经营场所照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>商户经营实体产品照</span>
                  <span v-if="formImgUrl.shjystcpz_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.shjystcpz_image!=''"
                        :class="{'up-success':formImgUrl.shjystcpz_image!=''}">成功
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
                  <img v-if="formImgUrl.shjystcpz_image" :src="formImgUrl.shjystcpz_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证正面照(面部)-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>身份证正面照片</span>
                  <span v-if="formImgUrl.sfzzm_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.sfzzm_image!=''"
                        :class="{'up-success':formImgUrl.sfzzm_image!=''}">成功
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
                  <img v-if="formImgUrl.sfzzm_image" :src="formImgUrl.sfzzm_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--法人身份证反面照(国徽)-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
              <div>
                <div class="card-header-title">
                  <span>身份证反面</span>
                  <span v-if="formImgUrl.sfzfm_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.sfzfm_image!=''"
                        :class="{'up-success':formImgUrl.sfzfm_image!=''}">成功
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
                  <img v-if="formImgUrl.sfzfm_image" :src="formImgUrl.sfzfm_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <!--银行卡照-->
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item" >
              <div>
                <div class="card-header-title">
                  <span>银行卡照</span>
                  <span v-if="formImgUrl.fryhkzm_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.fryhkzm_image!=''"
                        :class="{'up-success':formImgUrl.fryhkzm_image!=''}">成功
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
                  <img v-if="formImgUrl.fryhkzm_image" :src="formImgUrl.fryhkzm_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item" >
              <div>
                <div class="card-header-title">
                  <span>商户证件照片</span>
                  <span v-if="formImgUrl.gsyyzz_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.gsyyzz_image!=''"
                        :class="{'up-success':formImgUrl.gsyyzz_image!=''}">成功
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
                  <img v-if="formImgUrl.gsyyzz_image" :src="formImgUrl.gsyyzz_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item" >
              <div>
                <div class="card-header-title">
                  <span>开户许可证</span>
                  <span v-if="formImgUrl.khxkz_image!=''">&nbsp</span>
                  <span v-if="formImgUrl.khxkz_image!=''"
                        :class="{'up-success':formImgUrl.khxkz_image!=''}">成功
                </span>
                </div>
                <el-upload
                  class="logo-uploader"
                  :action="url"
                  accept="image/png,image/jpg,image/jpeg"
                  :data="filesData"
                  name="file"
                  :show-file-list="false"
                  :on-success="kaihuxukeUpload"
                  :on-error="handleImageFailed"
                  :before-upload="beforeLogoUpload"
                  :headers="headers">
                  <img v-if="formImgUrl.khxkz_image" :src="formImgUrl.khxkz_image" class="logo">
                  <i v-else class="el-icon-plus logo-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>

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
          <el-button type="primary" :loading="btnLoading" @click="uploadThirdImage">提交图片资料至农业银行
          </el-button>
          <el-button type="primary" v-show="infoSendSwitch" :loading="btnLoading"
                     @click="uploadThirdInfo">提交文字资料至农业银行
          </el-button>
          <!--<el-button type="" :disabled="verifyClsoe" @click="findXlsStatus">查询进件结果-->
          <!--</el-button>-->
        </div>
      </el-card>
    </el-form>
    <p class="cus-title">当前是{{payChannelName}}进件</p>

  </div>
</template>

<script>
  import allJson from '@/assets/wgc/area.json' //地域数据

  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {url} from '@/utils/request'

  import {mixins} from "../../mixins/mixins";

  import {
    getPlantInfo,
    findPayType,
    findPayTypeByChannel,
    modifyMerchantJson,
    uploadThirdImage,
    uploadThirdInfo,
    findWgcStatus
  } from '../api/wgc'

  import {
    saveRrecord,
    checkVerify
  } from '../api/public'


  export default {
    name: "addMerchant",
    mixins:[mixins],
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
          //传化基本数据
          wgcstatus: '', //商户类型。1=商户 2=小微商户
          merchName: '', //商户简称
          mobile: '', //客服电话
          certNo: '', //MCC码商户行业编号
          certName: '', //MCC码商户行业编号
          certStartDate: '', //MCC码商户行业编号
          certExpireDate: '', //MCC码商户行业编号

          licenseNo: '', //MCC码商户行业编号
          mccCode: '', //MCC码商户行业编号
          scopeArea: '', //MCC码商户行业编号

          provCode: '', //省
          cityCode: '', //市
          areaCode: '', //区
          detAddress: '', //详细地址

          accountType: '', //详细地址
          accountNo: '', //详细地址

          accountName: '',//法人姓名
          bankCode: '',//证件类型：1-身份证；2-港澳台通行证；3-台湾身份证；4-香港身份证；5-澳门身份证；9-其它法定文件(不传默认身份证)
          unionBankNo: '', //证件号
          unionBankName: '',//证件有效期结束格式 永久有效:2099-12-30

          alipay: '', //营业执照注册号
          wxpay: '', //营业执照注册号

          sfzzm_image: '',//银行卡号
          sfzfm_image: '', //门头照
          gsyyzz_image: '', //经营场所内设照片
          shjymtz_image: '', //收银台照片
          shjystcpz_image: '',
          fryhkzm_image: '', //银行卡正面（如是对公账户，开户许可证）
          khxkz_image: '', //非法人结算授权书(非法人结算模式必传)
        },

        //图片临时
        formImgUrl: {
          sfzzm_image: '', //门头照
          sfzfm_image: '', //经营场所内设照片
          gsyyzz_image: '', //收银台照片
          shjymtz_image: '',
          shjystcpz_image: '', //银行卡正面（如是对公账户，开户许可证）
          fryhkzm_image: '', //非法人结算授权书(非法人结算模式必传)
          khxkz_image: '', //非法人结算授权书(非法人结算模式必传)
        },
        dymForm: [],
        //地域选择
        dataProv: allJson.filter(item => item[1]=='1'),
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
        addRules: {
          organization_type: [
            {required: true, message: '请选择商户类型', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入商户名称', trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur'},
            {validator: chinese_rule, trigger: 'blur'}
          ],
          shortname: [
            {required: true, message: '请输入商户简称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
            {validator: chinese_rule, trigger: 'blur'}
          ],
          mcc_code: [
            {required: true, message: '请输入MCC码', trigger: 'blur'},
            {min: 4, max: 4, message: 'MCC码为4位字符', trigger: 'blur'},
            {validator: mcc_rule, trigger: 'blur'}
          ],
          sub_mcc_code: [
            {required: true, message: '请输入商户类别码二级', trigger: 'blur'},
            {min: 4, max: 4, message: 'subMCC码为4位字符', trigger: 'blur'},
            {validator: mcc_rule, trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入法人姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '法人真实姓名长度在 2 到 15 位字符', trigger: 'blur'}
          ],
          credentialType: [
            {required: true, message: '请选择证件类型', trigger: 'change'},
          ],
          id_card_number: [
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
          service_phone: [
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
          license_number: [
            {required: true, message: '请输入营业执照注册号', trigger: 'blur'},
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
            {required: true, message: '请输入完整开户行网点名称', trigger: 'blur'},
          ],
          unionpay: [
            {required: false, message: '请输入开户支行联行号', trigger: 'blur'},
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

        showCode: '',

        applyId: '',

        //文字进件开关
        infoSendSwitch: true,//暂时默认显示

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

      // console.log(this.localCode)
    },
    methods: {

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
        let data = this.bankData
        if (data === '' || data.length == 0) {
          return
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
        this.$confirm('提交图片进件资料至传化, 是否继续?', '提示', {
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
        this.$confirm('提交文字进件资料至传化, 是否继续?', '提示', {
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

      downloadFile: function (type) {
          window.location.href = './static/file/bankcode2.xlsx'
      },
      /**
       * 回显资料
       */
      autoInputData: function (row) {
        console.log(row);
        if (row) {
          let data = row.xlsMchInfo;
          console.log(data);
          this.addForm.id = data.id || '';
          this.addForm.wgcstatus = data.wgcstatus || '';
          this.addForm.merchName = data.merchName || '';
          this.addForm.mobile = data.mobile || '';
          this.addForm.certNo = data.certNo || '';
          this.addForm.certName = data.certName || '';
          this.addForm.certStartDate = data.certStartDate || '';
          this.addForm.certExpireDate = data.certExpireDate || '';
          this.addForm.licenseNo = data.licenseNo || '';

          this.addForm.mccCode = data.mccCode || '';
          this.addForm.scopeArea = data.scopeArea || '';
          this.addForm.provCode = data.provCode || '';
          this.addForm.cityCode = data.cityCode || '';
          this.addForm.areaCode = data.areaCode || '';


          this.addForm.detAddress = data.detAddress || '';
          this.addForm.accountType = data.accountType || '';
          this.addForm.accountNo = data.accountNo || '';
          this.addForm.accountName = data.accountName || '';
          this.addForm.bankCode = data.bankCode || '';
          this.addForm.unionBankNo = data.unionBankNo || '';
          this.addForm.unionBankName = data.unionBankName || '';
          this.addForm.alipay = data.alipay || '';
          this.addForm.wxpay = data.wxpay || '';


          this.addForm.sfzzm_image = data.sfzzm_image; //门头照
          this.addForm.sfzfm_image = data.sfzfm_image; //经营场所内设照片
          this.addForm.gsyyzz_image = data.gsyyzz_image; //收银台照片
          this.addForm.shjymtz_image = data.shjymtz_image; //银行卡照
          this.addForm.shjystcpz_image = data.shjystcpz_image; //开户许可证
          this.addForm.fryhkzm_image = data.fryhkzm_image; //非法人结算授权书
          this.addForm.khxkz_image = data.khxkz_image; //非法人结算授权书

          this.formImgUrl.sfzzm_image = this.imgFil(data.sfzzm_image); //门头照
          this.formImgUrl.sfzfm_image = this.imgFil(data.sfzfm_image); //经营场所内设照片
          this.formImgUrl.gsyyzz_image = this.imgFil(data.gsyyzz_image); //收银台照片
          this.formImgUrl.shjymtz_image = this.imgFil(data.shjymtz_image); //银行卡照
          this.formImgUrl.shjystcpz_image = this.imgFil(data.shjystcpz_image); //开户许可证
          this.formImgUrl.fryhkzm_image = this.imgFil(data.fryhkzm_image); //非法人结算授权书
          this.formImgUrl.khxkz_image = this.imgFil(data.khxkz_image); //非法人结算授权书

          if(data.provCode!=''){
            this.dataCity = allJsonallJson.filter(item => item[2]==data.provCode);
          }

          if(data.cityCode!=''){
            this.areaCode = allJsonallJson.filter(item => item[2]==data.cityCode);
          }
        }
      },
      //进件状态查询
      findWgcStatus: function () {
        let id = this.urlid;
        if (id === '' || id == null) {
          this.$message.error('id为空，无法查询');
          return false
        }
        //发起查询
        findWgcStatus(id).then(res => {
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
       * 省市区
       */
      //省
      getProv: function (a) {
        this.dataCity = allJsonallJson.filter(item => item[2]==a);
        this.dataCountry = '';

        this.addForm.cityCode = '';
        this.addForm.areaCode = ''
      },
      //市
      getCity: function (a) {
        this.dataCountry =allJsonallJson.filter(item => item[2]==a);;
        this.addForm.areaCode = ''
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
        this.addForm.shjymtz_image = response.obj.path;
        this.formImgUrl.shjymtz_image = this.imgFil(response.obj.path)
      },
      //经营场所照
      otherPhoto3Upload(response, file) {
        console.log(response);
        this.$message({
          message: '商户经营产品照上传成功',
          type: 'success'
        });
        this.addForm.shjystcpz_image = response.obj.path;
        this.formImgUrl.shjystcpz_image = this.imgFil(response.obj.path)
      },

      //法人身份证正面
      identityFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人证件正面照上传成功',
          type: 'success'
        });
        this.addForm.sfzzm_image = response.obj.path;
        this.formImgUrl.sfzzm_image = this.imgFil(response.obj.path)
      },
      //法人身份证反面
      identityBackUpload(response, file) {
        console.log(response);
        this.$message({
          message: '法人证件反面照上传成功',
          type: 'success'
        });
        this.addForm.sfzfm_image = response.obj.path;
        this.formImgUrl.sfzfm_image = this.imgFil(response.obj.path)
      },
      //营业执照
      bussinessUpload(response, file) {
        console.log(response);
        this.$message({
          message: '商户证件照片上传成功',
          type: 'success'
        });
        this.addForm.gsyyzz_image = response.obj.path;
        this.formImgUrl.gsyyzz_image = this.imgFil(response.obj.path)
      },
      kaihuxukeUpload(response, file) {
        console.log(response);
        this.$message({
          message: '开户许可照上传成功',
          type: 'success'
        });
        this.addForm.license_pic = response.obj.path;
        this.formImgUrl.license_pic = this.imgFil(response.obj.path)
      },
      //银行卡照
      cardFaceUpload(response, file) {
        console.log(response);
        this.$message({
          message: '银行卡正面照上传成功',
          type: 'success'
        });
        this.addForm.bankcard_pic = response.obj.path;
        this.formImgUrl.bankcard_pic = this.imgFil(response.obj.path)
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
