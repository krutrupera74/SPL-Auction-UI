import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from './shared/services/register.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddPlayerRequestModel } from './shared/models/player.model';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Constants } from '../shared/constants/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  tournamentId: string;
  player: any = {};
  isTournamentValid = null;
  tournamentData: any;
  loading = true;
  addPlayerRequestModel: AddPlayerRequestModel;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = './../../assets/images/shared/avatar.png';
  isCricket = false;
  errorMessage: string | null = null;
  @ViewChild('fileInput') fileInput: any;

  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.commonService.setPageTitle('Register');
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, this.synoptekEmailValidator]],
      employeeNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      gender: [true, [Validators.required]],
      playerRating: [0],
      battingRating: [0],
      bowlingRating: [0],
      wicketKeepingRating: [0],
      batsmanHand: ['', [Validators.required]],
      bowlerHand: ['', [Validators.required]],
      bowlingStyle: ['', [Validators.required]],
      interestedInCaptainOrOwner: [false],
      captainOrOwner: ['captain'],
      comments: ['']
    });
    this.registerForm.get('interestedInCaptainOrOwner').valueChanges.subscribe(checked => {
      if (!checked) {
        this.registerForm.get('captainOrOwner').setValue('captain');
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.tournamentId = params['tournamentId'];
      if (this.tournamentId) {
        this.validateTournament(this.tournamentId);
      }
    });
  }

  synoptekEmailValidator(control: FormControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@synoptek\.com$/i;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { synoptekEmail: true };
  }

  validateTournament(tournamentId) {
    this.registrationService.ValidateTournament(tournamentId).subscribe(res => {
      if (res && res.success) {
        this.isTournamentValid = true;
        this.tournamentData = res.data;
        this.isCricket = this.tournamentData.isCricket;
        this.loading = false;
      } else {
        this.isTournamentValid = false;
        this.isCricket = false;
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileUrl = this.selectedFile ? URL.createObjectURL(this.selectedFile) : './../../assets/images/shared/avatar.png';
  }


  submitForm() {
    if (!this.selectedFile) {
      this.errorMessage = "Please select an Image.";
      return;
    }
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('name', this.registerForm.controls['name'].value);
      formData.append('email', this.registerForm.controls['email'].value);
      formData.append('employeeNo', this.registerForm.controls['employeeNo'].value);
      formData.append('gender', this.registerForm.controls['gender'].value);
      formData.append('playerRating', this.registerForm.controls['playerRating'].value);
      formData.append('battingRating', this.registerForm.controls['battingRating'].value);
      formData.append('bowlingRating', this.registerForm.controls['bowlingRating'].value);
      formData.append('wicketKeepingRating', this.registerForm.controls['wicketKeepingRating'].value);
      formData.append('batsmanHand', this.registerForm.controls['batsmanHand'].value);
      formData.append('bowlerHand', this.registerForm.controls['bowlerHand'].value);
      formData.append('bowlingStyle', this.registerForm.controls['bowlingStyle'].value);
      formData.append('interestedInCaptainOrOwner', this.registerForm.controls['interestedInCaptainOrOwner'].value);
      formData.append('captainOrOwner', this.registerForm.controls['captainOrOwner'].value);
      formData.append('comments', this.registerForm.controls['comments'].value);
      formData.append('tournamentId', this.tournamentId);
      this.registrationService.RegisterPlayer(formData).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
          this.router.navigate(['/register/thank-you']);
        }
      });
    }
  }
}
