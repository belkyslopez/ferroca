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
  ) {
    this.orderService.updateOrders.subscribe((orders: any) => {
     this.orders = orders;
     this.orders.sort((a,b) => {
       const aDate = new Date(a.updatedAt).getTime();
       const bDate = new Date(b.updatedAt).getTime();
       if(aDate < bDate)
         return 1;
       if(aDate > bDate)
         return -1;
       return 0;
     });
    })
  }

  ionViewWillEnter(){
    this.cargar();
  }

  async cargar(){
    const valido = await this.orderService.getAllOrders();
    if(valido){
      // console.log("Success get all orders");
    }else{
      // console.log("Eror")
    }
  }

  formatPoint(price: string): string {
    return price.replace(/,/g, '.');
  }


}
