import Client from '#models/client'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async create({ request, response }: HttpContext) {
    const { clientId, productId, quantity } = request.qs()

    if (!clientId || !productId) {
      return response.badRequest({ message: 'Client and Product IDs are required' })
    }

    const client = await Client.findBy('id ', clientId)

    if (!client) {
      return response.notFound({ message: 'Client not found' })
    }

    const product = await Product.findBy('id', productId)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    const createdSale = await Sale.create({
      clientId: client.id,
      productId: product.id,
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
    })

    const queryResult = await Sale.query()
      .preload('client')
      .preload('product')
      .where('id', createdSale.id)
      .first()

    if (!queryResult) {
      return response.badRequest({ message: 'Error on create sale' })
    }

    const saleWithRelations = queryResult.serialize({
      fields: ['id', 'quantity', 'unitPrice', 'totalPrice'],
      relations: {
        client: {
          fields: ['id', 'name', 'cpf'],
        },
        product: {
          fields: ['id', 'name', 'description', 'price'],
        },
      },
    })

    return response.created({ sale: saleWithRelations })
  }
}
