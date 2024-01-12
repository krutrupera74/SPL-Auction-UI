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

    defaultSelectValue = 0;
    pleaseSelectOption = { value: this.defaultSelectValue, label: 'Please Select ...' };

    constructor(private titleService: Title) {

    }

    getGlobalVariables(key) {
        const cipherText = localStorage.getItem(key);
        if (!cipherText) {
            return null;
        }
        return localStorage.getItem(key);
    }

    setGlobalVariables(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        } else if (value) {
            value = value.toString();
        }
        localStorage.setItem(key, value);
    }

    setPageTitle(title) {
        this.titleService.setTitle(title);
    }

    encrypt(data: string): string {
        const encrypted = CryptoJS.AES.encrypt(data, this.key, { iv: this.iv });
        return encrypted.toString();
    }


    decrypt(cipherText: string): string {
        const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, { iv: this.iv });
        let plainText = '';
        if (decrypted.toString()) {
            plainText = decrypted.toString(CryptoJS.enc.Utf8);
          }
        return plainText;
    }

}