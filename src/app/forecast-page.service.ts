import { Injectable } from '@angular/core';
import { ForecastPageStore } from './forecast-page.store';
import { WeatherService } from './data/weather.service';
import { Location, LocationSelectOption } from './data/weather.types';
import { LocationBookmarkService } from './location-bookmark.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ForecastPageService {
  constructor(
    private store: ForecastPageStore,
    private weather: WeatherService,
    private bookmarks: LocationBookmarkService,
    private snackbar: MatSnackBar,
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
      this.snackbar.open((err as Error).message, 'OK', { duration: 5000, panelClass: 'notification-snackbar' });
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
      this.snackbar.open((err as Error).message, 'OK', { duration: 5000, panelClass: 'notification-snackbar' });
    } finally {
      this.store.loadingLocations$.next(false);
    }

    return [];
  }

  private allBookmarkedLocations() {
    return this.bookmarks.all().map((one) => ({ ...one, isBookmarked: true }));
  }
}
