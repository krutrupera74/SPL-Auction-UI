import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from './shared/services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.email]],
      employeeNo: ['', [Validators.required]],
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
    this.selectedFileUrl = this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
  }


  submitForm() {
    if (this.registerForm.valid) {
      this.addPlayerRequestModel = this.registerForm.value;
      this.addPlayerRequestModel.tournamentId = this.tournamentId;
      this.registrationService.RegisterPlayer(this.addPlayerRequestModel).subscribe(res => {
        if (res && res.success) {
          this.snackBarService.success(res.message);
          this.router.navigate(['/thank-you']);
        }
      });
    }
  }
}
