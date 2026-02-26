import { Component, inject, signal, Signal } from '@angular/core';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinMarket, CoinsClient } from '../../client';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-page',
  imports: [Card, Search],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage {
  private readonly coinsClient = inject(CoinsClient);
  
  protected search: Signal<string> = signal('');
  private coins$ = toObservable(this.search).pipe(switchMap(search => this.coinsClient.getMockList(search)));
  protected coins: Signal<CoinMarket[]> = toSignal(this.coins$, { initialValue: [] });

  ngOnInit() {
  }
}
