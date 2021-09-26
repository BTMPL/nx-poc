describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary'));
  it('should render the component', () => {
    cy.get('hsbc-button').should('exist');
  });
});