import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from '../core/services/order.service';
import { AlertController } from '@ionic/angular';
import { TokenService } from '../core/services/token.service';
import { URL_SERVICIOS } from '../core/config/url.services';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: any;
  url: string;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private navCtrlr: NavController,
    private alertController: AlertController,
    private tokenService: TokenService,
    ) { this.url = URL_SERVICIOS }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    const id = this.activatedRoute.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      data => {
        this.order = data['order'];
        // console.log("getOrder: ", this.order);
      },
      err => {
        // console.log("Error");
        this.navCtrlr.navigateRoot('/order-list');
      }
    );
  }

  async nextStep() {
    this.order.step = parseInt(this.order.step) + 1;
    const valido = await this.orderService.updateOrder(this.order);
    if (valido) {
      await this.orderService.getAllOrders();
      // console.log("Guardado");
    } else {
      // console.log("Error");
    }
  }

  async presentAlertState() {
    const alert = await this.alertController.create({
      subHeader: '¿Estás seguro de pasar al siguiente estado ? ',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sí',
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

  formatPoint(price: string): string {
    return price.replace(/,/g, '.');
  }


}
