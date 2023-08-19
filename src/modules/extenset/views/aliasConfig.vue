<template>
  <div class="app-container" v-loading="loading">

    <div class="set-box">
      <el-button type="" size="middel" @click="listRefresh">刷 新</el-button>
      <el-button type="primary" size="middel" class="right-btn" @click="addOpen">添 加</el-button>
    </div>

    <div class="table-box">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="providerName"
          label="服务商名称">
        </el-table-column>
        <el-table-column
          prop="levelOne"
          label="一级代理名称">
        </el-table-column>
        <el-table-column
          prop="levelTwo"
          label="二级代理名称">
        </el-table-column>
        <el-table-column
          prop="levelThree"
          label="三级代理名称">
        </el-table-column>
        <el-table-column
          prop="levelFour"
          label="四级代理名称">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="modifyOpen(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total-elements="tableDataTotal"
        :change-callback="getAliasConfigList"
        ref="page"></pagination>
    </div>
    <!--表单-->
    <div>
      <!--添加-->
       <el-dialog
    :close-on-click-modal="false"
        title="添加"
        :visible.sync="addDialogVisible"
        width="550px"
        :before-close="addClose">
        <div>
          <el-form :model="addForm" ref="addForm" label-width="150px">
            <el-form-item label="选择服务商">
              <el-select v-model="addForm.serviceProviderId" placeholder="请选择服务商">
                <el-option
                  v-for="item in providerOption"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="一级代理名称：">
              <el-input v-model.trim="addForm.levelOne" placeholder="">一级代理名称</el-input>
            </el-form-item>

            <el-form-item label="二级代理名称：">
              <el-input v-model.trim="addForm.levelTwo" placeholder="">二级代理名称</el-input>
            </el-form-item>

            <el-form-item label="三级代理名称：">
              <el-input v-model.trim="addForm.levelThree" placeholder="">三级代理名称</el-input>
            </el-form-item>

            <el-form-item label="四级代理名称：">
              <el-input v-model.trim="addForm.levelFour" placeholder="">四级代理名称</el-input>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addClose">取 消</el-button>
    <el-button type="primary" @click="saveProviderBefore" :loading="btnLoading">提 交</el-button>
  </span>
      </el-dialog>
      <!--修改-->
       <el-dialog
    :close-on-click-modal="false"
        title="修改"
        :visible.sync="modifyDialogVisible"
        width="550px"
        :before-close="modifyClose">
        <div>
          <el-form :model="modifyForm" ref="modifyForm" label-width="150px">
            <el-form-item label="一级代理名称：">
              <el-input v-model.trim="modifyForm.levelOne" placeholder="">一级代理名称</el-input>
            </el-form-item>

            <el-form-item label="二级代理名称：">
              <el-input v-model.trim="modifyForm.levelTwo" placeholder="">二级代理名称</el-input>
            </el-form-item>

            <el-form-item label="三级代理名称：">
              <el-input v-model.trim="modifyForm.levelThree" placeholder="">三级代理名称</el-input>
            </el-form-item>

            <el-form-item label="四级代理名称：">
              <el-input v-model.trim="modifyForm.levelFour" placeholder="">四级代理名称</el-input>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="modifyClose">取 消</el-button>
    <el-button type="primary" @click="modifyProviderBefore" :loading="btnLoading">提 交</el-button>
  </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    getAliasConfigList,
    getProviderList,
    findAliasConfig,
    saveProvider,
    modifyProvider,
  } from '../api/aliasConfig'
  import pagination from '@/components/pagination/index'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "aliasConfig",
    mixins:[mixins],
    components: {pagination},
    data() {
      return {
        loading: false,
        btnLoading:false,

        tableData: [],
        tableDataTotal: 0,

        //服务商下拉列表
        providerValue: '',
        providerOption: [],

        //添加
        addDialogVisible: false,
        addForm: {
          serviceProviderId: '',
          levelOne: '',
          levelTwo: '',
          levelThree: '',
          levelFour: '',
        },
        //修改
        modifyDialogVisible: false,
        modifyForm: {
          id: '',
          levelOne: '',
          levelTwo: '',
          levelThree: '',
          levelFour: '',
        }

      }
    },
    mounted() {
      this.getAliasConfigList(1, 10);
      this.getProviderList()
    },
    methods: {
      /**
       * 获取列表
       */
      getAliasConfigList: function (pageNumber, pageSize) {
        getAliasConfigList(pageNumber, pageSize).then(res => {
          let data = res.obj;
          this.tableData = data.content;
          this.tableDataTotal = data.totalElements
        }).catch(e => {

        })
      },


      /**
       * 服务商下拉列表
       */
      getProviderList: function () {
        getProviderList().then(res => {
          let data = res.obj;
          this.providerOption = data
        }).catch(e => {

        })
      },

      addClose: function () {
        this.addDialogVisible = false
      },
      addOpen: function () {
        this.addDialogVisible = true
      },

      saveProviderBefore: function () {
        this.saveProvider()
      },
      saveProvider: function () {
        let form = this.deepCopy(this.addForm);
        console.log(form);
        this.btnLoading=true;
        saveProvider(form).then(res => {
          this.$message.success('保存成功');
          this.addClose();
          this.$refs['page'].refresh();
          setTimeout(()=>{
            this.btnLoading=false
          },1000)
        }).catch(e => {

        })
      },

      /**
       * 修改
       */
      modifyClose: function () {
        this.modifyDialogVisible = false
      },
      modifyOpen: function (row) {
        if (row) {
          let id = row.serviceProviderId;
          findAliasConfig(id).then(res => {
            let data = res.obj;
            this.modifyForm.id = data.id;
            this.modifyForm.levelOne = data.levelOne || '';
            this.modifyForm.levelTwo = data.levelTwo || '';
            this.modifyForm.levelThree = data.levelThree || '';
            this.modifyForm.levelFour = data.levelFour || ''
          }).catch(e => {

          })
        }
        this.modifyDialogVisible = true
      },

      modifyProviderBefore: function () {
        this.modifyProvider()
      },
      modifyProvider: function () {
        let form = this.deepCopy(this.modifyForm);
        console.log(form);
        this.btnLoading=true;
        modifyProvider(form).then(res => {
          this.$message.success('修改成功');
          this.modifyClose();
          this.$refs['page'].refresh();
          setTimeout(()=>{
            this.btnLoading=false
          },1000)
        }).catch(e => {

        })
      },
      /**
       * 列表刷新
       */
      listRefresh: function () {
        this.$refs['page'].refresh()
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .set-box {

    .right-btn {
      float: right;
    }
  }

  .table-box {
    margin-top: 20px;
  }

</style>
