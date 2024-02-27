import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { TournamentAddModel, TournamentUpdateModel } from "../models/tournament.model";

@Injectable({
    providedIn: 'root'
})

export class TournamentsService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    addTournament(request: TournamentAddModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Tournaments/Add', request).pipe(map((response => response as ResponseModel)));
    }

    getActiveSports(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Sports/GetActiveSports').pipe(map((response => response as ResponseModel)));
    }

    getAllTournaments(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Tournaments/GetAllTournaments').pipe(map((response => response as ResponseModel)));
    }

    getTournamentById(id: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Tournaments/GetTournamentById?id=' + id).pipe(map((response => response as ResponseModel)));
    }

    updateTournament(request: TournamentUpdateModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Tournaments/Edit', request).pipe(map((response => response as ResponseModel)));
    }
}