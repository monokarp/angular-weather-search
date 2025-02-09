import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DegreesPipe } from '../../common/degrees.pipe';
import { DailyWeather } from '../../data/weather.types';

@Component({
  selector: 'app-daily-weather',
  imports: [DatePipe, DegreesPipe, TitleCasePipe],
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {
  @Input() public data!: DailyWeather;

  public formatTime(time: string): string {
    const [hh, mm] = time.split(':');

    return `${hh}:${mm}`;
  }

  public iconSource(iconId: string) {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  }
}
