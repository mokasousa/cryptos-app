import { Injectable } from '@angular/core';
import { Observable, defer, of, tap } from 'rxjs';

interface Fallback<T> {
  t: number;
  data: T;
}

const DEFAULT_TIMESTAMP = 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly storage: Storage = localStorage;

  fallbackList<T extends { id: string }[]>(
    key: string,
    t: number = DEFAULT_TIMESTAMP
  ) {
    return (source: Observable<T>): Observable<T> =>
      defer(() => {
        const fallback = this.get<T>(key);
        const now = Date.now();

        if (fallback && now - fallback.t < t) {
          return of(fallback.data);
        }

        return source.pipe(
          tap((fresh) => {
            const merged = fallback
              ? this.mergeListById(fresh, fallback.data)
              : fresh;

            this.set<T>(key, merged, now);
          })
        );
      });
  }

  private mergeListById<T extends { id: string }[]>(
    fresh: T,
    cached: T
  ): T {
    const map = new Map(
      cached.map(item => [item.id, item])
    );

    return fresh.map(freshItem => {
      const cachedItem = map.get(freshItem.id);
      if (!cachedItem) {
        return freshItem;
      }

      return { ...cachedItem, ...freshItem };
    }) as T;
  }

  public get<T>(key: string): Fallback<T> | null {
    const value = this.storage.getItem(key);
    if (!value) {
        return null;
    }

    return JSON.parse(value) as Fallback<T>;
  }

  public set<T>(key: string, data: T, t: number): void {
    const value: Fallback<T> = { data, t };
    this.storage.setItem(key, JSON.stringify(value));
  }
}
