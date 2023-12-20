import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginResponseModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(request: any): Observable<LoginResponseModel> {
    return this.httpClient.post('https://localhost:7127/api/Auth/login', request).pipe(map((response => response as LoginResponseModel)));
  }
}
