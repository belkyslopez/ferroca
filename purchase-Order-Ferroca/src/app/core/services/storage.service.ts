import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null =null;
  private _localUser: Usuario[] = [];

  constructor(private storage: Storage) {
    this.init();
   }

   async init(){
    const storage = await this.storage.create();
    this._storage = storage;
   }
}
