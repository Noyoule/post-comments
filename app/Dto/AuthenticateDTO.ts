interface registerResponse {
    message: string;
    token: string;
}
interface loginResponse {
    message: string;
    token: string;
}

interface logoutResponse {
    message: string;
}

export type UserDto = {
    "name": string,
    "email": string,
    "password": string,
    "created_at": string|null,
    "updated_at": string|null
}

export type LoggerInDto = {
    user: Partial<UserDto>,
    token: object|undefined
}


export {registerResponse, loginResponse, logoutResponse}