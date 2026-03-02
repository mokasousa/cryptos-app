import { EMPTY, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinMarket, CoinsClient } from '../../client';

@Component({
  selector: 'app-list-page',
  imports: [Card, Search],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage {
  private readonly coinsClient = inject(CoinsClient);
  protected readonly loading: WritableSignal<boolean> = signal(false);

  // Favorites
  protected readonly favorites: WritableSignal<CoinMarket[]> = signal([]);

  // Search
  protected readonly clear: WritableSignal<boolean> = signal(false);
  protected readonly search: WritableSignal<string> = signal('');
  private readonly searchable$: Observable<CoinMarket[]> = toObservable(this.search).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((search: string) => {
      const partial = search.trim().length > 3;
      if (partial) {
        this.loading.set(true);
        return this.coinsClient.getListWithMarketData(search).pipe(finalize(() => this.loading.set(false)));
      }
      return of([]);
    }),
  );
  protected readonly searchable: Signal<CoinMarket[]> = toSignal(this.searchable$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.getFavorites();
  }

  private getFavorites(): void {
    this.loading.set(true);
    this.coinsClient
      .getListFavorites()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((favorites: CoinMarket[]) => this.favorites.set(favorites));
  }

  protected onSearch(data: string): void {
    this.clear.set(false);
    this.search.set(data);
  }

  protected onSaveFavorite(id: string) {
    this.coinsClient.toggleFavorite(id, true);
    this.getFavorites();
    this.clear.set(true);
  }

  protected onRemoveFavorite(id: string) {
    this.coinsClient.toggleFavorite(id, false);
    this.getFavorites();
    this.clear.set(true);
  }
}
