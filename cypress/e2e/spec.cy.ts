describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[name="email"]').click();
    cy.get('[name="password"]').click();
  })
});

it('home visit', function() {
  cy.visit("http://localhost:5173/dashboard")
});

it('navigation', function() {
  cy.visit("http://localhost:5173")
  cy.get('#root label[for="email"]').click();
  cy.get('[name="email"]').click();
  cy.get('#root form.space-y-6').click();
  cy.get('[name="email"]').click();
  cy.get('[name="email"]').type('example@gamil.com');
  cy.get('[name="password"]').type('odary{enter}');
  cy.get('#root button.flex').click();
  cy.get('[name="email"]').click();
  cy.get('[name="email"]').clear();
  cy.get('[name="email"]').type('example555@gamil.com');
  cy.get('#root button.flex').click();
  cy.get('#root div.flex').click();
  cy.get('#root button.flex').click();
  cy.get('#root button.flex').click();
  cy.get('[name="email"]').click();
  cy.get('[name="email"]').clear();
  cy.get('[name="email"]').type('example555@gmail..com');
  cy.get('#root button.flex').click();
  cy.get('#root div.flex').click();
  cy.get('[name="email"]').clear();
  cy.get('[name="email"]').type('example555@gmail.com');
  cy.get('#root button.flex').click();
  cy.get('#root svg[viewBox="0 0 14 16"]').click();
  cy.get('#root div.shadow-md').click();
  cy.get('#root path[d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"]').click();
  cy.get('#root ul.flex li:nth-child(3)').click();
  cy.get('#root path[d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"]').click();
  cy.get('#root li:nth-child(5) svg.size-5').click();
});