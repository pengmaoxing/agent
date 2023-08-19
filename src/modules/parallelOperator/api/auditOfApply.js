import request from '@/utils/request'
import qs from 'qs'




//提交、审核或驳回（暂无驳回）
export function audit(id, status) {
  return request({
    url: '/auth/company/retail/audit',
    method: 'post',
    params: {
      id: id,
      status: status,
    }
  })
}


