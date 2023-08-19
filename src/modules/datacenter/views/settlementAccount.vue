<!--结算账户-->
<template>
  <div class="app-container" v-loading="loading">
    <!--我的结算账户-->

    <div divName="结算账户信息" v-if="seeMode==0">

      <div>
        <el-select size="small" v-model="searchAccount.withdrawWay"
                   class="input-wdith"
                   clearable
                   placeholder="按结算方式"
                   @change="refresh">
          <el-option
            v-for="item in withdrawWayOption"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input size="small" v-model="searchAccount.name"
                  clearable
                  @keypress.enter.native="refresh"
                  placeholder="收款人姓名" class="input-wdith"></el-input>
        <el-button v-if="jumpMode==='jump'"
                   class="search-tools-btn" type="primary" size="small"
                   @click="goBack">返回佣金结算
        </el-button>
        <el-tooltip content="在这里创建你的收款账户"
                    :value="tipsSow" :manual="true"
                    :open-delay="500" effect="light"
                    placement="bottom">
          <el-button class="search-tools-btn" type="primary" size="small" @click="accountDialogOpen">创建结算账户</el-button>
        </el-tooltip>
        <el-button class="search-tools-btn" size="small" @click="goToWithdrawalDetail">查看提现明细</el-button>

      </div>
      <!--回显数据-->
      <el-divider content-position="left">我的结算账户</el-divider>
      <template>
        <el-table
          :data="accountTable"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账户备注">
          </el-table-column>
          <el-table-column
            label="结算方式">
            <template slot-scope="scope">
              <span>{{scope.row.withdrawWay|withdrawWayFil}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountNumber"
            label="账号(收款账户号)">
          </el-table-column>
          <el-table-column
            prop="payee"
            label="账户名(收款人全名)">
          </el-table-column>
          <el-table-column
            label="开户行">
            <template slot-scope="scope">
              <span v-if="scope.row.withdrawWay==1">——</span>
              <span v-else>{{scope.row.bankName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="支行">
            <template slot-scope="scope">
              <span v-if="scope.row.withdrawWay==1">——</span>
              <span v-else>{{scope.row.branchName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="card"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="setAccountRemark(scope.row)">修改备注</el-button>
              <el-button type="text" @click="deleteAccount(scope.row)">删除账户</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="accountTableTotalElements"
          :change-callback="getAccountList"
          ref="accountPage">
        </pagination>
      </template>


    </div>

    <!--账户流水明细-->
    <div divName="账户中查看提现明细" v-if="seeMode==1">
      <!--工具条 Start-->
      <div class="search-bar">
        <div class="list-tools-info">
          <el-button type="text" class="comm-set" @click="goBackAccountDetail">返回上一页</el-button>
        </div>
      </div>
      <!--工具条 End-->
      <el-divider content-position="left">提现明细</el-divider>
      <!--流水明细表格 Start-->
      <template>
        <el-table
          :data="currentData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="companyName"
            :show-overflow-tooltip="true"
            label="名称">
          </el-table-column>
          <el-table-column
            label="申请结算金额"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              ￥&nbsp{{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="申请时间"
            width="160px">
          </el-table-column>
          <el-table-column
            prop="companyAccount.name"
            :show-overflow-tooltip="true"
            label="账户备注">
          </el-table-column>
          <el-table-column
            label="提现方式">
            <template slot-scope="scope">
              <span>{{scope.row.companyAccount|withdrawWayAdvFil}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyAccount.payee"
            :show-overflow-tooltip="true"
            label="开户名">
          </el-table-column>
          <el-table-column
            prop="companyAccount.accountNumber"
            :show-overflow-tooltip="true"
            label="账号">
          </el-table-column>
          <el-table-column
            label="银行及支行"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.companyAccount">
                <span v-if="scope.row.companyAccount.bankName!='' && scope.row.companyAccount.branchName!=''">
                  {{scope.row.companyAccount.bankName}}{{scope.row.companyAccount.branchName}}
                </span>
                <span v-else>——</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="successTime"
            label="提现成功时间">
          </el-table-column>
          <el-table-column
            prop="applyStatusStr"
            label="提现情况"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.applyStatus==3">{{scope.row.applyStatusStr}}(理由：{{scope.row.reason}})</span>
              <span v-else>{{scope.row.applyStatusStr}}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="currentDatatotalElement"
          :change-callback="getWithdrawApplyList"
          ref="getWithdrawalPage"></pagination>
      </template>
      <!--流水明细表格 End-->
    </div>


    <!--模态框组-->
     <el-dialog
    :close-on-click-modal="false"
      :title="accountActiveTitle"
      :visible.sync="createAccountDialogVisible"
      width="600px"
      :before-close="accountDialogClose">
      <div>
        <!--添加数据-->
        <el-form :label-width="labelWidth" :rules="rules" :model="createAccount" ref="createAccount" :size="formSize">

          <el-form-item label="账户备注：" prop="name">
            <el-input
              placeholder="便于区分各个账户"
              class="input-wdith"
              v-model="createAccount.name"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="结算方式：" prop="withdrawWay">
            <el-select v-model="createAccount.withdrawWay"
                       class="input-wdith"
                       placeholder="请选择结算方式">
              <el-option
                v-for="item in withdrawWayOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="结算账户号：" prop="accountNumber">
            <el-input
              placeholder="请输入结算账户号"
              class="input-wdith"
              v-model="createAccount.accountNumber"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="收款人：" prop="payee">
            <el-input
              placeholder="请输入收款人姓名"
              class="input-wdith"
              v-model="createAccount.payee"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="结算银行：" v-if="createAccount.withdrawWay==2" prop="bankName">
            <el-input
              placeholder="请输入结算银行全名"
              class="input-wdith"
              v-model="createAccount.bankName"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="结算银行支行：" v-if="createAccount.withdrawWay==2" prop="branchName">
            <el-input
              placeholder="请输入结算银行支行"
              class="input-wdith"
              v-model="createAccount.branchName"
              clearable>
            </el-input>
          </el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="accountDialogClose">取 消</el-button>
    <el-button type="primary" @click="submitAccount" :loading="saveLoading">确 定</el-button>
  </span>
    </el-dialog>

    <!--新建或修改结算账户信息-->


  </div>
</template>

<script>
  import {
    getWithdrawWay,
    getAccountList,
    saveAccount,
    updateAccount,
    deleteAccount,
    getWithdrawApplyList
  } from '../api/settlementAccount'

  import pagination from '@/components/pagination/index'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "settlementAccount",
    mixins:[mixins], //混入
    components: {pagination},
    data() {
      return {
        loading: true,//页面加载等待
        labelWidth: '170px',
        jumpMode: 'no',
        formSize: 'medium',

        tipsSow: false,

        seeMode: 0, //0账户 1详情

        withdrawWayOption: [],//结算方式选项

        searchAccount: {
          withdrawWay: '',
          name: ''
        },
        accountTable: [], //结算账户列表
        accountTableTotalElements: 0,

        createAccountDialogVisible: false,//增加结算账户模态框
        accountActiveMode: 'new', //new 创建模式，modify修改模式
        accountActiveTitle: '创建新的结算账户', //创建新的结算账户  修改结算账户
        createAccount: {
          withdrawWay: '', //结算方式
          accountNumber: '',//收款号
          bankName: '',//开户行
          branchName: '',//支行
          payee: '',//收款人
          name: '',
          companyId: ''
        },//创建账户

        rules: {
          // name: [
          //   {required: true, message: '请输入账户备注', trigger: 'blur'},
          // ],
          withdrawWay: [
            {required: true, message: '请选择结算方式', trigger: 'change'},
          ],
          accountNumber: [
            {required: true, message: '请输入结算账户号', trigger: 'blur'},
          ],
          payee: [
            {required: true, message: '请输入收款人姓名', trigger: 'blur'},
          ],
          bankName: [
            {required: true, message: '请输入银行全称', trigger: 'blur'},
          ],
          branchName: [
            {required: true, message: '请输入支行全称', trigger: 'blur'},
          ],
        },
        modifyName: {
          name: '',
          id: ''
        },
        saveLoading: false, //保存锁定

        //明细
        currentData: [],
        currentDatatotalElement: 0,
      }
    },
    filters: {
      //结算方式过滤
      withdrawWayFil: function (val) {
        if (val === '' || val == null) {
          return ''
        }
        let text;
        if (val == 1) {
          text = '支付宝'
        } else if (val == 2) {
          text = '银行转账'
        } else {
          text = '未知'
        }
        return text
      },
      //结算方式过滤
      withdrawWayAdvFil: function (data) {
        if (data == undefined) {
          return ''
        }

        let val = data.withdrawWay;
        if (val === '' || val == null) {
          return ''
        }

        let text;
        if (val == 1) {
          text = '支付宝'
        } else if (val == 2) {
          text = '银行转账'
        } else {
          text = '未知'
        }
        return text
      }
    },

    mounted() {
      //判断用户权限
      this.checkUserType();

      //获取结算账户选项
      this.getWithdrawWayOption()

      //是否跳入
      let mode = this.$route.query.mode;
      if (mode === 'jump') {
        this.jumpMode = mode;
        //显示提示
        this.tipsSow = true;
        setTimeout(() => {
          this.tipsSow = false
        }, 3600)
      }
    },
    methods: {
      /**
       * 判断用户权限
       */
      checkUserType: function () {
        let userType = sessionStorage.getItem('userType') || '';
        if (userType == null || userType == 1) {
          this.loading = true //遮住页面
        } else {
          //获取列表
          this.getAccountList(1, 10);
        }
        return false
      },
      /**
       * 获取结算账户类型选项
       */
      getWithdrawWayOption: function () {
        getWithdrawWay().then(res => {
          let data = res.obj;
          this.withdrawWayOption = data
        }).catch(e => {

        })
      },

      /**
       * 获取账户列表
       */
      getAccountList: function (pageNum, pageSize) {
        let form = this.searchAccount;
        let cid = sessionStorage.getItem('companyId');
        getAccountList(pageNum, pageSize, cid, form).then(res => {
          let data = res.obj;
          this.accountTable = data.content;
          this.accountTableTotalElements = data.totalElements;
          this.loading = false //遮住页面
        }).catch(e => {

        })
      },

      /**
       * 刷新页面
       */
      refresh: function () {
        this.$refs['accountPage'].refresh()
      },


      /**
       * 打开新建结算账户模态框
       */
      accountDialogOpen: function () {
        this.createAccountDialogVisible = true
      },
      /**
       * 关闭新建结算账户模态框
       */
      accountDialogClose: function () {
        this.$refs['createAccount'].resetFields();
        this.createAccountDialogVisible = false
      },
      /**
       * 提交新结算账户
       */
      submitAccount: function () {
        this.saveLoading = true;

        this.$refs['createAccount'].validate((valid) => {
          if (valid) {

            let form = this.deepCopy(this.createAccount);
            form.companyId = sessionStorage.getItem('companyId');
            saveAccount(form).then(res => {
              this.$message.success('创建新结算账户成功！');
              this.refreshAccountList();
              this.accountDialogClose();
              setTimeout(() => {
                this.saveLoading = false
              }, 1000)
            }).catch(e => {
              this.saveLoading = false
            });

          } else {
            this.$message.error('还有内容未填写！');

            setTimeout(() => {
              this.saveLoading = false;
            }, 500);


            return false;

          }
        });


      },

      /**
       * 修改备注名
       */
      setAccountRemark: function (rowdata) {
        let value = rowdata.name;
        this.modifyName.id = rowdata.id;
        this.$prompt('请输入新的备注名', '修改备注名', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputValue: value || ''
        }).then(({value}) => {
          this.modifyName.name = value;
          this.saveAccountRemark()
        }).catch(() => {

        });
      },

      saveAccountRemark: function () {
        let form = this.deepCopy(this.modifyName);
        updateAccount(form).then(res => {
          this.$message.success('修改成功！');
          this.$refs['accountPage'].refresh()
        }).catch(e => {
          this.$message.error(e.msg);
        })
      },

      /**
       * 删除
       */
      deleteAccount: function (rowdata) {
        let ids = rowdata.id;
        this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteAccount(ids).then(res => {
            this.$message.success('删除成功！');
            this.$refs['accountPage'].refresh()
          }).catch(e => {

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },


      /**
       * 查看提现明细
       */
      goToWithdrawalDetail: function () {
        this.seeMode = 1;
        this.getWithdrawApplyList(1, 10)
      },

      /**
       * 获取明细列表
       */
      getWithdrawApplyList: function (pageNum, pageSize) {
        let companyId = sessionStorage.getItem('companyId');
        if (companyId == null || companyId === '') {
          this.$message.error('对不起，没有当前用户信息，无法获取列表');
          return false
        }
        //发起
        getWithdrawApplyList(pageNum, pageSize, companyId).then(res => {
          let data = res.obj;
          this.currentData = data.content;
          this.currentDatatotalElement = totalElements
        }).catch(e => {

        })
      },
      /**
       * 返回结算账户详情
       */
      goBackAccountDetail: function () {
        this.seeMode = 0
      },
      /**
       * 刷新账户列表
       */
      refreshAccountList: function () {
        this.$refs['accountPage'].refresh()
      },


      /**
       * 返回
       */
      goBack: function () {
        this.$router.go('-1')
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  /*卡片标题*/
  .box-card {

    .box-header {

      .card-title {
        cursor: default;
        line-height: 32px;
        color: #6f6f6f;
      }
    }
  }

  /*搜索条*/
  .search-bar {
    /*月份选择*/
    .half-month {
      width: 140px;
    }

    /*信息*/
    .list-tools-info {
      padding: 0;
      height: 40px;
      line-height: 37px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .comm-money {
        margin-right: 15px;
        font-size: 18px;
        color: #1e6abc;
      }

      .comm-set {
        margin: 0;
      }

    }
  }

  /*搜索条工具*/
  .search-tools-btn {
    float: right;
    margin: 0 5px;
  }


  .input-wdith {
    width: 270px;
  }


</style>
