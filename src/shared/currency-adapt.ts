import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyAdapt',
})
export class CurrencyAdaptPipe implements PipeTransform {
  private readonly currency = inject(CurrencyPipe);

  transform(value: number): string | null {
    if (!value || typeof value !== 'number' || !Number.isFinite(value)) {
      return null;
    }

    if (value > 1e12) {
      const divide = value / 1e12;
      console.log(value, divide);
      const formatted = this.currency.transform(divide, 'EUR', 'symbol');
      return `${formatted}T`;
    }

    if (value > 1e9) {
      const divide = value / 1e9;
      console.log(value, divide);
      const formatted = this.currency.transform(divide, 'EUR', 'symbol');
      return `${formatted}B`;
    }

    if (value > 1e6) {
      const divide = value / 1e6;
      console.log(value, divide);
      const formatted = this.currency.transform(divide, 'EUR', 'symbol');
      return `${formatted}M`;
    }

    if (value > 1e3) {
      const divide = value / 1e3;
      console.log(value, divide);
      const formatted = this.currency.transform(divide, 'EUR', 'symbol');
      return `${formatted}K`;
    }

    return this.currency.transform(value, 'EUR', 'symbol');
  }
}