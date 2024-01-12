import { Component } from '@angular/core';
import { UsersList } from '../shared/models/users.model';
import { UsersService } from '../shared/services/users.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: UsersList[];

  displayedColumns: string[] = ['Username', 'OrganizationName', 'Role', 'Is Active', 'Action'];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      if (res && res.success) {
        res.data.forEach(element => {
          element.username = this.commonService.decrypt(element.username);
        });
        this.users = res.data;
      }
    });
  }

  addUser() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(UsersAddComponent, {
      data: { mode: 'add' },
      width: '700px', // Set the width as per your requirement
      height: '500px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
      // Handle any action after dialog closes
    });
  }

  editUser(data) { 
    this.usersService.getUserById(data.id).subscribe(res => {
      const dialogRef = this.dialog.open(UsersAddComponent, {
        data: { mode: 'edit', item: res.data },
        width: '700px', // Set the width as per your requirement
        height: '500px', // Set the height as per your requirement
        panelClass: 'custom-dialog-container', // Custom CSS class for styling
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllUsers();
        // Handle any action after dialog closes
      });
    });
  }

}
