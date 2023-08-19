<template>
  <div class="app-container" v-loading="loading">
    <!--操作区-->
    <div class="tools-bar">
      <el-input v-model.trim="searchForm.name" clearable="" placeholder="按公司名搜索" class="search-input"
                size="small"></el-input>
      <el-input v-model.trim="searchForm.content" clearable="" placeholder="按联系人搜索" class="search-input"
                size="small"></el-input>
      <div class="block left-spacing">
        <el-button type="primary" size="small" @click="listRefresh">查询</el-button>

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
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="agentDetailOpen(scope.row)">详情</el-button>
              <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
              <el-button type="text" @click="logicalDel(scope.row)">注销</el-button>
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
    getList
  } from '../api/operatorList' //本页接口
  import {logicalDel, resetPwd} from '../api/publicAPI' //用户接口
  import agentdetail from '@/components/agentDetails/views/agentDetail' //详情

  export default {
    name: "operatorSigned",
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
          content: '',
          status: 3,
        },
        statusOption: [
          {value: 1, name: '未启用'}, {value: 2, name: '待审核'},
          {value: 3, name: '已签约'}
        ],

        //表格
        listData: [],
        listDataTotalElement: 0,

      }
    },
    mounted() {
      //获取列表
      this.getList(1, 10)
    },

    methods: {

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

      //重置商户密码
      resetPassword(row) {
        let phone = row.phone;

        this.$confirm('是否重置？', '提示', {
          confirmButtonText: '重置',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(phone).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.$refs['page'].refresh()
          }).catch(() => {
          })
        })
      },

      /**
       * 注销
       */
      logicalDel: function (row) {
        let id;
        id = row.id;

        this.$confirm('确认注销?', '提示', {
          confirmButtonText: '注销',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          logicalDel(id).then(res => {
            this.$message({
              type: 'success',
              message: '注销完成，请刷新页面。'
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

</style>
