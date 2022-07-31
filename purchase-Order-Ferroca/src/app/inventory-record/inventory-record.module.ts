import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryRecordPageRoutingModule } from './inventory-record-routing.module';

import { InventoryRecordPage } from './inventory-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryRecordPageRoutingModule
  ],
  declarations: [InventoryRecordPage]
})
export class InventoryRecordPageModule {}
