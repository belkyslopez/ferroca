import { Component, OnInit } from '@angular/core';
import { Usuario } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  registerUser: any = {};
  users: any;
  user: any;
  handlerMessage = '';
  roleMessage = '';

  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private modalCtrl: ModalController,
              ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getAllUser();
  }

  async register(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);  
      const valido = await this.userService.register (this.registerUser);
      if(valido){
     //  this.presentAlert();
      }else{
        this.uiService.presentAlert('Usuario y contraseña incorrecto');
      }
    }

   /* async getUser(){
      const valido = await this.userService.getUser(this.user._id);
      if(valido){
       // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Usuario no registrado');
      }
    }*/

    async getAllUser(){
      const valido = await this.userService.getAllUser();
      if(valido){
        this.users = this.userService.allUsers;
      }else{
        this.uiService.presentAlert('No se encuentran registros');
      }
    }

    cancel() {
      this.modalCtrl.dismiss(null, 'cancel');
      this.navCtrlr.navigateRoot('/user-register', { animated: true });
    }

    goToUpdate(user: Usuario){
     this.navCtrlr.navigateRoot('/user-update', { state: user });
     console.log("user goToUpdate ===>  {state: user}", user);
    }
}