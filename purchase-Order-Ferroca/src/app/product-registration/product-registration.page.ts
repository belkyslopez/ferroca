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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { PhotoLibrary } from "@awesome-cordova-plugins/photo-library/ngx";
import { URL_SERVICIOS } from '../core/config/url.services';

declare var window: any;

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.page.html',
  styleUrls: ['./product-registration.page.scss'],
})
export class ProductRegistrationPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  registerProducto:any = {};
  products: any[];
  product: Producto;
  componentes: Observable<Component[]>;
  productForm: FormGroup;
  imageData: any;
  nameFile: any;
  image: any;
  formData;
  url: string;
  loading: boolean = false;
  loadingProducto: boolean  = false;

  constructor(private productService: ProductService,
    private navCtrlr: NavController,
    private uiService: UiService,
    private camera: Camera,
    private menuCtrl: MenuController,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    private file: File,
    private photoLibrary: PhotoLibrary) 
    { 
      this.url = URL_SERVICIOS
     }

  ngOnInit() {
    this.prepareForm();
  }

  ionViewWillEnter(){
    this.getAllProduct();
  }

  async registerProduct(){
    if(this.productForm.invalid) { 
      return;
    }
    this.loading = true;
      console.log(this.productForm.valid);
      const valido = await this.productService.registerProduct(this.registerProducto);
      if(valido){
        this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
        if(this.image){
          await this.addImg();
        }
        this.getAllProduct();
        this.clearForm();
        this.cancel();
      }else{
        this.uiService.presentAlert('Ingrese todo los campos');
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

  viewMenu(){
    this.menuCtrl.open();
  }

  getMenuOpt(){
    return this.http.get('/assets/data/menu-opt.json')
  }

  async addImg(){
    console.log('producto', this.productService.producto);
    const valido = await this.productService.addImg(this.formData, this.productService.producto._id);
    if(!valido){
      this.uiService.presentAlert('No se guardó la imagen');
    }
  }

  async getImg(){
    const valido = await this.productService.getImg(this.nameFile);
    if(valido){
      this.cancel();
    }else{
      this.uiService.presentAlert('No se cargó la imagen correctamente');
    }
  }

  async getAllProduct(){
    this.loadingProducto = true;
    const valido = await this.productService.getAllProduct();
    if(valido){
      this.products = this.productService.allProducts;
    }else{
      this.uiService.presentAlert('No se encuentran productos');
    }
    this.loadingProducto = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  goToUpdate(product: Producto){
    this.navCtrlr.navigateForward('/product-update',  { state: product });
    console.log("user goToUpdate ===>  {state: user}", product);
  }

  get form() { return this.productForm.controls; }  
  get errorControl() { return this.productForm.controls; }
  get nombre() { return this.productForm.get('nombre'); }
  get descripcion() { return this.productForm.get('descripcion'); }
  get precio() { return this.productForm.get('precio'); }
  get stock() { return this.productForm.get('stock'); }

  prepareForm(): void {
    console.log(" prepareForm ====>>> ");
    this.productForm = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required],}],
      descripcion: ['', { validators: [Validators.required],}],
      precio: ['', { validators: [Validators.required], }],
      stock: ['', { validators: [Validators.required], }],
    });
  }

  clearForm() {
   console.log("clearForm");
   this.productForm.reset();
   this.productForm.controls['nombre'].setValue('');
   this.productForm.controls['descripcion'].setValue('');
   this.productForm.controls['precio'].setValue('');
 }

 goToDetail(product: Producto){
  this.navCtrlr.navigateForward('/product-details', { state: product});
  console.log("product goTogoToDetail ===>  {state: product}", product );
}

}
