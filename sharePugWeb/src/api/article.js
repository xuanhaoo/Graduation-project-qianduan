import request from '@/utils/request'


/***

后期删除
**/

//首页获取文章列表
export function getArticles(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

//获取分类列表
export function getCategory() {
  return request({
    url: '/cate/query',
    method: 'get'
  })
}

//获取单个文章的详细内容
export function queryObject(id) {
  return request({
    url: `/article/query/${id}`,
    method: 'get',
  })
}
//查看单篇文章时，加载该文章标签
export function queryTags(id) {
  return request({
    url: `/article/queryTag/${id}`,
    method: 'get',
  })
}

//归档查看文章
export function accordingArchive() {
  return request({
    url: '/article/archiving',
    method: 'get'
  })

}
