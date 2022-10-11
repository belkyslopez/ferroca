import { Component, OnInit } from '@angular/core';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

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
