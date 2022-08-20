import { Component, OnInit} from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { MenuController, NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';

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
      private modalCtrl: ModalController,
      private alertService: AlertService
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
     // this.goToReturn();
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el producto');
    }
  }

  async deleteProduct(){
    const valido = await this.productService.deleteProduct(this.product._id);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
      this.cancel();
    }else{
      this.uiService.presentAlert('No se elimino el producto');
    }
  }

  goToReturn(){
    this.navCtrlr.navigateRoot('/product-registration');
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.navCtrlr.navigateRoot('/product-registration', { animated: true });
  }

}
