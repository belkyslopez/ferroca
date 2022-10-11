import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { URL_SERVICIOS } from '../core/config/url.services';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  products: [];
  searchTerm: string;
  url: string;

  constructor(
    private productService: ProductService,
    private navCtrlr: NavController,
  ) { 
    this.url = URL_SERVICIOS
   }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getAllProduct();
  }

  async getAllProduct(){
    const valido = await this.productService.getAllProduct();
    if(valido){
      this.products = this.productService.allProducts;
    }else{
      console.log("No cargado")
    }
  }

}
