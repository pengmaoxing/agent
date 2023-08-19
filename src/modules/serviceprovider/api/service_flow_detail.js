import request from '@/utils/request'

export function detailById(number, pageSize, form) {
  return request({
    url: '/export/admin/detail_by_id',
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
