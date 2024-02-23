import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { SportsAddModel, SportsUpdateModel } from "../models/sport.model";

@Injectable({
    providedIn: 'root'
})

export class SportsService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    AddSport(request: SportsAddModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Sports/AddSport', request).pipe(map((response => response as ResponseModel)));
    }

    getActiveSports(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Sports/GetActiveSports').pipe(map((response => response as ResponseModel)));
    }

    getActiveOrganizations(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Organization/GetActiveOrganizations').pipe(map((response => response as ResponseModel)));
    }

    getAllSports(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Sports/GetAllSports').pipe(map((response => response as ResponseModel)));
    }

    getSportById(id: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Sports/GetSportById?id=' + id).pipe(map((response => response as ResponseModel)));
    }

    updateSport(request: SportsUpdateModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Sports/EditSport', request).pipe(map((response => response as ResponseModel)));
    }
}