import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto, Token } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { OrderService } from '../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../core/config/url.services';
import { AlertController } from '@ionic/angular';
import {UiService} from "../core/services/ui.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  id: string;
  product: Producto;
  orderActive: any;
  orders: any;
  tokenDecode: Token;
  userId: string;
  producto: Producto;
  url: string;
  handlerMessage = '';

  constructor(
    private navCtrlr: NavController,
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private uiService: UiService,
  ) {
    this.url = URL_SERVICIOS
  }

  ngOnInit() {
    this.getDetailsProduct();
  }

  getDetailsProduct(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.detailsProduct(id).subscribe(
      data => {
        this.product = data['product'];
        console.log("product: ", this.product);
      },
      err => {
        console.log("Error");
        this.navCtrlr.navigateRoot('/tabs/tab3');
      }
    );
  }

  async addStock(quantityProduct: number) {
    this.product.stock = this.product.stock + quantityProduct;
    const valido = await this.productService.updateProduct(this.product);
    if (valido) {
      console.log("Guardado");
    } else {
      console.log("Error");
    }
  }


  async presentAlertStock() {
    const alert = await this.alertController.create({
      subHeader: 'Modificar Stock',
      cssClass: 'myCustomCSS',
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
            this.addStock(parseInt(value[0]));
          },
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: 'Número de Productos',
          min: 1,
          max: 100,
          attributes: {
            maxlength: 5,
          }
        },
      ],
    });
    await alert.present();
  }

  async presentAlertOrder() {
    const alert = await this.alertController.create({
      subHeader: 'Agregar producto a la orden',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (value: any) => {
            const quantity = parseInt(value[0]);
            if(quantity > this.product.stock) {

              this.uiService.presentToast('Stock insuficiente', 'top');
              this.presentAlertOrder();
            } else {
              this.orderService.addProduct(this.product, parseInt(value[0]));
            }
          },
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: 'Número de Productos',
          attributes: {
            maxlength: 5,
          }
        },
      ],
    });
    await alert.present();
  }

}
