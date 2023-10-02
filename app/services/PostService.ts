import { schema } from '@ioc:Adonis/Core/Validator'
import Media from 'App/Models/Media'
import Post from "App/Models/Post"

export default class PostService {

    public static async created(auth, request, response): Promise<PostResponse> {
        const post: Post = await Post.create({
            content: request.input('content'),
            userId: auth.user.id
        })
        const filesSchema = schema.create({
            medias: schema.array().members(
                schema.file({
                    size: '2mb',
                    extnames: ['jpg', 'png'],
                })
            ),
        })
        try {
            if (request.files('medias').length > 0) {
                const payload = await request.validate({ schema: filesSchema })
                await Promise.all(
                    payload.medias.map(async (file) => {
                        await file.moveToDisk('./media')
                        const fileName = file.fileName;
                        const media = new Media()
                        media.path = fileName
                        media.related('post').associate(post)
                    })
                )
            }
        } catch (e) {
            response.status(400)
            response.send({
                message: "Error during the post creation process"
            })
        }
        return {
            message: 'Post created successfully'
        }
    }


    public static async likeToggle(post_id: number, auth, response): Promise<PostResponse> {
        try {
            const post = await Post.findOrFail(post_id)
            const existing_like = await post!.related('likes').query().where('user_id', auth.user.id).first()
            if (!existing_like) {
                post!.related('likes').create({
                    postId: post!.id,
                    userId: auth.user.id
                })
            } else {
                existing_like.delete()
            }
        } catch (e) {
            response.status(400)
            response.send({
                message: "Error during the process"
            })
        }
        return {
            message: 'Operation done successfully'
        }
    }

    public static async deletePost(post_id: number, auth, response) {
        try {
            const post = await Post.findOrFail(post_id)
            //verifier si l'utilisateur connecté est l'auteur de post
            if (post.userId == auth.user.id) {
                post.delete()
            }
        } catch (e) {
            response.status(400)
            response.send({
                message: "Error during the process"
            })
        }
        return {
            message: 'Post deleted successfully'
        }
    }
}