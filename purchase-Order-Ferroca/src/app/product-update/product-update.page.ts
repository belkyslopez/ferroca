import { Component, OnInit , ViewChild} from '@angular/core';
import { Producto , Componente} from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { MenuController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

  registerProducto: Producto = {
    name: 'Tornillo',
    description: 'test 22222',
    price: 1500,
   // cantidad: 400,
   // img: []
  };

  id = '62f1665f1384dd9539828da7';

  constructor(
      private productService: ProductService,
      private navCtrlr: NavController,
      private uiService: UiService,
      private camera: Camera,
      private menuCtrl: MenuController,
      private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  async updateProduct(id){
    const valido = await this.productService.updateProduct(this.id);
    if(valido){
      //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se modifico el producto');
    }
  }

  async deleteProduct(id){
    const valido = await this.productService.deleteProduct(this.id);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el producto');
    }
  }

}
