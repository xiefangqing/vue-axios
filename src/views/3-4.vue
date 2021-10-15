<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    // 实际开发中，一般都会添加统一的错误处理(也就是在拦截器里处理)，而不在每个请求下面都链上.catch，除非那个请求特殊
    const instance = axios.create({})
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      // 请求错误：状态码以4开头。404接口没找到、401请求超时
      // 显示错误提示、弹窗
      setTimeout(() => {
        // 隐藏
      }, 2000)
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      return res
    }, err => {
      // 响应错误：状态码以5开头。500系统错误，502系统重启
      // 显示
      setTimeout(() => {
        // 隐藏
      }, 2000)
      return Promise.reject(err)
    })
  }
}
</script>

<style scoped>

</style>
