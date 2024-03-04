import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing.module';
import { ThankYouComponent } from './thank-you/thank-you/thank-you.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ],
  providers: []
})
export class RegisterModule { }
