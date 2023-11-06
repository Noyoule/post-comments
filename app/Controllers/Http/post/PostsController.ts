import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostService from "App/services/PostService";
import { PostResponse, ResponseTypeDTO } from "App/Dto";
import PostValidator from 'App/Validators/PostValidator';
import { fileUploadValidationOptions } from 'App/utils/helpers';
import Post from 'App/Models/Post';

export default class PostsController {
    public async create({ auth, request, response }: HttpContextContract) {
        const user = auth.user
        const data = await request.validate(PostValidator)
        const file = request.files('medias', { ...fileUploadValidationOptions })
        const result: ResponseTypeDTO<Post> = await PostService.created(user!, data, file)
        response.status(result.status).send(result)
    }


    public async likeToggle({ auth, params, response }: HttpContextContract) {
        const user = auth.user
        const result = await PostService.likeToggle(params.postId, user!)
        response.status(result.status).send(result)
    }


    public async deletePost({ auth, params, response }): Promise<PostResponse> {
        return PostService.deletePost(params.postId, auth, response)
    }


    public async get({ params, response }) {
        const result = await PostService.getOne(params.postId)
        response.status(result.status).send(result)
    }

    public async getAll({ request }) {
        var page = request.input('page');
        var limit = request.input('limit');

        if (page == null) {
            page = 1
        }
        if (limit == null) {
            limit = 30
        }
        return PostService.getAll(page, limit)
    }

}
