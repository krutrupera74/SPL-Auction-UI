import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationAddModel, OrganizationUpdateModel } from '../shared/models/organizations.model';
import { OrganizationsService } from '../shared/services/organizations.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-organizations-add',
  templateUrl: './organizations-add.component.html',
  styleUrls: ['./organizations-add.component.scss']
})
export class OrganizationsAddComponent implements OnInit {

  organizationForm: FormGroup;
  organizationAddModel: OrganizationAddModel;
  organizationUpdateModel: OrganizationUpdateModel;
  pageHeader = 'Add Organization';
  selectedOrganizationId: any;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationsService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<OrganizationsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.organizationForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      isActive: [false]
    });
    if (this.data?.mode === 'edit') {
      this.pageHeader = 'Edit Organization';
      this.selectedOrganizationId = this.data?.item.id;
      this.organizationForm.patchValue(this.data?.item);
    }
  }

  addOrganization() {
    if (this.data?.mode === 'edit') {
      this.organizationUpdateModel = this.organizationForm.value;
      this.organizationUpdateModel.id = this.selectedOrganizationId;
      this.organizationService.updateOrganization(this.organizationUpdateModel).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
          this.dialogRef.close();
        } else {
          this.snackBarService.error(res.message);
        }
      });
    } else {
      if (this.organizationForm.valid) {
        this.organizationAddModel = this.organizationForm.value;
        this.organizationService.addOrganization(this.organizationAddModel).subscribe(res => {
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}
