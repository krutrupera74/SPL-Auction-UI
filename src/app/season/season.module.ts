import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddSeasonComponent } from './add-season/add-season.component';
import { SeasonRoutingModule } from './season.routing.module';


@NgModule({
  declarations: [
    AddSeasonComponent
  ],
  imports: [
    CommonModule,
    SeasonRoutingModule,
    SharedModule
  ],
  providers: []
})
export class SeasonModule { }
