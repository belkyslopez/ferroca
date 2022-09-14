import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { URL_SERVICIOS } from '../core/config/url.services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  products: [];
  searchTerm: string;
  url: string;
  
  constructor(
    private productService: ProductService,
    private navCtrlr: NavController,
  ) {
    this.url = URL_SERVICIOS
  }

  ngOnInit(){
    this.getAllProduct();
  }

  async getAllProduct(){
    const valido = await this.productService.getAllProduct();
    if(valido){
      this.products = this.productService.allProducts;
      console.log("Productos cargados", this.products)
    }else{
      console.log("No cargado")
    }
  }

  //sin uso
  getProduct(product: Producto){
    this.navCtrlr.navigateRoot('/product-details', { state: product });
   }

}
