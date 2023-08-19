import request from '@/utils/request'

export function collectById(number, pageSize, form) {
  return request({
    url: '/export/admin/collect_by_id',
    method: 'get',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId,
      payChannel: form.payChannel || 0,
      payWay: form.payWay || 0,
      pageNumber:number,
      pageSize:pageSize,
      name:form.name
    }
  })
}
