import request from '@/utils/request'
import qs from 'qs'

//获取运营商列表
export function getOperatorList(pageNumber, pageSize, searchData) {
  return request({
    url: '/auth/company/opera/list',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      name: searchData.name,
      contact: searchData.contact,
      status: searchData.status,
      parentId: sessionStorage.getItem('companyId')
    }
  })
}

//添加运营商
export function operaAdd(data) {
  return request({
    url: '/auth/company/opera/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改运营商
export function operaUpdate(data) {
  return request({
    url: '/auth/company/opera/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//删除运营商
export function delOperator(id) {
  return request({
    url: '/auth/company/opera/logical_del',
    method: 'post',
    params: {
      ids: id
    }
  })
}

//提交审核或审核
export function audit(id, status) {
  return request({
    url: '/auth/company/opera/audit',
    method: 'post',
    params: {
      id: id,
      status: status,
    }
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
//获取模式
export function getCommissionModel() {
  return request({
    url: '/config/admin/config_enum/CommissionModel',
    method: 'get',
    params: {

    }
  })
}

