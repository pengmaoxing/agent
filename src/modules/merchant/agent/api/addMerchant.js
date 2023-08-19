import request from '@/utils/request'
import qs from 'qs'

//添加商户
export function addMerchant(data) {
  return request({
    url: '/merchant/merchant/mcht_and_into/save',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//获取商户
export function getMerchant(id) {
  return request({
    url: '/merchant/merchant/mcht_and_into/detail',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}



//编辑商户
export function updateMerchant(data) {
  return request({
    url: '/merchant/merchant/mcht_and_into/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}




