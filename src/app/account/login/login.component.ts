import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private loginService: LoginService
  ) { }

  onSubmit() {
    const loginRequestModel = {
      username: this.commonService.encrypt(this.username),
      password: this.commonService.encrypt(this.password)
      // username: this.username,
      // password: this.password
    };

    this.loginService.authenticateUser(loginRequestModel).subscribe(res => {
      console.log(res);
      this.commonService.setGlobalVariables(Constants.currentUserObject, res);
      if (res.authenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
