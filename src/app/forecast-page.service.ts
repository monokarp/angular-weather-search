import { Injectable } from '@angular/core';
import { ForecastPageStore } from './forecast-page.store';
import { WeatherService } from './data/weather.service';
import { Location, LocationSelectOption } from './data/weather.types';
import { LocationBookmarkService } from './location-bookmark.service';

@Injectable()
export class ForecastPageService {
  constructor(
    private store: ForecastPageStore,
    private weather: WeatherService,
    private bookmarks: LocationBookmarkService,
  ) {}

  public loadBookmarkedLocations() {
    const bookmarked = this.bookmarks.all().map((one) => ({ ...one, isBookmarked: true }));

    this.store.locations$.next(bookmarked);
  }

  public async searchCity(name: string): Promise<void> {
    const locations: Location[] = name ? await this.weather.suggestLocations(name) : [];

    const bookmarked = this.bookmarks.all().map((one) => ({ ...one, isBookmarked: true }));
    const suggested = locations.map((one) => ({ ...one, isBookmarked: false }));

    this.store.locations$.next(bookmarked.concat(suggested));
  }

  public async selectLocation(location: LocationSelectOption) {
    const forecastData = await this.weather.currentWeatherAt(location);

    this.store.forecastData$.next(forecastData);
  }

  public bookmarkLocation(location: LocationSelectOption): void {
    this.bookmarks.toggleBookmark(location);

    location.isBookmarked = !location.isBookmarked;
  }
}
