import request from '@/utils/request'
import qs from 'qs'

//获取历史推荐列表
export function getList(pageNumber, pageSize, form) {
  return request({
    url: '/auth/company/retail/referrals_list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: form.name,
      contact: form.contact,
      status: form.status
    }
  })
}

