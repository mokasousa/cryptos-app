import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly loadingCount = signal(0);
  public readonly loading = computed(() => this.loadingCount() > 0);

  startLoading(): void {
    this.loadingCount.update((n: number) => n + 1);
  }

  stopLoading(): void {
    this.loadingCount.update((n: number) => Math.max(0, n - 1));
  }
}
