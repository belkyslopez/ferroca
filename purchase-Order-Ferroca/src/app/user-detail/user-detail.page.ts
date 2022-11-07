import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { URL_SERVICIOS } from '../core/config/url.services';
import { Usuario } from '../core/interfaces/interfaces';
import { AlertService } from '../core/services/alert.service';
import { UiService } from '../core/services/ui.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  
  user: any;
  url: string = URL_SERVICIOS;
  loadingDelete: boolean = false;
  loadingUpdate : boolean = false;

  constructor(private userService: UserService,
    private uiService: UiService,
    private alertService: AlertService,
    private navCtrlr: NavController,) { }

  ngOnInit() {
    this.user = (history.state);
    console.log("ngOnInit user", this.user._id );
  }
 
  goToUpdate(user: Usuario){
    this.navCtrlr.navigateForward('/user-update', { state: user });
    console.log("user goToUpdate ===>  {state: user}", user);
   }

  async updateUser(){
    this.loadingUpdate= true;
    const valido = await this.userService.updateUser(this.user);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
     this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el usuario');
    }
    this.loadingUpdate= false;
  }

  showAlert(): void {
    this.alertService.presentAlertDelete(
      'Eliminar Usuario',
      '¿Está seguro que desea eliminar el usuario?',
      this.deleteUser.bind(this),
      'Continuar');
  }

  async deleteUser(){
    this.loadingDelete= true;
    this.user.disabled =  true
    console.log("user delete", this.user)
    const valido = await this.userService.updateUser(this.user);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
     this.cancel();
     this.navCtrlr.navigateBack('/user-register',);
    }else{
      this.uiService.presentAlert('No se elimino el usuario');
    }
  }
  
  cancel() {
    this.navCtrlr.navigateBack('/user-register', { animated: true });
  }

}
