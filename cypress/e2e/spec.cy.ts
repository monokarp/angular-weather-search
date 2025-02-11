import { ForecastPage } from "../page-objects/forecast.po";

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');

    ForecastPage.itself().should('be.visible');

    ForecastPage.CitySearch.itself().should('be.visible');

    ForecastPage.WeatherDisplay.itself().should('be.visible');
  });
});
