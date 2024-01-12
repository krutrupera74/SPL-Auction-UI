import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsAddComponent } from './organizations-add/organizations-add.component';
const routes: Routes = [
    {
        path: 'list', component: OrganizationsListComponent
    },
    {
        path: 'add', component: OrganizationsAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
