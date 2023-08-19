import request from '@/utils/request'
import qs from 'qs'

//获取选项
export function getConfigEnum() {
  return request({
    url: '/base_data/admin/find_pay_config_enum',
    method: 'get',
    params: {}
  })
}


//获取列表
export function getConfigList(pageNumber, pageSize, searchData) {
  return request({
    url: '/pay/pay_compose/list',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      pageSort:'orderValue',
      pageOrder:'asc',
      name: searchData.name,
      payChannel: searchData.payChannel,
      payWay: searchData.payWay,
      payType: searchData.payType,
    }
  })
}

//提交新建
export function saveNewConfig(form) {
  return request({
    url: '/pay/pay_compose/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//提交修改
export function modifyConfig(form) {
  return request({
    url: '/pay/pay_compose/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
