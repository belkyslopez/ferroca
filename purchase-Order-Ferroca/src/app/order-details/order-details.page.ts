import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: any;

  constructor(    
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private navCtrlr: NavController,
    ) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(){
    const id = this.activatedRoute.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      data => {
        this.order = data['order'];
        console.log("order: ", this.order);
      },
      err => {
        console.log("Error");
        this.navCtrlr.navigateRoot('/tabs/tab3');
      }
    );
  }

  regresar() {
    this.navCtrlr.navigateRoot('/tabs/tab1');
  }

}
