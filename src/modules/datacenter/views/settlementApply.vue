<!--结算申请-->
<template>
  <div class="app-container" v-loading="loading">
    <!--佣金统计表格-->
    <div divName="佣金统计表格">
      <!--工具条 Start-->
      <div class="search-bar">
        <!--报表导出-->
        <div class="comm-info">
          <!--只有服务商和运营商有结算导出-->
          <el-button type="primary"
                     v-if="userType==1 || userType==2"
                     class="comm-set">结算申请报表导出</el-button>
        </div>
      </div>
      <!--工具条 End-->
      <el-divider content-position="left">代理商结算申请</el-divider>
      <!--表格-->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="代理商名称">
          </el-table-column>
          <el-table-column
            label="申请金额">
            <template slot-scope="scope">
              <span>￥{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            label="提现方式">
            <template slot-scope="scope">
              <span>{{scope.row.companyAccount|withdrawWayFil}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyAccount.accountNumber"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="applyStatusStr"
            label="当前状态">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="scope.row.applyStatus!=1" @click="rejectApply(scope.row)">驳回</el-button>
              <el-button type="text" :disabled="scope.row.applyStatus!=1" @click="confirmApply(scope.row)">同意/打款
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="totalElement"
          :change-callback="getSettlementList"
          ref="page"></pagination>
      </template>
    </div>
  </div>
</template>

<script>
  import {
    getWithdrawApplyList,
    checkApply
  } from '@/modules/datacenter/api/settlementApply'

  import pagination from '@/components/pagination/index'

  export default {
    name: "settlementApply",
    components: {pagination},
    data() {
      return {
        loading: '',//页面等待
        subordinateName: '', //下级用户类型（名称）
        userType: '', //当前用户类型
        tableData: [
        ],
        totalElement: 0,

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    filters: {
      //结算方式过滤
      withdrawWayFil: function (data) {
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
      /**
       *  服运渠类型获取  1服 2运 3渠
       */
      this.userType = sessionStorage.getItem('userType');
      console.log(this.userType);
      if (this.userType == null) {
        this.$message.error('无法获取用户类型，请重新登录。');
        this.loading = true;
        return false
      } else {
        let val = parseInt(this.userType);
        let text = '';
        switch (val) {
          case 1:
            text = this.agentName;
            break;
          case 2:
            text = this.disName;
            break;
          case 3:
            text = this.subName;
            break;
          default:
            text = '';
            break;
        }
        this.subordinateName = text //下级名称赋值
      }

      //获取列表
      this.getSettlementList(1, 10)


    },
    methods: {
      /**
       * 获取列表
       */
      getSettlementList: function (pageNumber, pageSize) {
        let id = sessionStorage.getItem('companyId');
        getWithdrawApplyList(pageNumber, pageSize, id).then(res => {
          let data = res.obj;
          this.tableData = data.content;
          this.totalElement = data.totalElements;
        }).catch(e => {

        })
      },

      /**
       * 同意
       */
      confirmApply: function (data) {
        let form = {};
        form.applyId = data.id;
        form.applyStatus = 2;
        form.reason = '';

        this.$confirm('同意该申请?', '提示', {
          confirmButtonText: '同意/打款',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkApply(form).then(res => {
            this.$message.success('操作成功');
            this.$refs.page.refresh()
          }).catch(e => {

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      /**
       * 驳回
       */
      rejectApply: function (data) {
        let form = {};
        form.applyId = data.id;
        form.applyStatus = 3;

        this.$prompt('驳回该申请？', '提示', {
          confirmButtonText: '驳回',
          cancelButtonText: '取消',
          inputPlaceholder: '选填驳回理由',
          inputValue: '',
        }).then(({value}) => {
          form.reason = value;
          checkApply(form).then(res => {
            this.$message.success('驳回成功');
            this.$refs.page.refresh()
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .search-bar {

    /*月份选择*/
    .half-month {
      width: 140px;
    }

    /*佣金信息*/
    .comm-info {
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

</style>
