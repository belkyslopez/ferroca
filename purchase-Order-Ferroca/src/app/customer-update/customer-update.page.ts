import { Component, OnInit } from '@angular/core';
import { Cliente } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {

  registerCliente: Cliente = {
    email: 'test',
    address: '123456',
    rs: 'Test',
    phone: 987654321,
    rut: 234567778
  };

  id = '62f1665f1384dd9539828da7';

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService) { }

  ngOnInit() {
  }

  
  async updateClient(id){
    const valido = await this.userService.updateClient(this.id);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se modifico el cliente');
    }
  }

  
  async deleteClient(id){
    const valido = await this.userService.deleteClient(this.id);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el cliente');
    }
  }

}
