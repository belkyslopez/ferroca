import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustormerRegisterPageRoutingModule } from './custormer-register-routing.module';

import { CustormerRegisterPage } from './custormer-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustormerRegisterPageRoutingModule
  ],
  declarations: [CustormerRegisterPage]
})
export class CustormerRegisterPageModule {}
