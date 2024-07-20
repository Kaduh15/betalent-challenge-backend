import type { HttpRouterService } from '@adonisjs/core/types'
import { middleware } from '#start/kernel'

export function productRouter(router: HttpRouterService) {
  router
    .group(() => {
      router.get('/', '#controllers/products_controller.index')
      router.post('/', '#controllers/products_controller.store')
      router.get('/:id', '#controllers/products_controller.show')
      router.put('/:id', '#controllers/products_controller.update')
      router.delete('/:id', '#controllers/products_controller.destroy')
    })
    .prefix('/products')
    .use(middleware.auth())
}
