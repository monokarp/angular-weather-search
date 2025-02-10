import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { CitySearchComponent } from './city-search/city-search.component';
import { DisposableComponent } from './common/disposable.component';
import { LoadingOverlayComponent } from './common/loading-overlay/loading-overlay.component';
import { BadNetworkWeatherService } from './data/bad-network-weather.service';
import { DataModule } from './data/data.module';
import { WeatherService } from './data/weather.service';
import { ForecastPageService } from './forecast-page.service';
import { ForecastPageStore } from './forecast-page.store';
import { LocationBookmarkService } from './location-bookmark.service';
import { NetworkTestComponent } from './network-test/network-test.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { TestIdDirective } from './common/test-id.directive';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    CitySearchComponent,
    WeatherDisplayComponent,
    DataModule,
    NetworkTestComponent,
    MatSnackBarModule,
    LoadingOverlayComponent,
    TestIdDirective,
  ],
  providers: [
    { provide: WeatherService, useExisting: BadNetworkWeatherService },
    ForecastPageStore,
    ForecastPageService,
    LocationBookmarkService,
  ],
  templateUrl: './forecast-page.component.html',
  styleUrl: './forecast-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastPageComponent extends DisposableComponent implements AfterViewInit {
  @ViewChild('searchComponent') searchComponent!: CitySearchComponent;

  constructor(
    public store: ForecastPageStore,
    private service: ForecastPageService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.service.loadBookmarkedLocations();

    outputToObservable(this.searchComponent.search)
      .pipe(
        this.takeUntilDispose(),
        debounceTime(300),
        switchMap((cityName) => (cityName ? this.service.searchCity(cityName) : of(this.service.clearSuggestions()))),
      )
      .subscribe();

    outputToObservable(this.searchComponent.select)
      .pipe(
        this.takeUntilDispose(),
        switchMap((location) => this.service.loadForecast(location)),
      )
      .subscribe();

    outputToObservable(this.searchComponent.toggleBookmark)
      .pipe(
        this.takeUntilDispose(),
        tap((location) => this.service.bookmarkLocation(location)),
      )
      .subscribe();

    outputToObservable(this.searchComponent.dismissed)
      .pipe(
        this.takeUntilDispose(),
        tap(() => this.service.clearSuggestions()),
      )
      .subscribe();
  }
}
