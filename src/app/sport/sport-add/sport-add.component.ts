import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SportsService } from '../shared/services/sports.service';
import { OrganizationsList } from 'src/app/organizations/shared/models/organizations.model';
import { SportsAddModel, SportsUpdateModel } from '../shared/models/sport.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { Constants } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-sport-add',
  templateUrl: './sport-add.component.html',
  styleUrls: ['./sport-add.component.scss']
})
export class SportAddComponent implements OnInit {
  pageHeader = 'Add Sport';
  sportForm: FormGroup;
  sportAddModel: SportsAddModel;
  sportUpdateModel: SportsUpdateModel;
  selectedSportId: any;

  constructor(
    private sportService: SportsService,
    private snackBarService: SnackbarService,
    private fb: FormBuilder,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<SportAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.sportForm = this.fb.group({
      name: ['', [Validators.required]],
      isActive: [false]
    });
    if (this.data?.mode === 'edit') {
      this.pageHeader = 'Edit Sport';
      this.selectedSportId = this.data?.item.id;
      this.sportForm.patchValue(this.data?.item);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addSport() {
    const currentUserObject = JSON.parse(this.commonService.getGlobalVariables(Constants.currentUserObject));
    if (this.data?.mode === 'edit') {
      if (this.sportForm.valid) {
        this.sportUpdateModel = this.sportForm.value;
        this.sportUpdateModel.id = this.selectedSportId;
        if(currentUserObject) {
          this.sportUpdateModel.organizationId = currentUserObject.organizationId;
        }
        this.sportService.updateSport(this.sportUpdateModel).subscribe(res => {
          if (res && res.success) {
            this.snackBarService.success(res.message);
            this.dialogRef.close();
          } else {
            this.snackBarService.error(res.message);
          }
        });
      }
    } else {
      if (this.sportForm.valid) {
        this.sportAddModel = this.sportForm.value;
        if(currentUserObject) {
          this.sportAddModel.organizationId = currentUserObject.organizationId;
        }
        this.sportService.AddSport(this.sportAddModel).subscribe(res => {
          if (res && res.success) {
            this.snackBarService.success(res.message);
            this.dialogRef.close();
          } else {
            this.snackBarService.error(res.message);
          }
        });
      }
    }
  }
}
