import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentAddComponent } from './tournament-add/tournament-add.component';

const routes: Routes = [
  {
      path: 'list', component: TournamentListComponent
  },
  {
      path: 'add', component: TournamentAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
