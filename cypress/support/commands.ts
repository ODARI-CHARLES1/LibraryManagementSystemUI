/// <reference types="cypress" />
// ***********************************************
// Custom Cypress Commands for Library Management System
// ***********************************************

// Custom command to get elements by data-test attribute
Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

// Custom command for user login
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to navigate to dashboard sections
Cypress.Commands.add("navigateToDashboardSection", (sectionIndex: number) => {
  cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
  cy.get(`#root div.flex-col.relative li:nth-child(${sectionIndex + 1})`).click();
});

// Custom command to check if element exists
Cypress.Commands.add("shouldExist", { prevSubject: true }, (subject: any) => {
  cy.wrap(subject).should('exist');
});

// Custom command to check if element is visible
Cypress.Commands.add("shouldBeVisible", { prevSubject: true }, (subject: any) => {
  cy.wrap(subject).should('be.visible');
});

// Custom command to check if element contains text
Cypress.Commands.add("shouldContainText", { prevSubject: true }, (subject: any, text: string) => {
  cy.wrap(subject).should('contain.text', text);
});

// Custom command to wait for API calls to complete
Cypress.Commands.add("waitForApi", (timeout: number = 5000) => {
  cy.wait(timeout);
});