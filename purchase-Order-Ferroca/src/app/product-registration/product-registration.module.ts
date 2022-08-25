import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductRegistrationPageRoutingModule } from './product-registration-routing.module';
import { ProductRegistrationPage } from './product-registration.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductRegistrationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductRegistrationPage]
})
export class ProductRegistrationPageModule {}
