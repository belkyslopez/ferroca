import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-custormer-register',
  templateUrl: './custormer-register.page.html',
  styleUrls: ['./custormer-register.page.scss'],
})
export class CustormerRegisterPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  registerCliente: any = {};
  customers: any[] = [];
  customer: any;
  clienteForm: FormGroup;
  loading: boolean = false;
  loadingcustomers: boolean = false;


  constructor( private userService: UserService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private modalCtrl: ModalController,
               private alertService: AlertService,
               public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.prepareForm();
  }

  ionViewWillEnter(){
    this.getAllClient();
  }

  async registerClient(){
    if(this.clienteForm.invalid) {
       return;
      }
      this.loading = true;
      // console.log(this.clienteForm.valid);
      const valido = await this.userService.registerCliente(this.registerCliente);
      if(valido){
        this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
        this.getAllClient();
        this.clearForm();
        this.cancel();
      }else{
        this.uiService.presentAlert('complete el formulario');
      }
  }

  async getAllClient(){
    this.loadingcustomers = true;
    const valido = await this.userService.getAllClient();
    if(valido){
      this.customers = this.userService.allClient;
    }else{
      this.uiService.presentAlert('No se encuentran registros');
    }
    this.loadingcustomers = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

   get form() { return this.clienteForm.controls; }  
   get errorControl() { return this.clienteForm.controls; }
   get email() { return this.clienteForm.get('email'); }
   get address() { return this.clienteForm.get('address'); }
   get rs() { return this.clienteForm.get('rs'); }
   get phone() { return this.clienteForm.get('phone'); }
   get rut() { return this.clienteForm.get('rut'); }
 
   prepareForm(): void {
    //  console.log(" prepareForm ====>>> ");
     this.clienteForm = this.formBuilder.group({
       email: ['', { validators: [Validators.required],}],
       address: ['', { validators: [Validators.required],}],
       rs: ['', { validators: [Validators.required], }],
       phone: ['', { validators: [Validators.required],}],
       rut: ['',  [Validators.required,Validators.minLength(12),  Validators.maxLength(12)]],
     });
   }

   clearForm() {
    // console.log("clearForm");
    this.clienteForm.reset();
    this.clienteForm.controls['email'].setValue('');
    this.clienteForm.controls['address'].setValue('');
    this.clienteForm.controls['rs'].setValue('');
    this.clienteForm.controls['phone'].setValue('');
    this.clienteForm.controls['rut'].setValue('');
  }

  goToDetail(customer: Cliente){
    this.navCtrlr.navigateForward('/customer-detail', { state: customer});
    // console.log("objeto enviado custormer-detail", customer );
  }
}
