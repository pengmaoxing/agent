<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="openFileDialog">上传文件</el-button>
    <el-button type="primary" size="small" @click="openWebsiteDialog">配置官网</el-button>
     <el-dialog
    :close-on-click-modal="false"
      title="文件上传"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="服务器文件夹" label-width="120px">
          <el-input placeholder="服务器文件夹" size="small" v-model="fileData.module"></el-input>
          <el-upload
            style="margin-left: 10px;"
            class="formItem"
            :headers="headers"
            :action="uploadUrl"
            :data="fileData"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">压缩文件只能上传zip格式，文件不能超过200M</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增官网对话框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增官网"
      :visible.sync="websiteDialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="官网域名" label-width="120px">
          <el-input placeholder="官网域名，一级二级域名都可以，例如：pay.website.com" size="small" v-model="domain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="websiteDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="newWebsite" :loading="btnLoading">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import {uploadUrl} from '@/modules/file/api/upload' //图片操作API
  import {newWebsite} from '@/modules/extenset/api/fileConfig' //图片操作API
  import {url} from '@/utils/request'

  export default {
    name: 'fileConfig',
    data () {
      return {
        loading: false,
        btnLoading: false,
        dialogVisible: false,
        websiteDialogVisible: false,
        domain: '',
        url: uploadUrl + '/user',
        headers: {
          authorized: sessionStorage.token
        },
        uploadUrl: url + '/fms/upload/file_upload', // 上传接口
        fileData: {
          module: 'static'
        },
        fileList: []
      }
    },
    mounted () {
      // this.fileData.module = this.fileDir
    },
    methods: {

      openFileDialog () {
        this.dialogVisible = true
      },
      openWebsiteDialog () {
        this.websiteDialogVisible = true
      },
      handleClose (done) {
        this.dialogVisible = false
        this.websiteDialogVisible = false
      },
      beforeAvatarUpload (file) {
        const isLt200M = file.size / 1024 / 1024 < 200
        if (!isLt200M) {
          this.$message.error('上传文件大小不能超过 200MB!')
        }
        return isLt200M
      },
      handleSuccess (response) {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.dialogVisible = false
      },
      newWebsite () {
        this.loading = true
        this.btnLoading = true
        newWebsite(this.domain).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.websiteDialogVisible = false
        }).catch(() => {
          this.btnLoading = false
          this.loading = false
        })
      },
    }
  }
</script>

<style scoped>

</style>
