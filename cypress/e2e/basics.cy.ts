describe("UI Navigation",()=>{
    it("Should navigate user through multiple pages",()=>{
        cy.visit("/login")
        cy.get('h1')
    })
});

describe("Authentication Test",()=>{
    it("Should navigate user to login form when not authenicated",()=>{
        cy.visit("/dashboard")
    })
})

it('test navigation', function() {
    cy.visit("http://localhost:5173")
    cy.get('#root h1.text-3xl').click();
    cy.get("#root h1.text-3xl")
});

it('User Navigation to dashboard sub pages', function() {
    cy.visit("http://localhost:5173")
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('example555@gmail.com');
    cy.get('[name="password"]').type('odary{enter}');
    cy.get('#root button.flex').click();
    cy.get('#root button.lg\\:hidden.p-2 svg.size-6').click();
    cy.get('#root div.flex-col.relative li:nth-child(2)').click();
    cy.get('#root button.lg\\:hidden.p-2 svg.size-6').click();
    cy.get('#root li:nth-child(3) svg.size-5').click();
    cy.get('#root svg.size-6.cursor-pointer').click();
    cy.get('#root button.lg\\:hidden.p-2').click();
    cy.get('#root li:nth-child(4)').click();
    cy.get('#root div.py-3').click();
    cy.get('#root button.lg\\:hidden.p-2 svg.size-6').click();
    cy.get('#root li:nth-child(5) svg.size-5').click();
    cy.get('#root path[d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"]').click();
    cy.get('#root li:nth-child(6) svg.size-5').click();
    cy.get('#root button.lg\\:hidden.p-2').click();
    cy.get('#root div.pb-5 li:nth-child(1)').click();
    cy.get('#root button.text-white').click();
    cy.get('#root button.text-white').click();
    cy.get('#root button.text-white').click();
    cy.get('#root button.text-white').click();
    cy.get('#root path[d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"]').click();
    cy.get('#root div.pb-5 li.text-gray-700 svg.size-5').click();
    cy.get('#root div:nth-child(2) > h3.font-medium').click();
    
});
