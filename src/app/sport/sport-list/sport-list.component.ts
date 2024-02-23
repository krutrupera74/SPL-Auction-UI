import { Component, OnInit, ViewChild } from '@angular/core';
import { SportAddComponent } from '../sport-add/sport-add.component';
import { MatDialog } from '@angular/material/dialog';
import { SportsList } from '../shared/models/sport.model';
import { SportsService } from '../shared/services/sports.service';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss']
})
export class SportListComponent implements OnInit {
  sports: SportsList[];
  addSportDialog = false;
  displayedColumns: string[] = ['Name', 'Organization', 'IsActive', 'Action'];
  @ViewChild(SportAddComponent) sportAddComponent: SportAddComponent;

  constructor(
    private dialog: MatDialog,
    private sportsService: SportsService
  ) {

  }
  ngOnInit() {
    this.getAllSports();
  }

  getAllSports() {
    this.sportsService.getAllSports().subscribe(res => {
      if (res && res.success) {
        this.sports = res.data;
        console.log(this.sports);
        
      }
    });
  }

  editSport(data) {
    this.sportsService.getSportById(data.id).subscribe(res => {
      const dialogRef = this.dialog.open(SportAddComponent, {
        data: { mode: 'edit', item: res.data },
        width: '900px', // Set the width as per your requirement
        height: '400px', // Set the height as per your requirement
        panelClass: 'custom-dialog-container', // Custom CSS class for styling
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllSports();
        // Handle any action after dialog closes
      });
    });
  }

  addSport() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(SportAddComponent, {
      data: { mode: 'add' },
      width: '900px', // Set the width as per your requirement
      height: '400px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSports();
      // Handle any action after dialog closes
    });
  }

}
