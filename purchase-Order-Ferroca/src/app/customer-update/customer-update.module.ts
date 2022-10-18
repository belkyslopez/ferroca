import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomerUpdatePageRoutingModule } from './customer-update-routing.module';
import { CustomerUpdatePage } from './customer-update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerUpdatePageRoutingModule,
    ReactiveFormsModule,
    SimpleMaskModule
  ],
  declarations: [CustomerUpdatePage]
})
export class CustomerUpdatePageModule {}
