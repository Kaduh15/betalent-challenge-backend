import type { HttpRouterService } from '@adonisjs/core/types'

export function authRouter(router: HttpRouterService) {
  router.post('/signup', '#controllers/auth_controller.signup')
  router.post('/login', '#controllers/auth_controller.login')
}
