import type { HttpRouterService } from '@adonisjs/core/types'
import { middleware } from '#start/kernel'

export function clientRouter(router: HttpRouterService) {
  router
    .group(() => {
      router.get('/', '#controllers/clients_controller.index')
      router.post('/', '#controllers/clients_controller.store')
      router.get('/:id', '#controllers/clients_controller.show')
      router.put('/:id', '#controllers/clients_controller.update')
      router.delete('/:id', '#controllers/clients_controller.destroy')
    })
    .prefix('/clients')
    .use(middleware.auth())
}
