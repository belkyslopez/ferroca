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

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter(){
    this.cargar();
  }

  cargar(): void {
    this.orderService.getAll().subscribe(
      data => {
        this.orders = data['orders'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
