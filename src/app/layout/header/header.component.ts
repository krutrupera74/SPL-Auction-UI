import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LoggedInUser: any;
  isLoading: boolean = false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private loaderService: LoaderService
    ) {

  }
  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    const currentUserObject = JSON.parse(this.commonService.getGlobalVariables(Constants.currentUserObject));
    if(currentUserObject) {
      this.LoggedInUser = this.commonService.decrypt(currentUserObject.username);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
