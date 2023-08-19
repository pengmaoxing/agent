webpackJsonp([8],{"2mUG":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("vLgD");a("h2q/");var l={name:"operaDetail",components:{pagination:a("+ThO").a},data:function(){return{id:"",activeName:"1",resetPasswordDialog:!1,operaDetail:{},disTributeData:[],disTributeDataElements:0,managerData:[],managerDataElements:0,merchantData:[],merchantDataElements:0,tabRefresh:!0,resetPWid:"",resetForm:{password:""},rules:{password:[{required:!0,message:"请输入新的密码",trigger:"blur"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}]},operatorName:"",topName:this.globalAlias.topName,agentName:this.globalAlias.agentName,disName:this.globalAlias.disName,subName:this.globalAlias.subName}},created:function(){},mounted:function(){this.id=this.$route.query.id,this.getOperRaDetail(this.id),this.getMerchantList(1,10)},methods:{goBack:function(){this.$router.go("-1")},changeTabs:function(t,e){var a=this;this.tabRefresh=!1,this.$nextTick(function(){a.tabRefresh=!0}),"1"==t.name?this.getMerchantList(1,10):"2"==t.name&&this.findUsersByCompanyId(1,10)},getOperRaDetail:function(t){var e=this;(function(t){return Object(s.a)({url:"/auth/company/distribute/detail",method:"get",params:{id:t}})})(t).then(function(t){e.operaDetail=t.obj}).catch(function(t){e.loading=!1})},getMerchantList:function(t,e){var a=this;(function(t,e,a){return Object(s.a)({url:"/merchant/merchant/list",method:"get",params:{pageNumber:t,pageSize:e,companyId:a}})})(t,e,this.id).then(function(t){var e=t.obj;a.merchantData=e.content,a.merchantDataElements=e.totalElements,setTimeout(function(){a.loading=!1},500)}).catch(function(t){a.loading=!1})},findUsersByCompanyId:function(t,e){var a=this;(function(t,e,a){return Object(s.a)({url:"/auth/user/list",method:"get",params:{pageNumber:t,pageSize:e,companyId:a}})})(t,e,this.id).then(function(t){var e=t.obj;a.managerData=e.content,a.managerDataElements=e.totalElements,setTimeout(function(){a.loading=!1},500)}).catch(function(t){a.loading=!1})},resetPasswordDialogOpen:function(t){this.resetPWid=t.id,this.resetPasswordDialog=!0},resetPasswordDialogClose:function(){this.resetForm.password="",this.resetPasswordDialog=!1},saveNewPssword:function(){var t,e,a=this;(t=this.resetPWid,e=this.resetForm.password,Object(s.a)({url:"/auth/user/reset_password",method:"post",params:{id:t,password:e}})).then(function(t){a.$message({message:t.msg,type:"success"}),a.resetForm.password="",a.resetPasswordDialog=!1}).catch(function(){a.loading=!1})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card_box"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"name_title"},[t._v(t._s(t.operaDetail.name))]),t._v(" "),a("el-button",{staticStyle:{float:"right","font-size":"16px"},attrs:{type:"text"},on:{click:t.goBack}},[a("i",{staticClass:"el-icon-back"}),t._v(" 返回列表\n      ")])],1),t._v(" "),a("div",[a("table",{staticClass:"info_table",attrs:{width:"100%"}},[a("tbody",[a("tr",[a("td",{staticClass:"tb_title"},[t._v("联系人")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.contact))]),t._v(" "),a("td",{staticClass:"tb_title"},[t._v("联系电话")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.phone))])]),t._v(" "),a("tr",[a("td",{staticClass:"tb_title"},[t._v("公司")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.name))]),t._v(" "),a("td",{staticClass:"tb_title"},[t._v("归属业务员")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.saleName))]),t._v(" "),a("td",{staticClass:"tb_title"},[t._v("加盟时间")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.endCooperaTime))])]),t._v(" "),a("tr",[a("td",{staticClass:"tb_title"},[t._v("状态")]),t._v(" "),a("td",{staticClass:"tb_text"},[[1==t.operaDetail.status?[t._v("未启用")]:2===t.operaDetail.status?[t._v("待审核")]:3===t.operaDetail.status?[t._v("已签约")]:4===t.operaDetail.status?[t._v("过期")]:5===t.operaDetail.status?[t._v("注销")]:6===t.operaDetail.status?[t._v("驳回")]:t._e()]],2),t._v(" "),a("td",{staticClass:"tb_title"},[t._v("联系地址")]),t._v(" "),a("td",{staticClass:"tb_text"},[t._v(t._s(t.operaDetail.province)+"→"+t._s(t.operaDetail.city)+"→"+t._s(t.operaDetail.address))])])])])])]),t._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"20px"}},[a("div",[a("el-tabs",{on:{"tab-click":t.changeTabs},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"商户列表",name:"1"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.merchantData,"empty-text":"未查询到数据"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"商户名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"contact",label:"联系人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"经营类别"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.businessLevOne)+"-"+t._s(e.row.businessLevTwo)+"-"+t._s(e.row.businessLevThree))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"managerName",label:"所属业务员"}})],1),t._v(" "),t.tabRefresh?a("pagination",{ref:"page",attrs:{"total-elements":t.merchantDataElements,"change-callback":t.getMerchantList}}):t._e()],1),t._v(" "),a("el-tab-pane",{attrs:{label:"业务员列表",name:"2"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.managerData,"empty-text":"未查询到数据"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sex",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.sex?[t._v("男")]:2===e.row.sex?[t._v("女")]:t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"email",label:"电子邮箱"}}),t._v(" "),a("el-table-column",{attrs:{prop:"companyName",label:t.agentName}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.status?[t._v("启用")]:2===e.row.status?[t._v("禁用")]:[t._v("驳回")]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.resetPasswordDialogOpen(e.row)}}},[t._v("重置密码")])]}}])})],1),t._v(" "),t.tabRefresh?a("pagination",{ref:"page",attrs:{"total-elements":t.managerDataElements,"change-callback":t.findUsersByCompanyId}}):t._e()],1)],1)],1)]),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"重置业务员密码",visible:t.resetPasswordDialog,width:"576px","before-close":t.resetPasswordDialogClose},on:{"update:visible":function(e){t.resetPasswordDialog=e}}},[a("el-form",{ref:"resetForm",attrs:{model:t.resetForm,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"新密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:t.resetForm.password,callback:function(e){t.$set(t.resetForm,"password",e)},expression:"resetForm.password"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.resetPasswordDialogClose}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saveNewPssword}},[t._v("提 交")])],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(l,r,!1,function(t){a("zxVg")},"data-v-f20ae0fe",null);e.default=o.exports},zxVg:function(t,e){}});
//# sourceMappingURL=8.8ca833703a958daa9528.js.map