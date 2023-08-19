import request from '@/utils/request'
import qs from 'qs'

//点击详情获取运营商列表
export function getOperatorList (pageNumber, pageSize, managerId) {
  return request({
    url: '/auth/company/opera/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      managerId: managerId,
    }
  })
}

//点击详情获取渠道商列表
export function getDistributeList (pageNumber, pageSize, managerId) {
  return request({
    url: '/auth/company/distribute/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      managerId: managerId,
    }
  })
}

//点击详情获取商户列表
export function getMerchantList (pageNumber, pageSize, managerId) {
  return request({
    url: '/merchant/merchant/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      managerId: managerId,
    }
  })
}

//获取商户详情
export function getManagerDetail (id) {
  return request({
    url: '/auth/user/detail',
    method: 'get',
    params: {
      id: id,
    }
  })
}

//重置密码
export function resetPassword (id, password) {
  return request({
    url: '/auth/user/reset_password',
    method: 'post',
    params: {
      id: id,
      password: password,
    }
  })
}
