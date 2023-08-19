import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取商户基本信息
 * @param merchantId 商户id
 */
/* 张昊天修改 2019.8.20~ */

//查询进件详情信息-富友
export function getFyIncomingInfo(id) {
  return request({
    url: '/merchant/fuiou_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}