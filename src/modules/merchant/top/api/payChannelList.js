import request from '@/utils/request'
import qs from 'qs'


//回显费率
export function findPayChannelConfig(merchantId, payChannel) {
  return request({
    url: '/pay/merchant_pay_compose_config/find_merchant_pay_channel_config',
    method: 'get',
    params: {
      merchantId: merchantId,
      payChannel: payChannel,
    }
  })
}

// 支付宝获取授权二维码
export function getAliAuthUrl(merchantId) {
  return request({
    url: '/pay/pay_config/get_ali_auth_url',
    method: 'get',
    params: {
      merchantId: merchantId,
    }
  })
}

//获取商户支付通道
export function getMerchantChannelList(id) {
  return request({
    url: '/pay/merchant_pay_compose_config/merchant_pay_channel_list',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}

//获取商户支付通道配置
export function getMerchantChannelChoice(id) {
  return request({
    url: '/pay/merchant_pay_compose_config/merchant_pay_config_choice',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}

//保存商户支付通道配置
export function saveMerchantChannelChoice(id, ids) {
  return request({
    url: '/pay/merchant_pay_compose_config/save_merchant_enable_config',
    method: 'post',
    data: qs.stringify({
      merchantId: id,
      merchantPayConfigDTOsStr: ids
    }, {indices: false})
  })
}


//获取商户支付通道配置
export function getMerchantChannelConfigFee(id, mid) {
  return request({
    url: '/pay/pay_compose/find_pay_config_form',
    method: 'get',
    params: {
      payChannel: id,
      merchantId: mid
    }
  })
}


// 提交处理
export function submitAudit(form) {
  return request({
    url: '/merchant/third_mch_info/audit',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//保存费率

export function savePayConfigFee(feeForm, conForm, pcId, mid) {
  return request({
    url: '/pay/merchant_pay_compose_config/save_config',
    method: 'post',
    data: qs.stringify({
      feeRateConfigDTOSJson: feeForm,
      configJson: conForm,
      payChannel: pcId,
      merchantId: mid
    })
  })
}

//获取富友微信配置
export function getFuiouWxConfig(mid) {
  return request({
    url: '/pay/fuiou_wx_config/find_by_merchant',
    method: 'get',
    params: {
      merchantId: mid
    }
  })
}

//提交富友微信配置
export function setFuiouWxConfig(id) {
  return request({
    url: '/merchant/fuiou_mch_info/fuiou_wx_config',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

//删除富友微信配置
export function delFuiouWxConfig(id) {
  return request({
    url: '/pay/fuiou_wx_config/delete_rewrite',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}


//保存富友配置
export function saveFuiouWxConfig(form) {
  return request({
    url: '/pay/fuiou_wx_config/save_rewrite',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//保存富友预授权配置
export function saveFuiouPreConfig(form) {
  return request({
    url: '/merchant/fuiou_mch_info/fuiou_add_scan',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//查询富友预授权配置
export function findFuiouPreConfig(mid) {
  return request({
    url: '/merchant/fuiou_mch_info/fuiou_find_scan',
    method: 'get',
    params: {
      merchantId: mid
    }
  })
}

//查询乐刷费率
export function findLsFeeConfig(id) {
  return request({
    url: '/merchant/ls_mch_info/find_rate',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//提交乐刷费率配置
export function setLsFeeConfig(form) {
  return request({
    url: '/merchant/ls_mch_info/open_rate',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//查找授权目录
export function findLsPayConfig(id) {
  return request({
    url: '/merchant/ls_mch_info/find_pay',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//配置授权目录
export function setLsPayConfig(form) {
  return request({
    url: '/merchant/ls_mch_info/pay_config',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//开通合利宝
export function setHlbPayConfig(form, jsonFeeRangeForm) {
  return request({
    url: '/merchant/hlb_mch_info/open_product',
    method: 'post',
    data: qs.stringify({
        hlbPayConfigJson: form,
        feeRange: jsonFeeRangeForm
      }
    )
  })
}

//开通合利宝 结算
export function setHlbAccountConfig(form) {
  return request({
    url: '/merchant/hlb_mch_info/open_account',
    method: 'post',
    data: qs.stringify({
        merchantId: form.merchantId,
        calcType: form.calcType,
        settlementPeriod: form.settlementPeriod,
        value: form.value,
        floating: form.floating,
        minFee: form.minFee,
      }
    )
  })
}

//回显合利宝结算产品费率
export function checkHlbAccountConfig(form) {
  return request({
    url: '/merchant/hlb_mch_info/check_account_product',
    method: 'get',
    params: {
      merchantId: form.merchantId,
      calcType: form.calcType,
      settlementPeriod: form.settlementPeriod
    }
  })
}

//回显合利宝
export function checkHlbPayConfig(form) {
  return request({
    url: '/merchant/hlb_mch_info/check_product',
    method: 'get',
    params: {
      hlbPayConfigJson: form,
    }
  })
}

//回显合利宝授权目录
export function findHlbWxPub(id) {
  return request({
    url: '/merchant/hlb_mch_info/find_wx_auth',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}


//保存合利宝第一次授权目录
export function savetHlbPayConfig(form) {
  return request({
    url: '/merchant/hlb_mch_info/wx_apply',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//添加单个授权目录
export function addtHlbPayConfigAuthDir(form) {
  return request({
    url: '/merchant/hlb_mch_info/add_pay_dir',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//合利宝授权目录配置状态
export function checkHlbAuthStatus(id) {
  return request({
    url: '/merchant/hlb_mch_info/wx_pub_query',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//查询乐刷费率
export function findXlsFeeConfig(id) {
    return request({
      url: '/merchant/xls_mch_info/find_rate',
      method: 'get',
      params: {
        merchantId: id
      }
    })
  }

//提交乐刷费率配置
export function setXlsFeeConfig(form) {
    return request({
      url: '/merchant/xls_mch_info/open_rate',
      method: 'post',
      data: qs.stringify(
        form
      )
    })
  }

//提交乐刷费率配置
export function xlsSignConfig(id) {
  return request({
    url: '/merchant/xls_mch_info/signing',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}

export function xlsOpenjs(id) {
  return request({
    url: '/merchant/xls_mch_info/open',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}


export function xlsOpenQueryjs(id) {
  return request({
    url: '/merchant/xls_mch_info/openquery',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}


//查找授权目录
export function findXlsPayConfig(id) {
    return request({
      url: '/merchant/xls_mch_info/find_pay',
      method: 'get',
      params: {
        merchantId: id
      }
    })
  }

//配置授权目录
export function setXlsPayConfig(form) {
    return request({
      url: '/merchant/xls_mch_info/pay_config',
      method: 'post',
      data: qs.stringify(
        form
      )
    })
}


//cmf
export function searchmerchantwxappmsg(id) {
  return request({
    url: '/merchant/ryx_mch_info/searchmerchantwxappmsg',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}


export function setmerchantwxappmsg(form) {
  return request({
    url: '/merchant/ryx_mch_info/setmerchantwxappmsg',
    method: 'post',
    params: form
  })
}
export function xhsearchmerchantwxappmsg(id) {
  return request({
    url: '/merchant/cmf_mch_info/searchmerchantwxappmsg',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}


export function xhsetmerchantwxappmsg(form) {
  return request({
    url: '/merchant/cmf_mch_info/setmerchantwxappmsg',
    method: 'post',
    params: form
  })
}export function hksearchmerchantwxappmsg(id) {
  return request({
    url: '/merchant/hk_mch_info/searchmerchantwxappmsg',
    method: 'post',
    params: {
      merchantId: id
    }
  })
}
export function xryxSetpath(id, path,subAppid,subscribeAppid) {
  return request({
    url: '/merchant/xryx_mch_info/set_path',
    method: 'get',
    params: {
      path: path,
      merchantId: id,
      subAppid: subAppid,
      subscribeAppid: subscribeAppid
    }
  })
}

export function hksetmerchantwxappmsg(form) {
  return request({
    url: '/merchant/hk_mch_info/setmerchantwxappmsg',
    method: 'post',
    params: form
  })
}
