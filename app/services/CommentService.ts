import { HTTP_RESPONSE_STATUS, RESPONSE_MESSAGES, ResponseTypeDTO, createCommentDto } from "App/Dto";
import Comment from "App/Models/Comment";
import Post from "App/Models/Post";

export default class CommentService {

    public static async get(postId: number): Promise<ResponseTypeDTO<Comment[]>> {
        try {
            const post = await Post.query()
                .where('id', postId)
                .preload('comments', (query) => {
                    query.preload('user');
                })
                .first();

            if (!post) {
                return {
                    status: HTTP_RESPONSE_STATUS.NOT_FOUND,
                    message: RESPONSE_MESSAGES.POST.notFound,
                    errors: new Error(RESPONSE_MESSAGES.POST.notFound)
                }
            }
            const comments = post.comments
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: RESPONSE_MESSAGES.COMMENT.getAll,
                data: comments
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: RESPONSE_MESSAGES.POST.notFound,
                errors: new Error(RESPONSE_MESSAGES.POST.notFound)
            }
        }
    }

    public static async create(post_id: number, userId: number, data: createCommentDto): Promise<ResponseTypeDTO<Comment>> {
        try {
            const post = await Post.find(post_id);
            if (!post) {
                return {
                    status: HTTP_RESPONSE_STATUS.NOT_FOUND,
                    message: RESPONSE_MESSAGES.POST.notFound,
                    errors: new Error(RESPONSE_MESSAGES.POST.notFound)
                }
            }

            const comment = await new Comment().fill({ ...data, userId });
            await post.related('comments').save(comment)

            return {
                status: HTTP_RESPONSE_STATUS.CREATED,
                message: RESPONSE_MESSAGES.COMMENT.create,
                data: comment
            }
        } catch {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: 'Error creating comment',
                errors: new Error('Error creating comment')
            }
        }
    }
}