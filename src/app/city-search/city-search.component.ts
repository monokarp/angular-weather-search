import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSelectOption } from '../data/weather.types';
import { formatCoordinates } from './format-coordinates';

@Component({
  selector: 'app-city-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIconModule,
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitySearchComponent {
  @Input() public options!: LocationSelectOption[];
  @Input() public selected: LocationSelectOption | null = null;

  public readonly inputControl = new FormControl('');

  public readonly search = output<string>();
  public readonly select = output<LocationSelectOption>();
  public readonly toggleBookmark = output<LocationSelectOption>();
  public readonly dismissed = output<void>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('search.svg'));
    iconRegistry.addSvgIcon('bookmark', sanitizer.bypassSecurityTrustResourceUrl('bookmark.svg'));
    iconRegistry.addSvgIcon('bookmark_star', sanitizer.bypassSecurityTrustResourceUrl('bookmark_star.svg'));
  }

  public trackLocation(value: LocationSelectOption): string {
    return `${value.lon}_${value.lat}`;
  }

  public displayLocation(value: LocationSelectOption | null): string {
    return value ? `${value.name}, ${value.country}` : '';
  }

  public displayCoords(value: LocationSelectOption | null): string {
    return value ? formatCoordinates(value.lat, value.lon) : '';
  }

  public onInput(evt: Event) {
    this.search.emit(((evt as InputEvent).target as HTMLInputElement).value);
  }

  public onOptionSelect(evt: MatAutocompleteSelectedEvent) {
    this.select.emit(evt.option.value);
  }

  public onBookmark(event: MouseEvent, option: LocationSelectOption) {
    event.stopPropagation();

    this.toggleBookmark.emit(option);
  }
}
