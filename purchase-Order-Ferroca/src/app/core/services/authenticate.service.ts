import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url.services';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  token: string = null;

  constructor(    
     private http: HttpClient,
     private storage: Storage,
     private storageService: StorageService ) { }

  login(email: string, password: string){
    const data = { email, password };
    console.log("data ", data);
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/login`, data)
      .subscribe( resp =>{
        console.log("resp login", resp);
        if (resp) {
          console.log("ok login")
         this.saveToken( resp['token'] );
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
    await this.storage.set('token', token)

  }



}
