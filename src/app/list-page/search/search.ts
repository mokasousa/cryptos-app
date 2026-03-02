import { Component, effect, input, InputSignal, output, OutputEmitterRef, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  protected search: WritableSignal<string> = signal('');
  public onInput: OutputEmitterRef<string> = output<string>();
  public placeholder: InputSignal<string> = input<string>('Search...');
  public clear: InputSignal<boolean> = input<boolean>(false);

  constructor() {
    effect(() => {
      this.search(),
      this.onInput.emit(this.search())
    })

    effect(() => {
      this.clear(),
      this.clear() && this.search.set('');
    })
  }
}
