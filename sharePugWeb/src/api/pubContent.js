/**
 * 个人信息页面相关接口
 */
import request from '@/utils/request'

export default {

  /**
    一级
   */
    queryAllListNoPageTwo() {
      return request({
        url: '/sys/area/queryAllListNoPageTwo',
        method: 'post'
      })
    },
    queryAllListNoPageThree(queryParam) {
    return request({
      url: '/sys/area/queryAllListNoPageThree',
      method: 'post',
      data: {
        ...queryParam
      }
    })
  },



// /**
//  * 获取信息
//  */
//
//   getUserInfo(data) {
//     return request({
//       url: 'webservice/personInfoWebService/queryUserInfo',
//       method: 'post',
//       data
//     })
//   },
//
//   /**
//    * 更新个人信息
//    */
//
//     updateUserInfo(data) {
//       return request({
//         url: 'webservice/personInfoWebService/updateUserInfo',
//         method: 'post',
//         data
//       })
//     },
//
// // 修改密码
//     updatePassword(data) {
//       return request({
//         url: 'webservice/personInfoWebService/updatePsw',
//         method: 'post',
//         data
//       })
//     }





}
