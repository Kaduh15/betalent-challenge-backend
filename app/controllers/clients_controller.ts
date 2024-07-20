import Client from '#models/client'
import { createClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ClientsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const queryResult = await Client.query().preload('address').preload('phone').orderBy('id')
    const clients = queryResult.map((c) => {
      const client = c.serialize({
        relations: {
          address: {
            fields: ['id', 'street', 'number', 'city', 'state', 'zipCode'],
          },
          phone: {
            fields: ['id', 'number'],
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
    const { cpf, name, address, phone } = await createClientValidator.validate(data)

    let client: Client = new Client()

    try {
      await db.transaction(async (trx) => {
        client = await Client.create({ cpf, name }, { client: trx })

        await client.related('address').create(address, { client: trx })
        await client.related('phone').createMany(
          [
            {
              number: phone,
            },
          ],
          { client: trx }
        )
      })
    } catch (error) {
      return response.badRequest({
        message: 'Error on create client',
      })
    }

    if (!client) {
      return response.badRequest({
        message: 'Error on create client',
      })
    }

    return response.created(client.toJSON())
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params

    if (!id) {
      response.badRequest({ message: 'Invalid id' })
    }

    const queryResult = await Client.query()
      .preload('address')
      .preload('phone')
      .preload('sale')
      .where('id', id)
      .first()

    if (!queryResult) {
      return response.notFound({ message: 'Client not found' })
    }

    const client = queryResult.serialize({
      relations: {
        address: {
          fields: ['id', 'street', 'number', 'city', 'state', 'zipCode'],
        },
        phone: {
          fields: ['id', 'number'],
        },
      },
    })

    return response.ok(client)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
