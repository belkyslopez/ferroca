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
  cliente: any;
  allUsers:any;
  allClient:any;
  user:any;

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
      this.http.get(`${URL_SERVICIOS}/user/`+ id, { headers })
      .subscribe( resp =>{
        this.user = resp['user'];
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
          this.allUsers = resp['users'];
          console.log("allUsers ", this.allUsers);
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

  async updateUser(user){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/update-user/`+ user._id, {...user, _id: undefined, password: undefined }, { headers },)
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
      this.http.delete(`${URL_SERVICIOS}/user/`+ id, { headers })
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
      this.http.get(`${URL_SERVICIOS}/customer/`+ id, { headers })
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
          this.allClient = resp['customers'];
          console.log("allClient ", this.allClient);
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

  async updateClient(client){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/customer/`+ client._id, {...client, _id: undefined}, { headers })
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
      this.http.delete(`${URL_SERVICIOS}/customer/`+ id, { headers })
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

}