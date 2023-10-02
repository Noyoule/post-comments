// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PostService from "App/services/PostService";

export default class PostsController {
/**
   * @swagger
   * /api/v1/post:
   *    post:
   *       security:
   *         - bearerAuth: []
   *       summary: Create a new post
   *       tags:
   *         - Post
   *       requestBody:
   *          description: A json object to create the Post
   *          required: true
   *          content:
   *            multipart/form-data:
   *              schema:
   *                type: object
   *                properties:
   *                  content:
   *                    type: string
   *                  medias:
   *                    type: array
   *                    items:
   *                      type: string
   *                      format: binary
   *       responses:
   *         '200':
   *            description: Post created successfully
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *         '401':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Unauthorized'
   * 
   */
    public async create({auth, request, response}): Promise<PostResponse>{
        return PostService.created(auth, request, response)
    }

/**
   * @swagger
   * /api/v1/post/like/toggle/{postId}:
   *    post:
   *       security:
   *         - bearerAuth: []
   *       summary: Like a post
   *       parameters:
   *         - in: path
   *           name: postId
   *           schema:
   *             type: integer
   *           required: true
   *           description: Numeric ID of the post to like
   *       tags:
   *         - Post
   *       responses:
   *         '200':
   *            description: Post created successfully
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *         '401':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Unauthorized'
   * 
   */
    public async likeToggle({auth, params, response}): Promise<PostResponse>{ 
        return PostService.likeToggle(params.postId, auth, response)
    }

/**
   * @swagger
   * /api/v1/post/delete/{postId}:
   *    delete:
   *       security:
   *         - bearerAuth: []
   *       summary: Delete a post
   *       parameters:
   *         - in: path
   *           name: postId
   *           schema:
   *             type: integer
   *           required: true
   *           description: Numeric ID of the post to delete
   *       tags:
   *         - Post
   *       responses:
   *         '200':
   *            description: Post delete successfully
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *         '401':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Unauthorized'
   * 
   */
    public async deletePost({auth, params, response}): Promise<PostResponse>{
        return PostService.deletePost(params.postId, auth, response)
    }
}
