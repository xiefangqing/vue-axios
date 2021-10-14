<template>
  <div></div>
</template>

<script>
/**
 * axios的请求方法：get、post、put、patch、delete
 * get：获取数据
 * post：提交数据（表单提交、文件上传、新建）
 * put、patch：更新数据
 *    put将所有数据全部推送到后端，后端将数据更新到数据库中
 *    patch只将修改的数据推送到后端
 * delete：删除数据
 * 上面不是规定，用post获取数据也行，具体看后端怎么定义规范
 */
import axios from 'axios'
export default {
  created () {
    // http://localhost:8080/data.json?id=28
    axios.get('/data.json', {
      params: {
        id: 28
      }
    }).then(res => {
      console.log(res)
    })
    // 两种写法效果完全一样，上面那种在代码上更加直观
    axios({
      method: 'get',
      url: '/data.json',
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
