interface PostResponse {
    message: string
}


interface GetPostResponse {
    user: {
        name: string
        avatar: string
    }
    content: string
    likes: number
    medias: string[]
}

interface DeletePostResponse {
    message: string
}