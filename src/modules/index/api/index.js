import request from '@/utils/request'
import qs from 'qs'

/**
 *服务商和运营商渠道商基本
 */
export function getEssentialInformation() {
  return request({
    url: '/order/admin/admin_home_page_statistics/data_overview',
    method: 'get',
    params: {}
  })
}
//推广商
export function getDistributorEssentialInformation() {
  return request({
    url: '/order/admin/admin_home_page_statistics/data_overview_for_distributor',
    method: 'get',
    params: {}
  })
}

/**
 *服务商和运营商当日订单
 */
export function getStatisticsOrder(companyType, type) {
  return request({
    url: '/order/admin/admin_home_page_statistics/order_line_chart',
    method: 'get',
    params: {
      companyType: companyType,
      type: type
    }
  })
}

export function getNoticeTop5(companyType, type) {
  return request({
    url: '/admin/notice/findtop5',
    method: 'get',
    params: {
    }
  })
}
