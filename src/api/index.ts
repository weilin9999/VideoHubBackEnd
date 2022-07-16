// index.js 调用接口的方法
// 引入封装的get/post请求方法
import { get, post, upload} from '@/api/http'

export const getRequest = (url,m) => get(url,m)
export const postRequest = (url,m) => post(url,m)
export const uploadRequest = (url,m,onUploadProgress) => upload(url,m,onUploadProgress)