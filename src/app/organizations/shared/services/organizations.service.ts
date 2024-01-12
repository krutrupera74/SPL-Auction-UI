import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { OrganizationAddModel, OrganizationUpdateModel } from "../models/organizations.model";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";

@Injectable({
    providedIn: 'root'
})

export class OrganizationsService {

    private ApiEndPoint: string;

    constructor(private httpClient: HttpClient) {
        this.ApiEndPoint = environment.APIEndpoint;
    }

    addOrganization(request: OrganizationAddModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Organization/Add', request).pipe(map((response => response as ResponseModel)));
    }

    updateOrganization(request: OrganizationUpdateModel): Observable<ResponseModel> {
        return this.httpClient.post(this.ApiEndPoint + 'Organization/Edit', request).pipe(map((response => response as ResponseModel)));
    }

    getOrganizations(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Organization/GetAllOrganizations').pipe(map((response => response as ResponseModel)));
    }

    getActiveOrganizations(): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Organization/GetActiveOrganizations').pipe(map((response => response as ResponseModel)));
    }

    getOrganizationById(id: string): Observable<ResponseModel> {
        return this.httpClient.get(this.ApiEndPoint + 'Organization/GetOrganizationById?id=' + id).pipe(map((response => response as ResponseModel)));
    }
}