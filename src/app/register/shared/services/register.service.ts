import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { AddPlayerRequestModel } from "../models/player.model";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    ValidateTournament(tournamentId: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Registration/ValidateTournament?id='+tournamentId).pipe(map((response => response as ResponseModel)));
    }

    RegisterPlayer(formData: any): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Registration/RegisterPlayer', formData).pipe(map((response => response as ResponseModel)));
    }

    sendEmail(emailBody: any): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Email/SendEmail', emailBody).pipe(map((response => response as ResponseModel)));
    }
}