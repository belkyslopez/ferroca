import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductRegistrationPage } from './product-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ProductRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRegistrationPageRoutingModule {}
