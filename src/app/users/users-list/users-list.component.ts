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

  users: any[];
  filteredUsers: any[] = []; // Array to hold filtered sports
  searchText: string = ''; // Search text input field model

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
        this.filteredUsers = this.users.slice();
      }
    });
  }

  // Function to filter sports based on search text
  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.organizationName.toLowerCase().includes(this.searchText.toLowerCase()) || 
      user.username.toLowerCase().includes(this.searchText.toLowerCase()) || 
      user.role.toLowerCase().includes(this.searchText.toLowerCase())
    );
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
