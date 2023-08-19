<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddSubmenuDialog">添加子节点</el-button>
      <el-button icon="el-icon-plus" size="small" @click="openAddMenuDialog">添加一级菜单</el-button>
      <el-button icon="el-icon-delete" size="small" @click="deletePermission">批量删除</el-button>
      <el-button icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
    </div>


    <!--/*20190705*/-->
    <!--/*xwy*/-->
    <!--/*change pre tree*/-->
    <div class="checkbox-table" v-for="(item, indexkey) in permissionList" :key="item.id">
      <template>
        <el-checkbox class="check-level-1" v-model='menusIds' :label="item.id"
                     @change='handleCheck(1,indexkey)'>

          <span class="check-level-1-label" @click.prevent="handleNodeClick(item)">
            {{item.name}}
            <!--便捷添加-->
            <i class="el-icon-circle-plus addSubMenu-ico" @click.prevent="quiacAddSubmenu(item)"><span
              class="quick-add">添加子节点</span></i>
          </span>
        </el-checkbox>
        <el-divider></el-divider>
        <div class="check-level-2-box">
          <div v-for="(list , listindex) in item.children" class="check-level-2-item" :key="list.id">
            <el-checkbox class="check-level-2-checkbox" @change='handleCheck(2,indexkey,listindex)' v-model="menusIds"
                         :label="list.id">
              <span class="check-level-2-label" @click.prevent="handleNodeClick(list)">
                {{list.name}}
                <!--便捷添加-->
                <i class="el-icon-circle-plus addSubMenu-ico" @click.prevent="quiacAddSubmenu(list)"></i>
              </span>
            </el-checkbox>
            <div class="check-level-3-box" v-if="list.children.length>0">
              <div v-for="(api, apiindex) in list.children" :key="api.id"
                   class="check-level-3-item">
                <el-checkbox class="check-level-3-checkbox" @change='handleCheck(3,indexkey,listindex,apiindex)'
                             v-model="menusIds"
                             :label="api.id">
                  <div class="check-level-3-label" @click.prevent="handleNodeClick(api)">{{api.name}}</div>
                </el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 2019-07-05 xwy -->


    <!--<el-tree :data="permissionList"-->
    <!--node-key="id"-->
    <!--highlight-current-->
    <!--:props="defaultProps"-->
    <!--@node-click="handleNodeClick"-->
    <!--:default-expanded-keys="defaultExpandKeys"-->
    <!--:expand-on-click-node="false"-->
    <!--show-checkbox-->
    <!--ref="tree"-->
    <!--class="permissionTree"></el-tree>-->
    <div class="input-form" id="create">
      <el-tooltip class="item" effect="light" content="按住可以拖动位置" placement="top">
        <div class="input-header" @mousedown.prevent="mousedown"></div>
      </el-tooltip>
      <el-form ref="form" :model="currentNode" label-width="80px" class="editForm">
        <el-form-item label="名称">
          <el-input v-model="currentNode.name" class="input-item"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="currentNode.path" class="input-item"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="currentNode.icon" :disabled="currentNode.type === 1" class="input-item"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input-number v-model="currentNode.sortOrder" :min="1" label="描述文字" class="input-item"></el-input-number>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="currentNode.delFlag" :active-value="1" :inactive-value="-1" class="input-item"></el-switch>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-switch v-model="currentNode.visible" :active-value="1"  class="input-item"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-edit" type="primary" @click="editPermission">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
     <el-dialog
    :close-on-click-modal="false"
      title="添加一级菜单"
      :visible.sync="addMenuDialog"
      :before-close="closeAddMenuDialog">
      <el-form :model="menuForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="排序值" :label-width="formLabelWidth">
          <el-input v-model="menuForm.sortOrder"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddMenuDialog">取 消</el-button>
        <el-button type="primary" @click="addMenu" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="添加子节点"
      :visible.sync="addSubmenuDialog"
      :before-close="closeAddSubmenuDialog">
      <el-form :model="submenuForm" :label-width="formLabelWidth">
        <el-form-item label="名称" >
          <el-input v-model="submenuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="路径" >
          <el-input v-model="submenuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="submenuForm.delFlag" :active-value="1" :inactive-value="-1" class="input-item"></el-switch>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-switch v-model="submenuForm.visible" :active-value="1" :inactive-value="0"  class="input-item"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddSubmenuDialog">取 消</el-button>
        <el-button type="primary" @click="addSubmenu" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllPermission, addPermission, deletePermissions, editPermission} from '../api/permission'

  export default {
    name: 'permission',
    data() {
      return {
        loading: false, // loading效果
        btnLoading: false, // 按钮loading效果
        menuForm: {
          name: '',
          path: '',
          level: 1,
          type: 0,
          parentId: '',
          delFlag: 1,
          sortOrder: 1,
          visible: 1
        }, // 添加一级菜单数据
        addMenuDialog: false, // 添加一级菜单模态框
        submenuForm: {
          name: '',
          path: '',
          level: 1,
          type: 0,
          parentId: '',
          delFlag: 1,
          sortOrder: 1,
          visible: 1
        }, // 添加二级菜单/按钮数据
        addSubmenuDialog: false, // 添加一级菜单模态框
        permissionList: [], // 权限列表
        defaultProps: {
          label: 'name'
        }, // tree字段配置
        currentNode: this.resetCurrentNode(), // 当前对象
        formLabelWidth: '120px',
        defaultExpandKeys: [],
        //-----------------
        menusIds: [], //已选的菜单组
      }
    },
    mounted() {
      this.getAllPermission()
    },
    methods: {
      /**
       * 20190705 xwy
       */
      handleCheck: function (type, a = 0, b = 0, c = 0) {
        let self = this;
        if (type === 3) {

          // 三级菜单点击
          let index = 0;
          self.permissionList[a].children[b].children.map(item => {
            if (self.menusIds.indexOf(item.id) > -1) {
              index += 1;
            }
          });
          console.log(index);
          console.log(self.permissionList[a].children[b].children.length);
          //等于所有长度
          if (index == self.permissionList[a].children[b].children.length) {
            if (self.menusIds.indexOf(self.permissionList[a].children[b].id) < 0) {
              self.menusIds.push(self.permissionList[a].children[b].id);
            }
            this.checkLevelOne(a, b, c)
          } else {
            if (self.menusIds.indexOf(self.permissionList[a].children[b].id) > -1) {
              self.menusIds.splice(self.menusIds.indexOf(self.permissionList[a].children[b].id), 1);
            }
            this.checkLevelOne(a, b, c)
          }
        } else if (type === 2) {
          // 二级菜单点击
          //如果勾选二级全部，则全选接口级别,否则删除全部接口级
          if (self.menusIds.indexOf(self.permissionList[a].children[b].id) > -1) {
            self.permissionList[a].children[b].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.id) < 0) {
                self.menusIds.push(item.id)
              }
            });
          } else {
            self.permissionList[a].children[b].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.id) > -1) {
                self.menusIds.splice(self.menusIds.findIndex((n) => n == item.id), 1);
              }
            })
          }
          //计算个数
          let index = 0;
          self.permissionList[a].children.map(item => {
            if (self.menusIds.indexOf(item.id) > -1) {
              index += 1;
            }
          });
          //等于所有长度
          if (index == self.permissionList[a].children.length) {
            if (self.menusIds.indexOf(self.permissionList[a].id) < 0) {
              self.menusIds.push(self.permissionList[a].id);
            }
          } else {
            if (self.menusIds.indexOf(self.permissionList[a].id) > -1) {
              self.menusIds.splice(self.menusIds.indexOf(self.permissionList[a].id), 1);
            }
          }

        } else if (type === 1) {

          //一级
          if (self.menusIds.indexOf(self.permissionList[a].id) > -1) {
            self.permissionList[a].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.id) < 0) {
                self.menusIds.push(item.id);
                //内部再循环
                for (let i in self.permissionList[a].children) {
                  if (self.menusIds.findIndex((n) => n == self.permissionList[a].children[i].id) < 0) {
                    self.menusIds.push(self.permissionList[a].children[i].id)
                  }
                  for (let j in self.permissionList[a].children[i].children) {
                    if (self.menusIds.findIndex((n) => n == self.permissionList[a].children[i].children[j].id) < 0) {
                      self.menusIds.push(self.permissionList[a].children[i].children[j].id)
                    }
                  }
                }
                //递归结束
              }
            })
          } else {
            self.permissionList[a].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.id) > -1) {
                self.menusIds.splice(self.menusIds.findIndex((n) => n == item.id), 1);

                //检查是否还有二级，有的话删除
                for (let i in self.permissionList[a].children) {
                  if (self.menusIds.findIndex((n) => n == self.permissionList[a].children[i].id) > -1) {
                    self.menusIds.splice(self.permissionList[a].children[i].id, 1);
                  }
                  //检查二级内的接口级，如果还选着则删除接口级
                  self.permissionList[a].children[i].children.map(item => {
                    if (self.menusIds.findIndex((n) => n == item.id) > -1) {
                      self.menusIds.splice(self.menusIds.findIndex((n) => n == item.id), 1);
                    }
                  })
                }
                //多循环结束

              }
            })
          }

        }

        console.log(self.menusIds)
      },


      //动态一级检查
      checkLevelOne: function (a = 0, b = 0, c = 0) {
        let self = this;
        let index = 0;
        self.permissionList[a].children.map(item => {
          if (self.menusIds.indexOf(item.id) > -1) {
            index += 1;
          }
        });
        //等于所有长度
        if (index == self.permissionList[a].children.length) {
          if (self.menusIds.indexOf(self.permissionList[a].id) < 0) {
            self.menusIds.push(self.permissionList[a].id);
          }
        } else {
          if (self.menusIds.indexOf(self.permissionList[a].id) > -1) {
            self.menusIds.splice(self.menusIds.indexOf(self.permissionList[a].id), 1);
          }
        }
      },

      //便捷添加节点
      quiacAddSubmenu: function (item) {
        this.handleNodeClick(item);
        this.openAddSubmenuDialog()
      },

      //拖动窗口
      mousedown(event) {
        // console.log(event)
        this.selectElement = document.getElementById('create');
        var div1 = this.selectElement;
        this.selectElement.style.cursor = 'move';
        this.selectElement.style.border = '1px solid gray';
        this.isDowm = true;
        var distanceX = event.clientX - this.selectElement.offsetLeft;
        var distanceY = event.clientY - this.selectElement.offsetTop;
        // alert(distanceX)
        // alert(distanceY)
        // console.log(distanceX)
        // console.log(distanceY)
        document.onmousemove = function (ev) {
          var oevent = ev || event;
          div1.style.left = oevent.clientX - distanceX + 'px';
          div1.style.top = oevent.clientY - distanceY + 'px'
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          div1.style.cursor = 'default';
          div1.style.border = 'none';
        }
      },


      /**
       * -------------------------------------------
       */



      /*
      * 选中所有权限
      * */
      handleNodeClick(data) {
        if (data.delFlag === 1) {
          this.currentNode.delFlag = 1
        } else if (data.delFlag === -1) {
          this.currentNode.delFlag = -1
        }
        this.currentNode.id = data.id
        this.currentNode.name = data.name
        this.currentNode.path = data.path
        this.currentNode.level = data.level
        this.currentNode.type = data.type
        this.currentNode.sortOrder = data.sortOrder
        this.currentNode.icon = data.icon
        this.currentNode.visible = data.visible
      },
      /*
      * 修改权限
      * */
      editPermission() {
        console.log(this.currentNode)
        if (this.currentNode.id === '') {
          this.$message({
            message: '请选择节点',
            type: 'warning'
          })
        } else {
          this.loading = true
          editPermission({
            id: this.currentNode.id,
            name: this.currentNode.name,
            path: this.currentNode.path,
            delFlag: this.currentNode.delFlag,
            sortOrder: this.currentNode.sortOrder,
            icon: this.currentNode.icon,
            visible: this.currentNode.visible
          }).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.refresh()
          }).catch(() => {
            this.loading = false
          })
        }
      },
      /*
      * 获取所有权限
      * */
      getAllPermission() {
        this.loading = true
        getAllPermission().then(response => {
          console.log(response.obj)
          this.permissionList = response.obj
          response.obj.forEach((item) => {
            this.defaultExpandKeys.push(item.id)
            this.defaultExpandKeys.push()
          })
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },
      /*
      * 打开添加一级菜单模态框
      * */
      openAddMenuDialog() {
        this.addMenuDialog = true
      },
      /*
      * 关闭添加一级菜单模态框
      * */
      closeAddMenuDialog() {
        this.addMenuDialog = false
        this.menuForm = {
          name: '',
          path: '',
          level: 1,
          type: 0,
          parentId: '',
          sortOrder: 1,
          visible: 1
        }
      },
      /*
      * 添加一级菜单模态框
      * */
      addMenu() {
        this.btnLoading = true
        this.loading = true
        addPermission(this.menuForm).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.closeAddMenuDialog()
          this.refresh()
        }).catch(() => {
          this.btnLoading = false
          this.loading = false
        })
      },
      /*
      * 打开添加子节点模态框
      * */
      openAddSubmenuDialog() {
        if (this.currentNode.id === '') {
          this.$message({
            message: '请选择父节点',
            type: 'warning'
          })
        } else if (this.currentNode.type === 1) {
          this.$message({
            message: '该节点无法添加子节点',
            type: 'warning'
          })
        } else {
          this.submenuForm.level = this.currentNode.level + 1
          this.submenuForm.parentId = this.currentNode.id
          this.submenuForm.delFlag = 1;
          this.submenuForm.visible = 1;
          if (this.currentNode.level === 2) {
            this.submenuForm.type = 1
          }
          this.addSubmenuDialog = true
        }
      },
      /*
      * 关闭添加子节点模态框
      * */
      closeAddSubmenuDialog() {
        this.addSubmenuDialog = false
        this.submenuForm = {
          name: '',
          path: '',
          level: 1,
          type: 0,
          parentId: '',
          visible: 1
        }
      },
      /*
      * 添加子节点
      * */
      addSubmenu() {
        this.btnLoading = true
        this.loading = true
        addPermission(this.submenuForm).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.closeAddSubmenuDialog()
          this.refresh()
        }).catch(() => {
          this.btnLoading = false
          this.loading = false
        })
      },
      /*
      * 删除子节点
      * */
      deletePermission() {
        //2019-07-06
        let checkedKeys = this.menusIds;
        console.log(checkedKeys)
        if (checkedKeys.length) {
          this.$confirm('是否删除节点？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            deletePermissions(checkedKeys).then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              })
              this.refresh()
            }).catch(() => {
              this.loading = false
            })
          })
        } else {
          this.$message({
            message: '请选择节点',
            type: 'warning'
          })
        }
      },
      /*
      * 重置当前节点
      * */
      resetCurrentNode() {
        return {
          id: '',
          name: '',
          path: '',
          icon: '',
          sortOrder: 1,
          delFlag: true,
          level: 1,
          type: 1
        }
      },
      /*
      * 刷新页面
      * */
      refresh() {
        this.currentNode = this.resetCurrentNode()
        this.getAllPermission()
      }
    }
  }
</script>

<style scoped>
  .editForm {
    width: 600px;
    margin: 30px auto;
  }

  .permissionTree {
    width: 300px;
    position: absolute;
    top: 82px;
    left: 20px;
  }

  .app-container {
    overflow: hidden;
  }

  /*20190705*/
  /*xwy*/
  /*change pre tree*/
  .checkbox-table {
    width: 1130px;
    margin-top: 20px;
  }

  .check-level-1 {
    font-weight: 600;
  }

  .check-level-1-label {
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    color: rgba(62, 189, 255, 1);
  }

  .check-level-2-box {
    margin-bottom: 20px;
  }

  .check-level-2-item {
    display: block;
    margin: 10px 0 20px 40px
  }

  .check-level-2-checkbox {
  }

  .check-level-2-label {
    width: 150px;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    color: rgba(112, 112, 112, 1);
  }

  .check-level-3-box {
    margin-bottom: 10px;
  }

  .check-level-3-item {
    display: inline-block;
    margin: 10px 0 10px 40px
  }

  .check-level-3-label {
    width: 150px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: rgba(112, 112, 112, 1);
  }

  .input-form {
    border-radius: 5px;
    z-index: 1;
    background-color: white;
    width: 504px;
    position: fixed;
    top: calc(50% - 180px);
    right: 0px;
    padding: 5px 5px;
  }

  .input-form .input-item {
    width: 400px;
  }

  .input-header {
    width: 100%;
    height: 20px;
    background-color: white;
  }

  .quick-add {
    line-height: 21px;
    font-size: 14px;
    margin-left: 5px;
    color: #99a9bf;
  }

  .addSubMenu-ico {
    color: #99a9bf !important;
    margin-left: 10px;
    font-size: 16px;
  }

  .addSubMenu-ico:hover {
    color: #3ebdff !important;
  }

</style>
