import { TestIds } from '../../src/test-ids';
import { component as current } from './current-weather.co';
import { component as daily } from './daily-weather.co';

class WeatherDisplayComponent {
  private readonly testIds = TestIds.ForecastPage.WeatherDisplay;

  public readonly Current = current;

  public readonly Daily = daily;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }
}

export const component = new WeatherDisplayComponent();
