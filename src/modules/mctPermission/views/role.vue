<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddDialog">添加角色</el-button>
      <el-button icon="el-icon-delete" size="small" @click="deleteRoles">批量删除</el-button>
      <el-button icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="openAccessDialog(scope.row)">分配权限
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="openEditDialog(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total-elements="totalElements"
      :change-callback="getRoleList"
      ref="page"></pagination>
     <el-dialog
    :close-on-click-modal="false"
      title="添加角色"
      :visible.sync="addDialog"
      :before-close="closeAddDialog">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addRole" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="编辑角色"
      :visible.sync="editDialog"
      :before-close="closeEditDialog">
      <el-form>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="currentRow.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editRole" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="权限分配"
      :visible.sync="accessDialog"
      :before-close="closeAccessDialog"
      class="accessDialog">
      <div class="block">
        <!--<el-tree-->
        <!--:data="permissionList"-->
        <!--show-checkbox-->
        <!--ref="tree"-->
        <!--node-key="id"-->
        <!--:default-checked-keys="currentRow.permissions"-->
        <!--:default-expanded-keys="expandedKeys"-->
        <!--:expand-on-click-node="false">-->
        <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
        <!--<span>{{ node.label }}</span>-->
        <!--</span>-->
        <!--</el-tree>-->
        <!--2019-07-05 pm-->
        <!--xwy-->


        <div>
          <div class="checkbox-table" v-for="(item, indexkey) in permissionList" :key="item.id">
            <template>
              <el-checkbox class="check-level-1" v-model='currentRow.permissions' :label="item.id"
                           @change='handleCheck(1,indexkey)'>
        <span class="check-level-1-label">
        {{item.label}}
          <!--&nbsp{{item.id}}-->
        </span>
              </el-checkbox>
              <el-divider></el-divider>
              <div class="check-level-2-box">
                <div v-for="(list , listindex) in item.children" class="check-level-2-item" :key="list.id">
                  <el-checkbox class="check-level-2-checkbox"
                               @change='handleCheck(2,indexkey,listindex)' v-model="currentRow.permissions"
                               :label="list.id">
        <span class="check-level-2-label">
        {{list.label}}
          <!--&nbsp{{list.id}}-->
        </span>
                  </el-checkbox>
                  <div class="check-level-3-box" v-if="list.children.length>0">
                    <div v-for="(api, apiindex) in list.children" :key="api.id"
                         class="check-level-3-item">
                      <el-checkbox class="check-level-3-checkbox" @change='handleCheck(3,indexkey,listindex,apiindex)'
                                   v-model="currentRow.permissions" :label="api.id">
                        <div class="check-level-3-label">{{api.label}}</div>
                      </el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- 20190706 结束-->

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAccessDialog">取 消</el-button>
        <el-button type="primary" @click="getCheckedNodes" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getRole, setDefault, addRole, deleteRoles, editRole, setPermission} from '../api/role'
  import {getAllPermission} from '../api/permission'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'role',
    components: {pagination},
    data() {
      return {
        tableData: [], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: true, // loading效果
        btnLoading: false,
        addDialog: false, // 添加角色模态框
        editDialog: false, // 编辑角色模态框
        accessDialog: false, // 分配模态框
        form: {
          name: '',
          isDefault: false
        }, // 添加角色数据
        currentRow: {
          id: '',
          name: '',
          permissions: [] // 当前角色的权限
        }, // 当前表格对象
        formLabelWidth: '150px', // label宽度
        permissionList: [], // 所有权限
        expandedKeys: [] // 默认展开的权限id
      }
    },
    mounted() {
      this.getRoleList(1, 10)
    },
    methods: {

      // 20190706
      // xwy

      handleCheck: function (type, a = 0, b = 0, c = 0) {
        let self = this;
        if (type === 3) {
          /**
           *index和权限编辑页不同，权限分配是选中子级，父级同时选中
           * 如果需要该为全选才选中父级模式，则把index==** 改为数组长度
           */

            // 三级菜单点击
          let index = 0;
          self.permissionList[a].children[b].children.map(item => {
            if (self.currentRow.permissions.indexOf(item.id) > -1) {
              index += 1;
            }
          });
          console.log(index);
          console.log(self.permissionList[a].children[b].children.length);
          //等于所有长度
          if (index > 0) {
            if (self.currentRow.permissions.indexOf(self.permissionList[a].children[b].id) < 0) {
              self.currentRow.permissions.push(self.permissionList[a].children[b].id);
            }
            this.checkLevelOne(a, b, c)
          } else {
            if (self.currentRow.permissions.indexOf(self.permissionList[a].children[b].id) > -1) {
              self.currentRow.permissions.splice(self.currentRow.permissions.indexOf(self.permissionList[a].children[b].id), 1);
            }
            this.checkLevelOne(a, b, c)
          }
        } else if (type === 2) {
          // 二级菜单点击
          //如果勾选二级全部，则全选接口级别,否则删除全部接口级
          if (self.currentRow.permissions.indexOf(self.permissionList[a].children[b].id) > -1) {
            self.permissionList[a].children[b].children.map(item => {
              if (self.currentRow.permissions.findIndex((n) => n == item.id) < 0) {
                self.currentRow.permissions.push(item.id)
              }
            });
          } else {
            self.permissionList[a].children[b].children.map(item => {
              if (self.currentRow.permissions.findIndex((n) => n == item.id) > -1) {
                self.currentRow.permissions.splice(self.currentRow.permissions.findIndex((n) => n == item.id), 1);
              }
            })
          }
          //计算个数
          let index = 0;
          self.permissionList[a].children.map(item => {
            if (self.currentRow.permissions.indexOf(item.id) > -1) {
              index += 1;
            }
          });
          //等于所有长度
          if (index > 0) {
            if (self.currentRow.permissions.indexOf(self.permissionList[a].id) < 0) {
              self.currentRow.permissions.push(self.permissionList[a].id);
            }
          } else {
            if (self.currentRow.permissions.indexOf(self.permissionList[a].id) > -1) {
              self.currentRow.permissions.splice(self.currentRow.permissions.indexOf(self.permissionList[a].id), 1);
            }
          }

        } else if (type === 1) {

          //一级
          if (self.currentRow.permissions.indexOf(self.permissionList[a].id) > -1) {
            self.permissionList[a].children.map(item => {
              if (self.currentRow.permissions.findIndex((n) => n == item.id) < 0) {
                self.currentRow.permissions.push(item.id);
                //内部再循环
                for (let i in self.permissionList[a].children) {
                  if (self.currentRow.permissions.findIndex((n) => n == self.permissionList[a].children[i].id) < 0) {
                    self.currentRow.permissions.push(self.permissionList[a].children[i].id)
                  }
                  for (let j in self.permissionList[a].children[i].children) {
                    if (self.currentRow.permissions.findIndex((n) => n == self.permissionList[a].children[i].children[j].id) < 0) {
                      self.currentRow.permissions.push(self.permissionList[a].children[i].children[j].id)
                    }
                  }
                }
                //递归结束
              }
            })
          } else {
            self.permissionList[a].children.map(item => {
              if (self.currentRow.permissions.findIndex((n) => n == item.id) > -1) {
                self.currentRow.permissions.splice(self.currentRow.permissions.findIndex((n) => n == item.id), 1);

                //检查是否还有二级，有的话删除
                for (let i in self.permissionList[a].children) {
                  if (self.currentRow.permissions.findIndex((n) => n == self.permissionList[a].children[i].id) > -1) {
                    self.currentRow.permissions.splice(self.permissionList[a].children[i].id, 1);
                  }
                  //检查二级内的接口级，如果还选着则删除接口级
                  self.permissionList[a].children[i].children.map(item => {
                    if (self.currentRow.permissions.findIndex((n) => n == item.id) > -1) {
                      self.currentRow.permissions.splice(self.currentRow.permissions.findIndex((n) => n == item.id), 1);
                    }
                  })
                }
                //多循环结束
              }
            })
          }
        }
        console.log(self.currentRow.permissions)
      },

      //动态一级检查
      checkLevelOne: function (a = 0, b = 0, c = 0) {
        let self = this;
        let index = 0;
        self.permissionList[a].children.map(item => {
          if (self.currentRow.permissions.indexOf(item.id) > -1) {
            index += 1;
          }
        });
        //等于所有长度
        if (index > 0) {
          if (self.currentRow.permissions.indexOf(self.permissionList[a].id) < 0) {
            self.currentRow.permissions.push(self.permissionList[a].id);
          }
        } else {
          if (self.currentRow.permissions.indexOf(self.permissionList[a].id) > -1) {
            self.currentRow.permissions.splice(self.currentRow.permissions.indexOf(self.permissionList[a].id), 1);
          }
        }
      },

      //---------------------------
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDelete(row) {
        this.multipleSelection = [];
        this.multipleSelection.push(row);
        this.deleteRoles()
      },
      /*
       * 获取角色列表
       * */
      getRoleList(number, pageSize) {
        this.loading = true;
        getRole(number, pageSize).then(response => {
          let data = response.obj;
          console.log(data);
          this.tableData = data.content;
          this.totalElements = data.totalElements;
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },
      /*
      * 设置默认角色
      * */
      setDefault: function (row, isDefault) {
        this.loading = true;
        setDefault(row.id, isDefault).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
        })
      },
      /*
     * 添加角色
     * */
      openAddDialog() {
        this.addDialog = true
      },
      closeAddDialog() {
        this.addDialog = false;
        this.form.isDefault = false;
        this.form.name = ''
      },
      addRole() {
        this.loading = true;
        this.btnLoading = true;
        addRole(this.form.name, this.form.isDefault).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.btnLoading = false;
          this.closeAddDialog();
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
        })
      },
      /*
      * 删除角色
      * */
      deleteRoles() {
        this.$confirm('是否删除角色？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.multipleSelection.length) {
            this.loading = true;
            let ids = [];
            this.multipleSelection.forEach((item) => {
              ids.push(item.id)
            });
            deleteRoles(ids).then(response => {
              this.$message({
                message: response.msg,
                type: 'success',
                duration: 1000
              });
              this.multipleSelection = [];
              this.$refs.page.refresh()
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$message({
              message: '请选择角色',
              type: 'warning',
              duration: 1000
            })
          }
        })
      },
      /*
      * 编辑角色
      * */
      openEditDialog(row) {
        this.currentRow.id = row.id;
        this.currentRow.name = row.name;
        this.editDialog = true
      },
      closeEditDialog() {
        this.editDialog = false
      },
      editRole() {
        this.loading = true;
        this.btnLoading = true;
        editRole(this.currentRow.id, this.currentRow.name).then(response => {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          });
          this.btnLoading = false;
          this.closeEditDialog();
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
        })
      },
      /*
      * 打开权限分配
      * */
      openAccessDialog(row) {
        this.accessDialog = true;
        this.currentRow.id = row.id;
        this.currentRow.name = row.name;
        let tmp = [];
        row.permissions.forEach(item => {
          if (item.type === 1 || item.type === 0) {
            tmp.push(item.id)
          }
        });
        /**
         * xwy 2019-07-06
         */
        this.currentRow.permissions = tmp;
        /**
         * end
         */
        getAllPermission().then(response => {
          this.permissionList = this.recursionPermission(response.obj);
          response.obj.forEach((item) => {
            this.expandedKeys.push(item.id)
          })
        }).catch(() => {
        })
      },
      /*
      * 关闭权限分配
      * */
      closeAccessDialog() {
        this.accessDialog = false;
        this.currentRow.permissions = [];
        this.resetChecked()
      },
      /*
      * 分配权限
      * */
      getCheckedNodes() {
        this.loading = true;
        this.btnLoading = true;
        /**
         * annotation  close getHalfCheckedKeys
         */
        // let set = new Set(this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys()));
        // let permissions = Array.from(set);
        /**
         * 20190706 xwy
         */
        let permissions = this.currentRow.permissions || [];
        /**
         * end
         */
        setPermission(this.currentRow.id, permissions).then(response => {
          this.closeAccessDialog();
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          });
          this.btnLoading = false;
          this.$refs.page.refresh()
        }).catch(() => {
          this.btnLoading = false;
          this.loading = false
        })
      },
      /*
      * 递归权限
      * */
      recursionPermission(items) {
        let permissionList = [];
        items.forEach(item => {
          let newItem = {
            id: item.id,
            label: item.name,
            children: item.children
          };
          permissionList.push(newItem);
          if (newItem.children) {
            newItem.children = this.recursionPermission(newItem.children)
          }
        });
        return permissionList
      },
      /*
      * 重置权限树，避免闪动bug
      * */
      resetChecked() {
        // this.$refs.tree.setCheckedKeys([])
      },
      /*
     * 刷新
     * */
      refresh() {
        this.$refs.page.refresh()
      }
    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  /*20190705*/
  /*xwy*/
  /*change pre tree*/
  .checkbox-table {
    width: 100%;
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
    margin: 10px 0 5px 40px
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
    margin: 10px 0 5px 40px
  }

  .check-level-3-label {
    width: 150px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: rgba(112, 112, 112, 1);
  }
</style>
