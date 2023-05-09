import request from '@/utils/request'

export const product = ({ page, limit, category3Id }) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: { category3Id }
})

// 获取品牌信息
export const trademarklist = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'get'
})

// 获取平台全部销售属性
export const saleattr = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'get'
})

// 获取spu信息
export const spubyid = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})

// 获取spu图标的接口
export const spuimge = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 添加数据
export const addspuInfo = (data) => {
  if (data.id) {
    // 修改
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data
    })
  } else {
    // 添加
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data
    })
  }
}

// 删除SPU
export const deleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})

// 获取Sku列表信息
export const getattrSku = ({ category1Id, category2Id, category3Id }) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 获取Sku列表的sale信息
export const getSkuSale = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})

// 获取Sku列表的图片信息
export const getSkuImg = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 新增Sku
export const addSku = (data) => request({
  url: '/admin/product/saveSkuInfo',
  method: 'post',
  data
})

// 获取Sku详细列表
export const getSkuList = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})

