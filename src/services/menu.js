import request from './request'
// 菜单接口功能

export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}
export const saveOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}
export const getAll = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
