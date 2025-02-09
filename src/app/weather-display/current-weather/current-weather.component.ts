import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentWeather } from '../../data/weather.types';
import { DegreesPipe } from '../../common/degrees.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  imports: [DegreesPipe, TitleCasePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input() public data!: CurrentWeather;

  public iconSource(iconId: string) {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  }
}
