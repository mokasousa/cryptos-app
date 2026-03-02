import { RouterOutlet } from '@angular/router';
import { Component, computed, inject, Signal, signal } from '@angular/core';

import { environment } from '../environments/environment';
import { LoaderService } from '../shared/loader';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Cryptos App');
  private readonly loaderService = inject(LoaderService);
  protected loading: Signal<boolean> = this.loaderService.loading;

  constructor() {
    this.loadFontAwesome();
  }

  private loadFontAwesome() {
    const script = document.createElement('script');
    script.src = environment.fontAwesome;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
