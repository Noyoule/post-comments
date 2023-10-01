// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {registerResponse, loginResponse, logoutResponse} from "DTO/AuthenticateDTO";
import AuthenticateService from "App/services/AuthenticateService";
import badRequest from "DTO/ResponsesDTO";

export default class AuthenticatesController {

    /**
   * @swagger
   * /api/v1/register:
   *    post:
   *       summary: Create a new user
   *       tags:
   *         - Login_Register
   *       requestBody:
   *          description: A json object to create the user
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  email:
   *                    type: string
   *                  name:
   *                    type: string
   *                  password:
   *                    type: string
   *       responses:
   *         '200':
   *            description: User created
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *                    token:
   *                      type: string
   *         '400':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   * 
   */
    public async register({auth, request}): Promise<registerResponse|badRequest>{
      return AuthenticateService.register(auth,request)
    }
 /**
   * @swagger
   * /api/v1/login:
   *    post:
   *       summary: Connect a user
   *       tags:
   *         - Login_Register
   *       requestBody:
   *          description: A json object to connect the user
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  email:
   *                    type: string
   *                  password:
   *                    type: string
   *       responses:
   *         '200':
   *            description: User logged in
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *                    token:
   *                      type: string
   *         '400':
   *            description: Bad request
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   * 
   */
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
   *                  type: object
   *                  properties:
   *                    errors:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          message:
   *                            type: string
   * 
   */
    public async logout({auth}): Promise<logoutResponse>{
      return AuthenticateService.logout(auth)
    }
}
