import Post from "App/Models/Post"
import { HTTP_RESPONSE_STATUS, PostResponse, RESPONSE_MESSAGES, ResponseTypeDTO, createPostDto } from 'App/Dto'
import User from 'App/Models/User'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

export default class PostService {

    public static async created(user: User, data: createPostDto, files?: MultipartFileContract[] | null): Promise<ResponseTypeDTO<Post>> {
        try {
            const post: Post = await Post.create({
                content: data.content,
                userId: user.id
            })
            //check if file exist 
            if (files != null) {
                await Promise.all(files.map(async (file) => {
                    await file.moveToDisk('./media')
                    const filePath = 'media/' + file.fileName
                    await post.related('medias').create({
                        path: filePath,
                    })
                }))
            }
            await post.load('medias')
            await post.load('user')
            await post.loadCount('likes')
            return {
                status: HTTP_RESPONSE_STATUS.CREATED,
                message: RESPONSE_MESSAGES.POST.create,
                data: post,
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: "Error during the post creation process",
                errors: e
            }
        }
    }

    //fonction pour liker ou revoker le like sur un post 
    public static async likeToggle(postId: number, user: User): Promise<ResponseTypeDTO<undefined>> {
        try {
            const post = await Post.find(postId)

            if (!post) {
                return {
                    status: HTTP_RESPONSE_STATUS.NOT_FOUND,
                    message: RESPONSE_MESSAGES.POST.notFound,
                    errors: new Error(RESPONSE_MESSAGES.POST.notFound)
                }
            }

            const existing_like = await post!.related('likes').query().where('user_id', user.id).first()
            if (!existing_like) {
                post!.related('likes').create({
                    postId: post!.id,
                    userId: user.id
                })
            } else {
                existing_like.delete()
            }
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: 'Operation done successfully'
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: 'Error during the operation'
            }
        }
    }

    //fonction pour supprimer un post
    public static async deletePost(postId: number, auth, response): Promise<PostResponse> {
        try {
            const post = await Post.findOrFail(postId)
            //verifier si l'utilisateur connecté est l'auteur de post
            if (post.userId == auth.user.id) {
                post.delete()
            }
            return {
                message: 'Post deleted successfully'
            }
        } catch (e) {
            response.status(400)
            return response.status(400).json({
                message: "Error during the process"
            });
        }
    }

    //Fonction pour retourner un post avec les commentaire
    public static async getOne(postId: number): Promise<ResponseTypeDTO<Post>> {
        try {
            const post = await Post.query()
                .where('id', postId)
                .preload('comments', (query) => {
                    query.preload('user');
                }).preload('user')
                .preload('likes')
                .first();

            if (!post) {
                return {
                    status: HTTP_RESPONSE_STATUS.NOT_FOUND,
                    message: RESPONSE_MESSAGES.POST.notFound,
                    errors: new Error(RESPONSE_MESSAGES.POST.notFound)
                }
            }
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: RESPONSE_MESSAGES.POST.getOne,
                data: post
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: 'Error during the process',
                errors: e
            }
        }
    }

    //récupérer une liste paginer de tous les posts
    public static async getAll(page: number, limit: number) {
        const posts = await Post.query().preload('medias', (mediaQuery) => {
            mediaQuery.select('name')
        }).preload('user', (userQuery) => {
            userQuery.select('name', 'email')
        }).paginate(page, limit)
        return posts.toJSON()
    }
}