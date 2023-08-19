import request from '@/utils/request'
import qs from 'qs'

//获取服务商列表
export function getProviderList(pageNumber, pageSize, searchData) {
  console.log(searchData)
  return request({
    url: '/auth/company/service_provider/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: searchData.name || '',
      contact: searchData.contact || '',
      status: searchData.status || '',
    }
  })
}

//添加服务商
export function providerAdd(data) {
  return request({
    url: '/auth/company/service_provider/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改服务商
export function providerUpdate(data) {
  return request({
    url: '/auth/company/service_provider/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//提交审核或审核
export function updateStatus(id, status) {
  return request({
    url: '/auth/company/service_provider/update_status',
    method: 'post',
    params: {
      id: id,
      status: status,
    }
  })
}


//重置密码
export function resetPassword(id, password) {
  return request({
    url: '/auth/user/reset_password',
    method: 'post',
    params: {
      id: id,
      password: password,
    }
  })
}

//获取详情
export function findDetail(id) {
  return request({
    url: '/auth/company/site_info/detail',
    method: 'get',
    params: {
      serviceProviderId: id
    }
  })
}

//录入获取详情
export function findEntryDetail(id) {
  return request({
    url: '/auth/company/site_info/entry',
    method: 'get',
    params: {
      serviceProviderId: id
    }
  })
}

//提交录入详情
export function submitDetail(data) {
  return request({
    url: '/auth/company/site_info/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//获取新增服务商模式
export function findServiceAgentWay() {
  return request({
    url: '/auth/company/service_provider/get_agent_way/release',
    method: 'get',
    params: {}
  })
}


//支付方式下拉
export function findPayWay() {
  return request({
    url: '/config/admin/config_enum/PayWayEnum',
    method: 'get',
    params: {}
  })
}

//支付通道下拉
export function findPayChannel() {
  return request({
    url: '/config/admin/config_enum/PayChannelEnum',
    method: 'get',
    params: {}
  })
}

//所有公司下拉
export function findCompany() {
  return request({
    url: '/export/admin/company_select_item',
    method: 'get',
    params: {}
  })
}

//下载明细
export function downloadDetail(form) {
  return request({
    url: '/export/admin/merchant_detail',
    method: 'get',
    responseType: 'blob',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId || -1,
      payChannel: form.payChannelId || -1,
      payWay: form.payWayId || -1,
    }
  })
}

//下载汇总
export function downloadCollect(form) {
  return request({
    url: '/export/admin/merchant_collect',
    method: 'get',
    responseType: 'blob',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId || -1,
      payChannel: form.payChannelId || -1,
      payWay: form.payWayId || -1,
    }
  })
}

//信汇下载汇总
export function downloadXinhuiCollect(form) {
  return request({
    url: '/export/admin/cmf_excel',
    method: 'get',
    responseType: 'blob',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId,
    }
  })
}


//获取服务商下拉
//获取服务商下拉列表
export function getProviderItem() {
  return request({
    url: '/auth/agent_alias/provider_select_item',
    method: 'get',
    params: {}
  })
}
