import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../guard/auth.guard';
const routes: Routes = [
    {
      path: '', component: LayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'dashboard',
          loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
          canActivate: [AuthGuard],
        },
        {
            path: 'register',
            loadChildren: () => import('../register/register.module').then(m => m.RegisterModule),
            canActivate: [AuthGuard]
        }
      ]
    }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
