import request from '@/utils/request'
import qs from 'qs'

/**
 *下级申请列表
 */
export function getWithdrawApplyList(pageNum, pageSize, parentCompanyId) {
  return request({
    url: '/auth/commission_withdraw_apply/list',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      parentCompanyId: parentCompanyId
    }
  })
}

/**
 * 审核
 */
export function checkApply(form) {
  return request({
    url: '/auth/commission_withdraw_apply/audit',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
