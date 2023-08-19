import request from '@/utils/request'
import qs from 'qs'

//获取简报数据
export function getPreviewData() {
  return request({
    url: '/auth/team/team_data',
    method: 'get',
    params: {
    }
  })
}
