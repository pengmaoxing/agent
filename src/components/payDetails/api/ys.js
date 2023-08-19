import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取商户基本信息
 * @param merchantId 商户id
 */

//拉取已进件资料
export function getInfo(id, pc) {
  return request({
    url: '/merchant/ys_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}
