import { TestIds } from '../../src/test-ids';

class DailyWeatherComponent {
  private readonly testIds = TestIds.ForecastPage.WeatherDisplay.Daily;

  public itself() {
    return cy.byTestId(this.testIds.Host);
  }
}

export const component = new DailyWeatherComponent();
