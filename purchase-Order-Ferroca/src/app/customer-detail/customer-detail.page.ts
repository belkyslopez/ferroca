import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from '../core/config/url.services';
import { Cliente } from '../core/interfaces/interfaces';
import { AlertService } from '../core/services/alert.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  customer: Cliente;
  url: string = URL_SERVICIOS;
  loadingDelete: boolean = false;
  loadingUpdate : boolean = false;

  constructor(  private alertService: AlertService,
    private navCtrlr: NavController,
    private uiService: UiService,
    private userService: UserService,) { }

  ngOnInit() {
    this.customer = (history.state);
    console.log("Inicio customer-detail", this.customer );
  }
  
  goToUpdate(customer: Cliente){
    this.navCtrlr.navigateForward('/customer-update', { state: customer });
    console.log("user goToUpdate ===>  {state: customer}", customer);
   }

  showAlert(): void {
    this.alertService.presentAlertDelete(
      'Eliminar Cliente',
      '¿Está seguro que desea eliminar el cliente?',
      this.deleteClient.bind(this),
      'Continuar');
  }
  
  async deleteClient(){
    this.loadingDelete= true;
    this.customer.disabled =  true
    const valido = await this.userService.updateClient(this.customer);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
      this.cancel();
      this.navCtrlr.navigateBack('/customer-register',);
    }else{
      this.uiService.presentAlert('No se eliminó el cliente');
    }
  }
  
  cancel() {
    this.navCtrlr.navigateBack('/customer-register', { animated: true });
  }

}
