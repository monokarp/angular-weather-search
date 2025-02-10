describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');

    cy.byTestId('root').should('be.visible');
  });
});
