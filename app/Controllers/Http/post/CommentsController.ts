// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CommentService from "App/services/CommentService";

export default class CommentsController {

     /**
      * @swagger
      * /api/v1/post/comments/{postId}:
      *    get:
      *       security:
      *         - bearerAuth: []
      *       summary: Get all  post's comments
      *       parameters:
      *         - in: path
      *           name: postId
      *           schema:
      *             type: integer
      *           required: true
      *       tags:
      *         - Comment
      *       responses:
      *         '200':
      *            description: Post's comments get successfully
      *            content:
      *              application/json:
      *                schema:
      *                  $ref: '#/components/schemas/GetPost'
      *         '401':
      *            description: Bad request
      *            content:
      *              application/json:
      *                schema:
      *                  $ref: '#/components/schemas/Unauthorized'
      * 
      */
    public async get({params, response}): Promise<GetAllCommentsResponse|CommentResponse>{
        return CommentService.get(params.postId, response);
    }
 /**
   * @swagger
   * /api/v1/post/comment/{postId}:
   *    post:
   *       security:
   *         - bearerAuth: []
   *       summary: Create a comment for a post
   *       parameters:
   *         - in: path
   *           name: postId
   *           schema:
   *             type: integer
   *           required: true
   *           description: Numeric ID of the post that will be comment 
   *       tags:
   *         - Comment
   *       requestBody:
   *          description: A json object to send the comment data to the server
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  content:
   *                    type: string
   *       responses:
   *         '200':
   *            description: Post get successfully
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/GetPost'
   *         '401':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Unauthorized'
   * 
   */
    public async create({params, response, auth, request}): Promise<CommentResponse>{
       return CommentService.create(params.postId, auth, response, request)
    }
}
