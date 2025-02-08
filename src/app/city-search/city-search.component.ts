import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location } from '../data/weather.types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-search',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitySearchComponent {
  @Input() public options!: Location[];
  @Input() public selected: Location | null = null;

  public readonly inputControl = new FormControl('');

  public readonly search = output<string>();
  public readonly select = output<Location>();

  public trackLocation(value: Location): string {
    return `${value.lon}_${value.lat}`;
  }

  public displayLocation(value: Location | null): string {
    return value ? `${value.name}, ${value.country}` : '';
  }

  public onInput(evt: Event) {
    this.search.emit(((evt as InputEvent).target as HTMLInputElement).value);
  }

  public onOptionSelect(evt: MatAutocompleteSelectedEvent) {
    this.select.emit(evt.option.value);
  }
}
