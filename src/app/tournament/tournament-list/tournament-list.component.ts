import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentsList } from '../shared/models/tournament.model';
import { TournamentAddComponent } from '../tournament-add/tournament-add.component';
import { MatDialog } from '@angular/material/dialog';
import { TournamentsService } from '../shared/services/tournament.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  tournaments: any[];
  filteredTournaments: any[] = []; // Array to hold filtered sports
  searchText: string = ''; // Search text input field model
  addTournamentDialog = false;
  displayedColumns: string[] = ['Name', 'StartDate', 'EndDate', 'Description', 'Sport', 'Action'];
  @ViewChild(TournamentAddComponent) tournamentAddComponent: TournamentAddComponent;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentsService,
    private snackBarService: SnackbarService
  ) {

  }
  ngOnInit() {
    this.getAllTournaments();
  }

  getAllTournaments() {
    this.tournamentService.getAllTournaments().subscribe(res => {
      if (res && res.success) {
        this.tournaments = res.data;
        this.filteredTournaments = this.tournaments.slice();
      }
    });
  }

  // Function to filter sports based on search text
  filterTournament() {
    this.filteredTournaments = this.tournaments.filter(tournament =>
      tournament.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      tournament.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      tournament.sport.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  editTournament(data) {
    this.tournamentService.getTournamentById(data.id).subscribe(res => {
      const dialogRef = this.dialog.open(TournamentAddComponent, {
        data: { mode: 'edit', item: res.data },
        width: '900px', // Set the width as per your requirement
        height: '700px', // Set the height as per your requirement
        panelClass: 'custom-dialog-container', // Custom CSS class for styling
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllTournaments();
        // Handle any action after dialog closes
      });
    });
  }

  addTournament() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(TournamentAddComponent, {
      data: { mode: 'add' },
      width: '900px', // Set the width as per your requirement
      height: '700px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTournaments();
      // Handle any action after dialog closes
    });
  }

  deleteTournament(data) {
    this.tournamentService.deleteTournament(data.id).subscribe(res => {
      if (res && res.success) {
        this.snackBarService.success(res.message);
        this.getAllTournaments();
      } else {
        this.snackBarService.error(res.message);
      }
    });
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to delete this tournament?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTournament(data);
      }
    });
  }

}
