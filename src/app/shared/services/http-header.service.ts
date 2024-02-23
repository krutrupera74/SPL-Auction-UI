import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class HttpClientHeader {

    constructor(private httpClient: HttpClient, private commonService: CommonService) { }

    // tslint:disable-next-line:typedef
    createAuthorizationHeader(anonymous: boolean, allowMultipart?: boolean) {
        return this.commonService.getHeaders(anonymous, allowMultipart);
    }

    // tslint:disable-next-line:typedef
    get(url, params?, anonymous?) {
        let headers = new HttpHeaders();
        headers = this.createAuthorizationHeader(anonymous);
        // tslint:disable-next-line:object-literal-shorthand
        return this.httpClient.get(url, { headers: headers, params: params });
    }

    // tslint:disable-next-line:typedef
    post(url, data, anonymous?, allowMultipart?) {

        let headers = new HttpHeaders();
        headers = this.createAuthorizationHeader(anonymous, allowMultipart);
        return this.httpClient.post(url, data, {
            // tslint:disable-next-line:object-literal-shorthand
            headers: headers
        });
    }

    // tslint:disable-next-line:typedef
    put(url, data, anonymous?) {
        let headers = new HttpHeaders();
        headers = this.createAuthorizationHeader(anonymous);
        return this.httpClient.put(url, data, {
            // tslint:disable-next-line:object-literal-shorthand
            headers: headers
        });
    }
    // tslint:disable-next-line:typedef
    patch(url, data, anonymous?) {
        let headers = new HttpHeaders();
        headers = this.createAuthorizationHeader(anonymous);
        return this.httpClient.patch(url, data, {
            // tslint:disable-next-line:object-literal-shorthand
            headers: headers
        });
    }
    // tslint:disable-next-line:typedef
    delete(url, anonymous?) {
        let headers = new HttpHeaders();
        headers = this.createAuthorizationHeader(anonymous);
        return this.httpClient.delete(url, {
            // tslint:disable-next-line:object-literal-shorthand
            headers: headers
        });
    }
}
