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

  id: string;

  user: any;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService,
              private modalCtrl: ModalController,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log("carga exitosa 1");
    console.log("ngOnInit user", this.user );
   // this.cargar();
    this.user = (history.state);
    console.log("page update ", this.user);
  }

  async cargar(){
    console.log("Id de usuario: "+this.id);
    const valido = await this.userService.getUser(this.id);
    if(valido){
      this.user = this.userService.user;
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('Usuario no registrado');
    }
  }

  async updateUser(id){
    const valido = await this.userService.updateUser(1);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se modifico el usuario');
    }
  }

  async deleteUser(id){
    const valido = await this.userService.deleteUser(1);
    if(valido){
      //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el usuario');
    }
  }

}
