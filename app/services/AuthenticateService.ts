import User from "App/Models/User";
import { loginResponse, logoutResponse, registerResponse } from "DTO/AuthenticateDTO";
import badRequest from "DTO/ResponsesDTO";

export default class AuthenticateService {
    public static async register(auth, request): Promise<registerResponse | badRequest> {
        try {
            const user = await User.create({
                name: request.input('name'),
                email: request.input('email'),
                password: request.input('password'),
            });
            const token = await auth.use('api').generate(user, {
                expiresIn: '60 days'
            })

            return {
                message: "User created successfully",
                token: token.token
            }
        } catch {
            return {
                message: "User creation failed"
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