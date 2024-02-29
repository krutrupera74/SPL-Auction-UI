import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();
    private loadingCount = 0;

    constructor() { }

    showLoader(): void {        
        this.loadingCount++;
        this.isLoadingSubject.next(true);
    }

    hideLoader(): void {
        this.loadingCount--;
        if (this.loadingCount <= 0) {
            this.loadingCount = 0;
            this.isLoadingSubject.next(false);
        }
    }
}
