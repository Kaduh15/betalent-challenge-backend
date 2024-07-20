import Address from '#models/address'
import Phone from '#models/phone'
import Sale from '#models/sale'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Phone)
  declare phone: HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare sale: HasMany<typeof Sale>
}
