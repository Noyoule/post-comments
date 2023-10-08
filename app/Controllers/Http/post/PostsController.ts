// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PostService from "App/services/PostService";

export default class PostsController {
    public async create({ auth, request, response }): Promise<PostResponse> {
        return PostService.created(auth, request, response)
    }


    public async likeToggle({ auth, params, response }): Promise<PostResponse> {
        return PostService.likeToggle(params.postId, auth, response)
    }

   
    public async deletePost({ auth, params, response }): Promise<PostResponse> {
        return PostService.deletePost(params.postId, auth, response)
    }

 
    public async get({ params, response }): Promise<GetPostResponse | PostResponse> {
        return PostService.get(params.postId, response)
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
