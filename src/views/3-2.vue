<template>
  <div></div>
</template>

<script>
/**
 * 基本配置参数
 * method: 请求方法
 * url: 请求路径
 * params: 请求参数拼接在url上
 * data: 请求参数放在请求体里
 * baseURL: 请求的基本地址  -->  axios.get('baseURL/data.json')...
 * timeout：请求的超时时长。请求时间过长会阻塞一些后端的内容，给运行的服务器增加压力
 * headers: 请求头
 *   token: 用来识别当前登录人的信息，因为一些接口需要登录鉴权
 * 优先级：请求配置 > 实例配置 > 全局配置
 */
import axios from 'axios'
export default {
  created () {
    // 全局配置
    axios.defaults.baseURL = 'xxx'
    axios.defaults.timeout = 1000

    // 实例配置
    const instance = axios.create({
      // ...
    })
    instance.defaults.timeout = 300

    // 请求配置
    instance.get('/data.json', {
      // ...
    })

    // 在实际开发中全局配置写的不多，因为局限性太大，像method这种配置参数，不可能配在全局
    // 一般是创建axios实例，然后给它进行配置
    // 假设现在有两个请求接口：http://localhost:8080、http://localhost:8080
    const ins1 = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 500
    })
    const ins2 = axios.create({
      baseURL: 'http://localhost:9090',
      timeout: 3000
    })
    // baseURL、timeout、url、method、params
    ins1.get('/contactList', {
      params: {
        id: 2
      }
    }).then(res => {
      console.log(res)
    })
    // baseURL、timeout: 5000、url、method
    ins2.get('/orderList', {
      timeout: 5000
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
