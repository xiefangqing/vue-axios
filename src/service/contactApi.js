const CONTACT_API = {
  // 获取联系人列表
  getContactList: {
    method: 'get',
    url: '/contactList'
  },
  // 新建联系人
  newContactForm: {
    method: 'post',
    url: '/contact/new/form'
  },
  newContactJson: {
    method: 'post',
    url: '/contact/new/json'
  },
  // 编辑联系人
  editContact: {
    method: 'put',
    url: '/contact/edit'
  },
  // 删除联系人
  deleteContact: {
    method: 'delete',
    url: '/contact'
  }
}
export default CONTACT_API
