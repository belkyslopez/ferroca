import { Component, OnInit , ViewChild} from '@angular/core';
import { Producto } from '../core/interfaces/interfaces';
import { ProductService } from '../core/services/product.service';
import { MenuController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';

declare var window: any;

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.page.html',
  styleUrls: ['./product-registration.page.scss'],
})
export class ProductRegistrationPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  registerProducto:any = {};
  products: any;
  product: any;

  tempImages: string[] =[];
  componentes: Observable<Component[]>;

  constructor(private productService: ProductService,
    private navCtrlr: NavController,
    private uiService: UiService,
    private camera: Camera,
    private menuCtrl: MenuController,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private alertService: AlertService,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllProduct();
  }

  async registerProduct(fRegisterP: NgForm){
    if(fRegisterP.invalid) { return;}
      console.log(fRegisterP.valid);
      const valido = await this.productService.registerProduct(this.registerProducto);
      if(valido){
        this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
        this.modalCtrl.dismiss(null, 'cancel');
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

 /* async getProduct(){
    const valido = await this.productService.getProduct(this.product._id);
    if(valido){
      //this.navCtrlr.navigateRoot('/tabs/tabs2', { animated: true });
    }else{
      this.uiService.presentAlert('registro de producto');
    }
  }*/

  async getAllProduct(){
    const valido = await this.productService.getAllProduct();
    if(valido){
      this.products = this.productService.allProducts;
     //
    }else{
      this.uiService.presentAlert('No se encuentran productos');
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  goToUpdate(product: Producto){
    this.navCtrlr.navigateRoot('/product-update',  { state: product });
    console.log("user goToUpdate ===>  {state: user}", product);
  }

}
