import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationsList } from 'src/app/organizations/shared/models/organizations.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserAddModel, UserUpdateModel } from '../shared/models/users.model';
import { UsersService } from '../shared/services/users.service';
import { OrganizationsService } from 'src/app/organizations/shared/services/organizations.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  userForm: FormGroup;
  pageHeader = 'Add User';
  selectedUserId: any;
  organizationList: OrganizationsList[];
  userAddModel: UserAddModel;
  userUpdateModel: UserUpdateModel;

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private userService: UsersService,
    private organizationService: OrganizationsService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UsersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getActiveOrganizations();
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      organizationId: ['', [Validators.required]],
      isActive: [false]
    });
    if (this.data?.mode === 'edit') {
      this.pageHeader = 'Edit User';
      this.selectedUserId = this.data?.item.id;
      if (this.data && this.data.item && this.data.item.username) {
        this.data.item.username = this.commonService.decrypt(this.data.item.username);
      }
      this.userForm.patchValue(this.data?.item);
    }
  }

  getActiveOrganizations() {
    this.organizationService.getActiveOrganizations().subscribe(res => {
      if (res && res.success) {
        this.organizationList = res.data;
      }
    });
  }

  addUser() {
    if (this.data?.mode === 'edit') {
      this.userUpdateModel = this.userForm.value;
      this.userUpdateModel.id = this.selectedUserId;
      this.userUpdateModel.role = 'User';
      this.userUpdateModel.username = this.commonService.encrypt(this.userUpdateModel.username);
      this.userUpdateModel.password = this.commonService.encrypt(this.userUpdateModel.password);
      this.userService.updateUser(this.userUpdateModel).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
          this.dialogRef.close();
        } else {
          this.snackBarService.error(res.message);
        }
      });
    } else {
      if (this.userForm.valid) {
        this.userAddModel = this.userForm.value;
        this.userAddModel.role = 'User';
        this.userAddModel.username = this.commonService.encrypt(this.userAddModel.username);
        this.userAddModel.password = this.commonService.encrypt(this.userAddModel.password);
        this.userService.addUser(this.userAddModel).subscribe(res => {
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
