import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../core/services/authenticate.service';


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

  constructor( private autService: AuthenticateService) { }

  ngOnInit() {
  }

  login(fLogin: NgForm){
  if(fLogin.invalid) { return;}
    console.log(fLogin.valid);
    console.log(this.loginUser);
    this.autService.login(this.loginUser.email, this.loginUser.password);
  }

}