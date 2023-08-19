<template>
  <div class="app-container" v-loading="loading">
    <!--操作区-->
    <div class="tools-bar">
      <el-input v-model.trim="searchForm.name" clearable="" placeholder="按公司名搜索" class="search-input"
                size="small"></el-input>
      <el-input v-model.trim="searchForm.contact" clearable="" placeholder="按联系人搜索" class="search-input"
                size="small"></el-input>
      <div class="block left-spacing">
        <el-button type="primary" size="small" @click="listRefresh">查 询</el-button>
        <el-button type="primary" size="small" @click="addOperatorOpen">推荐代理</el-button>
        <el-button type="primary" size="small" @click="invitationOpen">邀请代理</el-button>
        <el-button type="primary" size="small" @click="applyUpOpen">申请升级</el-button>
      </div>
    </div>

    <!--列表-->
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
            prop="createTime"
            label="推荐期限">
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
              <el-button type="text" :disabled="scope.row.status==3||scope.row.status==2"
                         @click="modifyOperatorOpen(scope.row)">修改
              </el-button>
              <el-button type="text" :disabled="scope.row.status==3" @click="logicalDel(scope.row)">删除</el-button>
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
      <!--推荐代理-->
       <el-dialog
    :close-on-click-modal="false"
        title="新增代理"
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

            <el-form-item label="代理级别：" prop="agentLevel">
              <el-select v-model="addOperatorForm.agentLevel" placeholder="请选择代理级别" class="formItem">
                <!--item.value>currentLevel  只能添加下级-->
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
      <!--编辑重新提交-->
       <el-dialog
    :close-on-click-modal="false"
        title="编辑代理"
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
    <el-button type="primary" @click="modifyOperatorBefore" :loading="modifyBtnLoading">保存并重新提交审核</el-button>
  </span>
      </el-dialog>

      <!--申请升级-->
       <el-dialog
    :close-on-click-modal="false"
        title="申请升级"
        :visible.sync="applyUpVisible"
        width="574px"
        :before-close="applyUpClose">

        <div class="apply-content">

          <div class="line-tr">
            <div class="line-td">
              当前级别：{{upInfo.levelName||'未知'}}
            </div>
            <div class="line-td">
              当前底价：{{(upInfo.feeRate*100).toFixed(2)||0}}&nbsp%
            </div>
          </div>

          <div class="line-tr">
            <div class="line-td">
              申请级别：
              <el-select v-model="upInfoForm.agentLevel" @change="showFee"
                         v-if="upInfoSelectItem.length>0"
                         size="small" style="width: 130px"
                         placeholder="请选择新级别">
                <el-option
                  v-for="item in upInfoSelectItem"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <span v-else>已最高级别</span>
            </div>
            <div class="line-td">
              <span v-if="upInfoFormFeeShow">升级后底价：{{upInfoFormFeeShow}}&nbsp%</span>
            </div>
          </div>


        </div>

        <span slot="footer" class="dialog-footer">
    <el-button @click="applyUpClose">取 消</el-button>
    <el-button type="primary"
               :loading="saveBtnLoading"
               @click="submitUpInfo"
               v-if="upInfoSelectItem.length>0">提交申请</el-button>
  </span>
      </el-dialog>

      <!--邀请代理-->
       <el-dialog
    :close-on-click-modal="false"
        title="邀请代理"
        :visible.sync="invitationVisible"
        width="600px"
        :before-close="invitationClose">
        <div class="qr-box">
          <div class="qr-content">

            <img v-if="invQRimg" :src="invQRimg" alt="二维码" title="右键下载二维码">
            <canvas v-else id="invcode"></canvas>
          </div>
          <el-divider><i class="el-icon-link"></i></el-divider>
          <div class="url-input">
            <!--url 是被复制对象的id-->
            <el-input :value="invAllURL" id="url">
              <!--data-clipboard-target="#url" 表示将要复制url-->
              <el-button type="primary" slot="append" id="copyurl" @click="copyURL" data-clipboard-target="#url">复制链接
              </el-button>
            </el-input>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
    <el-button @click="invitationClose">关 闭</el-button>
  </span>
      </el-dialog>

      <!--详情-->
      <agentdetail  ref="agentdetailspage"></agentdetail>

    </div>


  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import pagination from '@/components/pagination/index'
  import {
    getList,
    saveAgent,
    getAgentLevel,
    getUpInfo,
    saveLevel,
    logicalDel,
    getQRimg,
    modifyAgent
  } from '../api/teamList' //接口
  import QRCode from 'qrcode'
  import Clipboard from 'clipboard'; //复制
  import {url} from '@/utils/request'

  import agentdetail from '@/components/agentDetails/views/agentDetail' //详情

  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "teamList",
    mixins:[mixins],//混入
    components: {pagination, agentdetail},
    data() {
      return {
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

        loading: false,

        //当前等级
        currentLevel: '',
        //搜索
        searchForm: {
          name: '',
          contact: '',
        },

        //级别选项
        levelOption: [],

        //表格
        listData: [],
        listDataTotalElement: 0,

        //推荐代理
        addOperatorDialogVisible: false,
        OperatorFormRules: {},
        addOperatorForm: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          userId: '',//推荐人id
          agentLevel: '',//代理级别
        },
        saveBtnLoading: false,

        //编辑代理
        modifyOperatorDialogVisible: false,
        modifyOperatorForm: {
          id: '',
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          userId: '',//推荐人id
          agentLevel: '',//代理级别
        },
        modifyBtnLoading: false,


        //申请升级
        applyUpVisible: false,
        upInfo: {}, //回显信息
        upInfoSelectItem: [],
        upInfoForm: {
          agentLevel: ''
        },
        upInfoFormFeeShow: 0,


        //邀请代理
        invitationVisible: false,
        invBaseURL: window.location.protocol + "//" + window.location.host + "/web/agent/index.html#/regagent",
        invAllURL: '',
        invQRimg: null,



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
      //获取我的等级
      this.currentLevel = sessionStorage.getItem('agentLevel') || 0;
      //获取推荐人id
      this.addOperatorForm.userId = sessionStorage.userId;
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
       * 获取团队列表
       */
      getList: function (pageNumber, pageSize) {
        let form = this.searchForm;
        getList(pageNumber, pageSize, form).then(res => {
          let data = res.obj;
          this.listData = data.data;
          this.listDataTotalElement = data.totalElement
        }).catch(e => {

        })
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
        this.addOperatorForm.userId = sessionStorage.userId; //重新赋值推荐人id
        this.addOperatorDialogVisible = false
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
        saveAgent(form).then(res => {
          this.$message.success('保存成功，请等待审核。');
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
        this.modifyDataReview(row);
        this.modifyOperatorDialogVisible = true
      },

      /**
       * 数据回显
       */
      modifyDataReview: function (row) {

        this.modifyOperatorForm.id = row.id;
        this.modifyOperatorForm.name = row.name;
        this.modifyOperatorForm.contact = row.contact;
        this.modifyOperatorForm.phone = row.phone;
        this.modifyOperatorForm.province = row.province;
        this.getProv(row.province); //生成城市数据
        this.modifyOperatorForm.city = row.city;
        this.modifyOperatorForm.address = row.address;
        this.modifyOperatorForm.agentLevel = row.agentLevel + '';

      },
      /**
       * 关闭编辑
       */
      modifyOperatorClose: function () {
        this.$refs['modifyOperatorForm'].resetFields();
        this.modifyOperatorForm.userId = sessionStorage.userId; //重新赋值推荐人id
        this.modifyOperatorDialogVisible = false
      },
      /**
       * 发起编辑和重新提交
       */
      modifyOperatorBefore: function () {
        this.modifyOperator()
      },
      modifyOperator: function () {
        let form;
        form = this.deepCopy(this.modifyOperatorForm);
        form.status = 2; //待审核模式
        this.modifyBtnLoading = true; //锁定按钮
        modifyAgent(form).then(res => {

          this.$message.success('修改成功，请等待审核。');

          this.modifyOperatorClose()

          this.listRefresh();

          setTimeout(() => {
            this.modifyBtnLoading = false
          }, 500)

        }).catch(e => {
          this.modifyBtnLoading = false
        })
      },
      /**
       * 打开申请升级
       */
      applyUpOpen: function () {
        this.getUpInfo();
        this.applyUpVisible = true
      },
      /**
       * 关闭申请升级
       */
      applyUpClose: function () {
        this.upInfoSelectItem = [];
        this.upInfo = {};
        this.upInfoFormFeeShow = 0;
        this.upInfoForm.agentLevel = '';
        this.applyUpVisible = false
      },
      /**
       * 申请获取回显信息
       */
      getUpInfo: function () {
        getUpInfo().then(res => {
          let data = res.obj;
          this.upInfo = data;
          this.upInfoSelectItem = data.selectItems
        }).catch(e => {

        })
      },
      /**
       * 显示当前选择的数据的费率
       */
      showFee: function (val) {
        console.log(val);
        let items = this.deepCopy(this.upInfoSelectItem);
        for (let i in items) {
          if (items[i].value == val) {
            this.upInfoFormFeeShow = (items[i].feeRate * 100).toFixed(2)
          }
        }
      },
      /**
       * 发起提交申请
       */
      submitUpInfo: function () {
        let form = this.deepCopy(this.upInfoForm);

        if (form.agentLevel === '' || form.agentLevel == null) {
          this.$message.error(`还未选择申请级别`);
          return
        }

        console.log(form);
        this.saveBtnLoading = true;
        saveLevel(form).then(res => {
          this.$message.success('成功提交申请，请耐心等待审核。');
          this.applyUpClose();
          setTimeout(() => {
            this.saveBtnLoading = false
          }, 500)
        }).catch(e => {
          this.saveBtnLoading = false
        })

      },
      /**
       * 注销
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
       * 邀请代理模态框
       */
      invitationClose: function () {
        this.invitationVisible = false
      },
      /**
       * 邀请代理模态框打开
       */
      invitationOpen: function () {
        this.invitationVisible = true;

        let companyId = sessionStorage.userId;  //获取邀请人id
        let companyName = sessionStorage.name;  //获取邀请人昵称
        this.invAllURL = `${this.invBaseURL}?cid=${companyId}&cname=${companyName}`; //组合URL参数

        //换取图片
        this.getQRimg(this.invAllURL)


      },
      /**
       * 链接换图片
       */
      getQRimg: function (path) {
        getQRimg(path).then(res => {
          let imgURL = `${url}/resource/${res.obj}`;
          this.invQRimg = imgURL
        }).catch(e => {
          this.canvasQR();
          this.$message.info('带有图案的二维码获取失败，已自动生成简单二维码。');
          this.invQRimg = null
        })
      },
      /**
       * 图片失败后，直接绘制二维码
       */
      canvasQR: function () {
        setTimeout(() => {
          let url = this.invAllURL; //URL赋值
          let qrCanvas = document.getElementById('invcode');
          // 将获取到的url画到canvas上
          QRCode.toCanvas(qrCanvas, url, function (error) {
            if (error) {
              console.log(error)
            }
          })
        }, Math.random().toFixed(2) * 300 + 100)
      },
      /**
       * 复制链接
       */
      copyURL: function () {
        var clipboard = new Clipboard('#copyurl');
        //#copyurl 按钮绑定id

        clipboard.on('success', e => {
          this.$message.success("邀请链接复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
          // 释放内存
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动制');
          // 释放内存
          clipboard.destroy()
        })
      },
      /**
       * 详情关闭
       */
      agentDetailClose: function () {
        this.agentDetailVisible = false
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
    },
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

  .apply-content {

    .line-tr {
      width: 100%;
      max-width: 100%;
      height: 50px;
      padding: 10px;

      .line-td {
        padding: 0 10px;
        display: inline-block;
        width: 48%;
        height: 50px;
      }
    }

  }

  /*二维码*/
  .qr-box {
    .qr-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      /*#invcode {*/
      /*width: 200px !important;*/
      /*height: 200px !important;*/
      /*}*/


    }

    .url-input {
      margin-top: 30px;
    }

  }



</style>
