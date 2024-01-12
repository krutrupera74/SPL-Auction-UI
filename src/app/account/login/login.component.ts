import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoginService } from '../shared/services/login.service';
import { loginRequestModel } from '../shared/models/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SelectModel } from 'src/app/shared/models/select.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: loginRequestModel;
  organizationList: SelectModel[];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      this.loginRequest = this.loginForm.value;
      this.loginRequest.username = this.commonService.encrypt(this.loginRequest.username);
      this.loginRequest.password = this.commonService.encrypt(this.loginRequest.password);
      this.loginService.authenticateUser(this.loginRequest).subscribe(res => {
        if (res && res.authenticated) {
          this.snackBarService.success(res.message);
          this.commonService.setGlobalVariables(Constants.currentUserObject, res);
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBarService.error(res.message);
        }
      });
    }
  }
}
