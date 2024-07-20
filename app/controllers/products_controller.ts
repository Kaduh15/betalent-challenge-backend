import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const queryResult = await Product.query().preload('sale').orderBy('name', 'asc')
    const clients = queryResult.map((c) => {
      const client = c.serialize({
        relations: {
          sale: {
            fields: ['id', 'quantity', 'unitPrice', 'totalPrice'],
          },
        },
      })
      return client
    })

    return clients
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const { name, description, price } = await createProductValidator.validate(data)

    const hasProduct = await Product.findBy('name', name)

    if (hasProduct) {
      return response.badRequest({
        message: 'Product already exists',
      })
    }

    const product = await Product.create({ name, description, price })

    return response.created(product)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    return product
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
