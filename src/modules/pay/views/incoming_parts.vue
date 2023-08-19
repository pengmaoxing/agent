<template>
  <div class="app-container" v-loading='loading'>
    <!--<el-form :rules="rules" ref="form" :model="form" label-width="150px">-->
    <div class="title-header">
      <span class="name_title">{{mName}}</span>
      <span class="name_back" @click="goback">返回列表</span>
    </div>
    <el-steps :active="active" simple>
      <el-step title="填写经营信息" icon="el-icon-edit"></el-step>
      <el-step title="填写商户信息" icon="el-icon-edit"></el-step>
      <el-step title="填写结算账户" icon="el-icon-edit"></el-step>
      <el-step title="填写组织机构信息" icon="el-icon-edit"></el-step>
      <el-step title="确认提交" icon="el-icon-upload"></el-step>
    </el-steps>
    <br>
    <div v-show="active==0">
      <el-form :rules="rules" ref="form0" :model="form" label-width="150px">
        <!--<el-form :model="form" label-width="150px">-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="box-card-header">联系信息</div>
          </div>
          <div class="text item">
            <el-form-item label="联系人姓名" prop="contact">
              <el-input v-model="form.contact" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="常用邮箱" prop="email">
              <el-input v-model="form.email" class="form_input"></el-input>
            </el-form-item>
          </div>
        </el-card>
        <br>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="box-card-header">经营信息</div>
          </div>
          <div class="text item">
            <div class="info">
              <p>商户信息</p>
            </div>
            <el-form-item label="商户简称" prop="shortName">
              <el-input v-model="form.shortName" class="form_input"
                        placeholder="该名称将于在支付完成页面向消费者进行展示"></el-input>
            </el-form-item>
            <el-form-item label="经营类目" prop="category">
              <el-cascader
                v-model="form.category"
                placeholder="请搜索"
                :options="options"
                filterable
                class="form_input"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商户名称" prop="merchantName">
              <el-input v-model="form.merchantName" class="form_input" placeholder="商户名称需与营业执照登记公司名称一致"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registerAddress">
              <el-input v-model="form.registerAddress" class="form_input" placeholder="注册地址需与营业执照登记住所一致"></el-input>
            </el-form-item>
            <div class="info">
              <p>经营信息</p>
            </div>
            <el-form-item label="售卖商品场景" prop="sellCheck">
              <el-checkbox-group v-model="form.sellCheck" :min="1">
                <el-checkbox label="1">线下</el-checkbox>
                <el-checkbox label="2">公众号/小程序</el-checkbox>
                <el-checkbox label="3">网站</el-checkbox>
                <el-checkbox label="4">APP</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="门店地址" v-if="sellScene_offline" prop="address">
              <el-input v-model="form.address" class="form_input" placeholder="请填写详细的经营场所地址"></el-input>
              <div class="line"></div>
            </el-form-item>
            <el-form-item label="公众号/小程序名称" v-if="sellScene_wxapp" prop="miniProgramName">
              <el-input v-model="form.miniProgramName" class="form_input" placeholder="公众号/小程序能清晰介绍功能"></el-input>
            </el-form-item>
            <el-form-item label="公众号/小程序截图" v-if="sellScene_wxapp" prop="miniProgramPhotoId">
              <!--小程序截图文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="sendWxAppimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="miniProgramPhotoIdUrl" :src="miniProgramPhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--小程序截图文件上传-->
              <div class="line"></div>
            </el-form-item>
            <el-form-item label="公司网站" v-if="sellScene_website" prop="companyWeb">
              <el-input v-model="form.companyWeb" class="form_input" placeholder="公众号/小程序能清晰介绍功能"></el-input>
              <div class="line"></div>
            </el-form-item>
            <el-form-item label="APP上线状态" v-if="sellScene_app" prop="appStatus">
              <el-select v-model="form.appStatus" placeholder="请选择">
                <el-option :value="1" label="APP未上线"></el-option>
                <el-option :value="2" label="APP已上线"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="APP页面截图" v-if="sellScene_app" prop="appPhotoId">
              <!--APP截图文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="sendAppimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="appPhotoIdUrl" :src="appPhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--小程序截图文件上传-->
              <div class="line"></div>
            </el-form-item>
            <el-form-item label="客服电话" prop="cusServiceTel">
              <el-input v-model="form.cusServiceTel" class="form_input" placeholder="审核人员会对电话进行回拨确认"></el-input>
            </el-form-item>
            <el-form-item label="特殊资质" prop="specialQualificationPhotoId">
              <!--特殊资质截图文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="sendSpecialQualificationimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="specialQualificationPhotoIdUrl" :src="specialQualificationPhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--特殊资质截图文件上传-->
            </el-form-item>
            <el-form-item label="补充材料">
              <!--补充文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="supplementimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="supplementPhotoIdUrl" :src="supplementPhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--补充文件上传-->
            </el-form-item>
          </div>
        </el-card>
        <br>
      </el-form>
    </div>
    <div v-show="active==1">
      <el-form :rules="rules" ref="form1" :model="form" label-width="150px">
        <!--<el-form :model="form" label-width="150px">-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="box-card-header">商户信息</div>
          </div>
          <div class="text item">
            <div class="info">
              <p>营业执照</p>
            </div>
            <el-form-item label="营业执照注册号" prop="license">
              <el-input v-model="form.license" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="经营范围" prop="businessScope">
              <el-input type="textarea" :rors="3" v-model="form.businessScope" class="form_input"
                        placeholder="与企业工商营业执照上一致"></el-input>
            </el-form-item>
            <el-form-item label="营业期限" required>

              <el-date-picker
                v-model="form.startBusinessTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.endBusinessTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>

            </el-form-item>
            <el-form-item label="营业执照照片" prop="businessLicensePhotoId">
              <!--营业执照文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="businessLicenseimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="businessLicensePhotoIdUrl" :src="businessLicensePhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--营业执照文件上传-->
            </el-form-item>
            <div class="info">
              <p>企业法人/经办人</p>
            </div>
            <el-form-item label="证件持有人类型" prop="representativeType">
              <el-select v-model="form.representativeType" placeholder="请选择">
                <el-option :value="1" label="法人"></el-option>
                <el-option :value="2" label="经办人"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件持有人姓名" prop="representativeName">
              <el-input v-model="form.representativeName" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificate">
              <el-select v-model="form.certificate" placeholder="请选择">
                <el-option :value="1" label="身份证"></el-option>
                <el-option :value="2" label="护照"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificateNum">
              <el-input v-model="form.certificateNum" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="证件有效期" required>


              <el-date-picker
                v-model="form.startCertificateTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.endCertificateTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>


            </el-form-item>
            <el-form-item label="证件扫描件" prop="representative">
              <!--法人证件文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="representativeimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="representativeImgUrl" :src="representativeImgUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--法人证件文件上传-->
            </el-form-item>
          </div>
        </el-card>
        <br>
        <br>
      </el-form>
    </div>
    <div v-show="active==2">
      <el-form :rules="rules" ref="form2" :model="form" label-width="150px">
        <!--<el-form :model="form" label-width="150px">-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="box-card-header">结算账户</div>
          </div>
          <div class="text item">
            <el-form-item label="账户类型" prop="accountType">
              <el-select v-model="form.accountType" placeholder="请选择账户类型">
                <el-option value="对公账户" label="对公账户"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户名称" prop="accountHolder">
              <el-input v-model="form.accountHolder" class="form_input" placeholder="请输入开户名称"></el-input>
            </el-form-item>
            <el-form-item label="开户银行城市" prop="bankCity">
              <el-input v-model="form.bankCity" placeholder="请输入开户行所在地（县/市）"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bankName">
              <el-input v-model="form.bankName" placeholder="请输入开户银行（如:'工商银行'）"></el-input>
            </el-form-item>
            <el-form-item label="开户支行" prop="bankOutlet">
              <el-input v-model="form.bankOutlet" class="form_input" placeholder="请输入开户支行名称（如:'福州华林支行'）"></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="accountNumber">
              <el-input v-model="form.accountNumber" class="form_input" placeholder="请输入银行账号并仔细核对"></el-input>
            </el-form-item>
          </div>
        </el-card>
        <br>
        <br>
      </el-form>
    </div>
    <div v-show="active==3">
      <el-form :rules="rules" ref="form3" :model="form" label-width="150px">
        <!--<el-form :model="form" label-width="150px">-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="box-card-header">组织机构信息</div>
          </div>
          <div class="text item">
            <div class="info">
              <p>组织机构代码信息</p>
            </div>
            <el-form-item label="组织机构代码" prop="organizationCode">
              <el-input v-model="form.organizationCode" class="form_input"></el-input>
            </el-form-item>
            <el-form-item label="组织机构有效期" required>

              <el-date-picker
                v-model="form.startOrganizationTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              至
              <el-date-picker
                v-model="form.endOrganizationTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>

            </el-form-item>
            <el-form-item label="组织机构代码证照片" prop="organizationPhotoId">
              <!--组织机构文件上传-->
              <el-upload
                class="logo-uploader"
                :action="url"
                :data="filesData"
                name="files"
                :show-file-list="false"
                :on-success="organizationimage"
                :on-error="handleImageFailed"
                :before-upload="beforeLogoUpload"
                :headers="headers">
                <img v-if="organizationPhotoIdUrl" :src="organizationPhotoIdUrl" class="logo">
                <i v-else class="el-icon-plus logo-uploader-icon"></i>
              </el-upload>
              <!--组织机构文件上传-->
            </el-form-item>
          </div>
        </el-card>
        <br>
        <br>
      </el-form>
    </div>
    <div align="center">
      <el-button type="info" v-if="active==1 || active==2 || active==3 || active==4" @click="prev">上一步</el-button>
      <el-button type="primary" v-if="active==0 || active==1 || active==2 || active==3" @click="next()">下一步</el-button>
      <el-button type="danger" v-if="active==4" @click="addMchInfo">提&nbsp&nbsp交</el-button>
    </div>
    <!--</el-form>-->
  </div>
</template>

<script>
  import getCateGory from '@/modules/pay/api/business_category'
  import {detail, addMchInfo} from '@/modules/merchant/agent/api/merchantInfo'
  import {returnThumbnailUrl, uploadUrl} from '@/modules/file/api/upload' //图片操作API
  export default {
    data() {
      /**
       * 手机号校验
       */
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      };
      /**
       * 售卖场景校验
       */
      let sellCheck = (rule, value, callback) => {
        if (value.length == 0) {
          return callback(new Error('请至少选择一个'))
        } else {
          callback()
        }
      };
      return {
        loading: true,
        active: 0,
        options: [],//营业选项
        mName: '****',
        form: {
          id: '',  //进件id
          contact: '',
          phone: '',
          email: '',
          shortName: '',// 商户简称
          merchantName: '', // 商户名称
          category: [],
          sellCheck: ['1'],
          address: '',
          miniProgramName: '',
          companyWeb: '',
          appStatus: 1,
          cusServiceTel: '',

          registerAddress: '', // 注册地址
          license: '',//营业执照
          startBusinessTime: '',//营业执照有效期 start
          endBusinessTime: '',//营业执照有效期 end

          representativeType: '',//证件持有人类型
          representativeName: '',//证件持有人姓名

          certificate: '',//证件类型
          startCertificateTime: '', //开始证件期限
          endCertificateTime: '', //开始证件期限
          certificateNum: '',//证件号码

          organizationCode: '',//组织机构代码
          startOrganizationTime: '', //开始组织机构期限
          endOrganizationTime: '', //结束组织机构期限

          businessScope: '', // 经营范围

          accountType: '', // 账户类型
          accountHolder: '', // 户主
          bankOutlet: '', // 开户支行
          bankName: '', // 银行名字
          bankCity: '', // 账户类型
          accountNumber: '', // 账户类型

          //---------图片
          miniProgramPhotoId: '', //微信小程序图片ID
          appPhotoId: '', //app图片ID
          specialQualificationPhotoId: '',//特殊资质文件图片ID
          supplementPhotoId: '',//补充文件
          businessLicensePhotoId: '',//营业执照
          organizationPhotoId: '',//组织机构代码
          epresentativePhotoId: '',//法人证件照
        },
        rules: {
          contact: [
            {required: true, message: '联系人姓名不能为空', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '常用邮箱不能为空', trigger: 'blur'},
          ],
          merchantShortName: [
            {required: true, message: '商户简称不能为空', trigger: 'blur'},
          ],
          category: [
            {required: true, message: '经营类目必须选择', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '门店地址不能为空', trigger: 'blur'},
          ],
          miniProgramName: [
            {required: true, message: '公众号/小程序名称不能为空', trigger: 'blur'},
          ],
          miniProgramPhotoId: [
            {required: true, message: '必须上传公众号/小程序主要界面截图', trigger: 'blur'},
          ],
          companyWeb: [
            {required: true, message: '公司网址不能为空', trigger: 'blur'},
          ],
          appStatus: [
            {required: true, message: 'APP上线状态必须选择', trigger: 'blur'},
          ],
          appPhotoId: [
            {required: true, message: '必须上传APP页面截图', trigger: 'blur'},
          ],
          cusServiceTel: [
            {required: true, message: '公司客服联系电话不能为空', trigger: 'blur'},
          ],
          sellCheck: [
            {required: true, message: '至少选择一个', trigger: 'blur'},
            {validator: sellCheck, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          merchantName: [
            {required: true, message: '商户名称不能为空', trigger: 'blur'},
          ],
          registerAddress: [
            {required: true, message: '注册地址不能为空', trigger: 'blur'},
          ],
          license: [
            {required: true, message: '营业执照注册号不能为空', trigger: 'blur'},
          ],
          businessScope: [
            {required: true, message: '经营范围不能为空', trigger: 'blur'},
          ],
          businessTerm: [
            {required: true, message: '营业期限不能为空', trigger: 'blur'},
          ],
          businessLicensePhotoId: [
            {required: true, message: '营业执照图片不能为空', trigger: 'blur'},
          ],
          organizationCode: [
            {required: true, message: '组织机构代码不能为空', trigger: 'blur'},
          ],
          representativeType: [
            {required: true, message: '证件类型不能为空', trigger: 'blur'},
          ],
          representativeName: [
            {required: true, message: '证件持有人姓名不能为空', trigger: 'blur'},
          ],
          certificate: [
            {required: true, message: '证件类型不能为空', trigger: 'blur'},
          ],
          certificateNum: [
            {required: true, message: '证件号码不能为空', trigger: 'blur'},
          ],
          organizationPhotoId: [
            {required: true, message: '组织机构代码证照不能为空', trigger: 'blur'},
          ],
          accountType: [
            {required: true, message: '账户类型不能为空', trigger: 'blur'},
          ],
          accountHolder: [
            {required: true, message: '账户持有人不能为空', trigger: 'blur'},
          ],
          bankOutlet: [
            {required: true, message: '开户支行不能为空', trigger: 'blur'},
          ],
          bankName: [
            {required: true, message: '银行名不能为空', trigger: 'blur'},
          ],
          bankCity: [
            {required: true, message: '开户城市不能为空', trigger: 'blur'},
          ],
          accountNumber: [
            {required: true, message: '账户号码不能为空', trigger: 'blur'},
          ],

        }, //校验触发
        //售卖场景------------------
        sellScene_offline: false,
        sellScene_wxapp: false,
        sellScene_website: false,
        sellScene_app: false,
        //售卖场景------------------

        //图片上传-------------------
        filesData: {
          module: 'image'
        },
        url: uploadUrl + '/user',
        headers: {
          authorized: sessionStorage.token
        },
        //图片上传-------------------
        //场景图片返回链接区
        miniProgramPhotoIdUrl: '', //微信小程序截图
        appPhotoIdUrl: '',//app页面截图
        specialQualificationPhotoIdUrl: '',//特殊资质文件
        supplementPhotoIdUrl: '',//补充文件
        businessLicensePhotoIdUrl: '',//营业执照
        organizationPhotoIdUrl: '',//组织机构代码
        representativeImgUrl: '',//法人机构代码
        //场景图片返回链接区
      }
    },
    mounted() {
      this.options = getCateGory;
      this.form.id = this.$route.query.id;  //接收ID
      this.mName = this.$route.query.n;  //接收ID
      this.getDetail(this.form.id)
      //获取本运营商详情
    },

    watch: {
      //售卖商品场景判断
      'form.sellCheck': {
        handler: function (nv, ov) {
          // if (nv.length < 1) {
          //   this.$message({
          //     message: '请至少选择一个售卖场景。',
          //     type: 'warning'
          //   })
          //   this.form.sellCheck = ov
          // }
          let select = this.form.sellCheck;
          let offlice = false;
          let wxapp = false;
          let website = false;
          let app = false;
          //判断是否有选中某个属性
          for (let i in select) {
            if (select[i] == '1') {
              offlice = true
            }
            if (select[i] == '2') {
              wxapp = true
            }
            if (select[i] == '3') {
              website = true
            }
            if (select[i] == '4') {
              app = true
            }
          }
          this.sellScene_offline = offlice;
          this.sellScene_wxapp = wxapp;
          this.sellScene_website = website;
          this.sellScene_app = app
        },
        deep: true
      },

    },
    methods: {
      getDetail: function (id) {
        if (id != '') {
          detail(id).then(res => {
            console.warn('详情页回显已有信息');
            console.log(res.obj);
            let data = res.obj;
            this.form.contact = data.contact;
            this.form.phone = data.phone;
            this.form.email = data.email;
            this.form.shortName = data.shortName;// 商户简称
            this.form.merchantName = data.merchantName; // 商户名称
            this.form.category = [data.businessLevOne, data.businessLevTwo, data.businessLevThree];
            this.form.address = data.address;
            this.form.miniProgramName = data.miniProgramName;
            this.form.companyWeb = data.companyWeb;
            this.form.appStatus = data.appStatus;
            this.form.cusServiceTel = data.cusServiceTel;
            this.form.registerAddress = data.registerAddress; // 注册地址
            this.form.license = data.license;
            this.form.representativeType = data.representativeType;//证件持有人类型
            this.form.representativeName = data.representativeName;//证件持有人姓名
            this.form.certificate = data.certificate;//证件类型

            this.form.startCertificateTime = this.format(data.startCertificateTime); //证件有效期
            this.form.endCertificateTime = this.format(data.endCertificateTime); //证件有效期

            this.form.certificateNum = data.certificateNum;//证件号码
            this.form.organizationCode = data.organizationCode;//组织机构代码

            this.form.startOrganizationTime = this.format(data.startOrganizationTime);//组织机构代码有效期
            this.form.endOrganizationTime = this.format(data.endOrganizationTime);//组织机构代码有效期

            this.form.businessScope = data.businessScope; // 经营范围

            this.form.startBusinessTime = this.format(data.startBusinessTime); // 营业期限
            this.form.endBusinessTime = this.format(data.endBusinessTime); // 营业期限

            this.form.accountType = data.accountType; // 账户类型
            this.form.accountHolder = data.accountHolder; // 户主
            this.form.bankOutlet = data.bankOutlet; // 开户支行
            this.form.bankName = data.bankName; // 银行名字
            this.form.bankCity = data.bankCity;// 账户类型
            this.form.accountNumber = data.accountNumber; // 账户类型

            if (data.miniProgramPhotoId == '' || data.miniProgramPhotoId == null) {
              this.miniProgramPhotoIdUrl = '';
              this.form.miniProgramPhotoId = ''
            } else {
              this.form.miniProgramPhotoId = data.miniProgramPhotoId; //微信小程序图片ID
              this.miniProgramPhotoIdUrl = returnThumbnailUrl(data.miniProgramPhotoId)
            }

            if (data.appPhotoId == '' || data.appPhotoId == null) {
              this.form.appPhotoId = '';
              this.appPhotoIdUrl = ''
            } else {
              this.form.appPhotoId = data.appPhotoId;
              this.appPhotoIdUrl = returnThumbnailUrl(data.appPhotoId)
            }

            if (data.specialQualificationPhotoId == '' || data.specialQualificationPhotoId == null) {
              this.form.specialQualificationPhotoId = '';
              this.specialQualificationPhotoIdUrl = ''
            } else {
              this.form.specialQualificationPhotoId = data.specialQualificationPhotoId;//特殊资质文件图片ID
              this.specialQualificationPhotoIdUrl = returnThumbnailUrl(data.specialQualificationPhotoId)
            }

            if (data.supplementPhotoId == '' || data.supplementPhotoId == null) {
              this.form.supplementPhotoId = '';
              this.supplementPhotoIdUrl = ''
            } else {
              this.form.supplementPhotoId = data.supplementPhotoId;//补充文件
              this.supplementPhotoIdUrl = returnThumbnailUrl(data.supplementPhotoId)
            }

            if (data.businessLicensePhotoId == '' || data.businessLicensePhotoId == null) {
              this.form.businessLicensePhotoId = '';
              this.businessLicensePhotoIdUrl = ''
            } else {
              this.form.businessLicensePhotoId = data.businessLicensePhotoId;//营业执照
              this.businessLicensePhotoIdUrl = returnThumbnailUrl(data.businessLicensePhotoId)
            }

            if (data.organizationCode == '' || data.organizationCode == null) {
              this.form.organizationPhotoId = '';
              this.organizationPhotoIdUrl = ''
            } else {
              this.form.organizationPhotoId = data.organizationCode;//组织机构代码
              this.organizationPhotoIdUrl = returnThumbnailUrl(data.organizationCode)
            }

            if (data.epresentativePhotoId == '' || data.epresentativePhotoId == null) {
              this.form.epresentativePhotoId = '';
              this.representativeImgUrl = ''
            } else {
              this.form.epresentativePhotoId = data.epresentativePhotoId;//法人证件照
              this.representativeImgUrl = returnThumbnailUrl(data.epresentativePhotoId)
            }

            //销售场景
            if (data.sellCheck == '[]' || data.sellCheck == null) {
              console.log('sellcheck is null');
              this.$set(this.form, 'sellCheck', [])
            } else {
              console.log('sellcheck not null');
              this.$set(this.form, 'sellCheck', JSON.parse(data.sellCheck))
            }
            this.loading = false //解除加载遮罩
          }).catch(e => {
            console.log(e);
            this.$message.error('进件资料获取失败，请退出重试')
          })
        }

      },
      // 上一步
      prev() {
        --this.active;
        if (this.active < 0) {
          this.active = 0
        }
      },
      // 下一步
      next() {

        if (this.active == 0) {

          this.$refs['form0'].validate((valid, obj) => {
            console.log(valid);
            if (valid) {
              this.active = 1
            } else {
              return false
            }
          })
        } else if (this.active == 1) {

          this.$refs['form1'].validate((valid, obj) => {
            console.log(valid);
            if (valid) {
              this.active = 2
            } else {
              return false
            }
          })
        } else if (this.active == 2) {

          this.$refs['form2'].validate((valid, obj) => {
            console.log(valid);
            if (valid) {
              this.active = 3
            } else {
              return false
            }
          })
        } else if (this.active == 3) {

          this.$refs['form3'].validate((valid, obj) => {
            console.log(valid);
            if (valid) {
              this.active = 4
            } else {
              return false
            }
          })
        }

      },

      addMchInfo: function () {
        this.loading = true;
        this.btnLoading = true;
        console.warn('原始表单');
        console.log(this.form);
        let originalFormCopy = this.deepCopy(this.form);
        let modifyForm = {}; //最后对象容器

        modifyForm.sellCheck = JSON.stringify(originalFormCopy.sellCheck);
        modifyForm.businessLevOne = originalFormCopy.category[0] || '';
        modifyForm.businessLevTwo = originalFormCopy.category[1] || '';
        modifyForm.businessLevThree = originalFormCopy.category[2] || '';
        modifyForm.id = originalFormCopy.id;

        modifyForm.contact = originalFormCopy.contact;
        modifyForm.phone = originalFormCopy.phone;
        modifyForm.email = originalFormCopy.email;
        modifyForm.shortName = originalFormCopy.shortName;
        modifyForm.merchantName = originalFormCopy.merchantName;
        modifyForm.address = originalFormCopy.address;
        modifyForm.miniProgramName = originalFormCopy.miniProgramName;
        modifyForm.companyWeb = originalFormCopy.companyWeb;
        modifyForm.appStatus = originalFormCopy.appStatus;
        modifyForm.cusServiceTel = originalFormCopy.cusServiceTel;
        modifyForm.registerAddress = originalFormCopy.registerAddress;
        modifyForm.license = originalFormCopy.license;
        modifyForm.startBusinessTime = originalFormCopy.startBusinessTime;
        modifyForm.endBusinessTime = originalFormCopy.endBusinessTime;

        modifyForm.representativeType = originalFormCopy.representativeType;
        modifyForm.representativeName = originalFormCopy.representativeName;

        modifyForm.certificate = originalFormCopy.certificate;
        modifyForm.startCertificateTime = originalFormCopy.startCertificateTime;
        modifyForm.endCertificateTime = originalFormCopy.endCertificateTime;
        modifyForm.certificateNum = originalFormCopy.certificateNum;

        modifyForm.organizationCode = originalFormCopy.organizationCode;
        modifyForm.startOrganizationTime = originalFormCopy.startOrganizationTime;
        modifyForm.endOrganizationTime = originalFormCopy.endOrganizationTime;

        modifyForm.businessScope = originalFormCopy.businessScope;

        modifyForm.accountType = originalFormCopy.accountType;
        modifyForm.accountHolder = originalFormCopy.accountHolder;
        modifyForm.bankOutlet = originalFormCopy.bankOutlet;
        modifyForm.bankName = originalFormCopy.bankName;
        modifyForm.bankCity = originalFormCopy.bankCity;
        modifyForm.accountNumber = originalFormCopy.accountNumber;

        modifyForm.miniProgramPhotoId = originalFormCopy.miniProgramPhotoId;
        modifyForm.appPhotoId = originalFormCopy.appPhotoId;
        modifyForm.specialQualificationPhotoId = originalFormCopy.specialQualificationPhotoId;
        modifyForm.supplementPhotoId = originalFormCopy.supplementPhotoId;
        modifyForm.businessLicensePhotoId = originalFormCopy.businessLicensePhotoId;
        modifyForm.organizationPhotoId = originalFormCopy.organizationPhotoId;
        modifyForm.epresentativePhotoId = originalFormCopy.epresentativePhotoId;

        console.log(modifyForm);
        this.dataOptimization(modifyForm)
      },
      //数据过滤优化器
      dataOptimization: function (data) {

        addMchInfo(data).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.btnLoading = false;
          this.rooterDeatil(this.form.id);
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
        })
      },

      /**
       * 深拷贝
       */
      deepCopy: function (obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              result[key] = this.deepCopy(obj[key])   //递归复制
            } else {
              result[key] = obj[key]
            }
          }
        }
        return result
      },

      /**
       * 文件上传
       */
      /*
      * 微信小程序上传成功
      * */
      sendWxAppimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '微信小程序上传成功！',
          type: 'success'
        });
        console.log(returnThumbnailUrl(response.obj));
        this.form.miniProgramPhotoId = response.obj;
        this.miniProgramPhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
      * APP页面上传成功
      * */
      sendAppimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: 'APP截图上传成功！',
          type: 'success'
        });
        this.form.appPhotoId = response.obj;
        this.appPhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
      *特殊资质文件上传成功
      */
      sendSpecialQualificationimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '特殊资质图片上传成功！',
          type: 'success'
        });
        this.form.specialQualificationPhotoId = response.obj;
        this.specialQualificationPhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
     *补充文件上传成功
     */
      supplementimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '补充文件图片上传成功！',
          type: 'success'
        });
        this.form.supplementPhotoId = response.obj;
        this.supplementPhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
    *营业执照上传成功
    */
      businessLicenseimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '*营业执照图片上传成功！',
          type: 'success'
        });
        this.form.businessLicensePhotoId = response.obj;
        this.businessLicensePhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
    *组织机构代码上传成功
    */
      organizationimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '组织机构代码图片上传成功！',
          type: 'success'
        });
        this.form.organizationPhotoId = response.obj;
        this.organizationPhotoIdUrl = returnThumbnailUrl(response.obj)
      },
      /*
   *法人证件照片
   */
      representativeimage(response, file) {
        //保存图片ID
        console.log(response);
        this.$message({
          message: '组织机构代码图片上传成功！',
          type: 'success'
        });
        this.form.epresentativePhotoId = response.obj;
        this.representativeImgUrl = returnThumbnailUrl(response.obj)
      },

      /*
    * 上传失败
    * */
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
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        return true
      },
      getPicUrl(picid) {
        //console.log(returnThumbnailUrl(picid))
        return returnThumbnailUrl(picid)
      },
      //返回详情页
      goback() {
        this.$router.go('-1')
      },

      //跳转详情页
      rooterDeatil(data) {
        //console.log(data)
        //query发送ID到详情
        let id = data;
        this.$router.push({path: '/pay/views/detail', query: {id: id}})
      },

      /**
       * 工具
       * @param ts 时间戳
       * @returns {string} 格式化事时间
       */
      //时间格式化
      format(ts) {
        let time = new Date(ts);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0(m) {
        return m < 10 ? '0' + m : m
      },

    }
  }
</script>

<style scoped>
  .box-card-header {
    margin: -18px -20px;
    padding: 10px 20px;
    background: #F4F5F9;
  }

  .form_input {
    width: 350px;
  }

  .info {
    padding: 0px 16px;
    border-left: 5px solid #6c6fbf;
    margin: 20px 0;
  }

  .line {
    width: 350px;
    height: 1px;
    background-color: #D3E2FF;
    box-shadow: 0 1px 5px 0px #d3e2ff;
    margin-top: 8px;
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

  .title-header {
    margin-bottom: 10px;
  }

  .name_title {
    font-size: 24px;
    margin: 0 0 10px 0;
  }

  .name_back {
    cursor: pointer;
    float: right;
    font-size: 14px;
    color: #409eff;
  }
</style>
