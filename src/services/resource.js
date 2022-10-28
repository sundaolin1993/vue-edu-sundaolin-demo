import request from './request'

// 资源接口
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
export const getCategoryAll = resourceId => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
