import request from '@/utils/request'

/**
 * 获取商户基本信息
 * @param merchantId 商户id
 */

export function getInfo(id) {
  return request({
    url: '/merchant/xls_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}
