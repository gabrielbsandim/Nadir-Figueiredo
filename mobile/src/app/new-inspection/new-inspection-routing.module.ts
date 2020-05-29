import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInspectionPage } from './new-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: NewInspectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewInspectionPageRoutingModule {}
