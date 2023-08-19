<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleBar" :isActive="isClosed"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="avatar-container username">{{username}}</div>
    <div class="avatar-container messageicon">
      <img src="../../../assets/images/nav/mes.png" alt="">
    </div>
    <el-dropdown class="avatar-container" trigger="click">

            <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="resetPasswordDialogOpen">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
    <div class="avatar-container powerIcon" @click="logout">
      <i class="el-icon-switch-button"></i>
    </div>
     <el-dialog
    :close-on-click-modal="false"
      title="重置密码"
      :visible.sync="resetPasswordDialog"
      width="576px"
      :before-close="resetPasswordDialogClose">
      <el-form :model="resetForm" ref="resetForm" label-width="100px">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="resetForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="resetForm.confirmPassword" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="resetPasswordDialogClose">取 消</el-button>
    <el-button type="primary" @click="saveNewPssword">提 交</el-button>
  </span>
    </el-dialog>
  </el-menu>
</template>
<script>
  import {mapGetters} from 'vuex'
  import breadcrumb from '@/components/breadcrumb'
  import hamburger from '@/components/hamburger'
  import {MessageBox} from 'element-ui'
  import {updatePwd} from '@/modules/manager/api/manager'

  export default {
    name: 'navbar',
    data() {
      return {
        // username: '你好，' + (sessionStorage.name ? sessionStorage.name : sessionStorage.username) + (sessionStorage.agentLevel !== 'null' ? `（${sessionStorage.agentLevelName}）` : ''),
        username: '',
        resetPasswordDialog: false,//修改密码对话框
        resetForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      }
    },
    components: {
      breadcrumb,
      hamburger
    },
    mounted() {
      //显示代理等级
      this.showAgentName()
    },
    methods: {
      /**
       * xwy 2019-11-04  显示代理等级
       */
      showAgentName: function () {

        let name = sessionStorage.name ? sessionStorage.name : sessionStorage.username;

        let agentLevel = sessionStorage.agentLevel;

        //判断是否为横向代理或者取值是否成功
        if (agentLevel === '' || agentLevel === undefined || agentLevel === 'undefined' || agentLevel === 'null' || agentLevel === null) {
          agentLevel = null
        }

        let agentNick = agentLevel !== null ? `（${sessionStorage.agentLevelName}）` : '';

        //name 用户名   agentNick代理等级别名
        this.username = `你好，${name}${agentNick}`
      },


      toggleBar() {
        this.$store.dispatch('toggleBar')
      },
      logout() {
        MessageBox.confirm('是否退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          sessionStorage.clear();
          location.reload()
        })
      },
      //重置密码
      resetPasswordDialogOpen: function () {
        console.log(111);
        //获取被修改的ID
        this.resetPasswordDialog = true
      },
      resetPasswordDialogClose: function () {
        this.resetForm.password = '';
        this.resetPasswordDialog = false
      },
      saveNewPssword: function () {
        if (this.resetForm.newPassword != this.resetForm.confirmPassword) {
          this.$message({
            message: '两次密码输入不一致',
            type: 'error'
          });
          return
        }
        //保存密码
        updatePwd(this.resetForm.oldPassword, this.resetForm.newPassword).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.resetForm.password = '';
          this.resetPasswordDialog = false
        }).catch(() => {
          this.loading = false
        })
      },
    },
    computed: {
      ...mapGetters([
        'isClosed'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 85px;
    line-height: 85px;
    border-radius: 0 !important;

    .hamburger-container {
      line-height: 85px;
      height: 85px;
      float: left;
      color: #ccc;
      padding: 5px 10px 0 10px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .avatar-container {
      height: 85px;
      display: inline-block;
      position: absolute;
      right: 70px;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #99a9bf;
  }

  .username {
    right: 210px !important;
    color: #333333;
    font-size: 14px;

    user-select:none;
  }

  .messageicon {
    padding-top: 5px;
    right: 160px !important;
  }

  .powerIcon {
    cursor: pointer;
    right: 35px !important;
  }

</style>
