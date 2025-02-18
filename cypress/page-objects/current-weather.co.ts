import { TestIds } from '../../src/test-ids';

class CurrentWeatherComponent {
  private readonly testIds = TestIds.ForecastPage.WeatherDisplay.Current;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }
}

export const component = new CurrentWeatherComponent();
