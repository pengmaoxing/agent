import request from '@/utils/request'
import qs from 'qs'


//回显费率
export function findPayChannelConfig(merchantId,payChannel) {
  return request({
    url: '/pay/merchant_pay_compose_config/find_merchant_pay_channel_config',
    method: 'get',
    params: {
      merchantId: merchantId,
      payChannel: payChannel,
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

//获取驳回信息
export function getRejectMsg(pid, mid) {
  return request({
    url: '/merchant/third_mch_info/show_reason',
    method: 'get',
    params: {
      payChannel: pid,
      merchantId: mid,
    }
  })
}

//提交状态
export function submitAudit(form) {
  return request({
    url: '/merchant/third_mch_info/audit',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//提交进件变动文件
export function saveUpdateFile(id, path, channel) {
  return request({
    url: '/merchant/third_info_update_record/save_info',
    method: 'POST',
    data: qs.stringify({
      merchantId: id,
      path: path,
      payChannel: channel
    })
  })
}


// /merchant/third_info_update_record/save_info

