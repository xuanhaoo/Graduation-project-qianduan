/**
 * “内容管理”相关接口
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
      url: '/sys/content/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },


/**
 置顶状态
 */
  setWeight(data) {
    return request({
      url: '/sys/content/setWeight',
      method: 'post',
      data: {
        id: data.id,
        weightFlag: data.weightFlag
      }
    })
  },

  /**
   审核状态
   */
    checkContent(data) {
      return request({
        url: '/sys/content/checkContent',
        method: 'post',
        data: {
          id: data.id,
          checkFlag: data.checkFlag
        }
      })
    },

  /**
   * 删除
   * @param perm
   */
  delete(data) {
    return request({
      url: '/sys/content',
      method: 'delete',
      data
    })
  },

  /**
   查询文章详细内容
   */
   queryBody(data) {
     return request({
       url: '/sys/content/queryBody',
       method: 'post',
       data
     })
   },

   /**
    查询单个
    */
   queryOneById(data) {
     return request({
       url: '/sys/content/queryById',
       method: 'post',
       data
     })
   }

}
