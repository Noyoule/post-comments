// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {registerResponse, loginResponse, logoutResponse} from "DTO/AuthenticateDTO";
import AuthenticateService from "App/services/AuthenticateService";
import badRequest from "DTO/ResponsesDTO";

export default class AuthenticatesController {

    public async register({auth, request}): Promise<registerResponse|badRequest>{
      return AuthenticateService.register(auth,request)
    }
 
    
    public async login({auth, request}): Promise<loginResponse|badRequest>{
        return AuthenticateService.login(auth,request)
    }
/**
   * @swagger
   * /api/v1/logout:
   *    post:
   *       security:
   *         - bearerAuth: []
   *       summary: Logout the connected user
   *       tags:
   *         - Login_Register
   *       responses:
   *         '200':
   *            description: User disconnected
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *         '401':
   *            description: Unauthorized
   *            content:
   *              application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Unauthorized'
   * 
   */
    public async logout({auth}): Promise<logoutResponse>{
      return AuthenticateService.logout(auth)
    }
    
}
