<template>
  <div class="app-container" v-loading="loading">
    <!--搜索和工具条-->
    <div divName="搜索和工具" class="search-tools-bar">

      <!--搜索-->
      <template>
        <!--按设备型号-->
        <el-select v-model="deviceSearchForm.deviceModel"
                   clearable=""
                   placeholder="按设备型号">
          <el-option
            v-for="item in deviceModelOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <!--按设备状态-->
        <el-select v-model="deviceSearchForm.status" clearable placeholder="按设备状态">
          <el-option label="服务商库存" value="1"></el-option>
          <el-option label="运营商库存" value="2"></el-option>
          <el-option label="使用中" value="3"></el-option>
        </el-select>
        <!--按设备归属-->
        <el-select v-model="deviceSearchForm.deviceBelongId" clearable placeholder="按归属（名称模糊查询）"
                   filterable
                   remote
                   reserve-keyword
                   :remote-method="getDeviceBeLong">
          <el-option
            v-for="item in deviceBelongOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>

        </el-select>

        <!--按设备SN-->
        <el-input v-model.trim="deviceSearchForm.deviceSN" clearable placeholder="按设备SN"
                  class="search-input"></el-input>
        <div class="submit-search">
          <el-button type="primary" @click="refreshDeviceList">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
        <div class="fl_right">
          <el-button type="primary" @click="addDeviceOpen">设备入库</el-button>
          <el-button type="primary" @click="deviceBatTransferOpen">设备批量划拨</el-button>
        </div>


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
              <p>{{deviceNumTotal.deviceNums}}</p>
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
              <p>{{deviceNumTotal.useDevice}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="@/assets/images/deviceManagement/服务商库存.png" title="服务商库存" alt="服务商库存">
            </div>
            <div class="tools_text">
              <p>{{topName}}库存</p>
              <p>{{deviceNumTotal.serviceProviderDevice}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="@/assets/images/deviceManagement/下级库存.png" title="下级库存" alt="下级库存">
            </div>
            <div class="tools_text">
              <p>下级库存</p>
              <p>{{deviceNumTotal.operatorDevice}}</p>
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
          <el-table-column
            prop="deviceBelongName"
            label="设备归属"
            :show-overflow-tooltip="true">
          </el-table-column>
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
              <el-button size="small" type="text" :disabled="scope.row.status!=1"
                         @click="deviceTransferOpen(scope.row)">设备划拨
              </el-button>
              <el-button size="small" type="text" @click="modifyDeviceOpen(scope.row)">
                修改
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
      <!--设备入库-->
       <el-dialog
    :close-on-click-modal="false"
        title="设备入库"
        :visible.sync="addDeviceVisible"
        width="700px"
        :before-close="addDeviceClose">

        <div class="device-entry">
          <el-form :inline="true" :model="addDeviceForm" ref="addDeviceForm"
                   :rules="deviceRules" label-suffix=":">

            <el-form-item label="型号" prop="deviceModel">
              <el-select v-model="addDeviceForm.deviceModel" class="input-width" placeholder="请选择设备型号">
                <el-option
                  v-for="item in deviceModelOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="SN" prop="deviceSN">
              <el-input v-model.trim="addDeviceForm.deviceSN" class="input-width" @keyup.enter.native="saveDeviceBefore"
                        placeholder="请输入设备SN码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveDeviceBefore" :loading="addBtnLoading" icon="el-icon-plus">快捷添加
              </el-button>
            </el-form-item>
          </el-form>

          <div>

          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" style="float: left" @click="batchAddOpen" icon="el-icon-upload2">批量入库</el-button>
          <el-button @click="addDeviceClose">退 出</el-button>
        </span>
      </el-dialog>
      <!--批量入库-->
       <el-dialog
    :close-on-click-modal="false"
        title="设备批量入库"
        :visible.sync="batchAddVisible"
        width="400px"
        :before-close="batchAddClose">
        <div>

          <el-upload
            class="upload-demo"
            ref="upload"
            accept=".xls"
            :headers="headers"
            :action="addurl"
            :data="filesData"
            :on-success="batchSubmitSuccess"
            :on-exceed="batchSubmitExceed"
            :file-list="xlsFileList"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="batchSubmitUpload">上传到服务器
            </el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xls文件，最大4096KB</div>
          </el-upload>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="getBatDeviceModel" style="float: left">下载导入模板
           <el-tooltip class="item" effect="light"
                       style="color: rgb(62,189,255)"
                       :content="`下载并填写完成后点击“选取文件”按钮批量入库。`"
                       placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
          </el-button>
    <el-button @click="batchAddClose">退 出</el-button>
  </span>
      </el-dialog>
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
      <!--设备划拨 单次-->
       <el-dialog
    :close-on-click-modal="false"
        title="设备划拨至下级商"
        :visible.sync="deviceTransferVisible"
        width="500px"
        :before-close="deviceTransferClose">
        <div>
          <el-form :inline="true" :model="deviceTransferForm" :rules="deviceTransferRules"
                   ref="deviceTransferForm" class="demo-form-inline"
                   label-suffix="：">
            <el-form-item label="划拨至" prop="targetId">
              <el-select v-model="deviceTransferForm.targetId"
                         placeholder="新运营商（支持模糊查询）"
                         filterable
                         remote
                         reserve-keyword
                         clearable
                         :remote-method="getDeviceBeLong">
                <el-option
                  v-for="item in deviceBelongOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="transferDeviceBefore" :disabled="deviceTransferForm.targetId==''"
                         :loading="transferBtnLoading">划拨
              </el-button>
            </el-form-item>

          </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deviceTransferClose">退 出</el-button>
  </span>
      </el-dialog>
      <!--设备划拨 批量-->
       <el-dialog
    :close-on-click-modal="false"
        title="批量设备划拨"
        :visible.sync="deviceBatTransferVisible"
        width="400px"
        :before-close="deviceBatTransferClose">
        <div>
          <el-upload
            class="upload-demo"
            ref="uploadTransfer"
            accept=".xls"
            :headers="headers"
            :action="trsurl"
            :data="filesData"
            :on-success="batchTransferSubmitSuccess"
            :on-exceed="batchTransferSubmitExceed"
            :on-error="batchTransferSubmitError"
            :file-list="xlsFileList"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="batchTransferSubmitUpload">上传到服务器
            </el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xls文件，最大4096KB</div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button style="float: left" @click="getBatTransferDeviceModel">下载划拨模板
            <el-tooltip class="item" effect="light"
                        style="color: rgb(62,189,255)"
                        :content="`下载并填写完成后点击“选取文件”按钮批量划拨。`"
                        placement="top-start">
      <i class="el-icon-question"></i>
              </el-tooltip>
          </el-button>
    <el-button @click="deviceBatTransferClose">退 出</el-button>
        </span>
      </el-dialog>

    </template>


  </div>
</template>

<script>

  import {
    getDeviceModel,
    getDeviceBeLong,
    getDeviceList,
    saveDevice,
    modifyDevice,
    transferDevice,
    getBatDeviceModel,
    getBatTransferDeviceModel
  } from '../api/deviceList' //交互接口
  import {url} from '@/utils/request'
  import pagination from '@/components/pagination/index'
  import {filsUploadUrl} from '@/modules/file/api/upload' //图片操作API
  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: "deviceList",
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
          deviceBelongId: '',//归属
        },

        //搜索配套
        deviceModelOptions: [], //型号列表
        deviceBelongOptions: [], //归属运营商列表

        //统计数据
        deviceNumTotal: {
          deviceNums: 0,
          operatorDevice: 0,
          serviceProviderDevice: 0,
          useDevice: 0,
        },

        //列表
        deviceListData: [],
        deviceListDataTotalElement: 0,

        //设备入库与修改
        addDeviceVisible: false, //模态框
        modifyDeviceVisible: false, //模态框
        addDeviceForm: {
          deviceModel: '',
          deviceSN: '',
        },
        modifyDeviceForm: {
          id: '',
          deviceModel: '',
          deviceSN: '',
        },
        deviceRules: {
          deviceModel: [
            {required: true, message: '必须选择型号', trigger: 'change'},
          ],
          deviceSN: [
            {required: true, message: '必须输入设备SN码', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}

          ],
        },

        addBtnLoading: false,
        modifyBtnLoading: false,

        //设备划拨
        deviceTransferVisible: false,
        deviceTransferForm: {
          id: "",
          targetId: ''
        },
        deviceTransferRules: {
          targetId: [
            {required: true, message: '必须选择划拨对象', trigger: 'change'},
          ],
        },
        transferBtnLoading: false,

        //设备批量入库
        batchAddVisible: false,
        batchAdBtnLock: false,
        xlsFileList: [],


        //设备批量划拨
        deviceBatTransferVisible: false,


        //文件上传
        filesData: {
          module: 'file'
        },
        addurl: filsUploadUrl + 'excel_import', //添加
        trsurl: filsUploadUrl + 'excel_import_transfer', //转移
        headers: {
          authorized: sessionStorage.token
        },

      }
    },
    mounted() {
      //获取设备型号给搜索框用
      this.getDeviceModel();
      //获取设备列表
      this.getDeviceList(1, 10)
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
          deviceBelongId: '',//归属
        };
        this.refreshDeviceList()
      },

      /**
       * 获取设备列表给搜索框用
       */
      getDeviceModel: function () {
        getDeviceModel().then(res => {
          let data = res.obj;
          this.deviceModelOptions = data
        }).catch(e => {

        })
      },

      /**
       * 获取设备归属
       */
      getDeviceBeLong: function (query) {
        if (query !== '') {
          getDeviceBeLong(query).then(res => {
            let data = res.obj;
            this.deviceBelongOptions = data
          }).catch(e => {
            this.deviceBelongOptions = [];
          })
        } else {
          this.deviceBelongOptions = [];
        }
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
            this.loading = false //解锁mask，好看的加载动画
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


      /**
       * *************************设备入库*********************
       */

      /**
       * 关闭模态框
       */
      addDeviceClose: function () {
        this.$refs['addDeviceForm'].resetFields();
        this.addDeviceVisible = false
      },
      /**
       * 显示模态框
       */
      addDeviceOpen: function () {
        this.addDeviceVisible = true
      },
      /**
       * 设备入库前操作
       */
      saveDeviceBefore: function () {
        this.$refs['addDeviceForm'].validate((valid) => {
          if (valid) {
            this.saveDeviceSubmit()
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
       * 设备入库提交
       */
      saveDeviceSubmit: function () {
        let form = this.deepCopy(this.addDeviceForm);
        this.addBtnLoading = true;
        saveDevice(form).then(res => {
          this.$notify({
            title: '入库成功',
            message: `设备 “${form.deviceModel}” 入库成功,SN码：${form.deviceSN}`,
            type: 'success'
          });
          // this.$message.success(`设备 “${form.deviceModel}” 入库成功,SN码：${form.deviceSN}`);
          this.saveDeviceClear(); //清空表单
        }).catch(e => {
          this.addBtnLoading = false
        })

      },
      /**
       * 设备入库成功后
       */
      saveDeviceClear: function () {
        this.$refs['addDeviceForm'].resetFields();
        this.refreshDeviceList();
        setTimeout(() => {
          this.addBtnLoading = false
        }, 500)
      },

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
            title: '修改成功',
            message: `修改后型号：${form.deviceModel}，SN码：${form.deviceSN}`,
            type: 'success'
          });
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
       * 设备划拨关闭
       */
      deviceTransferClose: function () {
        this.$refs['deviceTransferForm'].resetFields();
        this.deviceTransferVisible = false
      },
      /**
       * 设备划拨打开
       */
      deviceTransferOpen: function (row) {
        if (row.id == null || row.id === '') {
          this.$message.error('设备信息错误，无法操作 (id null)');
          return;
        }
        this.deviceTransferForm.id = row.id;
        this.deviceTransferVisible = true
      },
      /**
       * 设备划拨提交前
       */
      transferDeviceBefore: function () {
        this.$refs['deviceTransferForm'].validate((valid) => {
          if (valid) {
            this.transferDeviceSubmit()
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
       * 设备划拨提交
       */
      transferDeviceSubmit: function () {
        let form = this.deepCopy(this.deviceTransferForm);
        this.transferBtnLoading = true;
        transferDevice(form).then(res => {
          // this.$message.success(`设备划拨成功。`);
          this.$notify({
            title: '划拨成功',
            message: `设备划拨成功，下级商可以处理这台设备了。`,
            type: 'success'
          });
          this.transferDeviceClear()
        }).catch(e => {
          this.transferBtnLoading = false
        })
      },
      /**
       * 设备划拨成功后
       */
      transferDeviceClear: function () {
        this.deviceTransferClose();
        this.refreshDeviceList();
        setTimeout(() => {
          this.transferBtnLoading = false
        }, 500)
      },


      /**
       * 设备批量入库关闭
       */
      batchAddClose: function () {
        this.$refs.upload.clearFiles();
        this.batchAddVisible = false
      },
      /**
       * 设备批量入库打开
       */
      batchAddOpen: function () {
        this.addDeviceClose(); //关闭快捷入库
        this.batchAddVisible = true
      },

      /**
       * 设备批量上传
       */
      batchSubmitUpload() {
        this.$refs.upload.submit();
      },
      batchSubmitSuccess: function (response) {
        console.log(response);
        if (response.code !== 200) {
          this.$message.error(`上传失败，${response.msg}`)
        } else {
          this.$message.success(`上传成功，${response.msg}。`);
          setTimeout(() => {
            this.batchAddClose()
          }, 1800)
        }


      },
      batchSubmitExceed: function () {
        this.$message.info('仅允许上传一个文件，更换文件请先清除旧文件。')
      },

      beforeUpload(file) {
        let isImageSize = file.size;
        console.log('文件大小: ' + isImageSize + ' b');
        if (isImageSize > 512 * 4096) {
          this.$message.error('仅支持4096KB以下表格！');
          return false
        }
        return true
      },
      /**
       * 下载设备导入模板
       */
      getBatDeviceModel: function () {

        // window.open(`${url}/device/excel_export`)
        // return
        getBatDeviceModel().then(res => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute("href", url);
          link.setAttribute("download", `设备批量导入.xls`);
          link.click();
        }).catch(e => {

        })
      },

      /**
       * 设备批量划拨打开
       */
      deviceBatTransferOpen: function () {
        this.deviceBatTransferVisible = true
      },

      /**
       * 设备批量划拨关闭
       */
      deviceBatTransferClose: function () {
        this.$refs.uploadTransfer.clearFiles();
        this.deviceBatTransferVisible = false
      },


      /**
       * 下载设备划拨导入模板
       */
      getBatTransferDeviceModel: function () {
        // window.open(`${url}/device/excel_export`)
        getBatTransferDeviceModel().then(res => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute("href", url);
          link.setAttribute("download", `设备批量划拨.xls`);
          link.click();
        }).catch(e => {

        })
      },

      /**
       * 设备批量划拨
       */
      batchTransferSubmitUpload() {
        this.$refs.uploadTransfer.submit();
      },
      batchTransferSubmitSuccess: function (response) {
        console.log(response);
        if (response.code !== 200) {
          this.$message.error(`上传失败，${response.msg}`)
        } else {
          this.$message.success(`上传成功，${response.msg}。`);
          setTimeout(() => {
            this.deviceBatTransferClose()
          }, 1800)
        }
      },
      batchTransferSubmitExceed: function () {
        this.$message.info('仅允许上传一个文件，更换文件请先清除旧文件。')
      },
      batchTransferSubmitError: function (err) {
        this.$message.error(err)
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

    .submit-search {
      display: inline;
    }

    .fl_right {
      float: right;
    }

    @media (max-width: 1366px) {
      .submit-search {
        display: block;
        float: unset;
        margin-top: 10px;
      }

      .fl_right {
        display: block;
        float: unset;
        margin-top: 10px;
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
