/**
 * “内容管理”相关接口
 */
import request from '@/utils/request'

export default {

  /**
   * 查询评论信息
   * @param queryParam
   * @param pageParam
   */
  queryByContentId(queryParam,pageParam) {
    return request({
      url: '/sys/comment/queryCommentByContent',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },



  /**
   * 删除
   * @param perm
   */
  delete(data) {
    return request({
      url: '/sys/comment',
      method: 'delete',
      data
    })
  },

  /**
   后台分析
   */
  queryCommentAnalysis() {
    return request({
      url: 'sys/comment/commentAnalysis',
      method: 'get'
    })
  }



}
