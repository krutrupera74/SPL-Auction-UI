import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { InvalidTournamentComponent } from './shared/components/invalid-tournament/invalid-tournament.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: []
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: '',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: []
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'invalid-tournament',
    component: InvalidTournamentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
