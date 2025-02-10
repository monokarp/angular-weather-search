import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';
import { environment } from '../../environments/environment';

export function httpCacheInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const cache = inject(HttpCacheService);

  if (!isCacheable(req)) {
    return next(req);
  }

  const cachedResponse = cache.get(req);

  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.save(req, event);
      }
    }),
  );
}

function isCacheable(req: HttpRequest<unknown>) {
  return req.method === 'GET' && req.urlWithParams.includes(environment.ApiUrl);
}
