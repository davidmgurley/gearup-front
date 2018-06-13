describe('Tests for Gear Up', () => {
  it('Has a Gear Up logo at the top', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Denver Gear Up')
    // cy.get('header button').should('have.text', 'login')
    // cy.get('header button').should('have.text', 'sign up')
    cy.get('.browse-container').contains('Card').should('eq', 6)
    // cy.get('a').contains('Order').should('exist')
    // cy.get('a').contains('Product').should('exist')
    // cy.get('.dropdown-menu a').contains('Documentation').should('exist')
    // cy.get('.dropdown-menu a').contains('Features').should('exist')
    // cy.get('.dropdown-menu a').contains('Technology').should('exist')
    // cy.get('h4').should('have.lengthOf', 6)
    // cy.get('.dropdown-toggle').click()
    // cy.get('a').contains('Order').click()
    // cy.url().should('contain', '/order.html')
  })
})
