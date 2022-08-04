import { Component, OnInit } from '@angular/core';

import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.page.html',
  styleUrls: ['./product-registration.page.scss'],
})
export class ProductRegistrationPage implements OnInit {

  registerProducto: Producto = {
    nombre: 'Tornillo',
    descripcion: 'test 22222',
    cantidad: 400,
    precio: 1500,
    img: []
  };

  constructor(private productService: ProductService,
    private navCtrlr: NavController,
    private uiService: UiService) { }

  ngOnInit() {
  }

  async register(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);
      console.log(this.registerProducto);
      const valido = await this.productService.registerProduct (this.registerProducto);
      if(valido){
        this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Ingrese todo los campos');
      }
    }

}
