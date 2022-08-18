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
  producto: any;
  allProducts: any;

  constructor( private http: HttpClient,
    private autService: AuthenticateService) { }

  async registerProduct( producto: Producto){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/product`, producto, { headers })
      .subscribe( resp =>{
        this.producto = resp;
        console.log("resp register Producto", resp);
        if (resp) {
          console.log("ok register Producto")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  
  async getProduct( id: string ){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.get(`${URL_SERVICIOS}/product/`+ id, { headers })
      .subscribe( resp =>{
        if (resp) {
          console.log("ok getProduct")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async getAllProduct(){
      await this.autService.loadToken();
      const headers = new HttpHeaders({
        'Authorization': this.autService.token
      });
      return new Promise( resolve =>{
        this.http.get(`${URL_SERVICIOS}/product`, { headers })
        .subscribe( resp =>{
          this.allProducts = resp['products'];
          console.log("allProducts ", this.allProducts);
          console.log("resp getAllProduct", resp);
          if (resp) {
            console.log("ok getAllProduct")
             resolve(true);
          }else{
             resolve(false);
          }
        });
      });
  }

  async updateProduct(id){ // falta API ojo !
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/product/`+ this.producto._id, { headers })
      .subscribe( resp =>{
        console.log("resp updateProduct", resp);
        if (resp) {
          console.log("ok updateProduct")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async deleteProduct(id){ 
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.delete(`${URL_SERVICIOS}/product/`+ this.producto._id, { headers })
      .subscribe( resp =>{
        console.log("resp deleteProduct", resp);
        if (resp) {
          console.log("ok deleteProduct")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }
}