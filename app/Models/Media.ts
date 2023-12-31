import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public path: string

  @column()
  public postId: number

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(()=> Post)
  public post: BelongsTo<typeof Post>
}
