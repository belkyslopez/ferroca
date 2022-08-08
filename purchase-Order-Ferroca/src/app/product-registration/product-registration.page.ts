import { Component, OnInit } from '@angular/core';

import { Producto , Componente} from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { MenuController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.page.html',
  styleUrls: ['./product-registration.page.scss'],
})
export class ProductRegistrationPage implements OnInit {

  registerProducto: Producto = {
    name: 'Tornillo',
    description: 'test 22222',
   // cantidad: 400,
    price: 1500,
   // img: []
  };

  tempImages: string[] =[];

  componentes: Observable<Component[]>;

  constructor(private productService: ProductService,
    private navCtrlr: NavController,
    private uiService: UiService,
    private camera: Camera,
    private menuCtrl: MenuController,
    private http: HttpClient) { }

  ngOnInit() {
   // this.componentes = this.getMenuOpt();
  }

  async register(fRegister: NgForm){
    if(fRegister.invalid) { return;}
      console.log(fRegister.valid);
      console.log(this.registerProducto);
      const valido = await this.productService.registerProduct (this.registerProducto);
      if(valido){
        this.navCtrlr.navigateRoot('/tabs2', { animated: true });
      }else{
        this.uiService.presentAlert('Ingrese todo los campos');
      }
  }

  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     console.log(img);
     this.tempImages.push(img);
    }, (err) => {
     // Handle error
    });
  }

  viewMenu(){
    this.menuCtrl.open();
  }

  getMenuOpt(){
    return this.http.get('/assets/data/menu-opt.json')
  }

}
