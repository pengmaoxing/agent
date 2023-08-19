<template>
  <div class="app-container" v-loading="loading">
    <!--功能-->
    <div class="action-container">
      <!--商户名-->
      <el-select v-if="username=='admin'"  v-model="searchForm.serviceProviderId" placeholder="请选择服务商"
                 size="small" class="formItem"
                 @change="getProv($event)">
        <el-option :value="n.id"
                   :key="index"
                   :label="n.name"
                   v-for="(n,index) in provider">
        </el-option>
      </el-select>
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="商户名" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.contact" @keyup.enter.native="search" placeholder="联系人" size="small"
                class="formItem"></el-input>
      <el-input v-model="searchForm.customerPhone" @keyup.enter.native="search" placeholder="商户编号" size="small"
                class="formItem"></el-input>
      <el-input v-model="searchForm.companyName" @keyup.enter.native="search" placeholder="代理商名称" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="openTopConfigDialog">{{topName}}支付参数</el-button>
      <el-button type="primary" size="small" @click="openTopAliDialog">支付宝小程序配置</el-button>
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
        label="商户名"
        width="180">
        <template slot-scope="scope">
          <el-tooltip effect="light" :content="scope.row.name" placement="top">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="商户账号">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="140"
        label="联系电话">
      </el-table-column>
      <el-table-column
        label="行业">
        <template slot-scope="scope">
          <span>{{ scope.row.businessLevOne|businessLevOneFil }}-{{ scope.row.businessLevTwo }}-{{ scope.row.businessLevThree }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="360"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="goChannel(scope.row)">支付通道</el-button>
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


      <div divName="选项" class="config-header">
        <el-radio-group v-model="topParam.payChannel"
                        @change="change_payChannel($event)">
          <el-radio v-for="(item,index) in getPayConfigOption"
                    :label="item.value"
                    :key="index">{{item.name}}
          </el-radio>
        </el-radio-group>
      </div>


      <el-form ref="dynamicForm" label-width="160px" label-suffix="："
               size="medium" :disabled="payDisable">

        <el-form-item v-for="(item,index) in dynamicForm"
                      :key="index"
                      :label="item.title">

          <!--如果是证书上传-->
          <div v-if="item.inputType==='file'">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadUrl"
              :data="fileData"
              :on-success="(response, file, fileList)=>fileUploadSuccess(response, file, fileList,item)"
              :show-file-list="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>

          <!--如果是普通输入框-->
          <div v-else>
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </div>

        </el-form-item>


      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTopPayDialog">取 消</el-button>
        <el-button type="warning" @click="canConfig">配 置</el-button>
        <el-button type="primary" @click="submitJsonConfigBefore" :disabled="payDisable" :loading="btnLoading">提 交
        </el-button>
      </div>
    </el-dialog>

    <!-- 服务商支付宝配置 -->
     <el-dialog
    :close-on-click-modal="false"
      :title="`${topName}支付宝小程序配`"
      :visible.sync="topAliDialog"
      :before-close="closeTopAliDialog"
    >
      <el-form ref="topAliForm" :model="topAliForm" :rules="topAliFormRules" label-width="160px" label-suffix="："
               size="medium">

        <el-form-item label="appId" prop="appId">
          <el-input v-model="topAliForm.appId" placeholder="appId"></el-input>
        </el-form-item>
        <el-form-item label="aesKey" prop="aesKey">
          <el-input v-model="topAliForm.aesKey" placeholder="aesKey"></el-input>
        </el-form-item>
        <el-form-item label="商户私钥" prop="privateKeyMerchant">
          <el-input v-model="topAliForm.privateKeyMerchant" placeholder="商户私钥"></el-input>
        </el-form-item>
        <el-form-item label="商户公钥" prop="publicKeyMerchant">
          <el-input v-model="topAliForm.publicKeyMerchant" placeholder="商户公钥"></el-input>
        </el-form-item>
        <el-form-item label="支付宝公钥" prop="publicKey">
          <el-input v-model="topAliForm.publicKey" placeholder="支付宝公钥"></el-input>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTopAliDialog">取 消</el-button>
        <el-button type="primary" @click="submitAliConfigBefore" :loading="btnLoading">提交
        </el-button>
      </div>


    </el-dialog>


  </div>
</template>

<script>
  import {
    getMerchantList,
    cancle,
    saveAppletConfig,
    resetPwd,
    getWxPublicDetail,
    saveWxPublicConfig,
    getYrmConfigDetail,
    saveYrmConfig,
    getHsfConfigDetail,
    saveHsfConfig,
    getHlbConfigDetail,
    saveHlbConfig, saveAliPayConfig, findAlidPayConfig,
    getProviderList
  } from '../api/merchant'

  import {getPayConfigByTop, getPayConfigAndValueByTop, savePayConfig} from '../api/merchant'

  import pagination from '@/components/pagination/index'
  import {url} from '@/utils/request'
  import {findTopPayConfig, saveTopPayConfig} from '@/modules/pay/api/pay_config'
  import {fileUpload} from '@/modules/file/api/upload'
  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: 'payConfigure',
    mixins: [mixins], //混入公用组件
    components: {pagination},
    data() {
      return {
        formLabelWidth: '130px',
        loading: true,
        tableData: [], // 表格数据
        totalElements: 0,
        username:sessionStorage.getItem('username'),
        searchForm: {
          name: '', //公司名
          contact: '',//联系人，
          customerPhone: '',//联系人，
          companyName: '',//联系人，
          serviceProviderId:""

        },

        // 服务商支付参数
        btnLoading: false,
        topPayDialog: false,
        payDisable: true,
        topParam: {
          payChannel: '1',
          id: '',
        },

        getPayConfigOption: [],

        dynamicForm: [], //当前通道动态表单

        //服务商支付宝配置
        topAliDialog: false,
        topAliForm: {
          appId: '',
          aesKey: '',
          privateKeyMerchant: '',
          publicKeyMerchant: '',
          publicKey: '',
        },
        topAliFormRules: {
          appId: [
            {required: true, message: '请填写appId', trigger: 'blur'}
          ],
          aesKey: [
            {required: true, message: '请填写aesKey', trigger: 'blur'}
          ],
          privateKeyMerchant: [
            {required: true, message: '请填写商户私钥', trigger: 'blur'}
          ],
          publicKeyMerchant: [
            {required: true, message: '请填写商户公钥', trigger: 'blur'}
          ],
          publicKey: [
            {required: true, message: '请填写支付宝公钥', trigger: 'blur'}
          ],
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
    filters: {
      businessLevOneFil: function (val) {
        if (val == 1) {
          return '企业商户'
        } else if (val == 2) {
          return '个体工商户'
        } else if (val == 3) {
          return '个人商户'
        } else {
          return val || ''
        }
      }
    },
    mounted() {
      this.getMerchantList();
      //获取支付商枚举
      this.getPayConfigByTop();
      if(this.username=='admin') {
        this.getProviderList();

      }
    },
    methods: {

      getProviderList:function(){
        getProviderList().then(res => {
          this.provider = res.obj.content;
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(e => {
          this.loading = false
        })
      },
      /**
       * 获取商户列表
       * @param number
       * @param pageSize
       */
      getMerchantList: function (number, pageSize) {
        this.loading = true;
        getMerchantList(number, pageSize, this.searchForm).then(res => {
          let data = res.obj;
          console.log(data);
          this.tableData = data.content;
          this.totalElements = data.totalElements;
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(e => {
          // this.loading = false
        })
      },

      /**
       * 跳转到支付通道页面
       */
      goChannel(data) {
        //console.log(data)
        //query发送ID到详情
        let id = data.id;
        this.$router.push({path: '/merchant/top/views/payChannelList', query: {id: id}})
      },

      /**
       * 搜索与重置
       */
      search() {
        this.$refs.page.search()
      },
      reset() {
        //channel 设置为“本商户”
        this.searchForm = {
          name: '', //公司名
          contact: '',//联系人，
          companyName:"",
          customerPhone:"",
          serviceProviderId:""
        };//搜索用的表单
        this.$refs.page.search()
      },

      // =====================服务商支付参数配置=====================
      /**
       * 获取支付商枚举
       */
      getPayConfigByTop: function () {
        getPayConfigByTop().then(res => {
          let data = res.obj;
          this.getPayConfigOption = data
        }).catch(e => {

        })
      },
      /**
       *允许编辑
       */
      canConfig() {
        this.payDisable = false
      },
      /**
       * 打开模态框
       */
      openTopConfigDialog() {
        //打开时获取第一个的值
        if (this.getPayConfigOption) {
          let value = this.getPayConfigOption[0].value;
          this.change_payChannel(value);
          this.topParam.payChannel = value
        }
        this.dynamicForm = []; //清空
        this.topPayDialog = true
      },
      /**
       * 关闭模态框
       */
      closeTopPayDialog() {
        this.topPayDialog = false
      },
      /**
       * 打开支付宝模态框
       */
      openTopAliDialog() {
        this.topAliDialog = true;
        this.getAliPayConfig();
      },
      /**
       * 关闭支付宝模态框
       */
      closeTopAliDialog() {
        this.topAliDialog = false;
        this.$refs['topAliForm'].resetFields();
      },

      /**
       * 切换支付通道
       */
      change_payChannel: function (event) {
        console.log(event);
        this.payDisable = true;
        if (event) {
          this.getPayConfigAndValueByTop(event)
        }
      },

      /**
       * 获取支付通道的参数
       */
      getPayConfigAndValueByTop: function (pcid) {
        getPayConfigAndValueByTop(pcid).then(res => {
          let data = res.obj;
          this.topParam.id = data.id || '';
          this.dynamicForm = data.topPayConfigDialogVOS
        }).catch(e => {

        })
      },
      /**
       * 获取支付宝小程序参数
       */
      getAliPayConfig() {
        findAlidPayConfig().then(res => {
          if (res.obj) {
            this.topAliForm = res.obj;
          }
        }).catch(e => {

        })
      },
      /**
       * 提交支付宝收银小程序配置
       */
      submitAliConfigBefore() {
        this.$refs['topAliForm'].validate((valid) => {
          if (valid) {
            this.submitAliConfig();
          } else {
            this.$message.error('还有内容未填写');
            return false;
          }
        });
      },
      submitAliConfig() {
        let form = JSON.parse(JSON.stringify(this.topAliForm));
        this.btnLoading = true;
        saveAliPayConfig(form).then(res => {
          this.$message.success('小程序配置保存成功');
          this.closeTopAliDialog();
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 提交参数
       */
      submitJsonConfigBefore: function () {
        let form = this.deepCopy(this.dynamicForm);

        let submitForm = {};
        for (let i in form) {
          submitForm[form[i].property] = form[i].value.trim();
        }

        let id = this.topParam.id; //id
        submitForm['id'] = id;
        if (submitForm) {
          this.submitJsonConfig(submitForm)
        }

      },
      /**
       * 正式提交
       */
      submitJsonConfig: function (submitForm) {
        let pc = this.topParam.payChannel; //payChannel
        let jsonform = JSON.stringify(submitForm);
        console.log(submitForm);
        console.log(jsonform);
        this.btnLoading = true;
        savePayConfig(pc, jsonform).then(res => {
          this.$message.success('该通道配置保存成功');
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 文件上传,微信证书用
       */
      fileUploadSuccess(response, file, fileList, item) {
        console.log(item);
        if (!item) {
          this.$message.error('找不到对应的input');
          return false
        }

        this.$message({
          message: response.msg,
          type: 'success'
        });

        let data = response.obj;
        for (let i in this.dynamicForm) {
          if (this.dynamicForm[i].property === item.property) {
            this.$set(this.dynamicForm[i], 'value', data)
          }
        }


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


  .config-header {
    width: 100%;
    max-width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 30px;
  }

</style>
