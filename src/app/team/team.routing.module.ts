import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamAddComponent } from './team-add/team-add.component';

const routes: Routes = [
  {
      path: 'list', component: TeamListComponent
  },
  {
      path: 'add', component: TeamAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
