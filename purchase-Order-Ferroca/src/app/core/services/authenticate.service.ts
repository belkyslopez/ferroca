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
         this.saveUser(resp);
         console.log(" this.save(resp)", resp)
          resolve(true);
        }else{
         this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async saveToken (token: string){
    this.token = token;
    await this.storage.set('token', token);
  }

  async saveUser(resp){
    await this.storage.set('resp', resp);
    console.log("saveUser ====>>>>", resp._id);
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
