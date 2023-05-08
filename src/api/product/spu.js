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
