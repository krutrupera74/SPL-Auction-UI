import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { UnauthorizedComponent } from '../shared/components/unauthorized/unauthorized.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'season',
        loadChildren: () => import('../season/season.module').then(m => m.SeasonModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard],
        data: { allowedRole: 'Admin' }
      },
      {
        path: 'organizations',
        loadChildren: () => import('../organizations/organizations.module').then(m => m.OrganizationsModule),
        canActivate: [AuthGuard],
        data: { allowedRole: 'Admin' }
      },
      {
        path: 'tournaments',
        loadChildren: () => import('../tournament/tournament.module').then(m => m.TournamentModule),
        canActivate: [AuthGuard],
        data: { allowedRole: 'User' }
      },
      {
        path: 'sports',
        loadChildren: () => import('../sport/sport.module').then(m => m.SportModule),
        canActivate: [AuthGuard],
        data: { allowedRole: 'User' }
      },
      {
        path: 'teams',
        loadChildren: () => import('../team/team.module').then(m => m.TeamModule),
        canActivate: [AuthGuard],
        data: { allowedRole: 'User' }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
