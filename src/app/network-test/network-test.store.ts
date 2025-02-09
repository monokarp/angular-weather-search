import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NetworkObstructionConfig {
  slowNetwork: boolean;
  requestsThrow: boolean;
}

@Injectable({ providedIn: 'root' })
export class NetworkTestStore {
  public readonly network$ = new BehaviorSubject<NetworkObstructionConfig>({
    slowNetwork: false,
    requestsThrow: false,
  });
}
