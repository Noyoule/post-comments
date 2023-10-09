import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticateService from "App/services/AuthenticateService";
import UserValidator from 'App/Validators/UserValidator';
import { badRequest, LoggerInDto, loginResponse, logoutResponse, ResponseTypeDTO } from 'app/Dto';

export default class AuthenticatesController {

    public async register(ctx: HttpContextContract){
      const {auth, request,response} = ctx
      const validator = new UserValidator(ctx)
      const data = await request.validate(validator)
      const result: ResponseTypeDTO<LoggerInDto|undefined> = await AuthenticateService.register(auth,data)
      response.status(result.status).send(result)
    }
 

    public async login({auth, request}): Promise<loginResponse|badRequest>{
        return AuthenticateService.login(auth,request)
    }


    public async logout({auth}): Promise<logoutResponse>{
      return AuthenticateService.logout(auth)
    }
    
}
