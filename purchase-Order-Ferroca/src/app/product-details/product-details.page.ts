import { Component, OnInit } from '@angular/core';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  id: string = '62f42912ff62ea58da3c03db';
  product: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    console.log("___init___ ID: "+this.id);
    this.getProduct();
  }

  async getProduct() {
    console.log("Entró al método ID: "+this.id);
    const valido = await this.productService.getProduct();
    console.log("valido: "+valido);
    if (valido) {
      this.product = this.productService.getProduct();
      console.log("Producto obtenido: "+this.product);
    } else {
      console.log("faló algo");
    }
  }



}
