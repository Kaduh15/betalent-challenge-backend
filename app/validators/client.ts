import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new client.
 */
export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    cpf: vine
      .string()
      .regex(
        /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
      )
      .parse((cpf) => {
        return (cpf as string).replace(/[^\d]/g, '')
      }),
    phone: vine.string().regex(/^(?:\+55\s?)?(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/),

    address: vine.object({
      street: vine.string().minLength(3),
      number: vine.string().minLength(1),
      city: vine.string().minLength(3),
      state: vine.string().minLength(2),
      zip_code: vine.string().minLength(8),
    }),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing client.
 */
export const updateClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).optional(),
    cpf: vine
      .string()
      .regex(
        /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
      )
      .parse((cpf) => {
        return (cpf as string).replace(/[^\d]/g, '')
      })
      .optional(),
    phone: vine
      .string()
      .regex(/^(?:\+55\s?)?(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/)
      .optional(),

    address: vine.object({
      street: vine.string().minLength(3).optional(),
      number: vine.string().minLength(1).optional(),
      city: vine.string().minLength(3).optional(),
      state: vine.string().minLength(2).optional(),
      zip_code: vine.string().minLength(8).optional(),
    }),
  })
)
