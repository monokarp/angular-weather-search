import { Injectable } from '@angular/core';
import { Location, LocationSelectOption } from './data/weather.types';

@Injectable()
export class LocationBookmarkService {
  private readonly indexKey = 'ng-weather-bookmarks';
  private readonly indexDelimiter = ',';

  public all(): Location[] {
    const index = localStorage.getItem(this.indexKey);

    if (!index) {
      return [];
    }

    return index.split(this.indexDelimiter).reduce((result, key) => {
      const item = localStorage.getItem(key);

      if (item) {
        result.push(JSON.parse(item) as Location);
      }

      return result;
    }, [] as Location[]);
  }

  public toggleBookmark(location: LocationSelectOption) {
    const existing = localStorage.getItem(location.name);

    if (existing) {
      localStorage.removeItem(location.name);

      this.removeFromIndex(location.name);
    } else {
      localStorage.setItem(
        location.name,
        JSON.stringify({ name: location.name, lat: location.lat, lon: location.lon, country: location.country }),
      );

      this.addToIndex(location.name);
    }
  }

  private removeFromIndex(value: string) {
    const index = localStorage.getItem(this.indexKey);

    if (index) {
      localStorage.setItem(
        this.indexKey,
        index
          .split(this.indexDelimiter)
          .filter((key) => key !== value)
          .join(this.indexDelimiter),
      );
    }
  }

  private addToIndex(value: string) {
    const index = localStorage.getItem(this.indexKey);

    if (index) {
      const existing = index.split(this.indexDelimiter);

      if (existing.indexOf(value) == -1) {
        localStorage.setItem(this.indexKey, existing.concat(value).join(this.indexDelimiter));
      }
    } else {
      localStorage.setItem(this.indexKey, value);
    }
  }
}
