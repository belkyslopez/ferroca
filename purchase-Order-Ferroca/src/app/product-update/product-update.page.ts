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

  product: any;

  constructor(
      private productService: ProductService,
      private navCtrlr: NavController,
      private uiService: UiService,
      private camera: Camera,
      private menuCtrl: MenuController,
      private http: HttpClient,
  ) { }

  ngOnInit() {
    console.log("carga exitosa 1");
    this.product = (history.state);
    console.log("ngOnInit user", this.product._id );
    console.log("page update ", this.product);
  }

  async updateProduct(){
    const valido = await this.productService.updateProduct(this.product);
    if(valido){
      this.goToReturn();
    }else{
      this.uiService.presentAlert('No se modifico el producto');
    }
  }

  async deleteProduct(){
    const valido = await this.productService.deleteProduct(this.product._id);
    if(valido){
     // this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('No se elimino el producto');
    }
  }

  goToReturn(){
    this.navCtrlr.navigateRoot('/product-registration');
  }

}
