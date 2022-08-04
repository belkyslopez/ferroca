import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    
  token: string = null;
  usuario

  constructor( private http: HttpClient) { }

  registerProduct( producto: Producto){
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/producto`, producto)
      .subscribe( resp =>{
        console.log("resp register Producto", resp);
        if (resp) {
          console.log("ok register Producto")
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
}
