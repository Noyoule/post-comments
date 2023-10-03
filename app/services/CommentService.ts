import Post from "App/Models/Post";

export default class CommentService {

    public static async get(post_id: number, response): Promise<GetAllCommentsResponse | CommentResponse> {
        try {
            const post = await Post.query()
                .where('id', post_id)
                .preload('comments', (query) => {
                    query.preload('user');
                })
                .firstOrFail();
            return {
                message: "Comments get successfully",
                data: post.comments.map((comment) => {
                    return {
                        user: {
                            name: comment.user.name,
                            avatar: "avatar",
                        },
                        content: comment.content,
                        created_at: comment.createdAt.toJSON(),
                    };
                })
            }
        } catch {
            return response.status(400).json({
                message: "Error during the process"
            });
        }
    }

    public static async create(post_id: number, auth, response, request): Promise<CommentResponse> {
        try {
            const post = Post.findOrFail(post_id);
            (await post).related('comments').create({
                content: request.input('content'),
                userId: auth.user.id
            })
            return {
                message: "Comment created successfully"
            }
        }catch{
            return response.status(400).json({
                message: "Error during the process"
            });
        }
    }
}