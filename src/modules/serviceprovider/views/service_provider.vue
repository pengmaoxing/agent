<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" @change="search" placeholder="公司" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.contact" @change="search" placeholder="联系人" size="small"
                class="formItem"></el-input>
      <!--状态-->
      <el-select v-model="searchForm.status" @change="search" placeholder="状态" size="small"
                 clearable class="formItem">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="newMemberOpen">新增</el-button>
      <el-upload
        style="margin-left: 10px;"
        class="formItem"
        :headers="headers"
        :action="uploadUrl"
        :data="fileData"
        :on-success="handleSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">上传授权文件</el-button>
      </el-upload>

<!--      <el-button type="warning" size="small" @click="flowDetailDownLoadOpen">商户流水明细导出</el-button>
      <el-button type="warning" size="small" @click="flowCollectDownLoadOpen">商户流水汇总导出</el-button>-->
      <!--<el-button type="warning" size="small" @click="xinhuiCollectDownLoadOpen">信汇佣金统计导出</el-button>-->

    </div>

    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司"
        width="220">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="120">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.status===3">已签约</template>
          <template v-else-if="scope.row.status===5">注销</template>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.agentWay===1">纵向</template>
          <template v-else-if="scope.row.agentWay===2">横向</template>
          <template v-else>未知</template>
        </template>
      </el-table-column>

      <el-table-column label="BCRM版本管理">
        <template slot-scope="scope">
          <el-button type="text" @click="goVerManager(scope.row.id)">BCRM版本管理</el-button>
        </template>
      </el-table-column>

      <el-table-column label="审核开关">
        <template slot-scope="scope">
          <template v-if="scope.row.needexamine==2">无需审核</template>
          <template v-else>需审核</template>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <!--修改基础信息-->
          <el-button type="text" @click="editMemberOpen(scope.row)">修改</el-button>
          <!--注销服务商-->
          <el-button
            v-if="scope.row.status===3"
            type="text"
            @click="OperatorUpdateAudit(scope.row.id,5)">注销
          </el-button>
          <!--签约服务商-->
          <el-button
            v-else-if="scope.row.status===5"
            type="text"
            @click="OperatorUpdateAudit(scope.row.id,3)">签约
          </el-button>
          <!--重置密码-->
          <el-button
            type="text"
            @click="resetPassword(scope.row)">重置密码
          </el-button>
          <!--回显资料详情-->
          <el-button type="text" @click="infoDetailDialogOpen(scope.row)">{{topName}}信息</el-button>
          <!--资料录入-->
          <el-button type="text" @click="infoInputDialogOpen(scope.row)">编辑{{topName}}信息</el-button>

          <el-button type="text" @click="openTopConfigDialog(scope.row)">支付参数配置</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total-elements="totalElements"
      :change-callback="getProviderList"
      ref="page"></pagination>



     <el-dialog
    :close-on-click-modal="false"
      :title="`支付参数配置`"
      :visible.sync="topPayDialog"
      :before-close="closeTopPayDialog">


      <div divName="选项" class="config-header">
        <el-radio-group v-model="topParam.payChannel"
                        @change="change_payChannel($event)">
          <el-radio v-for="(item,index) in getPayConfigOption"
                    :label="item.value"
                    :key="index">{{item.name}}
          </el-radio>
        </el-radio-group>
      </div>


      <el-form ref="dynamicForm" label-width="160px" label-suffix="："
               size="medium" :disabled="payDisable">

        <el-form-item v-for="(item,index) in dynamicForm"
                      :key="index"
                      :label="item.title">

          <!--如果是证书上传-->
          <div v-if="item.inputType==='file'">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadUrl"
              :data="fileData"
              :on-success="(response, file, fileList)=>fileUploadSuccess(response, file, fileList,item)"
              :show-file-list="false">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>

          <!--如果是普通输入框-->
          <div v-else>
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </div>

        </el-form-item>


      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTopPayDialog">取 消</el-button>
        <el-button type="warning" @click="canConfig">配 置</el-button>
        <el-button type="primary" @click="submitJsonConfigBefore" :disabled="payDisable" :loading="btnLoading">提 交
        </el-button>
      </div>
    </el-dialog>


    <!--新增模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增"
      width="400px"
      :visible.sync="newMember"
      :before-close="newMemberClose">

      <el-form :model="newMemberForm" :rules="Rules" ref="newMemberForm" :label-width="newFormLabelWidth"
               size="mini">
        <el-form-item label="代理方式：" prop="agentWay">
          <el-radio-group v-model="newMemberForm.agentWay" size="small">
            <el-radio-button
              v-for="(item,index) in agentWayOption"
              :key="index"
              :label="item.value">{{item.name}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="公司/个人：" show-message prop="name">
          <el-input v-model="newMemberForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" show-message prop="contact">
          <el-input v-model="newMemberForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="手机：" show-message prop="phone">
          <el-input v-model="newMemberForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="省份：" prop="province">
          <el-select v-model="newMemberForm.province" placeholder="请选择省份"
                     size="small" class="formItem"
                     @change="getProv($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataProv[0]['prov']">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-select v-model="newMemberForm.city" placeholder="请选择城市"
                     size="small" class="formItem"
                     @click="getCity($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataCity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：" show-message prop="address">
          <el-input v-model="newMemberForm.address"></el-input>
        </el-form-item>

        <el-form-item label="审核开关" >
          <el-select v-model="newMemberForm.needexamine" placeholder="请选择审核开关" class="input-width">
            <el-option label="需审核" value="1"></el-option>
            <el-option label="无需审核" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="newMemberClose">取消</el-button>
    <el-button type="primary" @click="providerAdd(1)" v-loading="btnLoading" :disabled="btnLoading">确定</el-button>
  </span>
    </el-dialog>
    <!--新增模态框-->

    <!--编辑模态框-->
     <el-dialog
    :close-on-click-modal="false"
      :title="'编辑'+agentName"
      width="400px"
      :visible.sync="editMember"
      :before-close="editMemberClose">

      <el-form :model="editMemberForm" :rules="Rules" ref="ruleForm" :label-width="newFormLabelWidth"
               size="mini">

        <!--<el-form-item label="代理方式">-->
        <!--<el-radio-group v-model="editMemberForm.agentWay" size="small">-->
        <!--<el-radio-button :label="1">纵向</el-radio-button>-->
        <!--<el-radio-button :label="2">横向</el-radio-button>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->

        <el-form-item label="公司/个人：" show-message prop="company">
          <el-input v-model="editMemberForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" show-message prop="contact">
          <el-input v-model="editMemberForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="省份：" prop="province">
          <el-select v-model="editMemberForm.province" placeholder="请选择省份"
                     size="small" class="formItem"
                     @change="getProv($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataProv[0]['prov']">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-select v-model="editMemberForm.city" placeholder="请选择城市"
                     size="small" class="formItem"
                     @click="getCity($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataCity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：" show-message prop="address">
          <el-input v-model="editMemberForm.address"></el-input>
        </el-form-item>

        <el-form-item label="审核开关" >
          <el-select v-model="editMemberForm.needexamine" placeholder="请选择审核开关" class="input-width">
            <el-option label="需审核" value="1"></el-option>
            <el-option label="无需审核" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="editMemberClose">取 消</el-button>
    <el-button type="primary" @click="editOpera" v-loading="btnLoading" :disabled="btnLoading">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑模态框-->


    <!--资料详情模态框-->
     <el-dialog
    :close-on-click-modal="false"
      :title="topName+'信息'"
      :visible.sync="infoDetailDialogVisible"
      width="576px"
      :before-close="infoDetailDialogClose">
      <!--内容-->
      <div class="details-info-file">
        <table>
          <tr>
            <td>域名</td>
            <td>{{infoDetailData.domainName||'--'}}</td>
          </tr>
          <tr>
            <td>版权说明</td>
            <td>{{infoDetailData.copyrightInfo||'--'}}</td>
          </tr>
          <tr>
            <td>ICP备案号</td>
            <td>{{infoDetailData.icpInfo||'--'}}</td>
          </tr>
          <tr>
            <td>技术支持</td>
            <td>{{infoDetailData.techSupport||'--'}}</td>
          </tr>
          <tr>
            <td>客服电话</td>
            <td>{{infoDetailData.servicePhone||'--'}}</td>
          </tr>
          <tr>
            <td>logo</td>
            <td><img :src="getImg(infoDetailData.logo)||'--'" alt="LOGO" class="logo-img-box"/></td>
          </tr>
          <tr>
            <td>登录页背景图</td>
            <td><img :src="getImg(infoDetailData.bgmPhoto)||'--'" alt="登录页背景图" class="bg-img-box"></td>
          </tr>
          <tr>
            <td>商户登录页背景图</td>
            <td><img :src="getImg(infoDetailData.mctBgmPhoto)||'--'" alt="商户登录页背景图" class="bg-img-box"></td>
          </tr>
          <tr>
            <td>微信二维码</td>
            <td><img :src="getImg(infoDetailData.wechatQrcode)||'--'" alt="微信二维码" class="bg-img-box"></td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoDetailDialogClose">关 闭</el-button>
  </span>
    </el-dialog>
    <!--资料详情模态框-->
     <el-dialog
    :close-on-click-modal="false"
      :title="'编辑'+topName"
      :visible.sync="infoInputDialogVisible"
      :lock-scroll="false"
      width="576px"
      :before-close="infoInputDialogClose">
      <!--录入-->
      <div>
        <el-form :model="infoInputForm" :rules="infoRule" ref="infoInput" label-width="130px">
          <el-form-item label="域名：" prop="domainName">
            <el-input v-model="infoInputForm.domainName" class="input-width"></el-input>
            <el-tooltip class="item" effect="light" content="支持多域名，用英文逗号隔开，主域名（二级域名）放在第一位"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <el-input v-model="infoInputForm.productName" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="技术支持：" prop="techSupport">
            <el-input v-model="infoInputForm.techSupport" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="客服电话：" prop="servicePhone">
            <el-input v-model="infoInputForm.servicePhone" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="版权说明：" prop="copyrightInfo">
            <el-input v-model="infoInputForm.copyrightInfo" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="ICP备案号：" prop="icpInfo">
            <el-input v-model="infoInputForm.icpInfo" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="微信二维码：" prop="wechatQrcode">
            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="wxUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_wx_url" :src="info_wx_url" class="logo">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-button v-if="info_wx_url" type="text" @click="removeImg('wx')">重置图片</el-button>
            <!--<el-input v-model="infoInputForm.wechatQrcode" class="input-width"></el-input>-->
          </el-form-item>
          <el-form-item label="Logo：" prop="logo">
            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="logoUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_logo_url" :src="info_logo_url" class="logo">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-button v-if="info_logo_url" type="text" @click="removeImg('logo')">重置图片</el-button>

          </el-form-item>

          <el-form-item label="登录页背景：" prop="bgmPhoto">

            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="bgUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_bgmPhoto_url" :src="info_bgmPhoto_url" class="logo bgimg">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-button v-if="info_bgmPhoto_url" type="text" @click="removeImg('bgmPhoto')">重置图片</el-button>

          </el-form-item>


          <el-form-item label="商户登录页背景：" prop="bgmPhoto">

            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="mactbgUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_mctBgmPhoto_url" :src="info_mctBgmPhoto_url" class="logo bgimg">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-button v-if="info_mctBgmPhoto_url" type="text" @click="removeImg('mctBgmPhoto')">重置图片</el-button>

          </el-form-item>

          <el-form-item label="二维码背景图：" prop="qrCodeBackGround">

            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="qrbUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_qrCodeBackGround_url" :src="info_qrCodeBackGround_url" class="logo bgimg">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-button type="text" @click="downloadMould('bg')">下载背景模板图</el-button>
          </el-form-item>

          <el-form-item label="二维码Logo：" prop="qrCodeLogo">
            <el-upload
              class="logo-uploader"
              :action="url"
              :data="filesData"
              name="files"
              :show-file-list="false"
              :on-success="qrlUpload"
              :on-error="handleImageFailed"
              :before-upload="beforeLogoUpload"
              :headers="headers">
              <img v-if="info_qrCodeLogo_url" :src="info_qrCodeLogo_url" class="logo bgimg">
              <i v-else class="el-icon-plus logo-uploader-icon"></i>
            </el-upload>
            <el-tooltip class="item" effect="light" content="若不需要logo，请上传任意透明图"
                        placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoInputDialogClose">取 消</el-button>
    <el-button type="primary" @click="infoInputSubmit" v-loading="btnLoading" :disabled="btnLoading">确 定</el-button>
  </span>
    </el-dialog>

    <!--商户流水明细导出-->
     <el-dialog
    :close-on-click-modal="false"
      title="商户流水明细导出"
      :visible.sync="flowDetailVisible"
      width="579px"
      :before-close="flowDetailDownLoadClose">
      <div>

        <el-form :model="flowDetailForm" ref="flowDetailForm"
                 :rules="DownloadRules"
                 label-width="100px" label-suffix="：">
          <el-form-item label="代理商" prop="company">
            <el-select v-model="flowDetailForm.company"
                       class="input-width-2" clearable
                       @change="flowDetailGetLabel"
                       filterable placeholder="支持关键字搜索">
              <el-option
                v-for="item in companyOption"
                :key="item.id"
                :label="item.name"
                :value="`${item.id},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="flowDetailForm.payWay"
                       class="input-width-2"
                       @change="flowDetailGetPayWayLabel"
                       clearable placeholder="请选择支付方式">
              <el-option
                v-for="item in PayWayOption"
                :key="item.value"
                :label="item.name"
                :value="`${item.value},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付通道" prop="payChannel">
            <el-select v-model="flowDetailForm.payChannel"
                       class="input-width-2"
                       @change="flowDetailGetPayChannelLabel"
                       clearable placeholder="请选择支付通道">
              <el-option
                v-for="item in PayChannelOption"
                :key="item.value"
                :label="item.name"
                :value="`${item.value},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间段">
            <el-date-picker
              v-model="flowDetailForm.days"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期时间"
              end-placeholder="结束日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flowDetailDownLoadClose">取 消</el-button>
        <el-button type="primary" @click="flowDetailDownLoad">下 载</el-button>
      </div>
    </el-dialog>


    <!--商户汇总导出-->
     <el-dialog
    :close-on-click-modal="false"
      title="商户流水汇总导出"
      :visible.sync="flowCollectVisible"
      width="579px"
      :before-close="flowCollectDownLoadClose">
      <div>

        <el-form :model="flowCollectForm" ref="flowCollectForm"
                 label-width="100px" label-suffix="：" :rules="DownloadRules">
          <el-form-item label="代理商" prop="company">
            <el-select v-model="flowCollectForm.company"
                       class="input-width-2" clearable
                       @change="flowCollectGetLabel"
                       filterable placeholder="支持关键字搜索">
              <el-option
                v-for="item in companyOption"
                :key="item.id"
                :label="item.name"
                :value="`${item.id},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="flowCollectForm.payWay"
                       class="input-width-2"
                       @change="flowCollectGetPayWayLabel"
                       clearable placeholder="请选择支付方式">
              <el-option
                v-for="item in PayWayOption"
                :key="item.value"
                :label="item.name"
                :value="`${item.value},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付通道" prop="payChannel">
            <el-select v-model="flowCollectForm.payChannel"
                       class="input-width-2"
                       @change="flowCollectGetPayChannelLabel"
                       clearable placeholder="请选择支付通道">
              <el-option
                v-for="item in PayChannelOption"
                :key="item.value"
                :label="item.name"
                :value="`${item.value},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间段">
            <el-date-picker
              v-model="flowCollectForm.days"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期时间"
              end-placeholder="结束日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flowCollectDownLoadClose">取 消</el-button>
        <el-button type="primary" @click="flowCollectDownLoad">下 载</el-button>
      </div>
    </el-dialog>

      <!--信汇佣金统计导出-->
     <el-dialog
    :close-on-click-modal="false"
      title="信汇佣金统计导出"
      :visible.sync="xinhuiCollectVisible"
      width="579px"
      :before-close="xinhuiCollectDownLoadClose">
      <div>

        <el-form :model="xinhuiCollectForm" ref="xinhuiCollectForm"
                 label-width="100px" label-suffix="：" :rules="DownloadRules">
          <el-form-item label="服务商" prop="company">
            <el-select v-model="xinhuiCollectForm.company"
                       class="input-width-2" clearable
                       @change="xinhuiCollectGetLabel"
                       filterable placeholder="支持关键字搜索">
              <el-option
                v-for="item in providerOption"
                :key="item.value"
                :label="item.name"
                :value="`${item.value},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间段" prop="days">
            <el-date-picker
              v-model="xinhuiCollectForm.days"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期时间"
              end-placeholder="结束日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xinhuiCollectDownLoadClose">取 消</el-button>
        <el-button type="primary" @click="xinhuiCollectDownLoad">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProviderList,
    providerAdd,
    providerUpdate,
    updateStatus,
    findDetail,
    findEntryDetail,
    submitDetail,
    findServiceAgentWay,
    findPayWay,
    findPayChannel,
    findCompany,
    downloadDetail,
    downloadCollect,
    getProviderItem,
    downloadXinhuiCollect
  } from '../api/service_provider'
  import {getPayConfigByTop, getPayConfigAndValueByTop2, savePayConfig2} from '../../merchant/top/api/merchant'
  import {adminResetPwd} from '@/modules/system/api/user'
  import pagination from '@/components/pagination/index'
  import cityJson from '@/assets/city/city.json'
  import {returnThumbnailUrl, returnFilesUrl, uploadUrl, hsfuploadUrl, fileUpload} from '@/modules/file/api/upload' //图片操作API
  import {url} from '@/utils/request'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: 'operator',
    mixins: [mixins],
    components: {pagination},
    data() {
      return {
        tableData: [{
          company: '',
          contact: '',
          phone: '',
          bySalesman: '',
          joinStart: '',
          joinEnd: '',
          finishStart: '',
          finishEnd: '',
          level: '',
          status: '5',
          test: '2'
        }], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: false, // loading效果
        btnLoading: false, //按钮锁定
        formLabelWidth: '150px', // label宽度
        newFormLabelWidth: '100px', // label宽度
        //查询------------------------------------------------------------
        advancedSearch: false,//高级查询模态
        searchForm: {
          name: '', //公司名
          contact: '',//联系人
          status: ''//状态
        },//搜索用的表单
        statusOption: [{value: 3, name: '已签约'}, {value: 5, name: '注销'}], //状态选择器

        // 服务商支付参数
        btnLoading: false,
        topPayDialog: false,
        payDisable: true,
        topParam: {
          payChannel: '1',
          id: '',
          companyId: '',
        },

        getPayConfigOption: [],

        dynamicForm: [], //当前通道动态表单


        //新增--------------------------------------------------------------
        newMember: false,//新增模态框
        newMemberForm: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】
          status: '',//运营商状态
          commissionModel: 1, //分佣模式
          agentWay: '',
          needexamine: ''
        },
        agentWayOption: [], //允许的模式
        levelOption: [{value: 1, name: '顶级运营商'}, {value: 2, name: '普通运营商'}], //合作级别
        //编辑
        editMember: false,//编辑模态框
        editMemberForm: {
          id: '',
          name: '',//公司名/个人名
          contact: '',//联系人
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】
          commissionModel: 1, //分佣模式
          needexamine: ''
        },//编辑表单

        //省市联动--------------------------
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        dialogForm: {
          name: '',
          selectProv: '',
          selectCity: '',
          selectCountry: '',
          mark: ''
        },
        selectItems: [],
        //省市联动--------------------------
        //新增判断规则
        Rules: {
          name: [
            {required: true, message: '请输入公司名/个人名', trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人名字', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系人手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
          ],
          level: [
            {required: true, message: '请选择合作级别', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择城市/县', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入具体的地址', trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          payProrata: [
            {required: true, message: '请输入分佣比例', trigger: 'blur'}
          ],
          agentWay: [
            {required: true, message: '必须选择代理方式', trigger: 'change'}
          ]
        },

        //资料详情模态框
        infoDetailDialogVisible: false,//资料显示模态框变量
        infoDetailData: {},

        //资料录入
        infoInputDialogVisible: false,//资料录入模态框变量
        infoInputForm: {
          id: '',
          domainName: '',
          productName: '',
          techSupport: '',
          servicePhone: '',
          wechatQrcode: '',
          copyrightInfo: '',
          icpInfo: '',
          logo: '',
          bgmPhoto: '',
          mctBgmPhoto: '',
          qrCodeBackGround: '',//二维码背景图
          qrCodeLogo: ''//二维码logo图
        },
        info_wx_url: '',
        info_logo_url: '',
        info_bgmPhoto_url: '',
        info_mctBgmPhoto_url: '',
        info_qrCodeBackGround_url: '',
        info_qrCodeLogo_url: '',
        infoRule: {
          domainName: [
            {required: true, message: '必须输入域名', trigger: 'blur'},
          ]
        },

        //图片上传-------------------
        filesData: {
          module: 'image'
        },
        url: uploadUrl + '/user',
        headers: {
          authorized: sessionStorage.token
        },
        uploadUrl: url + '/fms/upload/file_upload', // 上传接口
        fileData: {
          module: 'static'
        },
        fileList: [],

        //导出
        PayWayOption: [],
        PayChannelOption: [],
        companyOption: [],
        providerOption: [],

        flowDetailVisible: false,
        flowCollectVisible: false,
        xinhuiCollectVisible:false,

        flowDetailForm: {
          days: [],
          payWay: '',
          payWayId: '',
          payWayName: '',
          payChannel: '',
          payChannelId: '',
          payChannelName: '',
          company: '',
          companyId: '',
          companyName: '',
        },
        flowCollectForm: {
          days: [],
          payWay: '',
          payWayId: '',
          payWayName: '',
          payChannel: '',
          payChannelId: '',
          payChannelName: '',
          company: '',
          companyId: '',
          companyName: '',
        },
        //xinhuig
        xinhuiCollectForm: {
          days: [],
          company: '',
          companyId: '',
          companyName: '',
        },

        DownloadRules: {
          company: [
            {required: true, message: '必须选择', trigger: ['blur', 'change']}
          ],
          payChannel: [
            {required: true, message: '必须选择支付通道', trigger: ['blur', 'change']}
          ],
          days: [
            {required: true, message: '必须选择时间段', trigger: ['blur', 'change']}
          ],

        },


        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted() {
      this.getProviderList()
      this.getPayConfigByTop()

    },
//'/serviceprovider/views/service_flow_collect'
    methods: {
      // =====================服务商支付参数配置=====================
      /**
       * 获取支付商枚举
       */
      getPayConfigByTop: function () {
        getPayConfigByTop().then(res => {
          let data = res.obj;
          this.getPayConfigOption = data
        }).catch(e => {

        })
      },
      /**
       *允许编辑
       */
      canConfig() {
        this.payDisable = false
      },
      /**
       * 打开模态框
       */
      openTopConfigDialog(para) {
        this.topParam.companyId =para.id;
        //打开时获取第一个的值
        if (this.getPayConfigOption) {
          let value = this.getPayConfigOption[0].value;
          this.change_payChannel(value);
          this.topParam.payChannel = value
        }
        this.dynamicForm = []; //清空
        this.topPayDialog = true
      },
      /**
       * 关闭模态框
       */
      closeTopPayDialog() {
        this.topPayDialog = false
      },

      change_payChannel: function (event) {
        console.log(event);
        this.payDisable = true;
        if (event) {
          this.getPayConfigAndValueByTop(event)
        }
      },

      getPayConfigAndValueByTop: function (pcid) {
        getPayConfigAndValueByTop2(pcid,this.topParam.companyId).then(res => {
          let data = res.obj;
          this.topParam.id = data.id || '';
          this.dynamicForm = data.topPayConfigDialogVOS
        }).catch(e => {

        })
      },

      /**
       * 提交参数
       */
      submitJsonConfigBefore: function () {
        let form = this.deepCopy(this.dynamicForm);

        let submitForm = {};
        for (let i in form) {
          submitForm[form[i].property] = form[i].value
        }

        let id = this.topParam.id; //id
        submitForm['id'] = id;
        if (submitForm) {
          this.submitJsonConfig(submitForm)
        }

      },
      /**
       * 正式提交
       */
      submitJsonConfig: function (submitForm) {
        let pc = this.topParam.payChannel; //payChannel
        let jsonform = JSON.stringify(submitForm);
        console.log(submitForm);
        console.log(jsonform);
        this.btnLoading = true;
        savePayConfig2(pc, jsonform,this.topParam.companyId).then(res => {
          this.$message.success('该通道配置保存成功');
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      fileUploadSuccess(response, file, fileList, item) {
        console.log(item);
        if (!item) {
          this.$message.error('找不到对应的input');
          return false
        }

        this.$message({
          message: response.msg,
          type: 'success'
        });

        let data = response.obj;
        for (let i in this.dynamicForm) {
          if (this.dynamicForm[i].property === item.property) {
            this.$set(this.dynamicForm[i], 'value', data)
          }
        }


      },

      flowCollect:function (data) {
        let id = data.id;
        this.$router.push({path: '/serviceprovider/views/service_flow_collect', query: {id: id}})
      },
      flowDetail:function (data) {
        let id = data.id;
        this.$router.push({path: '/serviceprovider/views/service_flow_detail', query: {id: id}})
      },
      //支付方式
      findPayWay: function () {
        findPayWay().then(res => {
          this.PayWayOption = res.obj
          console.log(this.PayWayOption);
        }).catch(e => {

        })
      },
      //支付方式
      findPayChannel: function () {
        findPayChannel().then(res => {
          this.PayChannelOption = res.obj
          console.log(this.PayChannelOption)
          //添加查询全部
          this.PayChannelOption.splice(0, 0 ,{value:"-1",name:"全部"});
        }).catch(e => {

        })
      },
      //服务商
      //获取服务商
      getProvider: function () {
        getProviderItem().then(res => {
          this.providerOption = res.obj
          //添加查询全部
          this.providerOption.splice(0, 0 ,{id:"-1",name:"全部"});
        }).catch(e => {

        })
      },

      //代理商
      findCompany: function () {

        if (this.companyOption.length > 0) {
          return
        }

        findCompany().then(res => {
          this.companyOption = res.obj
          //添加查询全部
          this.companyOption.splice(0, 0 , {id:"-1",name:"全部"});
        }).catch(e => {

        })
      },


      //文件下载

      //通用获取
      getOption: function () {
        this.findPayWay();
        this.findPayChannel();
        this.findCompany();
        this.getProvider()
      },


      flowDetailDownLoadClose: function () {
        this.flowDetailVisible = false
      },
      flowDetailDownLoadOpen: function () {
        this.getOption(); //通用获取
        this.flowDetailVisible = true
      },
      //同时获取名字和id
      flowDetailGetLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowDetailForm.company = val;
        this.flowDetailForm.companyId = id;
        this.flowDetailForm.companyName = name;
        console.log(this.flowDetailForm)
      },
      flowDetailGetPayWayLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowDetailForm.payWay = val;
        this.flowDetailForm.payWayId = id;
        this.flowDetailForm.payWayName = name;
        console.log(this.flowDetailForm)
      },


      flowDetailGetPayChannelLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowDetailForm.payChannel = val;
        this.flowDetailForm.payChannelId = id;
        this.flowDetailForm.payChannelName = name;
        console.log(this.flowDetailForm)
      },

      flowDetailDownLoad: function () {
        //时间不填则查询全部
        if (this.flowDetailForm.days == null || this.flowDetailForm.days.length == 0) {
          this.flowDetailForm.days = ["2000-12-12 00:00:00", "2060-12-12 23:59:59"];
        }
        this.$refs['flowDetailForm'].validate((valid) => {
          if (valid) {
            this.flowDetailDownLoadSubmit()
          } else {
            this.$message.info('条件错误');
            return false;
          }
        });
      },
      flowDetailDownLoadSubmit: function () {
        // console.log(this.flowDetailForm);
        let form = JSON.parse(JSON.stringify(this.flowDetailForm));

        let submitForm = {};
        submitForm.begin = form.days[0];
        submitForm.end = form.days[1];
        submitForm.companyId = form.companyId;
        submitForm.payChannel = form.payChannelId;
        submitForm.payWay = form.payWayId === '' ? 0 : form.payWayId;

        console.log(submitForm);

        downloadDetail(submitForm).then(res => {

          let a = document.createElement('a');
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute("href", objectUrl);
          a.setAttribute("download", `${form.companyName.split('|')[0]}${form.days[0].split(' ')[0]}至${form.days[1].split(' ')[0]}商户流水明细导出(${form.payChannelName}${form.payWay ? '-' + form.payWayName : ''}).xls`);
          a.click();

        }).catch(e => {

        })
      },


      flowCollectDownLoadClose: function () {
        this.flowCollectVisible = false
      },
      flowCollectDownLoadOpen: function () {
        this.getOption(); //通用获取
        this.flowCollectVisible = true
      },
      //同时获取名字和id
      flowCollectGetLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowCollectForm.company = val;
        this.flowCollectForm.companyId = id;
        this.flowCollectForm.companyName = name;
        console.log(this.flowCollectForm)
      },
      flowCollectGetPayWayLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowCollectForm.payWay = val;
        this.flowCollectForm.payWayId = id;
        this.flowCollectForm.payWayName = name;
        console.log(this.flowCollectForm)
      },
      flowCollectGetPayChannelLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowCollectForm.payChannel = val;
        this.flowCollectForm.payChannelId = id;
        this.flowCollectForm.payChannelName = name;
        console.log(this.flowCollectForm)
      },
      flowCollectDownLoad: function () {
        //时间不填则查询全部
        if (this.flowCollectForm.days == null || this.flowCollectForm.days.length == 0) {
          this.flowCollectForm.days = ["2000-12-12 00:00:00", "2060-12-12 23:59:59"];
        }
        this.$refs['flowCollectForm'].validate((valid) => {
          if (valid) {
            this.flowCollectDownLoadSubmit()
          } else {
            this.$message.info('条件错误');
            return false;
          }
        });
      },
      flowCollectDownLoadSubmit: function () {
        let form = JSON.parse(JSON.stringify(this.flowCollectForm));
        let submitForm = {};
        submitForm.begin = form.days[0];
        submitForm.end = form.days[1];
        submitForm.companyId = form.companyId;
        submitForm.payChannel = form.payChannelId;
        submitForm.payWay = form.payWayId === '' ? 0 : form.payWayId;

        console.log(submitForm);
        downloadCollect(submitForm).then(res => {
          let a = document.createElement('a');
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute("href", objectUrl);
          a.setAttribute("download", `${form.companyName.split('|')[0]}${form.days[0].split(' ')[0]}至${form.days[1].split(' ')[0]}商户流水汇总导出(${form.payChannelName}${form.payWay ? '-' + form.payWayName : ''}).xls`);
          a.click();

        }).catch(e => {

        })

      },

      //信汇佣金统计
      xinhuiCollectDownLoadOpen:function(){
        this.getOption();
        this.xinhuiCollectVisible=true
      },
      xinhuiCollectDownLoadClose:function(){
        this.xinhuiCollectVisible=false
      },

      //同时获取名字和id
      xinhuiCollectGetLabel: function (val) {
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.xinhuiCollectForm.company = val;
        this.xinhuiCollectForm.companyId = id;
        this.xinhuiCollectForm.companyName = name;
        console.log(this.xinhuiCollectForm)
      },
      xinhuiCollectDownLoad: function () {
        this.$refs['xinhuiCollectForm'].validate((valid) => {
          if (valid) {
            this.xinhuiCollectDownLoadSubmit()
          } else {
            this.$message.info('条件错误');
            return false;
          }
        });
      },
      xinhuiCollectDownLoadSubmit: function () {
        let form = JSON.parse(JSON.stringify(this.xinhuiCollectForm));
        let submitForm = {};
        submitForm.begin = form.days[0];
        submitForm.end = form.days[1];
        submitForm.companyId = form.companyId;

        console.log(submitForm);
        this.$message.info(`尝试下载 ${form.companyName} ${form.days[0].split(' ')[0]}至${form.days[1].split(' ')[0]}信汇佣金统计`)
        downloadXinhuiCollect(submitForm).then(res => {
          let a = document.createElement('a');
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute("href", objectUrl);
          a.setAttribute("download", `${form.companyName} ${form.days[0].split(' ')[0]}至${form.days[1].split(' ')[0]}信汇佣金统计导出.xls`);
          a.click();
        }).catch(e => {

        })

      },


      /**
       * 前往版本管理
       */
      goVerManager: function (id) {
        try {
          this.$router.push({path: '/versionManagement/views/versionManagement', query: {id: id}})
        } catch (e) {
          console.log(e)
        }
      },


      /**
       * 模态框操作  start----------------------------------------
       **/
      //高级查询
      advancedSearchOpen: function () {
        this.advancedSearch = true
      },
      advancedSearchClose: function () {
        this.advancedSearch = false
      },

      //重置商户密码
      resetPassword(row) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminResetPwd(row.phone, row.id).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },

      //新增
      newMemberOpen: function () {

        this.findServiceAgentWay(); //获取当前允许的模式
        this.newMember = true
      },

      /**
       * 获取当前允许模式
       */
      findServiceAgentWay: function () {
        findServiceAgentWay().then(res => {
          let data = res.obj;
          this.agentWayOption = data
        }).catch(e => {

        })
      },
      newMemberClose: function () {
        this.$refs['newMemberForm'].resetFields();
        this.newMember = false
      },
      //省市
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        this.dialogForm.selectCity = this.dataCity[0];
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0];
        this.newMemberForm.city = '';
        this.editMemberForm.city = ''
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0]
      },

      /*
     * 获取运营商列表
    * */
      getProviderList(number, pageSize) {
        this.loading = true;
        getProviderList(number, pageSize, this.searchForm).then(response => {
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
       * 删除运营商
      * */
      delOperator: function (data) {
        let oid = data.id; //eg :data.id

        this.$confirm(`确定删除${this.agentName}吗？本次操作无法撤销`)
          .then(_ => {
            delOperator(oid).then(res => {
              this.$message({
                message: res.msg,
                type: 'success',
              });
              this.btnLoading = false;
              this.$refs.page.refresh()
            }).catch(e => {
              this.btnLoading = false;
              this.loading = false
            })
          })
          .catch(_ => {
            this.$message({
              message: '取消删除',
            })
          })

      },

      //添加运营商
      providerAdd: function (status) {

        this.newMemberForm.status = status;
        // let form = this.deepCopy(this.newMemberForm);
        let form = JSON.parse(JSON.stringify(this.newMemberForm));
        console.log(form);
        if (form.agentWay === '' || form.agentWay === null) {
          this.$message.error('代理方式未选择')
        } else {
          this.providerAddSubmit(form) //提交
        }

      },
      //正式提交
      providerAddSubmit: function (form) {
        this.btnLoading = true;
        providerAdd(form).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.newMemberClose();
          this.$refs.page.refresh();
          setTimeout(() => {
            this.btnLoading = false
          }, 500)

        }).catch(e => {
          this.btnLoading = false
        })
      },

      //编辑
      editMemberOpen: function (row) {
        console.log(row);
        //打开模态框
        this.editMemberForm.id = row.id;
        this.editMemberForm.name = row.name;
        this.editMemberForm.contact = row.contact;
        this.editMemberForm.phone = row.phone;
        this.editMemberForm.cooperationLev = row.cooperationLev;
        this.editMemberForm.province = row.province;
        this.editMemberForm.province = row.province;
        this.editMemberForm.city = row.city;
        this.editMemberForm.address = row.address;
        this.editMemberForm.commissionModel = row.commissionModel || 1;
        this.editMemberForm.needexamine = row.needexamine ;
        //获取这个运营商的信息
        this.editMember = true
      },
      //关闭编辑框
      editMemberClose: function () {
        this.editMember = false
      },
      //确认修改
      editOpera() {
        this.btnLoading = true;
        let form = this.deepCopy(this.editMemberForm);
        providerUpdate(form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.btnLoading = false;
          this.editMemberClose();
          this.$refs.page.refresh()
        }).catch(() => {
          this.btnLoading = false;
        })

      },

      //提交审核或者审核
      OperatorUpdateAudit(id, status) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(id, status).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },
      //跳转详情页
      rooterDeatil(data) {
        //console.log(data)
        //query发送ID到详情
        let id = data.id;
        this.$router.push({path: '/operator/views/operaDetail', query: {id: id}})
      },

      /**
       * 资料详情模态框
       */

      infoDetailDialogClose: function () {
        this.infoDetailData = {}; //清空数据，下次回显时不会异常
        this.infoDetailDialogVisible = false

      },

      infoDetailDialogOpen: function (data) {
        let id = data.id;

        if (id === '' || id == null) {
          this.$message.error('没有获取到id，请刷新重试！');
          return false
        }
        findDetail(id).then(res => {
          console.warn(res);
          let data = res.obj;
          if (data == null) {
            this.$message('还未设置' + this.topName + '信息');
            return
          }
          this.infoDetailData = data
        }).catch(e => {

        });


        this.infoDetailDialogVisible = true

      },

      /**
       * 资料录入
       */
      //模态框关闭
      infoInputDialogClose: function () {
        this.$refs['infoInput'].resetFields();
        this.infoInputForm.id = ''; //清空id
        this.info_wx_url = '';
        this.info_logo_url = '';
        this.info_bgmPhoto_url = '';
        this.info_mctBgmPhoto_url = '';
        this.info_qrCodeBackGround_url = '';
        this.info_qrCodeLogo_url = '';
        this.infoInputDialogVisible = false
      },
      //模态框打开
      infoInputDialogOpen: function (rowdata) {
        let id = rowdata.id;
        if (id == '' || id == null) {
          this.$message.error('没有获取到id，请刷新重试！');
          return false
        }
        //获取详情
        findEntryDetail(id).then(res => {
          console.warn(res);
          let data = res.obj;
          this.infoInputForm.id = data.id;

          if (data.id === '' || data.id === null) {
            this.$message.error('信息获取失败');
            return false
          }
          this.infoInputForm.domainName = data.domainName || '';
          this.infoInputForm.productName = data.productName || '';
          this.infoInputForm.techSupport = data.techSupport || '';
          this.infoInputForm.servicePhone = data.servicePhone || '';
          this.infoInputForm.wechatQrcode = data.wechatQrcode || '';
          this.infoInputForm.copyrightInfo = data.copyrightInfo || '';
          this.infoInputForm.icpInfo = data.icpInfo || '';
          this.infoInputForm.logo = data.logo || '';
          this.infoInputForm.bgmPhoto = data.bgmPhoto || '';
          this.infoInputForm.mctBgmPhoto = data.mctBgmPhoto || '';
          this.infoInputForm.qrCodeLogo = data.qrCodeLogo || '';
          this.infoInputForm.qrCodeBackGround = data.qrCodeBackGround || '';
          this.info_logo_url = data.logo == "" ? '' : this.getImg(data.logo);
          this.info_wx_url = data.wechatQrcode == "" ? '' : this.getImg(data.wechatQrcode);
          this.info_bgmPhoto_url = data.bgmPhoto == "" ? '' : this.getImg(data.bgmPhoto);
          this.info_mctBgmPhoto_url = data.mctBgmPhoto == "" ? '' : this.getImg(data.mctBgmPhoto);
          this.info_qrCodeBackGround_url = data.qrCodeBackGround == "" ? '' : this.getImg(data.qrCodeBackGround);
          this.info_qrCodeLogo_url = data.qrCodeLogo == "" ? '' : this.getImg(data.qrCodeLogo);
          this.infoInputDialogVisible = true
        }).catch(e => {
          this.$message.error('获取数据失败')
        });

      },
      //提交详情
      infoInputSubmit: function () {
        let that = this;
        this.btnLoading = true;
        this.$refs['infoInput'].validate((valid) => {
          if (valid) {
            let data = this.infoInputForm;
            submitDetail(data).then(res => {
              setTimeout(function () {
                that.infoInputDialogClose();
                that.btnLoading = false;
                that.$message.success('提交成功')
              }, 500)
            }).catch(e => {
              this.btnLoading = false;
            })
          } else {
            this.$message.error('您还有未填写的内容');
            this.btnLoading = false;
            return false;
          }
        });
      },

      wxUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: '微信二维码上传成功',
          type: 'success'
        });
        this.infoInputForm.wechatQrcode = response.obj;
        this.info_wx_url = this.getImg(response.obj)
      },
      logoUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: 'Logo上传成功',
          type: 'success'
        });
        this.infoInputForm.logo = response.obj;
        this.info_logo_url = this.getImg(response.obj)
      },
      bgUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: '登录页背景图上传成功',
          type: 'success'
        });
        this.infoInputForm.bgmPhoto = response.obj;
        this.info_bgmPhoto_url = this.getImg(response.obj)
      },
      mactbgUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: '商户登录页背景图上传成功',
          type: 'success'
        });
        this.infoInputForm.mctBgmPhoto = response.obj;
        this.info_mctBgmPhoto_url = this.getImg(response.obj)
      },
      qrbUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: '二维码背景图上传成功',
          type: 'success'
        });
        this.infoInputForm.qrCodeBackGround = response.obj;
        this.info_qrCodeBackGround_url = this.getImg(response.obj)
      },
      qrlUpload: function (response, file) {
        console.log(response);
        this.$message({
          message: '二维码logo上传成功',
          type: 'success'
        });
        this.infoInputForm.qrCodeLogo = response.obj;
        this.info_qrCodeLogo_url = this.getImg(response.obj)
      },

      /**
       * 重置图片
       */
      removeImg: function (type) {
        if (type === 'logo') {
          this.infoInputForm.logo = '';
          this.info_logo_url = ''
        } else if (type === 'bgmPhoto') {
          this.infoInputForm.bgmPhoto = '';
          this.info_bgmPhoto_url = ''
        } else if (type == 'mctBgmPhoto') {
          this.infoInputForm.mctBgmPhoto = '';
          this.info_mctBgmPhoto_url = ''
        } else if (type == 'wx') {
          this.infoInputForm.wechatQrcode = '';
          this.info_wx_url = ''
        }
      },

      /**
       *图片上传失败
       **/
      handleImageFailed() {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      },
      /**
       *对类型、大小做限制
       **/
      beforeLogoUpload(file) {
        let isImage = file.type.substring(0, 5) === 'image';
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        return true
      },


      /**
       * 换取图片
       */
      getImg: function (val) {
        let reg = /^[0-9]*$/;
        if (reg.test(val) && val != '') {
          return returnFilesUrl(val)
        } else {
          let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC';
          return base64
        }

      },

      /*
   * 搜索
   * */
      search() {
        console.log(this.searchForm);
        this.$refs.page.search()
      },
      /*
      * 重置
      * */
      reset() {
        this.searchForm = {
          company: '', //公司名
          contact: '',//联系人
          status: ''//状态
        };//搜索用的表单
        this.$refs.page.search()
      },

      /*
     * 刷新
     * */
      refresh() {
        this.$refs.page.refresh()
      },
      handleSuccess(response) {
        this.$message({
          message: response.msg,
          type: 'success'
        });
      },


      /**
       * 下载模板
       */
      downloadMould: function (name) {
        if (name === 'bg') {
          this.downloadIamge('./static/file/img/bg.png', '二维码背景图')
        } else if (name === 'logo') {
          this.downloadIamge('./static/file/img/logo.png', 'LOGO')
        }
      },
      downloadIamge(imgsrc, name) {//下载图片地址和图片名
        var image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          var context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          var a = document.createElement("a"); // 生成一个a元素
          var event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
      },

    },
    filters: {

      //过滤日期
      filterTime: function (time) {
        if (null == time) {
          return ''
        }
        return time.split(' ')[0]
      },

      //列表状态过滤器
      statusfilter: function (s) {
        let text = '';
        if (s == '' || s == null || s == undefined) { // "",null,undefined
          text = 'error'
        } else {
          switch (s) {
            case '1':
              text = '未启用';
              break;
            case '2':
              text = '待审核';
              break;
            case '3':
              text = '已签约';
              break;
            case '4':
              text = '过期';
              break;
            case '5':
              text = '注销';
              break;
            default :
              text = '未知';
              break
          }
        }
        return text
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

  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }

  .details-info-file {
    width: 100%;
  }

  .details-info-file table tr {
    color: #777777;
    font-size: 14px;
    line-height: 28px;
  }

  .details-info-file table tr td:nth-child(1):after {
    content: '：';
  }

  .details-info-file table tr td:nth-child(1) {
    width: 40%;
    text-align: right;
  }

  .details-info-file table tr td:nth-child(2) {
    width: 60%;
  }

  .logo-img-box {
    height: 150px;
    width: 150px;
    border-radius: 8px;
    background-color: #d0d0d0;
  }

  .bg-img-box {
    height: 150px;
    width: auto;
    border-radius: 8px;
    background-color: #d0d0d0;
  }

  .input-width {
    width: 260px;
  }

  .input-width-2 {
    width: 400px;
  }

  /*图片上传*/
  .logo-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #dfdfdf;
  }

  .logo-uploader:hover {
    border-color: #409EFF;
  }

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px !important;
    height: 160px !important;
    line-height: 160px;
    text-align: center;
  }

  .logo {
    width: 160px;
    height: 160px;
    display: block;
  }


</style>
