import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStep2Page } from './order-step2.page';

const routes: Routes = [
  {
    path: '',
    component: OrderStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStep2PageRoutingModule {}
