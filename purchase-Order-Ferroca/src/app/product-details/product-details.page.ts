import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario, OrdenCompra, Token, Producto } from '../core/interfaces/interfaces';
import { OrderService } from '../core/services/order.service';
import { ProductService } from '../core/services/product.service';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../core/services/authenticate.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

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

  orderItems: any[];

  //test
  vegetables: any[];

  constructor(
    private navCtrlr: NavController,
    private storage: Storage,
    private orderService: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    setTimeout(() => this.getDetailsProduct(), 800);
    this.getCountItemsToOrderActive();
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

  async add(productId: string) {
    console.log("####################INICIO ADD#########################");
    
    //get user id
    console.log("user id:", this.userId);
    
    //get order by user
    const valido = await this.orderService.getOrderByUser(this.userId);
    if (valido) {
      this.orders = await this.orderService.allOrders;

      //get order active
      for (let order of this.orders) {
        if (!order.active) {
          this.orderActive = order;
          break
        }
      }
    } else {
      this.navCtrlr.navigateRoot('/tabs/tab3');
    }

    //create request 
    const productOrder = {
      'orderId': this.orderActive._id,
      'productId': productId,
      'quantity': 1
    }

    console.log("product Order:", productOrder);

    //save product
    const guardar = await this.orderService.addProduct(productOrder);

    if (guardar) {
      this.getCountItemsToOrderActive();
    } else {
      console.log("ERROR");
    }

  }
  

  async getCountItemsToOrderActive() {
    //get user id
    let result: string = await this.storage.get('token');
    this.tokenDecode = jwt_decode(result);
    this.userId = this.tokenDecode.sub;
    console.log("GetUserId: ", this.userId);

    //get order by user
    const valido = await this.orderService.getOrderByUser(this.userId);
    if (valido) {
      this.orders = await this.orderService.allOrders;

      //get order active
      for (let order of this.orders) {
        if (!order.active) {
          this.orderActive = order;
          console.log("Order:", this.orderActive);
          break
        }
      }
      //get data to item  
      this.orderItems = this.orderActive.orderItems;

    } else {
      this.navCtrlr.navigateRoot('/tabs/tab3');
    }
  }

  goToOrder(id: string){
    this.navCtrlr.navigateRoot('/order-details/'+id);
  }

  regresar() {
    //this.navCtrlr.navigateRoot('/tabs/tab2');
    this.navCtrlr.back();
  }

}
