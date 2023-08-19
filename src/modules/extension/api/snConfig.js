import request from '@/utils/request'
import qs from 'qs'

// 获取SN
export function getSnConfig(pageNumber, pageSize, form) {
  return request({
    url: '/merchant/sn_config/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      merchantId: form.merchantId,
      sn: form.sn
    }
  })
}

// 添加SN
export function addSnConfig(snConfig) {
  return request({
    url: '/merchant/sn_config/save_rewrite',
    method: 'post',
    data: qs.stringify(
      snConfig
    )
  })
}

// 删除SN
export function deleteSnConfig(ids) {
  return request({
    url: '/merchant/sn_config/delete',
    method: 'post',
    data: qs.stringify({
      ids
    }, {indices: false})
  })
}


//修改SN
export function updateSnConfig(snConfig) {
  return request({
    url: '/merchant/sn_config/update_rewrite',
    method: 'post',
    data: qs.stringify(
      snConfig
    )
  })
}

//获取商户selectItem
export function mchSelectItem() {
  return request({
    url: '/merchant/merchant/mch/select_item',
    method: 'get',
  })
}
