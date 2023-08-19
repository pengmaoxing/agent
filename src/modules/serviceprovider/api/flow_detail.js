import request from '@/utils/request'

export function getFlowDetail(pageNumber, pageSize, param) {
  return request({
    url: '/order/admin/flow/getFlowDetail',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: param.companyId,
      payChannelId: param.payChannelId,
      payWayId: param.payWayId,
      begin: param.begin,
      end: param.end
    }
  })
}
