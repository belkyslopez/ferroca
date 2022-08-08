import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Producto } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    
  token: string = null;

  constructor( private http: HttpClient,
    private autService: AuthenticateService) { }

  async registerProduct( producto: Producto){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/producto`, producto, { headers })
      .subscribe( resp =>{
        console.log("resp register Producto", resp);
        if (resp) {
          console.log("ok register Producto")
           resolve(true);
        }else{
           this.token = null;
           resolve(false);
        }
      });
    });
  }
}