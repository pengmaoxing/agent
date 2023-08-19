import request from '@/utils/request'
import qs from 'qs'

//保存别名
export function newWebsite(domain) {
  return request({
    url: '/auth/user/new_website',
    method: 'post',
    data: qs.stringify({
      domain
    })
  })
}
