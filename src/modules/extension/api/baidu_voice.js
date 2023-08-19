import request from '@/utils/request'
import qs from 'qs'

// 获取百度语音
export function getBaiduVoice (pageNumber, pageSize) {
  return request({
    url: '/auth/baidu_voice/get_info',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
  })
}

// 添加百度语音
export function addBaiduVoice (baiduVoice) {
  return request({
    url: '/auth/baidu_voice/save',
    method: 'post',
    data: qs.stringify(
      baiduVoice
    )
  })
}

// 删除百度语音
export function deleteBaiduVoice (ids) {
  return request({
    url: '/auth/baidu_voice/logical_del',
    method: 'post',
    data: qs.stringify({
      ids
    }, {indices: false})
  })
}


//修改百度语音
export function  updateBaiduVoice (baiduVoice) {
  return request({
    url: '/auth/baidu_voice/update',
    method: 'post',
    data: qs.stringify(
      baiduVoice
    )
  })
}


