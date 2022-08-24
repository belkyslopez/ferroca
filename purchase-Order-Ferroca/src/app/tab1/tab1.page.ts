import { Component } from '@angular/core';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  orders: any[] = [];

  constructor(
    private orderService: OrderService
  ) {}

  ionViewWillEnter(){
    this.cargar();
  }

  async cargar(){
    const valido = await this.orderService.getAllOrders();
    if(valido){
      this.orders = this.orderService.allOrders;
      console.log("Success get all orders");
    }else{
      console.log("Eror")
    }
  }

}
