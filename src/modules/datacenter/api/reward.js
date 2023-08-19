import request from '@/utils/request'
import qs from 'qs'

/**
 *获取奖励金记录
 */
export function rewardList(pageNumber, pageSize, form) {
  return request({
    url: '/auth/reward/record_list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      contact: form.contact,
      name: form.name,
    }
  })
}

/**
 *获取奖励金设置回显
 */
export function rewardFindReview() {
  return request({
    url: '/auth/reward/find_rule',
    method: 'get',
    params: {}
  })
}

/**
 *审核与驳回
 */
export function auditReward(id, result, reason) {
  return request({
    url: '/auth/reward/audit',
    method: 'post',
    data: qs.stringify({
      id: id, //id
      result: result, //状态
      reason: reason  //理由记录
    })
  })
}

/**
 *奖励金保存
 */
export function rewardSave(form) {
  return request({
    url: '/auth/reward/save_rule',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}



