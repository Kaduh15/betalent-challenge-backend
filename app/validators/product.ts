import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new product.
 */
export const createProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .minLength(3)
      .parse((name) => (name as string).toLowerCase()),
    price: vine.number().min(1),
    description: vine.string().minLength(3),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing product.
 */
export const updateProductValidator = vine.compile(vine.object({}))
