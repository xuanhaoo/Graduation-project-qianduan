import request from '@/utils/request'
/***

后期删除
**/

//友链
export function getLinks() {
  return request({
    url: '/linksAbout/links',
    method: 'get'
  })
}

//友链
export function getAbout() {
  return request({
    url: '/linksAbout/about',
    method: 'get'
  })
}
