import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new auth.
 */
export const signupAuthValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing auth.
 */
export const loginAuthValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
