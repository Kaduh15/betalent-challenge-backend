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
        fields: ['id', 'cpf', 'name'],
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
  async show({ params, response, request }: HttpContext) {
    const { id } = params
    const { month, year } = request.qs()

    if (!id) {
      response.badRequest({ message: 'Invalid id' })
    }

    const queryResult = await Client.query()
      .preload('address')
      .preload('phone')
      .preload('sale', (query) => {
        if (month && year) {
          query.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year])
        } else if (month) {
          query.whereRaw('MONTH(created_at) = ?', [month])
        } else if (year) {
          query.whereRaw('YEAR(created_at) = ?', [year])
        }

        query.orderBy('created_at', 'desc')
      })
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
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params

    if (!id) {
      return response.badRequest({ message: 'Invalid id' })
    }

    const data = request.all()
    const { cpf, name, address, phone } = await createClientValidator.validate(data)

    const client = await Client.findOrFail(id)
    client.merge({ cpf, name })

    if (address) {
      await client.related('address').updateOrCreate({}, address)
    }

    if (phone) {
      await client.related('phone').updateOrCreate({}, { number: phone })
    }
    await client.save()

    const queryResult = await Client.query()
      .preload('address')
      .preload('phone')
      .where('id', id)
      .first()

    if (!queryResult) {
      return response.notFound({ message: 'Client not found' })
    }

    const clientUp = queryResult.serialize({
      relations: {
        address: {
          fields: ['id', 'street', 'number', 'city', 'state', 'zipCode'],
        },
        phone: {
          fields: ['id', 'number'],
        },
      },
    })

    return response.ok(clientUp)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params

    if (!id) {
      return response.badRequest({ message: 'Invalid id' })
    }

    const client = await Client.findBy('id', id)

    if (!client) {
      return response.notFound({ message: 'Client not found' })
    }

    await client.delete()

    return response.noContent()
  }
}
