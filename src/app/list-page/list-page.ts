import { Component, computed, inject } from '@angular/core';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinMarket, CoinsClient } from '../../client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  imports: [Card, Search],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage {
  private readonly coinsClient = inject(CoinsClient);

  protected coins$!: Observable<CoinMarket[]>;

  ngOnInit() {
    this.coins$ = this.coinsClient.getMockList();
  }
}
