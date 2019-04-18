/**
 * “区域”相关接口
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


}
