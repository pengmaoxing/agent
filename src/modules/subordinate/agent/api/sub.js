import request from '@/utils/request'
import qs from 'qs'

//获取推广商列表
export function getDistributeList(pageNumber, pageSize, searchData) {
  return request({
    url: '/auth/company/promote/list_rewrite',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      name: searchData.name,
      contact: searchData.contact,
      status: searchData.status,
    }
  })
}
export function getPayComposeConfig() {
  return request({
    url: '/pay/pay_compose/find_config_by_pay_way',
    method: 'get',
    params: {

    }
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

//获取分佣模式
export function getComModel() {
  return request({
    url: '/config/admin/find_commission_model',
    method: 'get',
    params: {}
  })
}


