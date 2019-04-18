/**
 * “分享足迹用户管理”相关接口
 */
import request from '@/utils/request'

export default {

  /**
   * 查询用户信息
   * @param queryParam
   * @param pageParam
   */
  queryCus(queryParam,pageParam) {
    return request({
      url: '/sys/customer/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

  /**
   * 状态锁定
   * @param data
   */
  updateCus(data) {
    return request({
      url: '/sys/customer/lockCustomer',
      method: 'patch',
      data: {
        id: data.id,
        lock: data.lock
      }
    })
  },

/**
 * 重置密码
 */
  resetPwd(data) {
    return request({
      url: '/sys/customer/resetPwd',
      method: 'patch',
      data: {
        id: data.id
      }
    })
  },

  /**
   * 删除用户
   * @param perm
   */
  deleteCus(data) {
    return request({
      url: '/sys/customer',
      method: 'delete',
      data
    })
  }

}
