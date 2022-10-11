import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRegisterPage } from './order-register.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRegisterPageRoutingModule {}
