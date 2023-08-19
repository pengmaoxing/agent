<template>
  <div class="app-container" v-loading="loading">
    <!--按钮-->
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.title" @keyup.enter.native="search" placeholder="标题" size="small"
                class="formItem"></el-input>
      <el-input v-model="searchForm.content" @keyup.enter.native="search" placeholder="内容" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <!--      <el-button type="primary" size="small" @click="advancedSearchOpen">高级查询</el-button>-->
      <el-button type="primary" size="small" @click="addNoticeOpen">新增</el-button>
    </div>

    <!--内容-->
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
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="700px">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button type="text" @click="rootDetail(scope.row)">详情</el-button>
            <el-button type="text" @click="editNoticeOpen(scope.row)">修改</el-button>
            <el-button
              type="text"
              style="color: #ff745f"
              @click="cancle(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total-elements="totalElements"
        :change-callback="getNoticeList"
        ref="page"></pagination>

    </template>


    <!--添加业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增公告"
      :visible.sync="addNotice"
      width="800px"
      :before-close="addNoticeClose">
      <el-form :model="addNoticeForm" :rules="addRules" ref="addNoticeForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input v-model="addNoticeForm.title" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="phone">
          <textarea v-model="addNoticeForm.content" class="addItem" style="width: 500px;height: 300px;"></textarea>
        </el-form-item>
        <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
          <div>
            <div class="card-header-title">
              <span>附件(zip，限制5M)</span>
              <span v-if="formImgUrl.otherfile!==''" :class="{'up-success':formImgUrl.otherfile!==''}">成功
                  </span>
              <el-button v-if="formImgUrl.otherfile" :href="formImgUrl.otherfile" >下载</el-button>
            </div>
            <el-upload class="logo-uploader" :action="url"
                       name="file" :show-file-list="false" :on-success="otherfileUpload"
                       :on-error="handleImageFailed"
                       :headers="headers">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addNotice = false">取 消</el-button>
    <el-button type="primary" @click="addNoticeSubmit('addNoticeForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
    <!--添加业务员模态框-->

    <!--修改业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="修改业务员"
      :visible.sync="editNotice"
      width="800px"
      :before-close="editNoticeClose">
      <el-form :model="editNoticeForm" :rules="editRules" ref="editNoticeForm" label-width="80px"
               class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editNoticeForm.title" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <textarea v-model="editNoticeForm.content" class="addItem" style="width: 500px;height: 300px;"></textarea>
        </el-form-item>
        <el-card :body-style="{ padding: '20px' }" shadow="hover" class="image-upload-item">
          <div>
            <div class="card-header-title">
              <span>附件(zip，限制5M)</span>
              <span v-if="formImgUrl.otherfile!==''" :class="{'up-success':formImgUrl.otherfile!==''}">成功
                  </span>
              <a v-if="formImgUrl.otherfile" :href="formImgUrl.otherfile" >下载</a>
            </div>
            <el-upload class="logo-uploader" :action="url"
                       name="file" :show-file-list="false" :on-success="otherfileUpload2"
                       :on-error="handleImageFailed"
                       :headers="headers">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editNoticeClose">取 消</el-button>
    <el-button type="primary" @click="editNoticeSubmit('editNoticeForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    getNotice, noticeAdd, noticeUpdate,  cancle
  } from '../api/notice'
  import pagination from '@/components/pagination/index'
  import {url} from '@/utils/request'

  export default {
    components: {pagination},
    name: 'notice',
    data() {
      var emailReg = (rule, value, callback) => {
        let reg = /[A-z0-9]+[A-z0-9_-]*\@[A-z0-9]+\.[A-z]+/;
        if (!reg.test(value)) {
          return callback(new Error('邮箱格式不符或不接受此邮箱域名'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        btnLoading: false,
        resetPasswordDialog: false,
        resetPWid: '',
        formLabelWidth: '150px',
        url: hsfuploadUrl,
        headers: {
          authorized: sessionStorage.token
        },
        resetForm: {
          password: '',
        },
        filesData: {
          module: 'image'
        },
        resetRules: {
          password: [
            {required: true, message: '请输入新的密码', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        },
        advancedSearchDialog: false,//高级查询
        searchForm: {
          content: '',
          title: ''
        },//搜索条件

        formImgUrl: {
          otherfile: '',//经营场所证明文件

        },
        searchRules: {
          name: [
            {required: true, message: '请输入业务员姓名', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },//搜索验证
        tableData: [],//列表数据
        totalElements: 0,//列表条数
        //新增
        addNotice: false,//新增业务员模态框
        addNoticeForm: {
          title: '',
          content: '',
          filepath: '',
        },//新增业务员表单
        addRules: {
          title: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },//新增校验
        //修改
        editNotice: false,//修改业务员模态框
        editNoticeForm: {
          id: '',
          title: '',
          content: '',
          filepath: '',
        },//修改业务员表单
        editRules: {

        }
      }
    },
    mounted() {
      this.nowLoginUserId = sessionStorage.getItem('userId') || '';
      console.warn(this.nowLoginUserId);
      //获取列表
      this.getNoticeList(1, 10)

    },
    filters: {
    },
    methods: {
      otherfileUpload(response,file){
        console.log(response);
        this.$message({
          message: '其他附件上传成功',
          type: 'success'
        });
        this.addNoticeForm.filepath = response.obj.path;
        this.formImgUrl.otherfile = this.imgFil(response.obj.path)
      },
      imgFil: function (val) {
        //resource
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val == '' || val == null) {
          return ''
        }
        let arrayStr = val.split('\\'); // 凭\\分割出文件名

        console.log(arrayStr);
        if(arrayStr.length>4){
          return url + '/filepath/'+arrayStr[(arrayStr.length - 2)]+"/" + arrayStr[(arrayStr.length - 1)];
        }else{
          return url + '/filepath/' + arrayStr[(arrayStr.length - 1)];
        }
      },
      otherfileUpload2(response,file){
        console.log(response);
        this.$message({
          message: '其他附件上传成功',
          type: 'success'
        });
        this.editNoticeForm.filepath = response.obj.path;
        this.formImgUrl.otherfile = this.imgFil(response.obj.path)
      },

      /**
       *上传失败
       **/
      handleImageFailed() {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      },


      getNoticeList: function (number, pageSize) {
        this.loading = true;
        getNotice(number, pageSize, this.searchForm).then(res => {
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


      /**
       *newManagerOpen 新增业务员
       **/
      addNoticeOpen: function () {
        this.addNoticeForm = {
          title: '',
          content: '',
          filepath: '',
        };
        this.addNotice = true
        this.formImgUrl.otherfile = "";
      },
      addNoticeClose: function () {
        this.addNoticeForm = {
          title: '',
          content: '',
          filepath: '',
        };
        this.addNotice = false
      },
      //提交添加
      addNoticeSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          noticeAdd(this.addNoticeForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.addNoticeForm = {
              title: '',
              content: '',
              filepath: '',
            };
            this.addNotice = false; //关闭模态框
            this.refresh();
            setTimeout(() => {
              this.btnLoading = false;
            }, 1000);
          }).catch(e => {
            this.loading = false;
            this.btnLoading = false
          })
        })
      },

      /**
       *editNoticeOpen 修改业务员
       **/
      editNoticeOpen: function (data) {
        console.log(data);
        this.editNoticeForm.id = data.id;
        this.editNoticeForm.title = data.title;
        this.editNoticeForm.content = data.content;
        this.editNoticeForm.filepath = data.filepath;
        if( data.filepath!=null) {
          this.formImgUrl.otherfile = this.imgFil(data.filepath);
        }
        this.editNotice = true
      },
      editNoticeClose: function () {
        this.editNotice = false
      },
      //提交编辑
      editNoticeSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          //验证通过，发起编辑请求
          noticeUpdate(this.editNoticeForm).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.editNoticeClose();

            this.$refs.page.refresh();

            setTimeout(() => {
              this.btnLoading = false;
            }, 1000);

          }).catch(() => {
            this.btnLoading = false;
            this.loading = false
          })
        })
      },

      //禁用业务员
      cancle(id) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancle(id).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            setTimeout(() => {
              this.btnLoading = false;
            }, 1000);
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },


      /**
       *查看业务员详情
       **/
      rootDetail: function (data) {
        //let id = data.id
        let id = data.id;
        this.$router.push({path: '/manager/views/managerDetail', query: {id: id}})
      },

      /*
     * 刷新
     * */
      refresh() {
        this.$refs.page.refresh()
      },
      /*
      * 搜索
      * */
      search() {
        this.$refs.page.search()
      },
      /*
      * 重置
      * */

      reset() {
        this.searchForm = {
          content: '',
        };
        this.$refs.page.search()
      }
    }
  }
</script>

<style scoped>
  body .el-table th.gutter {
    display: table-cell !important;
  }

  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }

  .searchItem {
    width: 217px;
    max-width: 100%;
  }

  .addItem {
    width: 300px;
    max-width: 100%;
  }

  .transferbox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .box-card {
    margin: 0;
    padding: 0;
    width: 33%;
    height: 300px;
    overflow-y: scroll;
  }

  .gap {
    margin: 0 20px;
  }

  .el-checkbox + .el-checkbox {
    display: block;
    margin-left: 0 !important;
  }

  .el-radio + .el-radio {
    display: block;
    margin-left: 0 !important;
  }

  .sele_title {
    font-weight: bold;
  }

  .list {
    display: block;
    padding: 2px 0;
    color: #636363;
  }

  .checksave {
    color: #409eff;
  }
</style>
