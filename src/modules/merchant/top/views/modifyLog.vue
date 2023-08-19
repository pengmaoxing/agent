<template>
  <div class="app-container" v-loading="loading">

    <div>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="merchantName"
            label="商户名">
          </el-table-column>
          <el-table-column
            prop="merchantAcct"
            label="商户账号">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="downLoadFile(scope.row)">下载申请文件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="totalElements"
          :change-callback="getLog"
          ref="page">
        </pagination>
      </template>

    </div>

  </div>
</template>

<script>
  import {getModifyLogList} from '../api/modifyLog'
  import {url} from '@/utils/request'
  import pagination from '@/components/pagination/index'

  export default {
    name: "modifyLog",
    components: {pagination},
    data() {
      return {
        loading: false,
        tableData: [],
        totalElements: 0,
        downloading: false

      }
    },
    mounted() {
      this.getLog(1, 10)
    },
    methods: {

      /**
       *获取记录
       */

      getLog: function (pageNumber, pageSize) {
        getModifyLogList(pageNumber, pageSize).then(res => {
          let data = res.obj;
          this.tableData = data.content;
          this.totalElements = data.totalElements || 0
        }).catch(e => {

        })
      },


      /**
       *下载
       */

      downLoadFile: function (data) {
        let link = this.fileFil(data.path);
        this.$message.success('即将下载');

        setTimeout(() => {
          console.log('下载链接' + link);
          if (link) {
            window.location.href = link
          }
        }, 500)

      },

      /**
       * 转链接
       * @param val
       * @returns {string}
       */

      fileFil: function (val) {
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val === '' || val == null) {
          return ''
        }
        let arrayStr = val.split('\\'); // 凭\\分割出文件名
        let urltxt;
        urltxt = url + '/word/' + arrayStr[(arrayStr.length - 1)];
        return urltxt
      },

    }
  }
</script>

<style scoped>

</style>
