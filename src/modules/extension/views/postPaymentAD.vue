<template>
  <div class="app-container" v-loading="loading">

    <!--标签页-->
    <el-tabs v-model="tabsNum" @tab-click="changeTabs" type="card">
      <!--************************************************************************-->

      <!--投放管理-->
      <el-tab-pane label="投放管理" name="0">
        <!--搜索条-->
        <div>
          <!--左侧-->
          <div class="block ">
            <div class="block">
              <el-input v-model="putInSearchForm.onName" class="input-width" size="medium"
                        placeholder="投放名称"></el-input>
            </div>
            <div class="block">
              <el-select v-model="putInSearchForm.status" placeholder="请选择" size="medium">
                <el-option
                  v-for="item in putInStatusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="block">
              <el-button size="medium" type="primary" @click="submitPutInSearch">查询</el-button>
            </div>
          </div>
          <!--右侧-->
          <div class="right-float ">
            <div class="block">
              <el-button size="medium" type="primary" @click="addPutOpen">新建投放</el-button>
            </div>
            <div class="block">
              <el-button size="medium" @click="putInRefresh">刷新</el-button>
            </div>
          </div>
        </div>
        <el-divider content-position="left">投放</el-divider>
        <!--列表-->
        <div>
          <template>
            <el-table
              :data="putInTable"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="onName"
                label="投放名称"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                label="投放时间"
                width="200px"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{scope.row.startTime}}至{{scope.row.endTime==='2099-12-31'?'&nbsp长期':scope.row.endTime}}
                </template>
              </el-table-column>
              <el-table-column
                prop="money"
                label="预算(元)">
              </el-table-column>
              <el-table-column
                label="总花费(元)">
                <template slot-scope="scope">
                  {{(scope.row.costMoney).toFixed(2)||0}}
                </template>
              </el-table-column>
              <el-table-column
                prop="showNumber"
                label="展示数">
              </el-table-column>
              <el-table-column
                prop="clickNumber"
                label="点击量">
              </el-table-column>
              <el-table-column
                label="点击率">
                <template slot-scope="scope">
                  {{(scope.row.clickRate).toFixed(2)||0}}
                </template>
              </el-table-column>
              <el-table-column
                prop="runNumber"
                label="跳转量">
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  {{scope.row.status|adStatusFil}}
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                label="操作"
                width="270px">
                <template slot-scope="scope">
                  <el-button type="text" @click="putDetailOpen(scope.row.id)">详情</el-button>
                  <el-button type="text" :disabled="scope.row.status==1||scope.row.status==3"
                             @click="putEdit(scope.row.id)">修改
                  </el-button>
                  <!--<el-button type="text">删除</el-button>-->
                  <el-button type="text" :disabled="scope.row.status==3 || scope.row.status==2"
                             @click="putOver(scope.row.id)">结束
                  </el-button>
                  <el-button type="text" :disabled="scope.row.status==3 || scope.row.status==1"
                             @click="putStart(scope.row.id)">投放
                  </el-button>
                  <el-button type="text" @click="adInfomationOpen(scope.row.id)">数据</el-button>
                  <el-button type="text" :disabled="scope.row.status==3 || scope.row.status==1"
                             @click="putDelete(scope.row.id)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total-elements="putInTotalElements"
              :change-callback="getPutInList"
              ref="page"></pagination>
          </template>
        </div>
        <!--工具模态框-->
        <template>
          <!--新建投放-->
           <el-dialog
    :close-on-click-modal="false"
            :title="addPutTitle"
            :visible.sync="addPutVisible"
            width="576px"
            :before-close="addPutClose">
            <!--表单-->
            <div>
              <el-form :model="addPutForm" ref="addPutForm" :rules="adRule" label-width="140px" size="medium">
                <el-form-item label="投放名称：" prop="onName">
                  <el-input v-model="addPutForm.onName" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="投放时间：">
                  <div>
                    <el-form-item prop="startTime">
                      <el-date-picker
                        v-model="addPutForm.startTime"
                        type="date"
                        placeholder="开始日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        class="input-width">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="!putTimeMode" prop="endTime" style="margin-top: 15px">
                      <el-date-picker
                        v-model="addPutForm.endTime"
                        type="date"
                        placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        class="input-width">
                      </el-date-picker>
                    </el-form-item>

                    <div class="block padding-about-5px">
                      <el-checkbox v-model="putTimeMode">长期</el-checkbox>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="选择广告：" prop="advertiseId">
                  <el-select v-model="addPutForm.advertiseId"
                             placeholder="选择广告"
                             @change="selectAd($event)"
                             class="input-width">
                    <el-option
                      v-for="item in putAdOption"
                      :key="item.id"
                      :label="item.advertiseName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="选择策略：" prop="strategicId">
                  <el-select v-model="addPutForm.strategicId"
                             placeholder="选择策略"

                             class="input-width">
                    <el-option
                      v-for="item in putRulesOption"
                      :key="item.id"
                      :label="item.strategicName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="投放预算：" prop="money">
                  <el-input v-model="addPutForm.money" class="input-width">
                    <template slot="prepend">总预算</template>
                  </el-input>
                </el-form-item>
                <!--单独设置-->
                <el-form-item label="每单次跳转费用：" v-if="adType==3" prop="runCost">
                  <el-input v-model="addPutForm.runCost" class="input-width">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="每千次展示费用：" v-if="adType==2 || adType==1" prop="showCost">
                  <el-input v-model="addPutForm.showCost" class="input-width">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="每点击单价：" v-if="adType==1" prop="clickCost">
                  <el-input v-model="addPutForm.clickCost" class="input-width">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>


                <el-form-item label="备注：">
                  <el-input v-model="addPutForm.remark" class="input-width"
                            placeholder="输入其他说明，140字以内"></el-input>
                </el-form-item>

              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addPutClose">取消</el-button>
    <el-button type="primary" @click="addPutSubmit">提交</el-button>
  </span>
          </el-dialog>
          <!--投放详情-->
           <el-dialog
    :close-on-click-modal="false"
            title="投放详情"
            :visible.sync="putDetailVisible"
            width="576px"
            :before-close="putDetailClose">
            <div>
              <table class="strategy-info">
                <tr>
                  <td>投放名称：</td>
                  <td>{{putDetailData.onName||'*'}}</td>
                </tr>
                <tr>
                  <td>投放时间：</td>
                  <td>
                    {{putDetailData.startTime}}&nbsp至&nbsp{{putDetailData.endTime=='2099-12-31'?'长期':putDetailData.endTime}}
                  </td>
                </tr>
                <tr>
                  <td>选择广告：</td>
                  <td v-if="putDetailData.advertiseManagement!=null">
                    <el-button type="text" @click="putSeeAdOpen(putDetailData.advertiseId)">
                      {{putDetailData.advertiseManagement.advertiseName||'***'}}
                    </el-button>
                  </td>
                </tr>
                <tr>
                  <td>选中策略：</td>
                  <td v-if="putDetailData.strategicManagement!=null">
                    <el-button type="text" @click="putSeeStrategyDetailOpen(putDetailData.strategicManagement)">
                      {{putDetailData.strategicManagement.strategicName||'***'}}
                    </el-button>
                  </td>
                </tr>
                <tr>
                  <td>投放预算：</td>
                  <td>
                    {{putDetailData.money}}元
                    <p v-if="putDetailData.advertiseType==3">
                      每单次跳转费用：&nbsp{{putDetailData.runCost||0}}&nbsp元
                    </p>
                    <p v-if="putDetailData.advertiseType==2 || putDetailData.advertiseType==1">
                      每千次展示费用：&nbsp{{putDetailData.showCost||0}}&nbsp元
                    </p>
                    <p v-if="putDetailData.advertiseType==1">
                      每点击单价：&nbsp{{putDetailData.clickCost||0}}&nbsp元
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>备注：</td>
                  <td> {{putDetailData.remark||'无'}}</td>
                </tr>
              </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="putDetailClose">取消</el-button>
    <el-button type="primary" @click="putDetail2putEdit"
               :disabled="putDetailData.status==1||putDetailData.status==3">修改</el-button>
  </span>
          </el-dialog>
          <!--投放看广告详情模态框-->
           <el-dialog
            title="广告详情"
            :visible.sync="putSeeAdDetail"
            :close-on-click-modal="true"
            width="576px"
            :before-close="putSeeAdClose">
            <div>
              <!--广告类型-->
              <div class="ad-add-box">
                <el-radio-group v-model="putDetailData.advertiseType" style="margin-bottom: 30px;" :disabled="true">
                  <el-radio-button label="1" class="ad-type-radio">点击量(CPC)</el-radio-button>
                  <el-radio-button label="2" class="ad-type-radio">展示数(CPM)</el-radio-button>
                  <el-radio-button label="3" class="ad-type-radio">跳转量(CPV)</el-radio-button>
                </el-radio-group>
              </div>
              <!--不同广告类型-->
              <template>

                <el-form size="medium" label-width="120px">
                  <el-form-item label="广告类型：">
                    <span>{{adDetail.type|adTypeFil}}</span>
                  </el-form-item>
                  <el-form-item label="广告名称：">
                    <span>{{adDetail.advertiseName}}</span>
                    <!--<el-input v-model="addAdForm.advertiseName" placeholder="输入广告名称" class="ad-input-width"></el-input>-->
                  </el-form-item>
                  <el-form-item label="广告图片：" v-if="adDetail.type=='1' || adDetail.type=='2' ">
                    <img v-if="adDetail.imageId" :src="getImg(adDetail.imageId)" class="logo">
                  </el-form-item>
                  <el-form-item label="推广网址：" v-if="adDetail.type=='1' || adDetail.type=='3' ">
                    <span>{{adDetail.imageLink}}</span>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <span>{{adDetail.remark}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="putSeeAdClose">关闭</el-button>
            </span>
          </el-dialog>
          <!--投放看策略详情模态框-->
           <el-dialog
    :close-on-click-modal="false"
            title="策略详情"
            :visible.sync="putSeeStrategyDetail"
            width="576px"
            :before-close="putSeeStrategyDetailClose">
            <div>
              <table class="strategy-info">
                <tr>
                  <td>策略名称：</td>
                  <td>{{currentStrategy.strategicName||'*'}}</td>
                </tr>
                <tr>
                  <td>范围：</td>
                  <td>
                    <span v-if="currentStrategy.operatorRange==1">全部商户</span>
                    <span v-else>{{currentStrategy.distributors|distributorsFil}}</span>
                  </td>
                </tr>
                <tr>
                  <td>时段：</td>
                  <td>
                    <span v-if="currentStrategy.timeRange==1">全部时段</span>
                    <span v-else>{{currentStrategy.weekDay}}<br/>{{currentStrategy.strategicTimeList|strategicTimeFil}}</span>
                  </td>
                </tr>
                <tr>
                  <td>地域：</td>
                  <td>
                    <span v-if="currentStrategy.regionType==1">全部城市</span>
                    <span v-else>{{currentStrategy.city|cityFil}}</span></td>
                </tr>
                <tr>
                  <td>平台：</td>
                  <td> {{currentStrategy.payEntrys|platformFil}}</td>
                </tr>
              </table>

            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="putSeeStrategyDetailClose">关闭</el-button>
            </span>
          </el-dialog>

        </template>
      </el-tab-pane>
      <!--投放管理结束-->


      <!--广告管理-->
      <el-tab-pane label="广告管理" name="1">
        <!--搜索条-->
        <div>
          <!--左侧-->
          <div class="block ">
            <div class="block">
              <el-input v-model="addSearchForm.advertiseName" class="input-width" size="medium"
                        placeholder="广告名称"></el-input>
            </div>
            <div class="block">
              <el-button size="medium" type="primary" @click="submitAdListSearch">查询</el-button>
            </div>
          </div>
          <!--右侧-->
          <div class="right-float ">
            <div class="block">
              <el-button size="medium" type="primary" @click="addAdOpen">新建广告</el-button>
            </div>
            <div class="block">
              <el-button size="medium" @click="adRefresh">刷新</el-button>
            </div>
          </div>
        </div>
        <el-divider content-position="left">广告</el-divider>
        <!--列表-->
        <div>
          <template>
            <el-table
              :data="adTable"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="advertiseName"
                label="广告名称"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                label="广告类型">
                <template slot-scope="scope">
                  <span>{{scope.row.type|adTypeFil}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="getAdDetail(scope.row)">详情</el-button>
                  <el-button type="text" @click="editAdOpen(scope.row)">修改</el-button>
                  <el-button type="text" @click="deleteAdvertise(scope.row.id)" :disabled="scope.row.sourceType!=2">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total-elements="adTotalElements"
              :change-callback="getAdList"
              ref="adPage"></pagination>
          </template>
        </div>

        <!--模态框-->
        <template>
          <!--新建广告模态框-->
           <el-dialog
    :close-on-click-modal="false"
            title="新增广告"
            :visible.sync="addAdVisible"
            width="576px"
            :before-close="addAdClose">
            <!--新建广告 内容 表单-->
            <div>
              <!--广告类型-->
              <div class="ad-add-box">
                <el-radio-group v-model="addAdForm.type" style="margin-bottom: 30px;">
                  <el-radio-button label="1" class="ad-type-radio">点击量(CPC)</el-radio-button>
                  <el-radio-button label="2" class="ad-type-radio">展示数(CPM)</el-radio-button>
                  <el-radio-button label="3" class="ad-type-radio">跳转量(CPV)</el-radio-button>
                </el-radio-group>
              </div>
              <!--不同广告类型-->
              <template>
                <el-form ref="addAdForm" :model="addAdForm" :rules="adRule" size="medium" label-width="120px">
                  <el-form-item label="广告名称：" prop="advertiseName">
                    <el-input v-model="addAdForm.advertiseName" placeholder="输入广告名称" class="ad-input-width"></el-input>
                  </el-form-item>
                  <!--&lt;!&ndash;注意有表单判断 v-if&ndash;&gt;-->
                  <!--<el-form-item label="广告源：" v-if="addAdForm.type=='1' || addAdForm.type=='3' " prop="sourceType">-->
                  <!--<el-radio v-model="addAdForm.sourceType" label="1">手动添加</el-radio>-->
                  <!--</el-form-item>-->
                  <!--注意有表单判断 v-if-->
                  <el-form-item label="广告图片：" v-if="addAdForm.type=='1' || addAdForm.type=='2' " prop="imageId">
                    <el-upload
                      class="logo-uploader"
                      :action="url"
                      :data="filesData"
                      name="files"
                      :show-file-list="false"
                      :on-success="addPhotoUpload"
                      :on-error="handleImageFailed"
                      :before-upload="beforeLogoUpload"
                      :headers="headers">
                      <img v-if="addPhotoUrl" :src="addPhotoUrl" class="logo">
                      <i v-else class="el-icon-plus logo-uploader-icon"></i>
                    </el-upload>
                    <span class="tips" style="position: absolute;top: 0;margin-left: 10px">建议上传1080*1920px<br/>格式为jpg、png、jpeg的图片</span>
                  </el-form-item>
                  <!--注意有表单判断 v-if-->
                  <el-form-item label="推广网址：" v-if="addAdForm.type=='1' || addAdForm.type=='3' " prop="imageLink">
                    <el-input v-model="addAdForm.imageLink" placeholder="输入广告跳转地址(必须携带http:// 或 https://)"
                              class="ad-input-width"></el-input>
                    <br/>
                    <span class="tips">跳转地址必须携带 “ http:// ” 或 “ https:// ”，请谨慎录入，上线后点击广告图片，将跳转此网站</span>
                  </el-form-item>
                  <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea"
                              v-model="addAdForm.remark"
                              :rows="5"
                              maxlength="140"
                              :show-word-limit="true"
                              placeholder="广告的备注说明"
                              class="ad-input-width"></el-input>
                  </el-form-item>
                </el-form>
              </template>

            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addAdClose">取消</el-button>
    <el-button type="primary" @click="addAdSubmit" v-loading="btnLoading" :disabled="btnLoading">提交</el-button>
  </span>
          </el-dialog>
          <!--编辑广告模态框-->
           <el-dialog
    :close-on-click-modal="false"
            title="新增广告"
            :visible.sync="editAdVisible"
            width="576px"
            :before-close="editAdClose">
            <!--新建广告 内容 表单-->
            <div>
              <!--广告类型-->
              <div class="ad-add-box">
                <el-radio-group v-model="editAdForm.type" style="margin-bottom: 30px;"
                                :disabled="editAdForm.sourceType==1">
                  <el-radio-button label="1" class="ad-type-radio">点击量(CPC)</el-radio-button>
                  <el-radio-button label="2" class="ad-type-radio">展示数(CPM)</el-radio-button>
                  <el-radio-button label="3" class="ad-type-radio">跳转量(CPV)</el-radio-button>
                </el-radio-group>
              </div>
              <!--不同广告类型-->
              <template>
                <el-form ref="editAdForm" :rules="adRule" :model="editAdForm" size="medium" label-width="120px">
                  <el-form-item label="广告名称：" prop="advertiseName">
                    <el-input v-model="editAdForm.advertiseName" placeholder="输入广告名称" class="ad-input-width"></el-input>
                  </el-form-item>
                  <!--&lt;!&ndash;注意有表单判断 v-if&ndash;&gt;-->
                  <!--<el-form-item label="广告源：" v-if="addAdForm.type=='1' || addAdForm.type=='3' " prop="sourceType">-->
                  <!--<el-radio v-model="addAdForm.sourceType" label="1">手动添加</el-radio>-->
                  <!--</el-form-item>-->
                  <!--注意有表单判断 v-if-->
                  <el-form-item label="广告图片：" v-if="editAdForm.type=='1' || editAdForm.type=='2' " prop="imageId">
                    <el-upload
                      class="logo-uploader"
                      :action="url"
                      :data="filesData"
                      name="files"
                      :show-file-list="false"
                      :on-success="editPhotoUpload"
                      :on-error="handleImageFailed"
                      :before-upload="beforeLogoUpload"
                      :headers="headers">
                      <img v-if="editPhotoUrl" :src="editPhotoUrl" class="logo">
                      <i v-else class="el-icon-plus logo-uploader-icon"></i>
                    </el-upload>
                    <span class="tips" style="position: absolute;top: 0;margin-left: 10px">建议上传320*640px<br/>格式为jpg、png、jpeg的图片</span>
                  </el-form-item>
                  <!--注意有表单判断 v-if-->
                  <el-form-item label="推广网址：" v-if="editAdForm.type=='1' || editAdForm.type=='3' " prop="imageLink">
                    <el-input v-model="editAdForm.imageLink" placeholder="输入广告跳转地址" class="ad-input-width"></el-input>
                    <br/>
                    <span class="tips">跳转地址必须携带 “ http:// ” 或 “ https:// ”，请谨慎录入，上线后点击广告图片，将跳转此网站</span>
                  </el-form-item>
                  <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea"
                              v-model="editAdForm.remark"
                              :rows="5"
                              maxlength="140"
                              :show-word-limit="true"
                              placeholder="广告的备注说明"
                              class="ad-input-width"></el-input>
                  </el-form-item>
                </el-form>
              </template>

            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editAdClose">取消</el-button>
    <el-button type="primary" @click="editAdSubmit" v-loading="btnLoading" :disabled="btnLoading">提交修改</el-button>
  </span>
          </el-dialog>
          <!--广告详情模态框-->
           <el-dialog
    :close-on-click-modal="false"
            title="广告详情"
            :visible.sync="detailAdVisible"
            width="576px"
            :before-close="detailAdClose">
            <div>
              <!--广告类型-->
              <div class="ad-add-box">
                <el-radio-group v-model="adDetail.type" style="margin-bottom: 30px;" :disabled="true">
                  <el-radio-button label="1" class="ad-type-radio">点击量(CPC)</el-radio-button>
                  <el-radio-button label="2" class="ad-type-radio">展示数(CPM)</el-radio-button>
                  <el-radio-button label="3" class="ad-type-radio">跳转量(CPV)</el-radio-button>
                </el-radio-group>
              </div>
              <!--不同广告类型-->
              <template>

                <el-form size="medium" label-width="120px">
                  <el-form-item label="广告类型：">
                    <span>{{adDetail.type|adTypeFil}}</span>
                  </el-form-item>
                  <el-form-item label="广告名称：">
                    <span>{{adDetail.advertiseName}}</span>
                    <!--<el-input v-model="addAdForm.advertiseName" placeholder="输入广告名称" class="ad-input-width"></el-input>-->
                  </el-form-item>
                  <el-form-item label="广告图片：" v-if="adDetail.type=='1' || adDetail.type=='2' ">
                    <img v-if="adDetail.imageId" :src="getImg(adDetail.imageId)" class="logo">
                  </el-form-item>
                  <el-form-item label="推广网址：" v-if="adDetail.type=='1' || adDetail.type=='3' ">
                    <span>{{adDetail.imageLink}}</span>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <span>{{adDetail.remark}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </div>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="detailAdClose">关闭</el-button>
                 <el-button type="primary" @click="editAdOpen(currentAd) ">修改</el-button>
             </span>
          </el-dialog>
        </template>

      </el-tab-pane>
      <!--广告管理结束-->


      <!--策略管理-->
      <el-tab-pane label="策略管理" name="2">
        <!--搜索条-->
        <div>
          <!--左侧-->
          <div class="block ">
            <div class="block">
              <el-input v-model="strategySearchForm.strategicName" class="input-width" size="medium"
                        placeholder="策略名称"></el-input>
            </div>
            <div class="block">
              <el-button size="medium" type="primary" @click="submitGetStrategyList">查询</el-button>
            </div>
          </div>
          <!--右侧-->
          <div class="right-float ">
            <div class="block">
              <el-button size="medium" type="primary" @click="addStrategyOpen">新建策略</el-button>
            </div>
            <div class="block">
              <el-button size="medium" @click="strategyRefresh">刷新</el-button>
            </div>
          </div>
        </div>
        <el-divider content-position="left">策略</el-divider>
        <!--列表-->
        <template>
          <el-table
            :data="strategyTable"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="strategicName"
              label="策略名称"
              width="200"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              label="范围"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.operatorRange==1">
                 全部商户
                </span>
                <span v-else>
                  {{scope.row.distributors|distributorsFil}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="地域"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.regionType==1">
                 全部城市
                </span>
                <span v-else>
                  {{scope.row.city|cityFil}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="时段"
              width="290"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.timeRange==1">
                 全部时段
                </span>
                <span v-else>
                  {{scope.row.weekDay}}
                  <br/>
                  {{scope.row.strategicTimeList|strategicTimeFil}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="平台"
              width="100">
              <template slot-scope="scope">
                {{scope.row.payEntrys|platformFil}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="previewDetail(scope.row)">详情</el-button>
                <el-button type="text" @click="setEditMode(scope.row)">修改</el-button>
                <el-button type="text" @click="deleteStrategic(scope.row.id)" :disabled="scope.row.sourceType==1">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total-elements="strategyTotalElements"
            :change-callback="getStrategyList"
            ref="strategyPage"></pagination>
        </template>
        <!--功能模态框-->
        <template>
          <!--策略-->
           <el-dialog
    :close-on-click-modal="false"
            :title="strategyTitle"
            :visible.sync="addStrategyVisible"
            width="780px"
            :modal-append-to-body="false"
            :before-close="addStrategyClose">
            <!--表单内容-->
            <div>

              <el-form :model="addStrategyForm" :rules="adRule" ref="addStrategyForm" label-width="120px">
                <el-form-item label="策略名称：" prop="strategicName">
                  <el-input v-model.trim="addStrategyForm.strategicName" class="long-input-width" placeholder="输入策略名称"></el-input>
                </el-form-item>

                <el-form-item label="范围：" prop="operatorRange">
                  <el-radio-group v-model="addStrategyForm.operatorRange" size="medium">
                    <el-radio-button label="1">
                      <div class="equal-width">全部商户</div>
                    </el-radio-button>
                    <el-radio-button label="2">
                      <div class="equal-width">选择商户</div>
                    </el-radio-button>
                  </el-radio-group>

                  <div class="operatorRange-tips" v-show="addStrategyForm.operatorRange==2">
                    只有被勾选的商户（第二行）才正式生效！
                    <br />
                    代理商（第一行）的勾选图标仅为方便使用的交互元素，与广告投放无直接关系。
                  </div>

                  <!--选择器-->
                  <div v-if="addStrategyForm.operatorRange==2">
                    <!--代理商列表-->
                    <el-form-item>
                      <!--运营商-->
                      <div class="cascade-select">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`选择${agentName}`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{agentName}}</span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="oprList.length<1" class="list-data-error">
                            {{agentName}}错误x_x
                          </div>
                          <el-checkbox-group v-else v-model="selectOpr">
                            <el-checkbox :label="item.id" v-for="(item,index) in oprList"
                                         :key="index"
                                         style="width: 100%" @change="getAgentListAndAllSelect(1,item.id)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                              <i class="el-icon-arrow-right" v-if="selectOpr.indexOf(item.id)>=0"
                                 style="margin-left: auto" @click.prevent="getAgentList(1,item.id)"></i>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                      <!--渠道商-->
                      <div class="cascade-select" style="margin-left: 10px">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`选择${disName}`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{disName}}</span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="disList.length<1" class="list-data-error">
                            选择{{agentName}}后展示
                          </div>
                          <el-checkbox-group v-else v-model="selectDis">
                            <el-checkbox :label="item.id" v-for="(item,index) in disList"
                                         :key="index"
                                         style="width: 100%" @change="getAgentListAndAllSelect(2,item.id)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                              <i class="el-icon-arrow-right" v-if="selectDis.indexOf(item.id)>=0"
                                 style="margin-left: auto" @click.prevent="getAgentList(2,item.id)"></i>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                      <!--推广商-->
                      <div class="cascade-select" style="margin-left: 10px">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`选择${subName}`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{subName}}</span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="subList.length<1" class="list-data-error">
                            选择{{disName}}后展示
                          </div>
                          <el-checkbox-group v-else v-model="selectSub">
                            <el-checkbox :label="item.id" v-for="(item,index) in subList"
                                         :key="index"
                                         style="width: 100%" @change="getAgentListAndAllSelect(3,item.id)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                              <i class="el-icon-bottom" v-if="selectSub.indexOf(item.id)>=0"
                                 style="margin-left: auto" @click.prevent="getAgentList(3,item.id)"></i>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                    </el-form-item>
                    <!--下属商户列表-->
                    <el-form-item>
                      <!--运营商-->
                      <div class="cascade-select">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`只有被勾选的商户才正式生效，代理商的勾选图标仅代表一种提示。`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{agentName}}商户&nbsp<i
                                class="el-icon-question"></i></span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="oprMerchantList.length<1" class="list-data-error">
                            选择{{agentName}}后
                            <br>
                            展示下属商户
                          </div>
                          <el-checkbox-group v-else v-model="selectOprMerchant">
                            <el-checkbox :label="item.id" v-for="(item,index) in oprMerchantList"
                                         :key="index"
                                         style="width: 100%" @change="unSelectCheck(1)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                      <!--渠道商-->
                      <div class="cascade-select" style="margin-left: 10px">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`只有被勾选的商户才正式生效，代理商的勾选图标仅代表一种提示。`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{disName}}商户&nbsp<i
                                class="el-icon-question"></i></span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="disMerchantList.length<1" class="list-data-error">
                            选择{{disName}}后
                            <br>
                            展示下属商户
                          </div>
                          <el-checkbox-group v-else v-model="selectDisMerchant">
                            <el-checkbox :label="item.id" v-for="(item,index) in disMerchantList"
                                         :key="index"
                                         style="width: 100%" @change="unSelectCheck(2)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                      <!--推广商-->
                      <div class="cascade-select" style="margin-left: 10px">
                        <div class="cascade-select-header">
                          <div class="block">
                          </div>
                          <div class="block">
                            <el-tooltip :content="`只有被勾选的商户才正式生效，代理商的勾选图标仅代表一种提示。`" effect="light" placement="top">
                              <span class="hearer-user-classify">{{subName}}商户&nbsp<i
                                class="el-icon-question"></i></span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body">
                          <div v-if="subMerchantList.length<1" class="list-data-error">
                            选择{{subName}}后
                            <br>
                            展示下属商户
                          </div>
                          <el-checkbox-group v-model="selectSubMerchant">
                            <el-checkbox :label="item.id" v-for="(item,index) in subMerchantList"
                                         :key="index"
                                         style="width: 100%" @change="unSelectCheck(3)">
                              <span
                                style="width: 100px;text-overflow: ellipsis; white-space: normal;vertical-align: top">{{item.name}}</span>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-form-item>

                <el-form-item label="时段：">
                  <el-radio-group v-model="addStrategyForm.timeRange" size="medium">
                    <el-radio-button label="1">
                      <div class="equal-width">全部时段</div>
                    </el-radio-button>
                    <el-radio-button label="2">
                      <div class="equal-width">部分时段</div>
                    </el-radio-button>
                  </el-radio-group>

                  <!--操作时段-->
                  <div v-if="addStrategyForm.timeRange==2">
                    <template>
                      <el-checkbox v-model="allWeek" @change="changeAllweek">全部</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期日">星期日</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期一">星期一</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期二">星期二</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期三">星期三</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期四">星期四</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期五">星期五</el-checkbox>
                      <el-checkbox v-model="addStrategyForm.weekDay" label="星期六">星期六</el-checkbox>
                    </template>
                    <!--//时间选择-->
                    <template>
                      <el-form-item
                        v-for="(domain, index) in addStrategyForm.domains"
                        :key="domain.key" style="margin-bottom: 3px">
                        <template>
                          <el-form-item style="display: inline-block;width: 120px"
                                        :prop="'domains.' + index + '.startTime'"
                                        :rules="{required: true, message: '时间不能为空', trigger: 'blur'}">
                            <el-time-select
                              placeholder="起始时间"
                              v-model="domain.startTime"
                              :picker-options="{start: '00:00',step: '00:01',end: '23:59'}"
                              style="width: 120px">
                            </el-time-select>
                          </el-form-item>
                          <el-form-item style="display: inline-block;width: 120px"
                                        :prop="'domains.' + index + '.endTime'"
                                        :rules="{required: true, message: '时间不能为空', trigger: 'blur'}">
                            <el-time-select
                              placeholder="结束时间"
                              v-model="domain.endTime"
                              :picker-options="{start: '00:00',step: '00:01',end: '23:59',minTime: domain.startTime}"
                              style="width: 120px">
                            </el-time-select>
                          </el-form-item>
                        </template>

                        <el-button @click.prevent="removeDomain(domain)" v-if="index>0">删除</el-button>
                        <el-button @click="addDomain" v-if="index==addStrategyForm.domains.length-1 && index<=5">添加
                        </el-button>
                      </el-form-item>
                    </template>

                  </div>

                </el-form-item>

                <el-form-item label="地域：">
                  <el-radio-group v-model="addStrategyForm.regionType" size="medium">
                    <el-radio-button label="1">
                      <div class="equal-width">全国</div>
                    </el-radio-button>
                    <el-radio-button label="2">
                      <div class="equal-width">部分省份</div>
                    </el-radio-button>
                  </el-radio-group>
                  <!--选择器-->
                  <div v-show="addStrategyForm.regionType==2"
                       element-loading-background="rgba(255, 255, 255, 1)"
                       v-loading="regionLoading">
                    <el-form-item>
                      <!--省份-->
                      <div class="cascade-select">
                        <div class="cascade-select-header">
                          <div class="block">
                            <i class="el-icon-delete" style="cursor: pointer" @click="clearProv"><span
                              class="hearer-user-classify">&nbsp清空</span></i>
                          </div>
                          <div class="block">
                            <el-tooltip content="选择省份" effect="light" placement="top">
                              <span class="hearer-user-classify">省份</span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body" id="provScroll">
                          <el-checkbox-group v-model="provList" v-if="refreshProv">
                            <!--省份选择-->
                            <el-checkbox :label="item.value" v-for="(item,index) in copyCityData"
                                         :key="item.name"
                                         :checked="item.checked"
                                         @change="selectProv(item.value,index)"
                                         style="width: 100%">
                              {{item.name}}
                              <i class="el-icon-arrow-right" v-if="provList.indexOf(item.value)>=0"
                                 @click.prevent="previewCity(item.name,index) " style="margin-left: auto"></i>
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </div>
                      <!--城市-->
                      <!-- isSelectProv 是否选择城市-->
                      <div class="cascade-select" style="margin-left: 8px" v-if="isSelectProv">
                        <div class="cascade-select-header">
                          <div class="block">

                          </div>
                          <div class="block">
                            <el-tooltip content="选择城市" effect="light" placement="top">
                              <span class="hearer-user-classify">城市</span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="cascade-select-body" id="cityScroll">
                          <el-checkbox-group v-model="cityList">
                            <!--城市选择 cityPreviewList预览列表-->
                            <el-checkbox v-for="(city,index) in copyCityData[isSelectProvIndex].children"
                                         :label="city.value"
                                         :key="city.name"
                                         :checked="city.checked"
                                         @change="selectCity(city.name,index)"
                                         style="width: 100%"
                            >{{city.name}}
                            </el-checkbox>
                          </el-checkbox-group>

                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-form-item>

                <el-form-item label="平台：" prop="payEntrys">
                  <el-checkbox-group :min="1" v-model="addStrategyForm.payEntrys">
                    <el-checkbox label="1">微信</el-checkbox>
                    <el-checkbox label="2">支付宝</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>


                <!--表单结束-->
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addStrategyClose">取消</el-button>
    <el-button type="primary" @click="addStrategySubmit" :v-loading="btnLoading" :disabled="btnLoading">提交</el-button>
  </span>
          </el-dialog>
          <!--查看策略-->
           <el-dialog
    :close-on-click-modal="false"
            title="策略详情"
            :visible.sync="currentStrategyVisible"
            width="576px"
            :before-close="currentStrategyClose">
            <div>
              <table class="strategy-info">
                <tr>
                  <td>策略名称：</td>
                  <td>{{currentStrategy.strategicName||'*'}}</td>
                </tr>
                <tr>
                  <td>范围：</td>
                  <td>
                    <span v-if="currentStrategy.operatorRange==1">全部商户</span>
                    <span v-else>{{currentStrategy.distributors|distributorsFil}}</span>
                  </td>
                </tr>
                <tr>
                  <td>时段：</td>
                  <td>
                    <span v-if="currentStrategy.timeRange==1">全部时段</span>
                    <span v-else>{{currentStrategy.weekDay}}<br/>{{currentStrategy.strategicTimeList|strategicTimeFil}}</span>
                  </td>
                </tr>
                <tr>
                  <td>地域：</td>
                  <td>
                    <span v-if="currentStrategy.regionType==1">全部城市</span>
                    <span v-else>{{currentStrategy.city|cityFil}}</span></td>
                </tr>
                <tr>
                  <td>平台：</td>
                  <td> {{currentStrategy.payEntrys|platformFil}}</td>
                </tr>
              </table>

            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="currentStrategyClose">关闭</el-button>
              <el-button type="primary" @click="editStrategy">修改</el-button>
            </span>
          </el-dialog>
        </template>


      </el-tab-pane>
      <!--策略管理结束-->

      <!--************************************************************************-->
    </el-tabs>


    <!--数据-->
     <el-dialog
    :close-on-click-modal="false"
      title="投放广告数据"
      :visible.sync="adInfomationVisible"
      width="98%"
      :before-close="adInfomationClose">

      <div>
        <!--搜索条-->
        <div>
          <!--左侧-->
          <div class="block ">
            <el-date-picker
              v-model="dataSearch.startTime"
              type="date"
              placeholder="起始日期"
              format="yyyy 年 MM 月 dd 日"
              size="medium"
              @change="checkDataRange"
              value-format="timestamp">
            </el-date-picker>
            <el-date-picker
              v-model="dataSearch.endTime"
              type="date"
              placeholder="结束日期"
              size="medium"
              format="yyyy 年 MM 月 dd 日"
              @change="checkDataRange"
              value-format="timestamp">
            </el-date-picker>
            <el-button size="medium" type="primary" @click="getAdAya">查询</el-button>
            <el-button size="medium" @click="resetDay">重置</el-button>
            <el-button size="medium" @click="exportData">导出数据</el-button>
          </div>
        </div>
        <el-divider content-position="left">数据</el-divider>
        <!--图表-->
        <div style="width: 100%;height: 400px" id="drawcav"></div>
        <el-divider content-position="left">花费</el-divider>
        <div>
          <table style="width: 100%;text-align:center">
            <tr style="background-color: gray;color: white">
              <td>时间</td>
              <td>总花费(元)</td>
              <td v-if="currentData.advertiseType==3">跳转量</td>
              <td v-if="currentData.advertiseType==3">每跳转单价(元)</td>
              <td v-if="currentData.advertiseType==2 || currentData.advertiseType==1">展示量</td>
              <td v-if="currentData.advertiseType==2 || currentData.advertiseType==1">每千次展示单价(元)</td>
              <td v-if="currentData.advertiseType==1">点击量</td>
              <td v-if="currentData.advertiseType==1">每点击单价(元)</td>
            </tr>
            <tr>
              <td>{{format(this.dataSearch.startTime)}}-{{format(this.dataSearch.endTime)}}</td>
              <td>{{currentData.costMoney||0}}</td>
              <td v-if="currentData.advertiseType==3">{{currentData.runNumber||0}}</td>
              <td v-if="currentData.advertiseType==3">{{currentData.runCost||0}}</td>
              <td v-if="currentData.advertiseType==2 || currentData.advertiseType==1">{{currentData.showNumber||0}}</td>
              <td v-if="currentData.advertiseType==2 || currentData.advertiseType==1">{{currentData.showCost||0}}</td>
              <td v-if="currentData.advertiseType==1">{{currentData.clickNumber||0}}</td>
              <td v-if="currentData.advertiseType==1">{{currentData.clickCost||0}}</td>
            </tr>
          </table>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="adInfomationClose">关 闭</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import pagination from '@/components/pagination/index'
  import {returnThumbnailUrl, uploadUrl, hsfuploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {url} from '@/utils/request'
  import cityData from '@/assets/city/cityjs'
  import {
    getAgentList,
    getDistributeList,
    saveAdvertise,
    getAdvertiseList,
    getAdvertiseDetail,
    saveEditAdvertise,
    deleteAdvertise,
    saveStrategic,
    getStrategicList,
    getStrategicDetail,
    updateStrategic,
    deleteStrategic,
    getPutInList,
    savePutin,
    getPutInDetail,
    updatePutin,
    overPutin,
    startPutin,
    getPutInAnalysis,
    getExportData,
    deletePutin
  } from '@/modules/extension/api/postPaymentAD'
  import {mixins} from "../../../components/mixins/mixins";


  export default {
    name: "postPaymentAD",
    mixins:[mixins],
    components: {pagination},
    data() {
      var siteUrlReg = (rule, value, callback) => {
        let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
        if (!value) {
          return callback(new Error('网址不能为空'));
        } else {
          if (!reg.test(value)) {
            return callback(new Error('网址必须要http://或https://开头'));
          } else {
            return callback();
          }
        }
      };
      var moneyReg = (rule, value, callback) => {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!value || value <= 0 || value > 100000000) {
          return callback(new Error('金额不正确'));
        } else {
          if (!reg.test(value)) {
            return callback(new Error('金额不正确'));
          } else {
            return callback();
          }
        }
      };
      return {
        loading: false,// 页面加载
        tabsNum: '0', //标页码 0投放 1广告  2策略
        cityDataArr: cityData,
        copyCityData: [], //深拷贝后的数据
        //---------------图片上传-------------------
        filesData: {
          module: 'image'
        },
        url: uploadUrl + '/user',
        headers: {
          authorized: sessionStorage.token
        },
        //------------投放管理---------------------
        putInSearchForm: {
          onName: '',
          status: '',
        },//投放管理搜索表单
        putInStatusOption: [
          {value: '', label: '全部'},
          {value: 1, label: '投放中'},
          {value: 2, label: '未投放'},
          {value: 3, label: '结束投放'},
        ],//投放状态
        putInTable: [], //表格
        putInTotalElements: 0, //条数
        addPutVisible: false, //新建投放模态框
        putDetailVisible: false, //投放详情模态框
        addPutTitle: '新增投放规则',
        addPutForm: {
          onName: '', //投放规则名
          startTime: '',
          endTime: '',
          advertiseId: '',
          strategicId: '',
          money: '',
          remark: '',
          clickCost: 0,
          showCost: 0,
          runCost: 0,
        },//新增投放表单
        adRule: {
          onName: [
            {required: true, message: '请输入投放名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请选中投放开始时间', trigger: 'blur'},
          ],
          endTime: [
            {required: true, message: '请选中投放结束时间', trigger: 'blur'},
          ],
          advertiseId: [
            {required: true, message: '请选择广告', trigger: 'blur'},
          ],
          strategicId: [
            {required: true, message: '请选择策略', trigger: 'blur'},
          ],
          money: [
            {required: true, message: '请输入投放预算', trigger: 'blur'},
            {validator: moneyReg, trigger: 'blur'}
          ],
          runCost: [
            {required: true, message: '请输入每单次跳转费用', trigger: 'blur'},
            {validator: moneyReg, trigger: 'blur'}
          ],
          showCost: [
            {required: true, message: '请输入每千次展示费用', trigger: 'blur'},
            {validator: moneyReg, trigger: 'blur'}
          ],
          clickCost: [
            {required: true, message: '请输入每点击单价', trigger: 'blur'},
            {validator: moneyReg, trigger: 'blur'}
          ],
          advertiseName: [
            {required: true, message: '请输入广告名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          imageId: [
            {required: true, message: '请上传图片', trigger: 'blur'},
          ],
          imageLink: [
            {required: true, message: '请输入跳转链接', trigger: 'blur'},
            {validator: siteUrlReg, trigger: 'blur'}
          ],
          strategicName: [
            {required: true, message: '请输入策略名称', trigger: 'blur'},
          ],
          payEntrys: [
            {required: true, message: '请选择平台', trigger: 'blur'},
          ],
        },
        putDetailData: {}, //详情
        adType: '',
        putTimeMode: false,
        putAdOption: [],//投放广告选择
        putRulesOption: [],//投放广告选择

        putSeeAdDetail: false,
        putSeeStrategyDetail: false,
        addPutSaveMode: true,

        //---------------广告管理---------------------
        addSearchForm: {
          advertiseName: ''
        },
        adTable: [{
          id: '159753222',
          name: '广告1',
          type: '1',
          createTime: '2019-12-29 24:59:59',
          remarks: '这是广告',
        }],//广告表格
        adDetail: {},//广告详情
        adTotalElements: 0,//总条数
        addAdVisible: false,//新建广告 新增广告
        detailAdVisible: false,//广告详情
        editAdVisible: false,//编辑广告
        addAdForm: {
          advertiseName: '',
          sourceType: '2',
          imageLink: '',
          remark: '',
          imageId: '',
          type: '1', //新建广告类型【与标签页有关】
          appType: '1', //新建广告类型【与标签页有关】
        },//新增广告表单
        editAdForm: {}, //编辑广告表单

        addPhotoUrl: '',//广告图片地址
        editPhotoUrl: '',//广告图片地址
        currentAd: {},//当前详情

        //-------------策略管理-----------------
        strategySearchForm: {
          strategicName: '',
        },//搜索策略
        strategyTable: [],//列表
        strategyTotalElements: 0,//条数
        addStrategyVisible: false,//添加策略模态框
        strategyTitle: '新增策略',//策略模态框标题
        addStrategyForm: {
          strategicName: '',
          operatorRange:
            '1',
          timeRange:
            '1',
          regionType:
            '1',
          weekDay: [],
          domains: [{
            startTime: '',
            endTime: ''
          }],
          payEntrys: ['1', '2']
        },//策略表单
        allWeek: false,
        dynamicValidateForm: {},
        isSelectProv: false,//是否已经选过省份
        refreshProv: true,//刷新省份
        provScroll: 0,
        cityScroll: 0,
        isSelectProvIndex: 0,//已经选过省份下标
        provList: [], //已选中省列表
        cityList: [],//选中城市列表
        cityPreviewList: [],//当前展示城市列表

        //作废---------------------------------
        operatorsList: {},//在线获取运营商列表
        selectOperators: [],//已经选运营商列表
        currOperatorsDetail: {
          id: '',
          option: {}
        },//当前运营商下的渠道商
        selectDistribute: [],//已经选渠道商列表
        currentDistributeList: {},//当前运营商下的渠道商
        distributePrev: false,//是否显示渠道商列表
        regionLoading: false, //等待显示
        //作废---------------------------------
        oprList: [], //运营商列表
        disList: [], //渠道商列表
        subList: [], //推广商列表

        oprId: '', //运营商id
        disId: '', //渠道商id
        subId: '', //推广商id

        oprMerchantList: [], //运营商下属商户列表
        disMerchantList: [], //渠道商下属商户列表
        subMerchantList: [], //推广商下属商户列表

        selectOpr: [],//已选运营商列表
        selectDis: [],//已选渠道商列表
        selectSub: [],//已选推广商列表

        selectOprMerchant: [],//已选运营商商户列表
        selectDisMerchant: [],//已选渠道商商户列表
        selectSubMerchant: [],//已选推广商商户列表


        currentStrategy: {},//当前查看详情的策略
        currentStrategyVisible: false,//策略详情模态框

        newStrategyMode: true,

        //投放数据
        adInfomationVisible: false, //广告数据
        dataSearch: {
          id: '',
          startTime: '',
          endTime: ''
        },//搜索数据
        currentData: {},//当前数据

        //其他
        btnLoading: false,

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    watch: {
      'addStrategyForm.weekDay': {
        handler(nv, ov) {
          console.log(nv);
          let len = nv.length;
          if (len == 7) {
            this.allWeek = true
          } else {
            this.allWeek = false
          }
        },
        immediate: true,
        // deep: true
      },
    },
    filters: {
      //广告类型
      adTypeFil: function (val) {
        let txt = '未知';
        if (val == '' || val == null || val == undefined) {
          return txt;
        }
        let v = parseInt(val);
        switch (v) {
          case 1:
            txt = '点击量(CPC)';
            break;
          case 2:
            txt = '展示数(CPM)';
            break;
          case 3:
            txt = '跳转量(CPV)';
            break;
          default:
            txt = '未定义';
            break;
        }
        return txt
      },
      //支付平台过滤器
      platformFil: function (val) {
        let txt = '未定义';
        if (val == '' || val == null || val == undefined) {
          return txt;
        }
        console.log(val);
        let arr = val.split(",");
        console.log(arr);
        let payEntrysArr = [];
        for (let i in arr) {
          if (arr[i] == 1) {
            payEntrysArr.push('微信')
          } else if (arr[i] == 2) {
            payEntrysArr.push('支付宝')
          }
        }
        return payEntrysArr.join(',')
      },
      //商户范围过滤器
      distributorsFil: function (arr) {
        if (!Array.isArray(arr)) {
          return '***'
        }
        let oprList = [];
        for (let i in arr) {
          if (arr[i].merchantName) oprList.push(arr[i].merchantName)
        }
        let arrString = oprList.join('；');
        if (arrString === '') arrString = '其他商户';
        return arrString
      },
      //地域范围过滤器
      cityFil: function (arr) {
        if (!Array.isArray(arr)) {
          return '***'
        }
        //一级数组
        let opaArr = [];
        let key = 0;
        for (let i in arr) {
          let flag = true;
          for (let j in opaArr) {
            if (opaArr[j].n === arr[i].province) {
              flag = false
            }
          }
          if (flag) {
            let obj = {};
            obj = {'n': arr[i].province, 'chilren': []};
            opaArr.push(obj);
            key++
          }
        }
        //二级数组
        for (let i in opaArr) {
          for (let j in arr) {
            if (arr[j].province == opaArr[i].n) {
              let obj = {};
              obj.cityName = arr[j].cityName;
              opaArr[i].chilren.push(obj)
            }
          }
        }
        //拼接城市
        let text = '';
        for (let i in  opaArr) {
          let title = opaArr[i].n + '：';
          for (let j in opaArr[i].chilren) {
            if (j == opaArr[i].chilren.length - 1) {
              title += opaArr[i].chilren[j].cityName || ''
            } else {
              title += opaArr[i].chilren[j].cityName + '、' || ''
            }

          }
          text += title + '；'
        }
        console.log(opaArr);
        return (text)
      },
      //时间段
      strategicTimeFil: function (arr) {
        if (!Array.isArray(arr)) {
          return '***'
        }
        let text = '';
        for (let i in arr) {
          text += arr[i].startTime + '至' + arr[i].endTime + '；'
        }
        return text || ''
      },
      //广告状态
      adStatusFil: function (val) {
        let txt = '未知';
        if (val == '' || val == null || val == undefined) {
          return txt;
        }
        let v = parseInt(val);
        switch (v) {
          case 1:
            txt = '投放中';
            break;
          case 2:
            txt = '未投放';
            break;
          case 3:
            txt = '结束投放';
            break;
          default:
            txt = '位置';
            break;
        }
        return txt
      }

    },
    mounted() {
      //) 深拷贝城市数据，用于选择器
      this.copyCityData = this.deepCopy(this.cityDataArr);
      //页面操作
      this.changeTabs();

    },
    methods: {
      /**
       * 通用方法（非工具）
       */
      //响应切换标签页
      changeTabs(tab, event) {
        // console.log(tab, event);
        console.log('切换了标签页');
        let tn = this.tabsNum;
        if (tn == '0') {
          this.submitPutInSearch();
          this.getAdOption();
        } else if (tn == '1') {
          this.submitAdListSearch()
        } else if (tn == '2') {
          //默认搜索
          this.submitGetStrategyList();
          //获取代理商列表  0默认运营商
          this.distinguishParent('', 0)
        }
      },

      //广告数据模态框关闭
      adInfomationClose: function () {

        this.adInfomationVisible = false
      },
      //广告数据模态框打开
      adInfomationOpen: function (id) {
        this.dataSearch.id = id;
        let timestamp = (new Date()).getTime();
        this.dataSearch.startTime = timestamp - (6 * 24 * 60 * 60 * 1000);
        this.dataSearch.endTime = timestamp;

        this.getAdAya();
        this.adInfomationVisible = true
      },

      //导出数据
      exportData: function () {
        let id = this.dataSearch.id;
        let s = this.format(this.dataSearch.startTime);
        let e = this.format(this.dataSearch.endTime);

        getExportData(id, s, e).then(res => {
          console.log(res);
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let url = window.URL.createObjectURL(blob);
          window.location.href = url;
          this.$message.success('开始下载')
        }).catch(e => {
          this.$message.error('无法下载')
        })

      },

      //获取统计数据
      getAdAya: function () {
        let id = this.dataSearch.id;
        let s = this.format(this.dataSearch.startTime);
        let e = this.format(this.dataSearch.endTime);
        getPutInAnalysis(id, s, e).then(res => {
          this.drawData(res.obj);
          this.currentData = res.obj.look
        }).catch(e => {

        })
      },
      //渲染数据
      drawData: function (data) {
        let x1 = [];
        let x2 = [];
        let x3 = [];
        let day = [];
        let dataArr = data.details;
        for (let i in dataArr) {
          x1.push(dataArr[i].clickNumber);
          x2.push(dataArr[i].runNumber);
          x3.push(dataArr[i].showNumber);
          day.push(dataArr[i].day)
        }

        let xAxisRotate;
        if (day.length >= 20) {
          xAxisRotate = 45
        } else {
          xAxisRotate = 0
        }

        var chart = this.$echarts.init(document.getElementById('drawcav'));
        chart.setOption({
          // // title: {text: '商户统计', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} @ {c} 次 '
          },
          legend: {
            type: 'plain',
            orient: 'horizontal',
            left: 'center',
            top: 20,
            bottom: 20,
            data: ['点击量', '跳转量', '展示量']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 'auto',
              rotate: xAxisRotate //根据数组长度自动设置选择值
            },
            data: day
          },//X轴标题
          yAxis: {
            type: 'value'
          },
          series: [{
            data: x1,
            name: '点击量',
            type: 'line'
            // areaStyle: {}
          }, {
            data: x2,
            name: '跳转量',
            type: 'line'
            // areaStyle: {}
          }, {
            data: x3,
            name: '展示量',
            type: 'line'
            // areaStyle: {}
          }] //数据数组，多个数据，legend需要对于标题name
        })
      },


      //检查日期
      checkDataRange() {
        // let timestamp = (new Date()).getTime()
        let s = this.dataSearch.startTime || 0;
        let e = this.dataSearch.endTime || 0;
        if (s != null && e != null)
          if (e - s > (30 * 24 * 60 * 60 * 1000)) {
            this.$message.error('前后时间不能超过31天');
            this.dataSearch.startTime = this.dataSearch.endTime - (30 * 24 * 60 * 60 * 1000)
          }
      },

      //时间格式化
      format(ts) {
        let time = new Date(ts);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      resetDay: function () {
        let timestamp = (new Date()).getTime();
        this.dataSearch.startTime = timestamp - (6 * 24 * 60 * 60 * 1000);
        this.dataSearch.endTime = timestamp;
        this.getAdAya()
      },

      /**
       * 页面 《---------------------投放管理---------------------》
       */
      //发起搜索
      submitPutInSearch() {
        this.getPutInList(1, 10)
      },
      //获取列表
      getPutInList: function (pageNumber, pageSize) {
        let searchForm = this.putInSearchForm; //搜索条件
        console.log('搜索表单');//打印
        console.log(searchForm); //打印
        getPutInList(pageNumber, pageSize, searchForm).then(res => {
          let data = res.obj;
          this.putInTable = data.content;
          this.putInTotalElements = data.totalElements

        }).catch(e => {

        })
      },
      //获取下拉列
      getAdOption: function () {

        getAdvertiseList(1, 1000000, {'advertiseName': ''}).then(res => {
          this.putAdOption = res.obj.content
        }).catch(e => {

        });

        getStrategicList(1, 1000000, {'strategicName': ''}).then(res => {
          this.putRulesOption = res.obj.content
        }).catch(e => {

        })
      },
      //广告下拉列表
      selectAd: function (e) {
        console.log(e);
        this.checkAdType(e)
      },
      //判断广告类型
      checkAdType: function (id) {
        getAdvertiseDetail(id).then(res => {
          this.adType = res.obj.type; //获得广告类型
          console.log(this.adType)
        }).catch(e => {

        })
      },
      //打开新建投放模态框
      addPutOpen: function () {
        this.addPutTitle = '新建投放';
        this.addPutSaveMode = true;
        this.addPutVisible = true
      },

      //关闭新建投放模态框
      addPutClose: function () {
        this.addPutForm = {
          onName: '', //投放规则名
          startTime: '',
          endTime: '',
          advertiseId: '',
          strategicId: '',
          money: '',
          remark: '',
          clickCost: 0,
          showCost: 0,
          runCost: 0,
        };
        this.adType = ''; //重置广告类型
        this.$refs['addPutForm'].resetFields();
        this.addPutVisible = false
      },

      //提交新增投放
      addPutSubmit: function () {

        this.$refs['addPutForm'].validate((valid) => {
          if (valid) {
            //判断开始
            let form = this.addPutForm;
            form.appType = 1;
            form.advertiseType = this.adType;
            if (this.putTimeMode) {
              form.endTime = '2099-12-31'
            }

            if (form.advertiseType == null || form.appType == null) {
              this.$message({
                type: 'error',
                message: '数据不完整，需要刷新'
              });
              return
            }
            if (this.addPutSaveMode) {
              savePutin(form).then(res => {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this.putInRefresh()
              }).catch(e => {

              })

            } else {
              updatePutin(form).then(res => {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this.putInRefresh()
              }).catch(e => {

              })
            }

            this.addPutClose()
            //判断结束

          } else {
            this.$message({
              type: 'error',
              message: '还有未填写的内容'
            });
            return false;
          }
        });


      },


      //投放详情打开
      putDetailOpen: function (id) {
        getPutInDetail(id).then(res => {
          let data = res.obj;
          this.putDetailData = data
        }).catch(e => {

        });
        this.putDetailVisible = true
      },

      //投放详情关闭
      putDetailClose: function () {
        this.putDetailVisible = false
      },
      //编辑投放
      putEdit: function (id) {
        this.addPutTitle = '编辑投放';
        this.addPutSaveMode = false;
        getPutInDetail(id).then(res => {
          let data = res.obj;
          this.detailInfoSendForm(data)
        }).catch(e => {

        });
        this.addPutVisible = true
      },
      //投放详情前往投放修改模态框
      putDetail2putEdit: function () {
        this.addPutTitle = '编辑投放';
        this.addPutSaveMode = false;
        this.detailInfoSendForm(this.putDetailData);
        this.addPutVisible = true
      },

      // 获取到的详情赋值给表单
      detailInfoSendForm: function (data) {
        console.log(data);
        this.addPutForm.id = data.id;
        this.addPutForm.onName = data.onName;
        this.addPutForm.advertiseType = data.advertiseType;
        this.addPutForm.advertiseId = data.advertiseId;
        this.addPutForm.strategicId = data.strategicId;
        this.addPutForm.remark = data.remark;
        this.addPutForm.showCost = data.showCost;
        this.addPutForm.clickCost = data.clickCost;
        this.addPutForm.showNumber = data.showNumber;
        this.addPutForm.runNumber = data.runNumber;
        this.addPutForm.money = data.money;
        this.addPutForm.endTime = data.endTime;
        this.addPutForm.startTime = data.startTime;
        this.adType = data.advertiseType;
        if (data.endTime == '2099-12-31') {
          this.putTimeMode = true
        }
      },
      //投放看广告详情打开
      putSeeAdOpen: function (id) {
        getAdvertiseDetail(id).then(res => {
          let data = res.obj || [];
          this.adDetail = data;
        }).catch(e => {

        });
        this.putSeeAdDetail = true
      },
      //投放看广告详情关闭
      putSeeAdClose: function () {
        this.putSeeAdDetail = false
      },
      //投放看策略详情打开
      putSeeStrategyDetailOpen: function (data) {
        getStrategicDetail(data.id).then(res => {
          let data = res.obj;
          this.currentStrategy = data;
        }).catch(e => {

        });
        this.putSeeStrategyDetail = true
      },
      //投放看策略详情关闭
      putSeeStrategyDetailClose: function () {
        this.putSeeStrategyDetail = false
      },


      // 结束
      putOver: function (id) {
        this.$confirm('此操作将结束投放, 是否继续?', '结束投放', {
          confirmButtonText: '结束',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          overPutin(id).then(res => {
            this.$message({
              type: 'success',
              message: '已结束投放'
            });
            this.putInRefresh()
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //投放
      putStart: function (id) {
        this.$confirm('此操作将开始投放, 是否继续?', '开始投放', {
          confirmButtonText: '投放',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          startPutin(id).then(res => {
            this.$message({
              type: 'success',
              message: '已投放'
            });
            this.putInRefresh()
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //删除投放
      putDelete: function (id) {
        this.$confirm('此操作将删除投放, 是否继续?', '删除投放', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePutin(id).then(res => {
            this.$message({
              type: 'success',
              message: '已删除'
            });
            this.putInRefresh()
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //投放页面刷新
      putInRefresh: function () {
        this.$refs.page.refresh() //page节点刷新页面
      },

      /**
       * 页面 《---------------------广告管理---------------------》
       */
      //提交搜索
      submitAdListSearch() {
        //获取列表
        this.getAdList(1, 10)
      },
      //获取广告列表
      getAdList: function (pageNumber, pageSize) {
        let searchForm = this.addSearchForm; //搜索条件
        console.log('搜索表单');
        console.log(searchForm);
        getAdvertiseList(pageNumber, pageSize, searchForm).then(res => {
          let data = res.obj;
          this.adTable = data.content;
          this.adTotalElements = data.totalElements
        }).catch(e => {

        })
      },
      //获取单支广告详情
      getAdDetail: function (rowData) {
        let id = rowData.id;
        getAdvertiseDetail(id).then(res => {
          let data = res.obj || [];
          this.currentAd = rowData; //当前数据，跳转修改用
          this.adDetail = data;
          this.detailAdVisible = true
        }).catch(e => {

        })
      },
      //广告详情模态框关闭
      detailAdClose: function () {
        this.adDetail = [];
        this.detailAdVisible = false
      },
      // 新建广告模态框
      addAdOpen: function () {
        this.addAdVisible = true
      },
      // 新建广告模态框关闭
      addAdClose: function () {
        this.$refs['addAdForm'].resetFields();
        this.addAdVisible = false
      },
      //编辑广告模态框打开
      editAdOpen: function (rowData) {
        this.detailAdVisible = false; //关闭详情
        let id = rowData.id;
        let sourceType = rowData.sourceType;
        if (id == '' || id == null || id == undefined) {
          this.$message.error('没有获取到广告ID');
          return false
        }
        //获取详情
        getAdvertiseDetail(id).then(res => {
          let data = res.obj || [];
          this.editAdForm = data;
          this.editAdForm.id = id;
          this.editAdForm.sourceType = sourceType || 1;
          if (data.imageId != '' || data.imageId != null) {
            this.editPhotoUrl = this.getImg(data.imageId);
          }
          this.editAdVisible = true
        }).catch(e => {

        })
      },
      //编辑广告模态框关闭
      editAdClose: function () {
        this.editPhotoUrl = '';
        this.$refs['editAdForm'].resetFields();
        this.editAdVisible = false
      },
      //提交保存新广告
      addAdSubmit: function () {
        this.btnLoading = true;
        let addForm = this.addAdForm; //get表单
        addForm.appType = 1; //支付后广告
        this.$refs['addAdForm'].validate((valid) => {
          if (valid) {
            saveAdvertise(addForm).then(res => {
              this.$message.success(res.msg);
              //清空表单
              this.btnLoading = false;
              this.addPhotoUrl = '';
              this.addAdVisible = false;
              this.$refs['addAdForm'].resetFields();
              this.adRefresh()
            }).catch(e => {
              this.btnLoading = false;
            });
          } else {
            this.btnLoading = false;
            return false;
          }
        });
      },
      //删除广告
      deleteAdvertise: function (id) {

        this.$confirm('此操作将删除该广告, 是否继续?', '删除广告', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAdvertise(id).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.adRefresh()
          }).catch(e => {
            //删除失败
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //提交编辑广告
      editAdSubmit: function () {
        this.btnLoading = true;
        let editForm = this.editAdForm; //get表单
        this.$refs['editAdForm'].validate((valid) => {
          if (valid) {
            saveEditAdvertise(editForm).then(res => {
              this.$message.success(res.msg);
              //清空表单
              this.btnLoading = false;
              this.editAdVisible = false;
              this.editAdClose();
              this.adRefresh();
            }).catch(e => {
              this.btnLoading = false;
            });
          } else {
            this.btnLoading = false;
            return false;
          }
        });


      },
      //广告图片上传
      addPhotoUpload(response, file) {
        console.log(response);
        this.$message({
          message: '广告图片上传成功',
          type: 'success'
        });
        this.addAdForm.imageId = response.obj;
        this.addPhotoUrl = this.getImg(response.obj)
      },
      //广告图片上传（编辑）
      editPhotoUpload(response, file) {
        console.log(response);
        this.$message({
          message: '广告图片上传成功',
          type: 'success'
        });
        this.editAdForm.imageId = response.obj;
        this.editPhotoUrl = this.getImg(response.obj)
      },
      //刷新广告列表
      adRefresh: function () {
        this.$refs.adPage.refresh() //page节点刷新页面
      },

      /**
       * 页面 《---------------------策略管理---------------------》
       */
      //发起搜索
      submitGetStrategyList: function () {
        this.getStrategyList(1, 10)
      },
      //获取列表
      getStrategyList: function (pageNumber, pageSize) {
        let form = this.strategySearchForm;
        getStrategicList(pageNumber, pageSize, form).then(res => {
          console.log(res);
          let data = res.obj;
          this.strategyTable = data.content;
          this.strategyTotalElements = data.totalElements
        }).catch(e => {

        })

      },
      //关闭新增策略模态框
      addStrategyClose: function () {
        this.$refs['addStrategyForm'].resetFields();
        this.clearStrategyForm();
        // this.selectOperators = [];//运营商清空
        // this.selectDistribute = [];//渠道商清空

        // this.oprList = []; //运营商列表
        this.disList = []; //渠道商列表
        this.subList = []; //推广商列表

        this.oprId = ''; //运营商id
        this.disId = ''; //渠道商id
        this.subId = ''; //推广商id

        this.oprMerchantList = []; //运营商下属商户列表
        this.disMerchantList = []; //渠道商下属商户列表
        this.subMerchantList = []; //推广商下属商户列表

        this.selectOpr = [];//已选运营商列表
        this.selectDis = [];//已选渠道商列表
        this.selectSub = [];//已选推广商列表

        this.selectOprMerchant = [];//已选运营商商户列表
        this.selectDisMerchant = [];//已选渠道商商户列表
        this.selectSubMerchant = [];//已选推广商商户列表

        this.copyCityData = this.deepCopy(cityData); //重置城市数据
        //模态框状态还原
        this.newStrategyMode = true;
        this.strategyTitle = '新增策略';
        //解锁状态
        this.btnLoading = false; //关闭后强制解锁所有按钮
        this.addStrategyVisible = false
      },
      //打开新增策略模态框
      addStrategyOpen: function () {
        this.newStrategyMode = true;
        this.strategyTitle = '新增策略';
        this.provList = [];
        this.cityList = [];
        this.addStrategyVisible = true
      },
      //从列表进入编辑模式
      setEditMode: function (data) {
        this.currentStrategy = data;
        this.editStrategy()
      },
      //开启编辑模式
      editStrategy: function () {
        let id = this.currentStrategy.id;
        getStrategicDetail(id).then(res => {
          this.currentStrategyClose();
          this.newStrategyMode = false;
          this.strategyTitle = '编辑策略';
          //整理数据
          this.backDataformatForm(res.obj);
          console.log(res)
        }).catch(e => {
        });
      },
      //返回数据 格式化为 编辑可用
      backDataformatForm: function (data) {
        this.loading = true;
        console.log(data);
        //基础信息
        this.addStrategyForm.strategicName = data.strategicName;
        this.addStrategyForm.operatorRange = data.operatorRange;
        this.addStrategyForm.timeRange = data.timeRange;
        this.addStrategyForm.regionType = data.regionType;
        this.addStrategyForm.payEntrys = data.payEntrys.split(',');
        this.addStrategyForm.id = data.id;
        //多选信息


        //回填所有已选择的代理商和商户
        let getOprIdsArray = data.distributors;

        for (let i in getOprIdsArray) {
          if (getOprIdsArray[i].operatorId != null) {
            //判断是否已经选择此商户
            if (this.selectOpr.indexOf(getOprIdsArray[i].operatorId) < 0) {
              this.selectOpr.push(getOprIdsArray[i].operatorId)
            }
            if (this.selectOprMerchant.indexOf(getOprIdsArray[i].merchantId) < 0) {
              this.selectOprMerchant.push(getOprIdsArray[i].merchantId)
            }
          }
          if (getOprIdsArray[i].distributorsId != null) {
            //判断是否已经选择此商户
            if (this.selectDis.indexOf(getOprIdsArray[i].distributorsId) < 0) {
              this.selectDis.push(getOprIdsArray[i].distributorsId)
            }
            if (this.selectDisMerchant.indexOf(getOprIdsArray[i].merchantId) < 0) {
              this.selectDisMerchant.push(getOprIdsArray[i].merchantId)
            }
          }
          if (getOprIdsArray[i].promoteId != null) {
            //判断是否已经选择此商户
            if (this.selectSub.indexOf(getOprIdsArray[i].promoteId) < 0) {
              this.selectSub.push(getOprIdsArray[i].promoteId)
            }
            if (this.selectSubMerchant.indexOf(getOprIdsArray[i].merchantId) < 0) {
              this.selectSubMerchant.push(getOprIdsArray[i].merchantId)
            }
          }
        }


        //星期
        this.addStrategyForm.weekDay = data.weekDay.split(',');

        //时间范围
        if (data.timeRange == 2) {
          this.addStrategyForm.domains = [];
          for (let i in data.strategicTimeList) {
            let obj = {};
            obj.startTime = data.strategicTimeList[i].startTime;
            obj.endTime = data.strategicTimeList[i].endTime;
            this.addStrategyForm.domains.push(obj)
          }
        }
        //省市
        this.copyCityData = this.deepCopy(this.cityDataArr);//重置省市数据

        //省
        this.provList = [];
        let tempProv = [];
        let arrProv = data.city;
        for (let i in arrProv) {
          let flag = true;
          for (let j in tempProv) {
            if (tempProv[j] === arrProv[i].province) {
              flag = false
            }
          }
          if (flag) {
            let name = arrProv[i].province;
            tempProv.push(name);
          }
        }

        for (let i in this.copyCityData) {
          for (let j in tempProv) {
            if (this.copyCityData[i].name === tempProv[j]) {
              this.copyCityData[i].checked = 'checked';
              this.provList.push(this.copyCityData[i].id);
              for (let k in this.copyCityData[i].children) {
                for (let l in data.city) {
                  if (data.city[l].cityName === this.copyCityData[i].children[k].name) {
                    this.copyCityData[i].children[k].checked = 'checked'
                  }
                }
              }
            }
          }
        }

        /**
         * 窗口nextTick更新
         */
        this.isSelectProv = false;
        this.refreshProv = false;
        this.$nextTick(() => {
          this.cityList = [];
          this.provList = [];
          this.isSelectProv = true;//开始城市选择器
          this.refreshProv = true;//开始省份选择器
        });
        this.isSelectProv = false; //关闭城市

        this.distributePrev = false; //关闭渠道商
        this.loading = false; //关闭加载
        //开启模态框

        this.addStrategyVisible = true;
      },
      //提交前汇集数据
      addStrategySubmit: function () {
        this.btnLoading = true;
        // 汇集数据
        let assemble = {};
        let strategy = this.addStrategyForm;
        assemble.strategicName = strategy.strategicName; //策略名字
        assemble.operatorRange = strategy.operatorRange;//商户范围
        assemble.timeRange = strategy.timeRange;//时间范围
        assemble.regionType = strategy.regionType;//地区范围

        assemble.payEntrys = strategy.payEntrys.join(',');//支付平台


        if (assemble.operatorRange == 2) {
          let arr1 = this.selectOprMerchant;
          let arr2 = this.selectDisMerchant;
          let arr3 = this.selectSubMerchant;
          console.log(arr1, arr2, arr3);
          let resultArray = [];
          resultArray = arr1.concat(arr2, arr3); //拼接1-2-3
          console.log(resultArray);
          assemble.merchantIds = resultArray;
          if (assemble.merchantIds < 1) {
            this.$message.error(`还未选择商户`);
            this.btnLoading = false;
            return
          } else {
            assemble.merchantIds = resultArray.join(',');
            console.log(assemble.merchantIds)
          }

          // assemble.operators = this.selectOperators.join(',');//运营商拼接
          // assemble.distributors = this.selectDistribute.join(',');//渠道商拼接
        }


        assemble.SourceType = 2;//2策略未启用  1启用
        assemble.appType = 1;//1支付后广告  2APP广告

        if (assemble.timeRange == 1) {
          assemble.weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"].join(',')
        } else {
          if (strategy.weekDay.length < 1) {
            this.$message.error('还未选择时段中的星期');
            this.btnLoading = false;
            return
          }
          assemble.weekDay = strategy.weekDay.join(',');//星期
        }


        //时间数组
        if (assemble.timeRange == 2) {

          let temp = this.addStrategyForm.domains;
          let arr = {};
          //遍历所有时间
          for (let i in temp) {
            let key = i;
            if (temp[i].startTime != null && temp[i].startTime != '' && temp[i].endTime != null && temp[i].endTime != '') {
              arr[key] = {'startTime': temp[i].startTime, 'endTime': temp[i].endTime}
            }
          }
          assemble.time = JSON.stringify(arr); //遍历完成后赋值
          console.log(assemble.time);
        }
        //城市拼接
        if (assemble.regionType == 2) {
          let tmp = {};
          let key = 0;
          for (let i in this.copyCityData) {
            for (let j in this.copyCityData[i].children) {
              if (this.copyCityData[i].checked === 'checked' && this.copyCityData[i].children[j].checked === 'checked') {
                tmp[key] = {'province': this.copyCityData[i].name, 'city': this.copyCityData[i].children[j].name};
                key++
              }
            }
          }
          if (key < 1) {
            this.$message.error('还未选择城市/地区');
            this.btnLoading = false;
            return
          }
          assemble.city = JSON.stringify(tmp)
        }
        //调用发送数据
        if (this.newStrategyMode) {
          //新建模式 提交
          this.addCheckStrategySubmit(assemble);
        } else {
          //编辑模式 提交
          assemble.SourceType = '';
          assemble.id = strategy.id; //编辑需要id
          this.updateCheckStrategySubmit(assemble)
        }

        console.log(assemble)
      },
      //提交新建数据
      addCheckStrategySubmit: function (form) {
        this.$refs['addStrategyForm'].validate((valid) => {
          if (valid) {

            saveStrategic(form).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.btnLoading = false;
              this.addStrategyClose();
              this.strategyRefresh()
            }).catch(e => {
              this.$message({
                message: e,
                type: 'error'
              });
              this.btnLoading = false
            })

          } else {

            this.$message({
              message: '还有内容未填写',
              type: 'error'
            });
            this.btnLoading = false;

            return false;
          }
        });


      },
      //提交编辑数据
      updateCheckStrategySubmit: function (form) {
        this.$refs['addStrategyForm'].validate((valid) => {
          if (valid) {

            updateStrategic(form).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.btnLoading = false;
              this.addStrategyClose();
              this.strategyRefresh()
            }).catch(e => {
              this.$message({
                message: e,
                type: 'error'
              });
              this.btnLoading = false
            })

          } else {

            this.$message({
              message: '还有内容未填写',
              type: 'error'
            });
            this.btnLoading = false;

            return false;
          }
        });

      },
      //删除策略
      deleteStrategic: function (id) {
        this.$confirm('此操作将删除该策略, 是否删除?', '删除广告', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteStrategic(id).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.strategyRefresh()
          }).catch(e => {
            //删除失败
            this.strategyRefresh()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //刷新策略列表
      strategyRefresh: function () {
        this.$refs.strategyPage.refresh() //page节点刷新页面
      },
      //清理表单
      clearStrategyForm: function () {
        this.addStrategyForm = {
          strategicName: '',
          operatorRange:
            '1',
          timeRange:
            '1',
          regionType:
            '1',
          weekDay: [],
          domains: [{
            startTime: '',
            endTime: ''
          }],
          payEntrys: ['1', '2']
        };

        this.copyCityData = this.deepCopy(this.cityDataArr);
      },

      //全部星期
      changeAllweek: function () {
        if (this.allWeek) {
          this.addStrategyForm.weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        } else {
          this.addStrategyForm.weekDay = []
        }
      },

      //动态增减时间输入框
      removeDomain(item) {
        var index = this.addStrategyForm.domains.indexOf(item);
        if (index !== -1) {
          this.addStrategyForm.domains.splice(index, 1)
        }
      },
      //增加域名
      addDomain() {
        if (this.addStrategyForm.domains.length >= 5) {
          return
        }
        this.addStrategyForm.domains.push({
          startTime: '',
          endTime: '',
          key: Date.now()
        });
      },

      /**
       * 商户选择
       */

      // 区分不同获取代理商
      distinguishParent: function (id = '', type = 1) {
        // 1运营商 2渠道商 3推广商
        this.getAgentList(type, id)
      },

      //获取代理商列表并全选商户
      getAgentListAndAllSelect: function (type, id = '') {
        getAgentList(id).then(res => {
          let data = res.obj;
          this.reviewAgentData(data, type, id);
          this.reviewMerchantByAgentDataAndSelect(data, type, id)
        }).catch(e => {

        })
      },


      //获取代理商列表
      getAgentList: function (type, id = '') {
        getAgentList(id).then(res => {
          let data = res.obj;
          this.reviewAgentData(data, type, id)
        }).catch(e => {

        })
      },

      //按照要求数据的父级不同，回填数据到不同地方
      reviewAgentData: function (data, type, id) {
        if (type === 0) {
          this.oprList = data.company //运营商列表
        } else if (type === 1) {
          this.oprId = id;
          this.disList = data.company; //渠道商列表
          this.oprMerchantList = data.merchant  //运营商商户
        } else if (type === 2) {
          this.disId = id;
          this.subList = data.company; //推广商列表
          this.disMerchantList = data.merchant //渠道商商户
        } else if (type === 3) {
          this.subId = id;
          this.subMerchantList = data.merchant //推广商商户
        } else {
          this.$message.info('这是什么层级？');
          return false
        }
      },

      //按照要求数据的父级的不同，全选或全取消
      reviewMerchantByAgentDataAndSelect: function (data, type, id) {
        if (id === '') {
          return false
        }
        if (type === 1) {
          //1
          this.oprId = id;
          //判断是否选中
          if (this.selectOpr.indexOf(id) >= 0) {
            try {
              let objData = this.oprMerchantList;
              let oldArray = this.selectOprMerchant;
              let newArray = [];
              //旧代理商数组push新代理商
              for (let i in objData) {
                newArray.push(objData[i].id)
              }
              //使用set去重
              let result = new Set(oldArray.concat(newArray));
              //set结构变为array结构
              this.selectOprMerchant = Array.from(result)
            } catch (e) {
              console.log(e)
            }
          } else {
            // 如果不是选中，则清空下属商户
            try {
              let objData = this.oprMerchantList;
              let oldArray = this.selectOprMerchant;
              for (let i in objData) {
                for (let j in oldArray) {
                  if (oldArray[j] === objData[i].id) {
                    oldArray.splice(j, 1)
                  }
                }
              }
              this.selectOprMerchant = oldArray
            } catch (e) {
              console.log(e)
            }
          }
          console.log(this.selectOprMerchant)
        } else if (type === 2) {
          //2
          this.disId = id;
          if (this.selectDis.indexOf(id) >= 0) {
            try {
              let objData = this.disMerchantList;
              let oldArray = this.selectDisMerchant;
              let newArray = [];
              for (let i in objData) {
                newArray.push(objData[i].id)
              }
              let result = new Set(oldArray.concat(newArray));
              this.selectDisMerchant = Array.from(result)
            } catch (e) {
              console.log(e)
            }
          } else {
            try {
              let objData = this.disMerchantList;
              let oldArray = this.selectDisMerchant;
              for (let i in objData) {
                for (let j in oldArray) {
                  if (oldArray[j] === objData[i].id) {
                    oldArray.splice(j, 1)
                  }
                }
              }
              this.selectDisMerchant = oldArray
            } catch (e) {
              console.log(e)
            }
          }
          console.log(this.selectDisMerchant)
        } else if (type === 3) {
          //3
          this.subId = id;
          if (this.selectSub.indexOf(id) >= 0) {
            try {
              let objData = this.subMerchantList;
              let oldArray = this.selectSubMerchant;
              let newArray = [];
              for (let i in objData) {
                newArray.push(objData[i].id)
              }
              let result = new Set(oldArray.concat(newArray));
              this.selectSubMerchant = Array.from(result)
            } catch (e) {
              console.log(e)
            }
          } else {
            try {
              let objData = this.subMerchantList;
              let oldArray = this.selectSubMerchant;
              for (let i in objData) {
                for (let j in oldArray) {
                  if (oldArray[j] === objData[i].id) {
                    oldArray.splice(j, 1)
                  }
                }
              }
              this.selectSubMerchant = oldArray
            } catch (e) {
              console.log(e)
            }
          }
          console.log(this.selectSubMerchant)
        }


      },


      //全取消判断
      unSelectCheck: function (type) {
        if (type === 1) {
          console.log('type 1 gogogo');
          try {
            let serverArr = this.oprMerchantList;
            let selectArr = this.selectOprMerchant;
            let count = 0;
            for (let i in serverArr) {
              for (let j in selectArr) {
                if (selectArr[j] === serverArr[i].id) {
                  count++
                }
              }
            }
            if (count === 0) {
              this.selectOpr.splice(this.selectOpr.indexOf(this.oprId), 1)
            } else {
              //如果没有找到id,则添加
              if (this.selectOpr.indexOf(this.oprId) < 0) {
                this.selectOpr.push(this.oprId)
              }
            }
          } catch (e) {
            console.log(e)
          }
        } else if (type === 2) {
          try {
            let serverArr = this.disMerchantList;
            let selectArr = this.selectDisMerchant;
            let count = 0;
            for (let i in serverArr) {
              for (let j in selectArr) {
                if (selectArr[j] === serverArr[i].id) {
                  count++
                }
              }
            }
            if (count === 0) {
              this.selectDis.splice(this.selectDis.indexOf(this.disId), 1)
            } else {
              //如果没有找到id,则添加
              if (this.selectDis.indexOf(this.disId) < 0) {
                this.selectDis.push(this.disId)
              }
            }
          } catch (e) {
            console.log(e)
          }
        } else if (type === 3) {
          try {
            let serverArr = this.subMerchantList;
            let selectArr = this.selectSubMerchant;
            let count = 0;
            for (let i in serverArr) {
              for (let j in selectArr) {
                if (selectArr[j] === serverArr[i].id) {
                  count++
                }
              }
            }
            if (count === 0) {
              this.selectSub.splice(this.selectSub.indexOf(this.subId), 1)
            } else {
              //如果没有找到id,则添加
              if (this.selectSub.indexOf(this.subId) < 0) {
                this.selectSub.push(this.subId)
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
      },


      //1号窗口选中省份
      //ix 下标
      selectProv: function (na, ix) {
        this.regionLoading = true; //锁死选择
        //先获取高度
        this.provScroll = this.$el.querySelector("#provScroll").scrollTop || 0;
        //处理数据
        console.warn(na, ix);
        console.log(this.provList);
        // 选中后增加checked标记
        if (this.provList.indexOf(na) >= 0) {
          this.copyCityData[ix].checked = 'checked'
        } else {
          this.copyCityData[ix].checked = null
        }
        //第一次选择则全选所有城市
        if (this.copyCityData[ix].checked === 'checked') {
          for (let i in this.copyCityData[ix].children) {
            this.copyCityData[ix].children[i].checked = 'checked'
          }
        } else if (this.copyCityData[ix].checked === null) {
          for (let i in this.copyCityData[ix].children) {
            this.cityList = [];
            this.copyCityData[ix].children[i].checked = null
          }
        }

        console.log(this.copyCityData);

        //选择省份后记录当前下标和“开始选择”状态
        this.isSelectProv = true; //置位false，方便$nextTick
        this.isSelectProvIndex = ix;//记录当前省份下标

        //设置当前高度、记录当前高度
        let that = this;
        setTimeout(() => {
          that.$el.querySelector("#provScroll").scrollTop = this.provScroll;
          that.regionLoading = false //解锁选择
        }, 10);
        //前往 设置城市
        this.previewCity(na, ix)
      },

      //当前省份的城市
      previewCity: function (name, ix) {
        this.isSelectProv = false;
        this.isSelectProvIndex = ix;//记录当前省份下标
        this.$nextTick(() => {
          this.cityList = [];
          this.isSelectProv = true;//开始城市选择器
        });


      },
      //城市选择器
      selectCity: function (na, ix) {
        this.regionLoading = true; //锁死选择
        //先获取高度
        this.provScroll = this.$el.querySelector("#provScroll").scrollTop || 0;
        this.cityScroll = this.$el.querySelector("#cityScroll").scrollTop || 0;

        console.log(na, ix);
        let nowProvindex = this.isSelectProvIndex; //当前预览省份下标
        console.log(this.copyCityData);
        // 切换选中状态
        if (this.copyCityData[nowProvindex].children[ix].checked === 'checked') {
          this.copyCityData[nowProvindex].children[ix].checked = null
        } else {
          this.copyCityData[nowProvindex].children[ix].checked = 'checked'
        }

        //检查是否全部取消城市
        let citySelCount = 0;
        for (let i in this.copyCityData[nowProvindex].children) {
          if (this.copyCityData[nowProvindex].children[i].checked === 'checked') {
            citySelCount++
          }
        }
        if (citySelCount === 0) {
          this.copyCityData[nowProvindex].checked = null;
          this.refreshProv = false;
          this.provList = [];
          this.$nextTick(() => {
            this.refreshProv = true
          })
        } else if (citySelCount > 0) {
          this.copyCityData[nowProvindex].checked = 'checked';
          this.refreshProv = false;
          this.provList = [];
          this.$nextTick(() => {
            this.refreshProv = true
          })
        }


        //处理完成后,重置第城市选区
        this.isSelectProv = false;
        this.$nextTick(() => {
          this.cityList = [];
          this.isSelectProv = true;//开始城市选择器
        });
        //设置当前高度、记录当前高度
        let that = this;
        setTimeout(() => {
          that.$el.querySelector("#cityScroll").scrollTop = this.cityScroll;
          that.$el.querySelector("#provScroll").scrollTop = this.provScroll;
          that.regionLoading = false //解锁选择
        }, 300)
        // this.regionLoading = false; //锁死选择
      },
      //清空省份
      clearProv: function () {
        for (let i in this.copyCityData) {
          if (this.copyCityData[i].checked === 'checked') {
            this.copyCityData[i].checked = null;
            for (let j in this.copyCityData[i].children) {
              if (this.copyCityData[i].children[j].checked === 'checked') {
                this.copyCityData[i].children[j].checked = null
              }
            }
          }
        }
        this.provList = [];
        //处理完成后,重置第城市选区
        this.isSelectProv = false;
        this.$nextTick(() => {
          this.cityList = [];
          this.isSelectProv = false;//开始城市选择器
        });
      },
      //清空当前城市
      clearCurrCity: function () {
        console.log('保留')
      },
      //显示详情
      previewDetail: function (data) {
        this.currentStrategy = data;
        console.log(data);
        this.currentStrategyOpen()
      },
      //策略详情关闭
      currentStrategyClose: function () {
        this.currentStrategyVisible = false
      },
      //策略详情打开
      currentStrategyOpen: function () {
        this.currentStrategyVisible = true
      },


      /**
       * 工具-----------------------------
       */

      /**
       * 换取图片
       */
      getImg: function (val) {
        let reg = /^[0-9]*$/;
        if (reg.test(val)) {
          return returnFilesUrl(val)
        } else {
          let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAFLklEQVR42u2dfVPyMAzA9/0/GyLKy4kep6Kgk0NRFJ2gPD13t+vTbqVbm6QdyV+Ks01/ZFmbplmyZ0GRhBEwaAbNwqAZNINmYdAMmoVBM+gG8v7+3rGWx8dHBl1POs4yn88ZdKWkadrxLQz6P/n5+emAyenpKYO2dRTj8fj397f03xeLhU0L9/f3xwsa4q6fzWZhepIkNMqDwQDUF11fXx8LaOEEShEMh0O0r7P9oD8+PpBHfn5+rnfX6/XaDPrl5UUf8/f3N5WnaifozWZDO9TpdEqoAB7oEBzlaDSiUiOhokw12dIfxTjzkISKMiHr3W6HrwY46OVyGWA4Al+NhNCcg2ItZoERg1YGc3t7Kz48OzsLk3VVOCV00NvttopmIKz1lXqUoM1jCIR1+0GHM+fzHtJCBd3r9WzwhWDXOL0n5NqTs1Y89Ww2ixX08/Oz+WJy1ghdJ4HoTeuvlVBqm0GT2zX0BiM46FrhZkLW0J36By08sovGVKzjA+2uMQlrcecdHWgq1hGDdllo4bOWO3p9fY0J9MPDg8ebA5o16LYLLOgsyxxbw7Rr0PA0LGixunVvEI213P7JyUlMoH2F0nFYg7YPC/rz8xOIAgQLueV+vx8T6Lu7O48tQ9s1nObgoLvdrt/GQVnLbW42m6NYsJCwPsaVIb6/FiuUyECLByDCnNe7XccXVFKUXi6XUbCOHjTootkja9BABxTowWCAFgnywjrWPUNF9cvLy8BZtwQ0QijZhbVyYvfr6ysm0GJlRbsX1XgDHkg9ypSwQOxavnixWEQPGuiWdGTdhiRHEqOuxVo/p9US0FRJGpbprKAqYR+twDm+aWPXyp9Wq1XcoKkciJl1Cw8LCRkOh0GxHo/HLTz+Ruus9xbHwrzsIIcCmpZ1qV0X1o2jA2p1A32c2+2WkDVmuSXseh1UpTP0fr1nboQFusppwq0bS7vzmAcRLug9VgWei4uL0l7SNMUfMlnxqm63C4dbON/QCoVRlmObTCaGWVeDXKH1eh1sYUf6AoNXV1eWNRmn0+nb29tutxP/JXz609NTlXMIsHZmKLVJ4Upmos0g4wANgRs6ThQx6FzMZS/jKrIbNGhZsixTkhdiKRgdGejWCINm0AyahUEzaAbNCBg0g2Zh0C0BXZTOtbm43+9DHEEFFcPoHKMoh0Hr6SalQRz7EI+vN2CJX70HniIDbQ7xMOjmt5W7Hg1ayEHrn6dpavZXuekEClrupnSEgYDO340xmUyiBJ33IbSf/0mu6FySvY8XX7mD1ov3l6oROujGD0Mc0KvVqkinU0TZVj8IGmJDxwq0UrzCxnU0PuzXDLTyygb5siLHw951kIE2m1J+2psQdH7UbjQa6e3kP6/Xa3cfjbFgybKscM0G1yE/62tVQW9mPvL3rZQjM5tboKCr0n/kWW3VCRE00OYu4gB90HUU34SLxspDta4ayuKlqF0hLF1PO48V9P7vZV+OGruAllGKGV5pOST5Ai8PQ1jQcIksLqDFxE720QcVOF7Q+jzBZQmuzOr0kl9m0Dc3N35nRw1Be5+rFVUc3EGXJtvpcY8q0LUO6ccH2n4CrnyugNaTz6tOXMUB2q/r0K+0jzZUuY7S+ah8nOLoLNpwRNsFdFWYyQzaPtM3JtDFu191B+oXtKXrKKbbEKECGtchryyUEIR9pLB0keKiW63znRGALr2Ra/VS9Z25gC7iq0DBLxrXka/NvCxqPbqO0nuLEjQLaqyDhUEzaAbNCBg0g2Zh0AyaQbMw6DbJP0zQqPbAWqsMAAAAAElFTkSuQmCC';
          return base64
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
       *图片类型限制
       **/
      beforeLogoUpload(file) {
        let isImage = file.type.substring(0, 5) === 'image';
        if (!isImage) {
          this.$message.error('只允许图片格式（jpg / jpeg / png）');
          return false
        }
        return true
      },


    }
  }
</script>

<style scoped>
  /*公用*/
  .block {
    display: inline-block;
    vertical-align: middle;
  }

  .left-float {
    float: left;
  }

  .right-float {
    float: right;
  }

  .padding-about-5px {
    padding: 0 5px;
  }

  .padding-about-10px {
    padding: 0 10px;
  }

  .tips {
    font-size: 13px;
    color: #8b8b8b;
    line-height: 14px;
  }


  /*私有*/
  .input-width {
    width: 200px;
  }
  .long-input-width{
    width: 510px;
  }

  .ad-input-width {
    width: 360px;
  }

  .half-input-width {
    width: 120px;
  }

  .ad-add-box {
    text-align: center;
  }

  .equal-width {
    text-align: center;
    width: 80px !important;
  }


  /*级联选择*/
  .operatorRange-tips{
    margin-top: 5px;
    font-size: 14px;
    line-height: 15px;
    color: #3EBDFF;
  }
  .cascade-select {
    margin-top: 10px;
    width: 160px;
    height: 280px;
    display: inline-block;
    box-shadow: 3px 0px 15px #edeced;
  }

  .cascade-select-header {
    padding: 0 10px;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .hearer-user-classify {
    font-size: 13px;
    color: #8b8b8b;
    cursor: default;
  }

  .cascade-select-body {
    height: 250px;
    padding: 6px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .list-data-error {
    margin-top: 100px;
    text-align: center;
    height: auto;
    font-size: 12px;
    line-height: 14px;
    color: #d36e55;
  }

  /*图片上传*/
  .logo-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .logo-uploader:hover {
    border-color: #409EFF;
  }

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }

  .logo {
    width: 100px;
    height: auto;
    display: block;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .strategy-info {
    width: 100%;
  }

  .strategy-info tr {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #778399;
    vertical-align: top;
  }

  .strategy-info tr td:nth-child(1) {
    width: 100px;
    text-align: right;
  }

  .strategy-info tr td:nth-child(2) {
    padding-left: 10px;
  }


</style>
