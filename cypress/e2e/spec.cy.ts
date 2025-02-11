import { page as forecastPage } from '../page-objects/forecast.po';

describe('My First Test', () => {
  it('Lands on the forecast page', () => {
    cy.visit('/');

    forecastPage.itself().should('be.visible');

    forecastPage.CitySearch.itself().should('be.visible');

    forecastPage.WeatherDisplay.itself().should('not.exist');
  });
});
