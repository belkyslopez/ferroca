import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';
import { Usuario } from '../core/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {

  user: Usuario;
  loadingUpdate : boolean = false;
  updateUserForm: FormGroup;

  constructor(private userService: UserService,
              private navCtrlr: NavController,
              private uiService: UiService,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              public formBuilder: FormBuilder) {
               }

  ngOnInit() {
    // console.log("carga exitosa 1");
    this.user = (history.state);
    // console.log("ngOnInit user", this.user._id );
    // console.log("page update ", this.user);
    this.prepareForm();
  }
  
  ionViewWillEnter(){
  }

  async updateUserMethod(){
    if(this.updateUserForm.invalid) {
      return;
   }
    this.loadingUpdate= true;
    // console.log(this.updateUserForm.valid);  
    const valido = await this.userService.updateUser(this.user);
    if(valido){
      this.alertService.presentAlertRegistro('Se modificó con exitoso!','', '','ok','');
      this.clearForm();
     this.cancel();
    }else{
      this.uiService.presentAlert('No se modifico el usuario');
    }
  }

  cancel() {
    this.navCtrlr.navigateBack('/user-register', { animated: true });
  }

  get form() { return this.updateUserForm.controls; }
  get errorControl() { return this.updateUserForm.controls; }
  get name() { return this.updateUserForm.get('name'); }
  get surname() { return this.updateUserForm.get('surname'); }
  get email() { return this.updateUserForm.get('email'); }
  get address() { return this.updateUserForm.get('address'); }
  get phone() { return this.updateUserForm.get('phone'); }
  get rut() { return this.updateUserForm.get('rut'); }
    
  prepareForm(): void {
    // console.log(" prepareForm ====>>> ");
    this.updateUserForm = this.formBuilder.group({
      name: ['', { validators: [Validators.required]}],
      surname: ['', { validators: [Validators.required],  }],
      email: ['', { validators: [Validators.required],  }],
      address: ['', { validators: [Validators.required], }],
      phone: ['',  [Validators.required, Validators.minLength(9),  Validators.maxLength(12)]],
      rut: ['',  [Validators.required,Validators.minLength(12),  Validators.maxLength(12)]],
    });
  }

  clearForm() {
    // console.log("clearForm");
    this.updateUserForm.reset();
    this.updateUserForm.controls['name'].setValue('');
    this.updateUserForm.controls['surname'].setValue('');
    this.updateUserForm.controls['email'].setValue('');
    this.updateUserForm.controls['address'].setValue('');
    this.updateUserForm.controls['phone'].setValue('');
    this.updateUserForm.controls['rut'].setValue('');
  }

}