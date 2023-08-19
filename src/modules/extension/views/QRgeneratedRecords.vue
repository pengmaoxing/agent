<template>
  <div class="app-container" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>生成记录</span>

        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回上一页</el-button>
        <el-button style="float: right; padding: 3px 0;margin: 0 10px" type="text" @click="batchProductionOpen">批量生成
        </el-button>
      </div>
      <!--内容-->
      <div>

        <el-table
          :data="recordTable"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="id"
            label="批次">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="生成时间">
          </el-table-column>
          <el-table-column
            prop="generateNumber"
            label="生成数量">
          </el-table-column>
          <el-table-column
            prop="merchantName"
            label="商户名">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="操作人">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button class="btn_margin" type="text" @click="downloadFile(scope.row)">批量下载</el-button>
              <el-button class="btn_margin" type="text" @click="deleteFile(scope.row)">删除文件</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total-elements="recordTableTotalElement"
          :change-callback="getList"
          ref="page"></pagination>

      </div>
    </el-card>

    <!--批量生成模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="批量生成"
      :visible.sync="batchProductionVisible"
      width="576px"
      :before-close="batchProductionClose">

      <div>
        <el-form ref="batchForm" :rules="rules" :model="batchForm" label-width="150px">
          <el-form-item label="生成数量：" prop="num">
            <el-form-item>
              <el-radio-group v-model="batchForm.num" size="medium">
                <el-radio-button label="100"></el-radio-button>
                <el-radio-button label="500"></el-radio-button>
                <el-radio-button label="1000"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-input-number size="medium" placeholder="自定义数量"
                               controls-position="right"
                               :min="1" :max="10000"
                               :step="1" :precision="0"
                               v-model="batchForm.num"></el-input-number>
              <el-tooltip class="item" effect="light"
                          content="可以自定义设置数量，也可以通过快捷按钮设置数量" placement="top-start">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </el-form-item>
          </el-form-item>
          <el-form-item label="选择商户：" prop="merchantName">
            <el-autocomplete
              class="inline-input"
              :debounce="100"
              value-key="name"
              :clearable="true"
              v-model="batchForm.merchantName"
              :fetch-suggestions="querySearch"
              placeholder="请输入或选择商户"
              @select="devTest"
            ></el-autocomplete>

            <!--<el-select v-model="batchForm.merchantName"-->
                       <!--:select-when-unmatched="true"-->
                       <!--filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in merchantSelectItem"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.name">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <el-tooltip class="item" effect="light"
                        content="若不输入或选择商户，则生成的二维码不带商户名称" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </el-form>


      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="batchProductionClose">取 消</el-button>
    <el-button type="primary" @click="submitBatch">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import pagination from '@/components/pagination/index'
  import {getQrCodeRecord, addQrCodeRecord, deleteFile, download, merchantSelect} from '@/modules/extension/api/qrCodeRecord'
  import {url} from '@/utils/request'

  export default {
    name: 'QRgeneratedRecords',
    components: {pagination},
    data () {
      var validateNum = (rule, value, callback) => {
        var r = /^\+?[1-9][0-9]*$/

        if (!r.test(value)) {
          this.batchForm.num = 0
        } else {
          if (value < 1) {
            callback(new Error('不能小于1个'))
          } else if (value > 1000) {
            callback(new Error('不能大于1000个'))
          } else {
            callback()
          }
        }
      }
      return {
        loading: '',//加载
        recordTable: [],//表格
        recordTableTotalElement: 0,//条数
        batchProductionVisible: false,//批量生成模态框
        merchantSelectItem:[],
        batchForm: {
          merchantName:'',
          num: 0 //数量
        },
        rules: {
          num: [
            {required: true, message: '数量必须输入', trigger: 'blur'},
            {validator: validateNum, trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.getList(1, 10)
      merchantSelect().then(response => {
        this.merchantSelectItem = response.obj;
      })
    },
    methods: {

      /**
       * 输入建议
       */
      querySearch(queryString, cb) {
        var restaurants = this.merchantSelectItem;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      devTest(item) {
        console.log(item);
      },

      /**
       * 获取列表
       */
      getList (number, pageSize) {
        this.loading = true
        getQrCodeRecord(number, pageSize).then(response => {
          let data = response.obj
          console.log(data)
          this.recordTable = data.content
          this.recordTableTotalElement = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },

      /**
       * 打开批量生成模态框
       */
      batchProductionOpen: function () {
        this.batchProductionVisible = true
      },

      /**
       * 关闭批量生成模态框
       */
      batchProductionClose: function () {
        this.$refs['batchForm'].resetFields()
        this.batchProductionVisible = false
      },

      /**
       * 提交批量
       */

      submitBatch: function () {
        this.$refs['batchForm'].validate((valid) => {
          if (valid) {
            //正确
            addQrCodeRecord(this.batchForm.num,this.batchForm.merchantName).then(response => {
              this.$message({
                message: '操作成功，若生成量过大，系统需要一段时间的处理，请耐心等待',
                type: 'success'
              })
              this.batchProductionClose()
              this.$refs.page.refresh()
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$message.error('还有未填写的内容')
            return false
          }
        })
      },

      /**
       * 删除文件
       */

      deleteFile: function (data) {
        //data row数据
        this.$confirm('此操作将永久删除该文件, 是否继续?', '删除文件', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认删除----
          deleteFile(data.id).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /**
       * 批量下载
       */

      downloadFile: function (data) {
        this.$confirm('若跳转至错误页面，可能是由于二维码生成量过大，请耐心等待一段时间后再进行下载', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let str = data.downloadUrl
          let num = str.indexOf('blankcode')
          let fileurl = str.slice(num)
          console.log(num, url)

          let urltxt = url + '/resource/' + fileurl
          window.location.href = urltxt
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          });
        });
      },

      /**
       * 返回上一页
       */
      goBack: function () {
        this.$router.go('-1')
      },
    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
    vertical-align: middle;
  }

  .btn_margin {
    margin: 0 10px;
  }
</style>
