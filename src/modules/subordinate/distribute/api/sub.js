import request from '@/utils/request'
import qs from 'qs'


//获取推广商列表
export function getSubList(pageNumber, pageSize, searchData) {
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


//添加推广商
export function subAdd(data) {
  return request({
    url: '/auth/company/promote/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改推广商
export function subUpdate(data) {
  return request({
    url: '/auth/company/promote/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//删除推广商
export function delSub(id) {
  return request({
    url: '/auth/company/promote/logical_del',
    method: 'post',
    params: {
      ids: id
    }
  })
}


//设置奖励
export function setReward(data) {
  return request({
    url: '/auth/company/promote/set_reward',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//提交审核或审核
export function audit(id, status) {
  return request({
    url: '/auth/company/promote/audit',
    method: 'post',
    params: {
      id: id,
      status: status,
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

//获取模式
export function getCommissionModel() {
  return request({
    url: '/config/admin/config_enum/CommissionModel',
    method: 'get',
    params: {

    }
  })
}
