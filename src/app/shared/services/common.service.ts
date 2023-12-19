import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private titleService: Title) {

    }

    getGlobalVariables(key) {
        return localStorage.getItem(key);
    }

    setGlobalVariables(key, value) {
        localStorage.setItem(key, value);
    }

    setPageTitle(title) {
        this.titleService.setTitle(title);
    }
}