<template>
  <div class="app-container" v-loading="loading">
    <!--标签页-->
    <div class="all-back">
      <el-button type="" @click="goback">返回</el-button>
    </div>
    <el-tabs type="card" v-model="tabsName" @tab-click="tabsChangeHandle">
      <!--HTML管理-->
      <el-tab-pane label="HTML管理" name="html">

        <div class="tools-bar"> <!--工具条-->
          <el-button class="tools-bar-btn" type="primary"
                     icon="el-icon-plus"
                     @click="htmlUploadOpen">HTML上传
          </el-button>
        </div>

        <div class="table-box">  <!--列表-->
          <template>
            <el-table
              :data="html_tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="文件名"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="上传时间"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="text" @click="previewHTML(scope.row)">预览</el-button>
                  <el-button type="text" style="color: red" @click="deleteHTMLBefore(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              :total-elements="html_tableDataTotalElement"
              :change-callback="getHtmlFilesList"
              ref="html_page"></pagination>
          </template>
        </div>

        <!--模态框-->
        <template>

           <el-dialog
    :close-on-click-modal="false"
            title="HTML文件上传（仅*.html）"
            :visible.sync="htmlUploadVisible"
            width="579px"
            :before-close="htmlUploadClose">
            <div>
              <el-form :model="htmlUploadForm" ref="htmlUploadForm"
                       label-width="120px" label-suffix="：">

                <el-form-item label="文件名" prop="name">
                  <el-input v-model.trim="htmlUploadForm.name"
                            :disabled="true"
                            placeholder="上传文件后自动填入"
                            class="input-width"></el-input>
                </el-form-item>

                <el-form-item label="文件上传" prop="path">
                  <el-upload
                    class="upload-demo"
                    drag
                    :action="url"
                    accept=".html"
                    :data="htmlFilesData"
                    name="file"
                    :show-file-list="true"
                    :on-success="htmlUploadUploadSuccess"
                    :before-upload="htmlUploadBeforeUpload"
                    :headers="headers"
                    :file-list="htmlFilesList"
                    :limit="1">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将&nbspHTML&nbsp文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传一个&nbspHTML&nbsp文件，且不超过&nbsp10MB&nbsp</div>
                  </el-upload>
                </el-form-item>

              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="htmlUploadClose">取 消</el-button>
              <el-button type="primary" @click="submitHTML" :loading="btnLoading">确 定</el-button>
            </span>
          </el-dialog>
        </template>


      </el-tab-pane>

      <!--软件包管理-->
      <el-tab-pane label="软件包管理" name="package">

        <div class="tools-bar"> <!--工具条-->
          <el-button class="tools-bar-btn" type="primary"
                     icon="el-icon-plus"
                     @click="packageUploadOpen">软件包上传
          </el-button>
        </div>

        <div class="table-box">  <!--列表-->
          <template>
            <el-table
              :data="package_tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="文件名"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="上传时间"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="text" @click="previewPackage(scope.row)">下载</el-button>
                  <el-button type="text" style="color: red" @click="deletePackageBefore(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              :total-elements="package_tableDataTotalElement"
              :change-callback="getPackageFilesList"
              ref="package_page"></pagination>
          </template>
        </div>

        <!--模态框-->
        <template>

           <el-dialog
    :close-on-click-modal="false"
            title="软件包文件上传（仅*.zip）"
            :visible.sync="packageUploadVisible"
            width="579px"
            :before-close="packageUploadClose">
            <div>
              <el-form :model="packageUploadForm" ref="packageUploadForm"
                       label-width="120px" label-suffix="：">

                <el-form-item label="文件名" prop="name">
                  <el-input v-model.trim="packageUploadForm.name"
                            :disabled="true"
                            placeholder="上传文件后自动填入"
                            class="input-width"></el-input>
                </el-form-item>

                <el-form-item label="文件上传" prop="path">
                  <el-upload
                    class="upload-demo"
                    drag
                    :action="url"
                    accept=".zip"
                    :data="packageFilesData"
                    name="file"
                    :show-file-list="true"
                    :on-success="packageUploadUploadSuccess"
                    :before-upload="packageUploadBeforeUpload"
                    :headers="headers"
                    :file-list="packageFilesList"
                    :limit="1">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将&nbspZIP&nbsp文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传一个&nbspZIP&nbsp文件，且不超过&nbsp100MB&nbsp</div>
                  </el-upload>
                </el-form-item>

              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="packageUploadClose">取 消</el-button>
              <el-button type="primary" @click="submitPackage" :loading="btnLoading">确 定</el-button>
            </span>
          </el-dialog>
        </template>

      </el-tab-pane>

      <!--版本管理-->
      <el-tab-pane label="版本管理" name="update">

        <div class="tools-bar"> <!--工具条-->
          <el-button class="tools-bar-btn" type="primary"
                     @click="verAddOpen"
                     icon="el-icon-plus">升级版本添加
          </el-button>
          <div class="right-last-version"
          >
            <span>当前版本号：</span>
            <span @click="copyText"
                  id="copy-version-content"
                  data-clipboard-target="#copy-version-content">
            {{maxVersion|numFil}}</span>
          </div>
        </div>

        <div class="table-box">  <!--列表-->
          <template>
            <el-table
              :data="ver_tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="文件名">
              </el-table-column>
              <el-table-column
                prop="fileDescribe"
                label="文件描述">
              </el-table-column>
              <el-table-column
                prop="version"
                label="版本号">
                <template slot-scope="scope">
                  <span>{{scope.row.version|numFil}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateDescribe"
                label="更新描述">
              </el-table-column>
              <el-table-column
                label="强制更新">
                <template slot-scope="scope">
                  {{scope.row.updateFlag===1?'是':'否'}}
                </template>
              </el-table-column>
              <el-table-column
                label="文件类型">
                <template slot-scope="scope">
                  <span>{{scope.row.fileType|fileTypeFil}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="最近修改时间">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="text" @click="verModifyOpen(scope.row)">编辑</el-button>
                  <el-button type="text" style="color: red" @click="deleteVerBefore(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              :total-elements="ver_tableDataTotalElement"
              :change-callback="getVerList"
              ref="ver_page"></pagination>


          </template>
        </div>

        <!--模态框-->
        <template>
           <el-dialog
    :close-on-click-modal="false"
            :title="ver_dialog_title"
            :visible.sync="verEditVisible"
            width="576px"
            :before-close="verEditClose">
            <div>
              <el-form :model="verForm" ref="verForm"
                       :rules="verFormRules"
                       label-width="120px" label-suffix="：">
                <el-form-item label="文件名" prop="name">
                  <el-input v-model.trim="verForm.name"
                            :clearable="true"
                            class="input-width"></el-input>
                </el-form-item>

                <el-form-item label="文件描述" prop="fileDescribe">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="文件的描述"
                    class="input-width"
                    :clearable="true"
                    v-model="verForm.fileDescribe">
                  </el-input>
                </el-form-item>

                <el-form-item label="版本号" prop="version">
                  <el-input v-model.trim="verForm.version"
                            :clearable="true"
                            class="input-width"></el-input>
                </el-form-item>

                <el-form-item label="强制更新标识" prop="updateFlag">
                  <el-checkbox v-model="verForm.updateFlag" :true-label="1" :false-label="0">强制更新</el-checkbox>
                </el-form-item>

                <el-form-item label="更新描述" prop="updateDescribe">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="本次更新的描述"
                    class="input-width"
                    :clearable="true"
                    v-model="verForm.updateDescribe">
                  </el-input>
                </el-form-item>

                <el-form-item label="文件类型" prop="fileType">
                  <el-select v-model="verForm.fileType"
                             :clearable="true"
                             placeholder="选择文件类型"
                             class="input-width">
                    <el-option
                      v-for="(item,index) in FileTypeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="verEditClose">取 消</el-button>
    <el-button type="primary" @click="submitVerBefore" :loading="btnLoading">确 定</el-button>
  </span>
          </el-dialog>
        </template>

      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
  import {mixins} from "../../../components/mixins/mixins";
  import pagination from '@/components/pagination/index'
  import {returnThumbnailUrl, uploadUrl, veruploadUrl, filsUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {url} from "../../../utils/request";

  import {
    getHTMLList,
    addHTML,
    deleteHTML,
    getPackageList,
    addPackage,
    deletePackage,
    getVerList,
    addVer,
    modifyVer,
    deleteVer
  } from '../api/versionManagement'
  import Clipboard from 'clipboard'; //复制
  export default {
    name: "versionManagement",
    mixins: [mixins],//混入
    components: {pagination},
    data() {
      var versionNumber_check = (rule, value, callback) => {
        let reg = /^\d+(\.\d+){0,1}$/;

        if (value === '' || value === null || value === undefined) {
          callback(new Error('请输入版本号 例如：1.0 '));
        } else if (value == 0 || value == '0.0') {
          callback(new Error('不接受0版本号'));
        } else {
          if (!reg.test(value)) {
            callback(new Error(`此版本号‘${value}’不合法,请输入 1.0 这样的版本号`));
          } else {
            callback();
          }
        }
      };

      return {
        id: '', //服务商id
        loading: true, //页面加载

        //页面控制
        tabsName: 'html',
        btnLoading: false,

        //文件上传
        htmlFilesData: {
          suffix: 'html',
          serviceProviderId: this.$route.query.id
        },
        packageFilesData: {
          suffix: 'zip',
          serviceProviderId: this.$route.query.id
        },
        url: veruploadUrl, //action地址
        headers: { //头部
          authorized: sessionStorage.token
        },

        //html管理
        html_tableData: [],
        html_tableDataTotalElement: 0,

        htmlUploadVisible: false,
        htmlUploadForm: {
          name: '',
          path: '',
        },
        htmlFilesList: [],

        //软件包管理
        package_tableData: [],
        package_tableDataTotalElement: 0,

        packageUploadVisible: false,
        packageUploadForm: {
          name: '',
          path: '',
        },
        packageFilesList: [],

        //版本管理
        ver_tableData: [],
        ver_tableDataTotalElement: 0,

        ver_dialog_title: '升级版本增加',
        isAddMode: false, //是否添加模式
        verEditVisible: false,

        verForm: {
          id: '',
          name: '',
          fileDescribe: '',
          version: '',
          updateFlag: 0,
          updateDescribe: '',
          fileType: '',
        },
        verFormRules: {
          name: [
            {required: true, message: '输入文件名', trigger: 'blur'}
          ],
          fileDescribe: [
            {required: true, message: '输入文件描述', trigger: 'blur'}
          ],
          updateDescribe: [
            {required: true, message: '输入更新描述', trigger: 'blur'}
          ],
          version: [
            {required: true, message: '输入正确的版本号', trigger: ['input', 'blur']},
            {validator: versionNumber_check, trigger: ['input', 'blur']}
          ],
          updateFlag: [
            {required: true, message: '您还没决定是否强制更新', trigger: 'change'}
          ],
          fileType: [
            {required: true, message: '选择文件类型', trigger: 'change'}
          ],
        },
        FileTypeOptions: [
          {label: '主程序', value: 1},
          {label: '关闭更新', value: 2},
          {label: '直接更新', value: 3},
          {label: '解压更新', value: 4},
        ],

        maxVersion: 0,//最新版本号


      }
    },
    filters: {
      fileTypeFil: function (val) {
        if (val === '' || val === null) {
          return '未设置'
        }
        let type = parseInt(val);
        let text = '';
        switch (type) {
          case 1:
            text = '主程序';
            break;
          case 2:
            text = '关闭更新';
            break;
          case 3:
            text = '直接更新';
            break;
          case 4:
            text = '解压更新';
            break;
          default:
            text = '未知'
        }

        return text;
      },
      numFil: function (val) {

        if ((typeof val) === 'number') {
          let reg = /^\d+$/;

          if (!reg.test(val)) {
            console.log('不是整数');
            return val
          } else {
            console.log('是整数');
            return val + '.0'
          }
        } else {
          console.log('无记录');
          return val
        }

      }
    },
    created() {
      //获取id
      this.id = this.$route.query.id;
      console.log(this.id);
    },
    mounted() {
      //获取第一个页面列表
      this.getHtmlFilesList(1, 10)
    },
    methods: {
      /**
       * 切换标签页
       */
      tabsChangeHandle: function (tab, event) {
        let name = this.tabsName;
        if (name === 'html') {
          this.getHtmlFilesList(1, 10)
        } else if (name === 'package') {
          this.getPackageFilesList(1, 10)
        } else if (name === 'update') {
          this.getVerList(1, 10)
        }
      },


      /**
       *HTML管理
       */
      //获取列表
      getHtmlFilesList: function (pageNumber, pageSize) {
        console.log(`pn:${pageNumber},ps:${pageSize}`);
        let serviceProviderId = this.id;//top id
        getHTMLList(pageNumber, pageSize, serviceProviderId).then(res => {
          let data = res.obj;
          this.html_tableData = data.content || [];
          this.html_tableDataTotalElement = data.totalElements || 0;
          this.loading = false
        }).catch(e => {

        })
      },
      //刷新列表
      getHtmlFilesListRefresh: function () {
        this.$refs['html_page'].refresh()
      },
      //关闭模态框
      htmlUploadClose: function () {
        this.$refs['htmlUploadForm'].resetFields();
        this.htmlFilesList = [];
        this.htmlUploadVisible = false
      },
      //打开模态框
      htmlUploadOpen: function () {
        this.htmlUploadVisible = true
      },
      //文件上传前检查
      htmlUploadBeforeUpload(file) {
        console.log(file);
        let isType = file.type;
        let isSize = file.size;
        if (isType !== 'text/html') {
          this.$message.error('这不是 HTML 文件');
          return false
        }
        if (isSize > 10485760) {
          this.$message.error('只允许2M以下文件上传');
          return false
        }
        //自动填写文件名
        this.htmlUploadForm.name = file.name;
        return true
      },
      //html上传成功
      htmlUploadUploadSuccess: function (response, file) {
        console.log(response);
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
        // this.htmlUploadForm.fileName = response.obj.fileName;
        this.htmlUploadForm.path = response.obj.fileName;
      },
      //提交HTML
      submitHTML: function () {
        this.btnLoading = true;
        let form = this.htmlUploadForm;
        form.serviceProviderId = this.id; //top id
        addHTML(form).then(res => {
          this.$message.success('保存成功');

          setTimeout(() => {
            this.btnLoading = false  //解锁按钮
          }, 500);
          this.getHtmlFilesListRefresh();
          this.htmlUploadClose() //关闭
        }).catch(e => {
          this.btnLoading = false  //解锁按钮
        })
      },
      //预览HTML
      previewHTML: function (target) {
        console.log(target);
        this.loading = true;
        setTimeout(() => {
          window.open(`${url}/html/${target.serviceProviderId}/${target.path}`);
          this.loading = false
        }, 400)
      },
      //删除HTML确认
      deleteHTMLBefore(target) {
        let id = target.id;
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.deleteHTML(id) //发起请求

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除HTML
      deleteHTML: function (id) {
        deleteHTML(id).then(res => {
          this.$message.success(`${res.msg}。`);
          this.getHtmlFilesListRefresh();//刷新
        }).catch(e => {

        })
      },


      /**
       *包管理
       */
      //获取列表
      getPackageFilesList: function (pageNumber, pageSize) {
        console.log(`pn:${pageNumber},ps:${pageSize}`);
        let serviceProviderId = this.id;//top id
        getPackageList(pageNumber, pageSize, serviceProviderId).then(res => {
          let data = res.obj;
          this.package_tableData = data.content || [];
          this.package_tableDataTotalElement = data.totalElements || 0;
          this.loading = false
        }).catch(e => {

        })
      },
      //刷新列表
      getPackageFilesListRefresh: function () {
        this.$refs['package_page'].refresh()
      },
      //关闭模态框
      packageUploadClose: function () {
        this.$refs['packageUploadForm'].resetFields();
        this.packageFilesList = [];
        this.packageUploadVisible = false
      },
      //打开模态框
      packageUploadOpen: function () {
        this.packageUploadVisible = true
      },
      //文件上传前检查
      packageUploadBeforeUpload(file) {
        console.log(file);
        let isType = file.type;
        let isSize = file.size;
        // if (isType !== 'text/html') {
        //   this.$message.error('这不是 HTML 文件');
        //   return false
        // }
        if (isSize > 104857600) {
          this.$message.error('只允许100M以下文件上传');
          return false
        }
        //自动填写文件名
        this.packageUploadForm.name = file.name;
        return true
      },
      //包上传成功
      packageUploadUploadSuccess: function (response, file) {
        console.log(response);
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
        this.packageUploadForm.path = response.obj.fileName;
      },
      //提交包
      submitPackage: function () {
        this.btnLoading = true;
        let form = this.packageUploadForm;
        form.serviceProviderId = this.id; //top id
        addPackage(form).then(res => {
          this.$message.success('保存成功');

          setTimeout(() => {
            this.btnLoading = false  //解锁按钮
          }, 500);

          this.getPackageFilesListRefresh(); //刷新
          this.packageUploadClose() //关闭
        }).catch(e => {
          this.btnLoading = false  //解锁按钮
        })
      },
      //预览包（下载包）
      previewPackage: function (target) {
        console.log(target);
        this.loading = true;
        setTimeout(() => {
          window.open(`${url}/zip/${target.serviceProviderId}/${target.path}`);
          this.loading = false
        }, 400)
      },
      //删除包确认
      deletePackageBefore(target) {
        let id = target.id;
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.deletePackage(id) //发起请求

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除包
      deletePackage: function (id) {
        deletePackage(id).then(res => {
          this.$message.success(`${res.msg}。`);
          this.getPackageFilesListRefresh();//刷新
        }).catch(e => {

        })
      },


      /**
       * 版本管理
       */
      //获取列表
      getVerList: function (pageNumber, pageSize) {
        console.log(`pn:${pageNumber},ps:${pageSize}`);
        let serviceProviderId = this.id;
        getVerList(pageNumber, pageSize, serviceProviderId).then(res => {
          let data = res.obj;
          this.maxVersion = data.maxVersion || '无记录';
          this.ver_tableData = data.page.content || [];
          this.ver_tableDataTotalElement = data.page.totalElements || 0;
        }).catch(e => {

        })
      },
      //刷新列表
      getVerRefresh: function () {
        this.$refs['ver_page'].refresh()
      },
      //关闭模态框
      verEditClose: function () {
        this.$refs['verForm'].resetFields();
        this.verForm.updateFlag = 0; //重置0
        this.ver_dialog_title = '升级版本增加'; //恢复默认标题
        this.verEditVisible = false
      },
      //打开模态框
      verAddOpen: function () {
        this.ver_dialog_title = '升级版本增加';
        this.isAddMode = true;
        this.verEditVisible = true
      },
      //获取数据
      verModifyOpen: function (raw) {
        this.ver_dialog_title = '版本修改';
        this.isAddMode = false;
        this.reviewVerData(raw);
        this.verEditVisible = true
      },

      //回填数据
      reviewVerData: function (raw) {
        let data = raw;

        this.verForm.id = data.id;
        this.verForm.name = data.name;
        this.verForm.fileDescribe = data.fileDescribe;
        this.verForm.version = data.version;
        this.verForm.updateFlag = data.updateFlag;
        this.verForm.updateDescribe = data.updateDescribe;
        this.verForm.fileType = data.fileType;

      },


      //提交版本
      submitVerBefore: function () {
        //判断新增还是编辑
        this.$refs['verForm'].validate((valid) => {
          if (valid) {

            let mode = this.isAddMode;
            if (mode === true) {
              this.submitVer()
            } else {
              this.modifyVer()
            }

          } else {

            this.$message.error(`还有未正确填写的内容`);
            return false;

          }
        });
      },

      //新增版本
      submitVer: function () {
        this.btnLoading = true;
        let form = this.verForm;
        delete form.id; //不需要id
        form.serviceProviderId = this.id; //top id 服务商id，非条目id
        addVer(form).then(res => {
          this.$message.success('添加成功');
          this.getVerRefresh(); //刷新

          setTimeout(() => {
            this.btnLoading = false
          }, 500);

          this.verEditClose() //关闭

        }).catch(e => {
          this.btnLoading = false
        })
      },
      //修改版本
      modifyVer: function () {
        this.btnLoading = true;
        let form = this.verForm;
        modifyVer(form).then(res => {
          this.$message.success('修改成功');
          this.getVerRefresh(); //刷新

          setTimeout(() => {
            this.btnLoading = false
          }, 500);

          this.verEditClose() //关闭

        }).catch(e => {
          this.btnLoading = false
        })
      },

      //删除版本确认
      deleteVerBefore(target) {
        let id = target.id;
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.deleteVer(id) //发起请求

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //删除版本
      deleteVer: function (id) {
        deleteVer(id).then(res => {
          this.$message.success(`${res.msg}。`);
          this.getVerRefresh();//刷新
        }).catch(e => {

        })
      },


      /**
       * 返回
       */
      goback: function () {
        this.$router.go('-1');
      },
      /**
       * 复制链接
       */
      copyText: function () {
        var clipboard = new Clipboard('#copy-version-content');// 按钮绑定id
        clipboard.on('success', e => {
          this.$message.success("版本号复制成功");
          clipboard.destroy()     // 释放内存
        });
        clipboard.on('error', e => {
          console.log('该浏览器不支持自动制');
          // 释放内存
          clipboard.destroy()     // 释放内存
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tools-bar {
    width: 100%;
    max-width: 100%;

    margin-top: 20px;
    height: 40px;

    vertical-align: middle;

    .tools-bar-btn {

      /*float: right;*/
    }

    /*右侧版本显示*/
    .right-last-version {
      float: right;
      line-height: 40px;
      padding-right: 50px;
      font-size: 18px;
      font-weight: lighter;
      color: #3ebdff;

      span:nth-child(1) {
        user-select: none;
      }

      span:nth-child(2) {
        font-weight: bold;
        cursor: default;
      }
    }
  }

  /*列表*/
  .table-box {
    margin-top: 20px;
  }

  /*模态框*/
  .input-width {
    width: 360px;
  }

  /*返回*/
  .all-back {
    position: absolute;
    top: 11px;
    right: 21px;
    z-index: 1000;
  }
</style>
