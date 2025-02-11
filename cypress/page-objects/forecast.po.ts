import { TestIds } from '../../src/test-ids';

export const ForecastPage = {
  itself: () => cy.byTestId(TestIds.ForecastPage.Host),

  CitySearch: {
    itself: () => cy.byTestId(TestIds.ForecastPage.CitySearch.Host),
  },

  WeatherDisplay: {
    itself: () => cy.byTestId(TestIds.ForecastPage.Host),
  },
};
