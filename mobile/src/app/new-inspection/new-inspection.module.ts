import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewInspectionPageRoutingModule } from './new-inspection-routing.module';

import { NewInspectionPage } from './new-inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewInspectionPageRoutingModule
  ],
  declarations: [NewInspectionPage]
})
export class NewInspectionPageModule {}
