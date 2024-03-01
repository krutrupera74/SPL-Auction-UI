import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TournamentsList } from 'src/app/tournament/shared/models/tournament.model';
import { TeamsService } from '../shared/services/team.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TournamentAddComponent } from 'src/app/tournament/tournament-add/tournament-add.component';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.scss']
})
export class TeamAddComponent implements OnInit {
  pageHeader = 'Add Team';
  isEdit = false;
  teamForm: FormGroup;
  tournamentsList: TournamentsList[];
  selectedTeamId: any;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  @ViewChild('fileInput') fileInput: any;

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private snackBarService: SnackbarService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<TeamAddComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit() {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required]],
      tournamentId: ['', [Validators.required]],
      isActive: [false],
    });
    if (this.data?.mode === 'edit') {
      this.isEdit = true;
      this.pageHeader = 'Edit Team';
      this.selectedTeamId = this.data?.item.id;
      this.teamForm.patchValue(this.data?.item);
      this.selectedFileUrl = this.data?.item.imagePath;
    } else {
      this.isEdit = false;
    }
    this.getActiveTournaments();
  }

  getActiveTournaments() {
    this.teamsService.getActiveTournaments().subscribe(res => {
      if (res && res.success) {
        this.tournamentsList = res.data;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileUrl = this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
  }

  removeImage() {
    this.selectedFile = null;
    this.selectedFileUrl = null;
    this.errorMessage = null; // Reset error message

    this.fileInput.nativeElement.value = '';
    const event = new Event('change', { bubbles: true });
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  addTeam() {
    if (!this.isEdit) {
      if (!this.selectedFile) {
        this.errorMessage = "Please select an Image.";
      }
      if (this.teamForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('name', this.teamForm.controls['name'].value);
        formData.append('tournamentId', this.teamForm.controls['tournamentId'].value);
        formData.append('isActive', this.teamForm.controls['isActive'].value);

        this.teamsService.addTeam(formData).subscribe(res => {
          if (res && res.success) {
            this.snackBarService.success(res.message);
            this.dialogRef.close();
          } else {
            this.snackBarService.error(res.message);
          }
        });
      }
    } else {
      if (!this.selectedFileUrl) {
        this.errorMessage = "Please select an Image.";
      }
      if (this.teamForm.valid && this.selectedFileUrl) {
        const formData = new FormData();
        formData.append('image', this.selectedFile ? this.selectedFile : '');
        formData.append('imageUrl', this.selectedFileUrl?.toString());
        formData.append('name', this.teamForm.controls['name'].value);
        formData.append('tournamentId', this.teamForm.controls['tournamentId'].value);
        formData.append('isActive', this.teamForm.controls['isActive'].value);

        this.teamsService.editTeam(this.selectedTeamId, formData).subscribe(res => {
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

  b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  onIconClick(event: MouseEvent): void {
    event.stopPropagation();
    this.addTournament();
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
      this.getActiveTournaments();
      // Handle any action after dialog closes
    });
  }  
}
