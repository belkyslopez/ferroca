import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductRegistrationPageRoutingModule } from './product-registration-routing.module';

import { ProductRegistrationPage } from './product-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductRegistrationPageRoutingModule
  ],
  declarations: [ProductRegistrationPage]
})
export class ProductRegistrationPageModule {}
