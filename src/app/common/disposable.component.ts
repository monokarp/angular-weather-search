import { Directive, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class DisposableComponent implements OnDestroy {
  protected readonly dispose$ = new Subject<void>();

  protected readonly takeUntilDispose = <T>() => takeUntil<T>(this.dispose$);

  public ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
