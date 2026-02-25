import { Component, input } from '@angular/core';
import { CoinMarket } from '../../../client';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  protected coin = input.required<CoinMarket>();

}
