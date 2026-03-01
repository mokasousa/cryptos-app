import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, computed, inject, input, InputSignal, output, SecurityContext, Signal } from '@angular/core';

import { CoinMarket } from '../../../client';
import { CurrencyAdaptPipe } from '../../../shared/currency-adapt';

@Component({
  selector: 'app-card',
  styleUrl: './card.scss',
  templateUrl: './card.html',
  imports: [CommonModule, CurrencyAdaptPipe],
})
export class Card {
  protected favorite: Signal<boolean> = computed(() => this.coin().favorite);
  private sanitizer = inject(DomSanitizer);
  public readonly coin: InputSignal<CoinMarket> = input.required<CoinMarket>();
  protected readonly image: Signal<string | null> = computed(() => this.coin().image && this.sanitizer.sanitize(SecurityContext.URL, this.coin().image));
  protected save = output<string>();
  protected remove = output<string>();

  onToggleFavorite() {
    const id = this.coin().id;
    if (this.favorite()) {
      this.remove.emit(id);
    } else {
      this.save.emit(id);
    }
  }
}
