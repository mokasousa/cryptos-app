import { Observable, of } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinMarket, CoinsClient } from '../../client';
import { LoaderService } from '../../shared/loader';

@Component({
  selector: 'app-list-page',
  imports: [Card, Search],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage {
  private readonly coinsClient = inject(CoinsClient);
  private readonly loaderService = inject(LoaderService);

  protected readonly search: WritableSignal<string> = signal('');
  protected readonly clear: WritableSignal<boolean> = signal(false);
  protected readonly favorites: WritableSignal<CoinMarket[]> = signal([]);
  
  private readonly searchable$: Observable<CoinMarket[]> = toObservable(this.search).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((search: string) => {
      const partial = search.trim().length >= 3;
      if (partial) {
        this.loaderService.startLoading();
        return this.coinsClient.getListWithMarketData(search).pipe(finalize(() => this.loaderService.stopLoading()));
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
    this.loaderService.startLoading();

    this.coinsClient
      .getListFavorites()
      .pipe(
        finalize(() => this.loaderService.stopLoading())
      ).subscribe((favorites: CoinMarket[]) => this.favorites.set(favorites));
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
