interface Comment {
    user: {
        name: string
        avatar: string
    }
    content: string
    created_at: string | null
}

interface GetAllCommentsResponse {
    message: string
    data: Comment[]
}



interface CommentResponse {
    message: string
}