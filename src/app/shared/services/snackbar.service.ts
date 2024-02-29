// snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private defaultTimeout = 3000; // Default timeout in milliseconds

    constructor(private snackBar: MatSnackBar) { }

    private openSnackbar(message: string, panelClass: string, timeout?: number): void {
        const config: MatSnackBarConfig = {
            duration: timeout || this.defaultTimeout,
            panelClass: [panelClass],
            horizontalPosition: 'end',
            verticalPosition: 'top'
        };

        this.snackBar.open(message, 'Close', config);
    }

    success(message: string, timeout?: number): void {
        this.openSnackbar(message, 'success-snackbar', timeout);
    }

    info(message: string, timeout?: number): void {
        this.openSnackbar(message, 'info-snackbar', timeout);
    }

    warning(message: string, timeout?: number): void {
        this.openSnackbar(message, 'warning-snackbar', timeout);
    }

    error(message: string, timeout?: number): void {
        this.openSnackbar(message, 'error-snackbar', timeout);
    }
}
