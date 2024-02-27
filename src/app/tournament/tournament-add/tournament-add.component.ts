import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TournamentAddModel, TournamentUpdateModel } from '../shared/models/tournament.model';
import { SportsList } from 'src/app/sport/shared/models/sport.model';
import { TournamentsService } from '../shared/services/tournament.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

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

  constructor(
    private tournamentService: TournamentsService,
    private snackBarService: SnackbarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TournamentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sportId: ['', [Validators.required]],
      isActive: [false]
    });
    if (this.data?.mode === 'edit') {
      this.pageHeader = 'Edit Tournament';
      this.selectedTournamentId = this.data?.item.id;
      this.tournamentForm.patchValue(this.data?.item);
    }
    this.getActiveSports();
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

  addTournament() {
    if (this.data?.mode === 'edit') {
      if (this.tournamentForm.valid) {
        this.tournamentUpdateModel = this.tournamentForm.value;
        this.tournamentUpdateModel.id = this.selectedTournamentId;
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
}