import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from './shared/services/register.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddPlayerRequestModel } from './shared/models/player.model';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Constants } from '../shared/constants/constant';
import { formatDate } from '@angular/common';

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
  dateArray: string[];
  selectedDates: string[] = [];
  emailSubject = Constants.registrationEmailSubject;
  emailTemplate = Constants.registrationEmailBody;

  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private snackBarService: SnackbarService,
    private router: Router) {
    const dateString = '01-01-2024,02-01-2024,03-01-2024';
    this.dateArray = dateString.split(',').map(date => date.trim());
  }

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
      comments: [''],
      mobileNo: ['', [Validators.required, this.mobileNumberValidator]]
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

  mobileNumberValidator(control: FormControl): ValidationErrors | null {
    const mobileRegex = /^\d{10}$/i;
    const isValid = mobileRegex.test(control.value);

    return isValid ? null : { mobileNumberError: true };
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
        this.router.navigate(['/invalid-tournament']);
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
      const selectedDatesString = this.selectedDates.join(',');
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
      formData.append('playerAvailability', selectedDatesString);
      formData.append('mobileNo', this.registerForm.controls['mobileNo'].value);
      this.registrationService.RegisterPlayer(formData).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
          this.sendEmail(this.tournamentData.name, this.registerForm.controls['name'].value, formatDate(this.tournamentData.startDate, 'dd/MM/yyyy', 'en-US'), this.tournamentData.venue);
          this.router.navigate(['/register/thank-you']);
        }
      });
    }
  }

  sendEmail(tournamentName, playerName, startDate, venue) {
    // Replace placeholders in the email template with actual values
    const selectedDatesString = this.selectedDates.join(' | ');
    let emailContent = this.emailTemplate;
    emailContent = emailContent.replace(new RegExp(`{{playerName}}`, 'g'), playerName);
    emailContent = emailContent.replace(new RegExp(`{{tournamentName}}`, 'g'), tournamentName);
    emailContent = emailContent.replace(new RegExp(`{{tournamentDate}}`, 'g'), startDate);
    emailContent = emailContent.replace(new RegExp(`{{tournamentVenue}}`, 'g'), venue);
    emailContent = emailContent.replace(new RegExp(`{{name}}`, 'g'), this.registerForm.controls['name'].value);
    emailContent = emailContent.replace(new RegExp(`{{email}}`, 'g'), this.registerForm.controls['email'].value);
    emailContent = emailContent.replace(new RegExp(`{{empNumber}}`, 'g'), this.registerForm.controls['employeeNo'].value);
    emailContent = emailContent.replace(new RegExp(`{{gender}}`, 'g'), this.registerForm.controls['gender'].value ? 'male' : 'female');
    emailContent = emailContent.replace(new RegExp(`{{batRat}}`, 'g'), this.registerForm.controls['battingRating'].value);
    emailContent = emailContent.replace(new RegExp(`{{bowlRat}}`, 'g'), this.registerForm.controls['bowlingRating'].value);
    emailContent = emailContent.replace(new RegExp(`{{wickRat}}`, 'g'), this.registerForm.controls['wicketKeepingRating'].value);
    emailContent = emailContent.replace(new RegExp(`{{batHand}}`, 'g'), this.registerForm.controls['batsmanHand'].value);
    emailContent = emailContent.replace(new RegExp(`{{bowlHand}}`, 'g'), this.registerForm.controls['bowlerHand'].value);
    emailContent = emailContent.replace(new RegExp(`{{bowlStyle}}`, 'g'), this.registerForm.controls['bowlingStyle'].value);
    emailContent = emailContent.replace(new RegExp(`{{interested}}`, 'g'), this.registerForm.controls['interestedInCaptainOrOwner'].value ? 'Yes' : 'No');
    emailContent = emailContent.replace(new RegExp(`{{capOrOwn}}`, 'g'), this.registerForm.controls['captainOrOwner'].value);
    emailContent = emailContent.replace(new RegExp(`{{comments}}`, 'g'), this.registerForm.controls['comments'].value);
    emailContent = emailContent.replace(new RegExp(`{{playerDates}}`, 'g'), selectedDatesString);
    emailContent = emailContent.replace(new RegExp(`{{mobileNumber}}`, 'g'), this.registerForm.controls['mobileNo'].value);
    
    let emailSubject = this.emailSubject;

    emailSubject = emailSubject.replace(new RegExp(`{{tournamentName}}`, 'g'), tournamentName);

    const formData = new FormData();
    formData.append('toEmail', this.registerForm.controls['email'].value);
    formData.append('subject', emailSubject);
    formData.append('body', emailContent);

    // Send the email content to the API
    this.registrationService.sendEmail(formData).subscribe(res => {
      if (res && res.success) {
        this.snackBarService.success(res.message);
      } else {
        this.snackBarService.error(res.message);
      }
    });
  }

  toggleDate(date: string) {
    // If the date is already selected, remove it; otherwise, add it
    if (this.selectedDates.includes(date)) {
      this.selectedDates = this.selectedDates.filter(d => d !== date);
    } else {
      this.selectedDates.push(date);
    }
  }
}
