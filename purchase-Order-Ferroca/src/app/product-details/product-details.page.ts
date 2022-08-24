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
  ) {}

  ngOnInit() {
    //this.product = (history.state);
  }

  ionViewWillEnter() {
    this.getCountItemsToOrderActive();
    //this.getUserId();
    //this.getOrderUser();
    setTimeout(() => this.getDetailsProduct(), 800);
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
        if (order.total == 0) {
          this.orderActive = order;
          console.log("Order:", this.orderActive);
          break
        }
      }
    } else {
      this.navCtrlr.navigateRoot('/tabs/tab3');
    }
    
    console.log("order id: ", this.orderActive._id);
    console.log("product id: ", productId);
    
    //const guardar = await this.orderService.addProduct(this.orderActive._id, productId);
    const guardar = true;
    if (guardar) {
      console.log("si");
    }else{
      console.log("no");
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
        if (order.total == 0) {
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


  regresar() {
    this.navCtrlr.navigateRoot('/tabs/tab2');
  }

}
