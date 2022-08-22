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
  order: any;
  orders: any;
  tokenDecode: Token;
  userId: string;
  producto: Producto;

  constructor(
    private navCtrlr: NavController,
    private storage: Storage,
    private orderService: OrderService,
    private productService: ProductService,
    private authenticateService: AuthenticateService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    //this.product = (history.state);
  }

  ionViewWillEnter(){
    //this.getUserId();
    //this.getOrderUser();
    //this.add();
    setTimeout(()=>this.getDetailsProduct(), 800);
  }

  async getUserId(){
    let result: string = await this.storage.get('token');
    this.tokenDecode = jwt_decode(result);
    this.userId = this.tokenDecode.sub;
    console.log("GetUserId: ", this.userId);

  }

  getDetailsProduct(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.detailsProduct(id).subscribe(
      data=>{
        this.product = data['product'];
        console.log("product: ", this.product);
      }, 
      err => {
        console.log("Error");
        this.navCtrlr.navigateRoot('/tabs/tab3');
      }
      );
  }

  async getOrderUser() {
    //get user id
    var string  = this.getUserId();
    console.log("string: ", string);
    /*
    let result: string = await this.storage.get('token');
    this.tokenDecode = jwt_decode(result);
    this.userId = this.tokenDecode.sub;
    console.log("getOrderUser User ID: ", this.userId);
    */

    //get order by user
    const valido = await this.orderService.getOrderByUser(this.userId);
    if (valido) {
      this.orders = this.orderService.allOrders;
      console.log("getOrderUser get all orders of user", this.orders)
    } else {
      this.navCtrlr.navigateRoot('/tabs/tab3');
    }

    //filter order
    //

  }

  async add() {
    this.getOrderUser();

    //const valido = await this.orderService.getOrderByUser(id);
    //const valido = false;
    if (true) {

    } else {
      this.navCtrlr.navigateRoot('/tabs/tab3');
    }
  }

  regresar() {
    this.navCtrlr.navigateRoot('/tabs/tab2');
  }

}
