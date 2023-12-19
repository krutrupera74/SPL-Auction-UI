import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  player: any = {};

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.setPageTitle('Register');
  }

  submitForm() {
    console.log('Player Data:', this.player);
    // Add logic to save or process the player data
  }
}
