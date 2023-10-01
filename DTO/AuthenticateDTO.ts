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

export {registerResponse, loginResponse, logoutResponse}