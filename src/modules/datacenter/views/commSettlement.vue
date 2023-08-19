<!--佣金结算-->
<template>
  <div class="app-container" v-loading="loading">

    <!--搜索与工具条 Start-->
    <div divName="工具条" class="search-bar">
      <!--日期选择-->
      <div class="block">
        <el-date-picker
          v-model="searchForm.month"
          type="month"
          @change="submitSearch"
          :clearable="false"
          placeholder="选择月份"
          format="yyyy-MM"
          value-format="yyyy-MM">
        </el-date-picker>
      </div>
      <div class="block">
        <el-input v-model.trim="searchForm.companyName" @keypress.enter.native="submitSearch"
                  placeholder="按代理商名"></el-input>
      </div>
      <!--查询按钮-->
      <div class="block padding-LR-medium ">
        <el-button type="primary" @click="submitSearch" :loading="searchLoading">查询</el-button>
        <!--<el-button type="primary" >结算报表导出</el-button>-->
        <el-button type="primary" @click="downloadReportOpen(2)">优质商户报表导出</el-button>
        <el-button type="primary" @click="downloadReportOpen(3)">刷脸优质商户报表导出</el-button>
        <el-button type="primary" @click="xinhuiCollectDownLoadOpen">信汇佣金统计导出</el-button>
      </div>
      <!--佣金操作与信息-->
      <div class="comm-info">

        <el-tooltip class="item" v-if="userType!=1" effect="light" content="历史累计佣金总和" placement="top-start">
          <span class="comm-money">累计佣金: ￥{{commissionData.totalCommissionAmount||0}}</span>
        </el-tooltip>
        <el-tooltip class="item" v-if="userType!=1" effect="light" content="包含已提现佣金与待审核冻结佣金总合" placement="top-start">
          <span class="comm-money">不可提现佣金: ￥{{commissionData.usedCommissionAmount||0}}</span>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="可提现佣金" placement="top-start">
          <span class="comm-money">可提现佣金: ￥{{commissionData.validCommissionAmount||0}}</span>
        </el-tooltip>

        <el-button type="primary" class="comm-set" v-if="userType==1" @click="settleApply(1)">立刻结算</el-button>
        <!--服务商-->
        <el-button type="primary" class="comm-set" v-if="userType!=1" @click="settleApply(2)">申请结算</el-button>
        <!--运渠商-->
      </div>
    </div>
    <!--搜索与工具条 End-->

    <!--卡片 Start-->
    <div divName="统计卡片" class="card_group">
      <!--有效交易金额-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/有效交易基数.png" alt="">
            </div>
            <div class="tools_text">
              <p>有效交易金额</p>
              <p>￥{{cardData.validAmount||'暂无数据'}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--有效交易笔数-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/有效交易笔数.png" alt="">
            </div>
            <div class="tools_text">
              <p>有效交易笔数</p>
              <p>{{cardData.validNumber||'暂无数据'}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--本月佣金-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/到账佣金.png" alt="">
            </div>
            <div class="tools_text">
              <p>本月佣金</p>
              <p>￥{{cardData.commission||'暂无数据'}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--下级佣金,推广商没有下级，无法查看-->
      <div class="card_item" v-if="(agentLevel=='-1' && userType!=4) || (agentLevel!='-1'  && userType==1)">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/下级佣金.png" alt="">
            </div>
            <div class="tools_text">
              <p>本月下级佣金</p>
              <p>￥{{cardData.subCommission||'暂无数据'}}</p>
            </div>
          </div>
        </el-card>
      </div>


    </div>
    <!--卡片 End-->

    <el-divider content-position="left">佣金数据</el-divider>

    <!--表格 Start-->
    <div divName="佣金表格、费率显示">

      <template>
        <el-table
          :data="subCommissionTableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="代理商名称"
            :show-overflow-tooltip="true"
            width="250">
          </el-table-column>
          <el-table-column
            prop="commissionModel"
            label="结算模式">
          </el-table-column>
          <el-table-column
            prop="validAmount"
            sortable
            label="有效交易基数">
          </el-table-column>
          <el-table-column
            prop="validNumber"
            sortable
            label="有效交易笔数">
          </el-table-column>
          <el-table-column
            prop="validCommission"
            sortable
            label="有效佣金">
          </el-table-column>
          <el-table-column
            label="分佣比例">
            <template slot-scope="scope">
              <span v-if="scope.row.commissionModel==='底价模式'">——</span>
              <span v-else>{{scope.row.feeRate}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            label="应得分佣">
            <template slot-scope="scope">

              <el-popover
                placement="left"
                title="分佣构成"
                width="200"
                trigger="hover">
                <div>
                  <table class="commission-table">
                    <tr v-for="item in scope.row.payChannelCommission">
                      <td>{{item.name}}</td>
                      <td>{{item.value}} 元</td>
                    </tr>
                  </table>
                </div>
                <span slot="reference" class="commission-show">{{scope.row.commission}} <i class="el-icon-tickets"></i></span>
              </el-popover>


            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="subCommissionTabletotalElement"
          :change-callback="getList"
          ref="subCommissionTable"></pagination>
      </template>

    </div>
    <!--表格 End-->


    <!--模态框 组-->
    <template>
      <!--运渠结算 start-->
       <el-dialog
    :close-on-click-modal="false"
        title="结算"
        :visible.sync="settleVisible"
        width="430px"
        :append-to-body="true"
        :before-close="createSettleClose">
        <div divName="创建账户">
          <el-form ref="createForm" label-width="130px">

            <el-form-item label="结算账户：">
              <el-select v-model="agentSubmitSettle.companyAccountId" placeholder="请选择">
                <el-option
                  v-for="item in accountOption"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="结算金额：">
              <el-input-number placeholder="金额"
                               clearable
                               :min="0"
                               v-model="agentSubmitSettle.amount"
                               class="input-width"></el-input-number>
              &nbsp元
            </el-form-item>
            <el-button class="create-btn" type="text" @click="goCreatePage">创建结算账户</el-button>


          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="createSettleClose">取消</el-button>
    <el-button type="primary" @click="submitWithdraw" :loading="settLoading">申请</el-button>
  </span>
      </el-dialog>
      <!--运渠结算 end-->

      <!--报表导出-->

       <el-dialog
    :close-on-click-modal="false"
        title="报表导出"
        :visible.sync="downloadReportVisible"
        width="576px"
        :before-close="downloadReportClose">
        <div>
          <el-form :model="downloadReportForm" ref="downloadReportClose"
                   label-width="120px" label-suffix="：">
            <el-form-item label="时间范围选择">
              <el-date-picker
                v-model="downloadReportForm.date"
                type="datetimerange"
                align="right"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="downloadReportClose">取 消</el-button>
    <el-button type="primary" @click="downloadReport">下 载</el-button>
  </span>
      </el-dialog>


      <!--信汇佣金统计导出-->
       <el-dialog
    :close-on-click-modal="false"
        title="信汇佣金统计导出"
        :visible.sync="xinhuiCollectVisible"
        width="579px"
        :before-close="xinhuiCollectDownLoadClose">
        <div>
          <el-form :model="xinhuiCollectForm" ref="xinhuiCollectForm"
                   label-width="100px" label-suffix="：" :rules="DownloadRules">
            <el-form-item label="时间段" prop="days">
              <el-date-picker
                v-model="xinhuiCollectForm.days"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期时间"
                end-placeholder="结束日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="xinhuiCollectDownLoadClose">取 消</el-button>
          <el-button type="primary" @click="xinhuiCollectDownLoad">下 载</el-button>
        </div>
      </el-dialog>

    </template>

  </div>
</template>

<script>
  import {
    getTotalAndList,
    getTotalCommission,
    submitWithdraw,
    getAccountOption,
    submitServiceWithdraw,
    getQualityCommission,
    getProviderItem,
    downloadXinhuiCollect
  } from '@/modules/datacenter/api/commSettlement'
  import pagination from '@/components/pagination/index'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "commSettlement",
    mixins: [mixins],//混入
    components: {pagination},
    data() {
      return {
        loading: false,//页面加载
        subordinateName: '', //下级用户类型（名称）
        btnLoading: false, //按钮锁定
        searchLoading: false,//搜索锁定
        userType: '', //当前用户类型
        agentLevel: null, //代理等级
        searchForm: {
          month: '',
          startMonth: '',
          endMonth: '',
          payWay: '',
          commType: '',
          name: '',
          companyName: '',
        },//搜索条件
        payWayOptions: [
          {value: '1', label: '微信'},
          {value: '2', label: '支付宝'},
          {value: '3', label: '会员卡'},
        ],//支付渠道
        commOptions: [
          {value: '1', label: '比例模式'},
          {value: '2', label: '底价模式'},
        ],//结算选择
        //回显数据------------------
        commissionData: {
          totalCommissionAmount: 0,
          usedCommissionAmount: 0,
          validCommissionAmount: 0
        },

        cardData: {
          commission: 0, //佣金
          subCommission: 0, //下级佣金
          validAmount: 0, //金额
          validNumber: 0, //笔数
        }, //卡片数据
        subCommissionTableData: [], //列表数据
        subCommissionTabletotalElement: 0, //列表数据条数

        //---------------结算--------------------

        settleVisible: false,//创建用户模态框
        settLoading: false,
        accountOption: [],//运渠才有的账户下拉

        topSubmitSettle: {}, //服务商结算
        agentSubmitSettle: {
          companyId: '',
          userId: '',
          amount: '',
          companyAccountId: ''
        }, //运渠结算


        //下载报表
        downloadReportVisible: false,
        downloadType: 2,
        downloadReportForm: {
          date: []
        },

        //huixin
        xinhuiCollectVisible: false,
        //xinhuig
        xinhuiCollectForm: {
          days: []
        },
        DownloadRules: {
          company: [
            {required: true, message: '必须选择', trigger: ['blur', 'change']}
          ],
          payChannel: [
            {required: true, message: '必须选择支付通道', trigger: ['blur', 'change']}
          ],
          days: [
            {required: true, message: '必须选择时间段', trigger: ['blur', 'change']}
          ],

        },


        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,


      }
    },
    mounted: function () {
      /**
       *  服运渠类型获取  1服 2运 3渠 4推
       */
      this.userType = sessionStorage.getItem('userType') || null;


      console.log(this.userType);

      if (this.userType == null || this.userType === '0' || this.userType === '') {
        this.$message.error(`用户信息错误，尝试清除缓存后重新登入。(currentType:${this.userType})`);
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
        this.subordinateName = text || '' //下级名称赋值
      }

      //获取默认日期并设置
      this.setDefaultDays();

      //获取数据
      this.getList(1, 10);

      //佣金数据
      this.getTotalCommission();

      //获取用户类型
      this.getAgentType()

    },
    methods: {

      //信汇佣金统计
      xinhuiCollectDownLoadOpen: function () {
        // this.getOption();
        this.xinhuiCollectVisible = true
      },
      xinhuiCollectDownLoadClose: function () {
        this.xinhuiCollectVisible = false
      },
      xinhuiCollectDownLoad: function () {
        this.$refs['xinhuiCollectForm'].validate((valid) => {
          if (valid) {
            this.xinhuiCollectDownLoadSubmit()
          } else {
            this.$message.info('条件错误');
            return false;
          }
        });
      },
      xinhuiCollectDownLoadSubmit: function () {
        let form = JSON.parse(JSON.stringify(this.xinhuiCollectForm));
        let submitForm = {};
        submitForm.begin = form.days[0];
        submitForm.end = form.days[1];
        // submitForm.companyId = form.companyId;

        console.log(submitForm);
        downloadXinhuiCollect(submitForm).then(res => {
          let a = document.createElement('a');
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute("href", objectUrl);
          a.setAttribute("download", `${form.days[0].split(' ')[0]}至${form.days[1].split(' ')[0]}信汇佣金统计导出.xls`);
          a.click();
        }).catch(e => {

        })

      },

      /**
       * -------------------------------------预置通用-------------------------------------
       */

      getAgentType: function () {
        let myAgentLevel = sessionStorage.agentLevel;

        if (myAgentLevel === undefined || myAgentLevel == null || myAgentLevel === 'null') {
          this.agentLevel = '-1'
        }

        console.log(this.agentLevel)
      },


      //获取默认日期
      setDefaultDays: function () {
        let nowDayStamp = new Date(); //当前时间戳
        let monthStr = ''; //预置格式化时间变量  eg:2019-01
        console.log(nowDayStamp.getMonth());
        //需求只能查询上个月。  设置如果现在是1（实际值0）月，则年份减1，月份设12.
        if ((nowDayStamp.getMonth() - 1) < 0) {
          monthStr = (nowDayStamp.getFullYear() - 1) + '-12';
        } else {
          monthStr = nowDayStamp.getFullYear() + '-' + (nowDayStamp.getMonth() > 9 ? nowDayStamp.getMonth() : '0' + nowDayStamp.getMonth()); //只能查上个月，因此不+=1
        }
        // * 不同用户不同的搜索格式（日期）
        // if (this.userType === '3') {   //如果是3类用户，则日期选项变为S-E模式(start--end)
        //   this.searchForm.startMonth = monthStr;
        //   this.searchForm.endMonth = monthStr;
        // } else {
        //   this.searchForm.month = monthStr;
        // }

        this.searchForm.month = monthStr;
      },


      /**
       * -------------------------------------获取信息---------------------------------------------
       */
      submitSearch: function () {
        this.searchLoading = true; //锁定搜索
        this.$refs['subCommissionTable'].refresh()
      },

      //获取列表
      getList: function (pageNum, pageSize) {
        let month = this.searchForm.month;
        let companyName = this.searchForm.companyName;
        getTotalAndList(pageNum, pageSize, month, companyName).then(res => {
          let data = res.obj;
          this.dataEcho(data);
          setTimeout(() => {
            this.searchLoading = false; //锁定解锁
          }, 600);
        }).catch(e => {
          setTimeout(() => {
            this.searchLoading = false; //锁定解锁
          }, 600);
        })
      },


      /**
       * 获取佣金数据
       */
      getTotalCommission: function () {
        getTotalCommission().then(res => {
          let data = res.obj;
          this.commissionData = data
        }).catch(e => {

        })
      },

      //数据填充
      dataEcho: function (data) {
        let flowdata = data;

        //累计数据

        if (flowdata.data) {
          //卡片数据
          this.cardData.commission = flowdata.data.commission + '';//佣金
          this.cardData.subCommission = flowdata.data.subCommission + '';//下级佣金
          this.cardData.validAmount = flowdata.data.validAmount + '';//金额
          this.cardData.validNumber = flowdata.data.validNumber + '';//笔数
          //列表数据
          if (flowdata.data.subCommissionVOList) {
            this.subCommissionTableData = flowdata.data.subCommissionVOList; //列表
            this.subCommissionTabletotalElement = flowdata.totalElement //条数
          }
        }


      },

      /**
       * 下载选择日期模态框打开
       */
      downloadReportOpen: function (type) {
        this.downloadType = type //下载类型
        this.downloadReportVisible = true
      },
      /**
       * 下载选择日期模态框关闭
       */
      downloadReportClose: function () {
        this.downloadReportVisible = false
      },
      /**
       * 下载报表
       */
      downloadReport: function () {
        let date = JSON.parse(JSON.stringify(this.downloadReportForm.date));
        console.log(date);
        if (date === null || date.length < 2) {
          this.$message.error('还有日期未选择');
          return false
        }
        let type = this.downloadType
        getQualityCommission(date, type).then(res => {

          console.log(res);
          let a = document.createElement('a');
          let companyName = sessionStorage.getItem('name') || '';
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          let date = this.downloadReportForm.date;
          a.setAttribute("href", objectUrl);
          let title = ''

          // merchantType ： 2优质商户 3刷脸优质商户
          if (type === 2) { //判断类型
            title = '优质商户报表'
          } else if (type === 3) {
            title = '刷脸优质商户报表'
          }
          a.setAttribute("download", `${date[0]}到${date[1]}${title}`);
          a.click();

        }).catch(e => {

        })
      },


      /**
       * -------------------------------------数据处理（卡片与累计）---------------------------------
       */




      /**
       * -------------------------------------申请结算---------------------------------------------
       */

      /**
       * 申请结算 立刻结算 区分服务商和运渠
       */
      settleApply: function (type) {
        console.warn(type);
        if (type === 1) {
          //1  申请结算（服务商才能点击）
          this.createServiceSettleOpen()
        } else if (type === 2 || type === 3) {
          //2  申请结算（运渠才能点击）
          /** accountReg 用于接收当前用户的创建状态 true：已设置账户  false：未设置账户 */
          this.getAccountOption(); //结算账户下拉
          this.createSettleOpen() //创建结算模态框
        }
      },


      /**
       * -----------------------------------发起结算---------------------------------------------
       */


      /**
       * 服务商结算填写
       */
      createServiceSettleOpen: function () {
        this.$prompt('请输入结算金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入金额（仅允许非负数，最多两位小数）',
          closeOnClickModal: false,
          inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          inputErrorMessage: '金额格式不正确,仅允许非负数，最多两位小数'
        }).then(({value}) => {
          if (value) {
            this.submitServiceWithdraw(value)
          } else {
            this.$message.error('没有输入？')
          }
        }).catch(() => {

        });
      },
      /**
       * 服务商结算申请
       */
      submitServiceWithdraw: function (val) {
        submitServiceWithdraw(val).then(res => {
          this.$message.success(res.msg);
          this.getTotalCommission() //刷新首页数据
        }).catch(e => {

        })
      },


      /**
       * 获取账户下拉选项
       */
      getAccountOption: function () {
        let cid = sessionStorage.getItem('companyId');
        getAccountOption(cid).then(res => {
          let data = res.obj;
          this.accountOption = data
        }).catch(e => {

        })
      },

      /**
       * 运渠提交结算
       */
      submitWithdraw: function () {
        this.settLoading = true;
        this.agentSubmitSettle.companyId = sessionStorage.getItem('companyId');
        this.agentSubmitSettle.userId = sessionStorage.getItem('userId');
        //判断是否有userid和companyid
        if (this.agentSubmitSettle.companyId == null || this.agentSubmitSettle.userId == null) {
          this.$message.error('用户信息错误，无法申请！');

          setTimeout(() => {
            this.settLoading = false; //延后解锁
          }, 1000);

          return false
        }
        let form = this.deepCopy(this.agentSubmitSettle);

        submitWithdraw(form).then(res => {
          this.$message.success('申请提交成功！');
          this.createSettleClose();
          this.getTotalCommission(); //刷新首页数据
          setTimeout(() => {
            this.settLoading = false;
          }, 500);

        }).catch(e => {

          setTimeout(() => {
            this.settLoading = false;
          }, 500);

        })

      },

      /**
       * 运渠创建结算模态框打开
       */
      createSettleOpen: function () {
        this.settleVisible = true
      },

      /**
       * 运渠创建结算模态框关闭
       */
      createSettleClose: function () {
        this.settleVisible = false
      },

      /**
       * -----------------------------------公用工具和操作---------------------------------------------
       */


      goCreatePage: function () {
        this.$router.push({path: '/datacenter/views/settlementAccount', query: {mode: 'jump'}})
      },


    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $px5: 5px;

  /*public*/
  .block {
    display: inline-block;
    /*vertical-align: middle;*/
  }

  .padding-LR-medium {
    padding: 0 $px5;
  }

  .padding-TB-medium {
    padding: $px5 0;
  }

  /*private*/
  .search-bar {

    /*月份选择*/
    .half-month {
      width: 140px;
    }

    /*佣金信息*/
    .comm-info {
      cursor: default;
      padding: 0;
      float: right;
      height: 40px;
      line-height: 37px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .comm-money {
        margin-right: 15px;
        font-size: 18px;
        color: #3ebdff;
      }

      .comm-set {
        margin: 0;
      }
    }
  }

  /*卡片*/
  .card_group {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .card_item {
      width: 49.4%;
      margin: 20px 0 0 0;

      .tools_box {
        padding: 3px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .tools_img {
          width: 30%;
          text-align: left;
        }

        .tools_text {
          width: 70%;
          text-align: right;

          p {
            margin: 0;
            padding: 0;
            cursor: default;
          }

          p:nth-child(1) {
            font-size: 14px;
            color: #888;
          }

          p:nth-child(2) {
            padding: 5px 0 0 0;
            font-size: 26px;
            color: #3f3f3f;
          }
        }
      }
    }
  }

  .input-width {
    width: 217px;
    max-width: 100%;
  }

  .create-btn {
    float: right;
  }

  .commission-show {
    cursor: pointer;
  }

  .commission-table {

    tr {
      td:nth-child(1) {
        width: 100px;
      }
    }
  }

</style>
