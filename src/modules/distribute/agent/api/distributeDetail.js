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
    url: '/auth/company/distribute/detail',
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
