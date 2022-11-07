import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url.services';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  token: string = null;
  user: any;
  updateUser = new Subject();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private storageService: StorageService,
    private navCtrl: NavController) { }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise<any>(resolve => {
      this.http.post(`${URL_SERVICIOS}/login`, data)
        .subscribe(async resp => {
          if (resp) {
            console.log("ok login")
            await this.saveToken(resp['token']);
            this.saveUser(resp);
            this.updateUser.next(resp);
            resolve({valid: true});
          }
        }, (error) => {
          console.log('login error', error)
          this.storage.clear();
          resolve({valid: false, message: error.error.message});
        } );
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async saveUser(resp) {
    this.user = await this.storage.set('resp', resp);
    console.log("user add storage success!");
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  logout() {
    this.token = null;
    this.user = null;
    this.updateUser.next({});
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

}
