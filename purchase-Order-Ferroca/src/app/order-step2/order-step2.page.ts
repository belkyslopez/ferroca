import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Cliente, Producto } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import {OrderService} from '../core/services/order.service';
import { UiService } from '../core/services/ui.service';
import { Storage } from '@ionic/storage';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-order-step2',
  templateUrl: './order-step2.page.html',
  styleUrls: ['./order-step2.page.scss'],
})
export class OrderStep2Page implements OnInit {

  customers: Cliente[];
  selectedCustomer: Cliente = {} as Cliente;
  otherDirection: string;
  products: Producto[];
  user:any;
  loading: boolean = false;

  constructor(private navCtrlr: NavController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private orderService: OrderService,
    private uiService: UiService,
    private storage: Storage,
    private alertService: AlertService,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.products = Object.values(this.orderService.items);
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
      // console.log("customers",this.customers );
    }else{
      this.uiService.presentAlert('No se encuentran registros');
    }
  }

  async getUser(){
   this.user =  await this.storage.get('resp');
    // console.log("getTokenUser",this.user );
  }

  async saveOrder(){
    this.loading = true;
    await this.getUser();
    const {orderItems, totalOrder} = this.products.reduce((acc, item) => {
      acc.totalOrder += item.price * item.quantity;
      acc.orderItems.push({ product: item._id, quantity: item.quantity});
      return acc;
    }, {orderItems: [],  totalOrder: 0});
    // console.log("otherDirection.", this.otherDirection);  
    const order = {
      active:true,
      step:1,
      user: this.user._id,
      customer: this.selectedCustomer._id,
      totalOrder,
      address: this.otherDirection?.trim() ? this.otherDirection : this.selectedCustomer.address,
      orderItems
    }
    const valido = await this.orderService.saveOrder(order);
    if(valido){
      this.alertService.presentAlertRegistro('Se registró la orden con éxito!','', '','ok','');
      this.orderService.clearProducts();
      this.navCtrlr.navigateForward('/tabs/tab1');
    }else{
      this.uiService.presentAlert('Error al registrar la orden');
    }
  }

}
