import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRegisterPageRoutingModule } from './order-register-routing.module';

import { OrderRegisterPage } from './order-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRegisterPageRoutingModule
  ],
  declarations: [OrderRegisterPage]
})
export class OrderRegisterPageModule {}
