<template>
  <div class="app-container" v-loading="loading">
    <!--操作区-->
    <div class="tools-bar">
      <el-input v-model.trim="searchForm.name" clearable="" placeholder="按公司名搜索" class="search-input"
                size="small"></el-input>
      <el-input v-model.trim="searchForm.contact" clearable="" placeholder="按联系人搜索" class="search-input"
                size="small"></el-input>
      <el-select v-model="searchForm.status" placeholder="按状态查询" clearable="" class="search-select" size="small">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="block left-spacing">
        <el-button type="primary" size="small" @click="listRefresh">查询</el-button>
        <el-button type="primary" size="small" @click="levelSetingDialogOpen">级别配置</el-button>
        <el-button type="primary" size="small" @click="addOperatorOpen">新增{{agentName}}</el-button>
      </div>
    </div>

    <!--表格-->
    <div class="table-box">
      <template>
        <el-table
          :data="listData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="公司"
            width="180">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            label="推荐人">
            <template slot-scope="scope">
              <span>{{scope.row.referralsName||`无`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="agentLevelName"
            label="运营商级别">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <template v-if="scope.row.status===1">未启用</template>
              <template v-else-if="scope.row.status===2">待审核</template>
              <template v-else-if="scope.row.status===3">已签约</template>
              <template v-else-if="scope.row.status===4">过期</template>
              <template v-else-if="scope.row.status===5">注销</template>
              <template v-else-if="scope.row.status===6">被驳回</template>
              <template v-else>--</template>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="agentDetailOpen(scope.row)">详情</el-button>
              <el-button type="text" @click="modifyOperatorOpen(scope.row)">修改</el-button>
              <el-button type="text" @click="logicalDel(scope.row)">
                <template v-if="scope.row.status===3">注销</template>
                <template v-else>删除</template>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="listDataTotalElement"
          :change-callback="getList"
          ref="page"></pagination>
      </template>
    </div>

    <!--模态框-->
    <div class="diy-dialog">

      <div>
        <!--级别配置-->
         <el-dialog
    :close-on-click-modal="false"
          title="级别配置"
          :visible.sync="levelSetingDialogVisible"
          width="576px"
          :before-close="levelSetingDialogClose">
          <div>
            <table class="agent-fee-table">
              <tr>
                <th>层级</th>
                <th>代理别名</th>
                <th>结算费率</th>
              </tr>
              <tr>
                <td>一级代理</td>
                <td>
                  <el-input v-model.trim="levelSetingForm.levelOneName" placeholder="代理别名" class="fee-input"></el-input>
                </td>
                <td>
                  <el-input-number v-model="levelSetingForm.levelOneFeeRate" class="fee-num-input"
                                   :min="0.01" :max="100" :precision="2" :step="0.01"
                                   label="费率"></el-input-number>
                  &nbsp%
                </td>
              </tr>

              <tr>
                <td>二级代理</td>
                <td>
                  <el-input v-model.trim="levelSetingForm.levelTwoName" placeholder="代理别名" class="fee-input"></el-input>
                </td>
                <td>
                  <el-input-number v-model="levelSetingForm.levelTwoFeeRate" class="fee-num-input"
                                   :min="0.01" :max="100" :precision="2" :step="0.01"
                                   label="费率"></el-input-number>
                  &nbsp%
                </td>
              </tr>

              <tr>
                <td>三级代理</td>
                <td>
                  <el-input v-model.trim="levelSetingForm.levelThreeName" placeholder="代理别名" class="fee-input"></el-input>
                </td>
                <td>
                  <el-input-number v-model="levelSetingForm.levelThreeFeeRate" class="fee-num-input"
                                   :min="0.01" :max="100" :precision="2" :step="0.01"
                                   label="费率"></el-input-number>
                  &nbsp%
                </td>
              </tr>
            </table>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="levelSetingDialogClose">取 消</el-button>
    <el-button type="primary" @click="saveLevelConfigBefore" :loading="saveBtnLoading">提 交</el-button>
  </span>
        </el-dialog>
        <!--新增运营商-->
         <el-dialog
    :close-on-click-modal="false"
          :title="'新增'+agentName"
          :visible.sync="addOperatorDialogVisible"
          width="576px"
          :before-close="addOperatorClose">
          <div>
            <el-form :model="addOperatorForm" size="small" :rules="OperatorFormRules" ref="addOperatorForm"
                     label-width="180px">
              <el-form-item label="公司/个人：" show-message prop="name">
                <el-input v-model.trim="addOperatorForm.name" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="联系人：" show-message prop="contact">
                <el-input v-model.trim="addOperatorForm.contact" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="手机：" show-message prop="phone">
                <el-input v-model.trim="addOperatorForm.phone" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="省份：" prop="province">
                <el-select v-model="addOperatorForm.province" placeholder="请选择省份"
                           size="small" class="formItem"
                           @change="getProv($event)">
                  <el-option :value="n"
                             :key="index"
                             :label="n"
                             v-for="(n,index) in dataProv[0]['prov']">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="城市：" prop="city">
                <el-select v-model="addOperatorForm.city" placeholder="请选择城市"
                           size="small" class="formItem"
                           @click="getCity($event)">
                  <el-option :value="n"
                             :key="index"
                             :label="n"
                             v-for="(n,index) in dataCity">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系地址：" show-message prop="address">
                <el-input v-model.trim="addOperatorForm.address" class="form-input"></el-input>
              </el-form-item>

              <el-form-item label="推荐人：" prop="referralsId">
                <el-select
                  v-model.trim="addOperatorForm.referralsId"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入推荐人关键词"
                  :remote-method="searchReferrals">
                  <el-option
                    v-for="item in referralsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="代理级别：" prop="agentLevel">
                <el-select v-model="addOperatorForm.agentLevel" placeholder="请选择代理级别" class="formItem">
                  <el-option
                    v-for="item in levelOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="addOperatorClose">取 消</el-button>
    <el-button type="primary" @click="saveOperatorBefore" :loading="saveBtnLoading">确 定</el-button>
  </span>
        </el-dialog>
        <!--修改运营商-->
         <el-dialog
    :close-on-click-modal="false"
          :title="'编辑'+agentName"
          :visible.sync="modifyOperatorDialogVisible"
          width="576px"
          :before-close="modifyOperatorClose">
          <div>
            <el-form :model="modifyOperatorForm" size="small" :rules="OperatorFormRules" ref="modifyOperatorForm"
                     label-width="180px">
              <el-form-item label="公司/个人：" show-message prop="name">
                <el-input v-model.trim="modifyOperatorForm.name" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="联系人：" show-message prop="contact">
                <el-input v-model.trim="modifyOperatorForm.contact" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="手机：" show-message prop="phone">
                <el-input v-model.trim="modifyOperatorForm.phone" :disabled="true" class="form-input"></el-input>
              </el-form-item>
              <el-form-item label="省份：" prop="province">
                <el-select v-model="modifyOperatorForm.province" placeholder="请选择省份"
                           size="small" class="formItem"
                           @change="getProv($event)">
                  <el-option :value="n"
                             :key="index"
                             :label="n"
                             v-for="(n,index) in dataProv[0]['prov']">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="城市：" prop="city">
                <el-select v-model="modifyOperatorForm.city" placeholder="请选择城市"
                           size="small" class="formItem"
                           @click="getCity($event)">
                  <el-option :value="n"
                             :key="index"
                             :label="n"
                             v-for="(n,index) in dataCity">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系地址：" show-message prop="address">
                <el-input v-model.trim="modifyOperatorForm.address" class="form-input"></el-input>
              </el-form-item>

              <el-form-item label="推荐人：" prop="referralsId">

                <el-select
                  v-model.trim="modifyOperatorForm.referralsId"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入推荐人关键词"
                  :disabled="true"
                  :remote-method="searchReferrals">
                  <el-option
                    v-for="item in referralsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>

              </el-form-item>

              <el-form-item label="代理级别：" prop="agentLevel">
                <el-select v-model="modifyOperatorForm.agentLevel" placeholder="请选择代理级别" class="formItem">
                  <el-option
                    v-for="item in levelOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="modifyOperatorClose">取 消</el-button>
    <el-button type="primary" @click="updateOperatorBefore" :loading="saveBtnLoading">确 定</el-button>
  </span>
        </el-dialog>
        <!--详情-->
        <agentdetail  ref="agentdetailspage"></agentdetail>
      </div>
    </div>
  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import pagination from '@/components/pagination/index'

  import {
    getAgentLevel,
    getProviderValueByLikeSearch,
    logicalDel,
  } from '../api/publicAPI' //公共接口

  import {
    saveRetail,
    modifyRetail,
    getList,
    getLevelConfig,
    saveLevelConfig
  } from '../api/operatorList' //本页接口
  import {mixins} from "../../../components/mixins/mixins";
  import agentdetail from '@/components/agentDetails/views/agentDetail' //详情

  export default {
    name: "operatorList",
    mixins:[mixins],
    components: {pagination,agentdetail},
    data() {
      return {
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
        //load
        loading: false,
        //搜索与工具
        searchForm: {
          name: '',
          contact: '',
          status: '',
        },
        statusOption: [
          {value: 1, name: '未启用'}, {value: 2, name: '待审核'},
          {value: 3, name: '已签约'}
        ],

        //级别选项
        levelOption: [],

        //表格
        listData: [],
        listDataTotalElement: 0,

        //级别配置模态框
        levelSetingDialogVisible: false,
        levelSetingForm: {
          id: '',
          levelOneFeeRate: 0,
          levelOneName: '',
          levelThreeFeeRate: 0,
          levelThreeName: '',
          levelTwoFeeRate: 0,
          levelTwoName: '',
          serviceProviderId: '',
        },

        //新增运营商
        addOperatorDialogVisible: false,
        addOperatorForm: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          referralsId: '',//推荐人id
          agentLevel: '',//代理级别
        },
        referralsOption: [],//推荐人列表
        OperatorFormRules: {},//新增校验
        saveBtnLoading: false,

        //修改运营商
        modifyOperatorDialogVisible: false,
        modifyOperatorForm: {
          id: '',
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          referralsId: '',//推荐人id
          agentLevel: '',//代理级别
        },
        modifyBtnLoading: false,

        //城市
        //省市联动--------------------------
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        dialogForm: {
          name: '',
          selectProv: '',
          selectCity: '',
          selectCountry: '',
          mark: ''
        },
        selectItems: [],
      }
    },
    mounted() {
      //获取等级选项
      this.getAgentLevel();
      //获取列表
      this.getList(1, 10)
    },

    methods: {
      /**
       * 获取级别
       */
      getAgentLevel: function () {
        getAgentLevel().then(res => {
          let data = res.obj;
          this.levelOption = data
        }).catch(e => {

        })
      },

      /**
       * 获取列表
       */
      getList: function (pageNumber, pageSize) {
        let form = this.searchForm;
        getList(pageNumber, pageSize, form).then(res => {
          let data = res.obj;
          this.listData = data.content;
          this.listDataTotalElement = data.totalElements
        }).catch(e => {

        })
      },


      /**
       * 打开级别配置模态框
       */
      levelSetingDialogOpen: function () {
        this.getLevelConfig();
        this.levelSetingDialogVisible = true
      },

      /**
       * 关闭级别配置模态框
       */
      levelSetingDialogClose: function () {
        this.clearLevelConfigForm();
        this.levelSetingDialogVisible = false
      },

      /**
       * 获取设置
       */
      getLevelConfig: function () {
        getLevelConfig().then(res => {
          let data = res.obj;
          this.levelSetingForm.id = data.id;

          this.levelSetingForm.levelOneFeeRate = data.levelOneFeeRate * 100;
          this.levelSetingForm.levelOneName = data.levelOneName;

          this.levelSetingForm.levelTwoFeeRate = data.levelTwoFeeRate * 100;
          this.levelSetingForm.levelTwoName = data.levelTwoName;

          this.levelSetingForm.levelThreeFeeRate = data.levelThreeFeeRate * 100;
          this.levelSetingForm.levelThreeName = data.levelThreeName;

          this.levelSetingForm.serviceProviderId = data.serviceProviderId

        }).catch(e => {

        })
      },

      /**
       * 保存配置
       */
      saveLevelConfigBefore: function () {
        this.saveLevelConfig()
      },
      saveLevelConfig: function () {
        let form = this.deepCopy(this.levelSetingForm);

        if (form.id == null || form.id === '' || JSON.stringify(form.id) == "{}") {
          delete form.id
        }

        if (form.serviceProviderId == null || form.serviceProviderId == '' || JSON.stringify(form.serviceProviderId) == "{}") {
          delete form.serviceProviderId
        }

        let flag = true;
        for (let key in form) {
          if (form[key] == null || form[key] === '') {
            this.$message.error('还有内容未填写');
            flag = false;
            break;
          }
        }

        if (flag) {
          //继续

          form.levelOneFeeRate = (form.levelOneFeeRate / 100).toFixed(4);
          form.levelTwoFeeRate = (form.levelTwoFeeRate / 100).toFixed(4);
          form.levelThreeFeeRate = (form.levelThreeFeeRate / 100).toFixed(4);

          console.log(form);
          this.saveBtnLoading = true;
          saveLevelConfig(form).then(res => {
            this.$message.success('修改成功');
            setTimeout(() => {
              this.saveBtnLoading = false
            }, 1000);
            this.listRefresh();
            this.levelSetingDialogClose();
          }).catch(e => {
            this.saveBtnLoading = false
          })
        }

      },
      clearLevelConfigForm: function () {
        this.levelSetingForm.id = '';

        this.levelSetingForm.levelOneFeeRate = 0;
        this.levelSetingForm.levelOneName = '';

        this.levelSetingForm.levelTwoFeeRate = 0;
        this.levelSetingForm.levelTwoName = '';

        this.levelSetingForm.levelThreeFeeRate = 0;
        this.levelSetingForm.levelThreeName = '';

        this.levelSetingForm.serviceProviderId = ''
      },


      /**
       * 打开新增
       */
      addOperatorOpen: function () {
        this.addOperatorDialogVisible = true
      },

      /**
       * 关闭新增
       */
      addOperatorClose: function () {
        this.$refs['addOperatorForm'].resetFields();
        this.addOperatorDialogVisible = false
      },

      /**
       * 新增推荐
       */
      searchReferrals(query) {
        if (query !== '') {
          getProviderValueByLikeSearch(query).then(res => {
            let data = res.obj;
            // this.referralsOption = data;
            this.referralsOption = data.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }).catch(e => {

          })
        } else {
          this.referralsOption = [];
        }
      },

      /**
       * 发起保存
       */
      saveOperatorBefore: function () {
        this.saveOperator()
      },
      saveOperator: function () {
        let form;
        form = this.deepCopy(this.addOperatorForm);
        this.saveBtnLoading = true; //锁定按钮
        saveRetail(form).then(res => {
          this.$message.success('保存成功');
          this.listRefresh();
          this.addOperatorClose(); //调用模态框关闭
          setTimeout(() => {
            this.saveBtnLoading = false //解锁
          }, 500)
        }).catch(e => {
          this.saveBtnLoading = false //解锁
        })
      },

      /**
       * 打开编辑
       */
      modifyOperatorOpen: function (row) {
        if (row) {
          this.modifyOperatorForm.id = row.id;
          this.modifyOperatorForm.name = row.name;
          this.modifyOperatorForm.contact = row.contact;
          this.modifyOperatorForm.phone = row.phone;
          this.modifyOperatorForm.province = row.province;
          if (row.province) {
            this.getProv(row.province);
            setTimeout(() => {
              this.modifyOperatorForm.city = row.city;
            }, 100)
          }
          this.modifyOperatorForm.address = row.address;
          this.modifyOperatorForm.referralsId = row.referralsId || '';
          this.modifyOperatorForm.agentLevel = row.agentLevel + '';

          if (row.referralsName !== '' && row.referralsName != null) {
            this.searchReferrals(row.referralsName)
          }

          this.modifyOperatorDialogVisible = true

        } else {

          this.$message.error('什么都没有？')
        }

      },

      /**
       * 关闭编辑
       */
      modifyOperatorClose: function () {
        this.$refs['modifyOperatorForm'].resetFields();
        this.modifyOperatorForm.id = ''; //二次确认清除id
        this.modifyOperatorDialogVisible = false
      },
      /**
       * 发起编辑保存
       */
      updateOperatorBefore: function () {
        this.updateOperator()
      },
      updateOperator: function () {
        let form;
        form = this.deepCopy(this.modifyOperatorForm);
        delete form.phone;

        this.saveBtnLoading = true; //锁定按钮
        modifyRetail(form).then(res => {
          this.$message.success('保存成功');
          this.listRefresh();
          this.modifyOperatorClose(); //调用模态框关闭
          setTimeout(() => {
            this.saveBtnLoading = false //解锁
          }, 500)
        }).catch(e => {
          this.saveBtnLoading = false //解锁
        })
      },

      /**
       * 注销或删除
       */
      logicalDel: function (row) {
        let id;
        let status;
        let tipsTxt = '注销';
        status = row.status;
        id = row.id;
        if (status === 3) {
          tipsTxt = "注销"
        } else {
          tipsTxt = "删除"
        }
        this.$confirm(`确认${tipsTxt}?`, '重要操作', {
          confirmButtonText: tipsTxt,
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          logicalDel(id).then(res => {
            this.$message({
              type: 'success',
              message: `${tipsTxt}完成，将刷新页面`
            });
            this.listRefresh()

          }).catch(e => {

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });

      },
      /**
       * 详情打开
       */
      agentDetailOpen: function (row) {
        //子组件打开
        this.$refs.agentdetailspage.agentDetailOpen(row);
      },

      /**
       * 刷新列表
       */
      listRefresh: function () {
        this.$refs['page'].refresh()
      },


      /**
       * 工具-----------------------------------------------
       */
      //省市
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        this.dialogForm.selectCity = this.dataCity[0];
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0];
        this.addOperatorForm.city = '';
        this.modifyOperatorForm.city = '';
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0]
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*工具条*/
  .tools-bar {

    /*搜索表单*/
    .block {
      display: inline-block;
      vertical-align: middle;
    }

    .left-spacing {
      margin-left: 10px;
    }

    .search-input {
      width: 275px;
      max-width: 100%;

      display: inline-block;
      vertical-align: middle;
    }

    .search-select {
      width: 180px;
      max-width: 100%;

      display: inline-block;
      vertical-align: middle;
    }
  }

  /*表格*/
  .table-box {

  }

  /*模态框*/
  .diy-dialog {

    .form-input {
      width: 215px;

    }
  }

  .agent-fee-table {
    width: 100%;

    tr {
      height: 50px;
      width: 100%;

      th:nth-child(1) {
        width: 20%;
      }

      th:nth-child(2) {
        width: 40%;
      }

      th:nth-child(3) {
        width: 40%;
      }

      td:nth-child(1) {
        text-align: center;

      }

      .fee-input {
        width: 100%;
        max-width: 100%;
      }

      .fee-num-input {
        width: 90%;
        max-width: 100%;
      }
    }
  }

</style>
