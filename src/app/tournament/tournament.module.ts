import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TournamentRoutingModule } from './tournament.routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentAddComponent } from './tournament-add/tournament-add.component';

@NgModule({
    declarations: [
        TournamentListComponent,
        TournamentAddComponent
    ],
    imports: [
        CommonModule,
        TournamentRoutingModule,
        SharedModule
    ],
    providers: []
})
export class TournamentModule { }
