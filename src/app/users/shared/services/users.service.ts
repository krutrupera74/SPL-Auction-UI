import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { UserAddModel, UserUpdateModel } from "../models/users.model";
import { HttpClientHeader } from "src/app/shared/services/http-header.service";

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClientHeader) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    getUsers(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'User/GetAllUsers').pipe(map((response => response as ResponseModel)));
    }

    addUser(request: UserAddModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'User/Add', request).pipe(map((response => response as ResponseModel)));
    }

    updateUser(request: UserUpdateModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'User/Edit', request).pipe(map((response => response as ResponseModel)));
    }

    getUserById(id: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'User/GetUserById?id=' + id).pipe(map((response => response as ResponseModel)));
    }
}