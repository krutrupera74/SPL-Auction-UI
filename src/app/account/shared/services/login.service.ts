import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginResponseModel } from '../models/login.model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ApiEndPoint: string;

  constructor(private httpClient: HttpClient) {
    this.ApiEndPoint = environment.APIEndpoint;
   }

  authenticateUser(request: any): Observable<LoginResponseModel> {
    return this.httpClient.post(this.ApiEndPoint + 'Auth/login', request).pipe(map((response => response as LoginResponseModel)));
  }
}
