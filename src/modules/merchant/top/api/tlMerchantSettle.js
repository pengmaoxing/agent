import request from '@/utils/request'

//获取进件记录
export function getRecordList( form) {
  return request({
    url: '/merchant/tl_mch_info/find_merchant_settel',
    method: 'get',
    params: {
      settdate: form.settdate,
      cusid: form.cusid
    }
  })
}
