import { RouterOutlet } from '@angular/router';
import { Component, signal } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Cryptos App');
  
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
