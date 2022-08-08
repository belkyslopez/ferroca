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
    //direccion: 'emilio vaisse 760',
   // telefono: 123456778,
   // rut: 265432228
  };

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
        this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Usuario y contraseña incorrecto');
      }
    }

}
