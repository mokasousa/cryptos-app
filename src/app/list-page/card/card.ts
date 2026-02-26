import { Component, computed, inject, input, Signal } from '@angular/core';

import { CoinMarket } from '../../../client';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  private sanitizer = inject(DomSanitizer);
  public readonly coin: Signal<CoinMarket> = input.required<CoinMarket>();
  protected readonly image: Signal<SafeUrl> = computed(() => this.coin().image && this.sanitizer.bypassSecurityTrustUrl(this.coin().image));
}
