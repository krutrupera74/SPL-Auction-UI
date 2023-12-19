import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "../shared/services/common.service";
import { Constants } from "../shared/constants/constant";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard {
  
    constructor(
      private router: Router,
      private commonService: CommonService
      ) { }
    canActivate():
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (this.commonService.getGlobalVariables(Constants.currentUserObject) == null) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }