/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { authRouter } from '#routes/auth_router'
import { clientRouter } from '#routes/client_router'
import { productRouter } from '#routes/product_router'
import { saleRouter } from '#routes/sale_router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

authRouter(router)

clientRouter(router)

productRouter(router)

saleRouter(router)
