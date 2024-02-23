import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DefaultOptionDirective } from './directives/default-option.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        DefaultOptionDirective,
        UnauthorizedComponent,
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTableModule,
        NgxMatSelectSearchModule,
        MatDialogModule,
        MatRadioModule
    ],
    exports: [
        FormsModule,
        DefaultOptionDirective,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTableModule,
        NgxMatSelectSearchModule,
        MatDialogModule,
        MatRadioModule
    ]
})
export class SharedModule { }
