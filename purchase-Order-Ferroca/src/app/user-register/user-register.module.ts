import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { UserRegisterPage } from './user-register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegisterPageRoutingModule,
    ReactiveFormsModule,
    SimpleMaskModule
  ],
  declarations: [UserRegisterPage]
})
export class UserRegisterPageModule {}
