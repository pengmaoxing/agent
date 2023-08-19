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
      <el-input v-model="searchForm.customerPhone" @keyup.enter.native="search" placeholder="商户账号" size="small"
                class="formItem"></el-input>
      <el-input v-model="searchForm.companyName" @keyup.enter.native="search" placeholder="代理商名称" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
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
        label="经营类别">
        <template slot-scope="scope">
            <span>{{ scope.row.businessLevOne|businessLevOneFil }}-{{ scope.row.businessLevTwo }}-{{ scope.row.businessLevThree }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="companyType"
        label="公司层级">
      </el-table-column>
      <el-table-column
        prop="managerName"
        label="归属业务员">
      </el-table-column>
      <el-table-column
        prop="status"
        width="60"
        label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status===1">启用</template>
          <template v-else-if="scope.row.status===2">禁用</template>
        </template>
      </el-table-column>
      <el-table-column
        width="430"
        label="操作">

        <template slot-scope="scope">
          <!--//如果有方法，传入参数“scope.row”-->
          <!--//如果需要索引，传入参数“scope.$index”-->
          <!--//如果需要当前整页表格数据，传入参数“tableData”-->
          <!--<el-button type="text" @click="openwxPublicConfigDialog(scope.row)">公众号配置</el-button>-->
          <!--<el-button type="text" @click="openAppletConfigDialog(scope.row)">小程序配置</el-button>-->
          <el-button type="text" @click="memberConfigDialogOpen(scope.row)">会员配置</el-button>
          <el-button type="text" @click="restaurantConfigDialogOpen(scope.row)">小程序配置</el-button>
          <el-button type="text" @click="rooterDeatil(scope.row)">详情</el-button>
          <!--<el-button type="text" @click="routerModify(scope.row)">修改</el-button>-->
          <el-button type="text" @click="cancle(scope.row)">注销</el-button>
          <el-button
            type="text"
            @click="resetPassword(scope.row)">重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页-->
    <pagination
      :total-elements="totalElements"
      :change-callback="getMerchantList"
      ref="page"></pagination>

    <!--&lt;!&ndash;小程序配置&ndash;&gt;-->
    <!-- <el-dialog
    :close-on-click-modal="false" title="小程序参数配置" :visible.sync="appletConfigVisible">-->
    <!--<el-form :model="appletConfig">-->
    <!--<el-form-item v-show="false">-->
    <!--<el-input v-model="appletConfig.merchantId"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="AppId" :label-width="formLabelWidth">-->
    <!--<el-input v-model="appletConfig.appId" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="AppSecret" :label-width="formLabelWidth">-->
    <!--<el-input v-model="appletConfig.appKey" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="OriginalId" :label-width="formLabelWidth">-->
    <!--<el-input v-model="appletConfig.originalId" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="appletConfigVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="appletConfigSubmit()">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->

    <!--&lt;!&ndash;公众号配置&ndash;&gt;-->
    <!-- <el-dialog
    :close-on-click-modal="false" title="公众号参数配置"-->
    <!--:visible.sync="wxPublicConfigVisible">-->
    <!--<el-form :model="wxPublic" ref="wxPublic" :rules="rules">-->
    <!--<el-form-item label="AppId" :label-width="formLabelWidth" prop="appId">-->
    <!--<el-input v-model="wxPublic.appId" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="AppKey" :label-width="formLabelWidth" prop="appKey">-->
    <!--<el-input v-model="wxPublic.appKey" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="closewxPublicConfigDialog">取 消</el-button>-->
    <!--<el-button type="primary" @click="wxPublicConfigSubmit()">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->


    <!--会员配置-->
     <el-dialog
    :close-on-click-modal="false" title="会员配置"
               width="530px"
               :before-close="memberConfigDialogClose"
               :visible.sync="memberConfigDialogVisible">

      <!--当前配置项-->
      <el-form>
        <el-form-item label="当前配置会员：">
          <el-radio v-model="currentConfigItem" label="1">微信</el-radio>
          <el-radio v-model="currentConfigItem" label="2">支付宝</el-radio>
        </el-form-item>
      </el-form>

      <div v-show="currentConfigItem==1">
        <!--微信公众号参数配置-->
        <el-divider content-position="left">公众号参数配置</el-divider>

        <el-form :model="wxPublic" ref="wxPublic" :rules="rules">
          <el-form-item label="AppId" :label-width="formLabelWidth" prop="appId">
            <el-input v-model="wxPublic.appId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="AppKey" :label-width="formLabelWidth" prop="appKey">
            <el-input v-model="wxPublic.appKey" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <div class="group-config-btn">
          <el-button type="primary" @click="wxPublicConfigSubmit()">保存配置</el-button>
        </div>

        <!--微信小程序参数配置-->
        <el-divider content-position="left">小程序参数配置</el-divider>
        <el-form :model="appletConfig">
          <el-form-item v-show="false">
            <el-input v-model="appletConfig.merchantId"></el-input>
          </el-form-item>
          <el-form-item label="AppId" :label-width="formLabelWidth">
            <el-input v-model="appletConfig.appId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="AppSecret" :label-width="formLabelWidth">
            <el-input v-model="appletConfig.appKey" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="OriginalId" :label-width="formLabelWidth">
            <el-input v-model="appletConfig.originalId" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="group-config-btn">
          <el-button type="primary" @click="appletConfigSubmit()">保存配置</el-button>
        </div>
      </div>

      <div v-show="currentConfigItem==2">
        <el-divider content-position="left">支付宝参数配置</el-divider>
        <el-form label-width="150px" :model="aliForm" ref="aliconfig">
          <el-form-item label="AppId：" prop="appId">
            <el-input placeholder="AppId"
                      v-model="aliForm.appId"
                      class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="PrivateKey：" prop="privateKey">
            <el-input placeholder="PrivateKey"
                      v-model="aliForm.privateKey"
                      class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="PublicKey：" prop="publicKey">
            <el-input placeholder="PublicKey"
                      v-model="aliForm.publicKey"
                      class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="callback：" prop="callback">
            <el-input placeholder="callback"
                      v-model="aliForm.callback"
                      class="input-width"></el-input>
          </el-form-item>
          <div class="group-config-btn">
            <el-button type="primary" @click="appletAlipayConfigSubmit()">保存配置</el-button>
          </div>
        </el-form>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="memberConfigDialogClose">退出</el-button>
      </div>
    </el-dialog>

    <!--点餐配置-->
     <el-dialog
      title="小程序配置"
      :visible.sync="restaurantVisible"
      :close-on-click-modal="false"
      width="576px"
      :before-close="restaurantConfigDialogClose">
      <div>


        <!--点餐小程序配置-->
        <el-divider content-position="left">点餐小程序配置</el-divider>

        <el-form label-width="150px" :rules="restaurantConfigRules"
                 :model="restaurantConfigForm" ref="restaurantconfig">
          <el-form-item label="AppId：" prop="appId">
            <el-input placeholder="appId"
                      v-model="restaurantConfigForm.appId"
                      class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="AppKey：" prop="appKey">
            <el-input placeholder="appKey"
                      v-model="restaurantConfigForm.appKey"
                      class="input-width"></el-input>
          </el-form-item>
        </el-form>

        <div class="group-config-btn">
          <el-button type="primary" @click="saveRestaurantConfig()">保存配置</el-button>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="restaurantConfigDialogClose">退 出</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getMerchantList,
    cancle,
    resetPwd,
    getWxPublicDetail,
    saveWxPublicConfig,
    getAliConfigDetail,
    saveAliConfig,
    getRepastApplet,
    saveRepastAppleConfig,
    saveAppletConfig,
    getProviderList
  } from '../api/merchant'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'merchant',
    components: {pagination},
    data() {
      return {
        provider:[],
        formLabelWidth: '130px',
        loading: true,
        username:sessionStorage.getItem('username'),
        tableData: [], // 表格数据
        totalElements: 0,
        searchForm: {
          name: '', //公司名
          contact: '',//联系人，
          customerPhone: '',//联系人，
          companyName: '',//联系人，
          serviceProviderId:""
        },
        appletConfigVisible: false,

        appletConfig: {
          appId: '',
          appKey: '',
          originalId: '',
          merchantId: ''
        },
        wxPublicConfigVisible: false,
        wxPublic: {
          merchantId: '',
          appId: '',
          appKey: ''
        },
        rules: {
          appId: [
            {required: true, message: '请输入appId', trigger: 'blur'},
          ],
          appKey: [
            {required: true, message: '请输入appKey', trigger: 'blur'},
          ],
          originalId: [
            {required: true, message: '请输入originalId', trigger: 'blur'},
          ]
        },

        //--------会员配置
        memberConfigDialogVisible: false, //会员配置模态框
        currentConfigItem: '1',

        aliForm: {
          id: '',
          merchantId: '',
          appId: '',
          privateKey: '',
          publicKey: '',
          callback: '',
        },

        //点餐
        restaurantVisible: false,
        restaurantConfigForm: {
          merchantId: '',
          appId: '',
          appKey: '',
        },
        restaurantConfigRules: {
          appId: [
            {required: true, message: '请输入appId', trigger: 'blur'},
            {min: 10, message: 'appId格式错误', trigger: 'blur'}
          ],
          appKey: [
            {required: true, message: '请输入appKey', trigger: 'blur'},
            {min: 10, message: 'appKey格式错误', trigger: 'blur'}
          ],
        }


      }
    },
    filters:{
      businessLevOneFil:function (val) {
        if (val==1){
          return '企业商户'
        }else if(val==2){
          return '个体工商户'
        }else if(val==3){
          return '个人商户'
        }else{
          return val||''
        }
      }
    },
    mounted() {
      this.getMerchantList()
      if(this.username=='admin') {
        this.getProviderList();

      }    },
    methods: {

      //重置商户密码
      resetPassword(row) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(row.phone).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },

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
          this.loading = false
        })
      },

      //注销商户
      cancle(row) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancle(row.id).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },
      //跳转详情页
      rooterDeatil(data) {
        //console.log(data)
        //query发送ID到详情
        let id = data.id;
        this.$router.push({path: '/merchant/top/views/merchantDetail', query: {id: id}})
      },

      routerModify(data) {
        let id = data.id;
        this.$router.push({path: '/merchant/top/views/modifyMerchant', query: {id: id}})
      },

      // //重置商户密码
      // resetPassword(row) {
      //   this.$confirm('是否确认操作？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     resetPwd(row.phone).then(response => {
      //       this.$message({
      //         message: response.msg,
      //         type: 'success'
      //       });
      //       this.btnLoading = false;
      //       this.$refs.page.refresh()
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   })
      // },

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


      /**
       * 全会员配置
       */
      memberConfigDialogOpen: function (data) {
        // 微信
        this.openAppletConfigGet(data); //微信小程序资料
        this.openwxPublicConfigGet(data); //微信公众号资料

        //支付宝
        this.getAlipayConfigSubmit(data);


        this.memberConfigDialogVisible = true
      },
      memberConfigDialogClose: function () {
        this.$refs.page.refresh();
        this.$refs['aliconfig'].resetFields();
        this.$refs['wxPublic'].resetFields();
        this.clearAliForm(); //清空支付宝
        this.memberConfigDialogVisible = false
      },


      /**
       * 小程序配置
       */
      openAppletConfigGet(merchantInfo) {
        this.appletConfig.appKey = merchantInfo.merchantAppletConfigVO.appKey;
        this.appletConfig.appId = merchantInfo.merchantAppletConfigVO.appId;
        this.appletConfig.originalId = merchantInfo.merchantAppletConfigVO.originalId;
        this.appletConfig.merchantId = merchantInfo.id;
        // this.appletConfigVisible = true;
      },
      /**
       * 小程序配置提交
       */
      appletConfigSubmit() {
        saveAppletConfig(this.appletConfig).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          // this.$refs.page.refresh();
          // this.appletConfigVisible = false
        }).catch(() => {
          this.loading = false
        })
      },




      /**
       * 微信公众号获取
       */
      openwxPublicConfigGet: function (data) {
        let id = data.id;
        getWxPublicDetail(id).then(res => {
          let data = res.obj;
          this.wxPublic.merchantId = id;
          this.wxPublic.appId = data.appId;
          this.wxPublic.appKey = data.appKey;
          // this.wxPublicConfigVisible = true
        }).catch(e => {

        })
      },

      /**
       * 保存公众号配置
       */
      wxPublicConfigSubmit() {
        this.loading = true;

        this.$refs['wxPublic'].validate((valid) => {
          if (valid) {

            saveWxPublicConfig(this.wxPublic).then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              });
              // this.closewxPublicConfigDialog();
              // this.$refs['wxPublic'].resetFields();
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.loading = false;
            return false;
          }
        });
      },


      /**
       * 获取支付宝配置
       */
      getAlipayConfigSubmit: function (data) {
        let id = data.id;
        this.aliForm.merchantId = id;
        getAliConfigDetail(id).then(res => {
          let data = res.obj;
          this.aliForm.id = data.id;
          this.aliForm.appId = data.appId;
          this.aliForm.privateKey = data.privateKey;
          this.aliForm.publicKey = data.publicKey;
          this.aliForm.callback = data.callback

        }).catch(e => {

        })
      },

      /**
       * 情况支付宝表单
       */
      clearAliForm: function () {
        this.aliForm.id = '';
        this.aliForm.merchantId = '';
        this.aliForm.appId = '';
        this.aliForm.privateKey = '';
        this.aliForm.publicKey = '';
        this.aliForm.callback = ''
      },


      /**
       *保存支付宝配置
       */
      appletAlipayConfigSubmit: function () {
        let form = this.aliForm;
        if (form.id === '' || form.id == null) {
          delete form.id
        }
        saveAliConfig(form).then(res => {
          this.$message.success('保存成功')
        }).catch(e => {

        })
      },

      /**
       * 点餐小程序
       */
      restaurantConfigDialogOpen: function (row) {
        console.log(row);
        if (row.id === '' || row.id == null) {
          this.$message.error('商户信息错误，无法继续配置。')
          return false
        }
        //获取数据
        getRepastApplet(row.id).then(res => {
          let data = res.obj;
          //赋值数据
          this.restaurantConfigForm.merchantId = row.id || '';
          this.restaurantConfigForm.appId = data.appId || '';
          this.restaurantConfigForm.appKey = data.appKey || '';
          //显示模态框
          this.restaurantVisible = true
        }).catch(e => {

        })

      },
      //关闭模态框
      restaurantConfigDialogClose: function () {
        this.$refs['restaurantconfig'].resetFields();
        this.restaurantConfigForm.merchantId = ''
        this.restaurantConfigForm.appId = ''
        this.restaurantConfigForm.appKey = ''
        this.restaurantVisible = false
      },

      /**
       * 提交
       */
      saveRestaurantConfig: function () {
        this.$refs['restaurantconfig'].validate((valid) => {
          if (valid) {
            let form = this.restaurantConfigForm;
            saveRepastAppleConfig(form).then(res => {
              this.$message.success('保存成功')
              this.restaurantConfigDialogClose()
            }).catch(e => {

            })
          } else {
            this.$message.error('还有内容未填写！')
            return false;
          }
        });


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

  .input-width {
    width: 280px;
  }

  .group-config-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
