import request from '@/utils/request'
import qs from 'qs'

// 获取业务员列表  / 搜索业务员列表
export function getManager (pageNumber, pageSize, queryList) {
  return request({
    url: '/auth/user/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: queryList.name,
      phone: queryList.phone,
      status: queryList.status,
      companyId: sessionStorage.getItem('companyId')
    }
  })
}

// 修改密码
export function updatePwd (oldPassword, newPassword) {
  return request({
    url: '/auth/user/modify_password',
    method: 'post',
    params: {
      password: oldPassword,
      newPassword: newPassword,
    }
  })
}



// 重置密码
export function resetPassword (id, password) {
  return request({
    url: '/auth/user/reset_password',
    method: 'post',
    data: qs.stringify({
      id,
      password
    })
  })
}

//添加业务员
export function managerAdd (managerInfo) {
  return request({
    url: '/auth/user/save_user',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}

//修改业务员
export function managerUpdate (managerInfo) {
  return request({
    url: '/auth/user/update_user',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}

//转移业务员
export function managerTransfer (id) {
  return request({
    url: '/auth/user/manager_info',
    method: 'get',
    params: {
      userId: id
    }
  })
}

//确认转移
export function saveTransfer (operaIds, distributeIds, merchantIds, managerId) {
  return request({
    url: '/auth/user/update_manager_relation',
    method: 'post',
    data: qs.stringify({
      operaIds,
      distributeIds,
      merchantIds,
      managerId
    }, {indices: false})
    // headers: {
    //   'Content-type': 'application/json; charset=utf-8'
    // }
  })
}

//禁用或启用
export function disableOrEnable (id, status) {
  return request({
    url: '/auth/user/disable_or_enable',
    method: 'post',
    params: {
      id: id,
      status: status,
    }
  })
}

//注销用户
export function cancle (id) {
  return request({
    url: '/auth/user/cancle',
    method: 'post',
    params: {
      id: id,
    }
  })
}





export function selectItemByTypeAndKind () {
  return request({
    url: '/auth/role/find_by_type_and_kind/select_item',
    method: 'get',
    params: {
      companyId: sessionStorage.getItem('companyId'),
      kind: 1,
    }
  })
}
