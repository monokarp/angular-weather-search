import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocationSelectOption } from '../data/weather.types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

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
    return value ? `  (${formatCoordinate(value.lat)}, ${formatCoordinate(value.lon)})` : '';
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

function formatCoordinate(value: number): string {
  const direction =
    value >= 0 
      ? value < 180 
        ? 'N'
        : 'E'
      : value > -180 
        ? 'S'
        : 'W';
  const absCoord = Math.abs(value);
  let degrees = Math.floor(absCoord);
  let minutes = Math.floor((absCoord - degrees) * 60);
  let seconds = ((absCoord - degrees - minutes / 60) * 3600).toFixed(2);

  if (seconds === '60.00') {
    seconds = '00.00';
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    degrees++;
  }

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}
