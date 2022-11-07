import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { AlertService } from '../core/services/alert.service';
import { Cliente } from '../core/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {

  customer: Cliente;
  loadingUpdate : boolean = false;
  clienteUpdateForm: FormGroup;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              public formBuilder: FormBuilder) { 
              }

  ngOnInit() {
    this.customer = (history.state);
    console.log("ngOnInit customer", this.customer._id );
    console.log("page customer update ", this.customer);
    this.prepareForm();
  }

  async getClient(){
    const valido = await this.userService.getUser(this.customer._id);
    if(valido){
    }else{
      this.uiService.presentAlert('cliente no registrado');
    }
  }

  async updateClient(){
    if(this.clienteUpdateForm.invalid) {
      return;
     }
     console.log(this.clienteUpdateForm.valid);
    this.loadingUpdate= true;
    const valido = await this.userService.updateClient(this.customer);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      this.clearForm();
      this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el cliente');
    }
    this.loadingUpdate= false;
  }

  cancel() {
    this.navCtrlr.navigateBack('/customer-register', { animated: true });
  }
  
  get form() { return this.clienteUpdateForm.controls; }  
  get errorControl() { return this.clienteUpdateForm.controls; }
  get email() { return this.clienteUpdateForm.get('email'); }
  get address() { return this.clienteUpdateForm.get('address'); }
  get rs() { return this.clienteUpdateForm.get('rs'); }
  get phone() { return this.clienteUpdateForm.get('phone'); }
  get rut() { return this.clienteUpdateForm.get('rut'); }
   
  prepareForm(): void {
    console.log(" prepareForm ====>>> ");
    this.clienteUpdateForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required],}],
      address: ['', { validators: [Validators.required],}],
      rs: ['', { validators: [Validators.required], }],
      phone: ['', { validators: [Validators.required],}],
      rut: ['',  [Validators.required,Validators.minLength(12),  Validators.maxLength(12)]],
    });
  }

  clearForm() {
   console.log("clearForm");
   this.clienteUpdateForm.reset();
   this.clienteUpdateForm.controls['email'].setValue('');
   this.clienteUpdateForm.controls['address'].setValue('');
   this.clienteUpdateForm.controls['rs'].setValue('');
   this.clienteUpdateForm.controls['phone'].setValue('');
   this.clienteUpdateForm.controls['rut'].setValue('');
 }

}
