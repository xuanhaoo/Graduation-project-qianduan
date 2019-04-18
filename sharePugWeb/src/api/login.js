/**
 * 前端登录相关接口
 */
import request from '@/utils/request'

export default {

  login(data) {
    return request({
      url: 'webservice/loginWebService/login',
      method: 'post',
      data
    })
  },

  logout() {
    return request({
      url: 'webservice/loginWebService/logout',
      method: 'get'
    })
  },

  // getUserInfo(token) {
  //   return request({
  //     url: '/auth/info',
  //     method: 'get',
  //     params: { token }
  //   })
  // },

/**
 * 注册
 */
  register(data) {
    return request({
      url: 'webservice/loginWebService/register',
      method: 'post',
      data
    })
  },

  getUserInfo(data) {
    return request({
      url: 'webservice/loginWebService/queryUserInfo',
      method: 'post',
      data
    })
  }

}
