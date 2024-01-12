import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';


@NgModule({
    imports: [
        UsersRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        UsersListComponent,
        UsersAddComponent
    ],
    providers: []
})
export class UsersModule { }
