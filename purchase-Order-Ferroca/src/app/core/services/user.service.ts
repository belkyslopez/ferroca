import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token: string = null;
  usuario

  constructor( private http: HttpClient) { }

  register( usuario: Usuario){
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/register`, usuario)
      .subscribe( resp =>{
        console.log("resp register", resp);
        if (resp) {
          console.log("ok register")
          // this.saveToken(resp['ok']);
           resolve(true);
        }else{
           this.token = null;
           //this.storage.clear();
           resolve(false);
        }
      });
    });
  }

  getUser(){
    return {...this.usuario };
  }
}
