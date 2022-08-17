import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerUpdatePageRoutingModule } from './customer-update-routing.module';

import { CustomerUpdatePage } from './customer-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerUpdatePageRoutingModule
  ],
  declarations: [CustomerUpdatePage]
})
export class CustomerUpdatePageModule {}
