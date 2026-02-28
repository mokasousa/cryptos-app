import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CoinMarket } from './models/coin-market';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoinsClient {
  private http = inject(HttpClient);
  private readonly headers = { 'x-cg-pro-api-key': environment.geckoApiKey };

  getListWithMarketData(): Observable<CoinMarket[]> {
    const items = map((items: any) => items.map((item: any) => new CoinMarket(item)));
    return this.http
      .get(`${environment.geckoUrl}/coins/markets?vs_currency=eur&price_change_percentage=1h`, {
        headers: this.headers,
      })
      .pipe(items);
  }

  getMockList(search?: string): Observable<CoinMarket[]> {
    console.log('Getting mock list', search);
    return of([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
        current_price: 54963,
        market_cap: 1099869633131,
        market_cap_rank: 1,
        fully_diluted_valuation: 1099869633131,
        total_volume: 35215492604,
        high_24h: 55842,
        low_24h: 53463,
        price_change_24h: -341.5445311392832,
        price_change_percentage_24h: -0.61757,
        market_cap_change_24h: -10360796141.339844,
        market_cap_change_percentage_24h: -0.93321,
        circulating_supply: 19996031.0,
        total_supply: 19996031.0,
        max_supply: 21000000.0,
        ath: 107662,
        ath_change_percentage: -48.94841,
        ath_date: '2025-10-06T18:57:42.558Z',
        atl: 51.3,
        atl_change_percentage: 107043.64976,
        atl_date: '2013-07-05T00:00:00.000Z',
        roi: null,
        last_updated: '2026-02-28T17:17:23.570Z',
        price_change_percentage_24h_in_currency: -0.6175707073065398,
      },
    ]).pipe(map((items: any) => items.map((item: any) => new CoinMarket(item))));
  }
}
