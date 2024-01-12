import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment';
import { SeasonRequest } from '../models/season.model';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn: 'root'
})
export class SeasonService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    addSeason(request: SeasonRequest): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Season/Add', request).pipe(map((response => response as ResponseModel)));
    }
}
