import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, computed, inject, input, output, SecurityContext, Signal } from '@angular/core';

import { CoinMarket } from '../../../client';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  protected favorite: Signal<boolean> = computed(() => this.coin().favorite);
  private sanitizer = inject(DomSanitizer);
  public readonly coin: Signal<CoinMarket> = input.required<CoinMarket>();
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
