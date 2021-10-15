<template>
  <div></div>
</template>

<script>
// 拦截器：在请求或响应被处理前拦截（在发送请求之前先做一些处理，在响应回来之后先做一些处理）
import axios from 'axios'
export default {
  created () {
    // 请求拦截器
    axios.interceptors.request.use(config => {
      // 在发送请求前做些什么，比如修改配置、弹出内容...
      return config
    }, err => {
      // 在请求错误的时候做些什么(发送的请求没有到达后端，404)
      return Promise.reject(err)
    })

    // 响应拦截器
    axios.interceptors.response.use(res => {
      // 请求成功对响应数据(res)做处理
      return res
    }, err => {
      // 响应错误做些什么(请求到达后端并返回内容了，比如查无此人，500)
      return Promise.reject(err)
    })

    axios.get().then(res => {
      // 这的res是从响应拦截器返回来的
    }).catch(err => {
      // 请求错误或响应错误都会进来，err是错误的返回
    })

    // 取消拦截器（了解就行，因为实际开发中拦截器是不会轻易取消的）
    const instance = axios.interceptors.request.use(config => {
      config.headers.auth = true
      return config
    })
    axios.interceptors.request.eject(instance)

    // 在实际开发中一般给实例添加拦截器，而不给axios添加，因为axios全局可用，可能污染
    // 例子 登录状态：登录之后，后端返回参数token(经过编码的字符串，包含加密后的个人信息，用来识别当前登录人的身份)
    // 有些接口需要登录才能访问，比如评论，有些不用，这时可以创建两个实例
    // 用ins1访问需要登录的接口
    const ins1 = axios.create({})
    ins1.interceptors.request.use(config => {
      // 不要这么写，在实际开发中headers不止包含了token，这样写会覆盖了其它的headers参数
      // config.headers = {
      //   token: 'xxx'
      // }
      config.headers.token = 'xxx'
      return config
    })
    // 用ins2访问不需要登录的接口
    const ins2 = axios.create({})

    // 移动端开发很讲究用户体验度，在用户等待的时候显示loading
    const instance_web = axios.create({})
    const instance_phone = axios.create({})
    instance_phone.interceptors.request.use(config => {
      // 显示loading
      return config
    })
    instance_phone.interceptors.response.use(res => {
      // 隐藏loading
      return res
    })
  }
}
</script>

<style scoped>

</style>
