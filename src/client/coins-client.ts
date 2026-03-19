import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoinMarket } from './models/coin-market';
import { environment } from '../environments/environment';
import { CacheService } from '../shared/cache';
import { map, Observable, of, tap } from 'rxjs';

const COINS_FALLBACK = '_coins';

@Injectable({
  providedIn: 'root',
})
export class CoinsClient {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  private readonly headers = { 'x-cg-api-key': environment.geckoApiKey };

  private readonly _coins = signal<CoinMarket[]>([]);
  public readonly coins = this._coins.asReadonly();

  public readonly favorites = computed(() => this._coins().filter((item) => item.favorite));

  loadList(): Observable<CoinMarket[]> {
    const fallback = this.cacheService.getTimed<CoinMarket[]>(COINS_FALLBACK);
    debugger;
    if (fallback) {
      this._coins.set(fallback);
      return of(fallback);
    }

    const items = map((items: any[]) => items.map((item: any) => new CoinMarket(item)));
    
    return this.http
      .get<any>(
        `${environment.geckoUrl}/coins/markets?vs_currency=eur&price_change_percentage=1h`,
        { headers: this.headers },
      )
      .pipe(
        items,
        tap((coins: CoinMarket[]) => {
          const merged = this.coins() ? CoinMarket.updateData(coins, this.coins()) : coins;
          this.cacheService.setTimed(COINS_FALLBACK, merged);
          this._coins.set(merged);
        }),
      );
  }

  toggleFavorite(id: string, favorite: boolean): void {
    const updated = this._coins().map((item) => (item.id === id ? { ...item, favorite } : item));

    this._coins.set(updated);
    this.cacheService.setTimed(COINS_FALLBACK, updated);
  }
}
