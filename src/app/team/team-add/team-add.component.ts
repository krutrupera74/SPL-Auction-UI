import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TournamentsList } from 'src/app/tournament/shared/models/tournament.model';
import { TeamsService } from '../shared/services/team.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.scss']
})
export class TeamAddComponent implements OnInit {
  pageHeader = 'Add Team';
  teamForm: FormGroup;
  tournamentsList: TournamentsList[];
  selectedTeamId: any;
  selectedImage: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<TeamAddComponent>,
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
      this.pageHeader = 'Edit Team';
      this.selectedTeamId = this.data?.item.id;
      this.teamForm.patchValue(this.data?.item);
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
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = e.target?.result;
      // Call resizeImage after the image has been loaded
      this.resizeImage(file);
    };

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 2) {
        this.errorMessage = 'File size exceeds 2MB limit.';
        return;
      }

      reader.readAsDataURL(file);
      this.teamForm.patchValue({ image: file }); // Update form control with the selected image file
    }
  }

  resizeImage(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const maxSize = 600;

        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        let aspectRatio = 1;
        if (width > height) {
          aspectRatio = maxSize / width;
          height = height * aspectRatio;
          width = maxSize;
        } else {
          aspectRatio = maxSize / height;
          width = width * aspectRatio;
          height = maxSize;
        }

        // Set canvas dimensions
        canvas.width = maxSize;
        canvas.height = maxSize;

        // Clear canvas
        ctx.clearRect(0, 0, maxSize, maxSize);

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas content to base64 data URL
        const resizedImage = canvas.toDataURL('image/jpeg');

        // Update selectedImage for preview
        this.selectedImage = resizedImage;
      };

      img.src = event.target!.result as string;
    };
    reader.readAsDataURL(file);
  }


  addTeam() {
    if (this.teamForm.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.b64toBlob(this.selectedImage));
      formData.append('name', this.teamForm.controls['name'].value);
      formData.append('tournamentId', this.teamForm.controls['tournamentId'].value);
      formData.append('isActive', this.teamForm.controls['isActive'].value);

      this.teamsService.addTeam(formData).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
        } else {
          this.snackBarService.error(res.message);
        }
      });
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
}
