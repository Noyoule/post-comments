import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HTTP_RESPONSE_STATUS, LoggerInDto, RESPONSE_MESSAGES, ResponseTypeDTO, UserDto, badRequest, loginResponse, logoutResponse } from "App/Dto";

export default class AuthenticateService {
    public static async register(auth: HttpContextContract['auth'],data: Partial<UserDto>): Promise<ResponseTypeDTO<LoggerInDto>| ResponseTypeDTO<undefined>>{
        try {
            const user = new User()
            await user.fill(data).save()
            const token = await auth.use('api').generate(user, {
                expiresIn: '60 days'
            })
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: RESPONSE_MESSAGES.USER.create,
                data: {user,token}
            }
        } catch(e) {
            return {
                status: HTTP_RESPONSE_STATUS.BAD_REQUEST,
                message: RESPONSE_MESSAGES.USER.create,
                errors: e.message
            }
        }
    }

    public static async login(auth, request): Promise<loginResponse | badRequest> {
        try {
            const email = await request.input('email')
            const password = await request.input('password')
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '60 days'
            })
            return {
                message: 'User login successful',
                token: token.token
            }
        } catch {
            return {
                message: 'User login failed'
            }
        }
    }

    public static async logout(auth): Promise<logoutResponse> {
        await auth.use('api').revoke()
        return {
            message: 'User logged out'
        }
    }

}