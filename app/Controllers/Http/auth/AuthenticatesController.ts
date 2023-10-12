import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticateService from "App/services/AuthenticateService";
import UserValidator from 'App/Validators/UserValidator';
import { LoggerInDto, ResponseTypeDTO } from 'app/Dto';
import UserLoginValidator from 'App/Validators/UserLoginValidator';

export default class AuthenticatesController {

  public async register(ctx: HttpContextContract) {
    const { auth, request, response } = ctx
    const validator = new UserValidator(ctx)
    const data = await request.validate(validator)
    const result: ResponseTypeDTO<LoggerInDto | undefined> = await AuthenticateService.register(auth, data)
    response.status(result.status).send(result)
  }


  public async login(ctx: HttpContextContract) {
    const { auth, request, response } = ctx
    const validator = new UserLoginValidator(ctx)
    const data = await request.validate(validator)
    const result: ResponseTypeDTO<LoggerInDto | undefined> = await AuthenticateService.login(auth, data)
    response.status(result.status).send(result)
  }


  public async logout(ctx: HttpContextContract) {
    const { auth, response } = ctx
    const result: ResponseTypeDTO<undefined> = await AuthenticateService.logout(auth)
    response.status(result.status).send(result)
  }

}
