import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Token } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string;

  constructor(
    private storage: Storage
  ) { }


  async loadTokenDecode(){
    this.token = await this.storage.get('token') || null;
    const decoded = jwtDecode<Token>(this.token);
    return decoded;
  }

}
