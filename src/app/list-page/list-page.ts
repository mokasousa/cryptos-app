import { Component, computed, inject, signal, WritableSignal } from '@angular/core';

import { Card } from './card/card';
import { Search } from './search/search';
import { CoinsClient } from '../../client';
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
  protected readonly favorites = this.coinsClient.favorites;
  protected readonly searchable = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (term.length < 3) {
      return [];
    }

    return this.coinsClient.coins().filter((item) =>
      item.name.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.loaderService.startLoading();
    debugger;
    this.coinsClient.loadList().subscribe(() => this.loaderService.stopLoading());
  }

  protected onSearch(data: string): void {
    this.clear.set(false);
    this.search.set(data);
  }

  protected onSaveFavorite(id: string): void {
    this.coinsClient.toggleFavorite(id, true);
    this.clear.set(true);
  }

  protected onRemoveFavorite(id: string): void {
    this.coinsClient.toggleFavorite(id, false);
    this.clear.set(true);
  }
}
