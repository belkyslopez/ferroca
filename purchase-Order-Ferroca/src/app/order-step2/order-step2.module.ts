import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderStep2PageRoutingModule } from './order-step2-routing.module';
import { OrderStep2Page } from './order-step2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStep2PageRoutingModule
  ],
  declarations: [OrderStep2Page]
})
export class OrderStep2PageModule {}
