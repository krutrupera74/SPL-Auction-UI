import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportAddComponent } from './sport-add/sport-add.component';

const routes: Routes = [
  {
      path: 'list', component: SportListComponent
  },
  {
      path: 'add', component: SportAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportRoutingModule { }
