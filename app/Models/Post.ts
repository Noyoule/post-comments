import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
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
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(()=> Media)
  public medias: HasMany<typeof Media>

  @hasMany(()=> Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(()=> Like)
  public likes: HasMany<typeof Like>

}
