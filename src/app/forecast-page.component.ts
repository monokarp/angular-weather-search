import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { debounceTime, map, switchMap, tap } from 'rxjs';
import { CitySearchComponent } from './city-search/city-search.component';
import { DisposableComponent } from './common/disposable.component';
import { OpenWeatherService } from './data/integration/open-weather.service';
import { WeatherService } from './data/weather.service';
import { ForecastPageService } from './forecast-page.service';
import { ForecastPageStore } from './forecast-page.store';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { LocationBookmarkService } from './location-bookmark.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CitySearchComponent, WeatherDisplayComponent],
  providers: [OpenWeatherService, WeatherService, ForecastPageStore, ForecastPageService, LocationBookmarkService],
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
        tap((value) => console.log('search', value)),
        switchMap((cityName) => this.service.searchCity(cityName)),
      )
      .subscribe();

    outputToObservable(this.searchComponent.select)
      .pipe(
        this.takeUntilDispose(),
        tap((value) => console.log('select', value)),
        switchMap((location) => this.service.selectLocation(location)),
      )
      .subscribe();

    outputToObservable(this.searchComponent.toggleBookmark)
      .pipe(
        this.takeUntilDispose(),
        tap((value) => console.log('bookmark', value)),
        map((location) => this.service.bookmarkLocation(location)),
      )
      .subscribe();
  }
}
