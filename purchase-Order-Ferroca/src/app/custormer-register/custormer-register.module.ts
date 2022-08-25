import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustormerRegisterPageRoutingModule } from './custormer-register-routing.module';
import { CustormerRegisterPage } from './custormer-register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustormerRegisterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CustormerRegisterPage]
})
export class CustormerRegisterPageModule {}
