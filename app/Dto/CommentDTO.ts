export interface Comment {
    user: {
        name: string
        avatar: string
    }
    id: number
    content: string
    created_at: string | null
}

export interface createCommentDto{
    content: string
}

export interface GetAllCommentsResponse {
    message: string
    data: Comment[]
}


export interface CommentResponse {
    message: string
}