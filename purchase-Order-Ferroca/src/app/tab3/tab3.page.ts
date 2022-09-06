import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private navCtrlr: NavController,
              private modalCtrl: ModalController) {}

  
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.navCtrlr.navigateRoot('/user-register', { animated: true });
  }

  gotToStep2(){
    this.navCtrlr.navigateForward('/order-step2');
  }

}
