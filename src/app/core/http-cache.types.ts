/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}

export const CacheAgeMS = 60 * 60 * 1000;
