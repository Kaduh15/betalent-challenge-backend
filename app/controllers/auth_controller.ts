import User from '#models/user'
import { loginAuthValidator, signupAuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const data = request.all()
    const { email, password } = await signupAuthValidator.validate(data)

    const hasUser = await User.findBy('email', email)

    if (hasUser) {
      return response.conflict({ message: 'User already exists' })
    }

    const user = await User.create({ email, password })

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const data = request.all()
    const { email, password } = await loginAuthValidator.validate(data)

    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.badRequest({ message: 'Invalid credentials' })
    }

    const token = User.accessTokens.create(user)

    return token
  }
}
