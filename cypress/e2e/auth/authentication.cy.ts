/**
 * Authentication Test Suite
 * Tests for login, logout, and session management
 */

import testData from '../../fixtures/test-data.json' assert { type: 'json' };

describe('Authentication', () => {
  const { users } = testData;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  context('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should display login form with all required elements', () => {
      cy.get('h1').should('exist').and('contain.text', 'Library System');
      cy.get('p').should('exist').and('contain.text', 'Sign in to your account');
      cy.get('form').should('exist');
      cy.get('[name="email"]').should('exist');
      cy.get('[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist').and('contain.text', 'Login');
    });

    it('should have proper form structure and attributes', () => {
      cy.get('label[for="email"]').should('contain.text', 'Email');
      cy.get('label[for="password"]').should('contain.text', 'Password');
      cy.get('[name="email"]').should('have.attr', 'type', 'email');
      cy.get('[name="password"]').should('have.attr', 'type', 'password');
    });
  });

  context('Form Validation', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('should show error when email is empty', () => {
      cy.get('[name="password"]').type('testpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Email is required').should('be.visible');
    });

    it('should show error when password is empty', () => {
      cy.get('[name="email"]').type('test@example.com');
      cy.get('button[type="submit"]').click();
      cy.contains('Enter password').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      const invalidEmails = ['invalid-email', 'user@', '@domain.com', 'user@domain'];
      invalidEmails.forEach((invalidEmail: string) => {
        cy.get('[name="email"]').clear().type(invalidEmail);
        cy.get('[name="password"]').type('testpassword');
        cy.get('button[type="submit"]').click();
        cy.contains('Enter a valid email').should('be.visible');
        cy.get('[name="email"]').clear();
      });
    });

    it('should show error for short password', () => {
      cy.get('[name="email"]').type('test@example.com');
      cy.get('[name="password"]').type('123');
      cy.get('button[type="submit"]').click();
      cy.contains('Password must be at least 4 characters').should('be.visible');
    });
  });

  context('Successful Login', () => {
    it('should login with valid credentials and redirect to dashboard', () => {
      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
      cy.wait(5000);
    });

    it('should store authentication token in localStorage', () => {
      cy.visit('/login');
      cy.get('[name="email"]').type(users.admin.email);
      cy.get('[name="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);

      cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        cy.wrap(token).should('exist');
        cy.wrap(token).should('be.a', 'string');
        cy.wrap(token).should('have.length.gt', 0);
      });
    });
  });

  context('Failed Login', () => {
    it('should show error message for invalid credentials', () => {
      cy.visit('/login');
      cy.get('[name="email"]').type(users.invalid.email);
      cy.get('[name="password"]').type(users.invalid.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);

      cy.contains('Email or Password is wrong').should('be.visible');
      cy.url().should('include', '/login');
    });
  });

  context('Navigation Flows', () => {
    it('should navigate to signup page from login page', () => {
      cy.visit('/login');
      cy.contains('Sign up').click();
      cy.url().should('include', '/signup');
    });

    it('should redirect to login when accessing protected routes without authentication', () => {
      const protectedRoutes = ['/dashboard', '/books', '/users', '/records'];

      protectedRoutes.forEach((route) => {
        cy.visit(route);
        cy.url().should('include', '/login');
      });
    });
  });
});