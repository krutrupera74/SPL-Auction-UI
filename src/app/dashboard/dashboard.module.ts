import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        DashboardRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [DatePipe, DecimalPipe]
})
export class DashboardModule { }
