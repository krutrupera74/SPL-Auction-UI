import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, finalize, map } from 'rxjs/operators'
import { ErrorCodeEnum } from '../enums/enums';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    requestServiceCount = 0;    
    constructor(private loaderService: LoaderService, private snackBarService: SnackbarService) { }

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
              // window.location.reload();
              break;
            case ErrorCodeEnum.BadRequest:
                debugger;
              if (exception.error.message) {
                this.snackBarService.error(messageId + exception.error.message);
              } 
              break;
            case ErrorCodeEnum.Unauthorized:
                this.snackBarService.error(messageId + exception.error.message);              
              break;
            case ErrorCodeEnum.NotFound:
              // toaster.showErrorMessage(Constants.errorMessage404);
            //   this.router.navigate([BaseImport.Constants.pageNotFound]);
              break;
            case ErrorCodeEnum.Forbidden:
            //   this.router.navigate([BaseImport.Constants.pageNotFound]);
              break;
            case ErrorCodeEnum.InternalServerError:
            //   toaster.showErrorMessage(messageId + Constants.errorMessage500);
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
