/**
 * Error Handling Test Suite
 * Tests for error scenarios and edge cases
 */

import testData from '../fixtures/test-data.json' assert { type: 'json' };

describe('Error Handling', () => {
  const { users } = testData;

  context('API Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Intercept and mock a failed API call
      cy.intercept('POST', '**/auth/login', {
        statusCode: 500,
        body: { success: false, message: 'Internal server error' }
      }).as('failedLogin');

      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@failedLogin');
      cy.contains('Email or Password is wrong').should('be.visible');
    });

    it('should show loading state during API calls', () => {
      // Intercept and delay the login request
      cy.intercept('POST', '**/auth/login', (req) => {
        req.reply((res) => {
          res.delay = 2000; // Delay response by 2 seconds
        });
      }).as('delayedLogin');

      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);

      cy.get('button[type="submit"]').click();

      // Should show loading spinner
      cy.get('button[type="submit"]').should('contain', 'ScaleLoader');
      cy.get('button[type="submit"]').should('have.class', 'opacity-70');
      cy.get('button[type="submit"]').should('have.class', 'cursor-not-allowed');

      cy.wait('@delayedLogin');
    });
  });

  context('Form Error Handling', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should handle multiple validation errors simultaneously', () => {
      // Submit empty form
      cy.get('button[type="submit"]').click();

      // Should show multiple error messages
      cy.contains('Email is required').should('be.visible');
      cy.contains('Enter password').should('be.visible');
    });

    it('should clear error messages when fields are corrected', () => {
      // First show errors
      cy.get('button[type="submit"]').click();
      cy.contains('Email is required').should('be.visible');

      // Then correct the field
      cy.get('[name="email"]').type('valid@example.com');
      cy.get('[name="password"]').type('validpassword');

      // Errors should be cleared
      cy.contains('Email is required').should('not.exist');
      cy.contains('Enter password').should('not.exist');
    });
  });

  context('Navigation Error Handling', () => {
    it('should handle invalid route navigation', () => {
      cy.visit('/invalid-route');
      // Should redirect to login or show 404
      cy.url().should('include', '/login');
    });

    it('should handle unauthorized access to protected routes', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });
  });
});