import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationsService } from '../shared/services/organizations.service';
import { OrganizationsList } from '../shared/models/organizations.model';
import { OrganizationsAddComponent } from '../organizations-add/organizations-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {

  organizations: OrganizationsList[];
  addOrganizationDialog = false;
  displayedColumns: string[] = ['Name', 'IsActive', 'Action'];
  @ViewChild(OrganizationsAddComponent) organizationsAddComponent: OrganizationsAddComponent;

  constructor(
    private organiationService: OrganizationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllOrganizations();
  }

  getAllOrganizations() {
    this.organiationService.getOrganizations().subscribe(res => {
      if (res && res.success) {
        this.organizations = res.data;
      }
    });
  }

  editOrganization(data) {
    this.organiationService.getOrganizationById(data.id).subscribe(res => {
      const dialogRef = this.dialog.open(OrganizationsAddComponent, {
        data: { mode: 'edit', item: res.data },
        width: '500px', // Set the width as per your requirement
        height: '400px', // Set the height as per your requirement
        panelClass: 'custom-dialog-container', // Custom CSS class for styling
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllOrganizations();
        // Handle any action after dialog closes
      });
    });
  }

  addOrganization() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(OrganizationsAddComponent, {
      data: { mode: 'add' },
      width: '500px', // Set the width as per your requirement
      height: '400px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllOrganizations();
      // Handle any action after dialog closes
    });
  }

}
