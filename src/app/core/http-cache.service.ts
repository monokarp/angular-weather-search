import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { CacheAgeMS, CacheEntry } from './http-cache.types';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private readonly cache = new Map<string, CacheEntry>();

  public get(req: HttpRequest<unknown>): HttpResponse<unknown> | null {
    const entry = this.cache.get(req.urlWithParams);

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.entryTime > CacheAgeMS;

    return isExpired ? null : entry.response;
  }

  public save(req: HttpRequest<unknown>, res: HttpResponse<unknown>): void {
    const entry: CacheEntry = { url: req.urlWithParams, response: res, entryTime: Date.now() };

    this.cache.set(req.urlWithParams, entry);

    this.deleteExpiredCache();
  }

  private deleteExpiredCache() {
    this.cache.forEach((entry) => {
      if (Date.now() - entry.entryTime > CacheAgeMS) {
        this.cache.delete(entry.url);
      }
    });
  }
}
