import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserService } from '../core/services/user.service';
import { UiService } from '../core/services/ui.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-step2',
  templateUrl: './order-step2.page.html',
  styleUrls: ['./order-step2.page.scss'],
})
export class OrderStep2Page implements OnInit {

  customers: any;
  products: any;
  user:any;

  constructor(private navCtrlr: NavController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private uiService: UiService,
    private storage: Storage,) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getAllClient();
    this.getUser();
  }
    
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.navCtrlr.navigateRoot('/user-register', { animated: true });
  }

  async getAllClient(){
    const valido = await this.userService.getAllClient();
    if(valido){
      this.customers = this.userService.allClient;
      console.log("customers",this.customers );
    }else{
      this.uiService.presentAlert('No se encuentran registros');
    }
  }

  async getUser(){
   this.user =  await this.storage.get('user');
    console.log("getTokenUser",this.user );
  }

}
