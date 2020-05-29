import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/shared/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AdminGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'newInspection',
    canActivate: [AdminGuard],
    loadChildren: () => import('./new-inspection/new-inspection.module').then( m => m.NewInspectionPageModule)
  },
  {
    path: 'login',
    canActivate: [AdminGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
