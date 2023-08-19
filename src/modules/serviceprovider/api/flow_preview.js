import request from '@/utils/request'

export function getFlow(param) {
  return request({
    url: '/order/admin/flow/sum_total',
    method: 'get',
    params: {
      companyId: param.companyId,
      payChannelId: param.payChannelId,
      payWayId: param.payWayId,
      begin: param.begin,
      end: param.end
    }
  })
}
export function getFlowList(pageNumber, pageSize, param) {
  return request({
    url: '/order/admin/flow/getFlowList',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: param.companyId,
      payChannelId: param.payChannelId,
      payWayId: param.payWayId,
      begin: param.begin,
      end: param.end,
      name: param.name
    }
  })
}

export function getServiceFlowList(pageNumber, pageSize, param) {
  return request({
    url: '/order/admin/flow/getServiceFlow',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      payChannelId: param.payChannelId,
      payWayId: param.payWayId,
      begin: param.begin,
      end: param.end,
      name:param.name
    }
  })
}

//下载明细
export function downloadFlowExcel(form, type) {
  return request({
    url: '/export/admin/merchant_flow_excel',
    method: 'get',
    responseType: 'blob',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId || -1,
      payChannel: form.payChannelId || -1,
      payWay: form.payWayId || -1,
      type:type
    }
  })
}

export function getFlowDetail(pageNumber, pageSize, param) {
  return request({
    url: '/order/admin/flow/getFlowDetail',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      /*companyId: param.companyId,
      payChannelId: param.payChannelId,
      payWayId: param.payWayId,*/
      begin: param.begin,
      end: param.end,
      orderNumber: param.name
    }
  })
}
