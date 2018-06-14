describe('Cypress Testing for Gear Up Group Project', () => {
  it('Has page load with correct elements and function', () => {
    cy.visit('localhost:3000');
    cy.get('h1').should('have.text', 'Gear Up')
    cy.get('button.ui.button.login').should('have.text', 'Log In')
    cy.get('button.ui.button.signup').should('have.text', ' Sign Up ')
    cy.get('button.ui.button.login').click().get('input#login-email').type('shaunsemail@email.com').get('input#login-password').type('password').get('button.ui.button').contains('Submit').click()
    cy.get('button.ui.button').wait(500).contains('shaunsemail@email.com').click()
  })
})
