/**
 * “内容管理”相关接口
 */
import request from '@/utils/request'

export default {

  /**
   * 查询点评信息
   * @param queryParam
   * @param pageParam
   */
  query(queryParam,pageParam) {
    return request({
      url: '/sys/publicPraiseView/queryPraiseViewList',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },


/**
 * 查询点评的信息
 */
  queryCommentBySpot(queryParam,pageParam) {
    return request({
      url: '/sys/publicPraiseView/queryCommentBySpot',
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
      url: '/sys/publicPraiseView',
      method: 'delete',
      data
    })
  },

  praiseViewDataAnalysis() {
    return request({
      url: '/sys/publicPraiseView/praiseViewDataAnalysis',
      method: 'get'
    })
  }


}
