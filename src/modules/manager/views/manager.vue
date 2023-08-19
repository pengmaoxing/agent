<template>
  <div class="app-container" v-loading="loading">
    <!--按钮-->
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="姓名" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.phone" @keyup.enter.native="search" placeholder="手机" size="small"
                class="formItem"></el-input>
      <!--状态-->
      <el-select v-model="searchForm.status" @change="search" placeholder="状态" size="small"
                 clearable class="formItem">
        <el-option value="1" label="启用"></el-option>
        <el-option value="2" label="禁用"></el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <!--      <el-button type="primary" size="small" @click="advancedSearchOpen">高级查询</el-button>-->
      <el-button type="primary" size="small" @click="addManagerOpen">新增</el-button>
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
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex|sexFil}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="email"
          label="E-mail">
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status|statusFil}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="400px">
          <template slot-scope="scope">
            <!--//如果有方法，传入参数“scope.row”-->
            <!--//如果需要索引，传入参数“scope.$index”-->
            <!--//如果需要当前整页表格数据，传入参数“tableData”-->
            <!--届时需要传入scpoe.row.id -->
            <el-button type="text" @click="rootDetail(scope.row)">详情</el-button>

            <el-button type="text" @click="editManagerOpen(scope.row)">修改</el-button>
            <el-button type="text" @click="transferOpen(scope.row.id)">转移</el-button>

            <!--<el-button v-if="scope.row.id!=nowLoginUserId"-->
            <!--type="text"-->
            <!--@click="cancle(scope.row.id)">禁用-->
            <!--</el-button>-->

            <el-button
              type="text"
              @click="resetPasswordDialogOpen(scope.row)">重置密码
            </el-button>
            <el-button
              v-if="scope.row.status===1 && scope.row.id!=nowLoginUserId"
              type="text"
              style="color: #ff745f"
              @click="disableOrEnable(scope.row.id,2)">禁用
            </el-button>
            <el-button
              v-else-if="scope.row.status===2"
              type="text"
              style="color: #3dc87b"
              @click="disableOrEnable(scope.row.id,1)">启用
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total-elements="totalElements"
        :change-callback="getManagerList"
        ref="page"></pagination>

    </template>


    <!--高级查询模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="高级查询"
      :visible.sync="advancedSearchDialog"
      width="320px"
      :before-close="advancedSearchClose">
      <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="50px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="searchForm.name" class="searchItem"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="searchForm.phone" class="searchItem"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="searchForm.sex" placeholder="选择性别">
            <el-option value="1" label="男"></el-option>
            <el-option value="2" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="选择状态">
            <el-option value="1" label="启用"></el-option>
            <el-option value="2" label="禁用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="advancedSearchDialog = false">取 消</el-button>
    <el-button type="primary" @click="advancedSearch('searchForm')">确 定</el-button>
  </span>
    </el-dialog>
    <!--高级查询模态框-->

    <!--添加业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增业务员"
      :visible.sync="addManager"
      width="440px"
      :before-close="addManagerClose">
      <el-form :model="addManagerForm" :rules="addRules" ref="addManagerForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addManagerForm.name" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addManagerForm.phone" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="addManagerForm.email" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addManagerForm.sex" placeholder="选择性别" class="addItem">
            <el-option value="1" label="男"></el-option>
            <el-option value="2" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addManagerForm.status" placeholder="选择状态" class="addItem">
            <el-option value="1" label="启用"></el-option>
            <el-option value="2" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择等级">
          <el-select
            v-model="addManagerForm.roleId"
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in addLevelOption"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addManager = false">取 消</el-button>
    <el-button type="primary" @click="addManagerSubmit('addManagerForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
    <!--添加业务员模态框-->

    <!--修改业务员模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="修改业务员"
      :visible.sync="editManager"
      width="440px"
      :before-close="editManagerClose">
      <el-form :model="editManagerForm" :rules="editRules" ref="editManagerForm" label-width="80px"
               class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editManagerForm.name" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="editManagerForm.email" class="addItem"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editManagerForm.sex" placeholder="选择性别" class="addItem">
            <el-option value='1' :key=1 label="男"></el-option>
            <el-option value='2' :key=2 label="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editManagerClose">取 消</el-button>
    <el-button type="primary" @click="editManagerSubmit('editManagerForm')" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>
    <!--修改业务员模态框-->

    <!--转移-->
     <el-dialog
    :close-on-click-modal="false"
      title="转移业务员"
      :visible.sync="transferVisible"
      width="800px"
      :before-close="transferClose">

      <div class="transferbox" v-loading="transferLoading">

        <el-card class="box-card">
          <div v-if="operatorOption.length>0">
            <p>{{agentName}}</p>
            <el-checkbox-group v-model="operatorDataId">
              <el-checkbox :label="x.value" :key="x.value" v-for="x in operatorOption">{{x.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="distributeOption.length>0">
            <p>{{disName}}</p>
            <el-checkbox-group v-model="channelDataId">
              <el-checkbox :label="x.value" :key="x.value" v-for="x in distributeOption">{{x.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="merchantOption.length>0">
            <p>{{subName}}</p>
            <el-checkbox-group v-model="merchantDataId">
              <el-checkbox :label="x.value" :key="x.value" v-for="x in merchantOption">{{x.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>

        <div class="gap">
          <!--          <img src="@/assets/images/manager/transfer.png" width="50" height="50" alt="">-->
        </div>

        <el-card class="box-card">
          <div>
            <div>
              <p>业务员</p>
              <el-radio-group v-model="managerDataId">
                <el-radio :label="x.value" :key="x.value" v-for="x in managerOption">{{x.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-card>

        <div class="gap">
          <el-button plain @click="submitTransfer">移交</el-button>
        </div>

        <el-card class="box-card">
          <div>
            <div>
              <p class="sele_title">已选择</p>
              <template v-if="showTextOperator.length>0">
                <span class="list">将以下{{agentName}}：</span>
                <span class="list" style="margin-left: 10px" v-for="i in showTextOperator">{{i}}</span>
                <span class="list">移交给 {{showTextManager[0]}}</span>
                <br>
              </template>
              <template v-if="showTextChannel.length>0">
                <span class="list">将以下{{disName}}：</span>
                <span class="list" style="margin-left: 10px" v-for="i in showTextChannel">{{i}}</span>
                <span class="list">移交给 {{showTextManager[0]}}</span>
                <br>
              </template>
              <template v-if="showTextMerchant.length>0">
                <span class="list">将以下商户：</span>
                <span class="list" style="margin-left: 10px" v-for="i in showTextMerchant">{{i}}</span>
                <span class="list">移交给 {{showTextManager[0]}}</span>
                <br>
              </template>
            </div>
            <p class="checksave"
               v-show="showTextOperator.length>0 || showTextChannel.length>0 || showTextMerchant.length>0"
            >如需保存以上设置<br/>请点击确定</p>
          </div>
        </el-card>

      </div>


      <span slot="footer" class="dialog-footer">
    <el-button @click="transferVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveTransfer" v-show="saveBtn" :loading="btnLoading">确 定</el-button>
  </span>
    </el-dialog>
    <!--转移-->

    <!--重置密码对话框 -->
     <el-dialog
    :close-on-click-modal="false"
      title="重置业务员密码"
      :visible.sync="resetPasswordDialog"
      width="576px"
      :before-close="resetPasswordDialogClose">

      <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="100px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="resetPasswordDialogClose">取 消</el-button>
    <el-button type="primary" @click="saveNewPssword" :loading="btnLoading">提 交</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getManager, resetPassword, managerAdd, managerUpdate, disableOrEnable, cancle
    , selectItemByTypeAndKind, managerTransfer, saveTransfer
  } from '../api/manager'
  import pagination from '@/components/pagination/index'

  export default {
    components: {pagination},
    name: 'manager',
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
        resetForm: {
          password: '',
        },
        resetRules: {
          password: [
            {required: true, message: '请输入新的密码', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        },
        advancedSearchDialog: false,//高级查询
        searchForm: {
          name: '',
          phone: '',
          sex: '',
          status: ''
        },//搜索条件
        searchRules: {
          name: [
            {required: true, message: '请输入业务员姓名', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入业务员手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码格式不符合', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },//搜索验证
        tableData: [],//列表数据
        totalElements: 0,//列表条数
        //新增
        addManager: false,//新增业务员模态框
        addLevelOption: [],
        addManagerForm: {
          name: '',
          phone: '',
          sex: '',
          email: '',
          status: '',
          roleId: '',
          companyId: '',
        },//新增业务员表单
        addRules: {
          name: [
            {required: true, message: '请输入业务员姓名', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入业务员手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码格式不符合', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入业务员电子邮箱', trigger: 'blur'},
            {validator: emailReg, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          level: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
        },//新增校验
        //修改
        editManager: false,//修改业务员模态框
        editManagerForm: {
          id: '',
          name: '',
          sex: '',
          email: '',
        },//修改业务员表单
        editRules: {
          name: [
            {required: true, message: '请输入业务员姓名', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入业务员手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码格式不符合', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入业务员电子邮箱', trigger: 'blur'},
            {validator: emailReg, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ]
        },//修改校验

        //转移
        transferVisible: false, //转移模态框
        transferLoading: true,//加载
        tmpid: '',

        operatorOption: [],
        distributeOption: [],
        merchantOption: [],
        managerOption: [],//业务员数据

        saveBtn: false,//保存转移按钮

        operatorDataId: [], //选中的运营商id
        channelDataId: [],//选中的渠道商id
        merchantDataId: [],//选中的商户id
        managerDataId: '',//选中的业务员
        showTextOperator: [], //选中的运营商文字
        showTextChannel: [], //选中的渠道商文字
        showTextMerchant: [], //选中的商户文字
        showTextManager: [], //选中的业务员文字

        nowLoginUserId: '', //当前登录用户id

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    mounted() {
      this.nowLoginUserId = sessionStorage.getItem('userId') || '';
      console.warn(this.nowLoginUserId);

      //获取列表
      this.getManagerList(1, 10)

    },
    filters: {
      // 性别过滤器
      sexFil: function (val) {
        let txt = '';

        switch (parseInt(val)) {
          case 1:
            txt = '男';
            break;
          case 2:
            txt = '女';
            break;
          default :
            txt = '未知';
            break
        }
        return txt
      },
      //状态过滤器
      statusFil: function (val) {
        let txt = '';

        switch (parseInt(val)) {
          case 1:
            txt = '启用';
            break;
          case 2:
            txt = '禁用';
            break;
          default :
            txt = '未知';
            break
        }
        return txt
      }
    },
    methods: {

      /*
  * 获取角色列表
  * */
      selectItemByTypeAndKind() {
        if (!this.addLevelOption.length) {
          selectItemByTypeAndKind().then(response => {
            this.addLevelOption = response.obj
          }).catch(() => {
          })
        }
      },

      /**
       *getManagerList 获取业务员列表
       * */
      getManagerList: function (number, pageSize) {
        this.loading = true;
        getManager(number, pageSize, this.searchForm).then(res => {
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
       * advancedSearchOpen 高级搜索
       * */
      advancedSearchOpen: function () {
        this.advancedSearchDialog = true
      },
      advancedSearchClose: function () {
        this.advancedSearchDialog = false
      },
      //高级查询（普通查询不验证，使用search方法）
      advancedSearch: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          //验证通过，发起查询请求

        })
      },

      /**
       *newManagerOpen 新增业务员
       **/
      addManagerOpen: function () {
        this.selectItemByTypeAndKind();
        this.addManager = true
      },
      addManagerClose: function () {
        this.addManagerForm = {
          name: '',
          phone: '',
          sex: '',
          email: '',
          status: '',
          level: '',
          companyId: '',
        };
        this.addManager = false
      },
      //提交添加
      addManagerSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          //验证通过，发起添加请求
          this.addManagerForm.companyId = sessionStorage.getItem('companyId');
          managerAdd(this.addManagerForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.addManagerForm = {
              name: '',
              phone: '',
              sex: '',
              email: '',
              status: '',
              level: '',
              companyId: '',
            };
            this.addManager = false; //关闭模态框
            this.$refs.page.refresh();
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
       *editManagerOpen 修改业务员
       **/
      editManagerOpen: function (data) {
        console.log(data);
        this.editManagerForm.id = data.id;
        this.editManagerForm.name = data.name;
        this.editManagerForm.sex = data.sex + '';
        this.editManagerForm.email = data.email;
        this.editManager = true
      },
      editManagerClose: function () {
        this.editManager = false
      },
      //提交编辑
      editManagerSubmit: function (formName) {
        this.btnLoading = true;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.btnLoading = false;
            return false
          }
          //验证通过，发起编辑请求
          managerUpdate(this.editManagerForm).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.editManagerClose();

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

      //启用或禁用业务员
      disableOrEnable(id, status) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableOrEnable(id, status).then(response => {
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
        }).catch(e => {
          this.$message('没有改变')
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
      /**
       *禁用业务员
       **/
      destroyManager: function (data) {
        console.warn('禁用业务员↓');
        console.log(data)
      },
      /**
       *启用业务员
       **/
      enableManager: function (data) {
        console.warn('转移业务员↓');
        console.log(data)
      },

      /**
       *转移
       **/
      transferOpen: function (id) {
        console.warn('转移业务员↓');
        console.log(id);
        this.tmpid = id;

        //获取可用数据
        managerTransfer(id).then(res => {
          console.log(res);
          let data = res.obj;
          if (data.operaSelectItem != undefined) {
            this.operatorOption = data.operaSelectItem
          }

          if (data.distributeSelectItem != undefined) {
            this.distributeOption = data.distributeSelectItem
          }

          if (data.merchantSelectItems != undefined) {
            this.merchantOption = data.merchantSelectItems
          }

          if (data.managerSelectItem != undefined) {
            this.managerOption = data.managerSelectItem
          }

        }).catch(e => {
          console.log(e);
          this.$message.error('获取数据失败，无法使用转移功能');
          this.transferVisible = false
        });

        this.transferVisible = true;

        this.transferLoading = false //加载动画关闭

      },

      //关闭转移
      transferClose: function () {
        this.transferVisible = false
      },
      //显示这次转移
      submitTransfer: function () {
        this.transferLoading = true; //加载动画开启
        let x1 = this.operatorOption;
        let x2 = this.distributeOption;
        let x3 = this.merchantOption;
        let y1 = this.operatorDataId;
        let y2 = this.channelDataId;
        let y3 = this.merchantDataId;

        let z = this.managerOption;


        if (y1.length < 1 && y2.length < 1 && y3.length < 1) {
          this.transferLoading = false; //加载动画关闭
          this.$message('什么都没有选择！');
          return
        }

        if (z == '' || z == null || z == undefined) {
          this.transferLoading = false; //加载动画关闭
          this.$message('业务员还未选择！');
          return
        }

        let tmpOP = [];
        if (y1.length > 0) {
          for (let i in x1) {
            for (let j in y1) {
              if (y1[j] == x1[i].value) {
                tmpOP.push(x1[i].name)
              }
            }
          }
          this.showTextOperator = tmpOP
        }
        let tmpME = [];
        if (y2.length > 0) {
          for (let i in x2) {
            for (let j in y2) {
              if (y2[j] == x2[i].value) {
                tmpME.push(x2[i].name)
              }
            }
          }
          this.showTextChannel = tmpME
        }
        let tmpMA = [];
        if (y3.length > 0) {
          for (let i in x3) {
            for (let j in y3) {
              if (y3[j] == x3[i].value) {
                tmpMA.push(x3[i].name)
              }
            }
          }
          this.showTextMerchant = tmpMA
        }

        let tmpS = []; //业务员

        for (let i in z) {
          if (this.managerDataId == z[i].value) {
            tmpS.push(z[i].name)
          }
        }
        this.showTextManager = tmpS;
        this.transferLoading = false; //加载动画关闭
        this.saveBtn = true

      },

      //保存这次转移
      saveTransfer: function () {

        this.btnLoading = true;
        let operaIds = this.operatorDataId; //选中的运营商ID数组
        let distributeIds = this.channelDataId; //选中的渠道商ID数组
        let merchantIds = this.merchantDataId; //选中的商户ID数组
        let managerId = this.managerDataId; //选中的业务员
        // 发起请求

        saveTransfer(operaIds, distributeIds, merchantIds, managerId).then(res => {
          console.log(res);
          //清空
          this.operatorDataId = [];
          this.channelDataId = [];
          this.merchantDataId = [];
          this.managerDataId = '';
          this.showTextOperator = [];
          this.showTextChannel = [];
          this.showTextMerchant = [];
          this.transferOpen(this.tmpid);
          this.transferVisible = false;
          this.$message.success('转移成功');


          this.saveBtn = false; //隐藏转移
          setTimeout(() => {
            this.btnLoading = false
          }, 1000);

        }).catch(e => {
          this.btnLoading = false;
          console.log(e)
        })

      },

      /*
      * 重置密码
      * */
      //重置密码
      resetPasswordDialogOpen: function (data) {
        //获取被修改的ID
        this.resetPWid = data.id;
        this.resetPasswordDialog = true

      },
      resetPasswordDialogClose: function () {
        this.resetForm.password = '';
        this.resetPasswordDialog = false
      },
      saveNewPssword: function () {
        this.btnLoading = true;
        console.log('表单密码:' + this.resetForm.password);

        this.$refs['resetForm'].validate((valid) => {
          if (valid) {
            //保存密码
            resetPassword(this.resetPWid, this.resetForm.password).then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              });
              this.resetForm.password = '';
              this.resetPasswordDialog = false;

              setTimeout(() => {
                this.btnLoading = false;
              }, 1000);
            }).catch(() => {
              this.loading = false;
              this.btnLoading = false
            })
          } else {
            this.$message.error('您还未输入新的密码');
            this.btnLoading = false;
            return false
          }
        })

      },
      //跳转详情页
      rooterDeatil(data) {
        //console.log(data)
        //query发送ID到详情
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
          name: '',
          phone: '',
          sex: '',
          status: ''
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
