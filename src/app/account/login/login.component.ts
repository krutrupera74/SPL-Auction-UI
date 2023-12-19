import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  onSubmit() {
    const loginResponseModel = {
      email: this.email,
      password: this.password
    };
    this.commonService.setGlobalVariables(Constants.currentUserObject, loginResponseModel);
    this.router.navigate(['/dashboard']);
  }
}
