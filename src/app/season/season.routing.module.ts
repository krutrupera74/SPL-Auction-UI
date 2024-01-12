import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSeasonComponent } from './add-season/add-season.component';

const routes: Routes = [
  { path: 'add-season', component: AddSeasonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonRoutingModule { }
