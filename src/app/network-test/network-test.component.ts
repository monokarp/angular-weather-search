import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { NetworkTestStore } from './network-test.store';

@Component({
  selector: 'app-network-test',
  imports: [MatButtonToggleModule],
  templateUrl: './network-test.component.html',
  styleUrl: './network-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkTestComponent {
  constructor(public store: NetworkTestStore) {}

  public onChange(event: MatButtonToggleChange) {
    this.store.network$.next({
      slowNetwork: event.value.includes('slow'),
      requestsThrow: event.value.includes('errors'),
    });
  }
}
