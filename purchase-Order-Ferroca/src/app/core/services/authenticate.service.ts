import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url.services';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  token: string = null;

  constructor(    
     private http: HttpClient,
     private storage: Storage,
     private storageService: StorageService,
     private navCtrl: NavController ) { }

  login(email: string, password: string){
    const data = { email, password };
    console.log("data ", data);
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/login`, data)
      .subscribe( async resp =>{
        console.log("resp login", resp);
        if (resp) {
          console.log("ok login")
         await this.saveToken( resp['token'] );
          resolve(true);
        }else{
         this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  
  async validToken(): Promise<boolean>{
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
         // this.user = resp['usuario'];
         console.log('usuario' , resp );
           resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
           resolve(false);
        }
      });
    });
  }

  async saveToken (token: string){
    this.token = token;
    await this.storage.set('token', token);
  //  this.validToken();
  }

  async loadToken(){
    this.token = await this.storage.get('token') || null;
  }

  logout(){
    this.token = null;
    //this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true});
  }


}
