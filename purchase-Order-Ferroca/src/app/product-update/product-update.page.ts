import { Component, OnInit} from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { MenuController, NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';
import { Producto } from '../core/interfaces/interfaces';
import { URL_SERVICIOS } from '../core/config/url.services';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

  product: Producto;
  image: any;
  formData;
  loadingDelete: boolean = false;
  loadingUpdate : boolean = false;
  loading: boolean = false;
  url: string = URL_SERVICIOS;

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
    this.loading = true;
    const valido = await this.productService.updateProduct(this.product);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      if(this.image){
        await this.addImg();
      }
      this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el producto');
    }
  }

  camara(isCamera){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: isCamera ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then(async (imageData) => {
      this.image = `data:image/jpeg;base64,${imageData}`
      const base64 = await fetch(this.image);
      const blob = await base64.blob();
      this.formData = new FormData();
      this.formData.append('image', blob, 'temp.jpg');
      console.log('formData2', this.formData.getAll('image'));
    });
  }

  async addImg(){
    console.log('producto', this.productService.producto);
    const valido = await this.productService.addImg(this.formData, this.productService.producto._id);
    if(!valido){
      this.uiService.presentAlert('No se guardó la imagen');
    }
  }

  cancel() {
    this.navCtrlr.navigateBack('/product-registration', { animated: true });
  }

  showAlert(): void {
    this.alertService.presentAlertDelete(
      'Eliminar Producto',
      '¿Está seguro que desea eliminar el producto?',
      this.deleteProduct.bind(this),
      'Continuar');
  }

  async deleteProduct(){
    this.loadingDelete= true;
    this.product.disabled =  true
    console.log("product delete", this.product)
    const valido = await this.productService.updateProduct(this.product);
    if(valido){
      this.alertService.presentAlertRegistro('Se eliminó con exitoso!','', '','ok','');
     this.cancel();
    }else{
      this.uiService.presentAlert('No se elimino el usuario');
    }
  }

}