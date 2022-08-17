import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerUpdatePage } from './customer-update.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerUpdatePageRoutingModule {}
