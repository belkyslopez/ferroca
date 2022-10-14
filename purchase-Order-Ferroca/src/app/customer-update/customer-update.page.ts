import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { AlertService } from '../core/services/alert.service';
import { Cliente } from '../core/interfaces/interfaces';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {

  customer: Cliente;
  loadingUpdate : boolean = false;

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
    }else{
      this.uiService.presentAlert('cliente no registrado');
    }
  }

  async updateClient(){
    this.loadingUpdate= true;
    const valido = await this.userService.updateClient(this.customer);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el cliente');
    }
  }

  cancel() {
    this.navCtrlr.navigateBack('/customer-register', { animated: true });
  }

}
