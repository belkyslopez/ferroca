import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventoryRecordPageRoutingModule } from './inventory-record-routing.module';
import { InventoryRecordPage } from './inventory-record.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryRecordPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InventoryRecordPage]
})
export class InventoryRecordPageModule {}
