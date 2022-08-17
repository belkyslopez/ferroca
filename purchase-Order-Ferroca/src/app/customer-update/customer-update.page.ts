import { Component, OnInit } from '@angular/core';
import { Cliente } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { Usuario } from '../core/interfaces/interfaces';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {

  customer: any;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService) { 
                console.log('aqui user-update');
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
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se modifico el cliente');
    }
  }

  
  async deleteClient(){
    const valido = await this.userService.deleteClient(this.customer._id);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el cliente');
    }
  }

}
