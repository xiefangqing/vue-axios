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
export default {
  data () {
    return {
      list: [],
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
    async onSave (info) {
      if (this.isEdit) {
        // 编辑保存
        const res = await this.$Http.editContact(info)
        if (res.code === 200) {
          Toast('编辑成功')
          this.show = false
          this.getList()
          this.editingContact = {}
        }
      } else {
        // 新建保存
        // const res = await this.$Http.newContactForm(info, true)
        const res = await this.$Http.newContactJson(info)
        if (res.code === 200) {
          Toast('编辑成功')
          this.show = false
          this.getList()
          this.editingContact = {}
        }
      }
    },
    // 删除联系人
    async onDelete (info) {
      const res = await this.$Http.deleteContact({ id: info.id })
      if (res.code === 200) {
        Toast('删除成功')
        this.show = false
        this.getList()
        this.editingContact = {}
      }
    },
    // 获取联系人列表
    async getList () {
      const res = await this.$Http.getContactList()
      this.list = res.data
    }
  },
  created () {
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
