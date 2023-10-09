// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CommentService from "App/services/CommentService";
import { CommentResponse, GetAllCommentsResponse } from "App/Dto";

export default class CommentsController {

  public async get({ params, response }): Promise<GetAllCommentsResponse | CommentResponse> {
    return CommentService.get(params.postId, response);
  }


  public async create({ params, response, auth, request }): Promise<CommentResponse> {
    return CommentService.create(params.postId, auth, response, request)
  }

}
