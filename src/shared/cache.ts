import { Injectable } from '@angular/core';

interface Fallback<T> {
  t: number;
  data: T;
}

const DEFAULT_TIMESTAMP = 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly storage: Storage = localStorage;

  getTimed<T>(key: string, t: number = DEFAULT_TIMESTAMP): T | null {
    const item = this.storage.getItem(key);
    if (!item) {
      return null;
    }

    const cached = JSON.parse(item) as Fallback<T>;
    const threshold = cached && Date.now() - cached.t < t;

    if (threshold) {
      this.remove(key);
      return null;
    }

    return cached.data;
  }

  setTimed<T>(key: string, data: T): void {
    const entry: Fallback<T> = {
      data,
      t: Date.now(),
    };

    this.storage.setItem(key, JSON.stringify(entry));
  }

  private remove(key: string): void {
    this.storage.removeItem(key);
  }
}