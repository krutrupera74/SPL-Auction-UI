import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "../shared/services/common.service";
import { Constants } from "../shared/constants/constant";
import { LoginResponseModel } from "../account/shared/models/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const currentUserObject: LoginResponseModel = JSON.parse(this.commonService.getGlobalVariables(Constants.currentUserObject));

    if (currentUserObject === null) {
      this.router.navigate(['/login']);
      return false;
    }


    // Assume that 'role' is a property in your user object
    const userRole = currentUserObject.role;
    const allowedRole = route.data["allowedRole"] as string;

    // Modify this condition to check if the user has the allowed role
    if (allowedRole && userRole !== allowedRole) {
      this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or show an error
      return false;
    }

    return true;
  }
}