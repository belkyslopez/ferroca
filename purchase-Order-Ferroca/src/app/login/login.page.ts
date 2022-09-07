import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../core/services/authenticate.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { rutIsValid } from '../shared/validators/rut-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

loginUser: any = {
  email: 'belkiscarolina1@hotmail.com',
  password: '1234'
};
loginForm: FormGroup;
changeColorEyeOutLine = false;
loading: false;

  constructor( private autService: AuthenticateService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private router: Router,
               public formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.prepareForm();
    this.loginForm.controls['password'].valueChanges.subscribe((x)=>{
      if(x !== ''){
        this.changeColorEyeOutLine = true;
      }else{
        this.changeColorEyeOutLine = false;
      }
    });
  }

  async login(fLogin: NgForm){
  if(this.loginForm.invalid) { return;}
    console.log(fLogin.valid);
    console.log(this.loginUser);
    const valido = await this.autService.login(this.loginUser.email, this.loginUser.password);
    if(valido){
     this.navCtrlr.navigateRoot('/tabs', { animated: true });
    }else{
      this.uiService.presentAlert('Usuario y contraseña incorrecto');
    }
  }

  get form() { return this.loginForm.controls; }
  get errorControl() { return this.loginForm.controls; }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  prepareForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required], updateOn: 'blur' }],
      password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(32)]],
      userRemember: [ true ]
    });
  }

  clearLoginForm() {
    console.log("clearLoginForm");
    this.loginForm.reset();
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }

}