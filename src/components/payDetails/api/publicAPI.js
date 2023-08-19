import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取商户基本信息
 * @param merchantId 商户id
 */

//拉取已进件资料
export function getInfo(id, pc) {
  return request({
    url: '/merchant/third_mch_info/detail',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}//拉取惠闪付已进件资料
export function gethsfInfo(id, pc) {
  return request({
    url: '/merchant/hsf_mch_info/pull_plat_info',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}
