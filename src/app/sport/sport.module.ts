import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SportAddComponent } from './sport-add/sport-add.component';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportRoutingModule } from './sport.routing.module';

@NgModule({
    declarations: [
        SportAddComponent,
        SportListComponent
    ],
    imports: [
        CommonModule,
        SportRoutingModule,
        SharedModule
    ],
    providers: []
})
export class SportModule { }

