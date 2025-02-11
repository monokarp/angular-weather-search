import { testIdAttrName } from '../../src/test-ids';
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export type CyOptions = Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>;
export type CyChainable<E extends Node = HTMLElement> = Cypress.Chainable<JQuery<E>>;

Cypress.Commands.add(
  'byTestId',
  <E extends Node = HTMLElement>(id: string, options?: CyOptions): CyChainable<E> =>
    cy.get(`[${testIdAttrName}="${id}"]`, options),
);

Cypress.Commands.add(
  'clickOutside',
  (options?: CyOptions): CyChainable<HTMLBodyElement> => cy.get('body', options).click(0, 0),
);
