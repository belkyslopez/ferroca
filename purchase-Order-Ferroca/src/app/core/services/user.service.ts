import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, ListadoOrdenes } from '../interfaces/interfaces';
import { Cliente } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token: string = null;
  //user: Usuario = {};

  constructor( private http: HttpClient,
    private navCtrl: NavController,
    private autService: AuthenticateService) { }


  async register( usuario: Usuario){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/register`, usuario, { headers })
      .subscribe( resp =>{
        console.log("resp register", resp);
        if (resp) {
          console.log("ok register")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  /*getUser(){
  if ( !this.usuario.id){
    this.validToken();
  }
    return {...this.usuario };
  }*/

  async registerCliente( cliente: Cliente){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/register-cliente`, cliente,  { headers })
      .subscribe( resp =>{
        console.log("resp register cliente", resp);
        if (resp) {
          console.log("ok register cliente")
           resolve(true);
        }else{
           this.token = null;
           resolve(false);
        }
      });
    });
  }
}