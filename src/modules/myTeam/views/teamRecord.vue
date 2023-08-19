<template>
  <div class="app-container" v-loading="loading">
    <!--搜索-->
    <div class="tools-bar">
      <el-input v-model.trim="searchForm.name" clearable="" placeholder="按公司名搜索" class="search-input"
                size="small"></el-input>
      <el-input v-model.trim="searchForm.contact" clearable="" placeholder="按联系人搜索" class="search-input"
                size="small"></el-input>
      <el-select v-model="searchForm.status" placeholder="按状态查询" clearable="" class="search-select" size="small">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="block left-spacing">
        <el-button type="primary" size="small" @click="listRefresh">查 询</el-button>
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
              <template v-else>--</template>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="agentDetailOpen(scope.row)">详情</el-button>
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
    <template>
      <!--详情-->
      <agentdetail  ref="agentdetailspage"></agentdetail>
    </template>
  </div>
</template>

<script>
  import pagination from '@/components/pagination/index'

  import {
    getList,
  } from '../api/teamRecord' //接口
  import agentdetail from '@/components/agentDetails/views/agentDetail' //详情

  export default {
    name: "teamRecord",
    components: {pagination,agentdetail},
    data() {
      return {
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

        //页面
        loading:false,
        statusOption: [
         {value: 2, name: '待审核'},
          {value: 3, name: '已签约'},
        ],

        //搜索
        searchForm: {
          name: '',
          contact: '',
          status: ''
        },

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
       * 获取历史推荐列表
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
</style>
