import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  id: string;
  product: any;

  constructor(
    private productService: ProductService,
    private navCtrlr: NavController,
  ) { }

  ngOnInit() {
    this.product = (history.state);
    console.log("product: "+JSON.stringify(this.product))
  }

  regresar(){
    this.navCtrlr.navigateRoot('/tabs/tab2');
  }

}
