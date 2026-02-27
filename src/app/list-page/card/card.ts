import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, computed, inject, input, Signal } from '@angular/core';

import { CoinMarket } from '../../../client';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  private sanitizer = inject(DomSanitizer);
  public readonly coin: Signal<CoinMarket> = input.required<CoinMarket>();
  protected readonly image: Signal<SafeUrl> = computed(() => this.coin().image && this.sanitizer.bypassSecurityTrustUrl(this.coin().image));
  // this.sanitizer.sanitize(SecurityContext.URL, url)
}
