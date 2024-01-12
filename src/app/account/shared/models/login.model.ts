export class LoginResponseModel {
    authenticated: boolean;
    message: string;
    token: string;
    username: string;
    role: string;
}

export class loginRequestModel {
    username: string;
    password: string;
}