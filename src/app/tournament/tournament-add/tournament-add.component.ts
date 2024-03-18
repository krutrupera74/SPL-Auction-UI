import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentAddModel, TournamentUpdateModel } from '../shared/models/tournament.model';
import { SportsList } from 'src/app/sport/shared/models/sport.model';
import { TournamentsService } from '../shared/services/tournament.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SportAddComponent } from 'src/app/sport/sport-add/sport-add.component';
import { MatDialog } from '@angular/material/dialog';
import { TournamentsList } from '../shared/models/tournament.model';
import { Subject } from 'rxjs';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.scss']
})
export class TournamentAddComponent implements OnInit {
  tournamentForm: FormGroup;
  tournamentAddModel: TournamentAddModel;
  tournamentUpdateModel: TournamentUpdateModel;
  selectedTournamentId: any;
  pageHeader = 'Add Tournament';
  sportsList: SportsList[];
  tournaments: TournamentsList[];
  isEdit = false;
  minDate = new Date();
  selectedDates: Date[] = [];
  showDateError = false;
  formattedDates: string;
  @ViewChild('picker') picker: ElementRef;

  constructor(
    private tournamentService: TournamentsService,
    private snackBarService: SnackbarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TournamentAddComponent>,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sportId: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      isActive: [false]
    });
    if (this.data?.mode === 'edit') {
      this.pageHeader = 'Edit Tournament';
      let dateString = this.data?.item?.tournamentDates.split(',')[0];
      let [day, month, year] = dateString.split('-');
      this.minDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      this.selectedTournamentId = this.data?.item.id;
      this.tournamentForm.patchValue(this.data?.item);

      var dateStrings = this.data?.item?.tournamentDates.split(',');

      // Initialize an empty array to store formatted dates
      dateStrings.forEach(dateString => {
        // Parse the date string
        var parts = dateString.split('-');
        var year = parseInt(parts[2]);
        var month = parseInt(parts[1]) - 1; // months are 0-indexed in JavaScript
        var day = parseInt(parts[0]);

        // Create a Date object
        var date = new Date(year, month, day);

        // Push the formatted date into the array
        this.selectedDates.push(date);
      });

      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.getActiveSports();
  }

  getCellFromDate(date: Date): HTMLElement | null {
    const calendar = this.picker['_matCalendarBody']?._el.nativeElement.querySelector('.mat-calendar-table');
    const cells = calendar.querySelectorAll('.mat-calendar-body-cell');
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i] as HTMLElement;
      const cellDate = new Date(cell.getAttribute('aria-label'));
      if (cellDate.toDateString() === date.toDateString()) {
        return cell;
      }
    }
    return null;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getActiveSports() {
    this.tournamentService.getActiveSports().subscribe(res => {
      if (res && res.success) {
        this.sportsList = res.data;
      }
    });
  }

  getAllTournaments() {
    this.tournamentService.getAllTournaments().subscribe(res => {
      if (res && res.success) {
        this.tournaments = res.data;
      }
    });
  }

  formatDates() {
    this.formattedDates = this.selectedDates.map(date => this.datePipe.transform(date, 'dd-MM-yyyy')).join(',');
  }

  addTournament() {
    if (this.selectedDates && this.selectedDates.length <= 0) {
      this.showDateError = true;
      return;
    } else {
      this.showDateError = false;
      this.formatDates();
    }

    if (this.isEdit) {
      if (this.tournamentForm.valid) {
        this.tournamentUpdateModel = this.tournamentForm.value;
        this.tournamentUpdateModel.id = this.selectedTournamentId;
        this.tournamentUpdateModel.tournamentDates = this.formattedDates;
        this.tournamentService.updateTournament(this.tournamentUpdateModel).subscribe(res => {
          if (res && res.success) {
            this.snackBarService.success(res.message);
            this.dialogRef.close();
          } else {
            this.snackBarService.error(res.message);
          }
        });
      }
    } else {
      if (this.tournamentForm.valid) {
        this.tournamentAddModel = this.tournamentForm.value;
        this.tournamentAddModel.tournamentDates = this.formattedDates;
        this.tournamentService.addTournament(this.tournamentAddModel).subscribe(res => {
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

  onIconClick(event: MouseEvent): void {
    event.stopPropagation();
    this.addSport();
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
      this.getActiveSports();
      // Handle any action after dialog closes
    });
  }
  onDateChange() {
    if (this.selectedDates && this.selectedDates.length > 0) {
      this.showDateError = false;
    } else {
      this.showDateError = true;
    }
  }
}
