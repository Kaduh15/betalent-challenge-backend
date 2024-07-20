/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/signup', '#controllers/auth_controller.signup')
router.post('/login', '#controllers/auth_controller.login')

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
