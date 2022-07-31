import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryRecordPage } from './inventory-record.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRecordPageRoutingModule {}
