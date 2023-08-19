import request from '@/utils/request'
import qs from 'qs'

/**
 *结算账户类型
 */
export function getWithdrawWay() {
  return request({
    url: '/config/admin/config_enum/withdrawWay',
    method: 'get',
    params: {}
  })
}

/**
 * 获取账户列表
 */

export function getAccountList(pageNum, pageSize,cid, form) {
  return request({
    url: '/auth/company_account/list',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      companyId: cid,
      withdrawWay: form.withdrawWay || '',
      name: form.name || ''
    }
  })
}

/**
 * 保存
 * @param pageNum
 * @param pageSize
 */
export function saveAccount(form) {
  return request({
    url: '/auth/company_account/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

/**
 * 修改
 */
export function updateAccount(form) {
  return request({
    url: '/auth/company_account/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

/**
 * 删除
 */
export function deleteAccount(ids) {
  return request({
    url: '/auth/company_account/logical_del',
    method: 'post',
    data: qs.stringify({
      ids: ids
    })
  })
}

/**
 * 查看提现明细
 * @param pageNum
 * @param pageSize
 * @param companyId
 */
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

