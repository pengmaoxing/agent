import request from '@/utils/request'
import qs from 'qs'



//点击详情获取业务员列表
export function findUsersByCompanyId(pageNumber, pageSize, id) {
  return request({
    url: '/auth/user/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: id,
    }
  })
}

//点击详情获取渠道商列表
export function getDistributeList(pageNumber, pageSize, parentId) {
  return request({
    url: '/auth/company/distribute/find_by_parent_id',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      parentId: parentId,
    }
  })
}

//点击详情获取商户列表
export function getMerchantListByCompanyId(pageNumber, pageSize, companyId) {
  return request({
    url: '/merchant/merchant/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: companyId,
    }
  })
}


//获取运营商详情
export function getOperRaDetail(id) {
  return request({
    url: '/auth/company/opera/detail',
    method: 'get',
    params: {
      id: id,
    }
  })
}

//重置密码
export function resetPassword(id, password) {
  return request({
    url: '/auth/user/reset_password',
    method: 'post',
    params: {
      id: id,
      password: password,
    }
  })
}
//底道模式
export function getPayComposeConfig() {
  return request({
    url: '/pay/pay_compose/find_config_by_pay_way',
    method: 'get',
    params: {

    }
  })
}
//获取分佣模式
export function getComModel() {
  return request({
    url: '/config/admin/find_commission_model',
    method: 'get',
    params: {}
  })
}
//获取模式
export function getCommissionModel() {
  return request({
    url: '/config/admin/config_enum/CommissionModel',
    method: 'get',
    params: {

    }
  })
}