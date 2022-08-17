import { Component, OnInit } from '@angular/core';
import { Usuario } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {

  user: any;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService,
              private modalCtrl: ModalController,
              private activatedRoute: ActivatedRoute) {
               }

  ngOnInit() {
    console.log("carga exitosa 1");
    this.user = (history.state);
    console.log("ngOnInit user", this.user._id );
    console.log("page update ", this.user);
  }
  
  ionViewWillEnter(){
  }

 /* async cargar(){
    console.log("Id de usuario: "+this.id);
    const valido = await this.userService.getUser(this.user_id );
    if(valido){
      this.user = this.userService.user;
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('Usuario no registrado');
    }
  }*/

  async updateUser(){
    const valido = await this.userService.updateUser(this.user);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se modifico el usuario');
    }
  }

  async deleteUser(){
    const valido = await this.userService.deleteUser(this.user._id);
    if(valido){
      //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el usuario');
    }
  }

}
