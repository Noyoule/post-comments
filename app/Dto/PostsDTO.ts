import { Comment } from "./CommentDTO"

export interface PostResponse {
    message: string
}

export interface Post {
    user: {
        name: string
        avatar: string
    }
    id: number
    content: string
    likes: number
    medias: string[]
}
export interface GetPostResponse {
    user: {
        name: string
        avatar: string
    }
    created_at:string|null
    content: string
    likes: number
    medias: string[] 
    comments: Comment[]
}
 
export interface DeletePostResponse {
    message: string
}

export interface GetAllPostResponse {
    "meta": {
        "total": number,
        "per_page": number,
        "current_page": number,
        "last_page": number,
        "first_page": number,
        "first_page_url": string,
        "last_page_url": string,
        "next_page_url": string | null,
        "previous_page_url": string | null
    },
    "data": Post[]
}