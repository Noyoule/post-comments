import { schema } from '@ioc:Adonis/Core/Validator'
import Media from 'App/Models/Media'
import Post from "App/Models/Post"
import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'

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
                        const filePath = 'media/' + file.fileName
                        const media = new Media()
                        media.path = filePath
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

    //fonction pour liker ou revoker le like sur un post 
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
            return {
                message: 'Operation done successfully'
            }
        } catch (e) {
            response.status(400)
            return response.status(400).json({
                message: "Error during the process"
            });
        }
    }

    //fonction pour supprimer un post
    public static async deletePost(post_id: number, auth, response): Promise<PostResponse> {
        try {
            const post = await Post.findOrFail(post_id)
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
    public static async get(post_id: number, response): Promise<GetPostResponse | PostResponse> {
        try {
            const post = await Post.query()
                .where('id', post_id)
                .preload('comments', (query) => {
                    query.preload('user');
                }).preload('user')
                .preload('medias')
                .preload('likes')
                .firstOrFail();

            return {
                user: {
                    avatar: 'avatar',
                    name: post.user.name
                },
                created_at: post.createdAt.toJSON(),
                content: post.content,
                likes: post.likes.length,
                medias: await Promise.all(post.medias.map(async (media) => {
                    const media_url = Env.get('APP_URL') + await Drive.getUrl(media.path);
                    return media_url;
                })),
                comments: post.comments.map((comment) => {
                    return {
                        user: {
                            name: comment.user.name,
                            avatar: "avatar",
                        },
                        id: comment.id,
                        content: comment.content,
                        created_at: comment.createdAt.toJSON(),
                    };
                })
            }
        } catch (e) {
            return response.status(400).json({
                message: e
            });
        }
    }

    //récupérer une liste paginer de tous les posts
    public static async getAll(page: number, limit: number){
        const posts = await Post.query().preload('medias',(mediaQuery)=>{
         mediaQuery.select('name')
        }).preload('user',(userQuery)=>{
            userQuery.select('name','email')
        }).paginate(page, limit)
        return posts.toJSON()
    }
}