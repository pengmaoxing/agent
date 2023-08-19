import request from '@/utils/request'
import qs from 'qs'

//获取商户列表
export function getMerchantList(pageNumber, pageSize, searchData) {
  return request({
    url: '/merchant/merchant/find_by_company_id',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: searchData.name,
      contact: searchData.contact,
    customerPhone: searchData.customerPhone,
    companyName: searchData.companyName
    }
  })
}


// 获取商户详情
export function getMerchantDetail(merchantId) {
  return request({
    url: '/merchant/merchant/find_one',
    method: 'get',
    params: {
      merchantId: merchantId,
    }
  })
}

//添加商户
export function addMerchant(data) {
  return request({
    url: '/merchant/merchant/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改商户
export function editMerchant(data) {
  return request({
    url: '/merchant/merchant/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//重置密码
export function resetPwd(username) {
  return request({
    url: '/merchant/merchant/default/reset_password',
    method: 'post',
    params: {
      username: username,
    }
  })
}
