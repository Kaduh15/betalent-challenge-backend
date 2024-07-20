import type { HttpRouterService } from '@adonisjs/core/types'
import { middleware } from '#start/kernel'

export function saleRouter(router: HttpRouterService) {
  router
    .group(() => {
      router.post('/', '#controllers/sales_controller.create')
    })
    .prefix('/sales')
    .use(middleware.auth())
}
