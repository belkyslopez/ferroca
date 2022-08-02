import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Storage } from '@ionic/storage'
import { URL_SERVICIOS } from '../config/url.services';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  token: string = null;

  constructor(    
     private http: HttpClient ) { }


  login(email: string, password: string){
    const data = { email, password };
    this.http.post(`${URL_SERVICIOS}/api/login`, data)
    .subscribe( resp =>{
      console.log("resp login", resp);
    });

  }
}
