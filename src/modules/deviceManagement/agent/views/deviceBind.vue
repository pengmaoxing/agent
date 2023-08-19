<template>
  <div class="app-container" v-loading="loading">
    <!--搜索和工具条-->
    <div divName="搜索和工具" class="search-tools-bar">
      <!--搜索-->
      <template>
        <!--按设备型号-->
        <el-select v-model="deviceSearchForm.deviceModel" clearable placeholder="按设备型号">
          <el-option
            v-for="item in deviceModelOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <!--按设备状态-->
        <el-select v-model="deviceSearchForm.status" clearable placeholder="按设备状态">
          <!--<el-option label="服务商库存" value="1"></el-option>-->
          <el-option label="运营商库存" value="2"></el-option>
          <el-option label="使用中" value="3"></el-option>
        </el-select>

        <!--按设备SN-->
        <el-input v-model.trim="deviceSearchForm.deviceSN" clearable placeholder="按设备SN"
                  class="search-input"></el-input>

        <el-button type="primary" @click="refreshDeviceList">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>


      </template>
    </div>

    <!--卡片-->
    <div divName="统计卡片" class="card_group">

      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="@/assets/images/deviceManagement/设备总数.png" title="设备总数" alt="设备总数">
            </div>
            <div class="tools_text">
              <p>设备总数</p>
              <p>{{deviceNumTotal.deviceNums||'无'}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="@/assets/images/deviceManagement/使用中设备数.png" title="使用中设备数" alt="使用中设备数">
            </div>
            <div class="tools_text">
              <p>使用中设备数</p>
              <p>{{deviceNumTotal.useDevice||'无'}}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!--分割线-->
    <el-divider divName="分割线" content-position="left">设备列表</el-divider>

    <!--设备列表-->
    <div divName="设备列表">
      <template>
        <el-table
          :data="deviceListData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="deviceModel"
            label="设备型号"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="deviceSN"
            label="设备SN"
            :show-overflow-tooltip="true">
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="deviceBelongName"-->
          <!--label="设备归属"-->
          <!--:show-overflow-tooltip="true">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="deviceBindName"
            label="已绑定商户名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="设备状态">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="modifyDeviceOpen(scope.row)">修改</el-button>

              <el-button size="small" type="text"
                         :disabled="scope.row.status==3"
                         @click="returnDeviceBefore(scope.row)">设备退回
              </el-button>
              <el-button size="small" type="text"
                         :disabled="scope.row.status==3"
                         @click="deviceBindOpen(scope.row)">设备绑定
              </el-button>
              <el-button size="small" type="text"
                         :disabled="scope.row.status==2"
                         @click="unbindDeviceBefore(scope.row)">设备解绑
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total-elements="deviceListDataTotalElement"
          :change-callback="getDeviceList"
          ref="page"></pagination>

      </template>

    </div>


    <!--模态框-->
    <template>
      <!--设备修改-->
       <el-dialog
    :close-on-click-modal="false"
        title="设备修改"
        :visible.sync="modifyDeviceVisible"
        width="580px"
        :before-close="modifyDeviceClose">

        <div class="device-entry">
          <el-form :inline="true" :model="modifyDeviceForm" ref="modifyDeviceForm"
                   :rules="deviceRules" label-suffix=":">

            <el-form-item label="型号" prop="deviceModel">
              <el-select v-model="modifyDeviceForm.deviceModel" class="input-width" placeholder="请选择设备型号">
                <el-option
                  v-for="item in deviceModelOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="SN" prop="deviceSN">
              <el-input v-model.trim="modifyDeviceForm.deviceSN" class="input-width"
                        @keyup.enter.native="saveDeviceBefore"
                        placeholder="请输入设备SN码"></el-input>
            </el-form-item>
          </el-form>

          <div>

          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyDeviceClose">取 消</el-button>
          <el-button @click="modifyDeviceBefore" type="primary" :loading="modifyBtnLoading">保 存</el-button>
        </span>
      </el-dialog>

      <!--设备绑定-->
       <el-dialog
    :close-on-click-modal="false"
        title="设备绑定至商户"
        :visible.sync="deviceBindVisible"
        width="500px"
        :before-close="deviceBindClose">
        <div>
          <el-form :inline="true" :model="deviceBindForm"
                   ref="deviceBindForm" class="demo-form-inline"
                   label-suffix="：">
            <el-form-item label="绑定至" prop="merchantId">
              <el-select v-model="deviceBindForm.merchantId"
                         placeholder="名称或手机号模糊查询"
                         filterable
                         remote
                         reserve-keyword
                         clearable
                         :remote-method="getMerchant">
                <el-option
                  v-for="item in merchantOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         :disabled="deviceBindForm.merchantId===''"
                         :loading="deviceBindBtnLoading"
                         @click="bindDevice">绑定
              </el-button>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deviceBindClose">关 闭</el-button>
  </span>
      </el-dialog>
    </template>


  </div>
</template>

<script>
  import {
    getDeviceList,
    modifyDevice,
    getDeviceModel,
    returnDevice,
    getMerchant,
    bindDevice,
    unbindDevice
  } from '../api/deviceBind'
  import pagination from '@/components/pagination/index'
  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: "deviceBind",
    mixins:[mixins],
    components: {pagination},
    data() {
      return {
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
        //页面加载
        loading: true,

        //搜索
        deviceSearchForm: {
          deviceModel: '', //设备型号
          deviceSN: '',//设备sn码
          status: '',//设备状态
        },

        //搜索配套
        deviceModelOptions: [], //型号列表

        //统计数据
        deviceNumTotal: {
          deviceNums: 0,
          useDevice: 0,
        },

        //列表
        deviceListData: [],
        deviceListDataTotalElement: 0,

        //设备修改
        modifyDeviceVisible: false, //模态框
        modifyBtnLoading: false,//提交按钮锁定
        modifyDeviceForm: {
          id: '',
          deviceModel: '',
          deviceSN: '',
        },

        //设备表单规则
        deviceRules: {
          deviceModel: [
            {required: true, message: '必须选择型号', trigger: 'change'},
          ],
          deviceSN: [
            {required: true, message: '必须输入设备SN码', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
        },

        //设备绑定
        deviceBindVisible: false,
        deviceBindBtnLoading: false,
        deviceBindForm: {
          id: '',
          merchantId: '',
        },
        merchantOption: [],
      }
    },
    mounted() {
      //获取设备列表
      this.getDeviceList(1, 10);
      //获取设备型号给搜索框用
      this.getDeviceModel();
    },
    methods: {
      /**
       * 搜索重置
       */
      resetForm: function () {
        this.deviceSearchForm = {
          deviceModel: '', //设备型号
          deviceSN: '',//设备sn码
          status: '',//设备状态
        };
        this.refreshDeviceList()
      },


      /**
       * 获取设备型号
       */
      getDeviceModel: function () {
        getDeviceModel().then(res => {
          let data = res.obj;
          this.deviceModelOptions = data
        }).catch(e => {

        })
      },
      /**
       * 设备列表
       */
      getDeviceList: function (pageNumber, pageSize) {
        let form = this.deviceSearchForm;
        getDeviceList(pageNumber, pageSize, form).then(res => {

          let data = res.obj;
          this.deviceNumTotal = data.deviceNumDto; //统计数据
          this.deviceListData = data.faceDeviceDtoPage.content; //列表
          this.deviceListDataTotalElement = data.faceDeviceDtoPage.totalElements; //条数

          setTimeout(() => {
            this.loading = false //解锁mask,好看的加载动画
          }, Math.ceil(Math.random() * 500 + 100))

        }).catch(e => {

        })
      },
      /**
       * 列表刷新
       */
      refreshDeviceList: function () {
        this.$refs['page'].refresh()
      },


      //--------------------------设备修改------------------------
      /**
       * 修改关闭模态框
       */
      modifyDeviceClose: function () {
        this.$refs['modifyDeviceForm'].resetFields();
        this.modifyDeviceVisible = false
      },
      /**
       * 修改显示模态框
       */
      modifyDeviceOpen: function (row) {

        // 赋值
        this.modifyDeviceForm.id = row.id;

        if (row.id == null || row.id === '') {
          this.$message.error('设备信息错误，无法操作 (id null)');
          return;
        }

        this.modifyDeviceForm.deviceModel = row.deviceModel;
        this.modifyDeviceForm.deviceSN = row.deviceSN;

        console.log(this.modifyDeviceForm);
        this.modifyDeviceVisible = true
      },
      /**
       * 设备修改前操作
       */
      modifyDeviceBefore: function () {
        this.$refs['modifyDeviceForm'].validate((valid) => {
          if (valid) {
            this.modifyDeviceSubmit()
          } else {
            this.$message({
              showClose: true,
              message: '还有内容未正确填写。',
              type: 'error'
            });
            return false;
          }
        });
      },
      /**
       * 设备修改提交
       */
      modifyDeviceSubmit: function () {
        let form = this.deepCopy(this.modifyDeviceForm);
        this.modifyBtnLoading = true;
        modifyDevice(form).then(res => {
          this.$notify({
            title: '设备修改成功',
            message: `修改后型号：${form.deviceModel}，SN码：${form.deviceSN}`,
            type: 'success'
          });
          // this.$message.success(`设备修改成功 【新型号：${form.deviceModel}，SN码：${form.deviceSN}】`);
          this.modifyDeviceClear(); //清空表单
        }).catch(e => {
          this.modifyBtnLoading = false
        })

      },
      /**
       * 设备修改成功后
       */
      modifyDeviceClear: function () {
        this.modifyDeviceClose();
        this.refreshDeviceList();
        setTimeout(() => {
          this.modifyBtnLoading = false
        }, 500)
      },


      /**
       * 退回设备提交前
       */
      returnDeviceBefore: function (row) {
        let did = row.id;

        this.$confirm('此操作将退回该设备, 是否继续?', '重要操作', {
          confirmButtonText: '确认退回',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitReturnDevice(did)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退回'
          });
        });
      },
      /**
       * 退回设备提交
       */
      submitReturnDevice: function (did) {
        console.log(did);
        returnDevice(did).then(res => {
          this.$message.success('设备已退回。');
          this.$notify({
            title: '设备已退回',
            message: `此设备已经退回上级商，你之后无法再操作此设备。`,
            type: 'success'
          });
          this.refreshDeviceList() //刷新
        }).catch(e => {

        })
      },

      /**
       * 设备绑定模态框关闭
       */
      deviceBindClose: function () {
        this.deviceBindForm.merchantId = '';
        this.deviceBindForm.id = '';

        this.deviceBindVisible = false
      },
      /**
       * 设备绑定模态框打开
       */
      deviceBindOpen: function (row) {
        console.log(row);
        this.deviceBindForm.id = row.id; //被绑定设备id
        this.deviceBindVisible = true
      },
      /**
       * 获取商户列表
       */
      getMerchant: function (query) {
        if (query !== '') {
          getMerchant(query).then(res => {
            let data = res.obj;
            this.merchantOption = data
          }).catch(e => {
            this.merchantOption = [];
          })
        } else {
          this.merchantOption = [];
        }

      },
      /**
       * 确认绑定
       */
      bindDevice: function () {
        this.deviceBindBtnLoading = true;
        let form = this.deviceBindForm;

        bindDevice(form).then(res => {
          // this.$message.success('绑定成功。');
          this.$notify({
            title: '绑定成功',
            message: `设备已绑定至指定商户。`,
            type: 'success'
          });
          this.deviceBindClose();
          this.refreshDeviceList();

          setTimeout(() => {
            this.deviceBindBtnLoading = false
          }, 1000)
        }).catch(e => {
          this.deviceBindBtnLoading = false
        })
      },
      /**
       * 解绑前
       */
      unbindDeviceBefore: function (row) {
        let did = row.id;
        let mname = row.deviceBindName;

        this.$confirm(`设备将会与“${mname}”解绑, 是否继续?`, '重要操作', {
          confirmButtonText: '确认解绑',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.unbindDevice(did)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });
        });
      },


      /**
       *解绑
       */
      unbindDevice: function (did) {
        unbindDevice(did).then(res => {
          // this.$message.success('解绑成功。');
          this.$notify({
            title: '解绑成功',
            message: `设备可以绑定其他商户或退回上级商。`,
            type: 'success'
          });
          this.refreshDeviceList();
        }).catch(e => {

        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*搜索和工具条*/
  .search-tools-bar {
    width: 100%;
    max-width: 100%;

    .search-input {
      width: 217px;
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

        /*卡片媒体查询*/
        @media (max-width: 765px) {
          .tools_img {
            display: none;
          }
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

        /*卡片文字媒体查询*/
        @media (max-width: 765px) {
          .tools_text {
            width: 100%;

            p:nth-child(1) {
              font-size: 12px;
              color: #888;
            }

            p:nth-child(2) {
              padding: 5px 0 0 0;
              font-size: 22px;
              color: #3f3f3f;
            }
          }
        }
      }
    }
  }

  /*入库模态框*/
  .device-entry {
    .input-width {
      width: 200px;
    }
  }

</style>
