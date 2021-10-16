import axios from 'axios'
import CONTACT_API from './contactApi'
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
})

// 封装统一的请求格式
const Http = {} // 包裹请求方法的容器
for (const key in CONTACT_API) {
  const api = CONTACT_API[key]
  // 参数根据项目实际情况写
  Http[key] = async function (params, isFormData = false, config = {}) {
    let newParams = null
    // Content-Type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (const i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    const method = api.method
    const url = api.url
    let res = null
    if (method === 'put' || method === 'post' || method === 'patch') {
      try {
        res = await instance[method](url, newParams, config)
      } catch (e) {
        res = e
      }
    } else if (method === 'delete' || method === 'get') {
      config.params = newParams
      try {
        res = await instance[method](url, config)
      } catch (e) {
        res = e
      }
    }
    return res
  }
}

// async作用: 避免进入回调地狱
// axios.get().then(res => {
//   axios.get().then(res => {
//     // ...
//   })
// })

// 拦截器的添加
instance.interceptors.request.use(config => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, () => {
  Toast.clear()
  Toast('请求错误，请稍后再试')
})
instance.interceptors.response.use(res => {
  Toast.clear()
  return res.data
}, () => {
  Toast.clear()
  Toast('请求错误，请稍后再试')
})

export default Http
