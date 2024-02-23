import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamRoutingModule } from './team.routing.module';

@NgModule({
    declarations: [
        TeamListComponent,
        TeamAddComponent
    ],
    imports: [
        CommonModule,
        TeamRoutingModule,
        SharedModule
    ],
    providers: []
})
export class TeamModule { }
