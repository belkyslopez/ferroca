import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';


@Component({
  selector: 'app-custormer-register',
  templateUrl: './custormer-register.page.html',
  styleUrls: ['./custormer-register.page.scss'],
})
export class CustormerRegisterPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  registerCliente: any = {};
  customers: any;
  customer: any;

  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private modalCtrl: ModalController,
               private alertService: AlertService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllClient();
  }

  async registerClient(fRegisterC: NgForm){
    if(fRegisterC.invalid) { return;}
      console.log(fRegisterC.valid);
      const valido = await this.userService.registerCliente(this.registerCliente);
      if(valido){
        this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
        this.modalCtrl.dismiss(null, 'cancel');
      }else{
        this.uiService.presentAlert('complete el formulario');
      }
  }

  async getAllClient(){
    const valido = await this.userService.getAllClient();
    if(valido){
      this.customers = this.userService.allClient;
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se encuentran registros');
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  goToUpdate(customer: Cliente){
    this.navCtrlr.navigateRoot('/customer-update', { state: customer });
    console.log("user goToUpdate ===>  {state: customer}", customer);
   }
}
