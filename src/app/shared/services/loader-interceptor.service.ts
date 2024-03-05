import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, finalize, map } from 'rxjs/operators'
import { ErrorCodeEnum } from '../enums/enums';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  requestServiceCount = 0;
  constructor(
    private loaderService: LoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      map((response => response)),
      catchError(exception => {
        const messageId = exception.error && exception.error.Id ? exception.error.Id + ' - ' : '';
        this.loaderService.hideLoader();
        this.requestServiceCount = 0;
        switch (exception.status) {
          case ErrorCodeEnum.Unknown:
            break;
          case ErrorCodeEnum.BadRequest:
            if (exception.error.message) {
              this.snackBarService.error(messageId + exception.error.message);
            }
            break;
          case ErrorCodeEnum.Unauthorized:
            this.snackBarService.error(messageId + exception.error.message);
            this.router.navigate(['/unauthorized']);
            break;
          case ErrorCodeEnum.NotFound:
            break;
          case ErrorCodeEnum.Forbidden:
            break;
          case ErrorCodeEnum.InternalServerError:
            break;
          default:
            this.snackBarService.error(messageId + exception.error.message);
            break;
        }
        return of(exception);
      }),
      finalize(() => {
        this.requestServiceCount--;
        if (this.requestServiceCount <= 0) {
          this.loaderService.hideLoader();
        }
      })
    );
  }
}
