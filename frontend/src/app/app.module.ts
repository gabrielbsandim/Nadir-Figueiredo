import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { MachinesComponent } from './components/machines/machines.component';
import { BugsComponent } from './components/bugs/bugs.component';
import { InspectionsComponent } from './components/inspections/inspections.component';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { NewMachineComponent } from './pages/new-machine/new-machine.component';
import { NewBugComponent } from './pages/new-bug/new-bug.component';
import { NewInspectionComponent } from './pages/new-inspection/new-inspection.component';
import { getPaginatorIntl } from './shared/paginator-intl';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    MachinesComponent,
    BugsComponent,
    InspectionsComponent,
    LoginComponent,
    NewUserComponent,
    NewMachineComponent,
    NewBugComponent,
    NewInspectionComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
  
  ],

  providers: [{
    provide: MatPaginatorIntl, useValue: getPaginatorIntl()
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
