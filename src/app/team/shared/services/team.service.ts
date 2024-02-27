import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";

@Injectable({
    providedIn: 'root'
})

export class TeamsService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    getAllTeams(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Teams/GetAllTeams').pipe(map((response => response as ResponseModel)));
    }

    getActiveTournaments(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Tournaments/GetActiveTournaments').pipe(map((response => response as ResponseModel)));
    }

    addTeam(formData: any) {
        return this.httpClient.post(this.ApiEndPoint + 'Teams/AddTeam', formData)
            .pipe(map((response => response as ResponseModel)));
    }

    editTeam(formData: any) {
        return this.httpClient.post(this.ApiEndPoint + 'Teams/EditTeam', formData)
            .pipe(map((response => response as ResponseModel)));
    }

    getTeamById(id: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Teams/GetTeamById?id=' + id)
            .pipe(map((response => response as ResponseModel)));
    }
}