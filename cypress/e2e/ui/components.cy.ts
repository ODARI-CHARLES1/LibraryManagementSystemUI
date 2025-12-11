/**
 * UI Components Test Suite
 * Tests for sidebar, navbar, and other UI elements
 */

import testData from '../../fixtures/test-data.json' assert { type: 'json' };

describe('UI Components', () => {
  const { users } = testData;

  context('Sidebar', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);
    });

    it('should display sidebar with navigation items', () => {
      cy.get('#root div.flex-col.relative').should('be.visible');
      cy.get('#root div.flex-col.relative li').should('have.length.gt', 5);
    });

    it('should highlight active navigation item', () => {
      cy.get('#root div.flex-col.relative li:nth-child(1)').should('have.class', 'active');
    });
  });

  context('Navbar', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);
    });

    it('should display navbar with user information', () => {
      cy.get('nav').should('exist');
      cy.get('#root div.flex.items-center.justify-between').should('exist');
    });
  });

  context('Responsive Design', () => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop' },
      { width: 1440, height: 900, name: 'Large Desktop' }
    ];

    viewports.forEach((viewport) => {
      context(`${viewport.name} Viewport (${viewport.width}x${viewport.height})`, () => {
        beforeEach(() => {
          cy.viewport(viewport.width, viewport.height);
        });

        it(`should render login page correctly on ${viewport.name}`, () => {
          cy.visit('/login');
          cy.get('h1').should('be.visible');
          cy.get('form').should('be.visible');
          cy.get('[name="email"]').should('be.visible');
          cy.get('[name="password"]').should('be.visible');
          cy.get('button[type="submit"]').should('be.visible');
        });

        it(`should render dashboard correctly on ${viewport.name}`, () => {
          cy.visit('/login');
          cy.get('[name="email"]').type(users.admin.email);
          cy.get('[name="password"]').type(users.admin.password);
          cy.get('button[type="submit"]').click();
          cy.wait(5000);

          cy.get('body').should('be.visible');
          cy.get('nav').should('be.visible');
        });
      });
    });
  });
});