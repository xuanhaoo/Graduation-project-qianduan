/**
 * “景点管理”相关接口
 */
import request from '@/utils/request'

export default {

  /**
   * 查询景点信息
   * @param queryParam
   * @param pageParam
   */
  query(queryParam,pageParam) {
    return request({
      url: '/sys/viewSpot/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

/**
 * 添加景点
 */
  add(data) {
    return request({
      url: '/sys/viewSpot',
      method: 'post',
      data
    })
  },

  /**
   * 更新
   * @param data
   */
  update(data) {
    return request({
      url: '/sys/viewSpot',
      method: 'patch',
      data
    })
  },


  /**
   * 删除
   * @param perm
   */
  delete(data) {
    return request({
      url: '/sys/viewSpot',
      method: 'delete',
      data
    })
  }

}
