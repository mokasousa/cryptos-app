import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinMarket, CoinsClient } from '../../client';
import { StorageService, StorageType } from '../../shared/storage';

@Component({
  selector: 'app-list-page',
  imports: [Card, Search],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage {
  private readonly favorites: WritableSignal<string[]> = signal([]);
  private readonly storageService = inject(StorageService);
  private readonly coinsClient = inject(CoinsClient);
  protected search: WritableSignal<string> = signal('');
  private readonly coins$: Observable<CoinMarket[]> = toObservable(this.search).pipe(
    switchMap((search: string) => {
      console.log('get api')
      return this.coinsClient.getMockList(search);
    }),
  );
  protected readonly coins: Signal<CoinMarket[]> = toSignal(this.coins$, { initialValue: [] });

  ngOnInit(): void {
    const favorites = this.storageService.getArray(StorageType.favorites);
    this.favorites.set(favorites);
  }

  private updateFavorite(favorites: string[]): void {
    this.favorites.update(() => [...favorites]);
    this.storageService.setArray(StorageType.favorites, favorites);
  }

  protected onSaveFavorite(id: string) {
    const favorites = [...this.favorites(), id];
    this.updateFavorite(favorites);
  }

  protected onRemoveFavorite(id: string) {
    const favorites = this.favorites().filter((item: string) => item !== id);
    this.updateFavorite(favorites);
  }
}
