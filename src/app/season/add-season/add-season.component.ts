import { Component, OnInit } from '@angular/core';
import { SeasonRequest } from '../shared/models/season.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasonService } from '../shared/services/season.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.scss']
})
export class AddSeasonComponent implements OnInit {

  addSeasonForm: FormGroup;
  imageUrl: string;
  seasonRequest: SeasonRequest;

  constructor(
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private snackBarService: SnackbarService
  ) {

  }
  ngOnInit() {
    this.addSeasonForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
      isActive: [false],
      image: [null, [Validators.required]]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const fileSize = Math.round(file.size / 1024); // in KB

      if (fileSize <= 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.addSeasonForm.patchValue({ image: file });
      } else {
        // File size exceeds the limit
        this.addSeasonForm.get('image').setErrors({ maxFileSizeExceeded: true });
      }
    }
  }

  uploadImage(): void {
    // Perform the image upload logic here
    const file: File = this.addSeasonForm.get('image').value;
    console.log(file);

    // Reset form and preview after successful upload
    this.addSeasonForm.reset();
    this.imageUrl = null;
  }

  addSeason() {
    if (this.addSeasonForm.valid) {
      this.seasonRequest = this.addSeasonForm.value;
      console.log(this.addSeasonForm.value);
      this.seasonService.addSeason(this.seasonRequest).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
        } else {
          this.snackBarService.error(res.message);
        }
      });
    }
  }
}
