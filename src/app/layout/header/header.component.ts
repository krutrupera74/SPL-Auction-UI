import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LoggedInUser: any;
  constructor(
    private commonService: CommonService,
    private router: Router
    ) {

  }
  ngOnInit(): void {
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
