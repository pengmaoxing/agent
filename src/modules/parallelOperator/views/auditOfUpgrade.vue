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
            prop="companyName"
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
            prop="referralsCompanyName"
            label="推荐人">
          </el-table-column>
          <el-table-column
            prop="agentLevelName"
            label="当前级别">
          </el-table-column>
          <el-table-column
            prop="applyAgentLevelName"
            label="申请级别">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="applyStatus"
            label="审核状态">
            <template slot-scope="scope">
              <span>{{scope.row.applyStatus |applyStatusFil}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="agentDetailOpen(scope.row)">详情</el-button>
              <el-button type="text" :disabled="scope.row.applyStatus!=1" @click="upAudit(scope.row,2)">通过</el-button>
              <el-button type="text" :disabled="scope.row.applyStatus!=1" @click="upAudit(scope.row,3)">驳回</el-button>
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
        <agentdetail ref="agentdetailspage"></agentdetail>
      </div>
    </div>
  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import pagination from '@/components/pagination/index'

  import {getList, submitAudit} from '../api/auditOfUpgrade'
  import agentdetail from '@/components/agentDetails/views/agentDetail' //详情

  export default {
    name: "auditOfUpgrade",
    components: {pagination, agentdetail},
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
          status: '',
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
    filters: {
      applyStatusFil: function (val) {
        if (val == null || val === '') {
          return ''
        }
        let text = '';

        switch (parseInt(val)) {
          case 1:
            text = '审核中';
            break;
          case 2:
            text = '审核通过';
            break;
          case 3:
            text = '审核不通过';
            break;
          default:
            text = '未知';
            break;
        }

        return text

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

      /**
       * 通过与驳回
       */

      upAudit: function (row, status) {
        let id = row.id;

        let text = '';
        if (status === 2) {
          text = "审核通过"
        } else {
          text = "驳回升级"
        }

        this.$confirm(`此操作将${text}, 是否继续?`, '重要操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          submitAudit(id, status).then(res => {
            this.$message.success('操作成功。');
            this.listRefresh()
          }).catch(e => {
            this.listRefresh()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: `已取消${text}操作`
          });
        });


      },
      /**
       * 详情打开
       */
      agentDetailOpen: function (row) {
        //子组件打开
        row.name = row.companyName;
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
