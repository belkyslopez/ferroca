import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserUpdatePageRoutingModule } from './user-update-routing.module';
import { UserUpdatePage } from './user-update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserUpdatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UserUpdatePage]
})
export class UserUpdatePageModule {}
