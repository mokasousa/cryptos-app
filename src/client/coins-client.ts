import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CoinMarket } from './models/coin-market';
import { environment } from '../environments/environment';
import { CacheService } from '../shared/cache';

const COINS_FALLBACK = '_coins'

@Injectable({
  providedIn: 'root',
})
export class CoinsClient {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private readonly headers = { 'x-cg-api-key': environment.geckoApiKey };

  getListWithMarketData(search?: string): Observable<CoinMarket[]> {
    const partial = (search ?? '').trim().toLowerCase();
    const items = map((items: any[]) => items.map((item: any) => new CoinMarket(item)));
    const filter = map((items: CoinMarket[]) => {
      if (!partial) {
        return items;
      }

      return items.filter((item) => item.name.toLowerCase().includes(partial));
    });

    return this.http
      .get<CoinMarket[]>(
        `${environment.geckoUrl}/coins/markets?vs_currency=eur&price_change_percentage=1h`,
        { headers: this.headers }
      )
      .pipe(
        items,
        this.cacheService.fallbackList<CoinMarket[]>(COINS_FALLBACK),
        filter,
        delay(1000)
      );
  }

  getListFavorites(): Observable<CoinMarket[]> {
    return this.getListWithMarketData().pipe(
      map((items: CoinMarket[]) => items.filter((item) => item.favorite))
    );
  }

  toggleFavorite(id: string, favorite: boolean): void {
    const fallback = this.cacheService.get<CoinMarket[]>(COINS_FALLBACK);
    const data = fallback?.data ?? [];
    const t = fallback?.t ?? Date.now();

    const updated = data.map((item) =>
      item.id === id ? ({ ...item, favorite } as CoinMarket) : item
    );

    this.cacheService.set(COINS_FALLBACK, updated, t);
  }
}