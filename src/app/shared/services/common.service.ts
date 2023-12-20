import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import * as CryptoJS from 'crypto-js';
import { Constants } from "../constants/constant";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    encryptSecretKey = Constants.secretKey;

    private key = CryptoJS.enc.Utf8.parse('YourSecretKey123'); // 16/24/32 bytes
    private iv = CryptoJS.enc.Utf8.parse('YourSecretKey123');

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

    encrypt(data: string): string {
        const encrypted = CryptoJS.AES.encrypt(data, this.key, { iv: this.iv });
        return encrypted.toString();
    }

}