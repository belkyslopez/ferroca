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

 /* registerUser: Usuario = {
    email: 'test',
    password: '123456',
    name: 'Test',
    surname: 'test 2',
    address: 'emilio vaisse 760',
    phone: 123456778,
    rut : 265432228
  };*/

  id = '62e81e2606f71fd3e6fefe21';

  registerUser: any;
  users: any;
  user: any;

  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private modalCtrl: ModalController) { }

  ngOnInit() {
   // this.getAllUser();
  }

  ionViewWillEnter(){
    this.getAllUser();
  }

  async register(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);
      //console.log(this.registerUser);   
      const valido = await this.userService.register (this.registerUser);
      if(valido){

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
        this.users = this.userService.allUsers;
      //  console.log(" users", this. users.name);
       // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('No se encuentran registros');
      }
    }

    cancel() {
      this.modalCtrl.dismiss(null, 'cancel');
      this.navCtrlr.navigateRoot('/user-register', { animated: true });
    }

    goToUpdate(user: Usuario){
     // console.log("user goToUpdate ===>", user._id);
     // this.navCtrlr.navigateRoot('/user-update/'+ user + user._id);
     this.navCtrlr.navigateRoot('/user-update', {state: user});
     console.log("user goToUpdate ===>  {state: user}", user);
    }
}