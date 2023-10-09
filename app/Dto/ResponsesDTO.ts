import fs from "fs";
import path from "path";

export const RESPONSE_MESSAGES = JSON.parse(fs.readFileSync(path.join("config", "response-messages.json"), 'utf8'));

export type badRequest = {
    message: string;
}

export type ResponseTypeDTO<T> = {
    "status": number,
    "message": string,
    "errors"?: any,
    "data"?: T
}

export enum HTTP_RESPONSE_STATUS {
    CREATED = 201,
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED_ACTION = 403,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}