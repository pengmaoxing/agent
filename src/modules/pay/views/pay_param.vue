<template>
  <div class="app-container" v-loading="loading">
    <!--功能-->
    <div class="action-container">
      <!--商户名-->
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="商户名" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.contact" @keyup.enter.native="search" placeholder="联系人" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="openTopConfigDialog">{{topName}}支付参数</el-button>
    </div>

    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        label="商户名">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.name" placement="top">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="商户账号">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.phone" placement="top">
            <span>{{ scope.row.phone }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="联系人">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.contact" placement="top">
            <span>{{ scope.row.contact }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="260"
        label="操作">

        <template slot-scope="scope">
          <!--//如果有方法，传入参数“scope.row”-->
          <!--//如果需要索引，传入参数“scope.$index”-->
          <!--//如果需要当前整页表格数据，传入参数“tableData”-->
          <el-button type="text" @click="openConfigDialog(scope.row)">支付配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页-->
    <pagination
      :total-elements="totalElements"
      :change-callback="getMerchantList"
      ref="page"></pagination>
     <el-dialog
    :close-on-click-modal="false"
      :title="`${topName}支付参数配置`"
      :visible.sync="topPayDialog"
      :before-close="closeTopPayDialog">
      <el-form :model="topParam" label-width="130px">
        <el-form-item label="支付通道">
          <el-radio-group v-model="topParam.payChannel">
            <el-radio label="1">微信官方</el-radio>
            <el-radio label="2">支付宝官方</el-radio>
            <el-radio label="3">富友</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--微信配置-->
        <div v-show="topParam.payChannel==1">
          <el-form-item label="appId">
            <el-input v-model="topParam.wx.wxAppId" :disabled="payDisable" placeholder="公众账号ID"></el-input>
          </el-form-item>
          <el-form-item label="mchId">
            <el-input v-model="topParam.wx.wxMchId" :disabled="payDisable" placeholder="服务商商户号"></el-input>
          </el-form-item>
          <el-form-item label="appKey">
            <el-input v-model="topParam.wx.wxAppKey" :disabled="payDisable" placeholder="API密钥"></el-input>
          </el-form-item>
          <el-form-item label="appSecret">
            <el-input v-model="topParam.wx.wxAppSecret" :disabled="payDisable" placeholder="公众号应用密钥"></el-input>
          </el-form-item>
          <el-form-item label="证书路径">
            <el-input v-model="topParam.wx.wxCertPath" :disabled="payDisable" placeholder="证书"></el-input>
          </el-form-item>
          <el-form-item label="证书" :disabled="payDisable">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadUrl"
              :data="fileData"
              :on-success="handleSuccess"
              :show-file-list="false"
            >
              <el-button size="small" type="primary" :disabled="payDisable">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <!--支付宝配置-->
        <div v-show="topParam.payChannel==2">
          <el-form-item label="appId">
            <el-input v-model="topParam.ali.aliAppId" :disabled="payDisable" placeholder="应用ID"></el-input>
          </el-form-item>
          <el-form-item label="privateKey">
            <el-input type="text" v-model="topParam.ali.aliPrivateKey" :disabled="payDisable"
                      placeholder="应用私钥"></el-input>
          </el-form-item>
          <el-form-item label="publicKey">
            <el-input type="text" v-model="topParam.ali.aliPublicKey" :disabled="payDisable"
                      placeholder="支付宝公钥"></el-input>
          </el-form-item>
        </div>
        <!--富友配置-->
        <div v-show="topParam.payChannel==3">
          <el-form-item label="机构号">
            <el-input v-model="topFuiouParam.insCd" :disabled="payDisable" placeholder="机构号"></el-input>
          </el-form-item>
          <el-form-item label="商户私钥">
            <el-input type="text" v-model="topFuiouParam.insPrivateKey" :disabled="payDisable"
                      placeholder="商户私钥"></el-input>
          </el-form-item>
          <el-form-item label="商户公钥">
            <el-input type="text" v-model="topFuiouParam.insPublicKey" :disabled="payDisable"
                      placeholder="商户公钥"></el-input>
          </el-form-item>
          <el-form-item label="富友公钥">
            <el-input type="text" v-model="topFuiouParam.fyPublicKey" :disabled="payDisable"
                      placeholder="富友公钥"></el-input>
          </el-form-item>
          <el-form-item label="订单前缀">
            <el-input type="text" v-model="topFuiouParam.prefixOrderNumber" :disabled="payDisable"
                      placeholder="订单前缀"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTopPayDialog">取 消</el-button>
        <el-button type="warning" @click="canConfig">配 置</el-button>
        <el-button type="primary" @click="saveTopPayConfig" v-loading="btnLoading" :disabled="payDisable">提 交
        </el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="商户支付参数配置"
      :visible.sync="payDialog"
      :before-close="closePayDialog">
      <el-form :model="payParam" label-width="80px">
        <el-form-item label="支付方式">
          <el-radio-group v-model="payParam.payWay">
            <el-radio label="1">微信</el-radio>
            <el-radio label="2">支付宝</el-radio>
            <el-radio label="5">惠闪付</el-radio>
            <el-radio label="3">会员宝</el-radio>
            <el-radio label="4">易融码</el-radio>
            <el-radio label="7">微信买单</el-radio>
            <el-radio label="8">传化支付</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--微信配置-->
        <div v-show="payParam.payWay==1">
          <el-form-item label="利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.wx.interestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="微信给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="子商户号">
            <el-input v-model="payParam.wx.subMchId" :disabled="payDisable" placeholder="子商户号"></el-input>
          </el-form-item>
        </div>
        <!--支付宝配置-->
        <div v-show="payParam.payWay==2">
          <el-form-item label="利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.ali.interestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="支付宝给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="授权token">
            <el-input v-model="payParam.ali.appAuthToken" :disabled="payDisable" placeholder="商户授权令牌"></el-input>
          </el-form-item>
          <el-form-item label="支付宝预授权利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.ali.prePayInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="支付宝给商户的利率，比如填写0.6%，则每笔交易收取商户0.6%手续费" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="sellerId">
            <el-input v-model="payParam.ali.sellerId" :disabled="payDisable" placeholder="支付宝后台对应的商户id"></el-input>
          </el-form-item>
        </div>
        <!--=会员宝配置-->
        <div v-show="payParam.payWay==3">
          <el-form-item label="微信利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.hyb.wxInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="会员宝微信通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="支付宝利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.hyb.aliInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="会员宝支付宝通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="appId">
            <el-input v-model="payParam.hyb.appId" :disabled="payDisable" placeholder="应用ID"></el-input>
          </el-form-item>
          <el-form-item label="appKey">
            <el-input v-model="payParam.hyb.appKey" :disabled="payDisable" placeholder="密钥"></el-input>
          </el-form-item>
        </div>
        <!--=易融码配置-->
        <div v-show="payParam.payWay==4">
          <el-form-item label="微信利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.yrm.wxInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="易融码微信通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="支付宝利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.yrm.aliInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="易融码支付宝通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="mid">
            <el-input v-model="payParam.yrm.mid" :disabled="payDisable" placeholder="商户号"></el-input>
          </el-form-item>
          <el-form-item label="key">
            <el-input v-model="payParam.yrm.appKey" :disabled="payDisable" placeholder="密钥"></el-input>
          </el-form-item>
        </div>
        <!--=惠闪付配置-->
        <div v-show="payParam.payWay==5">
          <el-form-item label="微信利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.hsf.wxInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="惠闪付微信通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="支付宝利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.hsf.aliInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="惠闪付支付宝通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="shopId">
            <el-input v-model="payParam.hsf.shopId" placeholder="商户号" :disabled="payDisable"></el-input>
          </el-form-item>
          <el-form-item label="appKey">
            <el-input v-model="payParam.hsf.appKey" placeholder="签名密钥" :disabled="payDisable"></el-input>
          </el-form-item>
        </div>

        <div v-show="payParam.payWay==7">
          <el-form-item label="微信利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.wxmd.wxInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="微信买单微信通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="支付宝利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.wxmd.aliInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="微信买单支付宝通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="shopId">
            <el-input v-model="payParam.wxmd.shopId" placeholder="商户号" :disabled="payDisable"></el-input>
          </el-form-item>
          <el-form-item label="appKey">
            <el-input v-model="payParam.wxmd.appKey" placeholder="签名密钥" :disabled="payDisable"></el-input>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="payParam.wxmd.appid" placeholder="公众号" :disabled="payDisable"></el-input>
          </el-form-item>
        </div>

        <div v-show="payParam.payWay==8">
          <el-form-item label="微信利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.xls.wxInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="传化微信通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="支付宝利率:">
            <el-input-number :disabled="payDisable" :precision="2" :min="0" :max="100" :step="0.1"
                             v-model="payParam.xls.aliInterestRate">
            </el-input-number>
            %
            <el-tooltip class="item" effect="dark" content="传化支付宝通道给商户的利率，比如填写0.2%，则每笔交易收取商户0.2%手续费"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="subMchId">
            <el-input v-model="payParam.xls.subMchId" placeholder="商户号" :disabled="payDisable"></el-input>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="payParam.xls.appid" placeholder="公众号" :disabled="payDisable"></el-input>
          </el-form-item>
        </div>
        <!--=秒到配置-->
        <!-- <div v-show="payParam.payWay==4">
          <el-form-item label="微信利率">
            <el-input v-model="payParam.yrm.wxInterestRate" type="number" placeholder="例如：0.2"></el-input>
          </el-form-item>
          <el-form-item label="支付宝利率">
            <el-input v-model="payParam.yrm.aliInterestRate" type="number" placeholder="例如：0.2"></el-input>
          </el-form-item>
          <el-form-item label="mid">
            <el-input v-model="payParam.yrm.mid"></el-input>
          </el-form-item>
          <el-form-item label="key">
            <el-input v-model="payParam.yrm.appKey"></el-input>
          </el-form-item>
        </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePayDialog">取 消</el-button>
        <el-button type="warning" @click="canConfig">配置</el-button>
        <el-button type="primary" @click="savePayConfig" v-loading="btnLoading" :disabled="payDisable">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getMerchantList} from '@/modules/merchant/top/api/merchant'
  import pagination from '@/components/pagination/index'
  import {url} from '@/utils/request'
  import {findTopPayConfig, saveTopPayConfig, findPayConfig, savePayConfig} from '@/modules/pay/api/pay_config'
  import {fileUpload} from '@/modules/file/api/upload'

  export default {
    name: 'merchant',
    components: {pagination},
    data () {
      return {
        formLabelWidth: '130px',
        btnLoading: false,
        loading: true,
        tableData: [], // 表格数据
        totalElements: 0,
        searchForm: {
          name: '', //公司名
          contact: '',//联系人，
        },
        // 服务商支付参数
        topPayDialog: false,
        topParam: {
          payChannel: '1',
          id: '',
          wx: {
            // 微信服务商参数
            wxAppId: '', // 公众号
            wxAppKey: '',// API密钥
            wxAppSecret: '',// 支付密钥
            wxMchId: '',// 商户id
            wxCertPath: '',// 证书路径
          },
          ali: {
            // 支付宝服务商支付参数
            aliAppId: '',// 第三方应用ID
            aliPrivateKey: '',// 应用私钥
            aliPublicKey: '',// 支付宝平台公钥
          },

        },
        topFuiouParam: {
          id: '',
          // 富友服务商支付参数
          insCd: '', // 富友机构号
          insPrivateKey: '', // 商户私钥
          insPublicKey: '', // 商户公钥
          fyPublicKey: '',// 富友公钥
          prefixOrderNumber: '', // 订单号前缀
        },
        // 支付参数
        payDialog: false,
        payDisable: true,
        payParam: {
          payWay: '1',
          ali: {
            interestRate: '',
            id: '',
            appAuthToken: '',
            prePayInterestRate: '',
            sellerId: '',
          },
          wx: {
            interestRate: '',
            id: '',
            subMchId: '',
          },
          hyb: {
            wxInterestRate: '',
            aliInterestRate: '',
            id: '',
            appId: '',
            appKey: '',
          },
          yrm: {
            wxInterestRate: '',
            aliInterestRate: '',
            id: '',
            mid: '',
            appKey: '',
          },
          wxmd: {
            wxInterestRate: '',
            aliInterestRate: '',
            id: '',
            shopId: '',
            appKey: '',
            appid: '',
          },
          xls: {
            wxInterestRate: '',
            aliInterestRate: '',
            id: '',
            subMchId: '',
            appid: '',
          },
          hsf: {
            wxInterestRate: '',
            aliInterestRate: '',
            id: '',
            shopId: '',
            appKey: '',
          }
        },
        headers: {
          authorized: sessionStorage.token
        },
        uploadUrl: url + '/fms/upload/file_upload', // 上传接口
        fileData: {
          module: 'cert'
        },
        fileList: [],

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted () {
      this.getMerchantList()
    },
    methods: {
      /**
       * 获取商户列表
       * @param number
       * @param pageSize
       */
      getMerchantList: function (number, pageSize) {
        this.loading = true
        getMerchantList(number, pageSize, this.searchForm).then(res => {
          let data = res.obj
          this.tableData = data.content
          this.totalElements = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(e => {
          this.loading = false
        })
      },

      /**
       * 搜索与重置
       */
      search () {
        this.$refs.page.search()
      },
      reset () {
        //channel 设置为“本商户”
        this.searchForm = {
          name: '', //公司名
          contact: '',//联系人，
        }//搜索用的表单
        this.$refs.page.search()
      },
      // =====================服务商支付参数配置=====================
      openTopConfigDialog () {
        this.topPayDialog = true
        this.findTopPayConfig()
      },
      closeTopPayDialog () {
        this.topPayDialog = false
        this.payDisable = true
        let clear = this
        setTimeout(function () {
          clear.clearTopPayParam()
        }, 100)
      },
      clearTopPayParam () {
        this.topParam.wx.wxAppId = ''
        this.topParam.wx.wxMchId = ''
        this.topParam.wx.wxAppKey = ''
        this.topParam.wx.wxAppSecret = ''
        this.topParam.wx.wxCertPath = ''
        this.topParam.ali.aliAppId = ''
        this.topParam.ali.aliPrivateKey = ''
        this.topParam.ali.aliPublicKey = ''
        this.topFuiouParam.insCd = ''
        this.topFuiouParam.insPrivateKey = ''
        this.topFuiouParam.insPublicKey = ''
        this.topFuiouParam.fyPublicKey = ''
        this.topFuiouParam.prefixOrderNumber = ''
      },
      // 获取服务商支付参数
      findTopPayConfig () {
        findTopPayConfig().then(response => {
          let data = response.obj
          let topConfig = data.topConfig
          let topFuiouConfig = data.topFuiouConfig
          this.topParam.id = topConfig.id
          this.topParam.wx.wxAppId = topConfig.wxAppId
          this.topParam.wx.wxMchId = topConfig.wxMchId
          this.topParam.wx.wxAppKey = topConfig.wxAppKey
          this.topParam.wx.wxAppSecret = topConfig.wxAppSecret
          this.topParam.wx.wxCertPath = topConfig.wxCertPath
          this.topParam.ali.aliAppId = topConfig.aliAppId
          this.topParam.ali.aliPrivateKey = topConfig.aliPrivateKey
          this.topParam.ali.aliPublicKey = topConfig.aliPublicKey

          this.topFuiouParam.id = topFuiouConfig.id
          this.topFuiouParam.insCd = topFuiouConfig.insCd
          this.topFuiouParam.insPrivateKey = topFuiouConfig.insPrivateKey
          this.topFuiouParam.insPublicKey = topFuiouConfig.insPublicKey
          this.topFuiouParam.fyPublicKey = topFuiouConfig.fyPublicKey
          this.topFuiouParam.prefixOrderNumber = topFuiouConfig.prefixOrderNumber
        }).catch(() => {
          this.loading = false
        })
      },
      // 保存服务商支付参数
      saveTopPayConfig () {
        // this.btnLoading = true //锁定按钮
        // this.payDisable = true
        let config = ''
        // 微信官方服务商配置
        if (this.topParam.payChannel == 1) {
          config = this.topParam.wx
          config.id = this.topParam.id
        }
        // 支付宝官方服务商配置
        if (this.topParam.payChannel == 2) {
          config = this.topParam.ali
          config.id = this.topParam.id
        }
        // 富友服务商配置
        if (this.topParam.payChannel == 3) {
          config = this.topFuiouParam
          config.id = this.topFuiouParam.id
        }
        saveTopPayConfig(JSON.stringify(config),this.topParam.payChannel).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.closeTopPayDialog()
        }).catch(() => {
          this.btnLoading = false
          this.loading = false
        })
      },

      // ====================商户支付参数配置========================
      canConfig () {
        this.payDisable = false
      },
      openConfigDialog (row) {
        this.payDialog = true
        this.merchantId = row.id
        this.findPayConfig(row.id)
      },
      closePayDialog () {
        this.payDialog = false
        this.payDisable = true
        let se = this
        setTimeout(function () {
          se.clearPayParam()
        }, 100)

      },
      clearPayParam () {
        this.payParam.ali.interestRate = ''
        this.payParam.ali.id = ''
        this.payParam.ali.appAuthToken = ''
        this.payParam.ali.prePayInterestRate = ''
        this.payParam.ali.sellerId = ''
        this.payParam.wx.interestRate = ''
        this.payParam.wx.id = ''
        this.payParam.wx.subMchId = ''
        this.payParam.hyb.wxInterestRate = ''
        this.payParam.hyb.aliInterestRate = ''
        this.payParam.hyb.id = ''
        this.payParam.hyb.appId = ''
        this.payParam.hyb.appKey = ''
        this.payParam.yrm.wxInterestRate = ''
        this.payParam.yrm.aliInterestRate = ''
        this.payParam.yrm.id = ''
        this.payParam.yrm.mid = ''
        this.payParam.yrm.appKey = ''
        this.payParam.hsf.wxInterestRate = ''
        this.payParam.hsf.aliInterestRate = ''
        this.payParam.hsf.id = ''
        this.payParam.hsf.shopId = ''
        this.payParam.hsf.appKey = ''
        this.payParam.wxmd.wxInterestRate = ''
        this.payParam.wxmd.aliInterestRate = ''
        this.payParam.wxmd.id = ''
        this.payParam.wxmd.shopId = ''
        this.payParam.wxmd.appKey = ''
        this.payParam.wxmd.appid = ''
        this.payParam.xls.wxInterestRate = ''
        this.payParam.xls.aliInterestRate = ''
        this.payParam.xls.id = ''
        this.payParam.xls.subMchId = ''
        this.payParam.xls.appid = ''
      },
      findPayConfig (merchantId) {
        findPayConfig(merchantId).then(response => {
          let data = response.obj
          console.log('data', data)
          // 微信
          let wxData = data.wx
          if (wxData) {
            this.payParam.wx.interestRate = wxData.interestRate * 100
            this.payParam.wx.id = wxData.id
            this.payParam.wx.subMchId = wxData.subMchId
          }
          // 支付宝
          let aliData = data.ali
          if (aliData) {
            this.payParam.ali.interestRate = aliData.interestRate * 100
            this.payParam.ali.id = aliData.id
            this.payParam.ali.appAuthToken = aliData.appAuthToken
            this.payParam.ali.prePayInterestRate = aliData.prePayInterestRate * 100
            this.payParam.ali.sellerId = aliData.sellerId
          }
          // 会员宝
          let hybData = data.hyb
          if (hybData) {
            this.payParam.hyb.wxInterestRate = hybData.wxInterestRate * 100
            this.payParam.hyb.aliInterestRate = hybData.aliInterestRate * 100
            this.payParam.hyb.id = hybData.id
            this.payParam.hyb.appId = hybData.appId
            this.payParam.hyb.appKey = hybData.appKey
          }
          // 易融码
          let yrmData = data.yrm
          if (yrmData) {
            this.payParam.yrm.wxInterestRate = yrmData.wxInterestRate * 100
            this.payParam.yrm.aliInterestRate = yrmData.aliInterestRate * 100
            this.payParam.yrm.id = yrmData.id
            this.payParam.yrm.mid = yrmData.mid
            this.payParam.yrm.appKey = yrmData.appKey
          }
          let wxmdData = data.wxmd
          if (wxmdData) {
            this.payParam.wxmd.wxInterestRate = wxmdData.wxInterestRate * 100
            this.payParam.wxmd.aliInterestRate = wxmdData.aliInterestRate * 100
            this.payParam.wxmd.id = wxmdData.id
            this.payParam.wxmd.shopId = wxmdData.shopId
            this.payParam.wxmd.appKey = wxmdData.appKey
          }

          let xlsData = data.xls
          if (xlsData) {
            this.payParam.xls.wxInterestRate = xlsData.wxInterestRate * 100
            this.payParam.xls.aliInterestRate = xlsData.aliInterestRate * 100
            this.payParam.xls.id = xlsData.id
            this.payParam.xls.shopId = xlsData.shopId
          }
          // 惠闪付
          let hsfData = data.hsf
          if (hsfData) {
            this.payParam.hsf.wxInterestRate = hsfData.wxInterestRate * 100
            this.payParam.hsf.aliInterestRate = hsfData.aliInterestRate * 100
            this.payParam.hsf.id = hsfData.id
            this.payParam.hsf.shopId = hsfData.shopId
            this.payParam.hsf.appKey = hsfData.appKey
          }

        }).catch(() => {
          this.loading = false
        })
      },
      // 保存支付参数
      savePayConfig () {
        this.btnLoading = true //锁定按钮
        this.payDisable = true
        let config = ''
        if (this.payParam.payWay == 1) {
          config = JSON.parse(JSON.stringify(this.payParam.wx))
          config.interestRate = config.interestRate
        }
        if (this.payParam.payWay == 2) {
          config = JSON.parse(JSON.stringify(this.payParam.ali))
          config.interestRate = this.payParam.ali.interestRate
          config.prePayInterestRate = this.payParam.ali.prePayInterestRate / 100
        }
        if (this.payParam.payWay == 3) {
          config = JSON.parse(JSON.stringify(this.payParam.hyb))
          config.wxInterestRate = this.payParam.hyb.wxInterestRate
          config.aliInterestRate = this.payParam.hyb.aliInterestRate
        }
        if (this.payParam.payWay == 4) {
          config = JSON.parse(JSON.stringify(this.payParam.yrm))
          config.wxInterestRate = this.payParam.yrm.wxInterestRate
          config.aliInterestRate = this.payParam.yrm.aliInterestRate
        }
        if (this.payParam.payWay == 5) {
          config = JSON.parse(JSON.stringify(this.payParam.hsf))
          config.wxInterestRate = this.payParam.hsf.wxInterestRate
          config.aliInterestRate = this.payParam.hsf.aliInterestRate
        }
        if (this.payParam.payWay == 7) {
          config = JSON.parse(JSON.stringify(this.payParam.wxmd))
          config.wxInterestRate = this.payParam.wxmd.wxInterestRate
          config.aliInterestRate = this.payParam.wxmd.aliInterestRate
        }
        if (this.payParam.payWay == 8) {
          config = JSON.parse(JSON.stringify(this.payParam.xls))
          config.wxInterestRate = this.payParam.xls.wxInterestRate
          config.aliInterestRate = this.payParam.xls.aliInterestRate
        }
        savePayConfig(JSON.stringify(config), this.merchantId, this.payParam.payWay).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.closePayDialog()
        }).catch(() => {
          this.btnLoading = false
          this.loading = false
        })
      },
      handleSuccess (response) {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.topParam.wx.wxCertPath = response.obj
      },

    }
  }
</script>

<style scoped>
  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }

</style>
