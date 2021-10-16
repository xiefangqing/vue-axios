<template>
  <div>
    <!-- 联系人列表 -->
    <van-contact-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- 联系人编辑 -->
    <van-popup v-model="show" position="bottom">
      <van-contact-edit
        :is-edit="isEdit"
        :contact-info="editingContact"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>>
  </div>
</template>

<script>
import { ContactList, Toast, ContactEdit, Popup } from 'vant'
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      instance: null, // axios实例
      show: false, // 编辑弹窗的显隐
      editingContact: {}, // 正在编辑的联系人数据
      isEdit: false // 控制新建或编辑
    }
  },
  components: {
    // 要在模板中使用的组件才需要注册，Toast不在模板中使用，不用注册
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  methods: {
    // 添加联系人
    onAdd () {
      this.show = true
      this.isEdit = false
    },
    // 编辑联系人
    onEdit (info) {
      this.show = true
      this.isEdit = true
      this.editingContact = info
    },
    // 保存联系人
    onSave (info) {
      if (this.isEdit) {
        // 编辑保存
        this.instance.put('/contact/edit', info).then(res => {
          if (res.data.code === 200) {
            Toast('编辑成功')
            this.show = false
            this.getList()
            this.editingContact = {}
          }
        }).catch(() => {
          Toast('编辑失败')
        })
      } else {
        // 新建保存
        this.instance.post('/contact/new/json', info).then(res => {
          if (res.data.code === 200) {
            Toast('新建成功')
            this.show = false
            this.getList()
            this.editingContact = {}
          }
        }).catch(() => {
          Toast('新建失败')
        })
      }
    },
    // 删除联系人
    onDelete (info) {
      this.instance.delete('/contact', {
        params: {
          id: info.id
        }
      }).then(res => {
        if (res.data.code === 200) {
          Toast('删除成功')
          this.show = false
          this.getList()
          this.editingContact = {}
        }
      }).catch(() => {
        Toast('删除失败')
      })
    },
    // 获取联系人列表
    getList () {
      this.instance.get('/contactList').then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data
        }
      }).catch(() => {
        Toast('请求失败，请稍后重试')
      })
    }
  },
  created () {
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1000
    })
    this.getList()
  }
}
</script>

<style scoped>
.van-contact-list__add {
  z-index: 0
}
.van-popup {
  height: 100%
}
</style>
