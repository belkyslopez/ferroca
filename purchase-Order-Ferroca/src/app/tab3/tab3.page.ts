import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Producto } from '../core/interfaces/interfaces';
import {OrderService} from '../core/services/order.service';
import { URL_SERVICIOS } from '../core/config/url.services';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  products: Producto[] = [];
  selectedProduct: Producto;
  isEditModalOpen: boolean = false;
  quantity: number;
  url: string;
  maxControl : FormControl;

  constructor(private navCtrlr: NavController,
              private modalCtrl: ModalController,
              private orderService: OrderService,) {
    this.url = URL_SERVICIOS
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.navCtrlr.navigateRoot('/user-register', { animated: true });
  }

  ionViewWillEnter(){
    this.products = Object.values(this.orderService.items);
    console.log('products', this.products)
  }

  deleteProduct(productId){
    this.products = this.orderService.removeProduct(productId) as Producto[];
  }

  openEditModal(product: Producto){
    this.selectedProduct = product;
    this.quantity = product.quantity;
    this.maxControl = new FormControl(this.quantity, [Validators.max(parseInt(product.stock))])
    this.isEditModalOpen = true;
  }

  editProduct(){
    this.products = this.orderService.editProduct(this.selectedProduct._id, this.quantity) as Producto[];
    this.closeEditModal();
  }

  closeEditModal(){
    this.isEditModalOpen = false;
  }

  gotToStep2(){
    this.navCtrlr.navigateForward('/order-step2');
  }

}
