import request from '@/utils/request'
import qs from 'qs'

//获取渠道商列表
export function getDistributeList(pageNumber, pageSize, searchData) {
  return request({
    url: '/auth/company/distribute/list_rewrite',
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


//提交审核或审核
export function audit(id, status) {
  return request({
    url: '/auth/company/distribute/audit',
    method: 'post',
    params: {
      id: id,
      status: status,
    }
  })
}


//删除渠道商
export function deleteDistribute(id) {
  return request({
    url: '/auth/company/distribute/logical_del',
    method: 'post',
    params: {
      ids: id
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
//获取通道动态表单
export function getPayComposeConfig() {
  return request({
    url: '/pay/pay_compose/find_config_by_pay_way',
    method: 'get',
    params: {

    }
  })
}