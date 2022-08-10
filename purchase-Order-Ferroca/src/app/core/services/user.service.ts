import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, ListadoOrdenes, Cliente } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token: string = null;
  usuario: any;
  cliente: any

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
        this.usuario = resp;
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

  async getUser( id ){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.get(`${URL_SERVICIOS}/user/:`+ this.usuario.user._id, { headers })
      .subscribe( resp =>{
        console.log("this.usuario._id", this.usuario.user._id );
        console.log("resp get user", resp);
        if (resp) {
          console.log("ok getUser")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async getAllUser(){
      await this.autService.loadToken();
      const headers = new HttpHeaders({
        'Authorization': this.autService.token
      });
      return new Promise( resolve =>{
        this.http.get(`${URL_SERVICIOS}/user`, { headers })
        .subscribe( resp =>{
          console.log("resp getAllUser", resp);
          if (resp) {
            console.log("ok getAllUser")
             resolve(true);
          }else{
             resolve(false);
          }
        });
      });
  }

  async updateUser(id){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/update-user/:`+ this.usuario._id, { headers })
      .subscribe( resp =>{
        console.log("resp updateUser", resp);
        if (resp) {
          console.log("ok updateUser")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async deleteUser(id){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.delete(`${URL_SERVICIOS}/user/:`+ this.usuario._id, { headers })
      .subscribe( resp =>{
        console.log("resp deleteUser", resp);
        if (resp) {
          console.log("ok deleteUser")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async registerCliente( cliente: Cliente){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/customer`, cliente,  { headers })
      .subscribe( resp =>{
        this.cliente = resp;
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

  
  async getClient( id ){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.get(`${URL_SERVICIOS}/customer/:`+ this.cliente.user._id, { headers })
      .subscribe( resp =>{
        console.log("this.cliente._id", this.cliente.user._id );
        console.log("resp getClient", resp);
        if (resp) {
          console.log("ok getClient")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async getAllClient(){
      await this.autService.loadToken();
      const headers = new HttpHeaders({
        'Authorization': this.autService.token
      });
      return new Promise( resolve =>{
        this.http.get(`${URL_SERVICIOS}/customer`, { headers })
        .subscribe( resp =>{
          console.log("resp getAllClient", resp);
          if (resp) {
            console.log("ok getAllClient")
             resolve(true);
          }else{
             resolve(false);
          }
        });
      });
  }

  async updateClient(id){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/customer/:`+ this.cliente._id, { headers })
      .subscribe( resp =>{
        console.log("resp updateUser", resp);
        if (resp) {
          console.log("ok updateUser")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async deleteClient(id){ 
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.delete(`${URL_SERVICIOS}/customer/:`+ this.cliente._id, { headers })
      .subscribe( resp =>{
        console.log("resp deleteClient", resp);
        if (resp) {
          console.log("ok deleteClient")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

    
  /*async validToken(): Promise<boolean>{
    await this.loadToken();
    if ( !this.token ){
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false);
    }
    return new Promise<boolean>( resolve =>{
      const headers = new HttpHeaders({
        'Authorization': this.token
      });
      this.http.post(`${URL_SERVICIOS}/register`, { headers })
      .subscribe( resp =>{
        if (resp) {
          console.log('usuario' , resp );
          resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
           resolve(false);
        }
      });
    });
  }*/

  /*getUser(){
    if ( !this.usuario.id){
      this.validToken();
    }
      return {...this.usuario };
    }*/

}