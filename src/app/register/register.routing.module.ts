import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ThankYouComponent } from './thank-you/thank-you/thank-you.component';

const routes: Routes = [
  { path: 'thank-you', component: ThankYouComponent },
  { path: ':tournamentId', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
