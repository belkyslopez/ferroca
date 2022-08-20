import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {

  customer: any;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService,
              private modalCtrl: ModalController,
              private alertService: AlertService) { 
              }

  ngOnInit() {
    this.customer = (history.state);
    console.log("ngOnInit customer", this.customer._id );
    console.log("page customer update ", this.customer);
  }

  async getClient(){
    const valido = await this.userService.getUser(this.customer._id);
    if(valido){
     //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('cliente no registrado');
    }
  }

  async updateClient(){
    const valido = await this.userService.updateClient(this.customer);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el cliente');
    }
  }

  
  async deleteClient(){
    const valido = await this.userService.deleteClient(this.customer._id);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se elimino el cliente');
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.navCtrlr.navigateRoot('/customer-register', { animated: true });
  }

}
