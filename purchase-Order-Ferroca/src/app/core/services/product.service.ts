import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Producto } from '../interfaces/interfaces';
import { URL_SERVICIOS } from '../config/url.services';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    
  token: string = null;
  producto: any;
  allProducts: any;
  image:any;

  constructor( private http: HttpClient,
    private autService: AuthenticateService
    ) { }

  async registerProduct( producto: Producto){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post<any>(`${URL_SERVICIOS}/product`, producto, { headers })
      .subscribe( resp =>{
        this.producto = resp.product;
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

  detailsProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MmRmNGY2ZTZhMzVlNjEyMTFjNjRmM2YiLCJuYW1lIjoiTHVpcyIsInN1cm5hbWUiOiJCYXNjdcOxw6FuIiwiZW1haWwiOiJhbGdvQGVqZW1wbG8uY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImltYWdlIjoibnVsbCIsImlhdCI6MTY1ODgwNDQ4MH0.RMsNbkRukUs9wijNTgxkFOUWky1IhLOsS0lunFh-GRs'
    });
    return this.http.get<any>(`${URL_SERVICIOS}/product`+`/${id}`, { headers });
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

  async updateProduct(producto){
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.put(`${URL_SERVICIOS}/product/`+ producto._id, {...producto, _id: undefined},  { headers })
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
      this.http.delete(`${URL_SERVICIOS}/product/`+ id, { headers })
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

  async addImg(formData, id: string ){ 
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.post(`${URL_SERVICIOS}/upload-image-product/`+ id, formData, { headers })
      .subscribe( resp =>{
        console.log("upload-image-product", resp);
        if (resp) {
          console.log("ok upload-image-product")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

  async getImg(nameFile: string ){ 
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise( resolve =>{
      this.http.delete(`${URL_SERVICIOS}/get-image-product/`+ nameFile, { headers })
      .subscribe( resp =>{
        console.log("get-image-productt", resp);
        if (resp) {
          console.log("get-image-product")
           resolve(true);
        }else{
           resolve(false);
        }
      });
    });
  }

}