import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from '../core/services/order.service';
import { AlertController } from '@ionic/angular';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: any;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private navCtrlr: NavController,
    private alertController: AlertController,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    const id = this.activatedRoute.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      data => {
        this.order = data['order'];
        console.log("getOrder: ", this.order);
      },
      err => {
        console.log("Error");
        this.navCtrlr.navigateRoot('/order-list');
      }
    );
  }

  regresar() {
    this.navCtrlr.navigateRoot('/order-list');
  }

  async nextStep() {
    this.order.step = parseInt(this.order.step) + 1;
    const valido = await this.orderService.updateOrder(this.order);
    if (valido) {
      console.log("Guardado");
    } else {
      console.log("Error");
    }
  }

  async presentAlertState() {
    const alert = await this.alertController.create({
      subHeader: '¿ Estas segruro de pasar al siguiente estado ? ',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: (value: any) => {
            this.nextStep();
          },
        },
      ],
    });
    await alert.present();
  }

}
