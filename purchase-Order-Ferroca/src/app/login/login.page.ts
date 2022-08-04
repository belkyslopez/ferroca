import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../core/services/authenticate.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../core/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

loginUser= {
  email: 'belkiscarolina1@hotmail.com',
  password: '123456'

}

  constructor( private autService: AuthenticateService,
               private navCtrlr: NavController,
               private uiService: UiService,
               private router: Router ) { }

  ngOnInit() {
  }

  async login(fLogin: NgForm){
  if(fLogin.invalid) { return;}
    console.log(fLogin.valid);
    console.log(this.loginUser);
    const valido = await this.autService.login(this.loginUser.email, this.loginUser.password);
    if(valido){
     this.navCtrlr.navigateRoot('/tabs', { animated: true });
    }else{
      this.uiService.presentAlert('Usuario y contraseña incorrecto');
    }
  }

}