import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrganizationsAddComponent } from './organizations-add/organizations-add.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';


@NgModule({
    imports: [
        OrganizationsRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        OrganizationsAddComponent,
        OrganizationsListComponent
    ],
    providers: []
})
export class OrganizationsModule { }
