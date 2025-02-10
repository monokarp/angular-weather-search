import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
  url: string;
  response: HttpResponse<unknown>;
  entryTime: number;
}

export const CacheAgeMS = 60 * 60 * 1000;
