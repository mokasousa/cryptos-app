import { Injectable } from "@angular/core";
export enum StorageType {
    favorites = 'favorites',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public getArray(key: string): any[] {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  public setArray(key: string, data: any[]): void {
    this.storage.setItem(key, JSON.stringify(data));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }
}
