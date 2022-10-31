import request from './request'

// 分页查询课程信息
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架
export const changeState = data => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
  })
}

// 上传图片
export const uploadImage = (data, onUploadProgress) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress,
    timeout: 1000 * 60 * 5
  })
}

// 保存或更改课程信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 通过课程Id获取课程信息
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
