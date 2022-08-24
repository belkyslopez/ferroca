import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { UserRegisterPage } from './user-register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegisterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UserRegisterPage]
})
export class UserRegisterPageModule {}
