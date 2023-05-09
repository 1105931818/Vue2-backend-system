import request from '@/utils/request'

export const getSkuInfo = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})

// 上架商品
export const onsale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})

// 下架商品
export const downsale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})

// sku详细信息
export const getSkuItem = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})

// 删除
export const deletesku = (skuId) => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'delete'
})
