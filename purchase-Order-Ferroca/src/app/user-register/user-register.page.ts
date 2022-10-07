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
  users: any;
  user: any;
  handlerMessage = '';
  roleMessage = '';
  IDUser: any;
  registerForm: FormGroup;
  loading: false;
  url: string = URL_SERVICIOS;

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
        console.log(this.registerForm.valid);  
        const valido = await this.userService.register (this.registerUser);
        if(valido){
         this.alertService.presentAlertRegistro('Registro exitoso!','', '','ok','');
         this.getAllUser();
         this.clearLoginForm();
         this.cancel();
        }else{
          this.uiService.presentAlert('Usuario y contraseña incorrecto');
        }
      }

    async getAllUser(){
      const valido = await this.userService.getAllUser();
      if(valido){
        this.users = this.userService.allUsers;
      }else{
        this.uiService.presentAlert('No se encuentran registros');
      }
    }

    cancel() {
      this.modalCtrl.dismiss(null, 'cancel');
    }

    goToUpdate(user: Usuario){
     this.navCtrlr.navigateForward('/user-update', { state: user });
     console.log("user goToUpdate ===>  {state: user}", user);
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
        name: ['', { validators: [Validators.required], updateOn: 'blur' }],
        surname: ['', { validators: [Validators.required], updateOn: 'blur' }],
        email: ['', { validators: [Validators.required], updateOn: 'blur' }],
        password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(32)]],
        address: ['', { validators: [Validators.required], updateOn: 'blur' }],
        phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
        rut: ['', { validators: [Validators.required], updateOn: 'blur' }],
        //registerForm: [ true ]
      });
    }
  
    clearLoginForm() {
      console.log("clearLoginForm");
      this.registerForm.reset();
      this.registerForm.controls['name'].setValue('');
      this.registerForm.controls['surname'].setValue('');
      this.registerForm.controls['email'].setValue('');
      this.registerForm.controls['password'].setValue('');
      this.registerForm.controls['address'].setValue('');
      this.registerForm.controls['phone'].setValue('');
      this.registerForm.controls['rut'].setValue('');
    }
}