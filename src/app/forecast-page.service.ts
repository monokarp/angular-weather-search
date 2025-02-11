import { Injectable } from '@angular/core';
import { NotificationService } from './common/notifications.service';
import { WeatherService } from './data/weather.service';
import { Location, LocationSelectOption } from './data/weather.types';
import { ForecastPageStore } from './forecast-page.store';
import { LocationBookmarkService } from './location-bookmark.service';

@Injectable()
export class ForecastPageService {
  constructor(
    private store: ForecastPageStore,
    private weather: WeatherService,
    private bookmarks: LocationBookmarkService,
    private notifications: NotificationService,
  ) {}

  public loadBookmarkedLocations() {
    const bookmarked = this.bookmarks.all().map((one) => ({ ...one, isBookmarked: true }));

    this.store.locations$.next(bookmarked);
  }

  public async searchCity(name: string): Promise<void> {
    const suggestedLocations = (await this.requestSuggestedLocations(name)).map((one) => ({
      ...one,
      isBookmarked: false,
    }));

    this.store.locations$.next(this.allBookmarkedLocations().concat(suggestedLocations));
  }

  public clearSuggestions() {
    this.store.locations$.next(this.allBookmarkedLocations());
  }

  public async loadForecast(location: LocationSelectOption) {
    const requiresOverlay = !!this.store.forecastData$.getValue();

    if (requiresOverlay) {
      this.store.loadingForecast$.next(true);
    }

    try {
      const forecastData = await this.weather.currentWeatherAt(location);

      this.store.forecastData$.next(forecastData);
    } catch (err) {
      this.notifications.error((err as Error).message);
    } finally {
      if (requiresOverlay) {
        this.store.loadingForecast$.next(false);
      }
    }
  }

  public bookmarkLocation(location: LocationSelectOption): void {
    this.bookmarks.toggleBookmark(location);

    location.isBookmarked = !location.isBookmarked;
  }

  private async requestSuggestedLocations(cityName: string): Promise<Location[]> {
    this.store.loadingLocations$.next(true);

    try {
      return await this.weather.suggestLocations(cityName);
    } catch (err) {
      this.notifications.error((err as Error).message);
    } finally {
      this.store.loadingLocations$.next(false);
    }

    return [];
  }

  private allBookmarkedLocations() {
    return this.bookmarks.all().map((one) => ({ ...one, isBookmarked: true }));
  }
}
