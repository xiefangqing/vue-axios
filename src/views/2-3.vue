<template>
  <div></div>
</template>

<script>
// 并发请求：同时进行多个请求，并统一处理返回值
// 适用于：请求多个接口，需要一起处理接口的返回值的时候
import axios from 'axios'
export default {
  created () {
    axios.all([
      axios.get('/data.json'),
      axios.get('/city.json')
    ]).then(axios.spread((dataRes, cityRes) => {
      console.log(dataRes, cityRes)
    }))
  }
}
</script>

<style scoped>

</style>
