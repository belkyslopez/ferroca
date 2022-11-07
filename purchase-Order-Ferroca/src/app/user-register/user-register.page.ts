import { Component, OnInit } from '@angular/core';
import { Usuario } from '../core/interfaces/interfaces';
import { UserService } from '../core/services/user.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UiService } from '../core/services/ui.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { URL_SERVICIOS } from '../core/config/url.services';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  registerUser: any = {};
  users: any[] = [];
  user: any;
  handlerMessage = '';
  roleMessage = '';
  IDUser: any;
  registerForm: FormGroup;
  loading: boolean = false;
  url: string = URL_SERVICIOS;
  loadingUsers: boolean  = false;

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
    this.getAllUser();
  }

    async register(){
      if(this.registerForm.invalid) {
         return;
      }
      this.loading = true;
        console.log(this.registerForm.valid);  
        const valido = await this.userService.register (this.registerUser);
        if(valido){
         this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
         this.getAllUser();
         this.clearForm();
         this.cancel();
        }else{
          this.uiService.presentAlert('Usuario y contraseña incorrecto');
        }
        this.loading = false;
      }

    async getAllUser(){
      this.loadingUsers = true;
      const valido = await this.userService.getAllUser();
      if(valido){
        this.users = this.userService.allUsers;
      }else{
        this.uiService.presentAlert('No se encuentran registros');
      }
      this.loadingUsers = false;
    }

    cancel() {
      this.modalCtrl.dismiss(null, 'cancel');
    }

    get form() { return this.registerForm.controls; }
    get errorControl() { return this.registerForm.controls; }
    get name() { return this.registerForm.get('name'); }
    get surname() { return this.registerForm.get('surname'); }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get address() { return this.registerForm.get('address'); }
    get phone() { return this.registerForm.get('phone'); }
    get rut() { return this.registerForm.get('rut'); }
  
    prepareForm(): void {
      console.log(" prepareForm ====>>> ");
      this.registerForm = this.formBuilder.group({
        name: ['', { validators: [Validators.required]}],
        surname: ['', { validators: [Validators.required],  }],
        email: ['', { validators: [Validators.required],  }],
        password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(12)]],
        address: ['', { validators: [Validators.required], }],
        phone: ['',  [Validators.required, Validators.minLength(9),  Validators.maxLength(12)]],
        rut: ['',  [Validators.required,Validators.minLength(12),  Validators.maxLength(12)]],
      });
    }
  
    clearForm() {
      console.log("clearForm");
      this.registerForm.reset();
      this.registerForm.controls['name'].setValue('');
      this.registerForm.controls['surname'].setValue('');
      this.registerForm.controls['email'].setValue('');
      this.registerForm.controls['password'].setValue('');
      this.registerForm.controls['address'].setValue('');
      this.registerForm.controls['phone'].setValue('');
      this.registerForm.controls['rut'].setValue('');
    }

    goToDetail(user: Usuario){
      this.navCtrlr.navigateForward('/user-detail', { state: user});
      console.log("user goTogoToDetail ===>  {state: user}", user );
    }
}