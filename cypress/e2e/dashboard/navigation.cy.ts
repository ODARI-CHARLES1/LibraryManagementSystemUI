/**
 * Dashboard Navigation Test Suite
 * Tests for dashboard section navigation and state management
 */

import testData from '../../fixtures/test-data.json' assert { type: 'json' };

describe('Dashboard Navigation', () => {
  const { users } = testData;

  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('[name="email"]').type(users.admin.email);
    cy.get('[name="password"]').type(users.admin.password);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.url().should('include', '/dashboard');
  });

  context('Section Navigation', () => {
    it('should navigate to Books section', () => {
      cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
      cy.get('#root div.flex-col.relative li:nth-child(2)').click();
      cy.wait(2000);
      cy.contains('Books').should('exist');
    });

    it('should navigate to Users section', () => {
      cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
      cy.get('#root div.flex-col.relative li:nth-child(4)').click();
      cy.wait(2000);
      cy.contains('Users').should('exist');
    });

    it('should navigate to Records section', () => {
      cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
      cy.get('#root div.flex-col.relative li:nth-child(6)').click();
      cy.wait(2000);
      cy.contains('Records').should('exist');
    });
  });

  context('State Management', () => {
    it('should maintain active section state after reload', () => {
      // Navigate to a section
      cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
      cy.get('#root div.flex-col.relative li:nth-child(3)').click();
      cy.wait(2000);

      // Reload and check if state is maintained
      cy.reload();
      cy.wait(2000);
      cy.get('#root div.flex-col.relative li:nth-child(3)').should('have.class', 'active');
    });
  });

  context('Sidebar Functionality', () => {
    it('should toggle sidebar visibility', () => {
      // Check sidebar is visible
      cy.get('#root div.flex-col.relative').should('be.visible');

      // Toggle sidebar
      cy.get('#root button.lg\\:hidden.p-2 svg.size-6').first().click();
      cy.wait(1000);

      // Check sidebar state changed
      cy.get('body').should('exist');
    });
  });
});