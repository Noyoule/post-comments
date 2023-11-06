import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CommentService from "App/services/CommentService";
import CommentValidator from 'App/Validators/CommentValidator';

export default class CommentsController {

  public async get({ params, response }: HttpContextContract) {
    const result = await CommentService.get(params.postId);
    response.status(result.status).send(result)
  }


  public async create({ params, response, auth, request }: HttpContextContract) {
    const data = await request.validate(CommentValidator);
    const user = auth.user
    const result = await CommentService.create(params.postId, user!.id, data)
    response.status(result.status).send(result)
  }

}
