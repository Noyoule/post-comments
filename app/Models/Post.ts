import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Media from './Media'
import Comment from './Comment'
import Like from './Like'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => Media, {
    pivotForeignKey: 'post_id',
    pivotRelatedForeignKey: 'media_id',
    pivotTable: 'post_medias'
  })
  public medias: ManyToMany<typeof Media>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>
}
