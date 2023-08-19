import request from '@/utils/request'
import qs from 'qs'
// 获取短信模板列表
export function getSmsMessage (pageNumber, pageSize) {
  return request({
    url: '/auth/sms_message/get_info',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}

// 编辑短信模板
export function editSmsMessage (smsInfo) {
  return request({
    url: '/auth/sms_message/update',
    method: 'post',
    data: qs.stringify(
      smsInfo
    )
  })
}

// 添加短信模板列表
export function addSmsMessage (smsInfo) {
  return request({
    url: '/auth/sms_message/save',
    method: 'post',
    data: qs.stringify(
      smsInfo
    )
  })
}

// 删除百度语音
export function delSmsMessage (ids) {
  return request({
    url: '/auth/sms_message/logical_del',
    method: 'post',
    data: qs.stringify({
      ids
    }, {indices: false})
  })
}
