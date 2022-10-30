import request from './request'

// 按条件查询角色
export const getRolePages = data => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 保存或者更新角色
export const saveOrUpdateRole = data => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
// 删除角色
export const deleteRole = id => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
// 获取单个角色信息
export const getRole = id => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 给用户分配角色
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
// 查询用户角色
export const getRolesByUserId = userId => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
