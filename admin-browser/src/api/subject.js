/**
 * “主题管理”相关接口
 */
import request from '@/utils/request'

export default {

  /**
   * 查询主题信息
   * @param queryParam
   * @param pageParam
   */
  query(queryParam,pageParam) {
    return request({
      url: '/sys/subject/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

/**
 * 添加主题
 */
  add(data) {
    return request({
      url: '/sys/subject',
      method: 'post',
      data
    })
  },

  /**
   * 更新主题
   * @param data
   */
  update(data) {
    return request({
      url: '/sys/subject',
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
      url: '/sys/subject',
      method: 'delete',
      data
    })
  },
  // 查询所有的所有的主题（无分页）
  queryAllNoPage() {
    return request({
      url: '/sys/subject/queryAllNoPage',
      method: 'get'
    })
  }

}
