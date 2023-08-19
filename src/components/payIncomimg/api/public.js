import request from '@/utils/request'
import qs from 'qs'


//提交进件变动信息
export function saveRrecord(id, record, payChannel) {
  return request({
    url: '/merchant/third_info_apply_record/save_record',
    method: 'POST',
    data: qs.stringify({
      merchantId: id,
      interestRateInfo: record,
      payChannel: payChannel
    })
  })
}


//提交审核信息
export function checkVerify(pc, id, reason, fee, applyId) {
  return request({
    url: '/merchant/third_mch_info/audit',
    method: 'POST',
    data: qs.stringify({
      payChannel: pc,
      merchantId: id,
      reason: reason,
      status: 3, //3签约成功
      feeRateConfigDTOSJson: fee||'',
      applyId: applyId||''
    })
  })
}
