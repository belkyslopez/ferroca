import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';

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
              private alertService: AlertService) {
               }

  ngOnInit() {
    console.log("carga exitosa 1");
    this.user = (history.state);
    console.log("ngOnInit user", this.user._id );
    console.log("page update ", this.user);
  }
  
  ionViewWillEnter(){
  }

  async updateUser(){
    const valido = await this.userService.updateUser(this.user);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
     this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el usuario');
    }
  }

  async deleteUser(){
    const valido = await this.userService.deleteUser(this.user._id);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se elimino el usuario');
    }
  }
  
  cancel() {
    this.navCtrlr.navigateBack('/user-register', { animated: true });
  }

}
