<template>
  <div class="app-container" v-loading="loading">
    <!--搜索、工具条-->
    <div class="search-tools-bar">
      <template>
        <el-input v-model="searchForm.name" placeholder="按公司名" class="search-input"></el-input>
        <el-input v-model="searchForm.contact" placeholder="按联系人" class="search-input"></el-input>
      </template>
      <div class="block btn-space-input">
        <el-button type="primary" @click="getRewardListRefresh">搜索</el-button>
      </div>
    </div>
    <!--分割线-->
    <el-divider content-position="left">奖励记录</el-divider>
    <!--列表-->
    <div>
      <template>
        <el-table
          :data="rewardTableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="ruleStr"
            label="奖励事项">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="reward"
            label="奖励金额">
          </el-table-column>
          <el-table-column
            prop="recommendedCompanyName"
            label="事项成员">
          </el-table-column>
          <el-table-column
            prop="recommendedCompanyContact"
            label="事项联系人">
          </el-table-column>
          <el-table-column
            prop="recommendedCompanyPhone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            label="当前状态">
            <template slot-scope="scope">
              <span  v-if="scope.row.status==3" class="cur-style">
                <el-tooltip class="item" effect="light" :content="`原因：${scope.row.reason||'无'}`" placement="top">
                   <span>{{scope.row.statusStr}}（查看原因）</span>
                </el-tooltip>
              </span>
              <span v-else class="cur-style">{{scope.row.statusStr}}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="rewardTableDataTotalElement"
          :change-callback="getRewardList"
          ref="rewardPage"></pagination>
      </template>
    </div>
  </div>
</template>

<script>
  import {
    rewardList,
    rewardFindReview,
    auditReward,
    rewardSave
  } from '../api/reward'

  import pagination from '@/components/pagination/index'

  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "rewardRecord",
    mixins:[mixins],
    components: {pagination},
    data() {
      return {
        loading: false, //加载
        //搜索
        searchForm: {
          name: '',
          contact: ''
        },
        //表格数据
        rewardTableData: [],
        rewardTableDataTotalElement: 0,

      }
    },
    mounted() {
      //发起默认搜索
      this.getRewardList(1, 10)
    },
    methods: {
      /**
       * 提请搜索
       */
      getRewardListRefresh: function () {
        this.$refs['rewardPage'].refresh()
      },

      /**
       * 请求列表
       */
      getRewardList: function (pageNumber, pageSize) {
        console.log(pageNumber, pageSize);
        let form = this.searchForm;
        rewardList(pageNumber, pageSize, form).then(res => {
          let data;
          data = res.obj;
          this.rewardTableData = data.content;
          this.rewardTableDataTotalElement = data.totalElements
        }).catch(e => {

        })
      },

      /**
       * 处理成功
       */
      notifySuccess: function (title, text) {
        this.$notify({
          title: title || '提示',
          message: text || '无',
          offset: 85,
          type: 'success'
        });
      },
      /**
       * 处理失败
       */
      notifyError: function (title, text) {
        this.$notify({
          title: title || '提示',
          message: text || '无',
          type: 'error'
        });
      },

      //---------------------------工具-----------------------------------

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*搜索、工具条*/
  .search-tools-bar {
    .search-input {
      width: 217px;
    }

    .block {
      display: inline;
    }

    .btn-space-input {
      margin-left: 10px;
    }
  }


  .reward-form-table {
    width: 100%;
    max-width: 100%;
    border: 0 none;

    tr {
      text-align: left;

      td {
        width: 50%;

        .input-suffix {
          margin-left: 3px;

          font-size: 13px;
          color: #8b8b8b;

          cursor: default;

          user-select: none;
        }
      }
    }
  }

  .cur-style{
    cursor: default;

    user-select: none;
  }
</style>
