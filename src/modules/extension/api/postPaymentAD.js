import request from '@/utils/request'
import qs from 'qs'

/**
 * 投放
 */
// 获取广告列表
export function getPutInList(pageNumber, pageSize, form) {
  return request({
    url: '/advertise/on_management/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      onName: form.onName,
      status: form.status,
      appType: 1
    }
  })
}

//新建投放
export function savePutin(form) {
  return request({
    url: '/advertise/on_management/save_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//编辑投放
export function updatePutin(form) {
  return request({
    url: '/advertise/on_management/update_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//结束投放
export function overPutin(id) {
  return request({
    url: '/advertise/on_management/end',
    method: 'post',
    data: qs.stringify({
        id: id
      }
    )
  })
}

//开始投放
export function startPutin(id) {
  return request({
    url: '/advertise/on_management/run',
    method: 'post',
    data: qs.stringify({
        id: id
      }
    )
  })
}

//删除投放
export function deletePutin(id) {
  return request({
    url: '/advertise/on_management/delete_re',
    method: 'post',
    data: qs.stringify({
        id: id
      }
    )
  })
}

//获取投放详情
export function getPutInDetail(id) {
  return request({
    url: '/advertise/on_management/find_one',
    method: 'get',
    params: {
      id: id
    }
  })
}

//获取投放数据
export function getPutInAnalysis(id, s, e) {
  return request({
    url: '/advertise/on_management/analysis',
    method: 'get',
    params: {
      onId: id,
      time1: s,
      time2: e
    }
  })
}

/**
 * --------------------------------------广告----------------------------------
 */
// 获取广告列表
export function getAdvertiseList(pageNumber, pageSize, form) {
  return request({
    url: '/advertise/advertise_management/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      advertiseName: form.advertiseName || '',
      appType: 1
    }
  })
}

// 获取广告详情
export function getAdvertiseDetail(id) {
  return request({
    url: '/advertise/advertise_management/find_one',
    method: 'get',
    params: {
      id: id
    }
  })
}


// 删除广告
export function deleteAdvertise(id) {
  return request({
    url: '/advertise/advertise_management/delete_re',
    method: 'post',
    data: qs.stringify({
        id: id
      }
    )
  })
}

// 保存广告
export function saveEditAdvertise(form) {
  return request({
    url: '/advertise/advertise_management/update_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

// 编辑广告
export function saveAdvertise(form) {
  return request({
    url: '/advertise/advertise_management/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


/**
 * ----------------------------策略------------------------------
 */
// 获取代理商列表
export function getAgentList(id) {
  return request({
    url: '/advertise/strategic_management/find_parent_id',
    method: 'get',
    params: {
      parentId: id,
      pageSize: 100000
    }
  })
}

// 获取渠道商列表
export function getDistributeList(id) {
  return request({
    url: '/advertise/strategic_management/find_parent_id',
    method: 'get',
    params: {
      parentId: id,
      pageSize: 100000
    }
  })
}

// 提交策略
export function saveStrategic(form) {
  return request({
    url: '/advertise/strategic_management/save_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

// 修改策略
export function updateStrategic(form) {
  return request({
    url: '/advertise/strategic_management/update_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//获取策略列表
export function getStrategicList(pageNumber, pageSize, form) {
  return request({
    url: '/advertise/strategic_management/list_re',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      strategicName: form.strategicName || '',
      appType: 1
    }
  })
}

//获取策略详情
export function getStrategicDetail(id) {
  return request({
    url: '/advertise/strategic_management/find_one',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 删除策略
export function deleteStrategic(id) {
  return request({
    url: '/advertise/strategic_management/delete_re',
    method: 'post',
    data: qs.stringify({
        id: id
      }
    )
  })
}


//-------------------------------------------------------------

//获取策略详情
export function getExportData(id, s, e) {
  return request({
    url: '/advertise/on_management/export',
    method: 'get',
    responseType: 'blob',
    params: {
      onId: id,
      time1: s,
      time2: e
    }
  })
}
