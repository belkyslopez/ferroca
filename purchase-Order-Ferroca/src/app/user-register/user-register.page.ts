import { Component, OnInit } from '@angular/core';
import { Usuario } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    name: 'Test',
    surname: 'test 2',
    address: 'emilio vaisse 760',
    phone: 123456778,
    rut : 265432228
  };

  id = '62e81e2606f71fd3e6fefe21';

  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService) { }

  ngOnInit() {
  }

  async register(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);
      console.log(this.registerUser);
      const valido = await this.userService.register (this.registerUser);
      if(valido){
       //  alert this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Usuario y contraseña incorrecto');
      }
    }

    async getUser( id ){
      const valido = await this.userService.getUser(this.id);
      if(valido){
       // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Usuario no registrado');
      }
    }

    async getAllUser(){
      const valido = await this.userService.getAllUser();
      if(valido){
       // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('No se encuentran registros');
      }
    }

    async updateUser(id){
      const valido = await this.userService.updateUser(this.id);
      if(valido){
       // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('No se modifico el usuario');
      }
    }

    async deleteUser(id){
      const valido = await this.userService.deleteUser(this.id);
      if(valido){
        //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('No se elimino el usuario');
      }
    }


}