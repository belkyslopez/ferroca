import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductUpdatePageRoutingModule } from './product-update-routing.module';
import { ProductUpdatePage } from './product-update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductUpdatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductUpdatePage]
})
export class ProductUpdatePageModule {}
