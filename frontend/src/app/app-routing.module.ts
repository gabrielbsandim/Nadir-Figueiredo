import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { MachinesComponent } from './components/machines/machines.component';
import { BugsComponent } from './components/bugs/bugs.component';
import { InspectionsComponent } from './components/inspections/inspections.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './shared/admin.guard';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { NewMachineComponent } from './pages/new-machine/new-machine.component';
import { NewBugComponent } from './pages/new-bug/new-bug.component';
import { NewInspectionComponent } from './pages/new-inspection/new-inspection.component';


const routes: Routes = [
  // home and login
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },

  // users
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'users/:id', component: NewUserComponent, canActivate: [AdminGuard] },

  // machines
  { path: 'machine', component: MachinesComponent, canActivate: [AdminGuard] },
  { path: 'machine/:id', component: NewMachineComponent, canActivate: [AdminGuard] },

  // bugs
  { path: 'bug', component: BugsComponent, canActivate: [AdminGuard] },
  { path: 'bug/:id', component: NewBugComponent, canActivate: [AdminGuard] },

  // inspections
  { path: 'inspection', component: InspectionsComponent, canActivate: [AdminGuard] },
  { path: 'inspection/:id', component: NewInspectionComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
