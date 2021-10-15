<template>
  <div></div>
</template>

<script>
// axios实例
// 抽取出公共的配置，方便接下来的请求
import axios from 'axios'
export default {
  created () {
    const instance = axios.create({
      baseURL: 'http://localhost:8080',
      // 超时报错
      timeout: 500
    })
    // 用起来和axios是一样的，axios也只是拥有默认配置的实例
    instance.get('/data.json').then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
