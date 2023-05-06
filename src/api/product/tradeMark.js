// 获取品牌管理的数据
import request from '@/utils/request'

export const base = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

export const remove = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})

export const saveUpdate = (trademark) => {
  if (trademark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: trademark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: trademark
    })
  }
}

/* export const save = () => request({
  url: '/admin/product/baseTrademark/save',
  method: 'post'
})

export const update = () => request({
  url: '/admin/product/baseTrademark/update',
  method: 'put'
}) */
