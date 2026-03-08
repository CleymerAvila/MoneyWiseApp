import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage){
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set<T>(key: string, value: any) : Promise<void>{
    return await this._storage?.set(key, value);
  }

  async get<T>(key: string): Promise<T>{
    return await this._storage?.get(key);
  }

  async remove(key: string){
    return await this._storage?.remove(key);
  }

  async clearAllData() {
    await this._storage?.clear();
  }
}
