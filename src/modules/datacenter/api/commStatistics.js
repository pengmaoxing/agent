import request from '@/utils/request'
import qs from 'qs'

/**
 *统计与列表
 */
export function getCommissionChildrenList(pageNum, pageSize,name) {
  return request({
    url: '/order/commission/children_commission_list',
    method: 'get',
    params: {
      pageNumber: pageNum,
      pageSize: pageSize,
      companyName: name,
    }
  })
}


export function getWithdrawApplyList(pageNum, pageSize, companyId) {
  return request({
    url: '/auth/commission_withdraw_apply/list',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      companyId: companyId
    }
  })
}
