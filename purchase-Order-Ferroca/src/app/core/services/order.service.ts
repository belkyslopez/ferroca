import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { URL_SERVICIOS } from '../config/url.services';
import { Producto } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  token: string = null;
  allOrders: any;
  order: any;
  items: any = {};
  updateOrders = new Subject();

  constructor(
    private http: HttpClient,
    private autService: AuthenticateService
  ) { }

  async getOrderByUser(userId: string) {
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL_SERVICIOS}/order/by-user/` + userId, { headers })
        .subscribe(resp => {
          this.allOrders = resp['orders'];
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async getAllOrders() {
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL_SERVICIOS}/orders`, { headers })
        .subscribe(resp => {
          this.allOrders = resp['orders'];
          this.updateOrders.next(this.allOrders);
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  addProduct(product: Producto, quantity) {
    this.items[product._id] = { ...product, quantity};
  }

  editProduct(productId, quantity) {
    this.items[productId].quantity = quantity;
    return Object.values(this.items);
  }

  removeProduct(productId) {
    delete this.items[productId];
    return Object.values(this.items);
  }

  getOrder(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MmRmNGY2ZTZhMzVlNjEyMTFjNjRmM2YiLCJuYW1lIjoiTHVpcyIsInN1cm5hbWUiOiJCYXNjdcOxw6FuIiwiZW1haWwiOiJhbGdvQGVqZW1wbG8uY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImltYWdlIjoibnVsbCIsImlhdCI6MTY1ODgwNDQ4MH0.RMsNbkRukUs9wijNTgxkFOUWky1IhLOsS0lunFh-GRs'
    });
    return this.http.get<any>(`${URL_SERVICIOS}/order` + `/${id}`, { headers });
  }

  async updateOrder(order) {
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL_SERVICIOS}/order/` + order._id, { ...order, _id: undefined }, { headers })
        .subscribe(resp => {
          if (resp) {
            // console.log("updateOrder success")
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async saveOrder(order) {
    await this.autService.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.autService.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL_SERVICIOS}/order`, order, { headers })
        .subscribe(resp => {
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
  clearProducts(){
    this.items = [];
  }

}
