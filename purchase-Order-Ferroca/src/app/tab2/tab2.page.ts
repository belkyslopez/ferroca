import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  products: any;
  
  constructor(
    private productService: ProductService,
    private navCtrlr: NavController,
  ) {}

  ngOnInit(){
    this.getAllProduct();
  }

  async getAllProduct(){
    const valido = await this.productService.getAllProduct();
    if(valido){
      this.products = this.productService.allProducts;
      console.log("Productos cargados")
    }else{
      console.log("No cargado")
    }
  }

  //sin uso
  getProduct(product: Producto){
    this.navCtrlr.navigateRoot('/product-details', { state: product });
   }

}
