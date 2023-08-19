<template>
  <div class="app-container" v-loading="loading">
    <!--按钮-->
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.mid" @keyup.enter.native="search" placeholder="mid" size="small"
                class="formItem"></el-input>
      <el-input v-model="searchForm.domainUrl" @keyup.enter.native="search" placeholder="域名" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <!--      <el-button type="primary" size="small" @click="advancedSearchOpen">高级查询</el-button>-->
      <el-button type="primary" size="small" @click="addThirdMchOpen">新增</el-button>
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
          prop="mid"
          label="商户id">
        </el-table-column>
        <el-table-column
          prop="domainUrl"
          label="域名"
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
            <!--<el-button type="text" @click="rootDetail(scope.row)">详情</el-button>-->
            <el-button type="text" @click="editThirdMchOpen(scope.row)">修改</el-button>
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
        :change-callback="getThirdMchList"
        ref="page"></pagination>

    </template>


    <!--添加业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增商户配置"
      :visible.sync="addThirdMch"
      width="800px"
      :before-close="addThirdMchClose">
      <el-form :model="addThirdMchForm" :rules="addRules" ref="addThirdMchForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商户id" request>
          <el-input v-model="addThirdMchForm.mid" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="域名" request>
          <textarea v-model="addThirdMchForm.domainUrl" class="addItem" style="width: 500px;height: 300px;"></textarea>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addThirdMch = false">取 消</el-button>
    <el-button type="primary" @click="addThirdMchSubmit('addThirdMchForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
    <!--添加业务员模态框-->

    <!--修改业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="修改业务员"
      :visible.sync="editThirdMch"
      width="800px"
      :before-close="editThirdMchClose">
      <el-form :model="editThirdMchForm" :rules="editRules" ref="editThirdMchForm" label-width="80px"
               class="demo-ruleForm">
        <el-form-item label="商户id" request>
          <el-input v-model="editThirdMchForm.mid" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="域名" request>
          <textarea v-model="editThirdMchForm.domainUrl" class="addItem" style="width: 500px;height: 300px;"></textarea>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editThirdMchClose">取 消</el-button>
    <el-button type="primary" @click="editThirdMchSubmit('editThirdMchForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    hsfuploadUrl
  } from '@/modules/file/api/upload' // 图片操作API
  import {
    getThirdMch, thirdMchAdd, thirdMchUpdate,  cancle
  } from '../api/thirdmch'
  import pagination from '@/components/pagination/index'
  import {url} from '@/utils/request'

  export default {
    components: {pagination},
    name: 'thirdMchUrl',
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
          domainUrl: '',
          mid: ''
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
        addThirdMch: false,//新增业务员模态框
        addThirdMchForm: {
          mid: '',
          domainUrl: '',
        },//新增业务员表单
        addRules: {
          title: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },//新增校验
        //修改
        editThirdMch: false,//修改业务员模态框
        editThirdMchForm: {
          id: '',
          mid: '',
          domainUrl: '',
        },//修改业务员表单
        editRules: {

        }
      }
    },
    mounted() {
      this.nowLoginUserId = sessionStorage.getItem('userId') || '';
      console.warn(this.nowLoginUserId);
      //获取列表
      this.getThirdMchList(1, 10)

    },
    filters: {
    },
    methods: {


      getThirdMchList: function (number, pageSize) {
        this.loading = true;
        getThirdMch(number, pageSize, this.searchForm).then(res => {
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
      addThirdMchOpen: function () {
        this.addThirdMchForm = {
          mid: '',
          domainUrl: ''
        };
        this.addThirdMch = true
      },
      addThirdMchClose: function () {
        this.addThirdMchForm = {
          mid: '',
          domainUrl: ''
        };
        this.addThirdMch = false
      },
      //提交添加
      addThirdMchSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          thirdMchAdd(this.addThirdMchForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.addThirdMchForm = {
              mid: '',
              domainUrl: '',
            };
            this.addThirdMch = false; //关闭模态框
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
       *editThirdMchOpen 修改业务员
       **/
      editThirdMchOpen: function (data) {
        console.log(data);
        this.editThirdMchForm.id = data.id;
        this.editThirdMchForm.mid = data.mid;
        this.editThirdMchForm.domainUrl = data.domainUrl;
        this.editThirdMch = true
      },
      editThirdMchClose: function () {
        this.editThirdMch = false
      },
      //提交编辑
      editThirdMchSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          //验证通过，发起编辑请求
          thirdMchUpdate(this.editThirdMchForm).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.editThirdMchClose();

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
