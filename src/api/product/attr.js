// 获取商品三级列表
import request from '@/utils/request'

// 获取一级分类
export const category1 = () => request({
  url: '/admin/product/getCategory1',
  method: 'get'
})

// 获取二级分类
export const category2 = (id) => request({
  url: `/admin/product/getCategory2/${id}`,
  method: 'get'
})

// 获取三级分类
export const category3 = (id) => request({
  url: `/admin/product/getCategory3/${id}`,
  method: 'get'
})

// 获取商品属性
export const infolist = ({ cid1, cid2, cid3 }) => request({
  url: `/admin/product/attrInfoList/${cid1}/${cid2}/${cid3}`,
  method: 'get'
})

// 删除商品属性
export const deletecate = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete'
})

// 添加属性名称和属性值
export const addcate = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: 'post',
  data
})
