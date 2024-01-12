import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {

    ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    getDashboardData(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Dashboard/GetDashboardData').pipe((map((response => response as ResponseModel))));
    }

}