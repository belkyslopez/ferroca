import { Component, OnInit } from '@angular/core';
import { Cliente } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';

@Component({
  selector: 'app-custormer-register',
  templateUrl: './custormer-register.page.html',
  styleUrls: ['./custormer-register.page.scss'],
})
export class CustormerRegisterPage implements OnInit {

  registerCliente: Cliente = {
    correo: 'test2',
    nombre: 'Test',
    direccion: 'emilio vaisse 760',
    telefono: 123456778,
    rut: 265432228
  };

  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService) { }

  ngOnInit() {
  }

  async registerClient(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);
      console.log(this.registerCliente);
      const valido = await this.userService.registerCliente(this.registerCliente);
      if(valido){
        this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('complete el formulario');
      }
    }

}
