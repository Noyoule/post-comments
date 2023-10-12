import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HTTP_RESPONSE_STATUS, LoggerInDto, RESPONSE_MESSAGES, ResponseTypeDTO, UserDto } from "App/Dto";

export default class AuthenticateService {
    public static async register(auth: HttpContextContract['auth'], data: Partial<UserDto>): Promise<ResponseTypeDTO<LoggerInDto> | ResponseTypeDTO<undefined>> {
        try {
            const user = new User()
            await user.fill(data).save()
            const token = await auth.use('api').generate(user, {
                expiresIn: '60 days'
            })
            return {
                status: HTTP_RESPONSE_STATUS.CREATED,
                message: RESPONSE_MESSAGES.USER.create,
                data: { user, token }
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                message: e.message,
                errors: e
            }
        }
    }

    public static async login(auth: HttpContextContract['auth'], data: Partial<UserDto>): Promise<ResponseTypeDTO<LoggerInDto> | ResponseTypeDTO<undefined>> {
        try {
            let user: User = await User.query().where('email', data.email!).firstOrFail();
            if (!user) {
                return {
                    status: HTTP_RESPONSE_STATUS.NOT_FOUND,
                    message: RESPONSE_MESSAGES.USER.notFound,
                }
            }
            const token = await auth.use('api').generate(user, {
                expiresIn: '60 days',
            })
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: RESPONSE_MESSAGES.USER.login,
                data: { user, token }
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                errors: e,
                message: e.message,
            }
        }
    }

    public static async logout(auth: HttpContextContract['auth']): Promise<ResponseTypeDTO<undefined>> {
        try {
            await auth.use('api').logout();
            await auth.use('api').revoke()
            return {
                status: HTTP_RESPONSE_STATUS.OK,
                message: RESPONSE_MESSAGES.USER.logout
            }
        } catch (e) {
            return {
                status: HTTP_RESPONSE_STATUS.SERVER_ERROR,
                errors: e,
                message: e.message
            }
        }
    }

}