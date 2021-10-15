<template>
  <div></div>
</template>

<script>
// 取消请求：用于取消正在进行的http请求（了解，几乎不用）
import axios from 'axios'
export default {
  created () {
    const source = axios.CancelToken.source()
    axios.get('/data.json', {
      cancelToken: source.token
    }).then(res => {
      console.log(res)
    }).catch(err => {
      // 取消请求会进入，err是取消原因
      console.log(err)
    })
    // 取消请求
    source.cancel('为什么取消')
  }
}
</script>

<style scoped>

</style>
