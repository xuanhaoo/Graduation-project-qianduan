import request from '@/utils/request'
import requestUrl from './requestUrl'
// 上传文件
export function uploadImage () {
  return requestUrl('/webservice/personInfoWebService/uploadAvatar')
}
